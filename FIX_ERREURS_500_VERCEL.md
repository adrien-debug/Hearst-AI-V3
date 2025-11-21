# 🔧 Fix Erreurs 500 sur Vercel

## ❌ Erreurs détectées

```
GET /api/stats 500 (Internal Server Error)
GET /api/auth/session 500 (Internal Server Error)
```

## 🔍 Causes probables

1. **NEXTAUTH_SECRET manquant** → Erreur NextAuth
2. **DATABASE_URL manquant ou incorrect** → Erreur Prisma
3. **Prisma Client non généré** → Erreur lors du build

---

## ✅ Solution 1 : Vérifier les variables d'environnement

### Dans Vercel Dashboard

Allez sur : **Settings → Environment Variables**

Vérifiez que ces variables existent :

#### 1. NEXTAUTH_SECRET (OBLIGATOIRE)

```
Key: NEXTAUTH_SECRET
Value: [générez avec: openssl rand -base64 32]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**Générer le secret :**
```bash
openssl rand -base64 32
```

#### 2. NEXTAUTH_URL (OBLIGATOIRE)

```
Key: NEXTAUTH_URL
Value: https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app
Environments: ✅ Production, ✅ Preview
```

**Important** : Utilisez l'URL exacte de votre déploiement Vercel.

#### 3. DATABASE_URL (OBLIGATOIRE)

**⚠️ SQLite ne fonctionne PAS sur Vercel !**

Vous devez utiliser PostgreSQL :

```
Key: DATABASE_URL
Value: postgresql://user:password@host:5432/database
Environments: ✅ Production, ✅ Preview
```

**Options pour PostgreSQL :**
- **Vercel Postgres** (recommandé) : Storage → Create Database → Postgres
- **Railway** : Créez une base PostgreSQL
- **Supabase** : Gratuit, facile à configurer
- **Neon** : Serverless PostgreSQL

---

## ✅ Solution 2 : Configurer Vercel Postgres

### Étape 1 : Créer la base de données

1. Dans Vercel Dashboard → votre projet
2. Allez dans **"Storage"** (menu de gauche)
3. Cliquez sur **"Create Database"**
4. Sélectionnez **"Postgres"**
5. Choisissez un nom (ex: `hearstai-db`)
6. Cliquez sur **"Create"**

### Étape 2 : Récupérer DATABASE_URL

1. Une fois créée, cliquez sur votre base de données
2. Allez dans **"Settings"**
3. Copiez la **"Connection String"**
4. Elle ressemble à : `postgres://user:password@host:5432/database`

### Étape 3 : Ajouter dans Environment Variables

1. Allez dans **Settings → Environment Variables**
2. Ajoutez :
   - **Key** : `DATABASE_URL`
   - **Value** : La connection string copiée
   - **Environments** : ✅ Production, ✅ Preview

---

## ✅ Solution 3 : Migrer le schéma Prisma

Après avoir configuré PostgreSQL :

### Option A : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Pousser le schéma Prisma
npx prisma db push
```

### Option B : Via le build Vercel

Le schéma sera automatiquement migré si vous avez ajouté dans `package.json` :

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && prisma db push && next build"
  }
}
```

---

## ✅ Solution 4 : Vérifier package.json

Assurez-vous que `package.json` contient :

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma generate && next build"
  }
}
```

---

## 🔍 Vérifier les logs Vercel

Pour voir les erreurs détaillées :

1. Allez sur Vercel Dashboard → votre projet
2. Cliquez sur **"Deployments"**
3. Cliquez sur le dernier déploiement
4. Cliquez sur **"Logs"**

Ou via CLI :
```bash
vercel logs
```

---

## 📋 Checklist de correction

- [ ] ✅ NEXTAUTH_SECRET ajouté dans Vercel
- [ ] ✅ NEXTAUTH_URL configuré avec l'URL Vercel exacte
- [ ] ✅ DATABASE_URL configuré avec PostgreSQL (pas SQLite)
- [ ] ✅ Base de données PostgreSQL créée (Vercel Postgres)
- [ ] ✅ Schéma Prisma migré vers PostgreSQL
- [ ] ✅ package.json contient `postinstall: prisma generate`
- [ ] ✅ Redéployé après avoir ajouté les variables

---

## 🚀 Après avoir corrigé

1. **Redéployez** le projet :
   - Allez dans **Deployments**
   - Cliquez sur les **3 points** du dernier déploiement
   - Cliquez sur **"Redeploy"**

2. **Vérifiez** que les erreurs ont disparu :
   - Ouvrez la console du navigateur
   - Vérifiez qu'il n'y a plus d'erreurs 500

---

## 🆘 Si les erreurs persistent

### Vérifier les logs détaillés

```bash
# Via Vercel CLI
vercel logs --follow

# Ou dans le Dashboard
# Deployments → [Déploiement] → Logs
```

### Erreurs communes

1. **"Prisma Client not generated"**
   → Ajoutez `postinstall: prisma generate` dans package.json

2. **"Database connection failed"**
   → Vérifiez DATABASE_URL et que la base PostgreSQL est accessible

3. **"NextAuth secret missing"**
   → Vérifiez que NEXTAUTH_SECRET est bien configuré

---

## 📝 Variables d'environnement complètes

Voici toutes les variables nécessaires :

```env
# NextAuth (OBLIGATOIRE)
NEXTAUTH_URL=https://votre-projet.vercel.app
NEXTAUTH_SECRET=votre-secret-32-caracteres

# Database (OBLIGATOIRE - PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# DeBank (optionnel)
DEBANK_ACCESS_KEY=bd96b970a2c07a67739266c434cd0e8ea00fa656

# Node Environment
NODE_ENV=production
```

---

*Dernière mise à jour : 21 novembre 2025*

