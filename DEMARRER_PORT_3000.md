# 🚀 Démarrer HearstAI sur le port 3000

## ✅ Configuration actuelle

Le projet est configuré pour démarrer sur le **port 3000** par défaut.

## 📋 Méthode 1 : Script automatique (recommandé)

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./start-port-3000.sh
```

Ce script va :
- ✅ Arrêter tous les processus sur les ports 2222 et 3000
- ✅ Installer les dépendances si nécessaire
- ✅ Démarrer Next.js sur le port 3000

## 📋 Méthode 2 : Commande npm directe

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
npm run dev
```

Cette commande démarre automatiquement sur le port 3000 (configuré dans `package.json`).

## 🔍 Vérifier que le serveur tourne sur le bon port

Après le démarrage, vous devriez voir :
```
✓ Ready in Xs
○ Local:        http://localhost:3000
```

## ⚠️ Si vous voyez encore le port 2222

1. **Arrêter tous les processus Next.js** :
```bash
pkill -9 -f "next dev"
```

2. **Vérifier qu'aucun processus n'utilise le port 2222** :
```bash
lsof -ti:2222 | xargs kill -9
```

3. **Redémarrer sur le port 3000** :
```bash
npm run dev
```

## 🌐 Accéder à l'application

Une fois démarré, ouvrez votre navigateur sur :
- **Application** : http://localhost:3000
- **API Transactions** : http://localhost:3000/api/transactions

## 📝 Note importante

L'application **DOIT** tourner sur le port **3000** pour que les API routes Next.js fonctionnent correctement. Le port 2222 n'est pas configuré dans ce projet.

