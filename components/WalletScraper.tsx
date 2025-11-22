'use client'

import { useState, useEffect } from 'react'
import {
  StatusExcellentIcon,
  StatusGoodIcon,
  StatusWarningIcon,
  StatusErrorIcon,
  StatusPendingIcon,
  RefreshIcon,
  DownloadIcon,
  SettingsIcon,
  SearchIcon,
  ListIcon,
  TagIcon,
  AnalyticsIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  SendIcon,
  ReceiveIcon,
  CopyIcon,
  ValidateIcon,
  ImportIcon,
  ReportIcon,
  SyncIcon,
  CheckIcon,
  XIcon,
  FileIcon,
  ChartIcon
} from '@/components/icons/PremiumIcons'

// Types
interface ScrapedWallet {
  id: string
  name: string
  address: string
  network: string
  txCount: number
  lastSync: string | null
  syncStatus: 'synced' | 'syncing' | 'error' | 'pending'
  autoSync: boolean
  syncFrequency: number
  scrapingSource: string
  description?: string
  category?: string
}

interface ScrapedTransaction {
  id: string
  txHash: string
  walletId: string
  walletName: string
  walletAddress: string
  network: string
  date: string
  direction: 'in' | 'out'
  amount: number
  amountUSD: number
  fee: number
  confirmations: number
  blockHeight: number | null
  toAddress?: string
  fromAddress?: string
  classification: string
  tags: string[]
  notes: string
  status: 'confirmed' | 'unconfirmed' | 'failed'
}

interface ClassificationCategory {
  id: string
  name: string
  color: string
  icon: string
  description: string
  taxCategory: string
  txCount: number
  volume: number
  autoRule?: any
}

// Données de démo
const demoScrapedWallets: ScrapedWallet[] = [
  {
    id: 'sw-001',
    name: 'Main Mining Wallet',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    network: 'Bitcoin Mainnet',
    txCount: 1247,
    lastSync: '2024-11-22T14:28:00Z',
    syncStatus: 'synced',
    autoSync: true,
    syncFrequency: 15,
    scrapingSource: 'Blockchain.com',
    category: 'Personal'
  },
  {
    id: 'sw-002',
    name: 'Cold Storage Vault',
    address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
    network: 'Bitcoin Mainnet',
    txCount: 384,
    lastSync: '2024-11-22T14:25:00Z',
    syncStatus: 'synced',
    autoSync: true,
    syncFrequency: 15,
    scrapingSource: 'Blockchain.com',
    category: 'Security'
  },
  {
    id: 'sw-003',
    name: 'Exchange Hot Wallet',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'Bitcoin Mainnet',
    txCount: 5892,
    lastSync: '2024-11-22T14:30:00Z',
    syncStatus: 'syncing',
    autoSync: true,
    syncFrequency: 5,
    scrapingSource: 'Blockchair',
    category: 'Exchange'
  },
  {
    id: 'sw-004',
    name: 'ETH Main Wallet',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    network: 'Ethereum Mainnet',
    txCount: 2156,
    lastSync: '2024-11-22T13:30:00Z',
    syncStatus: 'synced',
    autoSync: true,
    syncFrequency: 60,
    scrapingSource: 'Etherscan',
    category: 'Personal'
  }
]

const demoScrapedTransactions: ScrapedTransaction[] = [
  {
    id: 'stx-001',
    txHash: 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d',
    walletId: 'sw-001',
    walletName: 'Main Mining Wallet',
    walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    network: 'Bitcoin Mainnet',
    date: '2024-11-22T14:30:00Z',
    direction: 'out',
    amount: 0.5000,
    amountUSD: 42500.00,
    fee: 0.0001,
    confirmations: 1523,
    blockHeight: 825347,
    toAddress: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
    classification: 'cat-005',
    tags: [],
    notes: '',
    status: 'confirmed'
  },
  {
    id: 'stx-002',
    txHash: 'b2186ec55e527d4ca288g66c7195f3226c0456f27d6dg413gd91fa6egcg6e59e',
    walletId: 'sw-001',
    walletName: 'Main Mining Wallet',
    walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    network: 'Bitcoin Mainnet',
    date: '2024-11-22T09:15:00Z',
    direction: 'in',
    amount: 0.2500,
    amountUSD: 21250.00,
    fee: 0,
    confirmations: 2847,
    blockHeight: 825123,
    fromAddress: 'bc1qminingpool123456789abcdefgh',
    classification: 'cat-001',
    tags: ['mining', 'pool'],
    notes: 'Mining reward from pool',
    status: 'confirmed'
  },
  {
    id: 'stx-003',
    txHash: 'c3297fd6a8b7e9c5d4f2a1b8e7c6d5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8',
    walletId: 'sw-002',
    walletName: 'Cold Storage Vault',
    walletAddress: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
    network: 'Bitcoin Mainnet',
    date: '2024-11-21T18:00:00Z',
    direction: 'in',
    amount: 1.0000,
    amountUSD: 85000.00,
    fee: 0,
    confirmations: 3256,
    blockHeight: 824892,
    fromAddress: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    classification: 'cat-002',
    tags: ['internal', 'security'],
    notes: 'Monthly consolidation to cold storage',
    status: 'confirmed'
  },
  {
    id: 'stx-004',
    txHash: 'd4408ge7b9c8f0d6e5g3b2c9f1e8d7c6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0',
    walletId: 'sw-003',
    walletName: 'Exchange Hot Wallet',
    walletAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'Bitcoin Mainnet',
    date: '2024-11-20T12:30:00Z',
    direction: 'out',
    amount: 0.1500,
    amountUSD: 12750.00,
    fee: 0.00006,
    confirmations: 4523,
    blockHeight: 824567,
    toAddress: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
    classification: 'cat-003',
    tags: ['supplier', 'monthly'],
    notes: 'Payment to mining equipment supplier',
    status: 'confirmed'
  }
]

const demoClassificationCategories: ClassificationCategory[] = [
  {
    id: 'cat-001',
    name: 'Mining Income',
    color: '#4CAF50',
    icon: 'mining',
    description: 'Revenue from mining operations',
    taxCategory: 'income',
    txCount: 1247,
    volume: 52.3,
    autoRule: { direction: 'in', minAmount: 0.01, addressContains: 'mining' }
  },
  {
    id: 'cat-002',
    name: 'Internal Transfer',
    color: '#2196F3',
    icon: 'transfer',
    description: 'Transfers between own wallets',
    taxCategory: 'non-taxable',
    txCount: 384,
    volume: 127.8,
    autoRule: { fromMonitored: true, toMonitored: true }
  },
  {
    id: 'cat-003',
    name: 'Payment (Supplier)',
    color: '#FFC107',
    icon: 'payment',
    description: 'Payments to suppliers and vendors',
    taxCategory: 'expense',
    txCount: 892,
    volume: 23.5,
    autoRule: { direction: 'out', tags: ['supplier', 'vendor'] }
  },
  {
    id: 'cat-004',
    name: 'Exchange Activity',
    color: '#FF9800',
    icon: 'exchange',
    description: 'Deposits/withdrawals to exchanges',
    taxCategory: 'other',
    txCount: 156,
    volume: 8.9,
    autoRule: { addressContains: 'exchange' }
  },
  {
    id: 'cat-005',
    name: 'Unclassified',
    color: '#9E9E9E',
    icon: 'unclassified',
    description: 'Transactions not yet classified',
    taxCategory: 'unknown',
    txCount: 23,
    volume: 1.2,
    autoRule: null
  }
]

