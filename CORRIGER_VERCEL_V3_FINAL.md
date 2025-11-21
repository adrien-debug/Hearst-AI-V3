# 🔧 CORRIGER DATABASE_URL dans Vercel - hearst-ai-v3

**Erreur actuelle :** `Environment variable not found: DATABASE_URL`

---

## ⚠️ PROBLÈME

Le build Vercel échoue car DATABASE_URL n'est pas configuré pour le projet **hearst-ai-v3**.

---

## ✅ SOLUTION RAPIDE (2 minutes)

### Étape 1 : Accéder au projet Vercel

1. Allez sur : **https://vercel.com/dashboard**
2. Cliquez sur le projet **hearst-ai-v3** (celui qui déploie)

### Étape 2 : Ajouter DATABASE_URL

1. Cliquez sur **Settings** (en haut)
2. Menu gauche → **Environment Variables**
3. Cliquez sur **Add New** (ou **Add**)
4. Remplissez :
   - **Key :** `DATABASE_URL`
   - **Value :** `postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres`
   - **Environments :** Cochez les 3 cases :
     - ✅ **Production**
     - ✅ **Preview**  
     - ✅ **Development**
5. Cliquez sur **Save**

### Étape 3 : Redéployer

1. Allez dans **Deployments**
2. Trouvez le dernier déploiement (celui qui a échoué)
3. Cliquez sur les **3 points** (⋯) → **Redeploy**
4. Attendez 2-5 minutes

---

## 📋 URL À UTILISER

```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres
```

**⚠️ IMPORTANT :**
- Dans Vercel Dashboard, entrez exactement cette URL
- Les `$$` doivent rester tels quels (deux dollars)

---

## ✅ VÉRIFICATION

Après avoir ajouté DATABASE_URL :

1. Vercel Dashboard → hearst-ai-v3 → Settings → Environment Variables
2. Vous devriez voir **DATABASE_URL** dans la liste
3. Vérifiez qu'il n'y a pas de placeholder (`xxx`)

---

## 🚀 APRÈS CONFIGURATION

Une fois DATABASE_URL configuré dans `hearst-ai-v3` :

- ✅ Le build Vercel réussira
- ✅ Prisma se connectera à PostgreSQL
- ✅ L'application fonctionnera
- ✅ Toutes les API fonctionneront

---

## 📊 RÉSUMÉ

**Action requise :**
1. Ajouter DATABASE_URL dans Vercel Dashboard pour `hearst-ai-v3`
2. Redéployer

**Temps estimé :** 2 minutes

**Une fois fait, le déploiement réussira ! 🚀**

