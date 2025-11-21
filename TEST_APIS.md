# 🧪 Guide de Test des APIs Calculator

## 📋 Routes à Tester

1. **Backend Express** : `http://localhost:4000/api/hashprice-lite`
2. **Next.js API** : `http://localhost:6001/api/hashprice-lite`
3. **Page Calculator** : `http://localhost:6001/api/calculator`
4. **Page Calculator (route)** : `http://localhost:6001/calculator`

---

## 🔧 Méthode 1 : Test avec curl (Terminal)

### Test Backend Express (port 4000)
```bash
# Vérifier que le backend Express est démarré
curl http://localhost:4000/api/hashprice-lite

# Avec formatage JSON (si jq installé)
curl http://localhost:4000/api/hashprice-lite | jq
```

### Test Next.js API (port 6001)
```bash
# Test route hashprice-lite Next.js
curl http://localhost:6001/api/hashprice-lite

# Test route calculator HTML
curl http://localhost:6001/api/calculator

# Vérifier le statut HTTP
curl -I http://localhost:6001/api/hashprice-lite
```

---

## 🌐 Méthode 2 : Test dans le Navigateur

### 1. Test API hashprice-lite
Ouvrez dans votre navigateur :
- **Backend Express** : `http://localhost:4000/api/hashprice-lite`
- **Next.js API** : `http://localhost:6001/api/hashprice-lite`

Vous devriez voir un JSON avec :
```json
{
  "btcPrice": 65000,
  "networkHashrate": 600000000,
  "hashprice": 0.05,
  "hashpriceTH": 0.05,
  "hashpricePH": 50,
  "timestamp": "2025-01-20T10:00:00.000Z"
}
```

### 2. Test Page Calculator
Ouvrez dans votre navigateur :
- `http://localhost:6001/calculator`
- `http://localhost:6001/collateral/calculator`
- `http://localhost:6001/api/calculator`

Vous devriez voir la page Calculator complète avec :
- Métriques temps réel (BTC price, hashrate, hashprice)
- Formulaire de calcul
- Graphique Chart.js

---

## 💻 Méthode 3 : Test dans la Console du Navigateur

Ouvrez la console (F12) et exécutez :

```javascript
// Test API hashprice-lite Next.js
fetch('/api/hashprice-lite')
  .then(res => res.json())
  .then(data => {
    console.log('✅ API hashprice-lite:', data);
  })
  .catch(err => {
    console.error('❌ Erreur API:', err);
  });

// Test avec async/await
(async () => {
  try {
    const response = await fetch('/api/hashprice-lite');
    const data = await response.json();
    console.log('✅ Données reçues:', data);
    console.log('BTC Price:', data.btcPrice);
    console.log('Hashprice TH:', data.hashpriceTH);
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
})();
```

---

## 🧪 Méthode 4 : Script de Test Automatique

Créez un fichier `test-apis.sh` :

```bash
#!/bin/bash

echo "🧪 Test des APIs Calculator"
echo "=========================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test Backend Express
echo -e "${YELLOW}1. Test Backend Express (port 4000)...${NC}"
if curl -s -f http://localhost:4000/api/hashprice-lite > /dev/null; then
    echo -e "${GREEN}✅ Backend Express fonctionne${NC}"
    curl -s http://localhost:4000/api/hashprice-lite | head -c 200
    echo ""
else
    echo -e "${RED}❌ Backend Express ne répond pas${NC}"
    echo "   Vérifiez que le backend est démarré : cd backend && npm start"
fi

echo ""

# Test Next.js API
echo -e "${YELLOW}2. Test Next.js API (port 6001)...${NC}"
if curl -s -f http://localhost:6001/api/hashprice-lite > /dev/null; then
    echo -e "${GREEN}✅ Next.js API fonctionne${NC}"
    curl -s http://localhost:6001/api/hashprice-lite | head -c 200
    echo ""
else
    echo -e "${RED}❌ Next.js API ne répond pas${NC}"
    echo "   Vérifiez que Next.js est démarré : npm run dev"
fi

echo ""

# Test Page Calculator
echo -e "${YELLOW}3. Test Page Calculator...${NC}"
if curl -s -f http://localhost:6001/api/calculator > /dev/null; then
    echo -e "${GREEN}✅ Page Calculator accessible${NC}"
    echo "   Ouvrez http://localhost:6001/calculator dans votre navigateur"
else
    echo -e "${RED}❌ Page Calculator non accessible${NC}"
fi

echo ""
echo "=========================="
echo "✅ Tests terminés"
```

