# ✅ Déploiement Local - Backend et Frontend

## 🎉 Statut : **DÉMARRÉ ET FONCTIONNEL**

Date de démarrage : 21 novembre 2025 à 20:26

---

## 🌐 Accès aux serveurs

### Backend API
- **URL** : http://localhost:4000/api
- **Health Check** : http://localhost:4000/api/health
- **Status** : ✅ **ACTIF**
- **PID** : 71942

### Frontend Next.js
- **URL** : http://localhost:6001
- **Status** : ✅ **ACTIF**
- **PID** : 72035

---

## 📋 Endpoints disponibles

### Backend (Port 4000)
- `GET /api` - Informations API
- `GET /api/health` - Health check
- `GET /api/projects` - Liste des projets
- `GET /api/jobs` - Liste des jobs
- `GET /api/versions` - Liste des versions
- `GET /api/prompts` - Liste des prompts
- `GET /api/logs` - Logs
- `GET /api/stats` - Statistiques

### Frontend (Port 6001)
- Page d'accueil : http://localhost:6001
- Dashboard : http://localhost:6001/dashboard
- Collateral : http://localhost:6001/collateral
- Projects : http://localhost:6001/projects
- Jobs : http://localhost:6001/jobs
- Cockpit : http://localhost:6001/cockpit

---

## 📊 Vérification

### Backend
```bash
curl http://localhost:4000/api/health
# Réponse: {"status":"ok","timestamp":"...","environment":"local"}
```

### Frontend
```bash
curl http://localhost:6001
# Réponse: Code 307 (redirection Next.js - normal)
```

---

## 📋 Logs

### Voir les logs en temps réel

**Backend :**
```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
tail -f backend.log
```

**Frontend :**
```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
tail -f frontend.log
```

---

## ⏹️ Arrêter les serveurs

### Méthode 1 : Script automatique
```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
pkill -f 'node.*server' && pkill -f 'next dev'
```

### Méthode 2 : Par PID
```bash
kill 71942  # Backend
kill 72035  # Frontend
```

### Méthode 3 : Par port
```bash
lsof -ti:4000 | xargs kill -9  # Backend
lsof -ti:6001 | xargs kill -9  # Frontend
```

---

## 🔄 Redémarrer les serveurs

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./start-all.sh
```

---

## 🛠️ Commandes utiles

### Vérifier les processus
```bash
ps aux | grep -E "(node.*server|next dev)" | grep -v grep
```

### Vérifier les ports
```bash
lsof -i:4000  # Backend
lsof -i:6001  # Frontend
```

### Tester l'API
```bash
# Health check
curl http://localhost:4000/api/health

# Liste des projets
curl http://localhost:4000/api/projects

# Statistiques
curl http://localhost:4000/api/stats
```

---

## 📁 Fichiers de configuration

- **Backend** : `/Users/adrienbeyondcrypto/Desktop/HearstAI/backend/server.js`
- **Frontend** : `/Users/adrienbeyondcrypto/Desktop/HearstAI/package.json`
- **Script de démarrage** : `/Users/adrienbeyondcrypto/Desktop/HearstAI/start-all.sh`

---

## ⚠️ Notes importantes

1. **Base de données** : La base de données SQLite est initialisée automatiquement
2. **Prisma** : Le client Prisma est généré automatiquement au démarrage
3. **Ports** : Les ports 4000 et 6001 doivent être libres
4. **Logs** : Les logs sont sauvegardés dans `backend.log` et `frontend.log`

---

## 🆘 En cas de problème

### Port déjà utilisé
```bash
lsof -ti:4000 | xargs kill -9
lsof -ti:6001 | xargs kill -9
```

### Erreur de dépendances
```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
rm -rf node_modules package-lock.json
npm install

cd backend
rm -rf node_modules package-lock.json
npm install
```

### Erreur Prisma
```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
npx prisma generate
npx prisma db push
```

---

## ✅ Checklist de vérification

- [x] Backend démarré sur port 4000
- [x] Frontend démarré sur port 6001
- [x] Health check backend OK
- [x] Frontend accessible
- [x] Logs disponibles
- [x] Base de données initialisée

---

*Dernière mise à jour : 21 novembre 2025 à 20:26*

