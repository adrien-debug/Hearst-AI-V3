export const collateralClients = [
  {
    id: "client_001",
    name: "La Petite Maison Dubai",
    tag: "Restaurant",
    wallets: [
      "0x1234...ABCD",
      "0x5678...EFGH"
    ],
    lastUpdate: "2025-11-20T10:00:00Z",
    positions: [
      {
        asset: "BTC",
        protocol: "Morpho",
        chain: "ethereum",
        collateralAmount: 3.2,
        collateralPriceUsd: 71000,
        debtToken: "USDC",
        debtAmount: 80000,
        borrowApr: 0.065,
        liquidationThreshold: 0.9
      },
      {
        asset: "ETH",
        protocol: "Kankan",
        chain: "ethereum",
        collateralAmount: 150,
        collateralPriceUsd: 3800,
        debtToken: "USDT",
        debtAmount: 120000,
        borrowApr: 0.072,
        liquidationThreshold: 0.9
      }
    ]
  },
  {
    id: "client_002",
    name: "VIP Client #2",
    tag: "VIP",
    wallets: [
      "0xAAAA...BBBB"
    ],
    lastUpdate: "2025-11-20T10:05:00Z",
    positions: [
      {
        asset: "BTC",
        protocol: "Morpho",
        chain: "ethereum",
        collateralAmount: 1.5,
        collateralPriceUsd: 71000,
        debtToken: "USDC",
        debtAmount: 50000,
        borrowApr: 0.082,
        liquidationThreshold: 0.9
      }
    ]
  }
];
