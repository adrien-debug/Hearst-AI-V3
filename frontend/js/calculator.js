// Calculator Page JavaScript
// Fetch API + Calculs profitabilité + Chart.js

// Utiliser l'API Next.js si disponible, sinon backend Express direct
const API_BASE_URL = window.location.origin;
const HASHPRICE_API = '/api/hashprice-lite';

let currentMetrics = null;
let projectionChart = null;

// Database des machines de minage
const MINING_MACHINES = {
    'custom': { hashrate: 0, power: 0, name: 'Custom' },
    's21-200t': { hashrate: 200, power: 3550, name: 'Antminer S21 200TH/s' },
    's21-192t': { hashrate: 192, power: 3510, name: 'Antminer S21 192TH/s' },
    's21-hyd-335t': { hashrate: 335, power: 5364, name: 'Antminer S21 Hydro 335TH/s' },
    's21-hyd-301t': { hashrate: 301, power: 5445, name: 'Antminer S21 Hydro 301TH/s' },
    's19-xp-141t': { hashrate: 141, power: 3010, name: 'Antminer S19 XP 141TH/s' },
    's19-pro-110t': { hashrate: 110, power: 3250, name: 'Antminer S19 Pro 110TH/s' },
    's19-95t': { hashrate: 95, power: 3250, name: 'Antminer S19 95TH/s' },
    's19j-pro-100t': { hashrate: 100, power: 3050, name: 'Antminer S19j Pro 100TH/s' },
    's19j-pro-96t': { hashrate: 96, power: 3050, name: 'Antminer S19j Pro 96TH/s' },
    's19j-pro-104t': { hashrate: 104, power: 3068, name: 'Antminer S19j Pro 104TH/s' },
    'm60-188t': { hashrate: 188, power: 3612, name: 'Whatsminer M60 188TH/s' },
    'm60-186t': { hashrate: 186, power: 3612, name: 'Whatsminer M60 186TH/s' },
    'm56s-184t': { hashrate: 184, power: 3420, name: 'Whatsminer M56S 184TH/s' },
    'm56s-172t': { hashrate: 172, power: 3420, name: 'Whatsminer M56S 172TH/s' },
    'm53s-150t': { hashrate: 150, power: 3420, name: 'Whatsminer M53S 150TH/s' },
    'm50s-126t': { hashrate: 126, power: 3420, name: 'Whatsminer M50S 126TH/s' },
    'm50-118t': { hashrate: 118, power: 3300, name: 'Whatsminer M50 118TH/s' },
    'avalon-1466-150t': { hashrate: 150, power: 3420, name: 'AvalonMiner 1466 150TH/s' },
    'avalon-1466-130t': { hashrate: 130, power: 3420, name: 'AvalonMiner 1466 130TH/s' },
    'avalon-1246-90t': { hashrate: 90, power: 3420, name: 'AvalonMiner 1246 90TH/s' },
    'avalon-1166-81t': { hashrate: 81, power: 3420, name: 'AvalonMiner 1166 81TH/s' },
    'ebit-e12-190t': { hashrate: 190, power: 3500, name: 'Ebit E12+ 190TH/s' },
    'ebit-e12-180t': { hashrate: 180, power: 3500, name: 'Ebit E12+ 180TH/s' },
    'ebit-e12-150t': { hashrate: 150, power: 3500, name: 'Ebit E12+ 150TH/s' }
};

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
});

/**
 * Initialise la calculatrice
 */
async function initCalculator() {
    // Charger les métriques temps réel
    await loadMetrics();
    
    // Mettre à jour les métriques toutes les 30 secondes
    setInterval(loadMetrics, 30000);
    
    // Attacher les event listeners
    document.getElementById('btn-calculate').addEventListener('click', calculateProfitability);
    
    // Gestion du menu de sélection de machine
    const minerTypeSelect = document.getElementById('miner-type');
    minerTypeSelect.addEventListener('change', handleMinerTypeChange);
    
    // Gestion du champ quantity
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', () => {
            const minerType = document.getElementById('miner-type').value;
            if (minerType && minerType !== 'custom') {
                updateMachineValues();
                debounce(calculateProfitability, 500)();
            }
        });
    }
    
    // Calcul automatique lors de la saisie
    const inputs = ['hashrate', 'power', 'electricity', 'equipment-cost'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', debounce(calculateProfitability, 500));
        }
    });
    
    // Initialiser le graphique vide
    initChart();
}

/**
 * Charge les métriques Bitcoin temps réel
 */
