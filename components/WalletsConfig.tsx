'use client'

import { useState } from 'react'

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

const truncateAddress = (address: string, start: number = 6, end: number = 4) => {
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

export default function WalletsConfig() {
  const [wallets, setWallets] = useState(demoWallets)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [walletType, setWalletType] = useState<'source' | 'destination'>('source')

  const openWalletModal = (type: 'source' | 'destination', walletId?: string) => {
    setWalletType(type)
    if (walletId) {
      const wallet = type === 'source' 
        ? wallets.source.find(w => w.id === walletId)
        : wallets.destination.find(w => w.id === walletId)
      setSelectedWallet(wallet || null)
    } else {
      setSelectedWallet(null)
    }
    setShowWalletModal(true)
  }

  const closeWalletModal = () => {
    setShowWalletModal(false)
    setSelectedWallet(null)
  }

  const saveWallet = (walletData: Partial<Wallet>) => {
    if (selectedWallet) {
      // Update existing
      if (walletType === 'source') {
        setWallets({
          ...wallets,
          source: wallets.source.map(w => w.id === selectedWallet.id ? { ...w, ...walletData } as Wallet : w)
        })
      } else {
        setWallets({
          ...wallets,
          destination: wallets.destination.map(w => w.id === selectedWallet.id ? { ...w, ...walletData } as Wallet : w)
        })
      }
    } else {
      // Create new
      const newWallet: Wallet = {
        id: `wallet-${walletType === 'source' ? String(wallets.source.length + 1).padStart(3, '0') : String(wallets.destination.length + 1).padStart(3, '0')}`,
        type: walletType,
        currency: 'BTC',
        network: 'Bitcoin Mainnet',
        enabled: true,
        ...walletData
      } as Wallet

      if (walletType === 'source') {
        setWallets({
          ...wallets,
          source: [...wallets.source, newWallet]
        })
      } else {
        setWallets({
          ...wallets,
          destination: [...wallets.destination, newWallet]
        })
      }
    }
    closeWalletModal()
  }

  const deleteWallet = (type: 'source' | 'destination', walletId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce wallet ?')) {
      if (type === 'source') {
        setWallets({
          ...wallets,
          source: wallets.source.filter(w => w.id !== walletId)
        })
      } else {
        setWallets({
          ...wallets,
          destination: wallets.destination.filter(w => w.id !== walletId)
        })
      }
    }
  }

  const totalSourceBalance = wallets.source.reduce((sum, w) => sum + (w.balance || 0), 0)

  return (
    <div className="wallets-config">
      <div className="tx-header">
        <h1>🔐 WALLET CONFIGURATION</h1>
      </div>

      <div className="two-col-layout">
        <div className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3>📤 SOURCE WALLETS (FROM)</h3>
            <button className="btn-add-large" onClick={() => openWalletModal('source')}>
              + Add Source Wallet
            </button>
          </div>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
            Wallets that send funds
          </p>

          {wallets.source.map((wallet) => (
            <div key={wallet.id} className="wallet-box">
              <h4>{wallet.name}</h4>
              <div className="address">{truncateAddress(wallet.address)}</div>
              {wallet.balance !== undefined && (
                <div className="balance">Balance: {wallet.balance.toFixed(4)} BTC</div>
              )}
              <div className="network">{wallet.network}</div>
              <div className="status">✅ Active</div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button className="btn-sm" onClick={() => openWalletModal('source', wallet.id)}>Edit</button>
                <button className="btn-sm" onClick={() => deleteWallet('source', wallet.id)} style={{ color: '#ff4444' }}>Delete</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '24px', padding: '16px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ color: '#888', fontSize: '14px' }}>Total: {wallets.source.length} wallets</div>
            <div style={{ color: '#8afd81', fontSize: '16px', fontWeight: '600', marginTop: '8px' }}>
              Total Balance: {totalSourceBalance.toFixed(4)} BTC
            </div>
          </div>
        </div>

        <div className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3>📥 DESTINATION WALLETS (TO)</h3>
            <button className="btn-add-large" onClick={() => openWalletModal('destination')}>
              + Add Destination Wallet
            </button>
          </div>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>
            Wallets that receive funds
          </p>

          {wallets.destination.map((wallet) => (
            <div key={wallet.id} className="wallet-box">
              <h4>{wallet.name}</h4>
              <div className="address">{truncateAddress(wallet.address)}</div>
              <div className="network">{wallet.network}</div>
              <div className="status">✅ Active</div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button className="btn-sm" onClick={() => openWalletModal('destination', wallet.id)}>Edit</button>
                <button className="btn-sm" onClick={() => deleteWallet('destination', wallet.id)} style={{ color: '#ff4444' }}>Delete</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '24px', padding: '16px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ color: '#888', fontSize: '14px' }}>Total: {wallets.destination.length} wallets</div>
          </div>
        </div>
      </div>

      <div className="form-section" style={{ marginTop: '32px' }}>
        <h3>WALLET SECURITY & BEST PRACTICES</h3>
        <div style={{ color: '#ffffff', fontSize: '14px', lineHeight: '2' }}>
          <p>✅ Always verify addresses before sending</p>
          <p>✅ Use cold storage for large amounts</p>
          <p>✅ Keep private keys secure and backed up</p>
          <p>⚠️  Test with small amounts first</p>
        </div>
      </div>

      {showWalletModal && (
        <WalletModal
          wallet={selectedWallet}
          walletType={walletType}
          onClose={closeWalletModal}
          onSave={saveWallet}
        />
      )}
    </div>
  )
}

// Modal Add/Edit Wallet
function WalletModal({
  wallet,
  walletType,
  onClose,
  onSave
}: {
  wallet: Wallet | null
  walletType: 'source' | 'destination'
  onClose: () => void
  onSave: (data: Partial<Wallet>) => void
}) {
  const [formData, setFormData] = useState<Partial<Wallet>>(wallet || {
    name: '',
    address: '',
    type: walletType,
    balance: 0,
    currency: 'BTC',
    network: 'Bitcoin Mainnet',
    enabled: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔐 {wallet ? 'EDIT WALLET' : 'ADD NEW WALLET'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>WALLET TYPE</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="walletType"
                    checked={walletType === 'source'}
                    disabled
                  />
                  <label>Source Wallet (FROM - Sends funds)</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="walletType"
                    checked={walletType === 'destination'}
                    disabled
                  />
                  <label>Destination Wallet (TO)</label>
                </div>
              </div>
            </div>

            <div className="two-col-layout">
              <div className="form-section">
                <h3>BASIC INFORMATION</h3>
                <div className="form-group">
                  <label>Wallet Name:</label>
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
                  <button type="button" className="btn-sm" style={{ marginTop: '8px' }}>Validate Address</button>
                </div>
                {walletType === 'source' && (
                  <div className="form-group">
                    <label>Initial Balance (source):</label>
                    <input
                      type="number"
                      step="0.0001"
                      value={formData.balance || ''}
                      onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) })}
                    />
                    <span style={{ color: '#888', fontSize: '12px' }}>BTC</span>
                  </div>
                )}
                <div className="form-group">
                  <label>Description/Notes:</label>
                  <textarea
                    rows={2}
                    placeholder="Optional notes about this wallet..."
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>NETWORK & SECURITY</h3>
                <div className="form-group">
                  <label>Network:</label>
                  <select
                    value={formData.network || 'Bitcoin Mainnet'}
                    onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                  >
                    <option value="Bitcoin Mainnet">Bitcoin Mainnet</option>
                    <option value="Bitcoin Testnet">Bitcoin Testnet</option>
                    <option value="Ethereum Mainnet">Ethereum Mainnet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Address Type:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input type="radio" name="addressType" defaultChecked />
                      <label>Legacy (1...)</label>
                    </div>
                    <div className="radio-option">
                      <input type="radio" name="addressType" />
                      <label>SegWit (3...)</label>
                    </div>
                    <div className="radio-option">
                      <input type="radio" name="addressType" />
                      <label>Native SegWit (bc1...)</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Security Level:</label>
                  <div className="checkbox-group">
                    <div className="checkbox-option">
                      <input type="checkbox" defaultChecked />
                      <label>Hot Wallet</label>
                    </div>
                    <div className="checkbox-option">
                      <input type="checkbox" />
                      <label>Cold Storage</label>
                    </div>
                    <div className="checkbox-option">
                      <input type="checkbox" />
                      <label>Hardware Wallet</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Enable Wallet:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="enabled"
                        checked={formData.enabled === true}
                        onChange={() => setFormData({ ...formData, enabled: true })}
                      />
                      <label>Active</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="enabled"
                        checked={formData.enabled === false}
                        onChange={() => setFormData({ ...formData, enabled: false })}
                      />
                      <label>Disabled</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>ADVANCED OPTIONS (Optional)</h3>
              <div className="form-group">
                <label>API Integration:</label>
                <input type="url" placeholder="API URL" style={{ marginBottom: '8px' }} />
                <input type="text" placeholder="API Key" />
              </div>
              <div className="form-group">
                <label>Auto-Monitoring:</label>
                <div className="checkbox-group">
                  <div className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    <label>Track balance automatically</label>
                  </div>
                  <div className="checkbox-option">
                    <input type="checkbox" />
                    <label>Manual updates only</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Alerts:</label>
                <div className="checkbox-group">
                  <div className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    <label>Notify on incoming transactions</label>
                  </div>
                  <div className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    <label>Alert on low balance (threshold: <input type="number" step="0.1" defaultValue="0.1" style={{ width: '60px', marginLeft: '4px' }} /> BTC)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add-large">Save Wallet Configuration</button>
          </div>
        </form>
      </div>
    </div>
  )
}

