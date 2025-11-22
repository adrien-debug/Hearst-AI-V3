'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import KpiBox from '@/components/ui/KpiBox'

// Types
interface Miner {
  id: string
  model: string
  serial: string
  hashrate: number
  power: number
  efficiency: number
  status: 'active' | 'offline' | 'maintenance'
  hosterName: string
  hosterId: string
  purchasePrice: number
  purchaseDate: string
  startDate: string
  contractEnd: string
  rackPosition: string
  monitoringUrl: string
  apiKey: string
  notes: string
}

interface Price {
  symbol: string
  name: string
  value: number
  change24h: number
  source: string
  lastUpdated: string
}

interface Hoster {
  id: string
  name: string
  company: string
  location: string
  country: string
  email: string
  phone: string
  website: string
  electricityRate: number
  hostingFee: number
  setupFee: number
  billingCycle: 'monthly' | 'quarterly' | 'annually'
  paymentMethods: string[]
  maxPower: number
  uptimeSLA: number
  coolingType: string
  securityLevel: string
  internetSpeed: number
  backupPower: boolean
  monitoring: string
  contractStart: string
  contractDuration: number
  minimumTerm: number
  noticePeriod: number
  autoRenew: boolean
  specialConditions: string
  activeMiners: number
  totalHashrate: number
  monthlyCost: number
}

// Données de démo
const demoMiners: Miner[] = [
  {
    id: 'miner-001',
    model: 'Antminer S19 Pro',
    serial: 'AS19P-001-2024',
    hashrate: 110,
    power: 3250,
    efficiency: 29.5,
    status: 'active',
    hosterName: 'DataCenter USA',
    hosterId: 'hoster-001',
    purchasePrice: 4500,
    purchaseDate: '2023-12-01',
    startDate: '2024-01-15',
    contractEnd: '2025-01-15',
    rackPosition: 'A1-R03-U15',
    monitoringUrl: 'http://monitor.datacenter.com/miner001',
    apiKey: 'abc123xyz456def789',
    notes: 'Primary production unit - high priority'
  },
  {
    id: 'miner-002',
    model: 'Antminer M50S',
    serial: 'AM50S-002-2024',
    hashrate: 126,
    power: 3306,
    efficiency: 26.2,
    status: 'active',
    hosterName: 'DataCenter USA',
    hosterId: 'hoster-001',
    purchasePrice: 5200,
    purchaseDate: '2023-12-15',
    startDate: '2024-02-01',
    contractEnd: '2025-02-01',
    rackPosition: 'A1-R04-U08',
    monitoringUrl: 'http://monitor.datacenter.com/miner002',
    apiKey: 'def456ghi789jkl012',
    notes: ''
  },
  {
    id: 'miner-003',
    model: 'Antminer S19 XP',
    serial: 'AS19XP-003-2024',
    hashrate: 140,
    power: 3010,
    efficiency: 21.5,
    status: 'active',
    hosterName: 'Mining Farm EU',
    hosterId: 'hoster-002',
    purchasePrice: 5800,
    purchaseDate: '2024-01-10',
    startDate: '2024-03-01',
    contractEnd: '2025-03-01',
    rackPosition: 'B2-R01-U12',
    monitoringUrl: 'http://monitor.euromine.de/miner003',
    apiKey: 'ghi789jkl012mno345',
    notes: 'Latest model - highest efficiency'
  },
  {
    id: 'miner-004',
    model: 'Antminer S19 Pro',
    serial: 'AS19P-004-2024',
    hashrate: 110,
    power: 3250,
    efficiency: 29.5,
    status: 'offline',
    hosterName: 'DataCenter USA',
    hosterId: 'hoster-001',
    purchasePrice: 4500,
    purchaseDate: '2023-11-20',
    startDate: '2024-01-01',
    contractEnd: '2025-01-01',
    rackPosition: 'A1-R02-U20',
    monitoringUrl: 'http://monitor.datacenter.com/miner004',
    apiKey: 'jkl012mno345pqr678',
    notes: 'Under maintenance - hardware issue'
  },
  {
    id: 'miner-005',
    model: 'Antminer S19j Pro',
    serial: 'AS19JP-005-2024',
    hashrate: 104,
    power: 3068,
    efficiency: 29.5,
    status: 'active',
    hosterName: 'Cloud Mining Asia',
    hosterId: 'hoster-003',
    purchasePrice: 4200,
    purchaseDate: '2023-12-20',
    startDate: '2024-04-01',
    contractEnd: '2025-04-01',
    rackPosition: 'C1-R01-U05',
    monitoringUrl: 'http://monitor.cloud.asia/miner005',
    apiKey: 'mno345pqr678stu901',
    notes: ''
  }
]