async function loadMetrics() {
    try {
        const response = await fetch(HASHPRICE_API);
        const data = await response.json();
        
        currentMetrics = data;
        
        // Mettre à jour l'UI
        updateMetricsUI(data);
        
        // Recalculer si des valeurs sont déjà saisies
        const hashrate = document.getElementById('hashrate').value;
        if (hashrate && parseFloat(hashrate) > 0) {
            calculateProfitability();
        }
    } catch (error) {
        console.error('Erreur chargement métriques:', error);
        // Utiliser des valeurs par défaut
        currentMetrics = {
            btcPrice: 65000,
            networkHashrate: 600000000,
            hashprice: 0.05,
            hashpriceTH: 0.05,
            hashpricePH: 50
        };
        updateMetricsUI(currentMetrics);
    }
}

/**
 * Met à jour l'interface des métriques
 */
function updateMetricsUI(data) {
    // BTC Price
    const btcPriceEl = document.getElementById('btc-price');
    if (btcPriceEl) {
        btcPriceEl.textContent = `$${formatNumber(data.btcPrice)}`;
    }
    
    // Network Hashrate
    const networkHashrateEl = document.getElementById('network-hashrate');
    if (networkHashrateEl) {
        const hashrateEH = data.networkHashrate / 1000000;
        networkHashrateEl.textContent = `${formatNumber(hashrateEH)} EH/s`;
    }
    
    // Hashprice TH
    const hashpriceTHEl = document.getElementById('hashprice-th');
    if (hashpriceTHEl) {
        hashpriceTHEl.textContent = `$${formatNumber(data.hashpriceTH, 4)}`;
    }
    
    // Hashprice PH
    const hashpricePHEl = document.getElementById('hashprice-ph');
    if (hashpricePHEl) {
        hashpricePHEl.textContent = `$${formatNumber(data.hashpricePH, 2)}`;
    }
}

/**
 * Gère le changement de type de machine
 */
function handleMinerTypeChange() {
    const minerTypeSelect = document.getElementById('miner-type');
    const minerType = minerTypeSelect.value;
    const hashrateInput = document.getElementById('hashrate');
    const powerInput = document.getElementById('power');
    const quantityGroup = document.getElementById('quantity-group');
    const hashrateGroup = document.getElementById('hashrate-group');
    const powerGroup = document.getElementById('power-group');
    
    // Ajouter classe pour style visuel
    if (minerType && minerType !== '') {
        minerTypeSelect.classList.add('has-selection');
        // Retirer l'attribut selected de l'option placeholder
        const placeholderOption = minerTypeSelect.querySelector('option[value=""]');
        if (placeholderOption) {
            placeholderOption.removeAttribute('selected');
        }
    } else {
        minerTypeSelect.classList.remove('has-selection');
    }
    
    if (minerType === 'custom') {
        // Mode custom : permettre la saisie manuelle
        hashrateInput.removeAttribute('readonly');
        powerInput.removeAttribute('readonly');
        quantityGroup.style.display = 'none';
        hashrateInput.value = '';
        powerInput.value = '';
        hashrateInput.placeholder = 'Enter hashrate (TH/s)';
        powerInput.placeholder = 'Enter power (W)';
        hashrateInput.classList.remove('auto-filled');
        powerInput.classList.remove('auto-filled');
    } else if (minerType && MINING_MACHINES[minerType]) {
        // Machine sélectionnée : remplir automatiquement
        const machine = MINING_MACHINES[minerType];
        hashrateInput.setAttribute('readonly', 'readonly');
        powerInput.setAttribute('readonly', 'readonly');
        quantityGroup.style.display = 'block';
        hashrateInput.placeholder = `${machine.hashrate} TH/s`;
        powerInput.placeholder = `${machine.power} W`;
        hashrateInput.classList.add('auto-filled');
        powerInput.classList.add('auto-filled');
        
        // Mettre à jour avec la quantité
        updateMachineValues();
    } else {
        // Aucune sélection
        hashrateInput.value = '';
        powerInput.value = '';
        quantityGroup.style.display = 'none';
        hashrateInput.classList.remove('auto-filled');
        powerInput.classList.remove('auto-filled');
    }
    
    // Recalculer si nécessaire
    calculateProfitability();
}

/**
 * Met à jour les valeurs hashrate et power selon la machine et la quantité
 */
function updateMachineValues() {
    const minerType = document.getElementById('miner-type').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    if (minerType && MINING_MACHINES[minerType] && minerType !== 'custom') {
        const machine = MINING_MACHINES[minerType];
        document.getElementById('hashrate').value = (machine.hashrate * quantity).toFixed(2);
        document.getElementById('power').value = machine.power * quantity;
    }
}

/**
 * Calcule la profitabilité
 */
