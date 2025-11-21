'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminLogs() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'monospace',
            fontSize: 'var(--text-sm)',
            maxHeight: '500px',
            overflowY: 'auto',
          }}>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <div style={{ color: 'var(--hearst-green)' }}>[INFO]</div> System initialized
              <br />
              <div style={{ color: 'var(--hearst-green)' }}>[INFO]</div> Database connected
              <br />
              <div style={{ color: 'var(--hearst-green)' }}>[INFO]</div> API routes loaded
              <br />
              <div style={{ color: 'var(--hearst-green)' }}>[INFO]</div> Next.js server started
              <br />
              <div style={{ color: 'var(--hearst-green)' }}>[INFO]</div> Authentication configured
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

