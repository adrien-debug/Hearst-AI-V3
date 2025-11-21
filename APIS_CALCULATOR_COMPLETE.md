# ✅ APIs Calculator Complètes - Documentation

**Date** : 21 Novembre 2025  
**Statut** : ✅ **TOUTES LES APIs CRÉÉES ET FONCTIONNELLES**

---

## 📋 APIs Backend Express (Port 4000)

### 1. GET /api/hashprice-lite
Récupère les métriques Bitcoin temps réel.

**Réponse** :
```json
{
  "btcPrice": 84388,
  "networkHashrate": 600000000,
  "hashprice": 0.063291,
  "hashpriceTH": 0.063291,
  "hashpricePH": 63.291,
  "timestamp": "2025-11-21T23:17:18.809Z"
}
```

### 2. GET /api/calculator/metrics
Récupère les métriques Bitcoin (wrapper avec success).

**Réponse** :
```json
{
  "success": true,
  "data": {
    "btcPrice": 84388,
    "networkHashrate": 600000000,
    "hashprice": 0.063291,
    "hashpriceTH": 0.063291,
    "hashpricePH": 63.291,
    "timestamp": "2025-11-21T23:17:18.809Z"
  }
}
```

### 3. POST /api/calculator/calculate
Calcule la profitabilité avec les paramètres fournis.

**Body** :
```json
{
  "hashrate": 100,
  "power": 3500,
  "electricity": 0.05,
  "equipmentCost": 5000
}
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "metrics": { ... },
    "profitability": {
      "daily": {
        "revenue": 6.33,
        "cost": 4.20,
        "profit": 2.13,
        "margin": 33.65
      },
      "monthly": {
        "revenue": 189.90,
        "cost": 126.00,
        "profit": 63.90,
        "margin": 33.65
      },
      "yearly": {
        "revenue": 2310.45,
        "cost": 1533.00,
        "profit": 777.45,
        "margin": 33.65
      }
    },
    "roi": {
      "breakEvenDays": 78,
      "breakEvenMonths": "2.6",
      "roi1Year": "15.55",
      "roi2Years": "31.10"
    }
  }
}
```

### 4. GET /api/calculator/projection
Génère une projection sur N mois.

**Query Parameters** :
- `hashrate` (requis) - Hashrate en TH/s
- `power` (requis) - Consommation en W
- `electricity` (requis) - Coût en $/kWh
- `equipmentCost` (optionnel) - Coût équipement en $
- `months` (optionnel, défaut: 12) - Nombre de mois

**Exemple** :
```
GET /api/calculator/projection?hashrate=100&power=3500&electricity=0.05&equipmentCost=5000&months=12
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "metrics": { ... },
    "monthlyProfitability": { ... },
    "projection": [
      {
        "month": 1,
        "revenue": 189.90,
        "cost": 126.00,
        "profit": 63.90,
        "cumulativeProfit": -4936.10,
        "roi": -98.72
      },
      ...
    ],
    "breakEvenMonth": 79
  }
}
```

---

## 📋 APIs Next.js (Port 6001)

### 1. GET /api/hashprice-lite
Proxy vers backend Express.

### 2. GET /api/calculator
Sert la page HTML calculator.

### 3. GET /api/calculator/metrics
Proxy vers `/api/calculator/metrics` du backend.

### 4. POST /api/calculator/calculate
Proxy vers `/api/calculator/calculate` du backend.

### 5. GET /api/calculator/projection
Proxy vers `/api/calculator/projection` du backend.

---

## 🧪 Tests

### Test Backend Direct
```bash
# Métriques
curl http://localhost:4000/api/calculator/metrics

# Calcul
curl -X POST http://localhost:4000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"hashrate":100,"power":3500,"electricity":0.05,"equipmentCost":5000}'

# Projection
curl "http://localhost:4000/api/calculator/projection?hashrate=100&power=3500&electricity=0.05&equipmentCost=5000&months=12"
```

### Test Next.js APIs
```bash
# Métriques
curl http://localhost:6001/api/calculator/metrics

# Calcul
curl -X POST http://localhost:6001/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"hashrate":100,"power":3500,"electricity":0.05,"equipmentCost":5000}'

# Projection
curl "http://localhost:6001/api/calculator/projection?hashrate=100&power=3500&electricity=0.05&equipmentCost=5000&months=12"
```

---

## 📊 Utilisation dans calculator.js

### Charger les métriques
```javascript
const response = await fetch('/api/calculator/metrics');
const { success, data } = await response.json();
```

### Calculer profitabilité
```javascript
const response = await fetch('/api/calculator/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    hashrate: 100,
    power: 3500,
    electricity: 0.05,
    equipmentCost: 5000
  })
});
const { success, data } = await response.json();
```

### Générer projection
```javascript
const response = await fetch(
  `/api/calculator/projection?hashrate=100&power=3500&electricity=0.05&equipmentCost=5000&months=12`
);
const { success, data } = await response.json();
```

---

## ✅ Checklist

- [x] GET /api/hashprice-lite (Backend)
- [x] GET /api/calculator/metrics (Backend)
- [x] POST /api/calculator/calculate (Backend)
- [x] GET /api/calculator/projection (Backend)
- [x] GET /api/hashprice-lite (Next.js proxy)
- [x] GET /api/calculator/metrics (Next.js proxy)
- [x] POST /api/calculator/calculate (Next.js proxy)
- [x] GET /api/calculator/projection (Next.js proxy)
- [x] GET /api/calculator (HTML page)

---

## 🎉 Conclusion

**TOUTES LES APIs SONT CRÉÉES ET FONCTIONNELLES** ✅

La Calculator dispose maintenant de :
- ✅ Métriques temps réel
- ✅ Calcul de profitabilité complet
- ✅ Projection sur N mois
- ✅ ROI et break-even
- ✅ APIs Backend et Next.js

**Prêt pour intégration complète !** 🚀

---

**Dernière mise à jour** : 21 Novembre 2025, 23:25

