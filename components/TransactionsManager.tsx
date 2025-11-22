'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { transactionsAPI } from '@/lib/api'
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal'
import { Transaction, Wallet, demoTransactions, demoWallets } from '@/utils/transactionsData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Données de démo (fallback)
const demoTransactionsFallback: Transaction[] = [
  {
    id: 'TX-2024-001',
    date: '2024-11-22T14:30:00Z',
    timestamp: 1732282200000,
    from: {
      walletId: 'wallet-001',
      name: 'Main Mining Wallet',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    to: {
      walletId: 'wallet-101',
      name: 'Cold Storage Vault',
      address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy'
    },
    amount: 0.5000,
    currency: 'BTC',
    amountUSD: 42500.00,
    fee: 0.0001,
    total: 0.5001,
    status: 'pending',
    notes: 'Weekly automatic transfer to cold storage',
    period: 'weekly',
    validated: false,
    validatedAt: null,
    txHash: null
  },
  {
    id: 'TX-2024-002',
    date: '2024-11-22T09:15:00Z',
    timestamp: 1732263300000,
    from: {
      walletId: 'wallet-001',
      name: 'Main Mining Wallet',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    to: {
      walletId: 'wallet-102',
      name: 'Exchange Wallet',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    },
    amount: 0.2500,
    currency: 'BTC',
    amountUSD: 21250.00,
    fee: 0.00008,
    total: 0.25008,
    status: 'validated',
    notes: 'Daily operations transfer',
    period: 'daily',
    validated: true,
    validatedAt: '2024-11-22T09:20:00Z',
    txHash: 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d'
  },
  {
    id: 'TX-2024-003',
    date: '2024-11-21T18:00:00Z',
    timestamp: 1732208400000,
    from: {
      walletId: 'wallet-002',
      name: 'Secondary Wallet',
      address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
    },
    to: {
      walletId: 'wallet-101',
      name: 'Cold Storage Vault',
      address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy'
    },
    amount: 1.0000,
    currency: 'BTC',
    amountUSD: 85000.00,
    fee: 0.00012,
    total: 1.00012,
    status: 'validated',
    notes: 'Monthly consolidation transfer',
    period: 'monthly',
    validated: true,
    validatedAt: '2024-11-21T18:05:00Z',
    txHash: 'b2186ec55e527d4ca288g66c7195f3226c0456f27d6dg413gd91fa6egcg6e59e'
  },
  {
    id: 'TX-2024-004',
    date: '2024-11-22T12:00:00Z',
    timestamp: 1732273200000,
    from: {
      walletId: 'wallet-001',
      name: 'Main Mining Wallet',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    to: {
      walletId: 'wallet-103',
      name: 'Payment Processor',
      address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5'
    },
    amount: 0.1500,
    currency: 'BTC',
    amountUSD: 12750.00,
    fee: 0.00006,
    total: 0.15006,
    status: 'pending',
    notes: 'Supplier payment',
    period: 'daily',
    validated: false,
    validatedAt: null,
    txHash: null
  }
]

const demoWalletsFallback = {
  source: [
    {
      id: 'wallet-001',
      name: 'Main Mining Wallet',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      type: 'source' as const,
      balance: 2.5000,
      currency: 'BTC',
      network: 'Bitcoin Mainnet',
      enabled: true
    },
    {
      id: 'wallet-002',
      name: 'Secondary Wallet',
      address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      type: 'source' as const,
      balance: 1.2000,
      currency: 'BTC',
      network: 'Bitcoin Mainnet',
      enabled: true
    }
  ],
  destination: [
    {
      id: 'wallet-101',
      name: 'Cold Storage Vault',
      address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
      type: 'destination' as const,
      currency: 'BTC',
      network: 'Bitcoin Mainnet',
      enabled: true
    },
    {
      id: 'wallet-102',
      name: 'Exchange Wallet',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      type: 'destination' as const,
      currency: 'BTC',
      network: 'Bitcoin Mainnet',
      enabled: true
    },
    {
      id: 'wallet-103',
      name: 'Payment Processor',
      address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
      type: 'destination' as const,
      currency: 'BTC',
      network: 'Bitcoin Mainnet',
      enabled: true
    }
  ]
}

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

const BTC_PRICE = 85000

export default function TransactionsManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [wallets] = useState(demoWalletsFallback)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'validated' | 'failed'>('all')
  const [periodFilter, setPeriodFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 20

  // Charger les transactions depuis l'API
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true)
        setError(null)
        const params: { status?: string; period?: string } = {}
        if (statusFilter !== 'all') params.status = statusFilter
        if (periodFilter !== 'all') params.period = periodFilter
        
        console.log('[TransactionsManager] Loading transactions with params:', params)
        const response = await transactionsAPI.getAll(params)
        console.log('[TransactionsManager] API response:', response)
        
        if (response.success && response.data && response.data.length > 0) {
          console.log('[TransactionsManager] Setting transactions:', response.data.length)
          setTransactions(response.data as Transaction[])
        } else {
          console.log('[TransactionsManager] No data from API, using demo data')
          // Fallback sur les données de démo si l'API ne retourne pas de données
          setTransactions(demoTransactionsFallback)
        }
      } catch (err) {
        console.error('[TransactionsManager] Error loading transactions:', err)
        setError('Erreur lors du chargement des transactions')
        // Fallback sur les données de démo en cas d'erreur
        setTransactions(demoTransactionsFallback)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [statusFilter, periodFilter])

  // Rafraîchir les transactions
  const refreshTransactions = async () => {
    try {
      setLoading(true)
      const params: { status?: string; period?: string } = {}
      if (statusFilter !== 'all') params.status = statusFilter
      if (periodFilter !== 'all') params.period = periodFilter
      
      const response = await transactionsAPI.getAll(params)
      if (response.success && response.data) {
        setTransactions(response.data as Transaction[])
      }
    } catch (err) {
      console.error('Error refreshing transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false
    
    if (periodFilter !== 'all') {
      const txDate = new Date(tx.date)
      const now = new Date()
      
      switch (periodFilter) {
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
    }
    
    return true
  })

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  // Summary stats
  const totalAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0)
  const pendingTxs = filteredTransactions.filter(tx => tx.status === 'pending')
  const validatedTxs = filteredTransactions.filter(tx => tx.status === 'validated')
  const totalFees = filteredTransactions.reduce((sum, tx) => sum + tx.fee, 0)

  const openTransactionModal = (txId: string) => {
    const tx = transactions.find(t => t.id === txId)
    setSelectedTransaction(tx || null)
    setShowTransactionModal(true)
  }

  const closeTransactionModal = () => {
    setShowTransactionModal(false)
    setSelectedTransaction(null)
  }

  const validateTransaction = async (txId: string) => {
    try {
      const { validateTransaction: validateTx } = await import('@/utils/transactionsApi')
      const result = await validateTx(txId)
      if (result.success) {
        await refreshTransactions()
        closeTransactionModal()
      } else {
        alert(`Erreur: ${result.message || 'Validation échouée'}`)
      }
    } catch (err) {
      console.error('Error validating transaction:', err)
      alert('Erreur lors de la validation de la transaction')
    }
  }

  const saveNewTransaction = async (txData: Partial<Transaction>) => {
    try {
      const response = await transactionsAPI.create(txData)
      if (response.success && response.data) {
        setTransactions([response.data as Transaction, ...transactions])
        setShowNewTransactionModal(false)
      } else {
        alert('Erreur lors de la création de la transaction')
      }
    } catch (err) {
      console.error('Error creating transaction:', err)
      // Fallback: créer localement si l'API échoue
      const newTx: Transaction = {
        id: `TX-2024-${String(transactions.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString(),
        timestamp: Date.now(),
        ...txData
      } as Transaction
      setTransactions([newTx, ...transactions])
      setShowNewTransactionModal(false)
    }
  }

  return (
    <div className="transactions-manager">
      {/* Header - Style Projections exact */}
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Transactions</h1>
        
        {/* Navigation tabs - Style Projections exact */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          flexWrap: 'wrap',
          borderBottom: '1px solid var(--border)',
          marginBottom: 'var(--space-6)',
          overflowX: 'auto',
        }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'validated', label: 'Validated' },
            { id: 'failed', label: 'Failed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                background: 'transparent',
                border: 'none',
                borderBottom: statusFilter === tab.id ? '2px solid var(--hearst-green)' : '2px solid transparent',
                color: statusFilter === tab.id ? 'var(--hearst-green)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: statusFilter === tab.id ? 600 : 400,
                transition: 'all var(--duration-fast) var(--ease-in-out)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards - Style Projections exact */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {filteredTransactions.length}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              All transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {pendingTxs.length}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Awaiting validation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Validated</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {validatedTxs.length}
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              Confirmed transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--hearst-green)' }}>
              {totalAmount.toFixed(4)} BTC
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              ${(totalAmount * BTC_PRICE).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ 
          padding: '16px', 
          background: 'rgba(255, 107, 107, 0.1)', 
          border: '1px solid rgba(255, 107, 107, 0.3)', 
          borderRadius: '8px',
          marginBottom: '16px',
          color: 'var(--accent-danger, #ff6b6b)'
        }}>
          WARNING: {error}
        </div>
      )}

      {/* Loading State */}
      {loading && transactions.length === 0 && (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          color: 'var(--text-muted, #999999)'
        }}>
          LOADING TRANSACTIONS...
        </div>
      )}

      {/* Transactions Table - Style Projections exact */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && transactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <div className="spinner" style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(197, 255, 167, 0.2)',
                borderTopColor: '#C5FFA7',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto var(--space-4)',
              }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>Loading transactions...</p>
            </div>
          ) : paginatedTransactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No transactions found.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>From → To</th>
                    <th>Amount</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((tx) => (
                    <tr key={tx.id} onClick={() => openTransactionModal(tx.id)} style={{ cursor: 'pointer' }}>
                      <td><strong>#{tx.id.split('-').pop()}</strong></td>
                      <td>{formatDateTime(tx.date)}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span>{tx.from.name}</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{truncateAddress(tx.from.address)}</span>
                          <span style={{ color: 'var(--hearst-green)', margin: '4px 0' }}>↓</span>
                          <span>{tx.to.name}</span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{truncateAddress(tx.to.address)}</span>
                        </div>
                      </td>
                      <td>
                        <strong>{tx.amount.toFixed(4)} BTC</strong>
                        <br />
                        <small style={{ color: 'var(--text-secondary)' }}>${tx.amountUSD.toLocaleString()}</small>
                      </td>
                      <td>{tx.fee.toFixed(8)} BTC</td>
                      <td>
                        <span style={{ 
                          color: tx.status === 'validated' ? 'var(--hearst-green)' : tx.status === 'pending' ? '#FFA500' : '#ff4d4d',
                          fontWeight: 700 
                        }}>
                          {tx.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <button
                          style={{
                            padding: 'var(--space-2) var(--space-3)',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontSize: 'var(--text-sm)',
                            transition: 'all var(--duration-fast) var(--ease-in-out)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            openTransactionModal(tx.id)
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--hearst-green)'
                            e.currentTarget.style.color = 'var(--hearst-green)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                            e.currentTarget.style.color = 'var(--text-primary)'
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      </div>


      {/* Modals */}
      {showTransactionModal && selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          onClose={closeTransactionModal}
          onValidate={validateTransaction}
        />
      )}

      {showNewTransactionModal && (
        <NewTransactionModal
          wallets={wallets}
          onClose={() => setShowNewTransactionModal(false)}
          onSave={saveNewTransaction}
        />
      )}
    </div>
  )
}


// Modal New Transaction
function NewTransactionModal({
  wallets,
  onClose,
  onSave
}: {
  wallets: typeof demoWalletsFallback
  onClose: () => void
  onSave: (data: Partial<Transaction>) => void
}) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<Transaction>>({
    from: { walletId: '', name: '', address: '' },
    to: { walletId: '', name: '', address: '' },
    amount: 0,
    fee: 0.0001,
    period: 'daily',
    notes: ''
  })

  const selectedFromWallet = wallets.source.find(w => w.id === formData.from?.walletId)
  const selectedToWallet = [...wallets.source, ...wallets.destination].find(w => w.id === formData.to?.walletId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      const amountUSD = (formData.amount || 0) * BTC_PRICE
      onSave({
        ...formData,
        amountUSD,
        total: (formData.amount || 0) + (formData.fee || 0),
        status: 'pending',
        validated: false,
        validatedAt: null,
        txHash: null,
        currency: 'BTC'
      })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>CREATE NEW TRANSACTION</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="wizard-steps">
            <div className={`wizard-step ${step >= 1 ? 'active' : ''}`}>1 Select Wallets</div>
            <div className={`wizard-step ${step >= 2 ? 'active' : ''}`}>2 Amount</div>
            <div className={`wizard-step ${step >= 3 ? 'active' : ''}`}>3 Review</div>
            <div className={`wizard-step ${step >= 4 ? 'active' : ''}`}>4 Confirm</div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="two-col-layout">
                <div className="form-section">
                  <h3>FROM (Source Wallet)</h3>
                  <div className="form-group">
                    <label>Select Source:</label>
                    <select
                      value={formData.from?.walletId || ''}
                      onChange={(e) => {
                        const wallet = wallets.source.find(w => w.id === e.target.value)
                        setFormData({
                          ...formData,
                          from: wallet ? {
                            walletId: wallet.id,
                            name: wallet.name,
                            address: wallet.address
                          } : { walletId: '', name: '', address: '' }
                        })
                      }}
                    >
                      <option value="">Select Source Wallet</option>
                      {wallets.source.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                  {selectedFromWallet && (
                    <div className="wallet-box">
                      <h4>{selectedFromWallet.name}</h4>
                      <div className="address">{selectedFromWallet.address}</div>
                      <div className="balance">Balance: {selectedFromWallet.balance?.toFixed(4)} BTC</div>
                      <div className="network">{selectedFromWallet.network}</div>
                    </div>
                  )}
                </div>

                <div className="form-section">
                  <h3>TO (Destination Wallet)</h3>
                  <div className="form-group">
                    <label>Select Destination:</label>
                    <select
                      value={formData.to?.walletId || ''}
                      onChange={(e) => {
                        const wallet = [...wallets.source, ...wallets.destination].find(w => w.id === e.target.value)
                        setFormData({
                          ...formData,
                          to: wallet ? {
                            walletId: wallet.id,
                            name: wallet.name,
                            address: wallet.address
                          } : { walletId: '', name: '', address: '' }
                        })
                      }}
                    >
                      <option value="">Select Destination Wallet</option>
                      {wallets.destination.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                  {selectedToWallet && (
                    <div className="wallet-box">
                      <h4>{selectedToWallet.name}</h4>
                      <div className="address">{selectedToWallet.address}</div>
                      <div className="network">{selectedToWallet.network}</div>
                      <div className="status">ACTIVE</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h3>TRANSFER AMOUNT</h3>
                <div className="form-group">
                  <label>Amount to Send:</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                    placeholder="0.0000"
                  />
                  <div style={{ color: 'var(--text-muted, #999999)', fontSize: '12px', marginTop: '4px' }}>
                    ≈ ${((formData.amount || 0) * BTC_PRICE).toLocaleString()} USD (at current rate: ${BTC_PRICE.toLocaleString()}/BTC)
                  </div>
                </div>

                <div className="quick-amounts">
                  <button
                    type="button"
                    className="quick-amount-btn"
                    onClick={() => setFormData({ ...formData, amount: 0.1 })}
                  >
                    0.1 BTC
                  </button>
                  <button
                    type="button"
                    className="quick-amount-btn"
                    onClick={() => setFormData({ ...formData, amount: 0.5 })}
                  >
                    0.5 BTC
                  </button>
                  <button
                    type="button"
                    className="quick-amount-btn"
                    onClick={() => setFormData({ ...formData, amount: 1.0 })}
                  >
                    1.0 BTC
                  </button>
                  {selectedFromWallet?.balance && (
                    <button
                      type="button"
                      className="quick-amount-btn"
                      onClick={() => setFormData({ ...formData, amount: selectedFromWallet.balance })}
                    >
                      Max: {selectedFromWallet.balance.toFixed(4)} BTC
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Network Fee:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="fee"
                        value="0.00005"
                        checked={formData.fee === 0.00005}
                        onChange={() => setFormData({ ...formData, fee: 0.00005 })}
                      />
                      <label>Slow (30+ min) - 0.00005 BTC</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="fee"
                        value="0.0001"
                        checked={formData.fee === 0.0001}
                        onChange={() => setFormData({ ...formData, fee: 0.0001 })}
                      />
                      <label>Standard (10-30 min) - 0.0001 BTC ← Recommended</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="fee"
                        value="0.0002"
                        checked={formData.fee === 0.0002}
                        onChange={() => setFormData({ ...formData, fee: 0.0002 })}
                      />
                      <label>Fast (5-10 min) - 0.0002 BTC</label>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', padding: '16px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Total Debit:</span>
                    <strong>{((formData.amount || 0) + (formData.fee || 0)).toFixed(8)} BTC</strong>
                  </div>
                  {selectedFromWallet?.balance && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted, #999999)' }}>
                      <span>Remaining Balance:</span>
                      <span>{(selectedFromWallet.balance - (formData.amount || 0) - (formData.fee || 0)).toFixed(8)} BTC</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="form-section">
                  <h3>SCHEDULING & OPTIONS</h3>
                  <div className="form-group">
                    <label>Transaction Type:</label>
                    <div className="radio-group">
                      <div className="radio-option">
                        <input type="radio" name="type" defaultChecked />
                        <label>Immediate</label>
                      </div>
                      <div className="radio-option">
                        <input type="radio" name="type" />
                        <label>Scheduled</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Period Classification:</label>
                    <div className="radio-group">
                      <div className="radio-option">
                        <input
                          type="radio"
                          name="period"
                          value="daily"
                          checked={formData.period === 'daily'}
                          onChange={() => setFormData({ ...formData, period: 'daily' })}
                        />
                        <label>Daily</label>
                      </div>
                      <div className="radio-option">
                        <input
                          type="radio"
                          name="period"
                          value="weekly"
                          checked={formData.period === 'weekly'}
                          onChange={() => setFormData({ ...formData, period: 'weekly' })}
                        />
                        <label>Weekly</label>
                      </div>
                      <div className="radio-option">
                        <input
                          type="radio"
                          name="period"
                          value="monthly"
                          checked={formData.period === 'monthly'}
                          onChange={() => setFormData({ ...formData, period: 'monthly' })}
                        />
                        <label>Monthly</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Notes (Optional):</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      placeholder="Add notes about this transaction..."
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>REVIEW TRANSACTION</h3>
                  <div style={{ lineHeight: '2' }}>
                    <p><strong>From:</strong> {formData.from?.name}</p>
                    <p><strong>To:</strong> {formData.to?.name}</p>
                    <p><strong>Amount:</strong> {formData.amount?.toFixed(4)} BTC</p>
                    <p><strong>Fee:</strong> {formData.fee?.toFixed(8)} BTC</p>
                    <p><strong>Total:</strong> {((formData.amount || 0) + (formData.fee || 0)).toFixed(8)} BTC</p>
                    <p><strong>Period:</strong> {formData.period}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              {step > 1 && (
                <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
              )}
              <button type="submit" className="btn-add-large">
                {step < 3 ? 'Next: Review Transaction' : 'Confirm & Create Transaction'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

