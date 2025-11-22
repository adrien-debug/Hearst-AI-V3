'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CockpitDataMapping() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Data Mapping & Flow Architecture
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Hearst Platform API Integration & Data Flow Visualization
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="outline">Export Documentation</Button>
          <Button variant="outline">Refresh Status</Button>
        </div>
      </div>

      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <CardTitle>API Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ padding: 'var(--space-6)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              API Flow Diagram
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
              Visual representation of data flow between Hearst Platform APIs and operations endpoints.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--hearst-green)' }}>
                  Customer Operations
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginLeft: 'var(--space-4)' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /customers
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /customers/&#123;id&#125;
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    POST /customers
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    PUT /customers/&#123;id&#125;
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--hearst-green)' }}>
                  Supplier Operations
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginLeft: 'var(--space-4)' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /suppliers
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /suppliers/&#123;id&#125;
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--hearst-green)' }}>
                  Hosting Providers
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginLeft: 'var(--space-4)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>↕</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Cross-Reference</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--hearst-green)' }}>
                  Cross-Reference
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginLeft: 'var(--space-4)' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /cross-reference/matrix
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /cross-reference/contracts
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-3)', color: 'var(--hearst-green)' }}>
                  Data Sync
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginLeft: 'var(--space-4)' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /sync/status
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    POST /sync/trigger
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    GET /sync/history
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 'var(--space-6)',
                padding: 'var(--space-4)',
                background: 'rgba(165, 255, 156, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(165, 255, 156, 0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(165, 255, 156, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 700,
                    color: 'var(--hearst-green)',
                  }}
                >
                  H
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Hearst Platform</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    Base URL: /api/mining-operations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <CardHeader>
          <CardTitle>Data Sources Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                🏢 Hearst Platform
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                <strong>Role:</strong> Central API Gateway<br />
                <strong>Type:</strong> RESTful API<br />
                <strong>Base URL:</strong> /api/mining-operations
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <strong>Functions:</strong><br />
                • Authentication & Authorization<br />
                • Request routing<br />
                • Data aggregation<br />
                • Real-time monitoring
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                👥 Customer Database
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                <strong>Tables:</strong><br />
                • customers<br />
                • contracts<br />
                • accounts<br />
                • payments
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <strong>Key Fields:</strong><br />
                • customer_id (PK)<br />
                • account_name<br />
                • contract_start_date<br />
                • total_hashrate<br />
                • monthly_revenue
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                🏭 Supplier Database
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                <strong>Tables:</strong><br />
                • suppliers (hosting providers)<br />
                • facilities<br />
                • capacity<br />
                • sla_metrics
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <strong>Key Fields:</strong><br />
                • supplier_id (PK)<br />
                • provider_name<br />
                • location<br />
                • total_capacity<br />
                • uptime_sla
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                🔗 Data Relationships
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <strong>customers ↔ suppliers</strong><br />
                Many-to-many via contracts table<br />
                customer_id, supplier_id, contract_id<br />
                <br />
                <strong>contracts ↔ facilities</strong><br />
                One-to-one mapping per contract<br />
                contract_id, facility_id<br />
                <br />
                <strong>accounts ↔ customers</strong><br />
                One-to-many (customer has multiple accounts)<br />
                customer_id, account_id<br />
                <br />
                <strong>suppliers ↔ capacity</strong><br />
                One-to-many (supplier has multiple capacity tiers)<br />
                supplier_id, capacity_id
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Sync Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                Customer Data
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <div><strong>Status:</strong> <span style={{ color: 'var(--hearst-green)' }}>Synced</span></div>
                <div><strong>Last Sync:</strong> 2 minutes ago</div>
                <div><strong>Records:</strong> 14 customers</div>
                <div><strong>Next Sync:</strong> in 3 min</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                Supplier Data
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <div><strong>Status:</strong> <span style={{ color: 'var(--hearst-green)' }}>Synced</span></div>
                <div><strong>Last Sync:</strong> 5 minutes ago</div>
                <div><strong>Records:</strong> 6 providers</div>
                <div><strong>Next Sync:</strong> in 10 min</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                Cross-Reference
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                <div><strong>Status:</strong> <span style={{ color: 'var(--hearst-green)' }}>Synced</span></div>
                <div><strong>Last Sync:</strong> 1 minute ago</div>
                <div><strong>Contracts:</strong> 42 active</div>
                <div><strong>Next Sync:</strong> in 4 min</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              System Health Metrics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--hearst-green)' }}>100%</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>API Uptime</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--hearst-green)' }}>1,847</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Total Syncs</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--hearst-green)' }}>99.8%</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Success Rate</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--hearst-green)' }}>5 min</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Sync Interval</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--hearst-green)' }}>0</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Failed Syncs</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

