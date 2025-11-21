# 🗄️ Créer la Base de Données PostgreSQL sur Vercel

## Étapes pour créer la base de données

1. **Allez sur le Dashboard Vercel** :
   - https://vercel.com/dashboard
   - Cliquez sur le projet **hearst-ai-v3**

2. **Créez la base de données PostgreSQL** :
   - Cliquez sur l'onglet **"Storage"** dans le menu de gauche
   - Cliquez sur **"Create Database"**
   - Sélectionnez **"Postgres"**
   - Nommez-la : `hearstai-db` (ou tout autre nom)
   - Cliquez sur **"Create"**

3. **Récupérez la Connection String** :
   - Une fois créée, cliquez sur votre base de données
   - Allez dans l'onglet **"Settings"**
   - Copiez la **"Connection String"** (format : `postgresql://...`)

4. **Ajoutez la DATABASE_URL dans les variables d'environnement** :
   - Dans votre projet Vercel, allez dans **Settings → Environment Variables**
   - Cliquez sur **"Add New"**
   - Key : `DATABASE_URL`
   - Value : Collez la Connection String copiée
   - Environments : ✅ Production, ✅ Preview
   - Cliquez sur **"Save"**

5. **Redéployez** :
   - Allez dans **Deployments**
   - Cliquez sur les **3 points** du dernier déploiement
   - Cliquez sur **"Redeploy"**

## Ou via CLI

Une fois que vous avez la Connection String, ajoutez-la avec :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
echo "postgresql://..." | vercel env add DATABASE_URL production
echo "postgresql://..." | vercel env add DATABASE_URL preview
```

Puis redéployez :
```bash
vercel --prod
```

