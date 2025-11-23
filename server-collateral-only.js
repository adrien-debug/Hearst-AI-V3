/**
 * Serveur minimal pour tester uniquement l'API Collateral
 * Expose uniquement /api/collateral sans toute l'application Next.js
 */

require('dotenv').config({ path: '.env.local' });

const http = require('http');
const url = require('url');

const DEBANK_BASE_URL = "https://pro-openapi.debank.com/v1";
const DEBANK_ACCESS_KEY = process.env.DEBANK_ACCESS_KEY;

if (!DEBANK_ACCESS_KEY) {
  console.error('❌ DEBANK_ACCESS_KEY manquant dans .env.local');
  process.exit(1);
}

async function debankFetch(path, params = {}) {
  const url = new URL(DEBANK_BASE_URL + path);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      AccessKey: DEBANK_ACCESS_KEY,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[DeBank] ${res.status} ${res.statusText} - ${text}`);
  }

  return res.json();
}

async function fetchUserComplexProtocols(wallet, chains = ["eth"]) {
  const chain_ids = chains.join(",");
  const data = await debankFetch("/user/all_complex_protocol_list", {
    id: wallet,
    chain_ids,
  });
  return Array.isArray(data) ? data : [];
}

function normalizeAssetSymbol(symbol) {
  if (!symbol) return "OTHER";
  const s = symbol.toUpperCase();
  if (s.includes("BTC")) return "BTC";
  if (s.includes("ETH")) return "ETH";
  return s;
}

function mapPortfolioItemToPosition(protocol, item) {
  const stats = item.stats || {};
  const detail = item.detail || {};
  
  const assetTokens =
    detail.supply_token_list ||
    detail.asset_token_list ||
    detail.collateral_token_list ||
    [];
  const debtTokens =
    detail.borrow_token_list ||
    detail.debt_token_list ||
    detail.debt_list ||
    [];

  const mainAsset = assetTokens[0] || {};
  const mainDebt = debtTokens[0] || {};

  const assetSymbol = normalizeAssetSymbol(mainAsset.symbol);
  const collateralAmount = mainAsset.amount || 0;
  const collateralPriceUsd = mainAsset.price || 0;
  const debtTokenSymbol = mainDebt.symbol || "USD";
  const debtAmount = mainDebt.amount || (stats.debt_usd_value || 0);

  return {
    asset: assetSymbol,
    protocol: protocol.id || protocol.name || "unknown",
    chain: protocol.chain || "unknown",
    collateralAmount,
    collateralPriceUsd,
    debtToken: debtTokenSymbol,
    debtAmount,
    borrowApr: 0,
    liquidationThreshold: 0.9,
  };
}

async function buildCollateralClientFromDeBank(wallet, options = {}) {
  const {
    name,
    tag = "Client",
    chains = ["eth"],
    allowedProtocols = [],
  } = options;

  const protoList = await fetchUserComplexProtocols(wallet, chains);
  const positions = [];

  for (const protocol of protoList || []) {
    const protocolId = protocol.id || "";
    if (
      Array.isArray(allowedProtocols) &&
      allowedProtocols.length > 0 &&
      !allowedProtocols.includes(protocolId)
    ) {
      continue;
    }

    const itemList = protocol.portfolio_item_list || [];
    for (const item of itemList) {
      const pos = mapPortfolioItemToPosition(protocol, item);
      if (pos.collateralAmount === 0 && pos.debtAmount === 0) continue;
      positions.push(pos);
    }
  }

  const displayName =
    name ||
    `${wallet.slice(0, 6)}...${wallet.slice(wallet.length - 4, wallet.length)}`;

  return {
    id: wallet,
    name: displayName,
    tag,
    wallets: [wallet],
    positions,
    lastUpdate: new Date().toISOString(),
  };
}

const PORT = 6001;

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  
  // Route: /api/collateral
  if (parsedUrl.pathname === '/api/collateral' && req.method === 'GET') {
    try {
      const walletsParam = parsedUrl.query.wallets;
      
      if (!walletsParam) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Paramètre wallets requis' }));
        return;
      }

      const wallets = walletsParam.split(',').map(w => w.trim()).filter(Boolean);
      const chainsParam = parsedUrl.query.chains || 'eth';
      const protocolsParam = parsedUrl.query.protocols || '';
      
      const chains = chainsParam.split(',').map(c => c.trim()).filter(Boolean);
      const allowedProtocols = protocolsParam.split(',').map(p => p.trim()).filter(Boolean);

      const clients = await Promise.all(
        wallets.map((wallet) =>
          buildCollateralClientFromDeBank(wallet, {
            tag: 'Client',
            chains,
            allowedProtocols,
          })
        )
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ clients }));
    } catch (error) {
      console.error('Erreur API:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Erreur lors de la récupération des données DeBank',
        details: error.message 
      }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route non trouvée' }));
  }
});

server.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Serveur API Collateral uniquement');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api/collateral`);
  console.log(`📋 Exemple: http://localhost:${PORT}/api/collateral?wallets=0xb3d525155609ea680125acdd9ee61c2a74610eaa`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