const demoPrices: Price[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    value: 85000.00,
    change24h: 2.5,
    source: 'CoinGecko',
    lastUpdated: '2024-11-22T14:30:00Z'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    value: 3200.00,
    change24h: 1.8,
    source: 'CoinGecko',
    lastUpdated: '2024-11-22T14:30:00Z'
  }
]

const demoHosters: Hoster[] = [
  {
    id: 'hoster-001',
    name: 'DataCenter USA',
    company: 'DataCenter LLC',
    location: 'Austin, Texas, USA',
    country: 'USA',
    email: 'john@dc.com',
    phone: '+1 512 555 0123',
    website: 'https://datacenter.com',
    electricityRate: 0.072,
    hostingFee: 25,
    setupFee: 150,
    billingCycle: 'monthly',
    paymentMethods: ['Bank Transfer'],
    maxPower: 500,
    uptimeSLA: 99.5,
    coolingType: 'Air Cooling',
    securityLevel: 'High',
    internetSpeed: 10000,
    backupPower: true,
    monitoring: '24/7',
    contractStart: '2024-01-01',
    contractDuration: 12,
    minimumTerm: 12,
    noticePeriod: 30,
    autoRenew: true,
    specialConditions: 'Premium tier - priority support',
    activeMiners: 8,
    totalHashrate: 880,
    monthlyCost: 5250
  },
  {
    id: 'hoster-002',
    name: 'Mining Farm EU',
    company: 'EuroMine GmbH',
    location: 'Frankfurt, Germany',
    country: 'Germany',
    email: 'hans@euromine.de',
    phone: '+49 69 555 0456',
    website: 'https://euromine.de',
    electricityRate: 0.095,
    hostingFee: 30,
    setupFee: 200,
    billingCycle: 'monthly',
    paymentMethods: ['Bank Transfer', 'Crypto'],
    maxPower: 300,
    uptimeSLA: 99.0,
    coolingType: 'Liquid Cooling',
    securityLevel: 'Medium',
    internetSpeed: 5000,
    backupPower: true,
    monitoring: '24/7',
    contractStart: '2024-03-01',
    contractDuration: 12,
    minimumTerm: 12,
    noticePeriod: 30,
    autoRenew: false,
    specialConditions: '',
    activeMiners: 5,
    totalHashrate: 550,
    monthlyCost: 3875
  },
  {
    id: 'hoster-003',
    name: 'Cloud Mining Asia',
    company: 'Asia Mining Solutions',
    location: 'Singapore',
    country: 'Singapore',
    email: 'li.wei@cloud.asia',
    phone: '+65 6555 0789',
    website: 'https://cloud.asia',
    electricityRate: 0.088,
    hostingFee: 28,
    setupFee: 180,
    billingCycle: 'monthly',
    paymentMethods: ['Bank Transfer', 'Crypto', 'Credit Card'],
    maxPower: 200,
    uptimeSLA: 98.5,
    coolingType: 'Air Cooling',
    securityLevel: 'High',
    internetSpeed: 8000,
    backupPower: true,
    monitoring: '24/7',
    contractStart: '2024-04-01',
    contractDuration: 12,
    minimumTerm: 12,
    noticePeriod: 30,
    autoRenew: true,
    specialConditions: '',
    activeMiners: 2,
    totalHashrate: 220,
    monthlyCost: 1850
  }
]

const minerModels = [
  'Antminer S19 Pro',
  'Antminer S19 XP',
  'Antminer S19j Pro',
  'Antminer M50S',
  'Antminer M53',
  'Antminer S21',
  'Custom Model'
]

interface SetupManagerProps {
  activeTab?: 'miners' | 'prices' | 'hosters' | 'overview'
  hideHeader?: boolean
}

