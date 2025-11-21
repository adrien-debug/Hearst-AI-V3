# 📋 Commandes Terminal - Créer l'utilisateur

## 🚀 Option 1 : Script automatique complet (RECOMMANDÉ)

Une fois que vous avez créé la base PostgreSQL sur Vercel et copié la Connection String :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./creer_utilisateur_complet.sh
```

Ce script fait tout automatiquement :
- ✅ Ajoute la DATABASE_URL
- ✅ Initialise la base (crée les tables)
- ✅ Crée l'utilisateur admin@hearst.ai

---

## 🔧 Option 2 : Étapes manuelles

Si vous préférez faire étape par étape :

```bash
# 1. Aller dans le dossier
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# 2. Ajouter la DATABASE_URL (collez la Connection String quand demandé)
./ajouter_database_url.sh

# 3. Initialiser la base de données (créer les tables)
./initialiser_database.sh

# 4. Créer l'utilisateur admin
npm run create-user
```

---

## 📋 Option 3 : Si vous avez déjà une base Vercel configurée

Si la DATABASE_URL Vercel est déjà configurée et fonctionne :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# Récupérer la DATABASE_URL depuis Vercel
vercel env pull .env.vercel

# Exporter la DATABASE_URL
export DATABASE_URL=$(grep DATABASE_URL .env.vercel | cut -d'=' -f2- | tr -d '"')

# Générer Prisma Client
npx prisma generate

# Initialiser la base (si pas encore fait)
npx prisma db push --accept-data-loss

# Créer l'utilisateur
npm run create-user
```

---

## ✅ Vérification

Après avoir créé l'utilisateur, vous pouvez vous connecter avec :

```
Email: admin@hearst.ai
Mot de passe: n'importe quel mot de passe
```

URL de connexion :
```
https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app/auth/signin
```

---

## 🔍 Vérifier que l'utilisateur existe

```bash
# Ouvrir Prisma Studio pour voir la base de données
npx prisma studio
```

Puis vérifiez la table `User` dans l'interface web.

