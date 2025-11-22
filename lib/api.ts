// API Client for Next.js API Routes
// Replaces the old frontend/js/api.js

// Use Railway backend in production, fallback to local Next.js API routes in development
// In production on Vercel, NEXT_PUBLIC_API_URL should be set to Railway backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Ensure API_BASE_URL ends with /api if it's a full URL
const getBaseUrl = () => {
  // In browser environment, detect the current port and use it for API calls
  if (typeof window !== 'undefined') {
    const base = API_BASE_URL
    if (base.startsWith('http')) {
      // If it's a full URL, ensure it ends with /api
      return base.endsWith('/api') ? base : `${base}/api`
    }
    // Use relative path - Next.js will handle routing to the correct port
    return base
  }
  // Server-side: use the configured base URL
  const base = API_BASE_URL
  if (base.startsWith('http')) {
    return base.endsWith('/api') ? base : `${base}/api`
  }
  return base
}

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(error.message || `API Error: ${response.statusText}`)
  }

  return response.json()
}

// Projects API
export const projectsAPI = {
  getAll: () => fetchAPI<{ projects: any[] }>('/projects'),
  getById: (id: string) => fetchAPI<{ project: any }>(`/projects/${id}`),
  create: (data: any) => fetchAPI<{ project: any }>('/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => fetchAPI<{ project: any }>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/projects/${id}`, { method: 'DELETE' }),
}

// Jobs API
export const jobsAPI = {
  getAll: () => fetchAPI<{ jobs: any[]; total: number }>('/jobs'),
  getById: (id: string) => fetchAPI<{ job: any }>(`/jobs/${id}`),
  create: (data: any) => fetchAPI<{ job: any; message: string }>('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  execute: (id: string) => fetchAPI<{ message: string; jobId: string }>(`/jobs/${id}/execute`, { method: 'POST' }),
  cancel: (id: string) => fetchAPI<{ job: any; message: string }>(`/jobs/${id}`, { method: 'DELETE' }),
}

// Versions API
export const versionsAPI = {
  getByProject: (projectId: string) => fetchAPI<{ versions: any[] }>(`/versions?projectId=${projectId}`),
  getById: (id: string) => fetchAPI<{ version: any }>(`/versions/${id}`),
  create: (data: any) => fetchAPI<{ version: any }>('/versions', { method: 'POST', body: JSON.stringify(data) }),
}

// Stats API
export const statsAPI = {
  getStats: () => fetchAPI<{ stats: {
    total_projects: number
    total_versions: number
    total_jobs: number
    jobs_running: number
    jobs_success_rate: number
    last_7_days_jobs: number
    total_storage_mb: number
  } }>('/stats'),
}

// Health check
export const healthAPI = {
  check: () => fetchAPI('/health'),
}

// Electricity API
export async function getElectricity() {
  try {
    return await fetchAPI<any>('/electricity')
  } catch (error) {
    // Si la route n'existe pas, retourner des données par défaut
    console.warn('Electricity API not available, returning empty data')
    return {
      data: null,
      message: 'Electricity API not implemented yet',
    }
  }
}

// Collateral API
export const collateralAPI = {
  getAll: () => fetchAPI<any>('/collateral'),
}

// Customers API
export const customersAPI = {
  getAll: () => fetchAPI<{ customers: any[] }>('/customers'),
  getById: (id: string) => fetchAPI<{ customer: any }>(`/customers/${id}`),
  create: (data: { name: string; erc20Address: string; tag?: string; chains?: string[]; protocols?: string[] }) => 
    fetchAPI<{ customer: any }>('/customers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: { name?: string; erc20Address?: string; tag?: string; chains?: string[]; protocols?: string[] }) => 
    fetchAPI<{ customer: any }>(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI(`/customers/${id}`, { method: 'DELETE' }),
}

// Cockpit API
export const cockpitAPI = {
  getData: () => fetchAPI<any>('/cockpit'),
}

// Transactions API
export const transactionsAPI = {
  getAll: (params?: { status?: string; period?: string }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.period) queryParams.append('period', params.period)
    const query = queryParams.toString()
    return fetchAPI<{ success: boolean; data: any[] }>(`/transactions${query ? `?${query}` : ''}`)
  },
  getById: (id: string) => fetchAPI<{ success: boolean; data: any }>(`/transactions/${id}`),
  create: (data: any) => fetchAPI<{ success: boolean; data: any }>('/transactions', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  update: (id: string, data: any) => fetchAPI<{ success: boolean; data: any }>('/transactions', { 
    method: 'PUT', 
    body: JSON.stringify({ id, ...data }) 
  }),
  delete: (id: string) => fetchAPI<{ success: boolean }>(`/transactions?id=${id}`, { 
    method: 'DELETE' 
  }),
  getPendingCount: async () => {
    try {
      const response = await fetchAPI<{ success: boolean; data: any[] }>('/transactions?status=pending')
      return response.data?.filter((tx: any) => tx.status === 'pending').length || 0
    } catch (error) {
      console.error('Error fetching pending transactions count:', error)
      return 0
    }
  },
}

