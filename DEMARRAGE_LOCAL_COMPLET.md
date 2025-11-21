# 🚀 DÉMARRAGE LOCAL COMPLET - HearstAI

**Guide pour héberger l'application en local**

---

## ⚡ DÉMARRAGE RAPIDE (1 commande)

```bash
./demarrer_local.sh
```

Ce script fait tout automatiquement :
- ✅ Configure `.env.local`
- ✅ Installe les dépendances
- ✅ Génère Prisma Client
- ✅ Configure la base de données
- ✅ Démarre le serveur

**L'application sera accessible sur :** http://localhost:6001

---

## 📋 DÉMARRAGE MANUEL (étape par étape)

### Étape 1 : Configuration de l'environnement

Créez ou modifiez `.env.local` :

```env
# Base de données
# Option 1 : SQLite (local, rapide)
DATABASE_URL="file:./storage/hearstai.db"

# Option 2 : PostgreSQL Supabase (production)
# DATABASE_URL="postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres"

# NextAuth.js
NEXTAUTH_URL="http://localhost:6001"
NEXTAUTH_SECRET="votre-secret-ici"

# Node Environment
NODE_ENV="development"
```

**Générer NEXTAUTH_SECRET :**
```bash
openssl rand -base64 32
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

### Étape 3 : Générer Prisma Client

```bash
npx prisma generate
```

### Étape 4 : Configurer la base de données

**Pour SQLite :**
```bash
mkdir -p storage
npx prisma db push
```

**Pour PostgreSQL :**
```bash
npx prisma db push
```

### Étape 5 : Démarrer le serveur

```bash
npm run dev
```

L'application sera accessible sur : **http://localhost:6001**

---

## 🗄️ CHOIX DE LA BASE DE DONNÉES

### Option 1 : SQLite (Recommandé pour développement local)

**Avantages :**
- ✅ Rapide à configurer
- ✅ Pas besoin de serveur externe
- ✅ Parfait pour le développement

**Configuration :**
```env
DATABASE_URL="file:./storage/hearstai.db"
```

**Après configuration :**
```bash
mkdir -p storage
npx prisma db push
```

### Option 2 : PostgreSQL Supabase (Production)

**Avantages :**
- ✅ Même base que la production
- ✅ Test avec les vraies données

**Configuration :**
```env
DATABASE_URL="postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres"
```

**Après configuration :**
```bash
npx prisma db push
```

---

## 🧪 TESTS LOCAUX

Une fois le serveur démarré, testez :

1. **Page d'accueil :**
   ```
   http://localhost:6001
   ```

2. **Health Check :**
   ```
   http://localhost:6001/api/health
   ```
   Devrait retourner : `{"status":"ok","timestamp":"..."}`

3. **API Customers :**
   ```
   http://localhost:6001/api/customers
   ```
   Devrait retourner : `{"customers":[...]}`

4. **API Collateral :**
   ```
   http://localhost:6001/api/collateral
   ```
   Devrait retourner : `{"clients":[...]}`

---

## 🛠️ COMMANDES UTILES

### Arrêter le serveur
Appuyez sur `Ctrl+C` dans le terminal

### Voir les logs Prisma
```bash
npx prisma studio
```
Ouvre une interface graphique pour voir la base de données sur http://localhost:5555

### Réinitialiser la base de données
```bash
# Pour SQLite
rm storage/hearstai.db
npx prisma db push

# Pour PostgreSQL
npx prisma migrate reset
```

### Vérifier la configuration
```bash
./verifier_config.sh
```

---

## 🆘 EN CAS DE PROBLÈME

### Erreur "Cannot connect to database"
- Vérifiez que DATABASE_URL est correct dans `.env.local`
- Pour PostgreSQL, vérifiez que la base est accessible
- Pour SQLite, vérifiez que le dossier `storage` existe

### Erreur "Prisma Client not generated"
```bash
npx prisma generate
```

### Erreur "Port 6001 already in use"
Changez le port dans `package.json` :
```json
"dev": "next dev -p 6002"
```

### Erreur de dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 RÉSUMÉ

**Commande unique pour tout démarrer :**
```bash
./demarrer_local.sh
```

**L'application sera sur :** http://localhost:6001

**Temps de démarrage :** 1-2 minutes

---

**Tout est prêt pour le développement local ! 🚀**

