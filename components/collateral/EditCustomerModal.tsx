'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface EditCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  customer: any
}

interface FormErrors {
  name?: string
  erc20Address?: string
  chains?: string
}

const SUPPORTED_CHAINS = ['eth', 'arb', 'base', 'op', 'polygon', 'bsc', 'avax']
const COMMON_PROTOCOLS = ['morpho', 'aave', 'compound', 'maker', 'uniswap', 'curve']

export default function EditCustomerModal({ isOpen, onClose, onSuccess, customer }: EditCustomerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    erc20Address: '',
    tag: 'Client',
    chains: 'eth',
    protocols: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Charger les données du client quand le modal s'ouvre
  useEffect(() => {
    if (isOpen && customer) {
      const chains = JSON.parse(customer.chains || '["eth"]')
      const protocols = JSON.parse(customer.protocols || '[]')
      setFormData({
        name: customer.name || '',
        erc20Address: customer.erc20Address || '',
        tag: customer.tag || 'Client',
        chains: chains.join(','),
        protocols: protocols.join(','),
      })
      setError(null)
      setErrors({})
    }
  }, [isOpen, customer])

  if (!isOpen || !mounted || !customer) return null

  const validateERC20 = (address: string): string | undefined => {
    if (!address) return 'L\'adresse ERC20 est requise'
    const erc20Regex = /^0x[a-fA-F0-9]{40}$/
    if (!erc20Regex.test(address)) {
      return 'Format invalide (doit commencer par 0x et contenir 40 caractères hexadécimaux)'
    }
    return undefined
  }

  const validateChains = (chains: string): string | undefined => {
    if (!chains.trim()) return 'Au moins une chaîne est requise'
    const chainsArray = chains.split(',').map(c => c.trim()).filter(Boolean)
    const invalidChains = chainsArray.filter(c => !SUPPORTED_CHAINS.includes(c.toLowerCase()))
    if (invalidChains.length > 0) {
      return `Chaînes non supportées: ${invalidChains.join(', ')}. Chaînes disponibles: ${SUPPORTED_CHAINS.join(', ')}`
    }
    return undefined
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Validation en temps réel
    if (field === 'erc20Address') {
      const error = validateERC20(value)
      setErrors(prev => ({ ...prev, erc20Address: error }))
    } else if (field === 'chains') {
      const error = validateChains(value)
      setErrors(prev => ({ ...prev, chains: error }))
    } else if (field === 'name') {
      setErrors(prev => ({ ...prev, name: value.trim() ? undefined : 'Le nom est requis' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validation complète
    const nameError = !formData.name.trim() ? 'Le nom est requis' : undefined
    const erc20Error = validateERC20(formData.erc20Address)
    const chainsError = validateChains(formData.chains)
    
    const newErrors: FormErrors = {
      name: nameError,
      erc20Address: erc20Error,
      chains: chainsError,
    }
    
    setErrors(newErrors)
    
    if (nameError || erc20Error || chainsError) {
      return
    }

    setLoading(true)

    try {
      // Préparer les données
      const chainsArray = formData.chains.split(',').map(c => c.trim().toLowerCase()).filter(Boolean)
      const protocolsArray = formData.protocols.split(',').map(p => p.trim().toLowerCase()).filter(Boolean)

      const response = await fetch(`/api/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          erc20Address: formData.erc20Address.trim(),
          tag: formData.tag.trim() || 'Client',
          chains: chainsArray,
          protocols: protocolsArray,
        }),
      })

      let data
      try {
        data = await response.json()
      } catch (e) {
        throw new Error(`Erreur de réponse serveur (${response.status}): ${response.statusText}`)
      }

      if (!response.ok) {
        const errorMessage = data.details 
          ? `${data.error}: ${data.details}` 
          : data.error || `Erreur HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour du customer:', err)
      const errorMessage = err.message || 'Erreur lors de la mise à jour du customer'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChainClick = (chain: string) => {
    const chains = formData.chains.split(',').map(c => c.trim()).filter(Boolean)
    if (!chains.includes(chain)) {
      handleChange('chains', [...chains, chain].join(','))
    }
  }

  const handleProtocolClick = (protocol: string) => {
    const protocols = formData.protocols.split(',').map(p => p.trim()).filter(Boolean)
    if (!protocols.includes(protocol)) {
      handleChange('protocols', [...protocols, protocol].join(','))
    }
  }

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '20px',
        overflow: 'auto',
        isolation: 'isolate',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 20px 25px -5px, rgba(0, 0, 0, 0.3) 0px 10px 10px -5px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1000000,
          isolation: 'isolate',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border)', padding: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Modifier le Customer
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                padding: 0,
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--space-6)', overflow: 'auto', flex: '1 1 0%' }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: 'var(--space-3)',
                marginBottom: 'var(--space-4)',
                backgroundColor: 'rgba(255, 77, 77, 0.1)',
                border: '1px solid rgba(255, 77, 77, 0.3)',
                borderRadius: 'var(--radius-md)',
                color: '#ff4d4d',
                fontSize: 'var(--text-sm)',
              }}>
                {error}
              </div>
            )}

            {/* Nom */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label htmlFor="edit-customer-name" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                Nom du Customer <span style={{ color: '#ff4d4d' }}>*</span>
              </label>
              <input
                id="edit-customer-name"
                required
                placeholder="Ex: Alpha Capital"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: `1px solid ${errors.name ? '#ff4d4d' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-base)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.2s',
                }}
              />
              {errors.name && (
                <p style={{ fontSize: 'var(--text-xs)', color: '#ff4d4d', marginTop: 'var(--space-1)' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Adresse ERC20 */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label htmlFor="edit-erc20-address" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                Adresse ERC20 <span style={{ color: '#ff4d4d' }}>*</span>
              </label>
              <input
                id="edit-erc20-address"
                required
                placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                type="text"
                value={formData.erc20Address}
                onChange={(e) => handleChange('erc20Address', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: `1px solid ${errors.erc20Address ? '#ff4d4d' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-base)',
                  fontFamily: 'monospace',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.2s',
                }}
              />
              {errors.erc20Address && (
                <p style={{ fontSize: 'var(--text-xs)', color: '#ff4d4d', marginTop: 'var(--space-1)' }}>
                  {errors.erc20Address}
                </p>
              )}
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                Adresse du wallet Ethereum (0x suivi de 40 caractères hexadécimaux)
              </p>
            </div>

            {/* Tag */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label htmlFor="edit-customer-tag" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                Tag
              </label>
              <input
                id="edit-customer-tag"
                placeholder="Client"
                type="text"
                value={formData.tag}
                onChange={(e) => handleChange('tag', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-base)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
              />
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                Tag optionnel pour catégoriser le customer
              </p>
            </div>

            {/* Chaînes */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label htmlFor="edit-chains" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                Chaînes Blockchain <span style={{ color: '#ff4d4d' }}>*</span>
              </label>
              <input
                id="edit-chains"
                required
                placeholder="eth,arb,base"
                type="text"
                value={formData.chains}
                onChange={(e) => handleChange('chains', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: `1px solid ${errors.chains ? '#ff4d4d' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-base)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  transition: 'border-color 0.2s',
                }}
              />
              {errors.chains && (
                <p style={{ fontSize: 'var(--text-xs)', color: '#ff4d4d', marginTop: 'var(--space-1)' }}>
                  {errors.chains}
                </p>
              )}
              <div style={{ marginTop: 'var(--space-2)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                  Chaînes disponibles:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <button
                      key={chain}
                      type="button"
                      onClick={() => handleChainClick(chain)}
                      style={{
                        padding: '4px 8px',
                        fontSize: 'var(--text-xs)',
                        backgroundColor: formData.chains.split(',').map(c => c.trim()).includes(chain) ? 'var(--hearst-green)' : 'var(--bg-tertiary)',
                        color: formData.chains.split(',').map(c => c.trim()).includes(chain) ? 'white' : 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: '0.2s',
                      }}
                    >
                      {chain}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Protocoles */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label htmlFor="edit-protocols" style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                Protocoles (optionnel)
              </label>
              <input
                id="edit-protocols"
                placeholder="morpho,aave"
                type="text"
                value={formData.protocols}
                onChange={(e) => handleChange('protocols', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-base)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                }}
              />
              <div style={{ marginTop: 'var(--space-2)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-secondary)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
                  Protocoles courants:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                  {COMMON_PROTOCOLS.map((protocol) => (
                    <button
                      key={protocol}
                      type="button"
                      onClick={() => handleProtocolClick(protocol)}
                      style={{
                        padding: '4px 8px',
                        fontSize: 'var(--text-xs)',
                        backgroundColor: formData.protocols.split(',').map(p => p.trim()).includes(protocol) ? 'var(--hearst-green)' : 'var(--bg-tertiary)',
                        color: formData.protocols.split(',').map(p => p.trim()).includes(protocol) ? 'white' : 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: '0.2s',
                      }}
                    >
                      {protocol}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                  Laisser vide pour inclure tous les protocoles
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 500,
                  transition: 'all var(--duration-fast) var(--ease-in-out)',
                  cursor: 'pointer',
                  border: '1px solid var(--border)',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--text-sm)',
                  height: '36px',
                }}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 500,
                  transition: 'all var(--duration-fast) var(--ease-in-out)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'var(--hearst-green)',
                  color: 'white',
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--text-sm)',
                  height: '36px',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Modification...' : 'Modifier Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

