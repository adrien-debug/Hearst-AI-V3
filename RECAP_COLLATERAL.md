# 📋 Récapitulatif - Page Collateral

## 🎯 Vue d'ensemble

La page **Collateral Management** est une interface complète pour gérer et suivre les positions collatérales de clients via l'API DeBank Pro OpenAPI.

---

## 📁 Structure du code

### 1. **Page principale** (`app/collateral/page.tsx`)
- Page React avec navigation par onglets
- 5 sections : Overview, Assets, Loans, Transactions, Analytics
- Utilise les composants spécialisés pour chaque section

### 2. **API Route** (`app/api/collateral/route.ts`)
- Endpoint : `GET /api/collateral`
- Paramètres query :
  - `wallets` (requis) : liste de wallets séparés par virgules
  - `chains` (optionnel) : chaînes blockchain (défaut: "eth")
  - `protocols` (optionnel) : protocoles autorisés
- Authentification requise (session NextAuth)
- Fallback sur données mockées en cas d'erreur DeBank

### 3. **Bibliothèque DeBank** (`lib/debank.ts`)
- Fonctions principales :
  - `fetchUserComplexProtocols()` : récupère les protocoles complexes d'un wallet
  - `buildCollateralClientFromDeBank()` : construit la structure client avec positions
  - `mapPortfolioItemToPosition()` : mappe les données DeBank vers le format frontend
- Types TypeScript définis pour les données DeBank et le format frontend

### 4. **Composants UI** (`components/collateral/`)
- `CollateralOverview.tsx` : Vue d'ensemble avec métriques (Total Collateral, Active Loans, Utilization Rate, Available Credit)
- `CollateralAssets.tsx` : Liste des actifs collatéraux
- `CollateralLoans.tsx` : Gestion des prêts
- `CollateralTransactions.tsx` : Historique des transactions
- `CollateralAnalytics.tsx` : Analyses et graphiques

### 5. **Client API** (`lib/api.ts`)
- `collateralAPI.getAll()` : Appel à l'endpoint `/api/collateral`

### 6. **Serveur standalone** (`server-collateral-only.js`)
- Serveur HTTP minimal pour tester uniquement l'API Collateral
- Port : 6001
- Route : `/api/collateral`
- Pas de dépendance Next.js

### 7. **Script de test** (`test-collateral-api.js`)
- Script Node.js pour tester l'API DeBank directement
- Utilise les mêmes fonctions que le serveur
- Affiche les résultats en console

---

## 🔧 Fonctionnalités

### Intégration DeBank
- Récupération des positions collatérales depuis DeBank Pro OpenAPI
- Support multi-chaînes (Ethereum, Arbitrum, Base, etc.)
- Filtrage par protocoles (Morpho, Aave, etc.)
- Normalisation des symboles d'actifs (BTC, ETH, autres)

### Données récupérées
Pour chaque position :
- Asset (BTC, ETH, etc.)
- Protocole (Morpho, Aave, etc.)
- Chaîne blockchain
- Montant collatéral
- Prix USD du collatéral
- Token de dette
- Montant de la dette
- APR d'emprunt (0 par défaut, non fourni par DeBank)
- Seuil de liquidation (0.9 par défaut)

### Structure de réponse API
```json
{
  "clients": [
    {
      "id": "0x...",
      "name": "Client Principal",
      "tag": "Client",
      "wallets": ["0x..."],
      "positions": [
        {
          "asset": "ETH",
          "protocol": "morpho",
          "chain": "eth",
          "collateralAmount": 500,
          "collateralPriceUsd": 2500,
          "debtToken": "USDC",
          "debtAmount": 200000,
          "borrowApr": 0,
          "liquidationThreshold": 0.9
        }
      ],
      "lastUpdate": "2025-01-20T10:00:00Z"
    }
  ]
}
```

---

## 🚀 Démarrage local

### Option 1 : Serveur Next.js complet
```bash
npm run dev
```
- Port : 6001 (configuré dans package.json)
- Page : http://localhost:6001/collateral
- API : http://localhost:6001/api/collateral

### Option 2 : Serveur API uniquement
```bash
node server-collateral-only.js
```
- Port : 6001
- API uniquement : http://localhost:6001/api/collateral
- Exemple : http://localhost:6001/api/collateral?wallets=0xb3d525155609ea680125acdd9ee61c2a74610eaa

### Option 3 : Test direct (sans serveur)
```bash
node test-collateral-api.js
```

---

## ⚙️ Configuration requise

### Variables d'environnement (`.env.local`)
```env
DEBANK_ACCESS_KEY=votre_cle_debank_ici
```

Pour obtenir une clé DeBank :
1. Créer un compte sur https://pro.debank.com/
2. Générer une clé API
3. L'ajouter dans `.env.local`

---

## 📊 Flux de données

1. **Frontend** → Appel `collateralAPI.getAll()`
2. **API Route** → Vérifie l'authentification
3. **DeBank Library** → Appel API DeBank Pro OpenAPI
4. **Mapping** → Transformation des données DeBank vers format frontend
5. **Retour** → JSON avec clients et positions

---

## 🎨 Design

- Utilise la charte graphique Hearst (couleurs, espacements CSS variables)
- Composants UI réutilisables (`Card`, `Button`, etc.)
- Navigation par onglets avec état actif
- Tableaux pour afficher les données
- Métriques avec indicateurs visuels (couleurs selon seuils)

---

## 🔍 Points d'attention

1. **Authentification** : L'API route nécessite une session NextAuth valide
2. **Fallback** : En cas d'erreur DeBank, des données mockées sont retournées
3. **APR** : Non fourni par DeBank, valeur par défaut à 0
4. **Seuil de liquidation** : Valeur par défaut à 0.9 (90%)
5. **Filtrage** : Les positions vides (0 collatéral et 0 dette) sont ignorées

---

## 📝 Notes techniques

- **TypeScript** : Types définis pour toutes les structures de données
- **Error handling** : Gestion d'erreurs avec fallback sur données mockées
- **CORS** : Configuré dans le serveur standalone
- **Performance** : Requêtes parallèles avec `Promise.all()` pour plusieurs wallets

---

## 🧪 Tests

- Script de test : `test-collateral-api.js`
- Teste directement les fonctions sans Next.js
- Affiche les résultats en console avec formatage
- Exemple de wallet inclus dans le script

---

## 📚 Documentation

- DeBank Pro OpenAPI : https://pro-openapi.debank.com/
- Endpoint utilisé : `/user/all_complex_protocol_list`
- Documentation complète dans les commentaires du code

