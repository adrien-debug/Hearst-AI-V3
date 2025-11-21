// Calculator Page JavaScript
// Fetch API + Calculs profitabilité + Chart.js

// Utiliser l'API Next.js si disponible, sinon backend Express direct
const API_BASE_URL = window.location.origin;
const HASHPRICE_API = '/api/hashprice-lite';

let currentMetrics = null;
let projectionChart = null;

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
    
    // Calcul automatique lors de la saisie
    const inputs = ['hashrate', 'power', 'electricity', 'equipment-cost'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', debounce(calculateProfitability, 500));
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
 * Calcule la profitabilité
 */
function calculateProfitability() {
    if (!currentMetrics) {
        console.warn('Métriques non disponibles');
        return;
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
    
    // Mettre à jour le graphique
    updateChart(dailyProfit, monthlyProfit, yearlyProfit);
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
 * Initialise le graphique Chart.js
 */
function initChart() {
    const ctx = document.getElementById('projection-chart');
    if (!ctx) return;
    
    projectionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Cumulative Profit',
                data: [],
                borderColor: '#8afd81',
                backgroundColor: 'rgba(138, 253, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#cccccc'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1a1a1a',
                    titleColor: '#ffffff',
                    bodyColor: '#8afd81',
                    borderColor: '#2a2a2a',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#999999'
                    },
                    grid: {
                        color: '#2a2a2a'
                    }
                },
                y: {
                    ticks: {
                        color: '#999999',
                        callback: function(value) {
                            return '$' + formatNumber(value);
                        }
                    },
                    grid: {
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
function updateChart(dailyProfit, monthlyProfit, yearlyProfit) {
    if (!projectionChart) return;
    
    // Générer les labels pour 12 mois
    const labels = [];
    const data = [];
    let cumulativeProfit = 0;
    
    for (let month = 1; month <= 12; month++) {
        labels.push(`Month ${month}`);
        cumulativeProfit += monthlyProfit;
        data.push(cumulativeProfit);
    }
    
    projectionChart.data.labels = labels;
    projectionChart.data.datasets[0].data = data;
    projectionChart.update();
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

