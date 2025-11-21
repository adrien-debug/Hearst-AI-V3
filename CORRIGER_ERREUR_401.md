# 🔴 Correction Erreur 401 - Authentification

## Problème

L'erreur `401` sur `/api/auth/callback/credentials` signifie que :
- ❌ L'utilisateur `admin@hearst.ai` n'existe pas dans la base de données
- ❌ OU la base de données n'est pas accessible

## ✅ Solution

### Étape 1 : Vérifier la base de données

La DATABASE_URL Supabase ne fonctionne pas. Il faut créer une base PostgreSQL sur Vercel.

### Étape 2 : Créer la base PostgreSQL sur Vercel

1. Allez sur : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage
2. Cliquez sur "Create Database" → "Postgres"
3. Nommez-la `hearstai-db`
4. Créez-la
5. Ouvrez la base → Settings → Copiez la "Connection String"

### Étape 3 : Configurer la DATABASE_URL

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./ajouter_database_url.sh
```

Collez la Connection String quand demandé.

### Étape 4 : Initialiser la base et créer l'utilisateur

```bash
# Initialiser la base (créer les tables)
./initialiser_database.sh

# Créer l'utilisateur admin
npm run create-user
```

### Étape 5 : Redéployer

```bash
vercel --prod
```

---

## 🔍 Vérification

Après avoir créé l'utilisateur, vous devriez pouvoir vous connecter avec :
- Email : `admin@hearst.ai`
- Mot de passe : n'importe quel mot de passe

L'erreur 401 devrait disparaître.

---

## 📋 Script automatique

Pour tout faire en une fois :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./creer_utilisateur_complet.sh
```

Ce script fait tout automatiquement une fois que vous avez la Connection String Vercel.

