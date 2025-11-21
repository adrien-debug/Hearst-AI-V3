# 🚀 Guide Rapide - Obtenir l'URL Supabase

**Votre organisation Supabase :** https://supabase.com/dashboard/org/etcwyazrdadzweuvvxuy

---

## ⚡ Méthode Rapide (2 minutes)

### Étape 1 : Ouvrir votre projet
1. Allez sur : **https://supabase.com/dashboard/org/etcwyazrdadzweuvvxuy**
2. Cliquez sur votre projet **HearstAI** (ou le nom de votre projet)

### Étape 2 : Obtenir l'URL de connexion
1. Dans le menu de gauche, cliquez sur **Settings** (⚙️)
2. Cliquez sur **Database**
3. Faites défiler jusqu'à **Connection string**
4. Cliquez sur l'onglet **URI**
5. **COPIEZ** toute l'URL

**Format attendu :**
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

### Étape 3 : Configurer dans Vercel

**Option A - Script automatique :**
```bash
./obtenir_url_supabase.sh
```
Collez l'URL quand le script vous le demande.

**Option B - Via Vercel Dashboard :**
1. Allez sur https://vercel.com/dashboard
2. Votre projet → Settings → Environment Variables
3. DATABASE_URL → Edit → Collez l'URL → Save
4. Redéployez

---

## 🔧 Script Automatique

J'ai créé un script qui peut essayer d'obtenir l'URL automatiquement :

```bash
./obtenir_url_supabase.sh
```

Ce script :
- Essaie d'utiliser l'API Supabase (si vous avez une clé API)
- Sinon, vous guide pour obtenir l'URL manuellement
- Configure automatiquement dans Vercel une fois l'URL obtenue

---

## 📋 Checklist

- [ ] Ouvrir Supabase Dashboard
- [ ] Sélectionner votre projet
- [ ] Settings → Database → Connection String → URI
- [ ] Copier l'URL
- [ ] Exécuter `./obtenir_url_supabase.sh` ou configurer manuellement dans Vercel
- [ ] Redéployer

---

**Temps estimé : 2-5 minutes**

