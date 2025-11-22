'use client'

import { useState } from 'react'
import styles from './TransactionDetailsModal.module.css'
import { Transaction, formatDate, formatAddress } from '@/utils/transactionsData'

interface TransactionDetailsModalProps {
  transaction: Transaction
  onClose: () => void
  onValidate: (transactionId: string) => Promise<void>
}

export default function TransactionDetailsModal({
  transaction,
  onClose,
  onValidate
}: TransactionDetailsModalProps) {
  const [isValidating, setIsValidating] = useState(false)

  const handleValidate = async () => {
    const confirmMsg = `Confirmer le transfert de ${transaction.amount} BTC de ${transaction.from.name} vers ${transaction.to.name}?\n\nDébit total: ${transaction.total} BTC (frais inclus)`
    
    if (!confirm(confirmMsg)) return

    setIsValidating(true)
    try {
      await onValidate(transaction.id)
    } catch (error) {
      console.error('Error validating:', error)
      alert('Erreur lors de la validation')
    } finally {
      setIsValidating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Adresse copiée dans le presse-papiers')
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Transaction Details</h2>
          <button className={styles.btnClose} onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Transaction Info */}
          <div className={styles.txInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Transaction ID:</span>
              <span className={styles.infoValue}>{transaction.id}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Date:</span>
              <span className={styles.infoValue}>{formatDate(transaction.date)}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status:</span>
              <span className={styles.infoValue}>
                {transaction.status === 'pending' && (
                  <span className={styles.badgePending}>PENDING</span>
                )}
                {transaction.status === 'validated' && (
                  <span className={styles.badgeValidated}>VALIDATED</span>
                )}
                {transaction.status === 'failed' && (
                  <span className={styles.badgeFailed}>FAILED</span>
                )}
              </span>
            </div>
          </div>

          {/* FROM Wallet */}
          <div className={styles.walletBox}>
            <h3 className={styles.walletBoxTitle}>FROM WALLET</h3>
            <div className={styles.walletInfo}>
              <div className={styles.walletName}>{transaction.from.name}</div>
              <div className={styles.walletAddressRow}>
                <span className={styles.walletAddress}>{transaction.from.address}</span>
                <button
                  className={styles.btnCopy}
                  onClick={() => copyToClipboard(transaction.from.address)}
                  title="Copier l'adresse"
                >
                  COPY
                </button>
              </div>
              {transaction.from.walletId === 'wallet-001' && (
                <div className={styles.walletBalance}>
                  Current Balance: 2.5000 BTC
                </div>
              )}
            </div>
          </div>

          {/* Amount Display */}
          <div className={styles.amountDisplay}>
            <div className={styles.amountLabel}>TRANSFER AMOUNT</div>
            <div className={styles.amountBig}>{transaction.amount.toFixed(4)} BTC</div>
            <div className={styles.amountUSD}>
              (~${transaction.amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD)
            </div>
          </div>

          {/* TO Wallet */}
          <div className={styles.walletBox}>
            <h3 className={styles.walletBoxTitle}>TO WALLET</h3>
            <div className={styles.walletInfo}>
              <div className={styles.walletName}>{transaction.to.name}</div>
              <div className={styles.walletAddressRow}>
                <span className={styles.walletAddress}>{transaction.to.address}</span>
                <button
                  className={styles.btnCopy}
                  onClick={() => copyToClipboard(transaction.to.address)}
                  title="Copier l'adresse"
                >
                  COPY
                </button>
              </div>
            </div>
          </div>

          {/* Fees & Total */}
          <div className={styles.txFees}>
            <div className={styles.feeRow}>
              <span>Network Fee:</span>
              <span>{transaction.fee.toFixed(8)} BTC</span>
            </div>
            <div className={styles.feeRowTotal}>
              <span><strong>Total Debit:</strong></span>
              <span><strong>{transaction.total.toFixed(8)} BTC</strong></span>
            </div>
          </div>

          {/* Notes */}
          {transaction.notes && (
            <div className={styles.txNotes}>
              <strong>NOTES:</strong>
              <p>{transaction.notes}</p>
            </div>
          )}

          {/* Transaction Hash (si validée) */}
          {transaction.txHash && (
            <div className={styles.txHash}>
              <strong>Transaction Hash:</strong>
              <div className={styles.hashValue}>{transaction.txHash}</div>
              <div className={styles.validatedAt}>
                Validated on: {transaction.validatedAt ? formatDate(transaction.validatedAt) : 'N/A'}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={styles.modalActions}>
            <button className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            {transaction.status === 'pending' && (
              <button
                className={styles.btnValidate}
                onClick={handleValidate}
                disabled={isValidating}
              >
                {isValidating ? 'PROCESSING...' : 'VALIDATE & SEND'}
              </button>
            )}
            {transaction.status === 'validated' && (
              <div className={styles.validatedInfo}>
                TRANSACTION VALIDATED ON {transaction.validatedAt ? formatDate(transaction.validatedAt) : 'N/A'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

