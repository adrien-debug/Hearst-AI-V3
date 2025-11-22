# 📦 Migration Meeneo → HearstAI

## ✅ Fichiers copiés depuis Meeneo (port 2222) vers HearstAI (port 3000)

### Utilitaires (`/utils`)
- ✅ `transactionsApi.ts` - Fonctions API pour transactions et wallets
- ✅ `transactionsData.ts` - Types et données de démo

### Composants Modals (`/components/modals`)
- ✅ `TransactionDetailsModal.tsx` - Modal de détails de transaction (emojis supprimés)
- ✅ `WalletModal.tsx` - Modal de configuration de wallet
- ✅ `TransactionDetailsModal.module.css` - Styles du modal
- ✅ `WalletModal.module.css` - Styles du modal wallet

## 🔄 Modifications effectuées

### 1. Suppression des emojis (Charte HEARST)
Tous les emojis ont été remplacés par du texte professionnel :
- `🟢 Pending` → `PENDING`
- `✅ Validated` → `VALIDATED`
- `❌ Failed` → `FAILED`
- `📤 FROM WALLET` → `FROM WALLET`
- `📥 TO WALLET` → `TO WALLET`
- `📋` → `COPY`
- `💰 TRANSFER AMOUNT` → `TRANSFER AMOUNT`
- `📝 Notes` → `NOTES`
- `✅ Validate & Send` → `VALIDATE & SEND`

### 2. Configuration API
Les utilitaires utilisent maintenant `/api` comme chemin relatif, compatible avec Next.js sur le port 3000.

## 📍 Pages disponibles dans HearstAI

### Transactions
- **Route** : `/transactions`
- **Composant** : `components/TransactionsManager.tsx`
- **API** : `/api/transactions`

### Wallets
- **Route** : `/wallets`
- **Composant** : `components/WalletsConfig.tsx`
- **API** : `/api/wallets`

## 🚀 Utilisation

Les composants existants dans HearstAI peuvent maintenant utiliser les utilitaires de Meeneo :

```typescript
import { getTransactions, validateTransaction } from '@/utils/transactionsApi'
import { Transaction, Wallet } from '@/utils/transactionsData'
```

## ⚠️ Important

- **Port** : L'application doit tourner sur le **port 3000** (pas 2222)
- **API Routes** : Les routes API Next.js fonctionnent uniquement sur le même port que l'application
- **Charte graphique** : Tous les composants respectent maintenant la charte HEARST (#8afd81)

## 📝 Prochaines étapes

1. Vérifier que les composants existants utilisent bien les nouveaux utilitaires
2. Tester les fonctionnalités de transactions et wallets
3. S'assurer que tout fonctionne sur le port 3000

