# 🚀 DÉMARRAGE EN LOCAL - HearstAI

## ⚡ Guide rapide pour lancer l'application localement

### 1️⃣ Installation des dépendances

```bash
npm install
```

**Temps estimé** : 2-5 minutes

---

### 2️⃣ Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
touch .env.local
```

Puis ajoutez le contenu suivant :

```env
# Database
# Option 1: SQLite (développement rapide - recommandé pour commencer)
DATABASE_URL="file:./storage/hearstai.db"

# Option 2: PostgreSQL (production)
# DATABASE_URL="postgresql://user:password@localhost:5432/hearstai?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# Claude API (optionnel pour le moment)
CLAUDE_API_KEY="your-claude-api-key-here"

# Node Environment
NODE_ENV="development"
```

**Générer le secret NextAuth.js** :

```bash
openssl rand -base64 32
```

Copiez le résultat et remplacez `your-secret-key-here-generate-with-openssl-rand-base64-32` dans `.env.local`.

---

### 3️⃣ Configuration de la base de données

#### Option A : SQLite (Recommandé pour commencer)

1. **Vérifier que le schema Prisma utilise SQLite** :

Ouvrez `prisma/schema.prisma` et vérifiez :

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Si c'est `postgresql`, changez-le en `sqlite`.

2. **Générer le client Prisma** :

```bash
npm run db:generate
```

3. **Créer les tables** :

```bash
npm run db:push
```

#### Option B : PostgreSQL

1. **Créer la base de données** :

```sql
CREATE DATABASE hearstai;
```

2. **Vérifier que le schema Prisma utilise PostgreSQL** :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. **Générer et pousser** :

```bash
npm run db:generate
npm run db:push
```

---

### 4️⃣ Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur : **http://localhost:3000**

---

## ✅ Vérification

### Checklist de vérification

- [ ] Dépendances installées (`npm install` terminé sans erreur)
- [ ] Fichier `.env.local` créé avec toutes les variables
- [ ] `NEXTAUTH_SECRET` généré et configuré
- [ ] Base de données configurée (SQLite ou PostgreSQL)
- [ ] Client Prisma généré (`npm run db:generate`)
- [ ] Tables créées (`npm run db:push`)
- [ ] Serveur de développement lancé (`npm run dev`)
- [ ] Application accessible sur http://localhost:3000

---

## 🐛 Dépannage

### Erreur : "Prisma Client not generated"

```bash
npm run db:generate
```

### Erreur : "Database connection failed"

**Pour SQLite** :
- Vérifier que le dossier `storage/` existe
- Vérifier les permissions d'écriture

**Pour PostgreSQL** :
- Vérifier que PostgreSQL est lancé : `pg_isready`
- Vérifier les credentials dans `DATABASE_URL`
- Vérifier que la base de données existe

### Erreur : "NEXTAUTH_SECRET is missing"

```bash
openssl rand -base64 32
```

Copiez le résultat dans `.env.local`.

### Erreur : "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur : "Port 3000 already in use"

Changez le port dans `package.json` :

```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

Ou tuez le processus sur le port 3000 :

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📋 Commandes utiles

```bash
# Développement
npm run dev              # Lancer le serveur de dev (port 3000)

# Base de données
npm run db:generate      # Générer le client Prisma
npm run db:push          # Pousser le schema vers la DB
npm run db:migrate       # Créer une migration
npm run db:studio        # Ouvrir Prisma Studio (interface graphique)

# Build
npm run build            # Build de production
npm start                # Lancer en mode production

# Linting
npm run lint             # Vérifier le code
```

---

## 🎯 Première utilisation

Une fois l'application lancée :

1. **Accéder à l'application** : http://localhost:3000

2. **Créer un compte** (si pages d'auth créées) :
   - Aller sur `/auth/signup`
   - Créer un compte

3. **Se connecter** :
   - Aller sur `/auth/signin`
   - Se connecter

4. **Explorer** :
   - Dashboard : `/`
   - Projects : `/projects`
   - Jobs : `/jobs`

---

## 📚 Documentation

- `QUICKSTART.md` - Guide de démarrage rapide
- `ARCHITECTURE.md` - Architecture complète
- `README_PHASE1.md`, `README_PHASE2.md`, `README_PHASE3.md` - Docs par phase

---

**Besoin d'aide ?** Consultez les autres fichiers de documentation ou vérifiez les logs dans la console.




