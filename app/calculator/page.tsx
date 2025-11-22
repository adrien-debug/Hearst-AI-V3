'use client'

import { useEffect } from 'react'
import Script from 'next/script'

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
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      
      <div className="dashboard-view">
        <div className="dashboard-content">
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              Mining Profitability Calculator
            </h1>
            
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

          {/* Métriques temps réel */}
          <section className="metrics-section" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="metrics-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
            }}>
              <div className="metric-card" style={{
                padding: 'var(--space-4)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}>
                <div className="metric-label" style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                }}>
                  BTC Price
                </div>
                <div className="metric-value" id="btc-price" style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-1)',
                }}>
                  $0
                </div>
                <div className="metric-change" id="btc-change" style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}>
                  --
                </div>
              </div>
              <div className="metric-card" style={{
                padding: 'var(--space-4)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}>
                <div className="metric-label" style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Network Hashrate
                </div>
                <div className="metric-value" id="network-hashrate" style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-1)',
                }}>
                  0 EH/s
                </div>
                <div className="metric-subtitle" style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}>
                  Real-time
                </div>
              </div>
              <div className="metric-card" style={{
                padding: 'var(--space-4)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}>
                <div className="metric-label" style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Hashprice (TH)
                </div>
                <div className="metric-value" id="hashprice-th" style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-1)',
                }}>
                  $0
                </div>
                <div className="metric-subtitle" style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}>
                  per TH/day
                </div>
              </div>
              <div className="metric-card" style={{
                padding: 'var(--space-4)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
              }}>
                <div className="metric-label" style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-2)',
                }}>
                  Hashprice (PH)
                </div>
                <div className="metric-value" id="hashprice-ph" style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-1)',
                }}>
                  $0
                </div>
                <div className="metric-subtitle" style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}>
                  per PH/day
                </div>
              </div>
            </div>
          </section>

          {/* Formulaire de calcul */}
          <section className="calculator-section" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="calculator-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: 'var(--space-6)',
              alignItems: 'start',
            }}>
              {/* Colonne gauche : Formulaire */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h2 className="section-title" style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  marginBottom: 'var(--space-4)',
                  color: 'var(--text-primary)',
                }}>
                  Mining Parameters
                </h2>
                
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
                >
                  Calculate
                </button>
                </div>
              </div>

              {/* Colonne droite : Résultats */}
              <div className="calculator-results">
                <h2 className="section-title" style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  marginBottom: 'var(--space-4)',
                  color: 'var(--text-primary)',
                }}>
                  Results
                </h2>
                
                {/* Résultats quotidiens */}
                <div className="results-card" style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  marginBottom: 'var(--space-2)',
                }}>
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
                </div>

                {/* Résultats mensuels */}
                <div className="results-card" style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  marginBottom: 'var(--space-2)',
                }}>
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
                </div>

                {/* Résultats annuels */}
                <div className="results-card" style={{
                  padding: 'var(--space-3)',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  marginBottom: 'var(--space-2)',
                }}>
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
                </div>

                {/* ROI Break-even */}
                <div className="results-card" id="roi-card" style={{
                  display: 'none',
                  padding: 'var(--space-4)',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                }}>
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
              </div>
            </div>
          </section>

          {/* Graphique projection 12 mois */}
          <section className="chart-section">
            <div className="chart-container" style={{
              padding: 'var(--space-4)',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
            }}>
              <h2 className="section-title" style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                marginBottom: 'var(--space-4)',
                color: 'var(--text-primary)',
              }}>
                12-Month Projection
              </h2>
              <canvas id="projection-chart"></canvas>
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
