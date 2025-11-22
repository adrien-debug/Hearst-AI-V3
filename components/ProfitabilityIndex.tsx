'use client'

import { useState, useEffect } from 'react'
import {
  StatusExcellentIcon,
  StatusGoodIcon,
  StatusWarningIcon,
  StatusErrorIcon,
  StatusPendingIcon,
  RefreshIcon,
  DownloadIcon,
  SettingsIcon,
  ChartIcon,
  MoneyIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CompareIcon,
  ReportIcon,
  WarningIcon
} from '@/components/icons/PremiumIcons'

// Types
interface Batch {
  id: string
  batchNumber: string
  model: string
  quantity: number
  unitHashrate: number
  unitPower: number
  efficiency: number
  hoster: string
  hosterId: string
  elecRate: number
  hostingFee: number
  hardwareInvestment: number
  unitPrice: number
  location: string
}

interface BatchMetrics extends Batch {
  totalHashrate: number
  totalPower: number
  dailyRevenue: number
  dailyElecCost: number
  dailyHostingCost: number
  totalDailyCost: number
  dailyProfit: number
  profitabilityPercent: number
  dailyROI: number
  roiDays: number
  breakEvenHashprice: number
  safetyMargin: number
  status: 'excellent' | 'good' | 'marginal' | 'breakeven' | 'unprofitable'
}

interface HashpriceData {
  current: number
  avg7d: number
  avg30d: number
  change24h: number
  timestamp: string
  source: string
}

// Helper functions
const getStatusIcon = (status: string, size: number = 16): JSX.Element => {
  const icons: Record<string, JSX.Element> = {
    excellent: <StatusExcellentIcon key="excellent" size={size} />,
    good: <StatusGoodIcon key="good" size={size} />,
    marginal: <StatusWarningIcon key="marginal" size={size} />,
    breakeven: <StatusWarningIcon key="breakeven" size={size} />,
    unprofitable: <StatusErrorIcon key="unprofitable" size={size} />
  }
  return icons[status] || <StatusPendingIcon key="pending" size={size} />
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    excellent: 'Excellent',
    good: 'Good',
    marginal: 'Marginal',
    breakeven: 'Break-even',
    unprofitable: 'UNPROFITABLE'
  }
  return labels[status] || 'Unknown'
}

const formatCurrency = (value: number) => {
  return `$${value.toFixed(2)}`
}

const formatPercent = (value: number) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

