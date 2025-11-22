'use client'

import { useState, useEffect } from 'react'
import styles from './WalletModal.module.css'
import { Wallet } from '@/utils/transactionsData'
import { createWallet, updateWallet } from '@/utils/transactionsApi'

interface WalletModalProps {
  wallet?: Wallet | null
  walletType?: 'source' | 'destination'
  onClose: () => void
  onSave: () => void
}

export default function WalletModal({ wallet, walletType: initialWalletType, onClose, onSave }: WalletModalProps) {
  const [walletType, setWalletType] = useState<'source' | 'destination'>(initialWalletType || 'destination')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('Bitcoin Mainnet')
  const [balance, setBalance] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (wallet) {
      setWalletType(wallet.type)
      setName(wallet.name)
      setAddress(wallet.address)
      setNetwork(wallet.network)
      setBalance(wallet.balance?.toString() || '')
    }
  }, [wallet])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !address) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsSaving(true)
    try {
      if (wallet) {
        // Update existing wallet
        const result = await updateWallet(wallet.id, {
          name,
          address,
          network,
          balance: walletType === 'source' ? parseFloat(balance) || 0 : undefined,
          type: walletType
        })
        if (result.success) {
          onSave()
        } else {
          alert(`Erreur: ${result.message || 'Mise à jour échouée'}`)
        }
      } else {
        // Create new wallet
        const result = await createWallet({
          name,
          address,
          type: walletType,
          network,
          balance: walletType === 'source' ? parseFloat(balance) || 0 : undefined,
          currency: 'BTC',
          enabled: true
        })
        if (result.success) {
          onSave()
        } else {
          alert(`Erreur: ${result.message || 'Création échouée'}`)
        }
      }
    } catch (error) {
      console.error('Error saving wallet:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {wallet ? 'Edit Wallet' : 'Add New Wallet'}
          </h2>
          <button className={styles.btnClose} onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <form className={styles.modalBody} onSubmit={handleSubmit}>
          {/* Wallet Type */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Wallet Type:</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="walletType"
                  value="source"
                  checked={walletType === 'source'}
                  onChange={(e) => setWalletType(e.target.value as 'source' | 'destination')}
                  disabled={!!wallet}
                />
                <span>Source (FROM)</span>
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="walletType"
                  value="destination"
                  checked={walletType === 'destination'}
                  onChange={(e) => setWalletType(e.target.value as 'destination')}
                  disabled={!!wallet}
                />
                <span>Destination (TO)</span>
              </label>
            </div>
          </div>

          {/* Wallet Name */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="walletName">
              Wallet Name: *
            </label>
            <input
              id="walletName"
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Main Mining Wallet"
              required
            />
          </div>

          {/* Wallet Address */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="walletAddress">
              Wallet Address: *
            </label>
            <input
              id="walletAddress"
              type="text"
              className={styles.input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
              required
            />
          </div>

          {/* Network */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="network">
              Network:
            </label>
            <select
              id="network"
              className={styles.select}
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option value="Bitcoin Mainnet">Bitcoin Mainnet</option>
              <option value="Bitcoin Testnet">Bitcoin Testnet</option>
              <option value="Bitcoin Regtest">Bitcoin Regtest</option>
            </select>
          </div>

          {/* Initial Balance (only for source wallets) */}
          {walletType === 'source' && (
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="balance">
                Initial Balance:
              </label>
              <input
                id="balance"
                type="number"
                step="0.00000001"
                className={styles.input}
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="0.0000"
              />
              <span className={styles.inputSuffix}>BTC</span>
            </div>
          )}

          {/* Actions */}
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Wallet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

