# 🚀 Démarrage Rapide - My Hearst AI

## ⚡ Démarrage en 3 étapes

### Étape 1 : Ouvrir 2 terminaux

**Terminal 1 - Backend:**
```bash
cd /Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI/backend
npm install  # Si pas encore fait
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd /Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI
npm install  # Si pas encore fait
npx prisma generate  # Générer Prisma Client
npm run dev
```

### Étape 2 : Vérifier

- **Backend** : http://localhost:4000/api/health
- **Frontend** : http://localhost:6001

### Étape 3 : Si erreurs

```bash
# Arrêter tout
pkill -f "node server"
pkill -f "next dev"

# Réinstaller dépendances
cd /Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI
rm -rf node_modules package-lock.json
npm install

cd backend
rm -rf node_modules package-lock.json
npm install

# Redémarrer
```

---

## 🔧 Script automatique

```bash
cd /Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI
chmod +x start-all.sh
./start-all.sh
```

---

## 📋 Ports utilisés

- **Backend** : Port 4000
- **Frontend** : Port 6001

---

## ❌ Problèmes courants

### Port déjà utilisé
```bash
# Trouver et tuer le processus
lsof -ti:4000 | xargs kill -9
lsof -ti:6001 | xargs kill -9
```

### Erreur Prisma
```bash
npx prisma generate
npx prisma db push
```

### Erreur de dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Vérification finale

```bash
# Backend répond ?
curl http://localhost:4000/api/health

# Frontend répond ?
curl http://localhost:6001
```