export default function ProfitabilityIndex() {
  const [activeTab, setActiveTab] = useState<'batch' | 'daily' | 'roi' | 'compare'>('batch')
  const [batches, setBatches] = useState<BatchMetrics[]>([])
  const [hashprice, setHashprice] = useState<HashpriceData>({
    current: 52.34,
    avg7d: 51.52,
    avg30d: 50.89,
    change24h: 2.5,
    timestamp: new Date().toISOString(),
    source: 'Mock API'
  })
  const [loading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedBatch, setSelectedBatch] = useState<BatchMetrics | null>(null)
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // Load data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      // Load hashprice
      const hashpriceRes = await fetch('/api/profitability/hashprice/current')
      if (hashpriceRes.ok) {
        const hashpriceData = await hashpriceRes.json()
        setHashprice({
          current: hashpriceData.hashprice,
          avg7d: hashpriceData.avg7d || 51.52,
          avg30d: hashpriceData.avg30d || 50.89,
          change24h: hashpriceData.change24h || 0,
          timestamp: hashpriceData.timestamp || new Date().toISOString(),
          source: hashpriceData.source || 'API'
        })
      }

      // Load batches
      const batchesRes = await fetch('/api/profitability/batches')
      if (batchesRes.ok) {
        const batchesData = await batchesRes.json()
        setBatches(batchesData.batches || [])
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort batches
  const filteredBatches = batches.filter(batch => {
    if (filterStatus === 'all') return true
    return batch.status === filterStatus
  })

  const sortedBatches = [...filteredBatches].sort((a, b) => {
    if (!sortConfig) return 0
    
    let aVal: any = a[sortConfig.key as keyof BatchMetrics]
    let bVal: any = b[sortConfig.key as keyof BatchMetrics]
    
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'desc' }
    })
  }

  const openBatchDetails = (batch: BatchMetrics) => {
    setSelectedBatch(batch)
    setShowBatchModal(true)
  }

  // Global metrics
  const totalHashrate = batches.reduce((sum, b) => sum + b.totalHashrate, 0)
  const profitableBatches = batches.filter(b => b.dailyProfit > 0).length
  const breakEvenBatches = batches.filter(b => b.dailyProfit === 0).length
  const unprofitableBatches = batches.filter(b => b.dailyProfit < 0).length
  const totalRevenue = batches.reduce((sum, b) => sum + b.dailyRevenue, 0)
  const totalCost = batches.reduce((sum, b) => sum + b.totalDailyCost, 0)
  const totalProfit = batches.reduce((sum, b) => sum + b.dailyProfit, 0)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
        Loading profitability data...
      </div>
    )
  }

  return (
    <div className="profitability-index">
      {/* Header */}
      <div className="profitability-header">
        <h1>PROFITABILITY INDEX - Mining Revenue vs Electricity Analysis</h1>
        <div className="profitability-header-actions">
          <button className="btn-secondary" onClick={loadData} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshIcon size={16} /> Refresh Data
          </button>
          <button className="btn-secondary" onClick={() => setShowExportModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={16} /> Export Report
          </button>
          <button className="btn-secondary" onClick={() => setShowSettingsModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon size={16} /> Settings
          </button>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUpIcon size={16} /> Historical View
          </button>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="global-metrics-grid">
        <div className="metric-card-large">
          <div className="metric-value-huge">{totalHashrate.toFixed(2)}</div>
          <div className="metric-label-large">Total Hashrate</div>
          <div className="metric-sub-label">PH/s</div>
        </div>
        <div className="metric-card-large">
          <div className="metric-value-huge" style={{ color: '#4CAF50' }}>
            {profitableBatches} ({batches.length > 0 ? Math.round((profitableBatches / batches.length) * 100) : 0}%)
          </div>
          <div className="metric-label-large">Profitable Batches</div>
          <div className="metric-sub-label" style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusExcellentIcon size={16} />
          </div>
        </div>
        <div className="metric-card-large">
          <div className="metric-value-huge" style={{ color: '#FFC107' }}>
            {breakEvenBatches} ({batches.length > 0 ? Math.round((breakEvenBatches / batches.length) * 100) : 0}%)
          </div>
          <div className="metric-label-large">Break-even Batches</div>
          <div className="metric-sub-label" style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusWarningIcon size={16} />
          </div>
        </div>
        <div className="metric-card-large">
          <div className="metric-value-huge" style={{ color: '#F44336' }}>
            {unprofitableBatches} ({batches.length > 0 ? Math.round((unprofitableBatches / batches.length) * 100) : 0}%)
          </div>
          <div className="metric-label-large">In Loss Batches</div>
          <div className="metric-sub-label" style={{ display: 'flex', justifyContent: 'center' }}>
            <StatusErrorIcon size={16} />
          </div>
        </div>
      </div>

      {/* Market Conditions */}
      <div className="market-conditions-box">
        <h3>CURRENT MARKET CONDITIONS</h3>
        <div className="market-info-grid">
          <div className="market-info-item">
            <div className="market-info-label">Daily Avg Hashprice Index</div>
            <div className="market-info-value">{formatCurrency(hashprice.current)} / PH / Day</div>
            <div className="market-info-change">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {hashprice.change24h >= 0 ? <TrendingUpIcon size={14} color="#4CAF50" /> : <TrendingDownIcon size={14} color="#F44336" />}
                {formatPercent(hashprice.change24h)} (24h)
              </span>
            </div>
          </div>
          <div className="market-info-item">
            <div className="market-info-label">BTC Price</div>
            <div className="market-info-value">$85,000.00</div>
            <div className="market-info-change">+1.8%</div>
          </div>
          <div className="market-info-item">
            <div className="market-info-label">Last Updated</div>
            <div className="market-info-value">
              {new Date(hashprice.timestamp).toLocaleString()}
            </div>
            <div className="market-info-change" style={{ fontSize: '12px' }}>
              Source: {hashprice.source}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profitability-tabs">
        <button
          className={`profitability-tab ${activeTab === 'batch' ? 'active' : ''}`}
          onClick={() => setActiveTab('batch')}
        >
          <ChartIcon size={18} /> Batch Analysis
        </button>
        <button
          className={`profitability-tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          <MoneyIcon size={18} /> Daily Profit
        </button>
        <button
          className={`profitability-tab ${activeTab === 'roi' ? 'active' : ''}`}
          onClick={() => setActiveTab('roi')}
        >
          <TrendingUpIcon size={18} /> Profitability ROI
        </button>
        <button
          className={`profitability-tab ${activeTab === 'compare' ? 'active' : ''}`}
          onClick={() => setActiveTab('compare')}
        >
          <CompareIcon size={18} /> Compare
        </button>
      </div>

      {/* Content */}
      <div className="profitability-content">
        {activeTab === 'batch' && (
          <BatchAnalysisTab
            batches={sortedBatches}
            onSort={handleSort}
            sortConfig={sortConfig}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
            onBatchClick={openBatchDetails}
            totalRevenue={totalRevenue}
            totalCost={totalCost}
            totalProfit={totalProfit}
          />
        )}

        {activeTab === 'daily' && (
          <DailyProfitTab
            batches={batches}
            hashprice={hashprice}
          />
        )}

        {activeTab === 'roi' && (
          <ROIAnalysisTab
            batches={batches}
          />
        )}

        {activeTab === 'compare' && (
          <CompareTab
            batches={batches}
          />
        )}
      </div>

      {/* Modals */}
      {showBatchModal && selectedBatch && (
        <BatchDetailsModal
          batch={selectedBatch}
          hashprice={hashprice.current}
          onClose={() => {
            setShowBatchModal(false)
            setSelectedBatch(null)
          }}
        />
      )}

      {showExportModal && (
        <ExportModal
          batches={batches}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  )
}

// Tab: Batch Analysis
function BatchAnalysisTab({
  batches,
  onSort,
  sortConfig,
  filterStatus,
  onFilterChange,
  onBatchClick,
  totalRevenue,
  totalCost,
  totalProfit
}: {
  batches: BatchMetrics[]
  onSort: (key: string) => void
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null
  filterStatus: string
  onFilterChange: (status: string) => void
  onBatchClick: (batch: BatchMetrics) => void
  totalRevenue: number
  totalCost: number
  totalProfit: number
}) {
  return (
    <div>
      {/* Filters */}
      <div className="filters-panel">
        <div className="filter-group">
          <label>Sort by:</label>
          <select
            className="filter-select"
            value={sortConfig?.key || 'profitabilityPercent'}
            onChange={(e) => onSort(e.target.value)}
          >
            <option value="profitabilityPercent">Profitability</option>
            <option value="dailyProfit">Daily Profit</option>
            <option value="roiDays">ROI Period</option>
            <option value="totalHashrate">Hashrate</option>
            <option value="model">Model</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Order:</label>
          <select
            className="filter-select"
            value={sortConfig?.direction || 'desc'}
            onChange={(e) => {
              if (sortConfig) {
                onSort(sortConfig.key)
              }
            }}
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Status:</label>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="marginal">Marginal</option>
            <option value="breakeven">Break-even</option>
            <option value="unprofitable">Unprofitable</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="profit-table-container">
        <table className="profit-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => onSort('batchNumber')}>
                Batch {sortConfig?.key === 'batchNumber' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Model (Qty)</th>
              <th className="sortable" onClick={() => onSort('totalHashrate')}>
                Hashrate (TH/s) {sortConfig?.key === 'totalHashrate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="sortable" onClick={() => onSort('totalDailyCost')}>
                Elec/Day ($) {sortConfig?.key === 'totalDailyCost' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="sortable" onClick={() => onSort('dailyRevenue')}>
                Revenue/Day ($) {sortConfig?.key === 'dailyRevenue' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="sortable" onClick={() => onSort('dailyProfit')}>
                Profit/Day ($) {sortConfig?.key === 'dailyProfit' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="sortable" onClick={() => onSort('profitabilityPercent')}>
                Profit% {sortConfig?.key === 'profitabilityPercent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id} onClick={() => onBatchClick(batch)}>
                <td><strong>#{batch.batchNumber}</strong></td>
                <td>
                  <strong>{batch.model}</strong> ({batch.quantity}u)
                  <br />
                  <small style={{ color: '#888' }}>{batch.hoster}</small>
                </td>
                <td>{batch.totalHashrate.toFixed(2)}</td>
                <td>
                  {formatCurrency(batch.totalDailyCost)}
                  <br />
                  <small style={{ color: '#888' }}>${batch.elecRate}/kWh</small>
                </td>
                <td>{formatCurrency(batch.dailyRevenue)}</td>
                <td className={batch.dailyProfit >= 0 ? 'profit-positive' : 'profit-negative'}>
                  {batch.dailyProfit >= 0 ? '+' : ''}{formatCurrency(batch.dailyProfit)}
                </td>
                <td className={batch.profitabilityPercent >= 0 ? 'profit-positive' : 'profit-negative'}>
                  {formatPercent(batch.profitabilityPercent)}
                  <br />
                  <small style={{ color: '#888' }}>
                    ROI: {batch.roiDays > 0 ? Math.round(batch.roiDays) + 'd' : 'Never'}
                  </small>
                </td>
                <td>
                  <span className={`status-badge-${batch.status}`}>
                    {getStatusIcon(batch.status)} {getStatusLabel(batch.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="summary-stats-grid">
        <div className="summary-stat">
          <div className="summary-stat-value">{batches.length}</div>
          <div className="summary-stat-label">Total Batches</div>
        </div>
        <div className="summary-stat">
          <div className="summary-stat-value">{formatCurrency(totalRevenue)}</div>
          <div className="summary-stat-label">Total Revenue</div>
        </div>
        <div className="summary-stat">
          <div className="summary-stat-value">{formatCurrency(totalCost)}</div>
          <div className="summary-stat-label">Total Elec</div>
        </div>
        <div className="summary-stat">
          <div className="summary-stat-value" style={{ color: totalProfit >= 0 ? '#4CAF50' : '#F44336' }}>
            {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}
          </div>
          <div className="summary-stat-label">Net Profit ({formatPercent((totalProfit / totalCost) * 100)})</div>
        </div>
      </div>
    </div>
  )
}

// Tab: Daily Profit
function DailyProfitTab({
  batches,
  hashprice
}: {
  batches: BatchMetrics[]
  hashprice: HashpriceData
}) {
  const totalRevenue = batches.reduce((sum, b) => sum + b.dailyRevenue, 0)
  const totalCost = batches.reduce((sum, b) => sum + b.totalDailyCost, 0)
  const totalProfit = totalRevenue - totalCost

  return (
    <div>
      <div className="daily-profit-cards">
        <div className="daily-profit-card">
          <h3>TODAY'S PERFORMANCE</h3>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Total Revenue</div>
            <div className="daily-profit-value">{formatCurrency(totalRevenue)}</div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Total Electricity</div>
            <div className="daily-profit-value">{formatCurrency(totalCost)}</div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Net Profit</div>
            <div className={`daily-profit-value ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
              {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}
            </div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Profit Margin</div>
            <div className={`daily-profit-value ${totalProfit >= 0 ? 'positive' : 'negative'}`}>
              {formatPercent((totalProfit / totalCost) * 100)}
            </div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Hashprice</div>
            <div className="daily-profit-value">{formatCurrency(hashprice.current)}/PH/Day</div>
          </div>
        </div>

        <div className="daily-profit-card">
          <h3>30-DAY AVERAGE</h3>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Avg Revenue</div>
            <div className="daily-profit-value">{formatCurrency(totalRevenue * 0.98)}</div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Avg Electricity</div>
            <div className="daily-profit-value">{formatCurrency(totalCost)}</div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Avg Net Profit</div>
            <div className="daily-profit-value positive">
              +{formatCurrency(totalProfit * 0.95)}
            </div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Avg Margin</div>
            <div className="daily-profit-value positive">+84.5%</div>
          </div>
          <div className="daily-profit-metric">
            <div className="daily-profit-label">Avg Hashprice</div>
            <div className="daily-profit-value">{formatCurrency(hashprice.avg30d)}/PH/Day</div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-placeholder">
          [Stacked Area Chart - Daily Profit over 30 days]
        </div>
      </div>

      {/* Breakdown by Hoster */}
      <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#8afd81' }}>BREAKDOWN BY HOSTER</h3>
      <table className="breakdown-table">
        <thead>
          <tr>
            <th>Hoster</th>
            <th>Revenue</th>
            <th>Elec Cost</th>
            <th>Profit</th>
            <th>Margin</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(new Set(batches.map(b => b.hoster))).map(hoster => {
            const hosterBatches = batches.filter(b => b.hoster === hoster)
            const hosterRevenue = hosterBatches.reduce((sum, b) => sum + b.dailyRevenue, 0)
            const hosterCost = hosterBatches.reduce((sum, b) => sum + b.totalDailyCost, 0)
            const hosterProfit = hosterRevenue - hosterCost
            return (
              <tr key={hoster}>
                <td>🏢 {hoster} ({hosterBatches.length} batches)</td>
                <td>{formatCurrency(hosterRevenue)}</td>
                <td>{formatCurrency(hosterCost)}</td>
                <td className={hosterProfit >= 0 ? 'profit-positive' : 'profit-negative'}>
                  {hosterProfit >= 0 ? '+' : ''}{formatCurrency(hosterProfit)}
                </td>
                <td className={hosterProfit >= 0 ? 'profit-positive' : 'profit-negative'}>
                  {formatPercent((hosterProfit / hosterCost) * 100)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// Tab: ROI Analysis
function ROIAnalysisTab({
  batches
}: {
  batches: BatchMetrics[]
}) {
  const totalInvestment = batches.reduce((sum, b) => sum + b.hardwareInvestment, 0)
  const totalDailyProfit = batches.reduce((sum, b) => sum + b.dailyProfit, 0)
  const avgDailyROI = totalInvestment > 0 ? (totalDailyProfit / totalInvestment) * 100 : 0
  const portfolioROIDays = totalDailyProfit > 0 ? totalInvestment / totalDailyProfit : -1

  // Sort by daily ROI
  const sortedByROI = [...batches].sort((a, b) => b.dailyROI - a.dailyROI)

  // Profitability tiers
  const excellentBatches = batches.filter(b => b.status === 'excellent')
  const goodBatches = batches.filter(b => b.status === 'good')
  const marginalBatches = batches.filter(b => b.status === 'marginal')
  const breakevenBatches = batches.filter(b => b.status === 'breakeven')
  const unprofitableBatches = batches.filter(b => b.status === 'unprofitable')

  return (
    <div>
      {/* Portfolio Overview */}
      <div className="market-conditions-box">
        <h3>PORTFOLIO OVERVIEW</h3>
        <div className="market-info-grid">
          <div className="market-info-item">
            <div className="market-info-label">Total Hardware Investment</div>
            <div className="market-info-value">{formatCurrency(totalInvestment)}</div>
          </div>
          <div className="market-info-item">
            <div className="market-info-label">Current Daily Profit</div>
            <div className="market-info-value" style={{ color: '#4CAF50' }}>
              {formatCurrency(totalDailyProfit)}
            </div>
          </div>
          <div className="market-info-item">
            <div className="market-info-label">Average Daily Profitability</div>
            <div className="market-info-value">{formatPercent(avgDailyROI)}</div>
            <div className="market-info-change">(of total investment)</div>
          </div>
          <div className="market-info-item">
            <div className="market-info-label">Portfolio ROI Period</div>
            <div className="market-info-value">
              {portfolioROIDays > 0 ? Math.round(portfolioROIDays) + ' days' : 'Never'}
            </div>
            <div className="market-info-change">
              (≈ {portfolioROIDays > 0 ? (portfolioROIDays / 365).toFixed(1) : 'N/A'} years)
            </div>
          </div>
        </div>
      </div>

      {/* ROI Ranking Table */}
      <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#8afd81' }}>
        BATCH PROFITABILITY RANKING (sorted by Daily Profitability %)
      </h3>
      <div className="profit-table-container">
        <table className="profit-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Batch</th>
              <th>Hardware Invest ($)</th>
              <th>Daily Profit ($)</th>
              <th>Daily Prof %</th>
              <th>ROI Period</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedByROI.map((batch, index) => (
              <tr key={batch.id}>
                <td>{index + 1}</td>
                <td>
                  <strong>#{batch.batchNumber} {batch.model}</strong>
                </td>
                <td>{formatCurrency(batch.hardwareInvestment)}</td>
                <td className={batch.dailyProfit >= 0 ? 'profit-positive' : 'profit-negative'}>
                  {batch.dailyProfit >= 0 ? '+' : ''}{formatCurrency(batch.dailyProfit)}
                </td>
                <td className={batch.dailyROI >= 0 ? 'profit-positive' : 'profit-negative'}>
                  {formatPercent(batch.dailyROI)}
                </td>
                <td>{batch.roiDays > 0 ? Math.round(batch.roiDays) + ' days' : 'Never'}</td>
                <td>
                  <span className={`status-badge-${batch.status}`}>
                    {getStatusIcon(batch.status)} {getStatusLabel(batch.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profitability Tiers */}
      <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#8afd81', marginTop: '32px' }}>
        PROFITABILITY TIERS
      </h3>
      <table className="profitability-tiers-table">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Batches</th>
            <th>Invest</th>
            <th>Daily Profit</th>
            <th>Avg ROI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="status-badge-excellent" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <StatusExcellentIcon size={14} /> Excellent (&lt;150d)
              </span>
            </td>
            <td>{excellentBatches.length} ({batches.length > 0 ? Math.round((excellentBatches.length / batches.length) * 100) : 0}%)</td>
            <td>{formatCurrency(excellentBatches.reduce((sum, b) => sum + b.hardwareInvestment, 0))}</td>
            <td className="profit-positive">
              +{formatCurrency(excellentBatches.reduce((sum, b) => sum + b.dailyProfit, 0))}
            </td>
            <td>
              {excellentBatches.length > 0
                ? Math.round(excellentBatches.reduce((sum, b) => sum + b.roiDays, 0) / excellentBatches.length) + ' days'
                : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>
              <span className="status-badge-good" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <StatusGoodIcon size={14} /> Good (150-250d)
              </span>
            </td>
            <td>{goodBatches.length} ({batches.length > 0 ? Math.round((goodBatches.length / batches.length) * 100) : 0}%)</td>
            <td>{formatCurrency(goodBatches.reduce((sum, b) => sum + b.hardwareInvestment, 0))}</td>
            <td className="profit-positive">
              +{formatCurrency(goodBatches.reduce((sum, b) => sum + b.dailyProfit, 0))}
            </td>
            <td>
              {goodBatches.length > 0
                ? Math.round(goodBatches.reduce((sum, b) => sum + b.roiDays, 0) / goodBatches.length) + ' days'
                : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>
              <span className="status-badge-marginal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <StatusWarningIcon size={14} /> Marginal (250-400d)
              </span>
            </td>
            <td>{marginalBatches.length} ({batches.length > 0 ? Math.round((marginalBatches.length / batches.length) * 100) : 0}%)</td>
            <td>{formatCurrency(marginalBatches.reduce((sum, b) => sum + b.hardwareInvestment, 0))}</td>
            <td className="profit-positive">
              +{formatCurrency(marginalBatches.reduce((sum, b) => sum + b.dailyProfit, 0))}
            </td>
            <td>
              {marginalBatches.length > 0
                ? Math.round(marginalBatches.reduce((sum, b) => sum + b.roiDays, 0) / marginalBatches.length) + ' days'
                : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>
              <span className="status-badge-breakeven" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <StatusWarningIcon size={14} /> Break-even (&gt;400d)
              </span>
            </td>
            <td>{breakevenBatches.length} ({batches.length > 0 ? Math.round((breakevenBatches.length / batches.length) * 100) : 0}%)</td>
            <td>{formatCurrency(breakevenBatches.reduce((sum, b) => sum + b.hardwareInvestment, 0))}</td>
            <td className="profit-positive">
              +{formatCurrency(breakevenBatches.reduce((sum, b) => sum + b.dailyProfit, 0))}
            </td>
            <td>
              {breakevenBatches.length > 0
                ? Math.round(breakevenBatches.reduce((sum, b) => sum + b.roiDays, 0) / breakevenBatches.length) + ' days'
                : 'N/A'}
            </td>
          </tr>
          <tr>
            <td>
              <span className="status-badge-unprofitable" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <StatusErrorIcon size={14} /> Unprofitable
              </span>
            </td>
            <td>{unprofitableBatches.length} ({batches.length > 0 ? Math.round((unprofitableBatches.length / batches.length) * 100) : 0}%)</td>
            <td>{formatCurrency(unprofitableBatches.reduce((sum, b) => sum + b.hardwareInvestment, 0))}</td>
            <td className="profit-negative">
              {formatCurrency(unprofitableBatches.reduce((sum, b) => sum + b.dailyProfit, 0))}
            </td>
            <td>Never</td>
          </tr>
        </tbody>
      </table>

      {/* Recommendations */}
      {unprofitableBatches.length > 0 && (
        <div className="recommendation-box">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WarningIcon size={20} /> IMMEDIATE ACTIONS RECOMMENDED
          </h3>
          <div className="recommendation-item recommendation-shutdown">
            <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <StatusErrorIcon size={16} /> Shutdown Candidates ({unprofitableBatches.length} batches):
            </strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {unprofitableBatches.map(batch => (
                <li key={batch.id}>
                  Batch #{batch.batchNumber} ({batch.model} x{batch.quantity}): Losing {formatCurrency(Math.abs(batch.dailyProfit))}/day
                  ({formatCurrency(Math.abs(batch.dailyProfit) * 30)}/month)
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '8px' }}>
              Total Monthly Loss: {formatCurrency(Math.abs(unprofitableBatches.reduce((sum, b) => sum + b.dailyProfit, 0)) * 30)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Tab: Compare
function CompareTab({
  batches
}: {
  batches: BatchMetrics[]
}) {
  const [selectedBatches, setSelectedBatches] = useState<string[]>([])

  const selectedBatchData = batches.filter(b => selectedBatches.includes(b.id))

  return (
    <div>
      <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#8afd81' }}>
        SELECT BATCHES TO COMPARE (up to 5)
      </h3>
      <div className="filters-panel">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="filter-group">
            <label>Batch {num}:</label>
            <select
              className="filter-select"
              value={selectedBatches[num - 1] || ''}
              onChange={(e) => {
                const newSelected = [...selectedBatches]
                if (e.target.value) {
                  newSelected[num - 1] = e.target.value
                } else {
                  newSelected.splice(num - 1, 1)
                }
                setSelectedBatches(newSelected.filter(Boolean))
              }}
            >
              <option value="">None</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>
                  #{batch.batchNumber} {batch.model} ({batch.quantity}u)
                </option>
              ))}
            </select>
          </div>
        ))}
        <button className="btn-secondary" onClick={() => setSelectedBatches([])}>Reset</button>
      </div>

      {selectedBatchData.length > 0 && (
        <>
          <div className="comparison-grid">
            <div className="comparison-cell comparison-header">Metric</div>
            {selectedBatchData.map(batch => (
              <div key={batch.id} className="comparison-cell comparison-header">
                #{batch.batchNumber}
              </div>
            ))}
            {selectedBatchData.length < 5 && Array.from({ length: 5 - selectedBatchData.length }).map((_, i) => (
              <div key={`empty-${i}`} className="comparison-cell comparison-header"></div>
            ))}

            <div className="comparison-cell comparison-metric-label">Model</div>
            {selectedBatchData.map(batch => (
              <div key={batch.id} className="comparison-cell comparison-value">{batch.model}</div>
            ))}
            {selectedBatchData.length < 5 && Array.from({ length: 5 - selectedBatchData.length }).map((_, i) => (
              <div key={`empty-${i}`} className="comparison-cell"></div>
            ))}

            <div className="comparison-cell comparison-metric-label">Quantity</div>
            {selectedBatchData.map(batch => (
              <div key={batch.id} className="comparison-cell comparison-value">{batch.quantity} units</div>
            ))}
            {selectedBatchData.length < 5 && Array.from({ length: 5 - selectedBatchData.length }).map((_, i) => (
              <div key={`empty-${i}`} className="comparison-cell"></div>
            ))}

            <div className="comparison-cell comparison-metric-label">Hashrate (TH/s)</div>
            {selectedBatchData.map(batch => (
              <div key={batch.id} className="comparison-cell comparison-value">{batch.totalHashrate.toFixed(2)}</div>
            ))}
            {selectedBatchData.length < 5 && Array.from({ length: 5 - selectedBatchData.length }).map((_, i) => (
              <div key={`empty-${i}`} className="comparison-cell"></div>
            ))}

            <div className="comparison-cell comparison-metric-label">Daily Profit</div>
            {selectedBatchData.map(batch => (
              <div key={batch.id} className={`comparison-cell comparison-value ${batch.dailyProfit >= 0 ? 'profit-positive' : 'profit-negative'}`}>
                {batch.dailyProfit >= 0 ? '+' : ''}{formatCurrency(batch.dailyProfit)}
              </div>
            ))}
            {selectedBatchData.length < 5 && Array.from({ length: 5 - selectedBatchData.length }).map((_, i) => (
              <div key={`empty-${i}`} className="comparison-cell"></div>
            ))}

            <div className="comparison-cell comparison-metric-label">Profit %</div>
            {selectedBatchData.map(batch => (
              <div key={batch.id} className={`comparison-cell comparison-value ${batch.profitabilityPercent >= 0 ? 'profit-positive' : 'profit-negative'}`}>
                {formatPercent(batch.profitabilityPercent)}
              </div>
            ))}
            {selectedBatchData.length < 5 && Array.from({ length: 5 - selectedBatchData.length }).map((_, i) => (
              <div key={`empty-${i}`} className="comparison-cell"></div>
            ))}

            <div className="comparison-cell comparison-metric-label">ROI Period</div>
            {selectedBatchData.map(batch => (
              <div key={batch.id} className="comparison-cell comparison-value">
                {batch.roiDays > 0 ? Math.round(batch.roiDays) + ' days' : 'Never'}
              </div>
            ))}
            {selectedBatchData.length < 5 && Array.from({ length: 5 - selectedBatchData.length }).map((_, i) => (
              <div key={`empty-${i}`} className="comparison-cell"></div>
            ))}
          </div>

          <div className="chart-container" style={{ marginTop: '32px' }}>
            <div className="chart-placeholder">
              [Radar Chart - Multi-metric comparison]
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Modal: Batch Details
function BatchDetailsModal({
  batch,
  hashprice,
  onClose
}: {
  batch: BatchMetrics
  hashprice: number
  onClose: () => void
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChartIcon size={24} /> BATCH DETAILED ANALYSIS - Batch #{batch.batchNumber}
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="two-col-layout">
            <div className="form-section">
              <h3>BATCH INFORMATION</h3>
              <div className="form-group">
                <div><strong>Batch ID:</strong> #{batch.batchNumber}</div>
                <div><strong>Model:</strong> {batch.model}</div>
                <div><strong>Quantity:</strong> {batch.quantity} units</div>
                <div><strong>Location:</strong> {batch.hoster}</div>
                <div><strong>Total Hashrate:</strong> {batch.totalHashrate.toFixed(2)} PH/s</div>
                <div><strong>Per Unit:</strong> {batch.unitHashrate} TH/s</div>
                <div><strong>Total Power:</strong> {batch.totalPower.toFixed(2)} kW</div>
                <div><strong>Per Unit:</strong> {batch.unitPower} W</div>
                <div><strong>Efficiency:</strong> {batch.efficiency} J/TH</div>
                <div><strong>Hardware Investment:</strong> {formatCurrency(batch.hardwareInvestment)}</div>
              </div>
            </div>

            <div className="form-section">
              <h3>CURRENT PERFORMANCE</h3>
              <div className="form-group">
                <div>
                  <strong>Status:</strong>{' '}
                  <span className={`status-badge-${batch.status}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {getStatusIcon(batch.status, 14)} {getStatusLabel(batch.status)}
                  </span>
                </div>
                <div><strong>Daily Profit:</strong> <span className="profit-positive">+{formatCurrency(batch.dailyProfit)}</span></div>
                <div><strong>Profit Margin:</strong> <span className="profit-positive">{formatPercent(batch.profitabilityPercent)}</span></div>
                <div><strong>ROI Period:</strong> {batch.roiDays > 0 ? Math.round(batch.roiDays) + ' days' : 'Never'}</div>
                <div><strong>Break-even Price:</strong> {formatCurrency(batch.breakEvenHashprice)} / PH / Day</div>
                <div><strong>Current Hashprice:</strong> {formatCurrency(hashprice)} / PH / Day</div>
                <div><strong>Safety Margin:</strong> <span className="profit-positive">{formatPercent(batch.safetyMargin)}</span></div>
              </div>
            </div>
          </div>

          <div className="calculation-box">
            <div className="calculation-section">
              <div className="calculation-section-title">DAILY CALCULATIONS (DETAILED BREAKDOWN)</div>
              
              <div className="calculation-section">
                <div className="calculation-formula">REVENUE CALCULATION:</div>
                <div className="calculation-step">Daily Avg Hashprice: {formatCurrency(hashprice)} / PH / Day</div>
                <div className="calculation-step">Batch Hashrate: {batch.totalHashrate.toFixed(3)} PH/s</div>
                <div className="calculation-step">Daily Revenue = {formatCurrency(hashprice)} × {batch.totalHashrate.toFixed(3)}</div>
                <div className="calculation-result">= {formatCurrency(batch.dailyRevenue)} per day</div>
              </div>

              <div className="calculation-section">
                <div className="calculation-formula">ELECTRICITY COST:</div>
                <div className="calculation-step">Total Power: {batch.totalPower.toFixed(2)} kW</div>
                <div className="calculation-step">Electricity Rate: {formatCurrency(batch.elecRate)} / kWh</div>
                <div className="calculation-step">Daily Hours: 24h</div>
                <div className="calculation-step">Daily Elec Cost = {batch.totalPower.toFixed(2)} kW × 24h × {formatCurrency(batch.elecRate)}</div>
                <div className="calculation-step">= {formatCurrency(batch.dailyElecCost)} per day</div>
                <div className="calculation-step">Hosting Fee: {formatCurrency(batch.dailyHostingCost)} per day</div>
                <div className="calculation-result">Total Daily Cost = {formatCurrency(batch.totalDailyCost)}</div>
              </div>

              <div className="calculation-section">
                <div className="calculation-formula">NET PROFIT:</div>
                <div className="calculation-step">Daily Profit = Revenue - Electricity</div>
                <div className="calculation-step">= {formatCurrency(batch.dailyRevenue)} - {formatCurrency(batch.totalDailyCost)}</div>
                <div className="calculation-result">= +{formatCurrency(batch.dailyProfit)} per day</div>
              </div>

              <div className="calculation-section">
                <div className="calculation-formula">PROFITABILITY RATIO:</div>
                <div className="calculation-step">Daily Profit % = (Revenue - Elec) / Elec × 100</div>
                <div className="calculation-step">= ({formatCurrency(batch.dailyRevenue)} - {formatCurrency(batch.totalDailyCost)}) / {formatCurrency(batch.totalDailyCost)} × 100</div>
                <div className="calculation-result">= {formatPercent(batch.profitabilityPercent)}</div>
              </div>

              <div className="calculation-section">
                <div className="calculation-formula">ROI CALCULATION:</div>
                <div className="calculation-step">Daily Profitability = Profit / Hardware Investment</div>
                <div className="calculation-step">= {formatCurrency(batch.dailyProfit)} / {formatCurrency(batch.hardwareInvestment)}</div>
                <div className="calculation-step">= {formatPercent(batch.dailyROI)} per day</div>
                <div className="calculation-step">ROI Period = Hardware Investment / Daily Profit</div>
                <div className="calculation-step">= {formatCurrency(batch.hardwareInvestment)} / {formatCurrency(batch.dailyProfit)}</div>
                <div className="calculation-result">= {Math.round(batch.roiDays)} days (≈ {(batch.roiDays / 30).toFixed(1)} months)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-secondary">Export Details</button>
          <button className="btn-secondary">Set Alert</button>
        </div>
      </div>
    </div>
  )
}

// Modal: Export
function ExportModal({
  batches,
  onClose
}: {
  batches: BatchMetrics[]
  onClose: () => void
}) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf' | 'excel'>('csv')

  const handleExport = () => {
    if (exportFormat === 'csv') {
      const headers = ['Batch', 'Model', 'Hashrate (TH/s)', 'Elec/Day ($)', 'Revenue/Day ($)', 'Profit/Day ($)', 'Profit%', 'ROI Days', 'Status']
      const rows = batches.map(batch => [
        batch.batchNumber,
        batch.model,
        batch.totalHashrate.toFixed(2),
        batch.totalDailyCost.toFixed(2),
        batch.dailyRevenue.toFixed(2),
        batch.dailyProfit.toFixed(2),
        batch.profitabilityPercent.toFixed(1),
        batch.roiDays > 0 ? Math.round(batch.roiDays).toString() : 'Never',
        getStatusLabel(batch.status)
      ])
      let csv = headers.join(',') + '\n'
      csv += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `profitability_report_${Date.now()}.csv`
      a.click()
    }
    alert(`Exported ${batches.length} batches as ${exportFormat.toUpperCase()}`)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={24} /> EXPORT PROFITABILITY REPORT
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-section">
            <h3>EXPORT FORMAT</h3>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                />
                <label>CSV (Raw data for analysis)</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={() => setExportFormat('pdf')}
                />
                <label>PDF (Formatted report with charts)</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={() => setExportFormat('excel')}
                />
                <label>Excel (.xlsx) - All data with formulas</label>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-add-large" onClick={handleExport}>Generate & Download</button>
        </div>
      </div>
    </div>
  )
}

// Modal: Settings
function SettingsModal({
  onClose
}: {
  onClose: () => void
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-medium" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsIcon size={24} /> PROFITABILITY INDEX SETTINGS
          </h2>
          <button className="modal-close" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XIcon size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-section">
            <h3>HASHPRICE DATA SOURCE</h3>
            <div className="form-group">
              <label>Primary Source:</label>
              <select className="filter-select">
                <option>Luxor Hashprice Index</option>
                <option>F2Pool</option>
                <option>Poolin</option>
                <option>Manual Entry</option>
              </select>
            </div>
            <div className="form-group">
              <label>Auto-Update Frequency:</label>
              <select className="filter-select">
                <option>Every 15 minutes</option>
                <option>Every 5 minutes</option>
                <option>Every 30 minutes</option>
                <option>Every hour</option>
                <option>Manual only</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>PROFITABILITY THRESHOLDS</h3>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusExcellentIcon size={16} /> Excellent: Profit margin &gt; 150% or ROI &lt; 150 days
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusGoodIcon size={16} /> Good: Profit margin &gt; 80% or ROI &lt; 250 days
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusWarningIcon size={16} /> Marginal: Profit margin &gt; 20% or ROI &lt; 400 days
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusWarningIcon size={16} /> Break-even: Profit margin 0-20% or ROI &gt; 400 days
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <StatusErrorIcon size={16} /> Unprofitable: Negative profit
              </label>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-add-large">Save Settings</button>
        </div>
      </div>
    </div>
  )
}

