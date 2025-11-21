# 🚀 Déploiement Rapide - Hearst AI V3

## ✅ Ce qui est déjà fait

- ✅ Projet lié à Vercel : `hearst-ai-v3`
- ✅ Variables d'environnement configurées :
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL` 
  - `DEBANK_ACCESS_KEY`

## 🔴 Ce qui reste à faire (2 minutes)

### Étape 1 : Créer la base de données PostgreSQL

1. **Dans le dashboard Vercel** (déjà ouvert) :
   - Cliquez sur **"Storage"** dans le menu de gauche
   - Cliquez sur **"Create Database"**
   - Sélectionnez **"Postgres"**
   - Nommez-la : `hearstai-db`
   - Cliquez sur **"Create"**

### Étape 2 : Récupérer la Connection String

1. Cliquez sur votre base de données créée
2. Allez dans l'onglet **"Settings"**
3. Copiez la **"Connection String"** (format : `postgresql://user:password@host:port/database`)

### Étape 3 : Ajouter la DATABASE_URL

Exécutez ce script :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./ajouter_database_url.sh
```

Le script vous demandera la Connection String et configurera tout automatiquement, puis redéploiera.

## 🎯 Alternative : Via le Dashboard

1. Allez dans **Settings → Environment Variables**
2. Cliquez sur **"Add New"**
3. Key : `DATABASE_URL`
4. Value : Collez votre Connection String
5. Environments : ✅ Production, ✅ Preview
6. Cliquez sur **"Save"**
7. Allez dans **Deployments** → **3 points** → **Redeploy**

## ✅ Vérification

Une fois déployé, votre application sera accessible sur :
- **Production** : https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app

Pour vérifier les logs :
```bash
vercel logs
```

