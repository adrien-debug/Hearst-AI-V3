# Compte-rendu : Ajout d'un graphique Bar Chart à côté du graphique Performance Overview

## Contexte
Le graphique "Performance Overview" (graphique en ligne) a été récemment ajouté sur la page d'accueil (Home page). Il se trouve dans la section `wallet-chart-section` du fichier `frontend/js/views/dashboard.js`.

## Objectif
Ajouter un graphique en barres (Bar Chart) à côté du graphique "Performance Overview" existant, avec un layout en deux colonnes (50/50).

## Spécifications techniques

### 1. Positionnement et Layout
- **Disposition** : Deux colonnes côte à côte, répartition 50/50
- **Alignement** : Parfaitement aligné avec le graphique existant
- **Largeur** : Chaque graphique occupe 50% de la largeur disponible
- **Hauteur** : Même hauteur que le graphique "Performance Overview" (201px)

### 2. Style et Design
- **Couleurs** : Utiliser exactement les mêmes couleurs que le graphique existant :
  - Vert principal : `#C5FFA7` (BTC Wallet)
  - Gris secondaire : `#888888` (Transactions)
- **Fond** : Même style de carte que le graphique existant :
  - Background : `rgba(26, 26, 26, 0.7)`
  - Backdrop-filter : `blur(20px) saturate(180%)`
  - Border : `1px solid rgba(255, 255, 255, 0.05)`
  - Border-radius : `var(--radius-xl)`
  - Box-shadow : Identique au graphique existant
- **Header** : Même style de header avec titre et légende
- **Padding** : `var(--space-4)` (identique)

### 3. Structure HTML à ajouter
Dans le fichier `frontend/js/views/dashboard.js`, modifier la fonction `renderDashboard()` aux lignes **24-42**.

**AVANT** (lignes 24-42) :
```html
<!-- Performance Chart -->
<div class="wallet-chart-section">
    <div class="chart-header">
        <h2 class="chart-title">Performance Overview</h2>
        <div class="chart-legend">
            <div class="legend-item">
                <span class="legend-dot green"></span>
                <span>BTC Wallet</span>
            </div>
            <div class="legend-item">
                <span class="legend-dot gray"></span>
                <span>Transactions</span>
            </div>
        </div>
    </div>
    <div class="chart-container">
        <canvas id="walletPerformanceChart"></canvas>
    </div>
</div>
```

**APRÈS** (remplacer par) :
```html
<!-- Performance Charts Container (2 colonnes) -->
<div class="wallet-charts-container">
    <!-- Graphique Performance Overview existant -->
    <div class="wallet-chart-section">
        <div class="chart-header">
            <h2 class="chart-title">Performance Overview</h2>
            <div class="chart-legend">
                <div class="legend-item">
                    <span class="legend-dot green"></span>
                    <span>BTC Wallet</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot gray"></span>
                    <span>Transactions</span>
                </div>
            </div>
        </div>
        <div class="chart-container">
            <canvas id="walletPerformanceChart"></canvas>
        </div>
    </div>
    
    <!-- Nouveau graphique Bar Chart -->
    <div class="wallet-chart-section">
        <div class="chart-header">
            <h2 class="chart-title">Performance Bar Chart</h2>
            <div class="chart-legend">
                <div class="legend-item">
                    <span class="legend-dot green"></span>
                    <span>BTC Wallet</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot gray"></span>
                    <span>Transactions</span>
                </div>
            </div>
        </div>
        <div class="chart-container">
            <canvas id="walletBarChart"></canvas>
        </div>
    </div>
</div>
```

### 4. Styles CSS à ajouter
Dans le fichier `frontend/js/views/dashboard.js`, dans la constante `dashboardStyles` (après la ligne 397, dans la section `.wallet-chart-section`), ajouter :

```css
/* Container pour les deux graphiques côte à côte */
.wallet-charts-container {
    display: flex;
    gap: var(--space-6);
    width: 100%;
    margin-bottom: var(--space-6);
}

.wallet-charts-container .wallet-chart-section {
    flex: 1;
    width: 50%;
    min-width: 0; /* Permet au flex de fonctionner correctement */
}

/* Responsive : passer en colonne sur petits écrans */
@media (max-width: 1024px) {
    .wallet-charts-container {
        flex-direction: column;
    }
    
    .wallet-charts-container .wallet-chart-section {
        width: 100%;
    }
}
```

### 5. Initialisation du Bar Chart
Dans le fichier `frontend/js/views/dashboard.js`, après la fonction `initWalletPerformanceChart()` (après la ligne 1176), ajouter une nouvelle fonction `initWalletBarChart()` :