// Helper functions
const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}/${month} ${hours}h${minutes}`
}

const truncateAddress = (address: string, start: number = 6, end: number = 4) => {
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

const formatTimeAgo = (dateString: string | null) => {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

// Helper function to get category icon
const getCategoryIcon = (iconName: string, size: number = 14): JSX.Element => {
  const iconMap: Record<string, JSX.Element> = {
    mining: <StatusExcellentIcon key="mining" size={size} />,
    transfer: <StatusGoodIcon key="transfer" size={size} />,
    payment: <StatusWarningIcon key="payment" size={size} />,
    exchange: <StatusWarningIcon key="exchange" size={size} />,
    unclassified: <StatusPendingIcon key="unclassified" size={size} />
  }
  return iconMap[iconName] || <StatusPendingIcon key="default" size={size} />
}

// Auto-classification function
const autoClassifyTransaction = (tx: ScrapedTransaction, wallets: ScrapedWallet[], categories: ClassificationCategory[]): string => {
  for (const category of categories) {
    if (!category.autoRule) continue
    const rule = category.autoRule
    let matches = true
    
    if (rule.direction && tx.direction !== rule.direction) matches = false
    if (rule.minAmount && tx.amount < rule.minAmount) matches = false
    if (rule.maxAmount && tx.amount > rule.maxAmount) matches = false
    if (rule.addressContains) {
      const searchIn = `${tx.toAddress || ''} ${tx.fromAddress || ''}`.toLowerCase()
      if (!searchIn.includes(rule.addressContains.toLowerCase())) matches = false
    }
    if (rule.fromMonitored && !wallets.find(w => w.address === tx.fromAddress)) matches = false
    if (rule.toMonitored && !wallets.find(w => w.address === tx.toAddress)) matches = false
    
    if (matches) return category.id
  }
  return 'cat-005' // Unclassified
}

export default function WalletScraper() {
  const [activeTab, setActiveTab] = useState<'wallets' | 'transactions' | 'classifications' | 'analytics'>('wallets')
  const [wallets, setWallets] = useState<ScrapedWallet[]>(demoScrapedWallets)
  const [transactions, setTransactions] = useState<ScrapedTransaction[]>(demoScrapedTransactions)
  const [categories, setCategories] = useState<ClassificationCategory[]>(demoClassificationCategories)
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set())
  const [showAddWalletModal, setShowAddWalletModal] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showClassificationModal, setShowClassificationModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<ScrapedTransaction | null>(null)
  const [filters, setFilters] = useState({
    wallet: 'all',
    network: 'all',
    classification: 'all',
    direction: 'all',
    searchTerm: '',
    minAmount: '',
    maxAmount: '',
    startDate: '',
    endDate: ''
  })
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (filters.wallet !== 'all' && tx.walletId !== filters.wallet) return false
    if (filters.network !== 'all' && tx.network !== filters.network) return false
    if (filters.classification !== 'all' && tx.classification !== filters.classification) return false
    if (filters.direction !== 'all' && tx.direction !== filters.direction) return false
    if (filters.minAmount && tx.amount < parseFloat(filters.minAmount)) return false
    if (filters.maxAmount && tx.amount > parseFloat(filters.maxAmount)) return false
    if (filters.startDate && new Date(tx.date) < new Date(filters.startDate)) return false
    if (filters.endDate && new Date(tx.date) > new Date(filters.endDate)) return false
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      if (!tx.txHash.toLowerCase().includes(term) &&
          !tx.walletAddress.toLowerCase().includes(term) &&
          !(tx.toAddress && tx.toAddress.toLowerCase().includes(term)) &&
          !(tx.fromAddress && tx.fromAddress.toLowerCase().includes(term)) &&
          !tx.notes.toLowerCase().includes(term)) {
        return false
      }
    }
    return true
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig) return 0
    
    let aVal: any = a[sortConfig.key as keyof ScrapedTransaction]
    let bVal: any = b[sortConfig.key as keyof ScrapedTransaction]
    
    if (sortConfig.key === 'date') {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
    }
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)

  // Stats
  const totalTxs = filteredTransactions.length
  const incomingTxs = filteredTransactions.filter(tx => tx.direction === 'in').length
  const outgoingTxs = filteredTransactions.filter(tx => tx.direction === 'out').length
  const unclassifiedTxs = filteredTransactions.filter(tx => tx.classification === 'cat-005').length
  const totalVolume = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0)

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const toggleTransactionSelection = (txId: string) => {
    setSelectedTransactions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(txId)) {
        newSet.delete(txId)
      } else {
        newSet.add(txId)
      }
      return newSet
    })
  }

  const selectAllTransactions = () => {
    if (selectedTransactions.size === paginatedTransactions.length) {
      setSelectedTransactions(new Set())
    } else {
      setSelectedTransactions(new Set(paginatedTransactions.map(tx => tx.id)))
    }
  }

  const scrapeWallet = async (walletId: string) => {
    const wallet = wallets.find(w => w.id === walletId)
    if (!wallet) return

    setWallets(wallets.map(w => 
      w.id === walletId ? { ...w, syncStatus: 'syncing' as const } : w
    ))

    try {
      // Simuler le scraping
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mettre à jour le wallet
      setWallets(wallets.map(w => 
        w.id === walletId 
          ? { 
              ...w, 
              syncStatus: 'synced' as const,
              lastSync: new Date().toISOString(),
              txCount: w.txCount + Math.floor(Math.random() * 10)
            } 
          : w
      ))

      alert(`${wallet.name}: Scraping completed`)
    } catch (error) {
      setWallets(wallets.map(w => 
        w.id === walletId ? { ...w, syncStatus: 'error' as const } : w
      ))
      alert(`Failed to scrape ${wallet.name}`)
    }
  }

  const syncAllWallets = async () => {
    for (const wallet of wallets.filter(w => w.autoSync)) {
      await scrapeWallet(wallet.id)
    }
  }

  const addWallet = (walletData: Partial<ScrapedWallet>) => {
    const newWallet: ScrapedWallet = {
      id: `sw-${String(wallets.length + 1).padStart(3, '0')}`,
      name: walletData.name || '',
      address: walletData.address || '',
      network: walletData.network || 'Bitcoin Mainnet',
      txCount: 0,
      lastSync: null,
      syncStatus: 'pending',
      autoSync: walletData.autoSync || false,
      syncFrequency: walletData.syncFrequency || 15,
      scrapingSource: walletData.scrapingSource || 'Blockchain.com',
      category: walletData.category || 'Personal',
      description: walletData.description
    }
    setWallets([...wallets, newWallet])
    setShowAddWalletModal(false)
  }

  const classifyTransaction = (txId: string, classificationId: string, tags: string[] = [], notes: string = '') => {
    setTransactions(transactions.map(tx =>
      tx.id === txId
        ? { ...tx, classification: classificationId, tags, notes }
        : tx
    ))
    setShowTransactionModal(false)
    setSelectedTransaction(null)
  }

  const bulkClassify = (classificationId: string) => {
    setTransactions(transactions.map(tx =>
      selectedTransactions.has(tx.id)
        ? { ...tx, classification: classificationId }
        : tx
    ))
    setSelectedTransactions(new Set())
  }

  const openTransactionModal = (txId: string) => {
    const tx = transactions.find(t => t.id === txId)
    setSelectedTransaction(tx || null)
    setShowTransactionModal(true)
  }

  const exportTransactions = (format: 'csv' | 'json' | 'excel') => {
    const txsToExport = selectedTransactions.size > 0
      ? transactions.filter(tx => selectedTransactions.has(tx.id))
      : filteredTransactions

    if (txsToExport.length === 0) {
      alert('No transactions to export')
      return
    }

    if (format === 'csv') {
      const headers = ['TX Hash', 'Date', 'Wallet', 'Direction', 'Amount (BTC)', 'Amount (USD)', 'Fee', 'Classification', 'Tags', 'Notes']
      const rows = txsToExport.map(tx => {
        const category = categories.find(c => c.id === tx.classification)
        return [
          tx.txHash,
          formatDateTime(tx.date),
          tx.walletName,
          tx.direction.toUpperCase(),
          tx.amount.toFixed(8),
          tx.amountUSD.toFixed(2),
          tx.fee.toFixed(8),
          category ? category.name : 'Unclassified',
          tx.tags.join(';'),
          tx.notes
        ]
      })
      let csv = headers.join(',') + '\n'
      csv += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `transactions_export_${Date.now()}.csv`
      a.click()
    } else if (format === 'json') {
      const json = JSON.stringify(txsToExport, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `transactions_export_${Date.now()}.json`
      a.click()
    }

    alert(`Exported ${txsToExport.length} transactions as ${format.toUpperCase()}`)
    setShowExportModal(false)
  }

  return (
    <div className="wallet-scraper">
      {/* Header */}
      <div className="scraper-header">
        <h1>WALLET SCRAPER - Blockchain Transaction Analysis</h1>
        <div className="scraper-header-actions">
          <button className="btn-add-large" onClick={() => setShowAddWalletModal(true)}>
            + Add Wallet
          </button>
          <button className="btn-secondary" onClick={syncAllWallets} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshIcon size={16} /> Refresh All
          </button>
          <button className="btn-secondary" onClick={() => setShowExportModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={16} /> Export All
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon size={16} /> Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="scraper-tabs">
        <button
          className={`scraper-tab ${activeTab === 'wallets' ? 'active' : ''}`}
          onClick={() => setActiveTab('wallets')}
        >
          <ListIcon size={18} /> Monitored Wallets
        </button>
        <button
          className={`scraper-tab ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <ChartIcon size={18} /> All Transactions
        </button>
        <button
          className={`scraper-tab ${activeTab === 'classifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('classifications')}
        >
          <TagIcon size={18} /> Classifications
        </button>
        <button
          className={`scraper-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <AnalyticsIcon size={18} /> Analytics
        </button>
      </div>

      {/* Content */}
      <div className="scraper-content">
        {activeTab === 'wallets' && (
          <MonitoredWalletsTab
            wallets={wallets}
            onAddWallet={() => setShowAddWalletModal(true)}
            onScrape={scrapeWallet}
            onSyncAll={syncAllWallets}
          />
        )}

        {activeTab === 'transactions' && (
          <AllTransactionsTab
            transactions={paginatedTransactions}
            allTransactions={filteredTransactions}
            categories={categories}
            wallets={wallets}
            filters={filters}
            onFiltersChange={setFilters}
            onSort={handleSort}
            sortConfig={sortConfig}
            selectedTransactions={selectedTransactions}
            onToggleSelection={toggleTransactionSelection}
            onSelectAll={selectAllTransactions}
            onClassify={openTransactionModal}
            onBulkClassify={bulkClassify}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalTxs={totalTxs}
            incomingTxs={incomingTxs}
            outgoingTxs={outgoingTxs}
            unclassifiedTxs={unclassifiedTxs}
            totalVolume={totalVolume}
            onExport={() => setShowExportModal(true)}
          />
        )}

        {activeTab === 'classifications' && (
          <ClassificationsTab
            categories={categories}
            transactions={transactions}
            onAddCategory={() => setShowClassificationModal(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab
            transactions={transactions}
            categories={categories}
            wallets={wallets}
          />
        )}
      </div>

      {/* Modals */}
      {showAddWalletModal && (
        <AddWalletModal
          onClose={() => setShowAddWalletModal(false)}
          onSave={addWallet}
        />
      )}

      {showTransactionModal && selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          categories={categories}
          wallets={wallets}
          onClose={() => {
            setShowTransactionModal(false)
            setSelectedTransaction(null)
          }}
          onClassify={classifyTransaction}
        />
      )}

      {showClassificationModal && (
        <CreateClassificationModal
          onClose={() => setShowClassificationModal(false)}
          onSave={(categoryData) => {
            const newCategory: ClassificationCategory = {
              id: `cat-${String(categories.length + 1).padStart(3, '0')}`,
              name: categoryData.name,
              color: categoryData.color,
              icon: categoryData.icon,
              description: categoryData.description,
              taxCategory: categoryData.taxCategory,
              txCount: 0,
              volume: 0,
              autoRule: categoryData.autoRule
            }
            setCategories([...categories, newCategory])
            setShowClassificationModal(false)
          }}
        />
      )}

      {showExportModal && (
        <ExportModal
          selectedCount={selectedTransactions.size}
          totalCount={filteredTransactions.length}
          onClose={() => setShowExportModal(false)}
          onExport={exportTransactions}
        />
      )}
    </div>
  )
}

