# 🚀 Guide de Déploiement Local - HearstAI

## Déploiement automatique (Recommandé)

Un script automatise tout le processus de déploiement local :

```bash
./deployer_local.sh
```

Ce script va :
1. ✅ Configurer automatiquement `.env.local`
2. ✅ Créer le dossier `storage/` pour SQLite
3. ✅ Installer toutes les dépendances (frontend + backend)
4. ✅ Générer le Prisma Client
5. ✅ Configurer la base de données
6. ✅ Démarrer le backend (port 4000)
7. ✅ Démarrer le frontend (port 6001)

## Accès après déploiement

- **Frontend** : http://localhost:6001
- **Backend API** : http://localhost:4000/api
- **Health Check** : http://localhost:4000/api/health

## Déploiement manuel

Si vous préférez faire les étapes manuellement :

### 1. Configuration de l'environnement

Créez `.env.local` à la racine :

```env
# Base de données PostgreSQL (le schéma Prisma utilise PostgreSQL)
# Option 1: Supabase (recommandé)
DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"

# Option 2: PostgreSQL local
# DATABASE_URL="postgresql://user:password@localhost:5432/hearstai?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:6001"
NEXTAUTH_SECRET="votre-secret-ici"

# Environnement
NODE_ENV="development"
```

**⚠️ Important** : Le schéma Prisma actuel utilise PostgreSQL. SQLite n'est pas compatible sans modifications importantes du schéma.

Générer un secret NextAuth :
```bash
openssl rand -base64 32
```

### 2. Installation des dépendances

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Configuration de la base de données

```bash
# Créer le dossier storage
mkdir -p storage

# Générer Prisma Client
npx prisma generate

# Créer les tables
npx prisma db push --accept-data-loss
```

### 4. Démarrer les serveurs

**Terminal 1 - Backend :**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend :**
```bash
npm run dev
```

## Vérification

### Vérifier que les serveurs fonctionnent

```bash
# Backend
curl http://localhost:4000/api/health

# Frontend
curl http://localhost:6001
```

### Voir les logs

```bash
# Backend
tail -f backend.log

# Frontend
tail -f frontend.log
```

## Arrêter les serveurs

Si vous utilisez le script automatique, appuyez sur `Ctrl+C`.

Sinon, arrêtez manuellement :
```bash
pkill -f "next dev"
pkill -f "node.*server.js"
```

## Dépannage

### Port déjà utilisé

```bash
# Trouver le processus
lsof -i :4000
lsof -i :6001

# Arrêter le processus
kill -9 <PID>
```

### Erreur de base de données

Si vous utilisez SQLite :
- Vérifiez que le dossier `storage/` existe
- Vérifiez les permissions d'écriture

Si vous utilisez PostgreSQL :
- Vérifiez que PostgreSQL est démarré
- Vérifiez les credentials dans `DATABASE_URL`

### Erreur Prisma

```bash
# Régénérer le client
npx prisma generate

# Réinitialiser la base de données
npx prisma db push --accept-data-loss
```

### Réinstaller les dépendances

```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
cd ..
```

## Structure des ports

- **Port 4000** : Backend API (Express)
- **Port 6001** : Frontend Next.js

## Prochaines étapes

Une fois l'application démarrée :

1. Accédez à http://localhost:6001
2. Créez un compte utilisateur
3. Explorez les fonctionnalités

## Support

Pour plus d'informations :
- `START_LOCAL.md` - Guide détaillé de démarrage
- `README.md` - Documentation générale
- Logs dans `backend.log` et `frontend.log`

