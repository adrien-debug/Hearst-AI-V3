# Intégration DeBank - Documentation

## 📋 Résumé

L'intégration DeBank remplace les données mockées par des données réelles provenant de l'API DeBank Pro OpenAPI. Les wallets ERC20 des clients sont utilisés comme identifiants pour récupérer leurs positions collatérales.

## 🏗️ Architecture

### 1. Backend (Next.js API Routes)

#### `lib/debank.ts`
Helper TypeScript pour interagir avec l'API DeBank Pro OpenAPI.

**Fonctions principales :**
- `fetchUserComplexProtocols(wallet, chains)` - Récupère les protocoles complexes d'un wallet
- `buildCollateralClientFromDeBank(wallet, options)` - Construit un objet `CollateralClient` depuis les données DeBank
- `mapPortfolioItemToPosition(protocol, item)` - Mappe un item de portfolio DeBank vers une position collatérale

**Endpoints DeBank utilisés :**
- `GET /user/all_complex_protocol_list` - Récupère tous les protocoles complexes (lending, borrowing, etc.) pour un wallet

**Champs DeBank mappés :**
- `detail.supply_token_list` ou `detail.asset_token_list` → tokens en collatéral
- `detail.borrow_token_list` ou `detail.debt_token_list` → tokens empruntés
- `stats.asset_usd_value` → valeur totale du collatéral en USD
- `stats.debt_usd_value` → valeur totale de la dette en USD
- `protocol.id` → identifiant du protocole (ex: "morpho_blue")
- `protocol.chain` → chaîne blockchain (ex: "eth", "arb")

#### `app/api/collateral/route.ts`
Route API Next.js qui expose les données collatérales.

**Endpoint :**
```
GET /api/collateral?wallets=0x1234...,0xABCD...&chains=eth,arb&protocols=morpho
```

**Query params :**
- `wallets` (requis) : Liste de wallets ERC20 séparés par des virgules
- `chains` (optionnel) : Liste de chains séparées par des virgules (défaut: "eth")
- `protocols` (optionnel) : Liste de protocoles autorisés séparés par des virgules

**Réponse :**
```json
{
  "clients": [
    {
      "id": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "name": "0x742d...0bEb",
      "tag": "Client",
      "wallets": ["0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"],
      "positions": [
        {
          "asset": "BTC",
          "protocol": "morpho_blue",
          "chain": "eth",
          "collateralAmount": 3.2,
          "collateralPriceUsd": 71000,
          "debtToken": "USDC",
          "debtAmount": 80000,
          "borrowApr": 0,
          "liquidationThreshold": 0.9
        }
      ],
      "lastUpdate": "2025-01-20T10:00:00Z"
    }
  ]
}
```

### 2. Frontend (Vanilla JS)

#### `frontend/js/api.js`
Module API ajouté avec la méthode `getCollateralClients()`.

#### `frontend/js/collateral.js`
Modifié pour charger les données depuis l'API au lieu des données hardcodées.

**Fonction modifiée :**
- `loadCollateralPositions()` - Charge maintenant depuis `/api/collateral` et transforme les données

**Fonction ajoutée :**
- `transformClientsToPositions(clients)` - Transforme les données de l'API vers le format attendu par le rendu

#### `frontend/src/data/collateralData.js` (nouveau)
Module utilitaire pour charger les données collatérales avec cache.

## 🔧 Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet Next.js :

```bash
DEBANK_ACCESS_KEY=votre_cle_api_debank
```

**Obtenir une clé API :**
1. Aller sur https://pro.debank.com/
2. Créer un compte et obtenir votre clé API
3. Ajouter la clé dans `.env.local`

### 2. Liste des wallets à surveiller

Modifiez la liste des wallets dans `frontend/src/config/wallets.js` :

```javascript
export const WATCHED_WALLETS = [
  "0xb3d525155609ea680125acdd9ee61c2a74610eaa",
  // Ajouter d'autres wallets ici
];
```

Cette configuration est automatiquement utilisée par :
- `frontend/js/collateral.js` (chargement des positions)
- `frontend/src/data/collateralData.js` (module utilitaire)

