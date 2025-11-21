# 🚨 URGENT : Configurer DATABASE_URL

## ❌ Problème détecté

Le `DATABASE_URL` n'est pas au format PostgreSQL. Il doit commencer par `postgresql://` ou `postgres://`.

---

## ✅ Solution : Créer PostgreSQL sur Vercel

### Étape 1 : Créer la base de données

1. Allez sur **https://vercel.com/dashboard**
2. Cliquez sur votre projet **"hearst-ai"**
3. Cliquez sur **"Storage"** (menu de gauche)
4. Cliquez sur **"Create Database"**
5. Sélectionnez **"Postgres"**
6. Nom : `hearstai-db` (ou autre nom)
7. Cliquez sur **"Create"**

### Étape 2 : Récupérer la Connection String

1. Cliquez sur la base de données créée
2. Allez dans **"Settings"**
3. Trouvez la section **"Connection String"**
4. Copiez la chaîne complète

**Format attendu :**
```
postgresql://default:password@host.region.vercel-storage.com:5432/verceldb
```

### Étape 3 : Ajouter dans Environment Variables

1. Allez dans **Settings → Environment Variables**
2. Cliquez sur **"Add New"**
3. Remplissez :
   - **Key** : `DATABASE_URL`
   - **Value** : La connection string PostgreSQL copiée
   - **Environments** : ✅ Production, ✅ Preview
4. Cliquez sur **"Save"**

---

## 🔄 Après avoir ajouté DATABASE_URL

### Option 1 : Migration locale

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# Récupérer les variables depuis Vercel
vercel env pull .env.vercel

# Exporter DATABASE_URL
export DATABASE_URL=$(grep DATABASE_URL .env.vercel | cut -d'=' -f2-)

# Migrer le schéma
npx prisma db push
```

### Option 2 : Migration automatique lors du build

Vercel migrera automatiquement lors du prochain déploiement si vous avez ajouté dans `package.json` :

```json
{
  "scripts": {
    "build": "prisma generate && prisma db push && next build"
  }
}
```

---

## ✅ Vérification

Après avoir ajouté DATABASE_URL, vérifiez :

```bash
vercel env ls
```

Vous devriez voir `DATABASE_URL` avec une valeur qui commence par `postgresql://`.

---

## 🚀 Redéployer

Une fois DATABASE_URL ajouté :

1. **Via Dashboard** : Deployments → Redeploy
2. **Via CLI** : `vercel --prod`

---

*C'est la dernière étape pour que tout fonctionne !*

