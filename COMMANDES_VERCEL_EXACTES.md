# 📋 Commandes Exactes pour Vercel

## ✅ Projet déjà lié à Vercel

Le projet est maintenant lié : `adrien-nejkovics-projects/hearst-ai`

---

## 🔑 Variables à ajouter

### Option 1 : Via Vercel Dashboard (RECOMMANDÉ)

1. Allez sur **https://vercel.com/dashboard**
2. Cliquez sur **"hearst-ai"**
3. **Settings → Environment Variables**
4. Cliquez sur **"Add New"**

Ajoutez ces 4 variables :

#### 1. NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: mdO/+tjnQEHXeii1giZLAq/OVwJmNPD2BE+tYz6bwCk=
Environments: ✅ Production, ✅ Preview, ✅ Development
```

#### 2. NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app
Environments: ✅ Production, ✅ Preview
```

#### 3. DEBANK_ACCESS_KEY
```
Key: DEBANK_ACCESS_KEY
Value: bd96b970a2c07a67739266c434cd0e8ea00fa656
Environments: ✅ Production, ✅ Preview
```

#### 4. DATABASE_URL
```
Key: DATABASE_URL
Value: [À créer après PostgreSQL sur Vercel]
Environments: ✅ Production, ✅ Preview
```

---

### Option 2 : Via Vercel CLI

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# NEXTAUTH_SECRET
echo "mdO/+tjnQEHXeii1giZLAq/OVwJmNPD2BE+tYz6bwCk=" | vercel env add NEXTAUTH_SECRET production

# NEXTAUTH_URL
echo "https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app" | vercel env add NEXTAUTH_URL production

# DEBANK_ACCESS_KEY
echo "bd96b970a2c07a67739266c434cd0e8ea00fa656" | vercel env add DEBANK_ACCESS_KEY production
```

---

## 🗄️ Créer PostgreSQL

1. **Vercel Dashboard** → votre projet
2. **Storage** → **Create Database**
3. Sélectionnez **Postgres**
4. Nom : `hearstai-db`
5. Cliquez sur **Create**

Ensuite, récupérez la **Connection String** et ajoutez-la comme `DATABASE_URL`.

---

## 🔄 Migrer le schéma

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# Générer Prisma Client
npx prisma generate

# Migrer vers PostgreSQL
npx prisma db push
```

---

## 🚀 Redéployer

### Via Dashboard
1. **Deployments** → dernier déploiement
2. **3 points** → **Redeploy**

### Via CLI
```bash
vercel --prod
```

---

## ✅ Vérification

```bash
# Voir les variables
vercel env ls

# Voir les logs
vercel logs
```

---

*Toutes les valeurs sont prêtes à être copiées !*