function calculateProfitability() {
    if (!currentMetrics) {
        console.warn('Métriques non disponibles');
        return;
    }
    
    // Mettre à jour les valeurs si une machine est sélectionnée
    const minerType = document.getElementById('miner-type').value;
    if (minerType && minerType !== 'custom') {
        updateMachineValues();
    }
    
    // Récupérer les valeurs du formulaire
    const hashrate = parseFloat(document.getElementById('hashrate').value) || 0;
    const power = parseFloat(document.getElementById('power').value) || 0;
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const equipmentCost = parseFloat(document.getElementById('equipment-cost').value) || 0;
    
    // Vérifier que les valeurs minimales sont présentes
    if (hashrate <= 0 || power <= 0 || electricity <= 0) {
        // Réinitialiser les résultats
        resetResults();
        return;
    }
    
    // Calculer les revenus quotidiens
    const dailyRevenue = hashrate * currentMetrics.hashpriceTH;
    
    // Calculer les coûts quotidiens (électricité)
    const powerKW = power / 1000;
    const dailyElectricityCost = powerKW * 24 * electricity;
    
    // Profit quotidien
    const dailyProfit = dailyRevenue - dailyElectricityCost;
    
    // Résultats mensuels et annuels
    const monthlyRevenue = dailyRevenue * 30;
    const monthlyCost = dailyElectricityCost * 30;
    const monthlyProfit = dailyProfit * 30;
    
    const yearlyRevenue = dailyRevenue * 365;
    const yearlyCost = dailyElectricityCost * 365;
    const yearlyProfit = dailyProfit * 365;
    
    // Marges
    const dailyMargin = dailyRevenue > 0 ? (dailyProfit / dailyRevenue) * 100 : 0;
    const monthlyMargin = monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;
    const yearlyMargin = yearlyRevenue > 0 ? (yearlyProfit / yearlyRevenue) * 100 : 0;
    
    // Afficher les résultats
    updateResults({
        daily: {
            revenue: dailyRevenue,
            cost: dailyElectricityCost,
            profit: dailyProfit,
            margin: dailyMargin
        },
        monthly: {
            revenue: monthlyRevenue,
            cost: monthlyCost,
            profit: monthlyProfit,
            margin: monthlyMargin
        },
        yearly: {
            revenue: yearlyRevenue,
            cost: yearlyCost,
            profit: yearlyProfit,
            margin: yearlyMargin
        }
    });
    
    // Calculer ROI si coût d'équipement fourni
    if (equipmentCost > 0) {
        calculateROI(equipmentCost, dailyProfit);
    } else {
        document.getElementById('roi-card').style.display = 'none';
    }
    
    // Mettre à jour le graphique avec les revenus
    updateChart(dailyProfit, monthlyProfit, yearlyProfit, monthlyRevenue);
}

/**
 * Met à jour l'affichage des résultats
 */
function updateResults(results) {
    // Daily
    document.getElementById('daily-revenue').textContent = formatCurrency(results.daily.revenue);
    document.getElementById('daily-cost').textContent = formatCurrency(results.daily.cost);
    document.getElementById('daily-profit').textContent = formatCurrency(results.daily.profit);
    document.getElementById('daily-margin').textContent = `${results.daily.margin.toFixed(2)}%`;
    
    // Monthly
    document.getElementById('monthly-revenue').textContent = formatCurrency(results.monthly.revenue);
    document.getElementById('monthly-cost').textContent = formatCurrency(results.monthly.cost);
    document.getElementById('monthly-profit').textContent = formatCurrency(results.monthly.profit);
    document.getElementById('monthly-margin').textContent = `${results.monthly.margin.toFixed(2)}%`;
    
    // Yearly
    document.getElementById('yearly-revenue').textContent = formatCurrency(results.yearly.revenue);
    document.getElementById('yearly-cost').textContent = formatCurrency(results.yearly.cost);
    document.getElementById('yearly-profit').textContent = formatCurrency(results.yearly.profit);
    document.getElementById('yearly-margin').textContent = `${results.yearly.margin.toFixed(2)}%`;
}

/**
 * Réinitialise les résultats
 */
function resetResults() {
    const resultIds = [
        'daily-revenue', 'daily-cost', 'daily-profit', 'daily-margin',
        'monthly-revenue', 'monthly-cost', 'monthly-profit', 'monthly-margin',
        'yearly-revenue', 'yearly-cost', 'yearly-profit', 'yearly-margin'
    ];
    
    resultIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id.includes('margin')) {
                el.textContent = '0%';
            } else {
                el.textContent = '$0.00';
            }
        }
    });
    
    document.getElementById('roi-card').style.display = 'none';
}

/**
 * Calcule le ROI et break-even
 */
