/**
 * Script de test pour l'API Collateral avec données mockées
 * Teste le format et la structure sans appel API réel
 * 
 * Usage: node test-collateral-api-mock.js
 */

// Simulation des données DeBank
const mockDeBankData = {
  protocols: [
    {
      id: "morpho_blue",
      name: "Morpho Blue",
      chain: "eth",
      portfolio_item_list: [
        {
          stats: {
            asset_usd_value: 227200, // 3.2 BTC * 71000
            debt_usd_value: 80000
          },
          detail: {
            supply_token_list: [
              {
                symbol: "WBTC",
                amount: 3.2,
                price: 71000
              }
            ],
            borrow_token_list: [
              {
                symbol: "USDC",
                amount: 80000,
                price: 1
              }
            ]
          }
        }
      ]
    },
    {
      id: "compound_v3",
      name: "Compound V3",
      chain: "eth",
      portfolio_item_list: [
        {
          stats: {
            asset_usd_value: 570000, // 150 ETH * 3800
            debt_usd_value: 120000
          },
          detail: {
            supply_token_list: [
              {
                symbol: "WETH",
                amount: 150,
                price: 3800
              }
            ],
            borrow_token_list: [
              {
                symbol: "USDT",
                amount: 120000,
                price: 1
              }
            ]
          }
        }
      ]
    }
  ]
};

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

function buildCollateralClientFromMock(wallet, mockData) {
  const protoList = mockData.protocols;
  const positions = [];

  for (const protocol of protoList || []) {
    const itemList = protocol.portfolio_item_list || [];
    
    for (const item of itemList) {
      const pos = mapPortfolioItemToPosition(protocol, item);
      if (pos.collateralAmount === 0 && pos.debtAmount === 0) continue;
      positions.push(pos);
    }
  }

  const displayName = `${wallet.slice(0, 6)}...${wallet.slice(wallet.length - 4, wallet.length)}`;

  return {
    id: wallet,
    name: displayName,
    tag: "Client",
    wallets: [wallet],
    positions,
    lastUpdate: new Date().toISOString(),
  };
}

// Test avec données mockées
function testWithMockData() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 Test API Collateral (Mode Mock)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const wallet = "0xb3d525155609ea680125acdd9ee61c2a74610eaa";
  
  console.log(`📋 Wallet testé: ${wallet}\n`);

  const client = buildCollateralClientFromMock(wallet, mockDeBankData);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Résultats:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(`📋 Client: ${client.name} (${client.tag})`);
  console.log(`   Wallet: ${client.wallets[0]}`);
  console.log(`   Positions: ${client.positions.length}\n`);

  if (client.positions.length === 0) {
    console.log('   ⚠️  Aucune position trouvée');
  } else {
    client.positions.forEach((pos, idx) => {
      console.log(`   Position ${idx + 1}:`);
      console.log(`     Asset: ${pos.asset}`);
      console.log(`     Protocol: ${pos.protocol}`);
      console.log(`     Chain: ${pos.chain}`);
      console.log(`     Collatéral: ${pos.collateralAmount} ${pos.asset} @ $${pos.collateralPriceUsd.toLocaleString()}`);
      console.log(`     Dette: ${pos.debtAmount.toLocaleString()} ${pos.debtToken}`);
      const collatValue = pos.collateralAmount * pos.collateralPriceUsd;
      console.log(`     Valeur collatéral: $${collatValue.toLocaleString()}`);
      const ltv = (pos.debtAmount / collatValue * 100).toFixed(1);
      console.log(`     LTV: ${ltv}%`);
      console.log('');
    });
  }

  // Calculer les métriques
  let totalCollateralUsd = 0;
  let totalDebtUsd = 0;
  client.positions.forEach((pos) => {
    totalCollateralUsd += pos.collateralAmount * pos.collateralPriceUsd;
    totalDebtUsd += pos.debtAmount;
  });
  const collateralizationRatio = totalDebtUsd === 0 ? Infinity : totalCollateralUsd / totalDebtUsd;

  console.log('\n📊 Métriques globales:');
  console.log(`   Total Collatéral: $${totalCollateralUsd.toLocaleString()}`);
  console.log(`   Total Dette: $${totalDebtUsd.toLocaleString()}`);
  console.log(`   Ratio de collatéralisation: ${(collateralizationRatio * 100).toFixed(1)}%`);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📤 Format JSON (compatible API):');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(JSON.stringify({ clients: [client] }, null, 2));

  console.log('\n✅ Test terminé avec succès (données mockées)');
  console.log('💡 Pour tester avec de vraies données DeBank, configurez DEBANK_ACCESS_KEY dans .env.local\n');
}

testWithMockData();

