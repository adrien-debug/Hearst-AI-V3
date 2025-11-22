'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import KpiBox from '@/components/ui/KpiBox'
import CardWrapper from '@/components/ui/CardWrapper'
import SectionTitle from '@/components/ui/SectionTitle'

export default function CalculatorPage() {
  useEffect(() => {
    // Charger le CSS du calculator
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/css/calculator.css'
    document.head.appendChild(link)

    return () => {
      // Nettoyer le CSS lors du démontage
      const existingLink = document.querySelector('link[href="/css/calculator.css"]')
      if (existingLink) {
        document.head.removeChild(existingLink)
      }
    }
  }, [])

  return (
    <>
      {/* Animation pulse pour le live dot */}
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
      `}</style>
      
      <div className="dashboard-view">
        <div className="dashboard-content">
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <SectionTitle level={1}>Mining Profitability Calculator</SectionTitle>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
              paddingBottom: 'var(--space-4)',
              borderBottom: '1px solid var(--border)',
            }}>
              <div className="live-badge" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                background: 'rgba(165, 255, 156, 0.1)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--hearst-green)',
              }}>
                <span className="live-dot" style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--hearst-green)',
                  animation: 'pulse 2s infinite',
                }}></span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--hearst-green)' }}>LIVE</span>
              </div>
            </div>
          </div>

          {/* Métriques temps réel - Style HOME */}
          <section className="premium-stats-section" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="premium-stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
              width: '100%',
            }}>
              <KpiBox
                label="BTC Price"
                value={<><span id="btc-price">$0</span><span id="btc-change" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginLeft: 'var(--space-2)' }}>--</span></>}
                description="Real-time price"
              />
              <KpiBox
                label="Network Hashrate"
                value={<span id="network-hashrate">0 EH/s</span>}
                description="Real-time"
              />
              <KpiBox
                label="Hashprice (TH)"
                value={<span id="hashprice-th">$0</span>}
                description="per TH/day"
              />
              <KpiBox
                label="Hashprice (PH)"
                value={<span id="hashprice-ph">$0</span>}
                description="per PH/day"
              />
            </div>
          </section>

          {/* Formulaire de calcul - Style HOME */}
          <section className="calculator-section" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="calculator-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: 'var(--space-6)',
              alignItems: 'start',
            }}>
              {/* Colonne gauche : Formulaire */}
              <CardWrapper>
                <SectionTitle level={2}>Mining Parameters</SectionTitle>
                
                <div className="calculator-form" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="miner-type" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
                  }}>
                    Mining Machine
                  </label>
                  <select
                    id="miner-type"
                    className="form-select"
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      transition: 'all var(--duration-fast) var(--ease-in-out)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--hearst-green)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165, 255, 156, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
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
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}>
                    Select your mining machine model
                  </span>
                </div>

                <div className="form-group" id="hashrate-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="hashrate" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
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
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      transition: 'all var(--duration-fast) var(--ease-in-out)',
                    }}
                  />
                  <span className="input-hint" style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}>
                    Automatically filled based on machine selection
                  </span>
                </div>

                <div className="form-group" id="power-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="power" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
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
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      transition: 'all var(--duration-fast) var(--ease-in-out)',
                    }}
                  />
                  <span className="input-hint" style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
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
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                    }}
                  />
                  <span className="input-hint" style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}>
                    Number of machines
                  </span>
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="electricity" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
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
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      transition: 'all var(--duration-fast) var(--ease-in-out)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--hearst-green)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165, 255, 156, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span className="input-hint" style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}>
                    Cost per kilowatt-hour
                  </span>
                </div>

                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <label htmlFor="equipment-cost" style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
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
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--text-sm)',
                      transition: 'all var(--duration-fast) var(--ease-in-out)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--hearst-green)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(165, 255, 156, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  <span className="input-hint" style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}>
                    Optional: for ROI calculation
                  </span>
                </div>

                <button
                  className="btn-calculate"
                  id="btn-calculate"
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--hearst-green)',
                    color: '#000',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast) var(--ease-in-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#B0FF8F'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(165, 255, 156, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--hearst-green)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  Calculate
                </button>
                </div>
              </CardWrapper>

              {/* Colonne droite : Résultats - Style HOME */}
              <div className="calculator-results">
                <SectionTitle level={2}>Results</SectionTitle>
                
                {/* Résultats quotidiens */}
                <CardWrapper>
                  <h3 className="results-title" style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
                  }}>
                    Daily
                  </h3>
                  <div className="results-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 'var(--space-2)',
                  }}>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                      padding: 'var(--space-2)',
                      background: 'rgba(165, 255, 156, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
                      }}>
                        Profit
                      </span>
                      <span className="result-value" id="daily-profit" style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: 'var(--hearst-green)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
                  }}>
                    Monthly
                  </h3>
                  <div className="results-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 'var(--space-2)',
                  }}>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                      padding: 'var(--space-2)',
                      background: 'rgba(165, 255, 156, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
                      }}>
                        Profit
                      </span>
                      <span className="result-value" id="monthly-profit" style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: 'var(--hearst-green)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--text-primary)',
                  }}>
                    Yearly
                  </h3>
                  <div className="results-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 'var(--space-2)',
                  }}>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                      padding: 'var(--space-2)',
                      background: 'rgba(165, 255, 156, 0.1)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
                      }}>
                        Profit
                      </span>
                      <span className="result-value" id="yearly-profit" style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 700,
                        color: 'var(--hearst-green)',
                      }}>
                        $0.00
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label" style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-1)',
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
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      marginBottom: 'var(--space-2)',
                      color: 'var(--text-primary)',
                    }}>
                      ROI & Break-even
                    </h3>
                    <div className="results-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 'var(--space-2)',
                    }}>
                      <div className="result-item">
                        <span className="result-label" style={{
                          display: 'block',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          marginBottom: 'var(--space-1)',
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
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          marginBottom: 'var(--space-1)',
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
                          fontSize: 'var(--text-xs)',
                          color: 'var(--text-secondary)',
                          marginBottom: 'var(--space-1)',
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

          {/* Graphique projection 12 mois - Style HOME */}
          <section className="chart-section" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="wallet-chart-section" style={{
              width: '100%',
              minHeight: '320px',
              background: 'rgba(26, 26, 26, 0.7)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.4),
                0 2px 8px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <SectionTitle level={2}>12-Month Projection</SectionTitle>
              <div className="chart-container" style={{
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
