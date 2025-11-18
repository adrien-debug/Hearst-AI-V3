// Cockpit Sections - Mining Operations Platform
// Toutes les sections du cockpit avec design system HEARST (#8afd81)

import { Icons } from '../icons.js';

// Render cockpit section content
export function renderCockpitSection(sectionId) {
    const sections = {
        'dashboard': renderDashboardSection,
        'production': renderProductionSection,
        'energy': renderEnergySection,
        'incidents': renderIncidentsSection,
        'clients': renderClientsSection,
        'mining-accounts': renderMiningAccountsSection,
        'workers': renderWorkersSection,
        'miners': renderMinersSection,
        'reports': renderReportsSection,
        'hosters': renderHostersSection
    };
    
    const renderer = sections[sectionId];
    if (renderer) {
        return renderer();
    }
    
    return `<div class="cockpit-section-placeholder">
        <p>Section ${sectionId} - En cours de développement...</p>
    </div>`;
}

// Dashboard Section - Real-time operations overview
function renderDashboardSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Operations Dashboard</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Real-time mining operations overview</p>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; background: rgba(138, 253, 129, 0.1); border: 1px solid #8afd81; border-radius: 20px;">
                        <div style="width: 8px; height: 8px; background: #8afd81; border-radius: 50%; animation: pulse 2s infinite;"></div>
                        <span style="font-size: 12px; color: #8afd81; font-weight: 700;">LIVE</span>
                    </div>
                </div>
            </div>
            
            <!-- Key Metrics Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px;">
                ${renderMetricCard('Total Hashrate', '1,245 TH/s', '#8afd81', Icons.hashrate)}
                ${renderMetricCard('Active Miners', '342', '#8afd81', Icons.miners)}
                ${renderMetricCard('Power Consumption', '2.8 MW', '#8afd81', Icons.energy)}
                ${renderMetricCard('Daily Revenue', '$12,450', '#8afd81', Icons.profit)}
                ${renderMetricCard('Uptime', '99.2%', '#8afd81', Icons.clock)}
                ${renderMetricCard('Active Workers', '1,245', '#8afd81', Icons.workers)}
            </div>
            
            <!-- Recent Activity -->
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 700; color: #E0E0E0; margin-bottom: 20px;">Recent Activity</h3>
                <div style="display: grid; gap: 12px;">
                    ${renderActivityItem('Miner #342', 'Started mining', '2 minutes ago', 'success')}
                    ${renderActivityItem('Worker Pool #5', 'Hashrate increased by 15%', '15 minutes ago', 'info')}
                    ${renderActivityItem('Energy Alert', 'Power consumption above threshold', '1 hour ago', 'warning')}
                    ${renderActivityItem('Maintenance', 'Scheduled maintenance completed', '3 hours ago', 'success')}
                </div>
            </div>
            
            <!-- Status Overview -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #E0E0E0; margin-bottom: 16px;">System Status</h4>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #888; font-size: 14px;">All Systems</span>
                            <span style="color: #8afd81; font-weight: 600; font-size: 14px;">Operational</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #888; font-size: 14px;">Cooling</span>
                            <span style="color: #8afd81; font-weight: 600; font-size: 14px;">Normal</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #888; font-size: 14px;">Network</span>
                            <span style="color: #8afd81; font-weight: 600; font-size: 14px;">Connected</span>
                        </div>
                    </div>
                </div>
                
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #E0E0E0; margin-bottom: 16px;">Performance</h4>
                    <div style="display: grid; gap: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #888; font-size: 14px;">Efficiency</span>
                            <span style="color: #8afd81; font-weight: 600; font-size: 14px;">94.2%</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #888; font-size: 14px;">Avg Temp</span>
                            <span style="color: #8afd81; font-weight: 600; font-size: 14px;">42°C</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #888; font-size: 14px;">Pool Connection</span>
                            <span style="color: #8afd81; font-weight: 600; font-size: 14px;">Stable</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderMetricCard(label, value, color, icon) {
    return `
        <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px; transition: all 0.3s;" onmouseover="this.style.borderColor='${color}'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#2a2a2a'; this.style.transform='translateY(0)'">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; background: rgba(138, 253, 129, 0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(138, 253, 129, 0.3);">
                    <span class="icon-inline" style="color: ${color};">${icon}</span>
                </div>
                <span style="font-size: 13px; color: #888; font-weight: 500;">${label}</span>
            </div>
            <div style="font-size: 32px; font-weight: 700; color: ${color};">${value}</div>
        </div>
    `;
}

function renderActivityItem(title, description, time, type) {
    const colors = {
        success: '#8afd81',
        warning: '#ffa500',
        error: '#ff4444',
        info: '#4da6ff'
    };
    const color = colors[type] || colors.info;
    
    return `
        <div style="display: flex; gap: 12px; padding: 12px; background: rgba(138, 253, 129, 0.05); border-left: 3px solid ${color}; border-radius: 8px;">
            <div style="flex: 1;">
                <div style="font-size: 14px; font-weight: 600; color: #E0E0E0; margin-bottom: 4px;">${title}</div>
                <div style="font-size: 12px; color: #888;">${description}</div>
            </div>
            <div style="font-size: 11px; color: #666; white-space: nowrap;">${time}</div>
        </div>
    `;
}

