'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import KpiBox from '@/components/ui/KpiBox'
import { CardWrapper } from '@/components/ui/CardWrapper'
import SectionTitle from '@/components/ui/SectionTitle'

export default function CalculatorPage() {
  useEffect(() => {
    // Charger le CSS du calculator avec charte exacte
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/calculator-charte-exacte.css'
    document.head.appendChild(link)

    return () => {
      // Nettoyer le CSS lors du démontage
      const existingLink = document.querySelector('link[href="/css/calculator-charte-exacte.css"]')
      if (existingLink) {
        document.head.removeChild(existingLink)
      }
    }
  }, [])

  return (
    <>
      {/* Styles globaux pour la page calculator */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 8px var(--hearst-green);
          }
          50% {
            opacity: 0.5;
            box-shadow: 0 0 16px var(--hearst-green);
          }
        }
        
        /* Assurer que tous les éléments héritent de la police */
        .calculator-section input,
        .calculator-section select,
        .calculator-section button,
        .calculator-section label {
          font-family: inherit;
        }
        
        /* Espacement entre les cartes de résultats */
        .calculator-results > *:not(:last-child) {
          margin-bottom: var(--space-4);
        }
      `}</style>
      
      <div className="dashboard-view">
        <div className="dashboard-content calculator-page-container">
          {/* Navigation horizontale - Style exact PROJECTIONS */}
          <nav className="calculator-nav-tabs">
            <button className="calculator-nav-tab active">Overview</button>
            <button className="calculator-nav-tab">Calculator</button>
            <button className="calculator-nav-tab">Results</button>
            <button className="calculator-nav-tab">Charts</button>
            <button className="calculator-nav-tab">Monte Carlo</button>
            <button className="calculator-nav-tab">Projects</button>
            <button className="calculator-nav-tab">Hardware</button>
            <button className="calculator-nav-tab">Energy</button>
            <button className="calculator-nav-tab">Infrastructure</button>
          </nav>

          {/* Header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <SectionTitle level={1}>Mining Profitability Calculator</SectionTitle>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
              paddingBottom: 'var(--space-4)',
              borderBottom: '1px solid rgba(167, 251, 144, 0.1)',
            }}>
              <div className="live-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                background: 'rgba(167, 251, 144, 0.1)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(167, 251, 144, 0.2)',
              }}>
                <span className="live-dot" style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#A7FB90',
                  animation: 'pulse 2s infinite',
                }}></span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#A7FB90' }}>LIVE</span>
              </div>
            </div>
          </div>

          {/* Métriques temps réel - Style PROJECTIONS exact */}
          <section className="metrics-section" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="calculator-kpi-grid">
              <div className="calculator-kpi-card">
                <div className="calculator-kpi-label">BTC Price</div>
                <div className="calculator-kpi-value">
                  <span id="btc-price">$0</span>
                  <span id="btc-change" style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: 'var(--space-2)', fontWeight: 400 }}>--</span>
                </div>
                <div className="calculator-kpi-description">Real-time price</div>
              </div>
              <div className="calculator-kpi-card">
                <div className="calculator-kpi-label">Network Hashrate</div>
                <div className="calculator-kpi-value">
                  <span id="network-hashrate">0 EH/s</span>
                </div>
                <div className="calculator-kpi-description">Real-time</div>
              </div>
              <div className="calculator-kpi-card">
                <div className="calculator-kpi-label">Hashprice (TH)</div>
                <div className="calculator-kpi-value">
                  <span id="hashprice-th">$0</span>
                </div>
                <div className="calculator-kpi-description">per TH/day</div>
              </div>
              <div className="calculator-kpi-card">
                <div className="calculator-kpi-label">Hashprice (PH)</div>
                <div className="calculator-kpi-value">
                  <span id="hashprice-ph">$0</span>
                </div>
                <div className="calculator-kpi-description">per PH/day</div>
              </div>
            </div>
          </section>

          {/* Formulaire de calcul - Style PROJECTIONS */}
          <section className="calculator-section" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="calculator-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '24px',
              alignItems: 'start',
            }}>
              {/* Colonne gauche : Formulaire */}
              <CardWrapper>
                <SectionTitle level={2}>Mining Parameters</SectionTitle>
                
                <div className="calculator-form" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="miner-type" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: '#A7FB90',
                    marginBottom: '8px',
                    letterSpacing: '0.3px',
                  }}>
                    Mining Machine
                  </label>
                    <select
                      id="miner-type"
                      className="form-select"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#1A1A1A',
                      border: '1px solid rgba(167, 251, 144, 0.08)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit',
                      fontWeight: 500,
                      transition: 'all 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A7FB90'
                      e.currentTarget.style.background = '#141414'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(167, 251, 144, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      e.currentTarget.style.background = '#1A1A1A'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      }
                    }}
                    >
                      <option value="" disabled>Select a mining machine...</option>
                      <option value="custom">Custom (Manual Input)</option>
                      <optgroup label="Bitmain Antminer">
                        <option value="s21-200t">Antminer S21 200TH/s (3550W)</option>
                        <option value="s21-192t">Antminer S21 192TH/s (3510W)</option>
                        <option value="s21-hyd-335t">Antminer S21 Hydro 335TH/s (5364W)</option>
                        <option value="s21-hyd-301t">Antminer S21 Hydro 301TH/s (5445W)</option>
                        <option value="s19-xp-141t">Antminer S19 XP 141TH/s (3010W)</option>
                        <option value="s19-pro-110t">Antminer S19 Pro 110TH/s (3250W)</option>
                        <option value="s19-95t">Antminer S19 95TH/s (3250W)</option>
                        <option value="s19j-pro-100t">Antminer S19j Pro 100TH/s (3050W)</option>
                        <option value="s19j-pro-96t">Antminer S19j Pro 96TH/s (3050W)</option>
                        <option value="s19j-pro-104t">Antminer S19j Pro 104TH/s (3068W)</option>
                      </optgroup>
                      <optgroup label="MicroBT Whatsminer">
                        <option value="m60-188t">Whatsminer M60 188TH/s (3612W)</option>
                        <option value="m60-186t">Whatsminer M60 186TH/s (3612W)</option>
                        <option value="m56s-184t">Whatsminer M56S 184TH/s (3420W)</option>
                        <option value="m56s-172t">Whatsminer M56S 172TH/s (3420W)</option>
                        <option value="m53s-150t">Whatsminer M53S 150TH/s (3420W)</option>
                        <option value="m50s-126t">Whatsminer M50S 126TH/s (3420W)</option>
                        <option value="m50-118t">Whatsminer M50 118TH/s (3300W)</option>
                      </optgroup>
                      <optgroup label="Canaan AvalonMiner">
                        <option value="avalon-1466-150t">AvalonMiner 1466 150TH/s (3420W)</option>
                        <option value="avalon-1466-130t">AvalonMiner 1466 130TH/s (3420W)</option>
                        <option value="avalon-1246-90t">AvalonMiner 1246 90TH/s (3420W)</option>
                        <option value="avalon-1166-81t">AvalonMiner 1166 81TH/s (3420W)</option>
                      </optgroup>
                      <optgroup label="Ebang Ebit">
                        <option value="ebit-e12-190t">Ebit E12+ 190TH/s (3500W)</option>
                        <option value="ebit-e12-180t">Ebit E12+ 180TH/s (3500W)</option>
                        <option value="ebit-e12-150t">Ebit E12+ 150TH/s (3500W)</option>
                      </optgroup>
                    </select>
                    <span className="input-hint" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                    }}>
                      Select your mining machine model
                    </span>
                  </div>

                  <div className="form-group" id="hashrate-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="hashrate" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: '#A7FB90',
                    marginBottom: '8px',
                    letterSpacing: '0.3px',
                  }}>
                    Hashrate (TH/s)
                  </label>
                    <input
                      type="number"
                      id="hashrate"
                      placeholder="100"
                      min="0"
                      step="0.01"
                      readOnly
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#1A1A1A',
                      border: '1px solid rgba(167, 251, 144, 0.08)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit',
                      fontWeight: 500,
                      transition: 'all 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A7FB90'
                      e.currentTarget.style.background = '#141414'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(167, 251, 144, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      e.currentTarget.style.background = '#1A1A1A'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      }
                    }}
                    />
                    <span className="input-hint" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                    }}>
                      Automatically filled based on machine selection
                    </span>
                  </div>

                  <div className="form-group" id="power-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="power" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: '#A7FB90',
                    marginBottom: '8px',
                    letterSpacing: '0.3px',
                  }}>
                    Power Consumption (W)
                  </label>
                    <input
                      type="number"
                      id="power"
                      placeholder="3500"
                      min="0"
                      step="1"
                      readOnly
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#1A1A1A',
                      border: '1px solid rgba(167, 251, 144, 0.08)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit',
                      fontWeight: 500,
                      transition: 'all 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A7FB90'
                      e.currentTarget.style.background = '#141414'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(167, 251, 144, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      e.currentTarget.style.background = '#1A1A1A'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      }
                    }}
                    />
                    <span className="input-hint" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                    }}>
                      Automatically filled based on machine selection
                    </span>
                  </div>

                  <div className="form-group" id="quantity-group" style={{ display: 'none', marginBottom: 'var(--space-4)' }}>
                    <label htmlFor="quantity" style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      marginBottom: 'var(--space-2)',
                      color: 'var(--text-primary)',
                    }}>
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      placeholder="1"
                      min="1"
                      step="1"
                      defaultValue="1"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#1A1A1A',
                      border: '1px solid rgba(167, 251, 144, 0.08)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit',
                      fontWeight: 500,
                      transition: 'all 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A7FB90'
                      e.currentTarget.style.background = '#141414'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(167, 251, 144, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      e.currentTarget.style.background = '#1A1A1A'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      }
                    }}
                    />
                    <span className="input-hint" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                    }}>
                      Number of machines
                    </span>
                  </div>

                  <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="electricity" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: '#A7FB90',
                    marginBottom: '8px',
                    letterSpacing: '0.3px',
                  }}>
                    Electricity Cost ($/kWh)
                  </label>
                    <input
                      type="number"
                      id="electricity"
                      placeholder="0.05"
                      min="0"
                      step="0.001"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#1A1A1A',
                      border: '1px solid rgba(167, 251, 144, 0.08)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit',
                      fontWeight: 500,
                      transition: 'all 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A7FB90'
                      e.currentTarget.style.background = '#141414'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(167, 251, 144, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      e.currentTarget.style.background = '#1A1A1A'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      }
                    }}
                    />
                    <span className="input-hint" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                    }}>
                      Cost per kilowatt-hour
                    </span>
                  </div>

                  <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="equipment-cost" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: '#A7FB90',
                    marginBottom: '8px',
                    letterSpacing: '0.3px',
                  }}>
                    Equipment Cost ($)
                  </label>
                    <input
                      type="number"
                      id="equipment-cost"
                      placeholder="0"
                      min="0"
                      step="0.01"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#1A1A1A',
                      border: '1px solid rgba(167, 251, 144, 0.08)',
                      borderRadius: 'var(--radius-lg)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'inherit',
                      fontWeight: 500,
                      transition: 'all 0.25s ease',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A7FB90'
                      e.currentTarget.style.background = '#141414'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(167, 251, 144, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      e.currentTarget.style.background = '#1A1A1A'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.3)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (document.activeElement !== e.currentTarget) {
                        e.currentTarget.style.borderColor = 'rgba(167, 251, 144, 0.08)'
                      }
                    }}
                    />
                    <span className="input-hint" style={{
                      display: 'block',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginTop: '8px',
                    }}>
                      Optional: for ROI calculation
                    </span>
                  </div>

                  <button
                    className="btn-calculate"
                    id="btn-calculate"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      background: '#A7FB90',
                      color: '#000',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      fontFamily: 'inherit',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#A7FB90'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(167, 251, 144, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#A7FB90'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    Calculate
                  </button>
                </div>
              </CardWrapper>

              {/* Colonne droite : Résultats - Style HOME */}
              <div className="calculator-results" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <SectionTitle level={2}>Results</SectionTitle>
                
                {/* Résultats quotidiens */}
                <CardWrapper>
                  <h3 className="results-title" style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: 'var(--text-primary)',
                  }}>
                    Daily
                  </h3>
                  <div className="results-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                  }}>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Revenue
                      </span>
                      <span className="result-value" id="daily-revenue" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Cost
                      </span>
                      <span className="result-value" id="daily-cost" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item highlight" style={{
                      gridColumn: '1 / -1',
                      padding: '12px',
                      background: 'rgba(167, 251, 144, 0.1)',
                      borderRadius: 'var(--radius-lg)',
                    }}>
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Profit
                      </span>
                      <span className="result-value" id="daily-profit" style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: '#A7FB90',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Margin
                      </span>
                      <span className="result-value" id="daily-margin" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        0%
                      </span>
                    </div>
                  </div>
                </CardWrapper>

                {/* Résultats mensuels */}
                <CardWrapper>
                  <h3 className="results-title" style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: 'var(--text-primary)',
                  }}>
                    Monthly
                  </h3>
                  <div className="results-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                  }}>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Revenue
                      </span>
                      <span className="result-value" id="monthly-revenue" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Cost
                      </span>
                      <span className="result-value" id="monthly-cost" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item highlight" style={{
                      gridColumn: '1 / -1',
                      padding: '12px',
                      background: 'rgba(167, 251, 144, 0.1)',
                      borderRadius: 'var(--radius-lg)',
                    }}>
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Profit
                      </span>
                      <span className="result-value" id="monthly-profit" style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: '#A7FB90',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Margin
                      </span>
                      <span className="result-value" id="monthly-margin" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        0%
                      </span>
                    </div>
                  </div>
                </CardWrapper>

                {/* Résultats annuels */}
                <CardWrapper>
                  <h3 className="results-title" style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 700,
                    marginBottom: '16px',
                    color: 'var(--text-primary)',
                  }}>
                    Yearly
                  </h3>
                  <div className="results-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                  }}>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Revenue
                      </span>
                      <span className="result-value" id="yearly-revenue" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Cost
                      </span>
                      <span className="result-value" id="yearly-cost" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item highlight" style={{
                      gridColumn: '1 / -1',
                      padding: '12px',
                      background: 'rgba(167, 251, 144, 0.1)',
                      borderRadius: 'var(--radius-lg)',
                    }}>
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Profit
                      </span>
                      <span className="result-value" id="yearly-profit" style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: '#A7FB90',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginBottom: '8px',
                      }}>
                        Margin
                      </span>
                      <span className="result-value" id="yearly-margin" style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                      }}>
                        0%
                      </span>
                    </div>
                  </div>
                </CardWrapper>

                {/* ROI Break-even */}
                <CardWrapper>
                  <div id="roi-card" style={{ display: 'none' }}>
                    <h3 className="results-title" style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 700,
                      marginBottom: '16px',
                      color: 'var(--text-primary)',
                    }}>
                      ROI & Break-even
                    </h3>
                    <div className="results-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px',
                    }}>
                      <div className="result-item">
                        <span className="result-label" style={{
                          display: 'block',
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          marginBottom: '8px',
                        }}>
                          Break-even
                        </span>
                        <span className="result-value" id="break-even-days" style={{
                          fontSize: 'var(--text-lg)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}>
                          --
                        </span>
                      </div>
                      <div className="result-item">
                        <span className="result-label" style={{
                          display: 'block',
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          marginBottom: '8px',
                        }}>
                          ROI (1 year)
                        </span>
                        <span className="result-value" id="roi-1year" style={{
                          fontSize: 'var(--text-lg)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}>
                          --
                        </span>
                      </div>
                      <div className="result-item">
                        <span className="result-label" style={{
                          display: 'block',
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          marginBottom: '8px',
                        }}>
                          ROI (2 years)
                        </span>
                        <span className="result-value" id="roi-2years" style={{
                          fontSize: 'var(--text-lg)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}>
                          --
                        </span>
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>
            </div>
          </section>

          {/* Graphique projection 12 mois - Style PROJECTIONS */}
          <section className="chart-section" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="chart-container" style={{
              background: '#1A1A1A',
              border: '1px solid rgba(167, 251, 144, 0.15)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
            }}>
              <SectionTitle level={2}>12-Month Projection</SectionTitle>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                minHeight: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <canvas id="projection-chart"></canvas>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Charger le script calculator.js */}
      <Script
        src="/js/calculator.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Le script s'initialise automatiquement via DOMContentLoaded
          // Mais si le DOM est déjà chargé, on peut forcer l'initialisation
          if (typeof window !== 'undefined' && (window as any).initCalculator) {
            (window as any).initCalculator()
          }
        }}
      />
    </>
  )
}
