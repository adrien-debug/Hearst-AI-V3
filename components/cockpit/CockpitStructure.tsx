'use client'

import './Cockpit.css'

export default function CockpitStructure() {
  return (
    <div>
      <div className="cockpit-card">
        <div className="cockpit-card-header">
          <h3 className="cockpit-card-title">Organizational Structure</h3>
        </div>
        <div className="cockpit-card-body">
          <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="kpi-card">
              <div className="kpi-label">Teams</div>
              <div className="kpi-description">Manage organizational teams and hierarchy</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Departments</div>
              <div className="kpi-description">Department structure and assignments</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Roles</div>
              <div className="kpi-description">Role definitions and permissions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