export default function SetupManager({ activeTab: externalActiveTab, hideHeader = false }: SetupManagerProps = {}) {
  const [internalActiveTab, setInternalActiveTab] = useState<'miners' | 'prices' | 'hosters' | 'summary'>('summary')
  const activeTab = externalActiveTab || internalActiveTab
  const [miners, setMiners] = useState<Miner[]>(demoMiners)
  const [prices, setPrices] = useState<Price[]>(demoPrices)
  const [hosters, setHosters] = useState<Hoster[]>(demoHosters)
  const [selectedMiner, setSelectedMiner] = useState<Miner | null>(null)
  const [selectedHoster, setSelectedHoster] = useState<Hoster | null>(null)
  const [showMinerModal, setShowMinerModal] = useState(false)
  const [showHosterModal, setShowHosterModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  // Calculs pour Summary
  const totalMiners = miners.length
  const activeMiners = miners.filter(m => m.status === 'active').length
  const totalHashrate = (miners.reduce((sum, m) => sum + m.hashrate, 0) / 1000).toFixed(2)
  const totalPower = (miners.reduce((sum, m) => sum + m.power, 0) / 1000).toFixed(2)

  const filteredMiners = miners.filter(miner =>
    miner.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    miner.serial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    miner.hosterName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedMiners = filteredMiners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredMiners.length / itemsPerPage)

  const openMinerModal = (minerId?: string) => {
    if (minerId) {
      const miner = miners.find(m => m.id === minerId)
      setSelectedMiner(miner || null)
    } else {
      setSelectedMiner(null)
    }
    setShowMinerModal(true)
  }

  const closeMinerModal = () => {
    setShowMinerModal(false)
    setSelectedMiner(null)
  }

  const openHosterModal = (hosterId?: string) => {
    if (hosterId) {
      const hoster = hosters.find(h => h.id === hosterId)
      setSelectedHoster(hoster || null)
    } else {
      setSelectedHoster(null)
    }
    setShowHosterModal(true)
  }

  const closeHosterModal = () => {
    setShowHosterModal(false)
    setSelectedHoster(null)
  }

  const saveMiner = (minerData: Partial<Miner>) => {
    if (selectedMiner) {
      // Update existing
      setMiners(miners.map(m => m.id === selectedMiner.id ? { ...m, ...minerData } as Miner : m))
    } else {
      // Create new
      const newMiner: Miner = {
        id: `miner-${String(miners.length + 1).padStart(3, '0')}`,
        ...minerData
      } as Miner
      setMiners([...miners, newMiner])
    }
    closeMinerModal()
  }

  const deleteMiner = (minerId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce miner ?')) {
      setMiners(miners.filter(m => m.id !== minerId))
    }
  }

  const saveHoster = (hosterData: Partial<Hoster>) => {
    if (selectedHoster) {
      setHosters(hosters.map(h => h.id === selectedHoster.id ? { ...h, ...hosterData } as Hoster : h))
    } else {
      const newHoster: Hoster = {
        id: `hoster-${String(hosters.length + 1).padStart(3, '0')}`,
        ...hosterData
      } as Hoster
      setHosters([...hosters, newHoster])
    }
    closeHosterModal()
  }

  const deleteHoster = (hosterId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce hoster ?')) {
      setHosters(hosters.filter(h => h.id !== hosterId))
    }
  }

  return (
    <div className="setup-manager">
      {!hideHeader && (
        /* Header - Style Projections */
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Setup Manager</h1>
          
          {/* Navigation tabs - Style Projections */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--border)',
            marginBottom: 'var(--space-6)',
            overflowX: 'auto',
          }}>
            {[
              { id: 'summary', label: 'Summary' },
              { id: 'miners', label: 'Miners Configuration' },
              { id: 'prices', label: 'Price List' },
              { id: 'hosters', label: 'Hosters' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setInternalActiveTab(tab.id as any)}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--hearst-green)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--hearst-green)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  transition: 'all var(--duration-fast) var(--ease-in-out)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="setup-content">
        {(activeTab === 'summary' || activeTab === 'overview') && (
          <SummaryTab
            miners={miners}
            hosters={hosters}
            prices={prices}
            totalMiners={totalMiners}
            activeMiners={activeMiners}
            totalHashrate={totalHashrate}
            totalPower={totalPower}
          />
        )}

        {activeTab === 'miners' && (
          <MinersTab
            miners={paginatedMiners}
            onAddMiner={() => openMinerModal()}
            onEditMiner={openMinerModal}
            onDeleteMiner={deleteMiner}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalMiners={filteredMiners.length}
            activeMiners={activeMiners}
            totalHashrate={totalHashrate}
            totalPower={totalPower}
          />
        )}

        {activeTab === 'prices' && (
          <PricesTab prices={prices} />
        )}

        {activeTab === 'hosters' && (
          <HostersTab
            hosters={hosters}
            onAddHoster={() => openHosterModal()}
            onEditHoster={openHosterModal}
            onDeleteHoster={deleteHoster}
          />
        )}
      </div>

      {/* Modals */}
      {showMinerModal && (
        <MinerModal
          miner={selectedMiner}
          hosters={hosters}
          minerModels={minerModels}
          onClose={closeMinerModal}
          onSave={saveMiner}
        />
      )}

      {showHosterModal && (
        <HosterModal
          hoster={selectedHoster}
          onClose={closeHosterModal}
          onSave={saveHoster}
        />
      )}
    </div>
  )
}