// Tab: Monitored Wallets
function MonitoredWalletsTab({
  wallets,
  onAddWallet,
  onScrape,
  onSyncAll
}: {
  wallets: ScrapedWallet[]
  onAddWallet: () => void
  onScrape: (id: string) => void
  onSyncAll: () => void
}) {
  const totalTxs = wallets.reduce((sum, w) => sum + w.txCount, 0)
  const lastSync = wallets
    .filter(w => w.lastSync)
    .sort((a, b) => new Date(b.lastSync!).getTime() - new Date(a.lastSync!).getTime())[0]?.lastSync

  return (
    <div>
      <div className="scraper-action-buttons">
        <button className="btn-add-large" onClick={onAddWallet}>
          + Add Wallet to Monitor
        </button>
        <button className="btn-secondary" onClick={onSyncAll} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SyncIcon size={16} /> Sync All
        </button>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImportIcon size={16} /> Import List
        </button>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <SearchIcon size={18} style={{ position: 'absolute', left: '12px', color: '#888' }} />
          <input
            type="text"
            className="search-input-large"
            placeholder="Search wallets..."
            style={{ paddingLeft: '40px' }}
          />
        </div>
      </div>

      <div className="scraper-table-container">
        <table className="scraper-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name/Label</th>
              <th>Address</th>
              <th>Network</th>
              <th>Txs Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <tr key={wallet.id}>
                <td>#{wallet.id.split('-')[1]}</td>
                <td>
                  <strong>{wallet.name}</strong>
                  {wallet.category && (
                    <>
                      <br />
                      <small style={{ color: '#888' }}>{wallet.category}</small>
                    </>
                  )}
                </td>
                <td>
                  <span style={{ fontFamily: 'monospace' }}>{truncateAddress(wallet.address)}</span>
                </td>
                <td>{wallet.network}</td>
                <td>{wallet.txCount.toLocaleString()}</td>
                <td>
                  <div>
                    <span className={`sync-status-${wallet.syncStatus}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {wallet.syncStatus === 'synced' ? <StatusExcellentIcon size={14} /> : wallet.syncStatus === 'syncing' ? <SyncIcon size={14} /> : wallet.syncStatus === 'error' ? <StatusErrorIcon size={14} /> : <StatusPendingIcon size={14} />} {wallet.syncStatus === 'synced' ? 'Synced' : wallet.syncStatus === 'syncing' ? 'Syncing' : wallet.syncStatus === 'error' ? 'Error' : 'Pending'}
                    </span>
                    {wallet.lastSync && (
                      <>
                        <br />
                        <small style={{ color: '#888' }}>{formatTimeAgo(wallet.lastSync)}</small>
                      </>
                    )}
                  </div>
                </td>
                <td>
                  <button className="btn-sm" onClick={() => onScrape(wallet.id)}>
                    {wallet.syncStatus === 'syncing' ? 'Stop' : 'Scrape'}
                  </button>
                  <button className="btn-sm" style={{ marginLeft: '8px' }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="quick-stats-scraper">
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">{wallets.length}</div>
          <div className="quick-stat-scraper-label">Wallets Monitored</div>
        </div>
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">{totalTxs.toLocaleString()}</div>
          <div className="quick-stat-scraper-label">Total Txs</div>
        </div>
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">{formatTimeAgo(lastSync || null)}</div>
          <div className="quick-stat-scraper-label">Last Sync</div>
        </div>
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">
            {wallets.filter(w => w.autoSync).length > 0 ? (
              <CheckIcon size={16} color="#4CAF50" />
            ) : (
              <XIcon size={16} color="#F44336" />
            )}
          </div>
          <div className="quick-stat-scraper-label">Auto-sync</div>
        </div>
      </div>
    </div>
  )
}

// Tab: All Transactions
function AllTransactionsTab({
  transactions,
  allTransactions,
  categories,
  wallets,
  filters,
  onFiltersChange,
  onSort,
  sortConfig,
  selectedTransactions,
  onToggleSelection,
  onSelectAll,
  onClassify,
  onBulkClassify,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalTxs,
  incomingTxs,
  outgoingTxs,
  unclassifiedTxs,
  totalVolume,
  onExport
}: {
  transactions: ScrapedTransaction[]
  allTransactions: ScrapedTransaction[]
  categories: ClassificationCategory[]
  wallets: ScrapedWallet[]
  filters: any
  onFiltersChange: (filters: any) => void
  onSort: (key: string) => void
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null
  selectedTransactions: Set<string>
  onToggleSelection: (id: string) => void
  onSelectAll: () => void
  onClassify: (id: string) => void
  onBulkClassify: (classificationId: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage: number
  totalTxs: number
  incomingTxs: number
  outgoingTxs: number
  unclassifiedTxs: number
  totalVolume: number
  onExport: () => void
}) {
  const allSelected = selectedTransactions.size === transactions.length && transactions.length > 0

  return (
    <div>
      {/* Advanced Filters */}
      <div className="filter-panel">
        <h3>ADVANCED FILTERS & SEARCH</h3>
        <div className="filter-row">
          <input
            type="text"
            className="search-input-large"
            placeholder="Search..."
            value={filters.searchTerm}
            onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
          />
          <select
            className="btn-secondary"
            value={filters.wallet}
            onChange={(e) => onFiltersChange({ ...filters, wallet: e.target.value })}
            style={{ height: '48px' }}
          >
            <option value="all">All Wallets</option>
            {wallets.map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
          <select
            className="btn-secondary"
            value={filters.network}
            onChange={(e) => onFiltersChange({ ...filters, network: e.target.value })}
            style={{ height: '48px' }}
          >
            <option value="all">All Networks</option>
            <option value="Bitcoin Mainnet">Bitcoin Mainnet</option>
            <option value="Ethereum Mainnet">Ethereum Mainnet</option>
          </select>
          <select
            className="btn-secondary"
            value={filters.classification}
            onChange={(e) => onFiltersChange({ ...filters, classification: e.target.value })}
            style={{ height: '48px' }}
          >
            <option value="all">All Classifications</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-row">
          <select
            className="btn-secondary"
            value={filters.direction}
            onChange={(e) => onFiltersChange({ ...filters, direction: e.target.value })}
            style={{ height: '48px' }}
          >
            <option value="all">All Directions</option>
            <option value="in">Incoming</option>
            <option value="out">Outgoing</option>
          </select>
          <input
            type="number"
            className="search-input-large"
            placeholder="Min Amount (BTC)"
            value={filters.minAmount}
            onChange={(e) => onFiltersChange({ ...filters, minAmount: e.target.value })}
            style={{ width: '200px' }}
          />
          <input
            type="number"
            className="search-input-large"
            placeholder="Max Amount (BTC)"
            value={filters.maxAmount}
            onChange={(e) => onFiltersChange({ ...filters, maxAmount: e.target.value })}
            style={{ width: '200px' }}
          />
          <button className="btn-secondary" onClick={() => onFiltersChange({
            wallet: 'all',
            network: 'all',
            classification: 'all',
            direction: 'all',
            searchTerm: '',
            minAmount: '',
            maxAmount: '',
            startDate: '',
            endDate: ''
          })}>Reset</button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTransactions.size > 0 && (
        <div className="bulk-action-bar">
          <span className="selected-count">Selected: {selectedTransactions.size}</span>
          <select
            className="btn-secondary"
            onChange={(e) => {
              if (e.target.value) {
                onBulkClassify(e.target.value)
              }
            }}
            defaultValue=""
            style={{ height: '40px' }}
          >
            <option value="">Classify Selected</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
          <button className="btn-secondary" onClick={onExport}>Export Selected</button>
          <button className="btn-secondary" onClick={() => onToggleSelection('')}>Clear Selection</button>
        </div>
      )}

      {/* Transactions Table */}
      <div className="scraper-table-container">
        <table className="scraper-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                />
              </th>
              <th className="sortable" onClick={() => onSort('txHash')}>
                TX# {sortConfig?.key === 'txHash' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="sortable" onClick={() => onSort('date')}>
                Date {sortConfig?.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Wallet</th>
              <th>Direction</th>
              <th className="sortable" onClick={() => onSort('amount')}>
                Amount {sortConfig?.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Classification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const category = categories.find(c => c.id === tx.classification) || categories[4]
              const isSelected = selectedTransactions.has(tx.id)
              return (
                <tr
                  key={tx.id}
                  className={isSelected ? 'selected' : ''}
                  onClick={() => onClassify(tx.id)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="tx-checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelection(tx.id)}
                    />
                  </td>
                  <td>
                    <strong>{tx.txHash.substring(0, 8)}...</strong>
                    <br />
                    <small style={{ color: '#888' }}>{tx.txHash}</small>
                  </td>
                  <td>{formatDateTime(tx.date)}</td>
                  <td>
                    <strong>{tx.walletName}</strong>
                    <br />
                    <small style={{ color: '#888' }}>{truncateAddress(tx.walletAddress)}</small>
                  </td>
                  <td>
                    <span className={tx.direction === 'in' ? 'direction-in' : 'direction-out'}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {tx.direction === 'in' ? (
                          <>
                            IN <ArrowDownIcon size={14} />
                          </>
                        ) : (
                          <>
                            OUT <ArrowUpIcon size={14} />
                          </>
                        )}
                      </span>
                    </span>
                    <br />
                    <small style={{ color: '#888' }}>
                      {tx.direction === 'in' ? 'From' : 'To'}: {truncateAddress(tx.direction === 'in' ? tx.fromAddress || '' : tx.toAddress || '')}
                    </small>
                  </td>
                  <td>
                    <strong>{tx.amount.toFixed(4)} BTC</strong>
                    <br />
                    <small style={{ color: '#888' }}>${tx.amountUSD.toLocaleString()}</small>
                  </td>
                  <td>
                    <span className={`classification-badge badge-${category.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {getCategoryIcon(category.icon, 14)} {category.name}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onClassify(tx.id)
                      }}
                    >
                      Classify
                    </button>
                    <button
                      className="btn-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onClassify(tx.id)
                      }}
                      style={{ marginLeft: '8px' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalTxs)} of {totalTxs} txs
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="quick-stats-scraper">
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">Total: {totalTxs}</div>
          <div className="quick-stat-scraper-label">txs</div>
        </div>
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">Incoming: {incomingTxs}</div>
          <div className="quick-stat-scraper-label">({incomingTxs > 0 ? ((incomingTxs / totalTxs) * 100).toFixed(0) : 0}%)</div>
        </div>
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">Outgoing: {outgoingTxs}</div>
          <div className="quick-stat-scraper-label">({outgoingTxs > 0 ? ((outgoingTxs / totalTxs) * 100).toFixed(0) : 0}%)</div>
        </div>
        <div className="quick-stat-scraper">
          <div className="quick-stat-scraper-value">Unclassified: {unclassifiedTxs}</div>
          <div className="quick-stat-scraper-label">({unclassifiedTxs > 0 ? ((unclassifiedTxs / totalTxs) * 100).toFixed(0) : 0}%)</div>
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <div style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>
          Volume: {totalVolume.toFixed(4)} BTC (${(totalVolume * 85000).toLocaleString()})
        </div>
        <div className="scraper-action-buttons" style={{ justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={onExport} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={16} /> Export Current View
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ReportIcon size={16} /> Generate Report
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshIcon size={16} /> Refresh Data
          </button>
        </div>
      </div>
    </div>
  )
}

