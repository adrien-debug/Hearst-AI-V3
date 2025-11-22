'use client'

import { useState, useEffect } from 'react'
import WalletModal from '@/components/modals/WalletModal'
import { Wallet, demoWallets } from '@/utils/transactionsData'
import { getWallets, createWallet, updateWallet, deleteWallet } from '@/utils/transactionsApi'

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

const truncateAddress = (address: string, start: number = 6, end: number = 4) => {
  if (address.length <= start + end) return address
  return `${address.slice(0, start)}...${address.slice(-end)}`
}

export default function WalletsConfig() {
  const [wallets, setWallets] = useState<{ source: Wallet[]; destination: Wallet[] }>({ source: [], destination: [] })
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null)
  const [walletType, setWalletType] = useState<'source' | 'destination'>('source')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWallets()
  }, [])

  const loadWallets = async () => {
    setLoading(true)
    try {
      const result = await getWallets()
      if (result.success) {
        setWallets(result.wallets)
      } else {
        // Fallback sur les données de démo
        setWallets(demoWalletsFallback)
      }
    } catch (error) {
      console.error('Error loading wallets:', error)
      setWallets(demoWalletsFallback)
    } finally {
      setLoading(false)
    }
  }

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

  const handleWalletSaved = async () => {
    await loadWallets()
    closeWalletModal()
  }

  const handleDeleteWallet = async (walletId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce wallet ?')) return
    
    setLoading(true)
    try {
      const result = await deleteWallet(walletId)
      if (result.success) {
        await loadWallets()
      } else {
        alert(`Erreur: ${result.message || 'Suppression échouée'}`)
      }
    } catch (error) {
      console.error('Error deleting wallet:', error)
      alert('Erreur lors de la suppression')
    } finally {
      setLoading(false)
    }
  }

  const totalSourceBalance = wallets.source.reduce((sum, w) => sum + (w.balance || 0), 0)

  return (
    <div className="wallets-config">
      <div className="tx-header">
        <h1>WALLET CONFIGURATION</h1>
      </div>

      <div className="two-col-layout">
        <div className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3>SOURCE WALLETS (FROM)</h3>
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
              <div className="status">ACTIVE</div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button className="btn-sm" onClick={() => openWalletModal('source', wallet.id)}>Edit</button>
                <button className="btn-sm" onClick={() => handleDeleteWallet(wallet.id)} style={{ color: '#ff4444' }}>Delete</button>
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
            <h3>DESTINATION WALLETS (TO)</h3>
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
              <div className="status">ACTIVE</div>
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                <button className="btn-sm" onClick={() => openWalletModal('destination', wallet.id)}>Edit</button>
                <button className="btn-sm" onClick={() => handleDeleteWallet(wallet.id)} style={{ color: '#ff4444' }}>Delete</button>
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
          <p>• Always verify addresses before sending</p>
          <p>• Use cold storage for large amounts</p>
          <p>• Keep private keys secure and backed up</p>
          <p>⚠️  Test with small amounts first</p>
        </div>
      </div>

      {showWalletModal && (
        <WalletModal
          wallet={selectedWallet}
          walletType={walletType}
          onClose={closeWalletModal}
          onSave={handleWalletSaved}
        />
      )}
    </div>
  )
}