## 📊 Format des données

### Structure CollateralClient

```typescript
{
  id: string;              // Wallet ERC20 (identifiant unique)
  name: string;            // Nom affiché (ou wallet tronqué)
  tag: string;             // Tag ("Restaurant", "VIP", "Client", etc.)
  wallets: string[];       // Liste des wallets (généralement un seul)
  positions: CollateralPosition[];
  lastUpdate: string;      // Date ISO de dernière mise à jour
}
```

### Structure CollateralPosition

```typescript
{
  asset: "BTC" | "ETH" | string;  // Asset collatéral
  protocol: string;                 // ID du protocole (ex: "morpho_blue")
  chain: string;                   // Chaîne blockchain (ex: "eth")
  collateralAmount: number;        // Quantité de collatéral
  collateralPriceUsd: number;      // Prix USD de l'asset
  debtToken: string;               // Token emprunté (ex: "USDC")
  debtAmount: number;             // Montant emprunté
  borrowApr: number;               // Taux d'emprunt APR (0 si non disponible)
  liquidationThreshold: number;    // Seuil de liquidation (0.9 = 90%)
}
```

## 🔄 Compatibilité

### `collateralMetrics.js`

Les fonctions `computeClientMetrics()` et `getClientsWithMetrics()` restent inchangées et fonctionnent avec les données DeBank car :
- Le format `CollateralClient` est identique aux mocks
- Les champs utilisés (`positions`, `collateralAmount`, `debtAmount`, etc.) sont présents dans les données DeBank

### Frontend

Le frontend continue de fonctionner car :
- La fonction `transformClientsToPositions()` convertit les données au format attendu
- Le rendu (`renderCollateralPositions()`) reste inchangé

## 🚀 Utilisation

### Ajouter un nouveau wallet

1. **Via la configuration centralisée (recommandé) :**
   Modifiez `frontend/src/config/wallets.js` :
   ```javascript
   export const WATCHED_WALLETS = [
     "0xb3d525155609ea680125acdd9ee61c2a74610eaa",
     "0xNOUVEAU_WALLET", // Ajouter ici
   ];
   ```

2. **Via l'API directement :**
   ```javascript
   const response = await fetch('/api/collateral?wallets=0xNOUVEAU_WALLET&chains=eth');
   const data = await response.json();
   ```

### Filtrer par protocole

```javascript
// Seulement Morpho
const response = await fetch('/api/collateral?wallets=0x1234...&protocols=morpho_blue');

// Plusieurs protocoles
const response = await fetch('/api/collateral?wallets=0x1234...&protocols=morpho_blue,compound_v3');
```

### Filtrer par chaîne

```javascript
// Ethereum seulement
const response = await fetch('/api/collateral?wallets=0x1234...&chains=eth');

// Plusieurs chaînes
const response = await fetch('/api/collateral?wallets=0x1234...&chains=eth,arb,base');
```

## ⚠️ Limitations actuelles

1. **APR (borrowApr)** : Non fourni directement par DeBank, retourne 0. Il faudra récupérer cette information depuis une autre source (API du protocole directement, The Graph, etc.).

2. **Mapping des champs** : Les noms de champs DeBank peuvent varier selon les protocoles. Le mapping actuel utilise plusieurs fallbacks (`supply_token_list`, `asset_token_list`, etc.) mais peut nécessiter des ajustements selon les réponses réelles.

3. **Cache** : Le frontend n'a pas encore de système de cache robuste. Les données sont rechargées à chaque appel.

## 🔍 Debugging

### Vérifier les données DeBank

```javascript
// Dans lib/debank.ts, ajouter des logs :
console.log('DeBank Response:', JSON.stringify(data, null, 2));
```

### Vérifier la transformation

```javascript
// Dans frontend/js/collateral.js, ajouter des logs :
console.log('Clients from API:', clients);
console.log('Transformed positions:', positionsData);
```

## 📝 Notes importantes

- Les wallets sont les identifiants uniques des clients
- Les données sont récupérées en temps réel depuis DeBank
- Le format des données reste compatible avec `collateralMetrics.js`
- Le frontend continue de fonctionner sans modification majeure