// Tab: Classifications
function ClassificationsTab({
  categories,
  transactions,
  onAddCategory
}: {
  categories: ClassificationCategory[]
  transactions: ScrapedTransaction[]
  onAddCategory: () => void
}) {
  const categoryStats = categories.map(cat => {
    const catTxs = transactions.filter(tx => tx.classification === cat.id)
    const catVolume = catTxs.reduce((sum, tx) => sum + tx.amount, 0)
    return {
      ...cat,
      actualCount: catTxs.length,
      actualVolume: catVolume
    }
  })

  const totalTxs = transactions.length
  const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div>
      <div className="scraper-action-buttons">
        <button className="btn-add-large" onClick={onAddCategory}>
          + Create New Category
        </button>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ImportIcon size={16} /> Import Categories
        </button>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SettingsIcon size={16} /> Manage Rules
        </button>
      </div>

      <div className="two-col-layout">
        <div>
          <h3 style={{ fontSize: '18px', marginBottom: '24px', color: '#8afd81' }}>CATEGORY LIST</h3>
          {categoryStats.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="category-card-header">
                <div className="category-card-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getCategoryIcon(cat.icon, 16)}
                  <span>{cat.name}</span>
                </div>
              </div>
              <div className="category-card-stats">
                <div>Count: {cat.actualCount} txs</div>
                <div>Volume: {cat.actualVolume.toFixed(4)} BTC</div>
              </div>
              <div className="category-card-actions">
                <button className="btn-sm">Edit</button>
                <button className="btn-sm">Delete</button>
                <button className="btn-sm">View</button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: '18px', marginBottom: '24px', color: '#8afd81' }}>CLASSIFICATION STATS</h3>
          <div className="chart-placeholder">
            [Pie Chart - Classification distribution]
          </div>
          <div style={{ marginTop: '24px', fontSize: '14px', color: '#888', lineHeight: '2' }}>
            {categoryStats.map(cat => {
              const percentage = totalTxs > 0 ? ((cat.actualCount / totalTxs) * 100).toFixed(0) : 0
              return (
                <div key={cat.id}>
                  {cat.icon} {cat.name}: {percentage}%
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="auto-rule-panel">
        <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#8afd81' }}>AUTO-CLASSIFICATION RULES</h3>
        <div style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Active Rules: {categories.filter(c => c.autoRule).length}</div>
        {categories.filter(c => c.autoRule).map((cat, index) => (
          <div key={cat.id} className="auto-rule-item">
            Rule #{index + 1}: {cat.autoRule && (
              <>
                {cat.autoRule.direction && `If direction = ${cat.autoRule.direction.toUpperCase()}`}
                {cat.autoRule.minAmount && ` AND amount ≥ ${cat.autoRule.minAmount} BTC`}
                {cat.autoRule.addressContains && ` AND address contains "${cat.autoRule.addressContains}"`}
                {cat.autoRule.fromMonitored && ` AND from monitored wallet`}
                {cat.autoRule.toMonitored && ` AND to monitored wallet`}
                {` → "${cat.name}"`}
              </>
            )}
          </div>
        ))}
        <div style={{ marginTop: '16px' }}>
          <button className="btn-secondary">+ Add New Rule</button>
          <button className="btn-secondary" style={{ marginLeft: '8px' }}>Edit Rules</button>
          <button className="btn-secondary" style={{ marginLeft: '8px' }}>Disable All</button>
        </div>
      </div>
    </div>
  )
}