function calculateROI(equipmentCost, dailyProfit) {
    if (dailyProfit <= 0) {
        document.getElementById('break-even-days').textContent = 'N/A';
        document.getElementById('roi-1year').textContent = 'N/A';
        document.getElementById('roi-2years').textContent = 'N/A';
        document.getElementById('roi-card').style.display = 'block';
        return;
    }
    
    const breakEvenDays = Math.ceil(equipmentCost / dailyProfit);
    const breakEvenMonths = (equipmentCost / dailyProfit / 30).toFixed(1);
    
    const profit1Year = dailyProfit * 365;
    const roi1Year = ((profit1Year - equipmentCost) / equipmentCost) * 100;
    
    const profit2Years = dailyProfit * 730;
    const roi2Years = ((profit2Years - equipmentCost) / equipmentCost) * 100;
    
    document.getElementById('break-even-days').textContent = `${breakEvenDays} days (${breakEvenMonths} months)`;
    document.getElementById('roi-1year').textContent = `${roi1Year.toFixed(2)}%`;
    document.getElementById('roi-2years').textContent = `${roi2Years.toFixed(2)}%`;
    document.getElementById('roi-card').style.display = 'block';
}

/**
 * Initialise le graphique Chart.js - Style HEARST
 */
function initChart() {
    const ctx = document.getElementById('projection-chart');
    if (!ctx) return;
    
    projectionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Cumulative Profit',
                    data: [],
                    borderColor: '#8afd81',
                    backgroundColor: 'rgba(138, 253, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#8afd81',
                    pointBorderColor: '#000000',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#6fdc66',
                    pointHoverBorderColor: '#8afd81',
                    pointHoverBorderWidth: 3
                },
                {
                    label: 'Cumulative Revenue',
                    data: [],
                    borderColor: '#a5ff9c',
                    backgroundColor: 'rgba(165, 255, 156, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#a5ff9c',
                    pointBorderColor: '#000000',
                    pointBorderWidth: 1,
                    pointHoverBackgroundColor: '#8afd81',
                    pointHoverBorderColor: '#a5ff9c'
                },
                {
                    label: 'Monthly Profit',
                    data: [],
                    borderColor: 'rgba(138, 253, 129, 0.5)',
                    backgroundColor: 'rgba(138, 253, 129, 0.05)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: 'rgba(138, 253, 129, 0.5)',
                    pointBorderColor: '#000000',
                    pointBorderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#8afd81',
                        font: {
                            family: 'var(--font-primary)',
                            size: 13,
                            weight: '600'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 12,
                        boxHeight: 12
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1a1a1a',
                    titleColor: '#8afd81',
                    bodyColor: '#ffffff',
                    borderColor: '#8afd81',
                    borderWidth: 1,
                    padding: 12,
                    titleFont: {
                        family: 'var(--font-primary)',
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'var(--font-mono)',
                        size: 13
                    },
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += '$' + formatNumber(context.parsed.y);
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#999999',
                        font: {
                            family: 'var(--font-primary)',
                            size: 12
                        }
                    },
                    grid: {
                        color: '#2a2a2a',
                        drawBorder: false
                    },
                    border: {
                        color: '#2a2a2a'
                    }
                },
                y: {
                    ticks: {
                        color: '#999999',
                        font: {
                            family: 'var(--font-mono)',
                            size: 12
                        },
                        callback: function(value) {
                            return '$' + formatNumber(value);
                        }
                    },
                    grid: {
                        color: '#2a2a2a',
                        drawBorder: false
                    },
                    border: {
                        color: '#2a2a2a'
                    }
                }
            }
        }
    });
}

/**
 * Met à jour le graphique avec projection 12 mois
 */
function updateChart(dailyProfit, monthlyProfit, yearlyProfit, monthlyRevenue) {
    if (!projectionChart) return;
    
    // Récupérer le coût d'équipement si fourni
    const equipmentCost = parseFloat(document.getElementById('equipment-cost').value) || 0;
    
    // Générer les labels pour 12 mois
    const labels = [];
    const cumulativeData = [];
    const cumulativeRevenueData = [];
    const monthlyData = [];
    let cumulativeProfit = equipmentCost ? -equipmentCost : 0;
    let cumulativeRevenue = 0;
    
    for (let month = 1; month <= 12; month++) {
        labels.push(`M${month}`);
        cumulativeProfit += monthlyProfit;
        cumulativeRevenue += monthlyRevenue;
        cumulativeData.push(cumulativeProfit);
        cumulativeRevenueData.push(cumulativeRevenue);
        monthlyData.push(monthlyProfit);
    }
    
    projectionChart.data.labels = labels;
    projectionChart.data.datasets[0].data = cumulativeData;
    projectionChart.data.datasets[0].label = equipmentCost ? 'Cumulative Profit (with ROI)' : 'Cumulative Profit';
    projectionChart.data.datasets[1].data = cumulativeRevenueData;
    projectionChart.data.datasets[1].label = 'Cumulative Revenue';
    projectionChart.data.datasets[2].data = monthlyData;
    projectionChart.data.datasets[2].label = 'Monthly Profit';
    projectionChart.update('active');
}

/**
 * Formatage des nombres
 */
function formatNumber(num, decimals = 2) {
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

/**
 * Formatage des devises
 */
function formatCurrency(amount) {
    if (isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
