# 🚀 Instructions Finales - Déploiement Hearst AI V3

## ✅ Ce qui est déjà fait

- ✅ Projet Vercel créé et lié : `hearst-ai-v3`
- ✅ Variables d'environnement configurées :
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
  - `DEBANK_ACCESS_KEY`
- ✅ Dashboard Vercel Storage ouvert dans votre navigateur

## 🔴 Action requise (2 minutes)

### Créer la base de données PostgreSQL

1. **Dans le navigateur** (dashboard Vercel Storage déjà ouvert) :
   - Cliquez sur **"Create Database"**
   - Sélectionnez **"Postgres"**
   - Nommez-la : `hearstai-db`
   - Cliquez sur **"Create"**

2. **Récupérer la Connection String** :
   - Cliquez sur votre base de données créée
   - Allez dans **"Settings"**
   - Copiez la **"Connection String"** (format : `postgresql://...`)

3. **Configurer automatiquement** :
   ```bash
   cd /Users/adrienbeyondcrypto/Desktop/HearstAI
   ./ajouter_database_url.sh
   ```
   - Collez la Connection String quand demandé
   - Le script configurera tout et redéploiera automatiquement

## ✅ Résultat

Une fois terminé, votre application sera accessible sur :
- **Production** : https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app

## 📊 Vérification

Pour vérifier les logs après le déploiement :
```bash
vercel logs
```

Pour voir les variables d'environnement :
```bash
vercel env ls
```

