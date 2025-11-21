# 🔐 Identifiants pour accéder à la plateforme Hearst AI

## 📧 Identifiants par défaut

```
Email: admin@hearst.ai
Mot de passe: n'importe quel mot de passe
```

**⚠️ IMPORTANT** : L'utilisateur doit exister dans la base de données !

---

## 🔴 Problème actuel

Si vous voyez l'erreur **"Email ou mot de passe incorrect"**, c'est que :

1. **L'utilisateur n'existe pas encore dans la base de données**
2. **OU la base de données n'est pas accessible**

---

## ✅ Solution : Créer l'utilisateur

### Option 1 : Via le script automatique (RECOMMANDÉ)

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
npm run create-user
```

Ce script va :
- ✅ Vérifier si l'utilisateur existe déjà
- ✅ Créer l'utilisateur `admin@hearst.ai` si nécessaire
- ✅ Afficher les identifiants

### Option 2 : Initialiser la base de données d'abord

Si la base de données n'est pas encore initialisée :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# 1. Initialiser la base de données (créer les tables)
./initialiser_database.sh

# 2. Créer l'utilisateur admin
npm run create-user
```

---

## 🔍 Vérifier si l'utilisateur existe

### En local :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
npx prisma studio
```

Ouvrez Prisma Studio et vérifiez la table `User`.

### Sur Vercel :

L'utilisateur doit être créé dans la base de données PostgreSQL de production.

---

## 📋 Étapes complètes pour déployer avec utilisateur

1. **Créer la base PostgreSQL sur Vercel** (si pas encore fait)
   - Dashboard : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage
   - Créez une base Postgres

2. **Ajouter la DATABASE_URL** :
   ```bash
   ./ajouter_database_url.sh
   ```

3. **Initialiser la base** (créer les tables) :
   ```bash
   ./initialiser_database.sh
   ```

4. **Créer l'utilisateur admin** :
   ```bash
   npm run create-user
   ```

5. **Se connecter** :
   - Email : `admin@hearst.ai`
   - Mot de passe : n'importe quel mot de passe

---

## 🔐 Comment fonctionne l'authentification

D'après le code (`lib/auth.ts`) :
- ✅ L'email doit exister dans la base de données
- ✅ **N'importe quel mot de passe fonctionne** (vérification pas encore implémentée)
- ⚠️ Si l'utilisateur n'existe pas → erreur "Email ou mot de passe incorrect"

---

## 🚀 Commandes rapides

```bash
# Créer l'utilisateur
npm run create-user

# Voir la base de données
npx prisma studio

# Initialiser la base
./initialiser_database.sh
```

---

**Une fois l'utilisateur créé, vous pourrez vous connecter avec `admin@hearst.ai` et n'importe quel mot de passe !**

