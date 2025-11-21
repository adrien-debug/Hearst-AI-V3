# ✅ VÉRIFICATION DES VARIABLES VERCEL

**Après avoir corrigé DATABASE_URL, vérifiez ces variables :**

---

## 🔑 VARIABLES OBLIGATOIRES

### 1. DATABASE_URL ✅ (À CORRIGER)
```
Key: DATABASE_URL
Value: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Status:** 🔴 À corriger maintenant

---

### 2. NEXTAUTH_URL ⚠️
```
Key: NEXTAUTH_URL
Value: https://votre-projet.vercel.app
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Comment trouver :**
- Après le déploiement, Vercel vous donne une URL
- Format : `https://hearst-ai-v3-xxx.vercel.app`
- Ou votre domaine personnalisé

**Status:** ⚠️ À vérifier

---

### 3. NEXTAUTH_SECRET ⚠️
```
Key: NEXTAUTH_SECRET
Value: [générez avec la commande ci-dessous]
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Générer le secret :**
```bash
openssl rand -base64 32
```
Copiez le résultat et collez-le dans Vercel.

**Status:** ⚠️ À vérifier

---

## 🔑 VARIABLES OPTIONNELLES

### 4. DEBANK_ACCESS_KEY (Optionnel)
```
Key: DEBANK_ACCESS_KEY
Value: votre-cle-debank-ici
Environments: ✅ Production, ✅ Preview, ✅ Development
```
**Comment obtenir :**
- Allez sur https://pro-openapi.debank.com/
- Créez un compte et obtenez votre clé API

**Status:** ℹ️ Optionnel (seulement si vous utilisez DeBank)

---

### 5. NODE_ENV
```
Key: NODE_ENV
Value: production
Environments: ✅ Production uniquement
```
**Status:** ℹ️ Optionnel (Vercel le définit automatiquement)

---

## 📋 CHECKLIST COMPLÈTE

Dans Vercel Dashboard → Settings → Environment Variables, vérifiez :

- [ ] **DATABASE_URL** existe et contient la vraie URL Supabase (pas `db.xxx.supabase.com`)
- [ ] **NEXTAUTH_URL** existe et contient votre URL Vercel
- [ ] **NEXTAUTH_SECRET** existe et contient un secret généré
- [ ] **DEBANK_ACCESS_KEY** existe (si vous utilisez DeBank)
- [ ] Toutes les variables ont les bonnes cases cochées (Production, Preview, Development)

---

## 🎯 URLS DIRECTES

### Vercel Dashboard
```
https://vercel.com/dashboard
```

### Supabase Dashboard
```
https://supabase.com/dashboard
```

### Vercel Environment Variables (après avoir sélectionné votre projet)
```
https://vercel.com/[votre-compte]/[votre-projet]/settings/environment-variables
```

---

**Une fois toutes les variables vérifiées, redéployez votre projet !**

