# 🎯 COMMANDES EXACTES À EXÉCUTER

**Copiez-collez ces commandes dans votre terminal**

---

## 📋 ÉTAPE 1 : PRÉPARATION (Déjà fait ✅)

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./preparer_tout.sh
```

---

## 📋 ÉTAPE 2 : OBTENIR L'URL SUPABASE

**Action manuelle dans le navigateur :**

1. Allez sur : https://supabase.com/dashboard
2. Connectez-vous
3. Sélectionnez votre projet
4. Settings → Database → Connection String → URI
5. **COPIEZ** l'URL complète

**Format attendu :**
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

---

## 📋 ÉTAPE 3 : CORRIGER DATABASE_URL DANS VERCEL

### Option A : Via Vercel Dashboard (Recommandé)

1. Allez sur : https://vercel.com/dashboard
2. Cliquez sur votre projet
3. Settings → Environment Variables
4. Trouvez DATABASE_URL → Edit
5. Collez l'URL Supabase
6. Save

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# Se connecter
vercel login

# Lier le projet (si pas déjà fait)
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
vercel link

# Ajouter DATABASE_URL (remplacez [URL_SUPABASE] par la vraie URL)
echo "[URL_SUPABASE]" | vercel env add DATABASE_URL production
echo "[URL_SUPABASE]" | vercel env add DATABASE_URL preview
echo "[URL_SUPABASE]" | vercel env add DATABASE_URL development
```

**Exemple avec une vraie URL :**
```bash
echo "postgresql://postgres.abc123:password@aws-0-eu-west-1.pooler.supabase.com:5432/postgres" | vercel env add DATABASE_URL production
```

---

## 📋 ÉTAPE 4 : VÉRIFIER LES AUTRES VARIABLES

### Vérifier NEXTAUTH_URL

```bash
# Remplacez [VOTRE_URL] par votre URL Vercel
echo "https://votre-projet.vercel.app" | vercel env add NEXTAUTH_URL production
echo "https://votre-projet.vercel.app" | vercel env add NEXTAUTH_URL preview
echo "http://localhost:6001" | vercel env add NEXTAUTH_URL development
```

### Vérifier NEXTAUTH_SECRET

```bash
# Utilisez le secret généré dans NEXTAUTH_SECRET.txt
NEXTAUTH_SECRET=$(cat NEXTAUTH_SECRET.txt)
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET production
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET preview
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET development
```

### Vérifier toutes les variables

```bash
vercel env ls
```

---

## 📋 ÉTAPE 5 : REDÉPLOYER

### Via Vercel CLI

```bash
vercel --prod
```

### Via Vercel Dashboard

1. Allez sur : https://vercel.com/dashboard
2. Votre projet → Deployments
3. Dernier déploiement → ⋯ → Redeploy

---

## 📋 ÉTAPE 6 : VÉRIFIER

### Tester les endpoints

```bash
# Remplacez [VOTRE_URL] par votre URL Vercel
curl https://[VOTRE_URL]/api/health
curl https://[VOTRE_URL]/api/customers
curl https://[VOTRE_URL]/api/collateral
```

### Vérifier les logs

```bash
vercel logs
```

---

## 🆘 EN CAS DE PROBLÈME

### Erreur "Cannot connect to database"

```bash
# Vérifier que DATABASE_URL est correct
vercel env ls | grep DATABASE_URL

# Vérifier le format
vercel env pull .env.vercel
cat .env.vercel | grep DATABASE_URL
```

### Erreur lors du déploiement

```bash
# Voir les logs de build
vercel logs --follow
```

### Réinitialiser une variable

```bash
# Supprimer
vercel env rm DATABASE_URL production

# Réajouter
echo "[URL]" | vercel env add DATABASE_URL production
```

---

## ✅ CHECKLIST RAPIDE

- [ ] URL Supabase copiée
- [ ] DATABASE_URL corrigé dans Vercel
- [ ] NEXTAUTH_URL vérifié
- [ ] NEXTAUTH_SECRET ajouté
- [ ] Projet redéployé
- [ ] Tests effectués

---

**Temps total : ~10 minutes**

