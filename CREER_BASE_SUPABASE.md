# 🗄️ Créer une base Supabase via Vercel

## 📋 Configuration recommandée

Sur la page "Create Database" que vous voyez :

### 1. Primary Region
- ✅ Laissez par défaut : **"Washington, D.C., USA (East)"**
- C'est la région la plus proche et performante

### 2. Public Environment Variables Prefix
- ✅ Laissez par défaut : **"NEXT_PUBLIC_"**
- C'est le préfixe standard pour Next.js

### 3. Installation Plan
- ✅ Sélectionnez : **"Supabase Free Plan"** (déjà sélectionné)
- C'est suffisant pour démarrer

### 4. Cliquez sur "Continue"

---

## ⚠️ IMPORTANT

Après avoir créé la base Supabase :

1. **Récupérez la Connection String** depuis le dashboard Supabase
2. **Remplacez la DATABASE_URL** dans Vercel :
   ```bash
   cd /Users/adrienbeyondcrypto/Desktop/HearstAI
   ./ajouter_database_url.sh
   ```
3. **Initialisez la base** :
   ```bash
   ./initialiser_database.sh
   ```
4. **Créez l'utilisateur** :
   ```bash
   npm run create-user
   ```

---

## 🔄 Alternative : Base PostgreSQL Vercel (RECOMMANDÉ)

Si vous préférez une base PostgreSQL directement sur Vercel (plus simple) :

1. **Annulez** cette création Supabase
2. Allez sur : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage
3. Cliquez sur **"Create Database"** → **"Postgres"**
4. Créez la base Vercel Postgres

**Avantages Vercel Postgres** :
- ✅ Intégration native avec Vercel
- ✅ Variables d'environnement automatiques
- ✅ Plus simple à gérer
- ✅ Pas de configuration supplémentaire

---

**Vous pouvez continuer avec Supabase si vous préférez, mais Vercel Postgres est plus simple !**

