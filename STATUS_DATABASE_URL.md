# 📊 STATUS DATABASE_URL - HearstAI

**Date :** 21 novembre 2025

---

## 🔍 ÉTAT ACTUEL

### DATABASE_URL dans Vercel

**Valeur actuelle :**
```
postgresql://postgres:Adrien0334$$@db.xxx.supabase.com:5432/postgres
```

**Problème identifié :**
- ❌ Contient un placeholder : `db.xxx.supabase.com`
- ❌ Doit être remplacé par la vraie URL Supabase

---

## 🔧 SOLUTION

### Étape 1 : Obtenir l'URL Supabase

1. Allez sur : **https://supabase.com/dashboard/org/etcwyazrdadzweuvvxuy**
2. Cliquez sur votre projet **HearstAI**
3. **Settings** → **Database** → **Connection String** → **URI**
4. **COPIEZ** l'URL complète

### Étape 2 : Configurer dans Vercel

**Option A - Script automatique :**
```bash
./obtenir_url_supabase.sh
```
Collez l'URL quand demandé.

**Option B - Vercel CLI :**
```bash
# Supprimer l'ancienne valeur
vercel env rm DATABASE_URL production --yes
vercel env rm DATABASE_URL preview --yes
vercel env rm DATABASE_URL development --yes

# Ajouter la nouvelle valeur (remplacez [URL] par la vraie URL)
echo "[URL_SUPABASE]" | vercel env add DATABASE_URL production
echo "[URL_SUPABASE]" | vercel env add DATABASE_URL preview
echo "[URL_SUPABASE]" | vercel env add DATABASE_URL development
```

**Option C - Vercel Dashboard :**
1. https://vercel.com/dashboard
2. Votre projet → Settings → Environment Variables
3. DATABASE_URL → Edit → Collez l'URL → Save

### Étape 3 : Redéployer

```bash
vercel --prod
```

Ou via Vercel Dashboard → Deployments → Redeploy

---

## ✅ VÉRIFICATION

Après configuration, vérifiez :

```bash
vercel env ls | grep DATABASE_URL
```

L'URL ne doit plus contenir `xxx` ou `placeholder`.

---

**Status :** ⚠️ En attente de correction DATABASE_URL

