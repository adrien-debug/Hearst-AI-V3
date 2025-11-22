// API functions pour le Transaction Manager
// Utilise l'API backend réelle avec fallback localStorage pour le développement

import { Transaction, Wallet, demoTransactions, demoWallets } from './transactionsData'

// API functions pour le Transaction Manager
// Utilise l'API backend réelle avec fallback localStorage pour le développement

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
const USE_LOCAL_STORAGE = process.env.NEXT_PUBLIC_USE_LOCAL_STORAGE === 'true' || !process.env.NEXT_PUBLIC_API_URL

const STORAGE_KEY_TRANSACTIONS = 'hearst_transactions'
const STORAGE_KEY_WALLETS = 'hearst_wallets'

// Fonction helper pour les appels API
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }))
      throw new Error(errorData.message || `API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`[API] Request failed for ${endpoint}:`, error)
    throw error
  }
}

// Initialiser les données localStorage si elles n'existent pas (fallback uniquement)
function initializeStorage() {
  if (typeof window === 'undefined' || !USE_LOCAL_STORAGE) return
  
  if (!localStorage.getItem(STORAGE_KEY_TRANSACTIONS)) {
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(demoTransactions))
  }
  
  if (!localStorage.getItem(STORAGE_KEY_WALLETS)) {
    localStorage.setItem(STORAGE_KEY_WALLETS, JSON.stringify(demoWallets))
  }
}

// Transactions API
export async function getTransactions(params?: {
  period?: 'daily' | 'weekly' | 'monthly' | 'all'
  status?: 'all' | 'pending' | 'validated' | 'failed'
}): Promise<{ success: boolean; transactions: Transaction[] }> {
  // Mode localStorage (développement/démo)
  if (USE_LOCAL_STORAGE) {
    initializeStorage()
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TRANSACTIONS)
      let transactions: Transaction[] = stored ? JSON.parse(stored) : demoTransactions
      
      // Filtrer par période
      if (params?.period && params.period !== 'all') {
        const now = new Date()
        transactions = transactions.filter(tx => {
          const txDate = new Date(tx.date)
          switch(params.period) {
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
      
      // Filtrer par statut
      if (params?.status && params.status !== 'all') {
        transactions = transactions.filter(tx => tx.status === params.status)
      }
      
      return { success: true, transactions }
    } catch (error) {
      console.error('Error fetching transactions (localStorage):', error)
      return { success: false, transactions: [] }
    }
  }

  // Mode API réelle
  try {
    const queryParams = new URLSearchParams()
    if (params?.period && params.period !== 'all') {
      queryParams.append('period', params.period)
    }
    if (params?.status && params.status !== 'all') {
      queryParams.append('status', params.status)
    }

    const queryString = queryParams.toString()
    const endpoint = `/transactions${queryString ? `?${queryString}` : ''}`
    
    const response = await apiRequest(endpoint)
    return { success: true, transactions: response.transactions || response.data || [] }
  } catch (error) {
    console.error('Error fetching transactions (API):', error)
    return { success: false, transactions: [] }
  }
}

export async function getTransactionById(id: string): Promise<{ success: boolean; transaction?: Transaction }> {
  // Mode localStorage
  if (USE_LOCAL_STORAGE) {
    initializeStorage()
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TRANSACTIONS)
      const transactions: Transaction[] = stored ? JSON.parse(stored) : demoTransactions
      const transaction = transactions.find(tx => tx.id === id)
      
      if (!transaction) {
        return { success: false }
      }
      
      return { success: true, transaction }
    } catch (error) {
      console.error('Error fetching transaction (localStorage):', error)
      return { success: false }
    }
  }

  // Mode API réelle
  try {
    const response = await apiRequest(`/transactions/${id}`)
    return { success: true, transaction: response.transaction || response.data }
  } catch (error) {
    console.error('Error fetching transaction (API):', error)
    return { success: false }
  }
}

export async function validateTransaction(transactionId: string): Promise<{ success: boolean; txHash?: string; message?: string }> {
  // Mode localStorage
  if (USE_LOCAL_STORAGE) {
    initializeStorage()
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TRANSACTIONS)
      const transactions: Transaction[] = stored ? JSON.parse(stored) : demoTransactions
      const transaction = transactions.find(t => t.id === transactionId)
      
      if (!transaction) {
        return { success: false, message: 'Transaction not found' }
      }
      
      if (transaction.status !== 'pending') {
        return { success: false, message: 'Transaction already processed' }
      }
      
      // Générer un hash de transaction
      const txHash = Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
      
      // Mettre à jour la transaction
      transaction.status = 'validated'
      transaction.validated = true
      transaction.validatedAt = new Date().toISOString()
      transaction.txHash = txHash
      
      // Sauvegarder
      localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(transactions))
      
      return { success: true, txHash }
    } catch (error) {
      console.error('Error validating transaction (localStorage):', error)
      return { success: false, message: error instanceof Error ? error.message : 'Validation failed' }
    }
  }

  // Mode API réelle
  try {
    const response = await apiRequest(`/transactions/${transactionId}/validate`, {
      method: 'POST',
      body: JSON.stringify({ transactionId })
    })
    return { success: true, txHash: response.txHash || response.data?.txHash }
  } catch (error) {
    console.error('Error validating transaction (API):', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Validation failed' 
    }
  }
}

// Wallets API
export async function getWallets(params?: {
  type?: 'source' | 'destination' | 'all'
}): Promise<{ success: boolean; wallets: { source: Wallet[]; destination: Wallet[] } }> {
  // Mode localStorage
  if (USE_LOCAL_STORAGE) {
    initializeStorage()
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WALLETS)
      const wallets = stored ? JSON.parse(stored) : demoWallets
      
      return { success: true, wallets }
    } catch (error) {
      console.error('Error fetching wallets (localStorage):', error)
      return { success: false, wallets: { source: [], destination: [] } }
    }
  }

  // Mode API réelle
  try {
    const queryParams = new URLSearchParams()
    if (params?.type && params.type !== 'all') {
      queryParams.append('type', params.type)
    }

    const queryString = queryParams.toString()
    const endpoint = `/wallets${queryString ? `?${queryString}` : ''}`
    
    const response = await apiRequest(endpoint)
    const wallets = response.wallets || response.data || { source: [], destination: [] }
    
    return { success: true, wallets }
  } catch (error) {
    console.error('Error fetching wallets (API):', error)
    return { success: false, wallets: { source: [], destination: [] } }
  }
}

export async function createWallet(wallet: Omit<Wallet, 'id'>): Promise<{ success: boolean; wallet?: Wallet; message?: string }> {
  // Mode localStorage
  if (USE_LOCAL_STORAGE) {
    initializeStorage()
    
    try {
      if (!wallet.name || !wallet.address || !wallet.type) {
        return { success: false, message: 'Missing required fields' }
      }
      
      const stored = localStorage.getItem(STORAGE_KEY_WALLETS)
      const wallets = stored ? JSON.parse(stored) : demoWallets
      
      const newWallet: Wallet = {
        ...wallet,
        id: `wallet-${Date.now()}`,
        currency: wallet.currency || 'BTC',
        network: wallet.network || 'Bitcoin Mainnet',
        enabled: wallet.enabled !== undefined ? wallet.enabled : true
      }
      
      if (wallet.type === 'source') {
        wallets.source.push(newWallet)
      } else {
        wallets.destination.push(newWallet)
      }
      
      localStorage.setItem(STORAGE_KEY_WALLETS, JSON.stringify(wallets))
      
      return { success: true, wallet: newWallet }
    } catch (error) {
      console.error('Error creating wallet (localStorage):', error)
      return { success: false, message: error instanceof Error ? error.message : 'Creation failed' }
    }
  }

  // Mode API réelle
  try {
    const response = await apiRequest('/wallets', {
      method: 'POST',
      body: JSON.stringify(wallet)
    })
    return { success: true, wallet: response.wallet || response.data }
  } catch (error) {
    console.error('Error creating wallet (API):', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Creation failed' 
    }
  }
}

export async function updateWallet(walletId: string, updates: Partial<Wallet>): Promise<{ success: boolean; wallet?: Wallet; message?: string }> {
  // Mode localStorage
  if (USE_LOCAL_STORAGE) {
    initializeStorage()
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WALLETS)
      const wallets = stored ? JSON.parse(stored) : demoWallets
      
      let wallet: Wallet | undefined
      
      // Chercher dans source
      const sourceIndex = wallets.source.findIndex((w: Wallet) => w.id === walletId)
      if (sourceIndex !== -1) {
        wallet = { ...wallets.source[sourceIndex], ...updates }
        wallets.source[sourceIndex] = wallet
      } else {
        // Chercher dans destination
        const destIndex = wallets.destination.findIndex((w: Wallet) => w.id === walletId)
        if (destIndex !== -1) {
          wallet = { ...wallets.destination[destIndex], ...updates }
          wallets.destination[destIndex] = wallet
        }
      }
      
      if (!wallet) {
        return { success: false, message: 'Wallet not found' }
      }
      
      localStorage.setItem(STORAGE_KEY_WALLETS, JSON.stringify(wallets))
      
      return { success: true, wallet }
    } catch (error) {
      console.error('Error updating wallet (localStorage):', error)
      return { success: false, message: error instanceof Error ? error.message : 'Update failed' }
    }
  }

  // Mode API réelle
  try {
    const response = await apiRequest(`/wallets/${walletId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
    return { success: true, wallet: response.wallet || response.data }
  } catch (error) {
    console.error('Error updating wallet (API):', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Update failed' 
    }
  }
}

export async function deleteWallet(walletId: string): Promise<{ success: boolean; message?: string }> {
  // Mode localStorage
  if (USE_LOCAL_STORAGE) {
    initializeStorage()
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WALLETS)
      const wallets = stored ? JSON.parse(stored) : demoWallets
      
      const sourceIndex = wallets.source.findIndex((w: Wallet) => w.id === walletId)
      if (sourceIndex !== -1) {
        wallets.source.splice(sourceIndex, 1)
      } else {
        const destIndex = wallets.destination.findIndex((w: Wallet) => w.id === walletId)
        if (destIndex !== -1) {
          wallets.destination.splice(destIndex, 1)
        } else {
          return { success: false, message: 'Wallet not found' }
        }
      }
      
      localStorage.setItem(STORAGE_KEY_WALLETS, JSON.stringify(wallets))
      
      return { success: true }
    } catch (error) {
      console.error('Error deleting wallet (localStorage):', error)
      return { success: false, message: error instanceof Error ? error.message : 'Deletion failed' }
    }
  }

  // Mode API réelle
  try {
    await apiRequest(`/wallets/${walletId}`, {
      method: 'DELETE'
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting wallet (API):', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Deletion failed' 
    }
  }
}