// Production Section - Mining production metrics
function renderProductionSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Production Metrics</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Mining production and performance data</p>
                </div>
            </div>
            
            <!-- Production Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 32px;">
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">Blocks Found (24h)</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">12</div>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">BTC Mined (24h)</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">37.5</div>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">Avg Hashrate</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">1,245 TH/s</div>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">Share Efficiency</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">98.5%</div>
                </div>
            </div>
            
            <!-- Production Table -->
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <h3 style="font-size: 18px; font-weight: 700; color: #E0E0E0; margin-bottom: 20px;">Recent Production</h3>
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Block Height</th>
                                <th>Reward</th>
                                <th>Hashrate</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2 hours ago</td>
                                <td>#892,145</td>
                                <td style="color: #8afd81; font-weight: 600;">3.125 BTC</td>
                                <td>1,248 TH/s</td>
                                <td><span style="color: #8afd81;">Confirmed</span></td>
                            </tr>
                            <tr>
                                <td>5 hours ago</td>
                                <td>#892,144</td>
                                <td style="color: #8afd81; font-weight: 600;">3.125 BTC</td>
                                <td>1,242 TH/s</td>
                                <td><span style="color: #8afd81;">Confirmed</span></td>
                            </tr>
                            <tr>
                                <td>8 hours ago</td>
                                <td>#892,143</td>
                                <td style="color: #8afd81; font-weight: 600;">3.125 BTC</td>
                                <td>1,251 TH/s</td>
                                <td><span style="color: #8afd81;">Confirmed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Energy Section - Energy consumption and efficiency
function renderEnergySection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Energy Management</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Energy consumption and efficiency monitoring</p>
                </div>
            </div>
            
            <!-- Energy Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 32px;">
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">Total Power</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">2.8 MW</div>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">Cost per kWh</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">$0.045</div>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">Daily Cost</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">$3,024</div>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <div style="font-size: 13px; color: #888; margin-bottom: 8px;">PUE</div>
                    <div style="font-size: 36px; font-weight: 700; color: #8afd81;">1.15</div>
                </div>
            </div>
            
            <!-- Energy Sources -->
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <h3 style="font-size: 18px; font-weight: 700; color: #E0E0E0; margin-bottom: 20px;">Energy Sources</h3>
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Source</th>
                                <th>Capacity</th>
                                <th>Usage</th>
                                <th>Percentage</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Grid Power</td>
                                <td>3.0 MW</td>
                                <td>2.1 MW</td>
                                <td>70%</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Solar</td>
                                <td>1.5 MW</td>
                                <td>0.5 MW</td>
                                <td>33%</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Wind</td>
                                <td>0.8 MW</td>
                                <td>0.2 MW</td>
                                <td>25%</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Incidents Section - System incidents and alerts
function renderIncidentsSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Incidents & Alerts</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">System incidents and alerts monitoring</p>
                </div>
            </div>
            
            <!-- Active Incidents -->
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                <h3 style="font-size: 18px; font-weight: 700; color: #E0E0E0; margin-bottom: 20px;">Active Incidents</h3>
                <div style="display: grid; gap: 16px;">
                    <div style="padding: 16px; background: rgba(255, 165, 0, 0.1); border-left: 4px solid #ffa500; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                            <div>
                                <div style="font-size: 16px; font-weight: 600; color: #E0E0E0; margin-bottom: 4px;">High Temperature Alert</div>
                                <div style="font-size: 13px; color: #888;">Miner #342 - Temperature above threshold</div>
                            </div>
                            <span style="padding: 4px 12px; background: rgba(255, 165, 0, 0.2); border: 1px solid #ffa500; border-radius: 12px; font-size: 11px; color: #ffa500; font-weight: 600;">WARNING</span>
                        </div>
                        <div style="font-size: 12px; color: #666;">2 hours ago</div>
                    </div>
                </div>
            </div>
            
            <!-- Recent Incidents -->
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <h3 style="font-size: 18px; font-weight: 700; color: #E0E0E0; margin-bottom: 20px;">Recent Incidents</h3>
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Severity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2 hours ago</td>
                                <td>Temperature</td>
                                <td>Miner #342 - High temperature</td>
                                <td><span style="color: #ffa500;">Warning</span></td>
                                <td><span style="color: #8afd81;">Resolved</span></td>
                            </tr>
                            <tr>
                                <td>1 day ago</td>
                                <td>Network</td>
                                <td>Connection timeout - Pool #2</td>
                                <td><span style="color: #ffa500;">Warning</span></td>
                                <td><span style="color: #8afd81;">Resolved</span></td>
                            </tr>
                            <tr>
                                <td>3 days ago</td>
                                <td>Power</td>
                                <td>Power fluctuation detected</td>
                                <td><span style="color: #ff4444;">Critical</span></td>
                                <td><span style="color: #8afd81;">Resolved</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Clients Section - Client management
function renderClientsSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Clients</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Client management and monitoring</p>
                </div>
                <button class="btn btn-primary">+ Add Client</button>
            </div>
            
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Hashrate</th>
                                <th>Miners</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Client A</td>
                                <td>450 TH/s</td>
                                <td>125</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary">View</button>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Client B</td>
                                <td>320 TH/s</td>
                                <td>88</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary">View</button>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Client C</td>
                                <td>475 TH/s</td>
                                <td>129</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                                <td>
                                    <button class="btn btn-sm btn-secondary">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Mining Accounts Section
function renderMiningAccountsSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Mining Accounts</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Mining account management</p>
                </div>
                <button class="btn btn-primary">+ Add Account</button>
            </div>
            
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Account Name</th>
                                <th>Pool</th>
                                <th>Hashrate</th>
                                <th>Workers</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Account 1</td>
                                <td>Foundry USA</td>
                                <td>1,245 TH/s</td>
                                <td>1,245</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Account 2</td>
                                <td>Antpool</td>
                                <td>850 TH/s</td>
                                <td>850</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Workers Section
function renderWorkersSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Workers</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Worker management and monitoring</p>
                </div>
            </div>
            
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Worker ID</th>
                                <th>Hashrate</th>
                                <th>Status</th>
                                <th>Last Share</th>
                                <th>Uptime</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">worker-001</td>
                                <td>1.0 TH/s</td>
                                <td><span style="color: #8afd81;">Online</span></td>
                                <td>2 min ago</td>
                                <td>99.8%</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">worker-002</td>
                                <td>1.0 TH/s</td>
                                <td><span style="color: #8afd81;">Online</span></td>
                                <td>1 min ago</td>
                                <td>99.9%</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">worker-003</td>
                                <td>0.8 TH/s</td>
                                <td><span style="color: #ffa500;">Warning</span></td>
                                <td>15 min ago</td>
                                <td>95.2%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Miners Section
function renderMinersSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Miners</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Miner hardware management</p>
                </div>
            </div>
            
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Miner ID</th>
                                <th>Model</th>
                                <th>Hashrate</th>
                                <th>Temperature</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">#342</td>
                                <td>Antminer S21</td>
                                <td>234 TH/s</td>
                                <td>42°C</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">#341</td>
                                <td>Antminer S21</td>
                                <td>234 TH/s</td>
                                <td>41°C</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">#340</td>
                                <td>Antminer S21</td>
                                <td>234 TH/s</td>
                                <td>45°C</td>
                                <td><span style="color: #ffa500;">Warning</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Reports Section
function renderReportsSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Reports</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">System reports and analytics</p>
                </div>
                <button class="btn btn-primary">Generate Report</button>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #E0E0E0; margin-bottom: 12px;">Daily Report</h4>
                    <p style="font-size: 13px; color: #888; margin-bottom: 16px;">Daily mining operations summary</p>
                    <button class="btn btn-sm btn-secondary">View</button>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #E0E0E0; margin-bottom: 12px;">Weekly Report</h4>
                    <p style="font-size: 13px; color: #888; margin-bottom: 16px;">Weekly performance analysis</p>
                    <button class="btn btn-sm btn-secondary">View</button>
                </div>
                <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                    <h4 style="font-size: 16px; font-weight: 600; color: #E0E0E0; margin-bottom: 12px;">Monthly Report</h4>
                    <p style="font-size: 13px; color: #888; margin-bottom: 16px;">Monthly financial summary</p>
                    <button class="btn btn-sm btn-secondary">View</button>
                </div>
            </div>
        </div>
    `;
}

// Hosters Section
function renderHostersSection() {
    return `
        <div class="section-premium" style="padding: 32px; max-width: 1600px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                <div>
                    <h2 style="font-size: 24px; font-weight: 700; color: #E0E0E0; margin-bottom: 8px;">Hosters</h2>
                    <p style="font-size: 14px; color: #888; font-weight: 500;">Hosting provider management</p>
                </div>
                <button class="btn btn-primary">+ Add Hoster</button>
            </div>
            
            <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 16px; padding: 24px;">
                <div class="table-container">
                    <table class="table-premium">
                        <thead>
                            <tr>
                                <th>Hoster Name</th>
                                <th>Location</th>
                                <th>Capacity</th>
                                <th>Miners</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Hoster A</td>
                                <td>Texas, USA</td>
                                <td>5 MW</td>
                                <td>342</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; color: #E0E0E0;">Hoster B</td>
                                <td>Kazakhstan</td>
                                <td>3 MW</td>
                                <td>205</td>
                                <td><span style="color: #8afd81;">Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Initialization functions
export function initDashboard() {
    console.log('Dashboard initialized');
}

export function initProduction() {
    console.log('Production initialized');
}

export function initEnergy() {
    console.log('Energy initialized');
}

export function initIncidents() {
    console.log('Incidents initialized');
}

export function initClients() {
    console.log('Clients initialized');
}

export function initMiningAccounts() {
    console.log('Mining Accounts initialized');
}

export function initWorkers() {
    console.log('Workers initialized');
}

export function initMiners() {
    console.log('Miners initialized');
}

export function initReports() {
    console.log('Reports initialized');
}

export function initHosters() {
    console.log('Hosters initialized');
}
