// Données de démo pour le Transaction Manager
// Charte HEARST - Système complet

export interface Wallet {
  id: string
  name: string
  address: string
  type: 'source' | 'destination'
  balance?: number
  currency: string
  network: string
  enabled: boolean
}

export interface Transaction {
  id: string
  date: string
  timestamp: number
  from: {
    walletId: string
    name: string
    address: string
  }
  to: {
    walletId: string
    name: string
    address: string
  }
  amount: number
  currency: string
  amountUSD: number
  fee: number
  total: number
  status: 'pending' | 'validated' | 'failed'
  notes?: string
  period: 'daily' | 'weekly' | 'monthly'
  validated: boolean
  validatedAt: string | null
  txHash: string | null
}

export const demoTransactions: Transaction[] = [
  {
    id: "TX-2024-001",
    date: "2024-11-22T14:30:00Z",
    timestamp: 1732282200000,
    from: {
      walletId: "wallet-001",
      name: "Main Mining Wallet",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
    to: {
      walletId: "wallet-101",
      name: "Cold Storage Vault",
      address: "3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy"
    },
    amount: 0.5000,
    currency: "BTC",
    amountUSD: 42500.00,
    fee: 0.0001,
    total: 0.5001,
    status: "pending",
    notes: "Weekly automatic transfer to cold storage",
    period: "weekly",
    validated: false,
    validatedAt: null,
    txHash: null
  },
  {
    id: "TX-2024-002",
    date: "2024-11-22T09:15:00Z",
    timestamp: 1732263300000,
    from: {
      walletId: "wallet-001",
      name: "Main Mining Wallet",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
    to: {
      walletId: "wallet-102",
      name: "Exchange Wallet",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    },
    amount: 0.2500,
    currency: "BTC",
    amountUSD: 21250.00,
    fee: 0.00008,
    total: 0.25008,
    status: "validated",
    notes: "Daily operations transfer",
    period: "daily",
    validated: true,
    validatedAt: "2024-11-22T09:20:00Z",
    txHash: "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d"
  },
  {
    id: "TX-2024-003",
    date: "2024-11-21T18:00:00Z",
    timestamp: 1732208400000,
    from: {
      walletId: "wallet-002",
      name: "Secondary Wallet",
      address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
    },
    to: {
      walletId: "wallet-101",
      name: "Cold Storage Vault",
      address: "3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy"
    },
    amount: 1.0000,
    currency: "BTC",
    amountUSD: 85000.00,
    fee: 0.00012,
    total: 1.00012,
    status: "validated",
    notes: "Monthly consolidation transfer",
    period: "monthly",
    validated: true,
    validatedAt: "2024-11-21T18:05:00Z",
    txHash: "b2186ec55e527d4ca288g66c7195f3226c0456f27d6dg413gd91fa6egcg6e59e"
  },
  {
    id: "TX-2024-004",
    date: "2024-11-22T12:00:00Z",
    timestamp: 1732273200000,
    from: {
      walletId: "wallet-001",
      name: "Main Mining Wallet",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
    to: {
      walletId: "wallet-103",
      name: "Payment Processor",
      address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5"
    },
    amount: 0.1500,
    currency: "BTC",
    amountUSD: 12750.00,
    fee: 0.00006,
    total: 0.15006,
    status: "pending",
    notes: "Supplier payment",
    period: "daily",
    validated: false,
    validatedAt: null,
    txHash: null
  }
]

export const demoWallets = {
  source: [
    {
      id: "wallet-001",
      name: "Main Mining Wallet",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      type: "source" as const,
      balance: 2.5000,
      currency: "BTC",
      network: "Bitcoin Mainnet",
      enabled: true
    },
    {
      id: "wallet-002",
      name: "Secondary Wallet",
      address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      type: "source" as const,
      balance: 1.2000,
      currency: "BTC",
      network: "Bitcoin Mainnet",
      enabled: true
    }
  ],
  destination: [
    {
      id: "wallet-101",
      name: "Cold Storage Vault",
      address: "3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy",
      type: "destination" as const,
      currency: "BTC",
      network: "Bitcoin Mainnet",
      enabled: true
    },
    {
      id: "wallet-102",
      name: "Exchange Wallet",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      type: "destination" as const,
      currency: "BTC",
      network: "Bitcoin Mainnet",
      enabled: true
    },
    {
      id: "wallet-103",
      name: "Payment Processor",
      address: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
      type: "destination" as const,
      currency: "BTC",
      network: "Bitcoin Mainnet",
      enabled: true
    }
  ]
}

// Fonctions utilitaires
export function filterTransactionsByPeriod(transactions: Transaction[], period: 'daily' | 'weekly' | 'monthly' | 'all'): Transaction[] {
  if (period === 'all') return transactions
  
  const now = new Date()
  return transactions.filter(tx => {
    const txDate = new Date(tx.date)
    switch(period) {
      case 'daily':
        return txDate.toDateString() === now.toDateString()
      case 'weekly':
        const weekAgo = new Date(now)
        weekAgo.setDate(now.getDate() - 7)
        return txDate >= weekAgo && txDate <= now
      case 'monthly':
        return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()
      default:
        return true
    }
  })
}

export function filterTransactionsByStatus(transactions: Transaction[], status: 'all' | 'pending' | 'validated' | 'failed'): Transaction[] {
  if (status === 'all') return transactions
  return transactions.filter(tx => tx.status === status)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function formatAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (address.length <= startChars + endChars) return address
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

export function generateTxHash(): string {
  return Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

