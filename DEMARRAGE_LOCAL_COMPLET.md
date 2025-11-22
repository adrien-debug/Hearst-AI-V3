# 🚀 Guide de Démarrage Local - Frontend + Backend

Ce guide explique comment démarrer le frontend Next.js et le backend Express en local sur votre machine.

## 📋 Prérequis

- **Node.js** >= 18.x installé
- **npm** installé
- Accès au terminal

## 🎯 Démarrage Rapide

### Option 1 : Script Automatique (Recommandé)

```bash
# Depuis la racine du projet
./start-local.sh
```

Ce script va :
1. ✅ Vérifier les dépendances
2. ✅ Créer `.env.local` si nécessaire
3. ✅ Démarrer le backend Express sur le port **5001**
4. ✅ Démarrer le frontend Next.js sur le port **3000**
5. ✅ Vérifier que les deux serveurs fonctionnent

### Option 2 : Démarrage Manuel

#### 1. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Copier depuis l'exemple
cp .env.local.example .env.local
```

Ou créez-le manuellement avec ce contenu :

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

#### 2. Installer les dépendances

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

#### 3. Générer Prisma Client (si utilisé)

```bash
npx prisma generate
```

#### 4. Démarrer le Backend Express

```bash
cd backend
NODE_ENV=development BACKEND_PORT=5001 node server.js
```

Le backend sera accessible sur : **http://localhost:5001/api**

#### 5. Démarrer le Frontend Next.js

Dans un nouveau terminal :

```bash
# Depuis la racine du projet
NODE_ENV=development PORT=3000 NEXT_PUBLIC_API_URL=http://localhost:5001/api npm run dev
```

Le frontend sera accessible sur : **http://localhost:3000**

## 🔌 URLs d'Accès

Une fois démarré, vous pouvez accéder à :

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Application Next.js |
| **Backend API** | http://localhost:5001/api | API Express |
| **Health Check** | http://localhost:5001/api/health | Vérification du backend |
| **API Root** | http://localhost:5001/api | Documentation des endpoints |

## 📊 Structure des Endpoints

### Backend Express (Port 5001)

- `GET /api/health` - Health check
- `GET /api` - Liste des endpoints disponibles
- `GET /api/projects` - Liste des projets
- `GET /api/jobs` - Liste des jobs
- `GET /api/versions` - Liste des versions
- `GET /api/stats` - Statistiques globales
- `GET /api/hashprice-lite` - Métriques Bitcoin
- `GET /api/calculator/metrics` - Métriques du calculateur
- `POST /api/calculator/calculate` - Calcul de rentabilité
- `GET /api/calculator/projection` - Projections de rentabilité

### Frontend Next.js (Port 3000)

- `/` - Page d'accueil (Dashboard)
- `/calculator` - Calculateur de rentabilité
- `/wallet-scraper` - Analyseur de wallet
- `/api/*` - Routes API Next.js (proxies vers le backend Express si nécessaire)

## 🔧 Configuration

### Variables d'Environnement

Le fichier `.env.local` contient toutes les variables nécessaires :

- **BACKEND_PORT** : Port du backend Express (défaut: 5001)
- **BACKEND_URL** : URL complète du backend (défaut: http://localhost:5001)
- **PORT** : Port du frontend Next.js (défaut: 3000)
- **NEXT_PUBLIC_API_URL** : URL de l'API utilisée par le client (défaut: http://localhost:5001/api)
- **NODE_ENV** : Environnement (development/production)

### Modification des Ports

Si vous voulez changer les ports, modifiez `.env.local` :

```env
BACKEND_PORT=6001
PORT=4000
BACKEND_URL=http://localhost:6001
NEXT_PUBLIC_API_URL=http://localhost:6001/api
```

Puis redémarrez les serveurs.

## 🐛 Dépannage

### Le backend ne démarre pas

1. Vérifiez que le port 5001 n'est pas déjà utilisé :
   ```bash
   lsof -i :5001
   ```

2. Vérifiez les logs dans `backend.log`

3. Vérifiez que les dépendances sont installées :
   ```bash
   cd backend
   npm install
   ```

### Le frontend ne peut pas se connecter au backend

1. Vérifiez que le backend est bien démarré :
   ```bash
   curl http://localhost:5001/api/health
   ```

2. Vérifiez que `NEXT_PUBLIC_API_URL` dans `.env.local` pointe vers le bon port

3. Vérifiez que CORS est bien configuré dans `backend/server.js`

### Les routes API Next.js ne fonctionnent pas

Les routes API Next.js (dans `/app/api/*`) peuvent être configurées pour proxy vers le backend Express. Vérifiez que `BACKEND_URL` est bien défini dans `.env.local`.

## 📝 Logs

Les logs sont disponibles dans :
- **Backend** : `backend.log` (si démarré avec le script)
- **Frontend** : `frontend.log` (si démarré avec le script)

Ou directement dans le terminal si démarré manuellement.

## 🛑 Arrêter les Serveurs

Si vous utilisez le script `start-local.sh`, appuyez sur **Ctrl+C** pour arrêter tous les serveurs.

Si vous avez démarré manuellement :
1. Arrêtez le frontend (Ctrl+C dans le terminal Next.js)
2. Arrêtez le backend (Ctrl+C dans le terminal Express)

## ✅ Vérification

Pour vérifier que tout fonctionne :

```bash
# Test du backend
curl http://localhost:5001/api/health

# Test du frontend
curl http://localhost:3000

# Test d'une route API via le frontend
curl http://localhost:3000/api/health
```

## 🎉 C'est Prêt !

Vous pouvez maintenant :
- ✅ Accéder au frontend sur http://localhost:3000
- ✅ Utiliser toutes les fonctionnalités de l'application
- ✅ Toutes les API sont hébergées en local
- ✅ Développer sans connexion internet (sauf pour certaines APIs externes)
