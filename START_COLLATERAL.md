# 🚀 Guide de démarrage rapide - Page Collateral

## Démarrage en local

### 1. Vérifier les dépendances
```bash
npm install
```

### 2. Configurer la clé DeBank (optionnel mais recommandé)
Créer/modifier `.env.local` :
```env
DEBANK_ACCESS_KEY=votre_cle_debank_ici
```

**Note** : Sans clé DeBank, l'API retournera des données mockées.

### 3. Démarrer le serveur

#### Option A : Serveur Next.js complet (recommandé)
```bash
npm run dev
```

- 🌐 **Page Collateral** : http://localhost:6001/collateral
- 🔌 **API** : http://localhost:6001/api/collateral?wallets=0x...

#### Option B : Serveur API uniquement
```bash
node server-collateral-only.js
```

- 🔌 **API uniquement** : http://localhost:6001/api/collateral?wallets=0x...

#### Option C : Test direct (sans serveur)
```bash
node test-collateral-api.js
```

---

## 📋 Exemples d'utilisation

### Tester l'API avec un wallet
```bash
curl "http://localhost:6001/api/collateral?wallets=0xb3d525155609ea680125acdd9ee61c2a74610eaa"
```

### Tester avec plusieurs wallets
```bash
curl "http://localhost:6001/api/collateral?wallets=0x...,0x..."
```

### Tester avec des chaînes spécifiques
```bash
curl "http://localhost:6001/api/collateral?wallets=0x...&chains=eth,arb,base"
```

### Tester avec des protocoles spécifiques
```bash
curl "http://localhost:6001/api/collateral?wallets=0x...&protocols=morpho,aave"
```

---

## 🔍 Vérification

1. Ouvrir http://localhost:6001/collateral dans le navigateur
2. Vérifier que les données s'affichent correctement
3. Naviguer entre les onglets (Overview, Assets, Loans, Transactions, Analytics)

---

## ⚠️ Dépannage

### Le serveur ne démarre pas
- Vérifier que le port 6001 n'est pas déjà utilisé
- Vérifier que Node.js >= 18.x est installé

### Erreur "DEBANK_ACCESS_KEY manquant"
- Ajouter la clé dans `.env.local`
- Ou utiliser les données mockées (fonctionne sans clé)

### Erreur d'authentification sur l'API
- L'API route nécessite une session NextAuth
- Pour tester sans auth, utiliser `server-collateral-only.js`

---

## 📚 Documentation complète

Voir `RECAP_COLLATERAL.md` pour plus de détails sur l'architecture et le code.

