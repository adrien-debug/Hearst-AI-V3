// Cockpit Mining Operations View - HEARST STYLE
import { Icons } from '../icons.js';

export async function renderCockpitView() {
    return `
        <div class="cockpit-view">
            <div class="cockpit-content">
                <!-- Zone de contenu dynamique pour chaque section -->
                <div id="cockpit-sections-container">
                    <!-- Le contenu sera injecté dynamiquement -->
                </div>
            </div>
        </div>
    `;
}

// Section titles mapping
export const cockpitSectionTitles = {
    dashboard: { title: 'Dashboard', subtitle: 'Real-time mining operations overview' },
    production: { title: 'Production', subtitle: 'Mining production metrics' },
    energy: { title: 'Energy', subtitle: 'Energy consumption and efficiency' },
    incidents: { title: 'Incidents', subtitle: 'System incidents and alerts' },
    clients: { title: 'Clients', subtitle: 'Client management' },
    'mining-accounts': { title: 'Mining Accounts', subtitle: 'Mining account management' },
    workers: { title: 'Workers', subtitle: 'Worker management' },
    miners: { title: 'Miners', subtitle: 'Miner hardware management' },
    reports: { title: 'Reports', subtitle: 'System reports' },
    hosters: { title: 'Hosters', subtitle: 'Hosting provider management' }
};

export const cockpitStyles = `
    <style>
        /* Cockpit View Styles - HEARST Design System */
        /* Note: Les styles de navigation sont dans cockpit.css */
        /* Harmonisé avec Dashboard - DASHBOARD REFERENCE */

        .cockpit-view {
            padding: var(--space-6);  /* ✅ Match Dashboard (24px) */
            width: 100%;
            max-width: 100%;
            margin: 0;
        }

        .cockpit-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: var(--space-8);  /* ✅ Match Dashboard (32px) */
        }
    </style>
`;
