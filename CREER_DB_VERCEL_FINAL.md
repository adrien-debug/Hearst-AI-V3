# 🗄️ Créer la Base de Données PostgreSQL sur Vercel - GUIDE FINAL

## ⚠️ Problème actuel

La DATABASE_URL Supabase actuelle ne fonctionne pas (erreur "no such user").

## ✅ Solution : Créer une base PostgreSQL sur Vercel

### Étape 1 : Créer la base de données

1. **Le dashboard Vercel Storage devrait être ouvert dans votre navigateur**
   - Si ce n'est pas le cas : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage

2. **Créer la base PostgreSQL** :
   - Cliquez sur **"Create Database"**
   - Sélectionnez **"Postgres"**
   - Nommez-la : `hearstai-db`
   - Cliquez sur **"Create"**

### Étape 2 : Récupérer la Connection String

1. Cliquez sur votre base de données créée (`hearstai-db`)
2. Allez dans l'onglet **"Settings"**
3. Copiez la **"Connection String"** (format : `postgresql://...`)

### Étape 3 : Mettre à jour la DATABASE_URL

Une fois que vous avez la Connection String, exécutez :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./ajouter_database_url.sh
```

Le script vous demandera la Connection String et :
- ✅ Supprimera l'ancienne DATABASE_URL (Supabase)
- ✅ Ajoutera la nouvelle DATABASE_URL (Vercel Postgres) pour Production
- ✅ Ajoutera la nouvelle DATABASE_URL pour Preview
- ✅ Redéploiera automatiquement

## 🚀 Alternative : Via le Dashboard

1. Allez dans **Settings → Environment Variables**
2. Trouvez `DATABASE_URL` (Production et Preview)
3. Cliquez sur **"Remove"** pour les supprimer
4. Cliquez sur **"Add New"**
5. Key : `DATABASE_URL`
6. Value : Collez la Connection String Vercel Postgres
7. Environments : ✅ Production, ✅ Preview
8. Cliquez sur **"Save"**
9. Allez dans **Deployments** → **3 points** → **Redeploy**

## ✅ Après le déploiement

Votre application sera accessible sur :
- **Production** : https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app

Pour vérifier les logs :
```bash
vercel logs
```

