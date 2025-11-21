'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminUsers() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>User Management</h2>
        <Button>+ Add User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Admin User</td>
                  <td>admin@hearst.ai</td>
                  <td>Admin</td>
                  <td><span style={{ color: 'var(--hearst-green)' }}>Active</span></td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>
                    <Button variant="outline" style={{ padding: 'var(--space-1) var(--space-2)', fontSize: 'var(--text-xs)' }}>Edit</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

