# 🏠 Hébergement Local - Frontend + Backend

## ✅ Configuration Complète

Tout est maintenant configuré pour héberger le **frontend Next.js** et le **backend Express** en local sur votre machine.

## 🚀 Démarrage Rapide

### Commande Unique

```bash
./start-local.sh
```

C'est tout ! Le script va :
- ✅ Créer automatiquement `.env.local` avec la configuration
- ✅ Vérifier et installer les dépendances
- ✅ Démarrer le backend Express sur le port **5001**
- ✅ Démarrer le frontend Next.js sur le port **3000**
- ✅ Vérifier que tout fonctionne

## 📊 Architecture Locale

```
┌─────────────────────────────────────────┐
│         Frontend Next.js                │
│         Port: 3000                      │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Pages (/, /calculator, etc.)    │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Routes API Next.js (/api/*)     │  │
│  │  → Proxy vers Backend Express    │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  lib/api.ts                      │  │
│  │  → Utilise NEXT_PUBLIC_API_URL   │  │
│  │  → http://localhost:5001/api     │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
                 │
                 │ HTTP Requests
                 ▼
┌─────────────────────────────────────────┐
│         Backend Express                 │
│         Port: 5001                      │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  /api/health                     │  │
│  │  /api/projects                   │  │
│  │  /api/jobs                       │  │
│  │  /api/hashprice-lite             │  │
│  │  /api/calculator/metrics         │  │
│  │  /api/calculator/calculate       │  │
│  │  /api/calculator/projection      │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🔌 URLs d'Accès

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Application principale |
| **Backend API** | http://localhost:5001/api | API Express complète |
| **Health Check** | http://localhost:5001/api/health | Vérification du backend |

## ⚙️ Configuration

### Fichier `.env.local`

Le fichier `.env.local` (créé automatiquement par le script) contient :

```env
# Backend Express
BACKEND_PORT=5001
BACKEND_URL=http://localhost:5001

# Frontend Next.js
PORT=3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Environnement
NODE_ENV=development

# Database
DATABASE_URL=file:./storage/dev.db

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-change-in-production
```

### Comment ça fonctionne ?

1. **Frontend (`lib/api.ts`)** :
   - Utilise `NEXT_PUBLIC_API_URL` depuis `.env.local`
   - Pointe directement vers `http://localhost:5001/api`
   - Fait des requêtes HTTP vers le backend Express

2. **Routes API Next.js (`/app/api/*`)** :
   - Utilisent `BACKEND_URL` depuis `.env.local`
   - Font des requêtes proxy vers le backend Express
   - Exemple : `/api/hashprice-lite` → `http://localhost:5001/api/hashprice-lite`

3. **Backend Express (`/backend/server.js`)** :
   - Écoute sur le port défini par `BACKEND_PORT` (5001 par défaut)
   - Expose toutes les routes API sous `/api/*`
   - Répond directement aux requêtes HTTP

## 📦 Dépendances Locales

Toutes les dépendances sont installées localement :

### Frontend
- Next.js (framework React)
- React & React DOM
- Chart.js (téléchargé localement dans `/public/js/chart.umd.min.js`)
- Prisma (base de données)
- NextAuth (authentification)

### Backend
- Express (serveur HTTP)
- better-sqlite3 (base de données SQLite)
- CORS (gestion CORS)
- UUID (génération d'IDs)

## 🔍 Vérification

### Vérifier que le backend fonctionne

```bash
curl http://localhost:5001/api/health
```

Réponse attendue :
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "local"
}
```

### Vérifier que le frontend fonctionne

```bash
curl http://localhost:3000
```

Vous devriez recevoir le HTML de la page d'accueil.

### Vérifier la connexion Frontend → Backend

Ouvrez la console du navigateur (F12) et vérifiez qu'il n'y a pas d'erreurs de connexion.

## 🛠️ Modification des Ports

Si vous voulez changer les ports, modifiez `.env.local` :

```env
BACKEND_PORT=6001
PORT=4000
BACKEND_URL=http://localhost:6001
NEXT_PUBLIC_API_URL=http://localhost:6001/api
```

Puis redémarrez les serveurs avec `./start-local.sh`.

## 🐛 Dépannage

### Le port est déjà utilisé

Si vous obtenez une erreur "port already in use" :

1. Trouvez le processus qui utilise le port :
   ```bash
   lsof -i :5001  # Pour le backend
   lsof -i :3000  # Pour le frontend
   ```

2. Tuez le processus :
   ```bash
   kill -9 <PID>
   ```

3. Ou changez le port dans `.env.local`

### Le frontend ne peut pas se connecter au backend

1. Vérifiez que le backend est démarré :
   ```bash
   curl http://localhost:5001/api/health
   ```

2. Vérifiez que `NEXT_PUBLIC_API_URL` dans `.env.local` pointe vers le bon port

3. Vérifiez les logs dans `backend.log`

### Les APIs externes ne fonctionnent pas

Certaines fonctionnalités peuvent nécessiter des APIs externes (comme l'API Debank pour les wallets). Ces APIs restent externes et nécessitent une connexion internet.

## ✅ Résumé

🎉 **Tout est maintenant hébergé en local :**

- ✅ Frontend Next.js : http://localhost:3000
- ✅ Backend Express : http://localhost:5001/api
- ✅ Chart.js : `/public/js/chart.umd.min.js` (local)
- ✅ Configuration : `.env.local` (local)
- ✅ Database : SQLite locale (`./storage/dev.db`)
- ✅ Toutes les dépendances : installées localement

**Vous pouvez développer sans connexion internet (sauf pour certaines APIs externes optionnelles).**

## 📚 Documentation

Pour plus de détails, consultez :
- `DEMARRAGE_LOCAL_COMPLET.md` - Guide complet de démarrage
- `start-local.sh` - Script de démarrage automatique
- `.env.local.example` - Exemple de configuration