// Tab: Analytics
function AnalyticsTab({
  transactions,
  categories,
  wallets
}: {
  transactions: ScrapedTransaction[]
  categories: ClassificationCategory[]
  wallets: ScrapedWallet[]
}) {
  const totalIn = transactions.filter(tx => tx.direction === 'in').reduce((sum, tx) => sum + tx.amount, 0)
  const totalOut = transactions.filter(tx => tx.direction === 'out').reduce((sum, tx) => sum + tx.amount, 0)
  const net = totalIn - totalOut

  // Top addresses
  const inboundAddresses = transactions
    .filter(tx => tx.direction === 'in' && tx.fromAddress)
    .reduce((acc: any, tx) => {
      if (!acc[tx.fromAddress!]) {
        acc[tx.fromAddress!] = { address: tx.fromAddress!, count: 0, volume: 0 }
      }
      acc[tx.fromAddress!].count++
      acc[tx.fromAddress!].volume += tx.amount
      return acc
    }, {})

  const outboundAddresses = transactions
    .filter(tx => tx.direction === 'out' && tx.toAddress)
    .reduce((acc: any, tx) => {
      if (!acc[tx.toAddress!]) {
        acc[tx.toAddress!] = { address: tx.toAddress!, count: 0, volume: 0 }
      }
      acc[tx.toAddress!].count++
      acc[tx.toAddress!].volume += tx.amount
      return acc
    }, {})

  const topInbound = Object.values(inboundAddresses)
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 3) as any[]

  const topOutbound = Object.values(outboundAddresses)
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 3) as any[]

  const classificationBreakdown = categories.map(cat => {
    const catTxs = transactions.filter(tx => tx.classification === cat.id)
    const catVolume = catTxs.reduce((sum, tx) => sum + tx.amount, 0)
    const avgSize = catTxs.length > 0 ? catVolume / catTxs.length : 0
    const percentage = transactions.length > 0 ? ((catTxs.length / transactions.length) * 100).toFixed(0) : 0
    return {
      category: cat,
      count: catTxs.length,
      volume: catVolume,
      avgSize,
      percentage
    }
  })

  return (
    <div>
      <div className="scraper-action-buttons" style={{ marginBottom: '24px' }}>
        <button className="btn-secondary">Last 7 days</button>
        <button className="btn-secondary active">Last 30 days</button>
        <button className="btn-secondary">Last 90 days</button>
        <button className="btn-secondary">This year</button>
        <button className="btn-secondary">All time</button>
        <button className="btn-secondary">Custom</button>
      </div>

      <div className="analytics-charts">
        <div className="analytics-chart-container">
          <h3>VOLUME OVERVIEW</h3>
          <div className="chart-placeholder">
            [Line Chart - BTC volume over time]
          </div>
          <div style={{ marginTop: '16px', fontSize: '14px', lineHeight: '2' }}>
            <div>Total IN: {totalIn.toFixed(4)} BTC</div>
            <div>Total OUT: {totalOut.toFixed(4)} BTC</div>
            <div style={{ color: '#8afd81', fontWeight: '600' }}>Net: {net >= 0 ? '+' : ''}{net.toFixed(4)} BTC</div>
          </div>
        </div>

        <div className="analytics-chart-container">
          <h3>TRANSACTION COUNT</h3>
          <div className="chart-placeholder">
            [Bar Chart - Transactions per day]
          </div>
          <div style={{ marginTop: '16px', fontSize: '14px', lineHeight: '2' }}>
            <div>Total: {transactions.length.toLocaleString()} txs</div>
            <div>Avg per day: {Math.round(transactions.length / 30)} txs</div>
            <div>Peak: 156 txs (22/11)</div>
          </div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="analytics-chart-container">
          <h3>TOP ADDRESSES (Inbound)</h3>
          <ul className="top-addresses-list">
            {topInbound.map((item: any, index) => (
              <li key={item.address} className="top-address-item">
                <span className="top-address-rank">{index + 1}.</span>
                <div className="top-address-info">
                  <div className="top-address-address">{truncateAddress(item.address)}</div>
                  <div className="top-address-stats">{item.count} txs</div>
                </div>
                <div className="top-address-amount">{item.volume.toFixed(4)} BTC</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="analytics-chart-container">
          <h3>TOP ADDRESSES (Outbound)</h3>
          <ul className="top-addresses-list">
            {topOutbound.map((item: any, index) => (
              <li key={item.address} className="top-address-item">
                <span className="top-address-rank">{index + 1}.</span>
                <div className="top-address-info">
                  <div className="top-address-address">{truncateAddress(item.address)}</div>
                  <div className="top-address-stats">{item.count} txs</div>
                </div>
                <div className="top-address-amount">{item.volume.toFixed(4)} BTC</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="analytics-chart-container">
        <h3>CLASSIFICATION BREAKDOWN</h3>
        <div className="chart-placeholder" style={{ marginBottom: '24px' }}>
          [Stacked Bar Chart - Monthly volume by classification]
        </div>
        <table className="classification-breakdown-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Count</th>
              <th>Volume</th>
              <th>Avg Size</th>
              <th>% Total</th>
            </tr>
          </thead>
          <tbody>
            {classificationBreakdown.map((item) => (
              <tr key={item.category.id}>
                <td>
                  <span className={`classification-badge badge-${item.category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {getCategoryIcon(item.category.icon, 14)} {item.category.name}
                    </span>
                  </span>
                </td>
                <td>{item.count}</td>
                <td>{item.volume.toFixed(4)} BTC</td>
                <td>{item.avgSize.toFixed(4)} BTC</td>
                <td>{item.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="export-options-panel">
        <h3>EXPORT OPTIONS</h3>
        <div className="scraper-action-buttons" style={{ justifyContent: 'center' }}>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ReportIcon size={16} /> Generate PDF Report
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={16} /> Export CSV
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileIcon size={16} /> Export Excel
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SendIcon size={16} /> Email Report
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CopyIcon size={16} /> Share Link
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon size={16} /> Schedule Report
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal: Add Wallet
function AddWalletModal({
  onClose,
  onSave
}: {
  onClose: () => void
  onSave: (data: Partial<ScrapedWallet>) => void
}) {
  const [formData, setFormData] = useState<Partial<ScrapedWallet>>({
    name: '',
    address: '',
    network: 'Bitcoin Mainnet',
    scrapingSource: 'Blockchain.com',
    autoSync: true,
    syncFrequency: 15,
    category: 'Personal'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={24} /> ADD WALLET TO MONITOR
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="two-col-layout">
              <div className="form-section">
                <h3>WALLET IDENTIFICATION</h3>
                <div className="form-group">
                  <label>Wallet Name/Label:</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Wallet Address:</label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    style={{ fontFamily: 'monospace' }}
                  />
                  <button type="button" className="btn-sm" style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ValidateIcon size={14} /> Validate Address
                  </button>
                </div>
                <div className="form-group">
                  <label>Description/Tags:</label>
                  <textarea
                    rows={2}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={formData.category || 'Personal'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Mining">Mining</option>
                    <option value="Exchange">Exchange</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>SCRAPING OPTIONS</h3>
                <div className="form-group">
                  <label>Blockchain Network:</label>
                  <select
                    value={formData.network}
                    onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                  >
                    <option value="Bitcoin Mainnet">Bitcoin Mainnet</option>
                    <option value="Ethereum Mainnet">Ethereum Mainnet</option>
                    <option value="Litecoin Mainnet">Litecoin Mainnet</option>
                    <option value="Dogecoin Mainnet">Dogecoin Mainnet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Scraping Source:</label>
                  <select
                    value={formData.scrapingSource}
                    onChange={(e) => setFormData({ ...formData, scrapingSource: e.target.value })}
                  >
                    <option value="Blockchain.com">Blockchain.com API</option>
                    <option value="Blockchair">Blockchair API</option>
                    <option value="Etherscan">Etherscan API</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Historical Depth:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input type="radio" name="depth" defaultChecked />
                      <label>All transactions</label>
                    </div>
                    <div className="radio-option">
                      <input type="radio" name="depth" />
                      <label>Last 30 days</label>
                    </div>
                    <div className="radio-option">
                      <input type="radio" name="depth" />
                      <label>Last 90 days</label>
                    </div>
                    <div className="radio-option">
                      <input type="radio" name="depth" />
                      <label>Last year</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>AUTO-SYNC SETTINGS</h3>
              <div className="form-group">
                <div className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.autoSync}
                    onChange={(e) => setFormData({ ...formData, autoSync: e.target.checked })}
                  />
                  <label>Enable automatic synchronization</label>
                </div>
              </div>
              {formData.autoSync && (
                <div className="form-group">
                  <label>Sync Frequency:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="syncFrequency"
                        value="5"
                        checked={formData.syncFrequency === 5}
                        onChange={() => setFormData({ ...formData, syncFrequency: 5 })}
                      />
                      <label>Every 5 minutes</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="syncFrequency"
                        value="15"
                        checked={formData.syncFrequency === 15}
                        onChange={() => setFormData({ ...formData, syncFrequency: 15 })}
                      />
                      <label>Every 15 minutes</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="syncFrequency"
                        value="60"
                        checked={formData.syncFrequency === 60}
                        onChange={() => setFormData({ ...formData, syncFrequency: 60 })}
                      />
                      <label>Every hour</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="syncFrequency"
                        value="1440"
                        checked={formData.syncFrequency === 1440}
                        onChange={() => setFormData({ ...formData, syncFrequency: 1440 })}
                      />
                      <label>Daily</label>
                    </div>
                  </div>
                </div>
              )}
              <div className="form-group">
                <div className="checkbox-option">
                  <input type="checkbox" defaultChecked />
                  <label>Notify on new transactions</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" defaultChecked />
                  <label>Auto-classify incoming transactions</label>
                </div>
                <div className="checkbox-option">
                  <input type="checkbox" />
                  <label>Auto-export to CSV daily</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add-large">Add Wallet & Start Scraping</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal: Transaction Details
function TransactionDetailsModal({
  transaction,
  categories,
  wallets,
  onClose,
  onClassify
}: {
  transaction: ScrapedTransaction
  categories: ClassificationCategory[]
  wallets: ScrapedWallet[]
  onClose: () => void
  onClassify: (txId: string, classificationId: string, tags: string[], notes: string) => void
}) {
  const [selectedClassification, setSelectedClassification] = useState(transaction.classification)
  const [tags, setTags] = useState<string[]>(transaction.tags)
  const [newTag, setNewTag] = useState('')
  const [notes, setNotes] = useState(transaction.notes)

  const fromWallet = wallets.find(w => w.address === transaction.fromAddress)
  const toWallet = wallets.find(w => w.address === transaction.toAddress)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleSave = () => {
    onClassify(transaction.id, selectedClassification, tags, notes)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={24} /> TRANSACTION DETAILS (Blockchain Data)
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="two-col-layout">
            <div className="form-section">
              <h3>BLOCKCHAIN INFORMATION</h3>
              <div className="form-group">
                <label>TX Hash:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{transaction.txHash}</span>
                  <button className="btn-copy" onClick={() => copyToClipboard(transaction.txHash)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CopyIcon size={14} /> Copy
                  </button>
                  <button className="btn-copy" onClick={() => window.open(`https://blockchain.info/tx/${transaction.txHash}`, '_blank')}>View on Explorer</button>
                </div>
              </div>
              <div className="form-group">
                <label>Block Height:</label>
                <div>{transaction.blockHeight || 'N/A'}</div>
              </div>
              <div className="form-group">
                <label>Confirmations:</label>
                <div>{transaction.confirmations.toLocaleString()}</div>
              </div>
              <div className="form-group">
                <label>Date:</label>
                <div>{new Date(transaction.date).toLocaleString()}</div>
              </div>
              <div className="form-group">
                <label>Network:</label>
                <div>{transaction.network}</div>
              </div>
              <div className="form-group">
                <label>Fee:</label>
                <div>{transaction.fee.toFixed(8)} BTC (${(transaction.fee * 85000).toFixed(2)})</div>
              </div>
            </div>

            <div className="form-section">
              <h3>CLASSIFICATION</h3>
              <div className="form-group">
                <label>Current Classification:</label>
                {(() => {
                  const cat = categories.find(c => c.id === transaction.classification) || categories[4]
                  return (
                    <span className={`classification-badge badge-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {cat.icon} {cat.name}
                    </span>
                  )
                })()}
              </div>
              <div className="form-group">
                <label>Assign Classification:</label>
                <select
                  value={selectedClassification}
                  onChange={(e) => setSelectedClassification(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Add Tags:</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Enter tag..."
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn-sm" onClick={addTag}>+ Add</button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 12px',
                        background: 'rgba(165, 255, 156, 0.1)',
                        border: '1px solid #8afd81',
                        borderRadius: '20px',
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        style={{ background: 'none', border: 'none', color: '#8afd81', cursor: 'pointer' }}
                      >
                        <XIcon size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>TRANSACTION FLOW</h3>
            {transaction.direction === 'out' ? (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>INPUTS (1)</div>
                  <div style={{ padding: '12px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '4px' }}>{transaction.walletAddress}</div>
                    <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {transaction.walletName} (Monitored <CheckIcon size={12} color="#4CAF50" />)
                    </div>
                    <div style={{ color: '#8afd81', marginTop: '8px' }}>Amount: {(transaction.amount + transaction.fee).toFixed(8)} BTC</div>
                  </div>
                </div>
                <div style={{ textAlign: 'center', margin: '16px 0', color: '#8afd81', display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownIcon size={24} color="#8afd81" />
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>OUTPUTS (1)</div>
                  <div style={{ padding: '12px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '4px' }}>{transaction.toAddress}</div>
                    {toWallet && (
                      <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {toWallet.name} (Monitored <CheckIcon size={12} color="#4CAF50" />)
                      </div>
                    )}
                    <div style={{ color: '#8afd81', marginTop: '8px' }}>Amount: {transaction.amount.toFixed(8)} BTC</div>
                  </div>
                </div>
                {transaction.fee > 0 && (
                  <div style={{ marginTop: '12px', padding: '12px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                    <div style={{ fontSize: '12px', color: '#888' }}>Miner Fee</div>
                    <div style={{ color: '#8afd81' }}>Amount: {transaction.fee.toFixed(8)} BTC</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>FROM</div>
                  <div style={{ padding: '12px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '4px' }}>{transaction.fromAddress}</div>
                    {fromWallet && (
                      <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {fromWallet.name} (Monitored <CheckIcon size={12} color="#4CAF50" />)
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'center', margin: '16px 0', color: '#8afd81', display: 'flex', justifyContent: 'center' }}>
                  <ArrowDownIcon size={24} color="#8afd81" />
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>TO</div>
                  <div style={{ padding: '12px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '14px', marginBottom: '4px' }}>{transaction.walletAddress}</div>
                    <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {transaction.walletName} (Monitored <CheckIcon size={12} color="#4CAF50" />)
                    </div>
                    <div style={{ color: '#8afd81', marginTop: '8px' }}>Amount: {transaction.amount.toFixed(8)} BTC</div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="form-section">
            <h3>NOTES & MEMO</h3>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this transaction..."
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-secondary" onClick={() => {
            const dataStr = JSON.stringify(transaction, null, 2)
            const blob = new Blob([dataStr], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `tx_${transaction.txHash.substring(0, 8)}.json`
            a.click()
          }}>Export TX Data</button>
          <button className="btn-add-large" onClick={handleSave}>Save Classification & Notes</button>
        </div>
      </div>
    </div>
  )
}

// Modal: Create Classification
function CreateClassificationModal({
  onClose,
  onSave
}: {
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    color: '#4CAF50',
    icon: 'mining',
    description: '',
    taxCategory: 'unknown',
    autoRule: null as any
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const colorOptions = [
    { value: '#4CAF50', label: 'Green' },
    { value: '#2196F3', label: 'Blue' },
    { value: '#FFC107', label: 'Yellow' },
    { value: '#FF9800', label: 'Orange' },
    { value: '#F44336', label: 'Red' },
    { value: '#9C27B0', label: 'Purple' },
    { value: '#000000', label: 'Black' },
    { value: '#9E9E9E', label: 'Gray' }
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TagIcon size={24} /> CREATE CLASSIFICATION CATEGORY
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <h3>CATEGORY INFORMATION</h3>
              <div className="form-group">
                <label>Category Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category Color:</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {colorOptions.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: opt.value })}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        border: formData.color === opt.value ? '2px solid #8afd81' : '1px solid #333',
                        background: opt.value,
                        cursor: 'pointer',
                        title: opt.label
                      }}
                    />
                  ))}
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Icon/Emoji:</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  maxLength={2}
                  style={{ width: '100px' }}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Tax Category:</label>
                <select
                  value={formData.taxCategory}
                  onChange={(e) => setFormData({ ...formData, taxCategory: e.target.value })}
                >
                  <option value="income">Income</option>
                  <option value="capital-gain">Capital Gain</option>
                  <option value="expense">Expense</option>
                  <option value="non-taxable">Non-taxable</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>AUTO-CLASSIFICATION RULE (optional)</h3>
              <div className="checkbox-option">
                <input
                  type="checkbox"
                  checked={formData.autoRule !== null}
                  onChange={(e) => setFormData({ ...formData, autoRule: e.target.checked ? {} : null })}
                />
                <label>Create automatic classification rule</label>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add-large">Create Category</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal: Export
function ExportModal({
  selectedCount,
  totalCount,
  onClose,
  onExport
}: {
  selectedCount: number
  totalCount: number
  onClose: () => void
  onExport: (format: 'csv' | 'json' | 'excel') => void
}) {
  const [exportScope, setExportScope] = useState<'selected' | 'all'>('all')
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'excel'>('csv')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={24} /> EXPORT DATA
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-section">
            <h3>EXPORT SCOPE</h3>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="scope"
                  value="selected"
                  checked={exportScope === 'selected'}
                  onChange={() => setExportScope('selected')}
                  disabled={selectedCount === 0}
                />
                <label>Selected transactions ({selectedCount} selected)</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="scope"
                  value="all"
                  checked={exportScope === 'all'}
                  onChange={() => setExportScope('all')}
                />
                <label>All transactions ({totalCount} total)</label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>EXPORT FORMAT</h3>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                />
                <label>CSV (Comma-Separated Values)</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={() => setExportFormat('excel')}
                />
                <label>Excel (.xlsx) - With formatting</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={exportFormat === 'json'}
                  onChange={() => setExportFormat('json')}
                />
                <label>JSON (Developer-friendly)</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-add-large" onClick={() => onExport(exportFormat)}>
            Export & Download
          </button>
        </div>
      </div>
    </div>
  )
}

