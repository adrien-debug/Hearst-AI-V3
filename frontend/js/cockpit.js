// Cockpit Management - Mining Operations Platform
// Gère la navigation entre les différentes sections du cockpit

// Show cockpit section
export function showCockpitSection(sectionId) {
    const container = document.getElementById('cockpit-sections-container');
    
    if (!container) {
        console.error('Cockpit container not found');
        return;
    }
    
    // Importer dynamiquement la vue des sections
    import('./views/cockpit-sections.js').then(module => {
        // Render section content
        const content = module.renderCockpitSection(sectionId);
        container.innerHTML = content;
        
        // Initialize section-specific functionality
        setTimeout(() => {
            if (sectionId === 'dashboard' && module.initDashboard) {
                module.initDashboard();
            } else if (sectionId === 'production' && module.initProduction) {
                module.initProduction();
            } else if (sectionId === 'energy' && module.initEnergy) {
                module.initEnergy();
            } else if (sectionId === 'incidents' && module.initIncidents) {
                module.initIncidents();
            } else if (sectionId === 'clients' && module.initClients) {
                module.initClients();
            } else if (sectionId === 'mining-accounts' && module.initMiningAccounts) {
                module.initMiningAccounts();
            } else if (sectionId === 'workers' && module.initWorkers) {
                module.initWorkers();
            } else if (sectionId === 'miners' && module.initMiners) {
                module.initMiners();
            } else if (sectionId === 'reports' && module.initReports) {
                module.initReports();
            } else if (sectionId === 'hosters' && module.initHosters) {
                module.initHosters();
            }
        }, 200);
    }).catch(error => {
        console.error('Error loading cockpit section:', error);
        container.innerHTML = `<div class="cockpit-section-placeholder">
            <p>Erreur lors du chargement de la section ${sectionId}</p>
        </div>`;
    });
    
    // Update navigation tabs in header
    const navTabs = document.querySelectorAll('.cockpit-nav-tab[data-cockpit-section]');
    navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-cockpit-section') === sectionId) {
            tab.classList.add('active');
        }
    });
}

// Update cockpit clock
function updateCockpitClock() {
    const clockElement = document.getElementById('cockpitClock');
    if (clockElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Initialize cockpit functionality
export function initCockpit() {
    console.log('🎯 Initializing Cockpit Mining Operations Platform...');
    
    // Exposer la fonction globalement
    window.showCockpitSection = showCockpitSection;
    
    // Set default section
    const defaultSection = 'dashboard';
    showCockpitSection(defaultSection);
    
    // Start clock update
    updateCockpitClock();
    setInterval(updateCockpitClock, 1000);
}
