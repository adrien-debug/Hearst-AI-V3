/**
 * Script de test pour l'API Collateral DeBank
 * Teste directement les fonctions sans démarrer Next.js
 * 
 * Usage: node test-collateral-api.js
 */

require('dotenv').config({ path: '.env.local' });

// Import des fonctions DeBank (version Node.js compatible)
const DEBANK_BASE_URL = "https://pro-openapi.debank.com/v1";
const DEBANK_ACCESS_KEY = process.env.DEBANK_ACCESS_KEY;

if (!DEBANK_ACCESS_KEY || DEBANK_ACCESS_KEY === 'your_debank_access_key_here') {
  console.error('\n❌ DEBANK_ACCESS_KEY manquant ou non configuré dans .env.local');
  console.error('\n📝 Pour tester l\'API DeBank :');
  console.error('   1. Obtenez votre clé sur https://pro.debank.com/');
  console.error('   2. Ajoutez-la dans .env.local :');
  console.error('      DEBANK_ACCESS_KEY=votre_cle_ici\n');
  console.error('💡 Alternative : Testez avec une clé directement :');
  console.error('   DEBANK_ACCESS_KEY=votre_cle node test-collateral-api.js\n');
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

  console.log(`\n🔍 Récupération des données pour le wallet: ${wallet}`);
  console.log(`   Chains: ${chains.join(', ')}`);
  if (allowedProtocols.length > 0) {
    console.log(`   Protocoles autorisés: ${allowedProtocols.join(', ')}`);
  }

  const protoList = await fetchUserComplexProtocols(wallet, chains);
  console.log(`   ✅ ${protoList.length} protocole(s) trouvé(s)`);

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
    console.log(`   📊 ${protocol.name || protocolId}: ${itemList.length} position(s)`);
    
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

// Test principal
async function testCollateralAPI() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 Test API Collateral DeBank');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const wallets = [
    "0xb3d525155609ea680125acdd9ee61c2a74610eaa"
  ];

  try {
    const clients = await Promise.all(
      wallets.map((wallet) =>
        buildCollateralClientFromDeBank(wallet, {
          tag: 'Client',
          chains: ['eth'],
        })
      )
    );

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Résultats:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    clients.forEach((client) => {
      console.log(`📋 Client: ${client.name} (${client.tag})`);
      console.log(`   Wallet: ${client.wallets[0]}`);
      console.log(`   Positions: ${client.positions.length}`);
      
      if (client.positions.length === 0) {
        console.log('   ⚠️  Aucune position trouvée');
      } else {
        client.positions.forEach((pos, idx) => {
          console.log(`\n   Position ${idx + 1}:`);
          console.log(`     Asset: ${pos.asset}`);
          console.log(`     Protocol: ${pos.protocol}`);
          console.log(`     Chain: ${pos.chain}`);
          console.log(`     Collatéral: ${pos.collateralAmount} ${pos.asset} @ $${pos.collateralPriceUsd}`);
          console.log(`     Dette: ${pos.debtAmount.toLocaleString()} ${pos.debtToken}`);
          console.log(`     Valeur collatéral: $${(pos.collateralAmount * pos.collateralPriceUsd).toLocaleString()}`);
        });
      }
      console.log('');
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📤 Format JSON (compatible API):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(JSON.stringify({ clients }, null, 2));

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Exécuter le test
testCollateralAPI();

