'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface AddCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface FormErrors {
  name?: string
  erc20Address?: string
  chains?: string
}

const SUPPORTED_CHAINS = ['eth', 'arb', 'base', 'op', 'polygon', 'bsc', 'avax']
const COMMON_PROTOCOLS = ['morpho', 'aave', 'compound', 'maker', 'uniswap', 'curve']

export default function AddCustomerModal({ isOpen, onClose, onSuccess }: AddCustomerModalProps) {
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

  // Réinitialiser le formulaire quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        erc20Address: '',
        tag: 'Client',
        chains: 'eth',
        protocols: '',
      })
      setError(null)
      setErrors({})
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

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

      const response = await fetch('/api/customers', {
        method: 'POST',
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

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        erc20Address: '',
        tag: 'Client',
        chains: 'eth',
        protocols: '',
      })
      setErrors({})
      setError(null)

      onSuccess()
      onClose()
    } catch (err: any) {
      console.error('Erreur lors de l\'ajout du customer:', err)
      const errorMessage = err.message || 'Erreur lors de l\'ajout du customer'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
      tabIndex={-1}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1000000,
          isolation: 'isolate',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ borderBottom: '1px solid var(--border)', padding: 'var(--space-6)', paddingBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Ajouter un Customer
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                padding: '0',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              ×
            </button>
          </div>
        </div>
        <div style={{ padding: 'var(--space-6)', overflow: 'auto', flex: 1 }}>
          <form onSubmit={handleSubmit}>
            {/* Nom */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label
                htmlFor="customer-name"
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Nom du Customer <span style={{ color: '#ff4d4d' }}>*</span>
              </label>
              <input
                id="customer-name"
                type="text"
                required
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
                placeholder="Ex: Alpha Capital"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hearst-green)'
                  e.currentTarget.style.outline = 'none'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.name ? '#ff4d4d' : 'var(--border)'
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
              <label
                htmlFor="erc20-address"
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Adresse ERC20 <span style={{ color: '#ff4d4d' }}>*</span>
              </label>
              <input
                id="erc20-address"
                type="text"
                required
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
                placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hearst-green)'
                  e.currentTarget.style.outline = 'none'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.erc20Address ? '#ff4d4d' : 'var(--border)'
                }}
              />
              {errors.erc20Address ? (
                <p style={{ fontSize: 'var(--text-xs)', color: '#ff4d4d', marginTop: 'var(--space-1)' }}>
                  {errors.erc20Address}
                </p>
              ) : (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                  Adresse du wallet Ethereum (0x suivi de 40 caractères hexadécimaux)
                </p>
              )}
            </div>

            {/* Tag */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <label
                htmlFor="customer-tag"
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Tag
              </label>
              <input
                id="customer-tag"
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
                placeholder="Client"
              />
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                Tag optionnel pour catégoriser le customer
              </p>
            </div>

            {/* Chaînes */}
            <div style={{ 
              marginBottom: 'var(--space-5)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'rgba(128, 128, 128, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <label
                htmlFor="chains"
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Chaînes Blockchain <span style={{ color: '#ff4d4d' }}>*</span>
              </label>
              <input
                id="chains"
                type="text"
                required
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
                placeholder="eth,arb,base"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hearst-green)'
                  e.currentTarget.style.outline = 'none'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors.chains ? '#ff4d4d' : 'var(--border)'
                }}
              />
              {errors.chains ? (
                <p style={{ fontSize: 'var(--text-xs)', color: '#ff4d4d', marginTop: 'var(--space-1)' }}>
                  {errors.chains}
                </p>
              ) : (
                <div style={{ 
                  marginTop: 'var(--space-2)',
                }}>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', fontWeight: 500 }}>
                    Chaînes disponibles:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                    {SUPPORTED_CHAINS.map(chain => (
                      <button
                        key={chain}
                        type="button"
                        onClick={() => {
                          const currentChains = formData.chains.split(',').map(c => c.trim()).filter(Boolean)
                          if (!currentChains.includes(chain)) {
                            handleChange('chains', [...currentChains, chain].join(', '))
                          }
                        }}
                        style={{
                          padding: '4px 8px',
                          fontSize: 'var(--text-xs)',
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--hearst-green)'
                          e.currentTarget.style.color = 'white'
                          e.currentTarget.style.borderColor = 'var(--hearst-green)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                          e.currentTarget.style.color = 'var(--text-secondary)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
                        {chain}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Protocoles */}
            <div style={{ 
              marginBottom: 'var(--space-5)', 
              padding: 'var(--space-4)', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'rgba(128, 128, 128, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <label
                htmlFor="protocols"
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                Protocoles (optionnel)
              </label>
              <input
                id="protocols"
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
                placeholder="morpho,aave"
              />
              <div style={{ 
                marginTop: 'var(--space-2)',
              }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)', fontWeight: 500 }}>
                  Protocoles courants:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                  {COMMON_PROTOCOLS.map(protocol => (
                    <button
                      key={protocol}
                      type="button"
                      onClick={() => {
                        const currentProtocols = formData.protocols.split(',').map(p => p.trim()).filter(Boolean)
                        if (!currentProtocols.includes(protocol)) {
                          handleChange('protocols', [...currentProtocols, protocol].join(', '))
                        }
                      }}
                      style={{
                        padding: '4px 8px',
                        fontSize: 'var(--text-xs)',
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--hearst-green)'
                        e.currentTarget.style.color = 'white'
                        e.currentTarget.style.borderColor = 'var(--hearst-green)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                        e.currentTarget.style.color = 'var(--text-secondary)'
                        e.currentTarget.style.borderColor = 'var(--border)'
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

            {/* Message d'erreur global */}
            {error && (
              <div
                style={{
                  padding: 'var(--space-3)',
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: 'var(--radius-md)',
                  color: '#c33',
                  marginBottom: 'var(--space-4)',
                  fontSize: 'var(--text-sm)',
                }}
              >
                <strong>Erreur:</strong> {error}
              </div>
            )}

            {/* Boutons */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading || !!errors.name || !!errors.erc20Address || !!errors.chains}
                variant="default"
                style={{
                  backgroundColor: 'var(--hearst-green)',
                  color: 'white',
                  opacity: (loading || !!errors.name || !!errors.erc20Address || !!errors.chains) ? 0.5 : 1,
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></span>
                    Ajout en cours...
                  </span>
                ) : (
                  'Ajouter Customer'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  // Utiliser createPortal pour rendre le modal directement dans le body
  // Cela garantit qu'il est au-dessus de tous les autres éléments
  return createPortal(modalContent, document.body)
}