// Composant Miners Tab
function MinersTab({
  miners,
  onAddMiner,
  onEditMiner,
  onDeleteMiner,
  searchTerm,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  totalMiners,
  activeMiners,
  totalHashrate,
  totalPower
}: {
  miners: Miner[]
  onAddMiner: () => void
  onEditMiner: (id: string) => void
  onDeleteMiner: (id: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalMiners: number
  activeMiners: number
  totalHashrate: string
  totalPower: string
}) {
  return (
    <div>
      <div className="action-buttons">
        <button className="btn-add-large" onClick={onAddMiner}>
          + Add New Miner
        </button>
        <button className="btn-secondary">IMPORT CSV</button>
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search miners..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select className="btn-secondary" style={{ height: '48px' }}>
          <option>Filter: All</option>
          <option>Active</option>
          <option>Offline</option>
          <option>Maintenance</option>
        </select>
      </div>

      <div className="miners-table-container">
        <table className="miners-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Hashrate</th>
              <th>Power</th>
              <th>Efficiency</th>
              <th>Status</th>
              <th>Hoster</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {miners.map((miner) => (
              <tr key={miner.id} onClick={() => onEditMiner(miner.id)}>
                <td>{miner.id.split('-')[1]}</td>
                <td>
                  <strong>{miner.model}</strong>
                  <br />
                  <small style={{ color: '#888' }}>{miner.serial}</small>
                </td>
                <td>{miner.hashrate} TH/s</td>
                <td>{miner.power} W</td>
                <td>{miner.efficiency} J/TH</td>
                <td>
                  <span className={`status-badge-${miner.status}`}>
                    {miner.status === 'active' ? '🟢' : miner.status === 'offline' ? '🔴' : '🟡'} {miner.status.toUpperCase()}
                  </span>
                </td>
                <td>{miner.hosterName}</td>
                <td>
                  <button
                    className="btn-icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditMiner(miner.id)
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-icon btn-icon-danger"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteMiner(miner.id)
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing {(currentPage - 1) * 15 + 1}-{Math.min(currentPage * 15, totalMiners)} of {totalMiners} miners
        </div>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      </div>

      <div className="quick-stats-bar">
        <div className="quick-stat">
          <div className="quick-stat-value">{totalMiners}</div>
          <div className="quick-stat-label">Total Miners</div>
        </div>
        <div className="quick-stat">
          <div className="quick-stat-value">{activeMiners} 🟢</div>
          <div className="quick-stat-label">Active</div>
        </div>
        <div className="quick-stat">
          <div className="quick-stat-value">{totalHashrate} PH/s</div>
          <div className="quick-stat-label">Hashrate</div>
        </div>
        <div className="quick-stat">
          <div className="quick-stat-value">{totalPower} kW</div>
          <div className="quick-stat-label">Power</div>
        </div>
      </div>
    </div>
  )
}

// Composant Prices Tab
function PricesTab({ prices }: { prices: Price[] }) {
  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>PRICE LIST CONFIGURATION</h2>
      
      <div className="price-list-container">
        <div className="price-section">
          <h3>CRYPTOCURRENCY PRICES</h3>
          <div style={{ marginBottom: '16px', color: '#888', fontSize: '14px' }}>
            Last Updated: {new Date().toLocaleString()}
            <button className="btn-secondary" style={{ marginLeft: '12px' }}>REFRESH NOW</button>
          </div>
          
          {prices.map((price) => (
            <div key={price.symbol} className="price-card">
              <h4>{price.name} ({price.symbol})</h4>
              <div className="price-value">${price.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="price-change">24h: {price.change24h > 0 ? '+' : ''}{price.change24h}% 📈</div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                Source: {price.source}
              </div>
              <button className="btn-secondary" style={{ marginTop: '8px' }}>Manual Override</button>
            </div>
          ))}
          
          <button className="btn-add-large" style={{ width: '100%', marginTop: '16px' }}>
            + Add Cryptocurrency
          </button>
        </div>

        <div className="price-section">
          <h3>ELECTRICITY RATES</h3>
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label>Default Rate:</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="number" defaultValue="0.085" step="0.001" style={{ flex: 1 }} />
              <span style={{ alignSelf: 'center', color: '#888' }}>USD/kWh</span>
            </div>
            <button className="btn-secondary" style={{ marginTop: '8px' }}>Update Default</button>
          </div>
          
          <h4 style={{ fontSize: '16px', marginBottom: '16px', color: '#8afd81' }}>Custom Rates by Hoster:</h4>
          
          <div className="price-card">
            <h4>DataCenter USA</h4>
            <div className="price-value">0.072 USD/kWh</div>
            <button className="btn-secondary" style={{ marginTop: '8px' }}>Edit</button>
          </div>
          
          <div className="price-card">
            <h4>Mining Farm EU</h4>
            <div className="price-value">0.095 USD/kWh</div>
            <button className="btn-secondary" style={{ marginTop: '8px' }}>Edit</button>
          </div>
          
          <div className="price-card">
            <h4>Cloud Mining Asia</h4>
            <div className="price-value">0.088 USD/kWh</div>
            <button className="btn-secondary" style={{ marginTop: '8px' }}>Edit</button>
          </div>
          
          <button className="btn-add-large" style={{ width: '100%', marginTop: '16px' }}>
            + Add Custom Rate
          </button>
        </div>
      </div>
    </div>
  )
}

// Composant Hosters Tab
function HostersTab({
  hosters,
  onAddHoster,
  onEditHoster,
  onDeleteHoster
}: {
  hosters: Hoster[]
  onAddHoster: () => void
  onEditHoster: (id: string) => void
  onDeleteHoster: (id: string) => void
}) {
  return (
    <div>
      <div className="action-buttons">
        <button className="btn-add-large" onClick={onAddHoster}>
          + Add New Hoster
        </button>
        <button className="btn-secondary">IMPORT</button>
        <input
          type="text"
          className="search-bar"
          placeholder="SEARCH HOSTERS..."
        />
      </div>

      <div className="three-col-grid">
        {hosters.map((hoster) => (
          <div key={hoster.id} className="hoster-card">
            <div className="hoster-header">
              <h3>{hoster.name.toUpperCase()}</h3>
              <span className="status-badge-active">Active</span>
            </div>
            <div className="hoster-info">
              <p><strong>{hoster.company}</strong></p>
              <p>{hoster.location}</p>
              <p>EMAIL: {hoster.email}</p>
              <p>PHONE: {hoster.phone}</p>
            </div>
            <div className="hoster-pricing">
              <p>ELECTRICITY: {hoster.electricityRate} USD/kWh</p>
              <p>HOSTING FEE: {hoster.hostingFee} USD/miner/month</p>
              <p>SETUP FEE: {hoster.setupFee} USD</p>
            </div>
            <div className="hoster-stats">
              <p>ACTIVE MINERS: {hoster.activeMiners}</p>
              <p>HASHRATE: {hoster.totalHashrate} TH/s</p>
              <p>MONTHLY COST: ${hoster.monthlyCost.toLocaleString()}</p>
              <p>UPTIME SLA: {hoster.uptimeSLA}%</p>
              <p>SECURITY: {hoster.securityLevel}</p>
            </div>
            <div className="hoster-contract">
              <p>CONTRACT START: {hoster.contractStart}</p>
              <p>AUTO-RENEW: {hoster.autoRenew ? 'Yes' : 'No'}</p>
            </div>
            <div className="hoster-actions">
              <button className="btn-secondary" onClick={() => onEditHoster(hoster.id)}>View Details</button>
              <button className="btn-icon" onClick={() => onEditHoster(hoster.id)}>✏️ Edit</button>
              <button className="btn-icon btn-icon-danger" onClick={() => onDeleteHoster(hoster.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '24px', color: '#888', fontSize: '14px' }}>
        Showing {hosters.length} hosters
      </div>
    </div>
  )
}

// Composant Summary Tab
function SummaryTab({
  miners,
  hosters,
  prices,
  totalMiners,
  activeMiners,
  totalHashrate,
  totalPower
}: {
  miners: Miner[]
  hosters: Hoster[]
  prices: Price[]
  totalMiners: number
  activeMiners: number
  totalHashrate: string
  totalPower: string
}) {
  const totalElectricity = miners.reduce((sum, m) => {
    const hoster = hosters.find(h => h.id === m.hosterId)
    return sum + (m.power / 1000 * (hoster?.electricityRate || 0.085) * 24 * 30)
  }, 0)
  
  const totalHostingFees = miners.reduce((sum, m) => {
    const hoster = hosters.find(h => h.id === m.hosterId)
    return sum + (hoster?.hostingFee || 0)
  }, 0)
  
  const totalOpEx = totalElectricity + totalHostingFees
  
  // Calcul simplifié du revenue (basé sur BTC price et hashrate)
  const btcPrice = prices.find(p => p.symbol === 'BTC')?.value || 85000
  const expectedRevenue = (parseFloat(totalHashrate) * 1000 * 0.00000001 * btcPrice * 30).toFixed(2)
  const netProfit = (parseFloat(expectedRevenue) - totalOpEx).toFixed(2)
  const roi = ((parseFloat(netProfit) / totalOpEx) * 100).toFixed(1)

  return (
    <div>
      <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>Setup Manager</h2>
      
      {/* KPI Cards - Style Projections exact */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <KpiBox
          label="Total Miners"
          value={totalMiners}
          description="Configured miners"
        />
        <KpiBox
          label="Active Miners"
          value={activeMiners}
          description="Currently active"
        />
        <KpiBox
          label="Total Hashrate"
          value={`${totalHashrate} PH/s`}
          description="Network hashrate"
        />
        <KpiBox
          label="Total Power"
          value={`${totalPower} kW`}
          description="Power consumption"
        />
      </div>

      {/* Configuration Summary Table - Style Projections */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Miners</strong></td>
                  <td>
                    <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                      {totalMiners}/{totalMiners} configured
                    </span>
                  </td>
                  <td>{activeMiners} active, {totalMiners - activeMiners} offline</td>
                  <td>Just now</td>
                </tr>
                <tr>
                  <td><strong>Prices</strong></td>
                  <td>
                    <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                      ACTIVE
                    </span>
                  </td>
                  <td>{prices.length} cryptocurrencies tracked</td>
                  <td>2h ago</td>
                </tr>
                <tr>
                  <td><strong>Hosters</strong></td>
                  <td>
                    <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                      {hosters.length}/{hosters.length} configured
                    </span>
                  </td>
                  <td>All contracts valid</td>
                  <td>Just now</td>
                </tr>
                <tr>
                  <td><strong>Electricity Rates</strong></td>
                  <td>
                    <span style={{ color: 'var(--hearst-green)', fontWeight: 700 }}>
                      ACTIVE
                    </span>
                  </td>
                  <td>All rates set</td>
                  <td>Just now</td>
                </tr>
                <tr>
                  <td><strong>Monitoring</strong></td>
                  <td>
                    <span style={{ color: activeMiners === totalMiners ? 'var(--hearst-green)' : '#FFA500', fontWeight: 700 }}>
                      {activeMiners}/{totalMiners} online
                    </span>
                  </td>
                  <td>{totalMiners - activeMiners > 0 ? `${totalMiners - activeMiners} miners offline` : 'All systems operational'}</td>
                  <td>Live</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="action-buttons" style={{ marginTop: '32px', justifyContent: 'center' }}>
        <button className="btn-add-large">EXPORT FULL CONFIGURATION</button>
        <button className="btn-secondary">GENERATE REPORT</button>
        <button className="btn-secondary">SYNC DASHBOARD</button>
      </div>
    </div>
  )
}

// Modal Miner
function MinerModal({
  miner,
  hosters,
  minerModels,
  onClose,
  onSave
}: {
  miner: Miner | null
  hosters: Hoster[]
  minerModels: string[]
  onClose: () => void
  onSave: (data: Partial<Miner>) => void
}) {
  const [formData, setFormData] = useState<Partial<Miner>>(miner || {
    model: '',
    serial: '',
    hashrate: 0,
    power: 0,
    efficiency: 0,
    status: 'active',
    hosterId: '',
    purchasePrice: 0,
    purchaseDate: '',
    startDate: '',
    contractEnd: '',
    rackPosition: '',
    monitoringUrl: '',
    apiKey: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{miner ? 'EDIT MINER' : 'ADD NEW MINER'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="two-col-grid">
              <div className="form-section">
                <h3>HARDWARE SPECS</h3>
                <div className="form-group">
                  <label>Miner Model:</label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  >
                    <option value="">Select Model</option>
                    {minerModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Or Custom Model"
                    style={{ marginTop: '8px' }}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Hashrate:</label>
                  <input
                    type="number"
                    value={formData.hashrate || ''}
                    onChange={(e) => setFormData({ ...formData, hashrate: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>TH/s</span>
                </div>
                <div className="form-group">
                  <label>Power:</label>
                  <input
                    type="number"
                    value={formData.power || ''}
                    onChange={(e) => setFormData({ ...formData, power: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>W</span>
                </div>
                <div className="form-group">
                  <label>Efficiency:</label>
                  <input
                    type="number"
                    value={formData.efficiency || ''}
                    onChange={(e) => setFormData({ ...formData, efficiency: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>J/TH (auto-calculated)</span>
                </div>
                <div className="form-group">
                  <label>Serial Number:</label>
                  <input
                    type="text"
                    value={formData.serial || ''}
                    onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Purchase Price:</label>
                  <input
                    type="number"
                    value={formData.purchasePrice || ''}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>USD</span>
                </div>
                <div className="form-group">
                  <label>Purchase Date:</label>
                  <input
                    type="date"
                    value={formData.purchaseDate || ''}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>DEPLOYMENT INFO</h3>
                <div className="form-group">
                  <label>Hoster:</label>
                  <select
                    value={formData.hosterId || ''}
                    onChange={(e) => setFormData({ ...formData, hosterId: e.target.value })}
                  >
                    <option value="">Select Hoster</option>
                    {hosters.map(hoster => (
                      <option key={hoster.id} value={hoster.id}>{hoster.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={hosters.find(h => h.id === formData.hosterId)?.location || ''}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Rack Position:</label>
                  <input
                    type="text"
                    value={formData.rackPosition || ''}
                    onChange={(e) => setFormData({ ...formData, rackPosition: e.target.value })}
                    placeholder="A1-R03-U15"
                  />
                </div>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Contract End:</label>
                  <input
                    type="date"
                    value={formData.contractEnd || ''}
                    onChange={(e) => setFormData({ ...formData, contractEnd: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>STATUS & MONITORING</h3>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  />
                  <label>Active</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="status"
                    value="maintenance"
                    checked={formData.status === 'maintenance'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  />
                  <label>Maintenance</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="status"
                    value="offline"
                    checked={formData.status === 'offline'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  />
                  <label>Offline</label>
                </div>
              </div>
              <div className="form-group">
                <label>Monitoring URL:</label>
                <input
                  type="url"
                  value={formData.monitoringUrl || ''}
                  onChange={(e) => setFormData({ ...formData, monitoringUrl: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>API Key:</label>
                <input
                  type="text"
                  value={formData.apiKey || ''}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <textarea
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add-large">Save Miner</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal Hoster
function HosterModal({
  hoster,
  onClose,
  onSave
}: {
  hoster: Hoster | null
  onClose: () => void
  onSave: (data: Partial<Hoster>) => void
}) {
  const [formData, setFormData] = useState<Partial<Hoster>>(hoster || {
    name: '',
    company: '',
    location: '',
    country: 'USA',
    email: '',
    phone: '',
    website: '',
    electricityRate: 0.085,
    hostingFee: 25,
    setupFee: 150,
    billingCycle: 'monthly',
    paymentMethods: [],
    maxPower: 0,
    uptimeSLA: 99.0,
    coolingType: 'Air Cooling',
    securityLevel: 'High',
    internetSpeed: 0,
    backupPower: true,
    monitoring: '24/7',
    contractStart: '',
    contractDuration: 12,
    minimumTerm: 12,
    noticePeriod: 30,
    autoRenew: true,
    specialConditions: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{hoster ? 'EDIT HOSTER' : 'ADD NEW HOSTER'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="three-col-grid">
              <div className="form-section">
                <h3>COMPANY INFO</h3>
                <div className="form-group">
                  <label>Company Name:</label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Country:</label>
                  <select
                    value={formData.country || ''}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Contact Person:</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Website:</label>
                  <input
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>PRICING STRUCTURE</h3>
                <div className="form-group">
                  <label>Electricity Rate:</label>
                  <input
                    type="number"
                    step="0.001"
                    value={formData.electricityRate || ''}
                    onChange={(e) => setFormData({ ...formData, electricityRate: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>USD/kWh</span>
                </div>
                <div className="form-group">
                  <label>Hosting Fee:</label>
                  <input
                    type="number"
                    value={formData.hostingFee || ''}
                    onChange={(e) => setFormData({ ...formData, hostingFee: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>USD/miner/mo</span>
                </div>
                <div className="form-group">
                  <label>Setup Fee:</label>
                  <input
                    type="number"
                    value={formData.setupFee || ''}
                    onChange={(e) => setFormData({ ...formData, setupFee: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>USD (once)</span>
                </div>
                <div className="form-group">
                  <label>Billing Cycle:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="billingCycle"
                        value="monthly"
                        checked={formData.billingCycle === 'monthly'}
                        onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                      />
                      <label>Monthly</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="billingCycle"
                        value="quarterly"
                        checked={formData.billingCycle === 'quarterly'}
                        onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                      />
                      <label>Quarterly</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="billingCycle"
                        value="annually"
                        checked={formData.billingCycle === 'annually'}
                        onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
                      />
                      <label>Annually</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Payment Methods:</label>
                  <div className="checkbox-group">
                    <div className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods?.includes('Bank Transfer')}
                        onChange={(e) => {
                          const methods = formData.paymentMethods || []
                          if (e.target.checked) {
                            setFormData({ ...formData, paymentMethods: [...methods, 'Bank Transfer'] })
                          } else {
                            setFormData({ ...formData, paymentMethods: methods.filter(m => m !== 'Bank Transfer') })
                          }
                        }}
                      />
                      <label>Bank Transfer</label>
                    </div>
                    <div className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods?.includes('Crypto')}
                        onChange={(e) => {
                          const methods = formData.paymentMethods || []
                          if (e.target.checked) {
                            setFormData({ ...formData, paymentMethods: [...methods, 'Crypto'] })
                          } else {
                            setFormData({ ...formData, paymentMethods: methods.filter(m => m !== 'Crypto') })
                          }
                        }}
                      />
                      <label>Crypto</label>
                    </div>
                    <div className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods?.includes('Credit Card')}
                        onChange={(e) => {
                          const methods = formData.paymentMethods || []
                          if (e.target.checked) {
                            setFormData({ ...formData, paymentMethods: [...methods, 'Credit Card'] })
                          } else {
                            setFormData({ ...formData, paymentMethods: methods.filter(m => m !== 'Credit Card') })
                          }
                        }}
                      />
                      <label>Credit Card</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>TECHNICAL SPECS</h3>
                <div className="form-group">
                  <label>Max Power:</label>
                  <input
                    type="number"
                    value={formData.maxPower || ''}
                    onChange={(e) => setFormData({ ...formData, maxPower: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>kW</span>
                </div>
                <div className="form-group">
                  <label>Uptime SLA:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.uptimeSLA || ''}
                    onChange={(e) => setFormData({ ...formData, uptimeSLA: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>%</span>
                </div>
                <div className="form-group">
                  <label>Cooling Type:</label>
                  <select
                    value={formData.coolingType || ''}
                    onChange={(e) => setFormData({ ...formData, coolingType: e.target.value })}
                  >
                    <option value="Air Cooling">Air Cooling</option>
                    <option value="Liquid Cooling">Liquid Cooling</option>
                    <option value="Immersion Cooling">Immersion Cooling</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Security Level:</label>
                  <select
                    value={formData.securityLevel || ''}
                    onChange={(e) => setFormData({ ...formData, securityLevel: e.target.value })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Internet Speed:</label>
                  <input
                    type="number"
                    value={formData.internetSpeed || ''}
                    onChange={(e) => setFormData({ ...formData, internetSpeed: parseFloat(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>Mbps</span>
                </div>
                <div className="form-group">
                  <label>Backup Power:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="backupPower"
                        checked={formData.backupPower === true}
                        onChange={() => setFormData({ ...formData, backupPower: true })}
                      />
                      <label>Yes</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="backupPower"
                        checked={formData.backupPower === false}
                        onChange={() => setFormData({ ...formData, backupPower: false })}
                      />
                      <label>No</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Monitoring:</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="monitoring"
                        value="24/7"
                        checked={formData.monitoring === '24/7'}
                        onChange={(e) => setFormData({ ...formData, monitoring: e.target.value })}
                      />
                      <label>24/7</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        name="monitoring"
                        value="8/5"
                        checked={formData.monitoring === '8/5'}
                        onChange={(e) => setFormData({ ...formData, monitoring: e.target.value })}
                      />
                      <label>8/5</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>CONTRACT TERMS & CONDITIONS</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Contract Start:</label>
                  <input
                    type="date"
                    value={formData.contractStart || ''}
                    onChange={(e) => setFormData({ ...formData, contractStart: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Duration:</label>
                  <input
                    type="number"
                    value={formData.contractDuration || ''}
                    onChange={(e) => setFormData({ ...formData, contractDuration: parseInt(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>months</span>
                </div>
                <div className="form-group">
                  <label>Minimum Term:</label>
                  <input
                    type="number"
                    value={formData.minimumTerm || ''}
                    onChange={(e) => setFormData({ ...formData, minimumTerm: parseInt(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>months</span>
                </div>
                <div className="form-group">
                  <label>Notice Period:</label>
                  <input
                    type="number"
                    value={formData.noticePeriod || ''}
                    onChange={(e) => setFormData({ ...formData, noticePeriod: parseInt(e.target.value) })}
                  />
                  <span style={{ color: '#888', fontSize: '12px' }}>days</span>
                </div>
              </div>
              <div className="form-group">
                <label>Auto-Renew:</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      name="autoRenew"
                      checked={formData.autoRenew === true}
                      onChange={() => setFormData({ ...formData, autoRenew: true })}
                    />
                    <label>Yes</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      name="autoRenew"
                      checked={formData.autoRenew === false}
                      onChange={() => setFormData({ ...formData, autoRenew: false })}
                    />
                    <label>No</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Special Conditions:</label>
                <textarea
                  value={formData.specialConditions || ''}
                  onChange={(e) => setFormData({ ...formData, specialConditions: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-add-large">Save Hoster Configuration</button>
          </div>
        </form>
      </div>
    </div>
  )
}

