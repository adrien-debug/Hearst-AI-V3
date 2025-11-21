# 🚨 Actions Urgentes pour Corriger les Erreurs 500

## ❌ Problème actuel

Votre application Vercel retourne des erreurs 500 sur :
- `/api/stats`
- `/api/auth/session`

## 🔍 Cause principale

**SQLite ne fonctionne PAS sur Vercel !**

Vercel utilise un système de fichiers en lecture seule. Vous devez utiliser **PostgreSQL**.

---

## ✅ Actions immédiates (5 minutes)

### 1. Créer une base PostgreSQL sur Vercel

1. Allez sur **Vercel Dashboard** → votre projet
2. Cliquez sur **"Storage"** (menu de gauche)
3. Cliquez sur **"Create Database"**
4. Sélectionnez **"Postgres"**
5. Nom : `hearstai-db`
6. Cliquez sur **"Create"**

### 2. Récupérer DATABASE_URL

1. Cliquez sur votre base de données créée
2. Allez dans **"Settings"**
3. Copiez la **"Connection String"**
   - Format : `postgres://user:password@host:5432/database`

### 3. Ajouter les variables d'environnement

Dans **Settings → Environment Variables**, ajoutez/modifiez :

#### Variable 1 : DATABASE_URL
```
Key: DATABASE_URL
Value: [la connection string PostgreSQL copiée]
Environments: ✅ Production, ✅ Preview
```

#### Variable 2 : NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: [générez avec: openssl rand -base64 32]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**Générer le secret :**
```bash
openssl rand -base64 32
```

#### Variable 3 : NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app
Environments: ✅ Production, ✅ Preview
```

**Important** : Utilisez l'URL exacte de votre déploiement Vercel.

### 4. Migrer le schéma Prisma

Après avoir ajouté DATABASE_URL, migrez le schéma :

```bash
# Installer Vercel CLI si pas déjà fait
npm i -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Pousser le schéma vers PostgreSQL
npx prisma db push
```

### 5. Redéployer

1. Dans Vercel Dashboard → **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Cliquez sur **"Redeploy"**

---

## 📋 Checklist rapide

- [ ] Base PostgreSQL créée sur Vercel
- [ ] DATABASE_URL ajouté dans Environment Variables
- [ ] NEXTAUTH_SECRET généré et ajouté
- [ ] NEXTAUTH_URL configuré avec l'URL Vercel exacte
- [ ] Schéma Prisma migré (`npx prisma db push`)
- [ ] Projet redéployé

---

## 🔄 Alternative : Utiliser Supabase (gratuit)

Si vous préférez utiliser Supabase au lieu de Vercel Postgres :

1. Créez un compte sur **https://supabase.com**
2. Créez un nouveau projet
3. Allez dans **Settings → Database**
4. Copiez la **Connection String**
5. Ajoutez-la comme `DATABASE_URL` dans Vercel

---

## 🆘 Si vous avez besoin d'aide

Consultez le guide détaillé : `FIX_ERREURS_500_VERCEL.md`

---

*Action requise immédiatement pour que l'application fonctionne sur Vercel*

