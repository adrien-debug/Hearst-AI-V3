'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Types
interface Wallet {
  id: string
  name: string
  address: string
  type: 'source' | 'destination'
  balance?: number
  currency: string
  network: string
  enabled: boolean
}

interface Transaction {
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
  notes: string
  period: 'daily' | 'weekly' | 'monthly'
  validated: boolean
  validatedAt: string | null
  txHash: string | null
}

// Données de démo
const demoTransactions: Transaction[] = [
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

const demoWallets = {
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
      network: 'Bitcoin Mainnet',
      enabled: true
    },
    {
      id: 'wallet-102',
      name: 'Exchange Wallet',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      type: 'destination' as const,
      network: 'Bitcoin Mainnet',
      enabled: true
    },
    {
      id: 'wallet-103',
      name: 'Payment Processor',
      address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
      type: 'destination' as const,
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
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions)
  const [wallets] = useState(demoWallets)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'validated' | 'failed'>('all')
  const [periodFilter, setPeriodFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

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

  const validateTransaction = (txId: string) => {
    if (confirm('Êtes-vous sûr de vouloir valider et envoyer cette transaction ?')) {
      setTransactions(transactions.map(tx => 
        tx.id === txId 
          ? { 
              ...tx, 
              status: 'validated' as const,
              validated: true,
              validatedAt: new Date().toISOString(),
              txHash: `tx_${Math.random().toString(36).substr(2, 64)}`
            }
          : tx
      ))
      closeTransactionModal()
    }
  }

  const saveNewTransaction = (txData: Partial<Transaction>) => {
    const newTx: Transaction = {
      id: `TX-2024-${String(transactions.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString(),
      timestamp: Date.now(),
      ...txData
    } as Transaction
    setTransactions([newTx, ...transactions])
    setShowNewTransactionModal(false)
  }

  return (
    <div className="transactions-manager">
      {/* Header */}
      <div className="tx-header">
        <h1>TRANSACTIONS MANAGER</h1>
        <div className="tx-header-actions">
          <button className="btn-add-large" onClick={() => setShowNewTransactionModal(true)}>
            + New Transaction
          </button>
          <button className="btn-secondary">🔄 Refresh</button>
          <button className="btn-secondary">📥 Export</button>
          <Link href="/wallets">
            <button className="btn-secondary">⚙️ Configure Wallets</button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="tx-filters">
        <div className="filter-group">
          <label>Status:</label>
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${statusFilter === 'validated' ? 'active' : ''}`}
            onClick={() => setStatusFilter('validated')}
          >
            Validated
          </button>
          <button
            className={`filter-btn ${statusFilter === 'failed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('failed')}
          >
            Failed
          </button>
        </div>

        <div className="filter-group">
          <label>Period:</label>
          <button
            className={`filter-btn ${periodFilter === 'all' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('all')}
          >
            All Time
          </button>
          <button
            className={`filter-btn ${periodFilter === 'daily' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('daily')}
          >
            Daily
          </button>
          <button
            className={`filter-btn ${periodFilter === 'weekly' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('weekly')}
          >
            Weekly
          </button>
          <button
            className={`filter-btn ${periodFilter === 'monthly' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="tx-table-container">
        <table className="tx-table">
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
              <tr key={tx.id} onClick={() => openTransactionModal(tx.id)}>
                <td>
                  <strong>#{tx.id.split('-').pop()}</strong>
                  <br />
                  <small style={{ color: '#888' }}>{tx.id}</small>
                </td>
                <td>{formatDateTime(tx.date)}</td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span>{tx.from.name}</span>
                    <span style={{ color: '#888', fontSize: '12px' }}>{truncateAddress(tx.from.address)}</span>
                    <span style={{ color: '#8afd81', margin: '4px 0' }}>↓</span>
                    <span>{tx.to.name}</span>
                    <span style={{ color: '#888', fontSize: '12px' }}>{truncateAddress(tx.to.address)}</span>
                  </div>
                </td>
                <td>
                  <strong>{tx.amount.toFixed(4)} BTC</strong>
                  <br />
                  <small style={{ color: '#888' }}>${tx.amountUSD.toLocaleString()}</small>
                </td>
                <td>{tx.fee.toFixed(8)} BTC</td>
                <td>
                  <span className={`badge-${tx.status}`}>
                    {tx.status === 'pending' ? '🟢' : tx.status === 'validated' ? '✅' : '❌'} {tx.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      openTransactionModal(tx.id)
                    }}
                  >
                    View
                  </button>
                  {tx.status === 'pending' && (
                    <button
                      className="btn-validate-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        validateTransaction(tx.id)
                      }}
                    >
                      Validate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {/* Summary Footer */}
      <div className="stat-footer">
        <div className="stat-box">
          <div className="stat-value">{totalAmount.toFixed(4)} BTC</div>
          <div className="stat-label">Total</div>
          <div className="stat-usd">${(totalAmount * BTC_PRICE).toLocaleString()}</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{pendingTxs.length} tx</div>
          <div className="stat-label">Pending</div>
          <div className="stat-usd">${pendingTxs.reduce((sum, tx) => sum + tx.amountUSD, 0).toLocaleString()}</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{validatedTxs.length} tx</div>
          <div className="stat-label">Validated</div>
          <div className="stat-usd">${validatedTxs.reduce((sum, tx) => sum + tx.amountUSD, 0).toLocaleString()}</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{totalFees.toFixed(8)} BTC</div>
          <div className="stat-label">Total Fees</div>
          <div className="stat-usd">${(totalFees * BTC_PRICE).toFixed(2)}</div>
        </div>
      </div>

      {/* Modals */}
      {showTransactionModal && selectedTransaction && (
        <TransactionDetailsModal
          transaction={selectedTransaction}
          wallets={wallets}
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

// Modal Transaction Details
function TransactionDetailsModal({
  transaction,
  wallets,
  onClose,
  onValidate
}: {
  transaction: Transaction
  wallets: typeof demoWallets
  onClose: () => void
  onValidate: (id: string) => void
}) {
  const fromWallet = [...wallets.source, ...wallets.destination].find(w => w.id === transaction.from.walletId)
  const toWallet = [...wallets.source, ...wallets.destination].find(w => w.id === transaction.to.walletId)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💸 TRANSACTION DETAILS</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="two-col-layout">
            <div className="form-section">
              <h3>TRANSACTION INFO</h3>
              <div className="form-group">
                <label>Transaction ID:</label>
                <div>{transaction.id}</div>
              </div>
              <div className="form-group">
                <label>Date:</label>
                <div>{new Date(transaction.date).toLocaleString()}</div>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <span className={`badge-${transaction.status}`}>
                  {transaction.status === 'pending' ? '🟢' : transaction.status === 'validated' ? '✅' : '❌'} {transaction.status.toUpperCase()}
                </span>
              </div>
              <div className="form-group">
                <label>Period:</label>
                <div>{transaction.period}</div>
              </div>
            </div>

            <div className="form-section">
              <h3>BLOCKCHAIN INFO</h3>
              <div className="form-group">
                <label>Network:</label>
                <div>Bitcoin Mainnet</div>
              </div>
              <div className="form-group">
                <label>Confirmations:</label>
                <div>{transaction.status === 'validated' ? 'Confirmed' : 'Pending'}</div>
              </div>
              <div className="form-group">
                <label>TX Hash:</label>
                <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                  {transaction.txHash || 'N/A (not sent)'}
                </div>
              </div>
              <div className="form-group">
                <label>Block:</label>
                <div>{transaction.txHash ? 'N/A' : 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>📤 FROM WALLET</h3>
            <div className="form-group">
              <label>Name:</label>
              <div>{transaction.from.name}</div>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'monospace' }}>{transaction.from.address}</span>
                <button className="btn-copy" onClick={() => copyToClipboard(transaction.from.address)}>
                  Copy 📋
                </button>
              </div>
            </div>
            {fromWallet?.balance !== undefined && (
              <div className="form-group">
                <label>Current Balance:</label>
                <div>{fromWallet.balance.toFixed(4)} BTC (~${(fromWallet.balance * BTC_PRICE).toLocaleString()})</div>
              </div>
            )}
          </div>

          <div className="amount-display">
            <div className="amount-big">{transaction.amount.toFixed(4)} BTC</div>
            <div className="amount-usd">~${transaction.amountUSD.toLocaleString()} USD</div>
            <div style={{ marginTop: '16px', fontSize: '14px', color: '#888' }}>
              Network Fee: {transaction.fee.toFixed(8)} BTC
            </div>
            <div style={{ fontSize: '14px', color: '#888' }}>
              Total Debit: {transaction.total.toFixed(8)} BTC
            </div>
          </div>

          <div className="form-section">
            <h3>📥 TO WALLET</h3>
            <div className="form-group">
              <label>Name:</label>
              <div>{transaction.to.name}</div>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'monospace' }}>{transaction.to.address}</span>
                <button className="btn-copy" onClick={() => copyToClipboard(transaction.to.address)}>
                  Copy 📋
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Type:</label>
              <div>Destination ({toWallet?.type === 'destination' ? 'Cold Storage' : 'Standard'})</div>
            </div>
          </div>

          {transaction.notes && (
            <div className="form-section">
              <h3>📝 NOTES & DETAILS</h3>
              <div style={{ color: '#ffffff', fontSize: '14px', lineHeight: '1.6' }}>
                {transaction.notes}
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          {transaction.status === 'pending' && (
            <button className="btn-validate-large" onClick={() => onValidate(transaction.id)}>
              ✅ Validate & Send Transaction
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Modal New Transaction
function NewTransactionModal({
  wallets,
  onClose,
  onSave
}: {
  wallets: typeof demoWallets
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
          <h2>💸 CREATE NEW TRANSACTION</h2>
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
                      <div className="status">✅ Active</div>
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
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
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