```javascript
function initWalletBarChart() {
    const ctx = document.getElementById('walletBarChart');
    if (!ctx) return;

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet');
        setTimeout(initWalletBarChart, 200);
        return;
    }

    // Créer des gradients similaires au graphique existant
    const btcGradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 201);
    btcGradient.addColorStop(0, 'rgba(197, 255, 167, 0.8)');
    btcGradient.addColorStop(1, 'rgba(197, 255, 167, 0.3)');

    const transactionGradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 201);
    transactionGradient.addColorStop(0, 'rgba(136, 136, 136, 0.8)');
    transactionGradient.addColorStop(1, 'rgba(136, 136, 136, 0.3)');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'BTC Wallet',
                    data: [0.025, 0.027, 0.029, 0.031, 0.030, 0.032, 0.031, 0.030, 0.032, 0.031, 0.031, 0.032],
                    backgroundColor: btcGradient,
                    borderColor: '#C5FFA7',
                    borderWidth: 2,
                    borderRadius: 4,
                    borderSkipped: false,
                },
                {
                    label: 'Transactions',
                    data: [0.005, 0.0055, 0.0052, 0.0058, 0.0056, 0.0059, 0.0057, 0.0055, 0.0058, 0.0056, 0.0057, 0.0058],
                    backgroundColor: transactionGradient,
                    borderColor: '#888888',
                    borderWidth: 2,
                    borderRadius: 4,
                    borderSkipped: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { 
                intersect: false, 
                mode: 'index' 
            },
            plugins: {
                legend: { 
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    titleColor: '#C5FFA7',
                    titleFont: { size: 13, family: 'Inter', weight: '700' },
                    bodyColor: '#E8E8E8',
                    bodyFont: { size: 12, family: 'Inter', weight: '500' },
                    borderColor: 'rgba(197, 255, 167, 0.3)',
                    borderWidth: 1,
                    padding: 14,
                    cornerRadius: 8,
                    displayColors: true,
                    boxWidth: 12,
                    boxHeight: 12,
                    boxPadding: 6
                }
            },
            scales: {
                x: {
                    grid: { 
                        display: true,
                        color: 'rgba(255, 255, 255, 0.02)',
                        drawBorder: false
                    },
                    ticks: { 
                        color: '#A3A3A3', 
                        font: { size: 11, family: 'Inter', weight: '500' },
                        padding: 10
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    grid: { 
                        color: 'rgba(255, 255, 255, 0.05)', 
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: { 
                        color: '#CCCCCC', 
                        font: { size: 12, family: 'Inter', weight: '600' },
                        padding: 12,
                        callback: function(value) {
                            return value.toFixed(3) + ' BTC';
                        }
                    },
                    border: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}
```

### 6. Appel de la fonction d'initialisation
Dans le fichier `frontend/js/views/dashboard.js`, modifier deux endroits :

**a) Dans la section d'initialisation** (lignes 1188-1191) :
```javascript
setTimeout(() => {
    initSeeMoreButtons();
    initWalletPerformanceChart();
    initWalletBarChart(); // Ajouter cette ligne
}, 100);
```

**b) Dans la partie export** (après la ligne 1196) :
```javascript
window.initSeeMoreButtons = initSeeMoreButtons;
window.initWalletPerformanceChart = initWalletPerformanceChart;
window.initWalletBarChart = initWalletBarChart; // Ajouter cette ligne
```

## Points importants à respecter

1. **Alignement parfait** : Les deux graphiques doivent être parfaitement alignés en hauteur et en largeur
2. **Même style visuel** : Utiliser exactement les mêmes couleurs, ombres, bordures et effets que le graphique existant
3. **Responsive** : Sur les petits écrans (< 1024px), les graphiques doivent passer en colonne (l'un sous l'autre)
4. **Données** : Utiliser les mêmes données que le graphique existant pour la cohérence
5. **Performance** : S'assurer que les deux graphiques se chargent correctement et ne ralentissent pas la page

## Fichiers à modifier

1. **`frontend/js/views/dashboard.js`** :
   - **Ligne ~24-42** : Modifier la fonction `renderDashboard()` pour envelopper le graphique existant dans un conteneur flex et ajouter le nouveau graphique
   - **Ligne ~397** : Ajouter les styles CSS pour `.wallet-charts-container` dans `dashboardStyles`
   - **Ligne ~1176** : Ajouter la fonction `initWalletBarChart()` après `initWalletPerformanceChart()`
   - **Ligne ~1188-1191** : Ajouter l'appel à `initWalletBarChart()` dans le setTimeout
   - **Ligne ~1196** : Ajouter `window.initWalletBarChart = initWalletBarChart;` dans les exports

## Résultat attendu

Deux graphiques côte à côte sur la page d'accueil :
- **Gauche** : Graphique en ligne "Performance Overview" (existant)
- **Droite** : Nouveau graphique en barres avec les mêmes données et le même style

Les deux graphiques doivent avoir :
- La même hauteur (201px)
- La même largeur (50% chacun)
- Le même style de carte avec effets de glassmorphism
- Les mêmes couleurs (#C5FFA7 et #888888)
- Le même header avec titre et légende
- Un espacement cohérent entre eux (var(--space-6))

## Notes supplémentaires

- Le graphique en barres utilisera Chart.js (déjà chargé dans `index.html` ligne 12)
- Les données sont identiques au graphique en ligne pour maintenir la cohérence
- Le graphique en barres sera de type `bar` avec deux datasets groupés (BTC Wallet et Transactions)
- Les gradients sont adaptés pour un rendu optimal en barres (plus opaques en haut, plus transparents en bas)

## Checklist d'implémentation

- [ ] Modifier `renderDashboard()` pour ajouter le conteneur flex
- [ ] Ajouter le HTML du nouveau graphique Bar Chart
- [ ] Ajouter les styles CSS `.wallet-charts-container`
- [ ] Créer la fonction `initWalletBarChart()`
- [ ] Ajouter l'appel d'initialisation dans le setTimeout
- [ ] Exporter la fonction dans window
- [ ] Tester l'affichage sur desktop (2 colonnes)
- [ ] Tester l'affichage responsive (< 1024px, colonne unique)
- [ ] Vérifier que les couleurs et styles correspondent
- [ ] Vérifier que les deux graphiques sont alignés

---

**Date** : 2025-01-18  
**Priorité** : Moyenne  
**Statut** : À faire  
**Fichier concerné** : `frontend/js/views/dashboard.js`