Rendez-le exécutable et lancez-le :
```bash
chmod +x test-apis.sh
./test-apis.sh
```

---

## 🔍 Méthode 5 : Vérification des Logs Serveur

### Backend Express
Vérifiez les logs du backend Express. Vous devriez voir :
```
GET /api/hashprice-lite
```

### Next.js
Vérifiez les logs Next.js. Vous devriez voir :
```
GET /api/hashprice-lite 200 in XXXms
GET /api/calculator 200 in XXXms
```

---

## 🐛 Dépannage

### Erreur : "Cannot GET /api/hashprice-lite"
**Cause** : Le backend Express n'est pas démarré ou le port est incorrect.

**Solution** :
```bash
cd backend
npm start
# Vérifiez que le serveur écoute sur le port 4000
```

### Erreur : "404 Not Found" sur Next.js
**Cause** : La route API Next.js n'existe pas ou le fichier est mal placé.

**Solution** :
- Vérifiez que `/app/api/hashprice-lite/route.ts` existe
- Vérifiez que `/app/api/calculator/route.ts` existe
- Redémarrez le serveur Next.js : `npm run dev`

### Erreur : "Failed to fetch" dans le navigateur
**Cause** : CORS ou problème de connexion.

**Solution** :
- Vérifiez que les deux serveurs sont démarrés
- Vérifiez la variable d'environnement `BACKEND_URL` dans Next.js
- Vérifiez les logs du backend pour les erreurs CORS

### Erreur : "Calculator page not found"
**Cause** : Le fichier `frontend/calculator.html` n'existe pas.

**Solution** :
```bash
# Vérifiez que le fichier existe
ls -la frontend/calculator.html

# Si absent, recréez-le ou copiez-le
```

---

## ✅ Checklist de Vérification

- [ ] Backend Express démarré sur port 4000
- [ ] Next.js démarré sur port 6001
- [ ] Route `/api/hashprice-lite` répond avec JSON valide
- [ ] Route `/api/calculator` répond avec HTML
- [ ] Page `/calculator` s'affiche correctement
- [ ] Métriques temps réel se chargent (BTC price, hashrate)
- [ ] Formulaire de calcul fonctionne
- [ ] Graphique Chart.js s'affiche
- [ ] Aucune erreur dans la console du navigateur
- [ ] Aucune erreur dans les logs serveur

---

## 📊 Test de Performance

Testez la latence des APIs :

```bash
# Test de latence Backend Express
time curl -s http://localhost:4000/api/hashprice-lite > /dev/null

# Test de latence Next.js API
time curl -s http://localhost:6001/api/hashprice-lite > /dev/null
```

---

## 🎯 Test Complet de la Page Calculator

1. **Ouvrez** `http://localhost:6001/calculator`
2. **Vérifiez** que les métriques se chargent automatiquement
3. **Remplissez** le formulaire :
   - Hashrate : 100 TH/s
   - Power : 3500 W
   - Electricity : 0.05 $/kWh
4. **Cliquez** sur "Calculate"
5. **Vérifiez** que les résultats s'affichent (daily/monthly/yearly)
6. **Vérifiez** que le graphique 12 mois s'affiche
7. **Ajoutez** un Equipment Cost et vérifiez le ROI

---

**Dernière mise à jour** : 20 Janvier 2025

