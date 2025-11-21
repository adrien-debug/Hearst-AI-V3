# 🔧 CORRIGER DATABASE_URL - Projet hearst-ai-v3

**Problème identifié :** Le déploiement échoue car DATABASE_URL n'est pas configuré pour le projet `hearst-ai-v3`.

---

## ⚠️ ERREUR ACTUELLE

```
Error: Environment variable not found: DATABASE_URL.
```

**Cause :** DATABASE_URL a été configuré pour `hearst-ai` mais le projet qui déploie est `hearst-ai-v3`.

---

## ✅ SOLUTION : Configurer DATABASE_URL dans hearst-ai-v3

### Étape 1 : Accéder au projet Vercel

1. Allez sur : **https://vercel.com/dashboard**
2. Cliquez sur le projet **hearst-ai-v3** (pas "hearst-ai")

### Étape 2 : Configurer DATABASE_URL

1. Dans le projet `hearst-ai-v3`, cliquez sur **Settings** (en haut)
2. Dans le menu de gauche, cliquez sur **Environment Variables**
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
3. Cliquez sur les **3 points** (⋯) à droite
4. Cliquez sur **Redeploy**
5. Attendez que le déploiement se termine (2-5 minutes)

---

## 🔍 VÉRIFICATION

Après avoir ajouté DATABASE_URL, vérifiez :

1. Dans Vercel Dashboard → hearst-ai-v3 → Settings → Environment Variables
2. Vous devriez voir **DATABASE_URL** dans la liste
3. Vérifiez qu'il n'y a pas de placeholder (`xxx`)

---

## 📋 URL SUPABASE À UTILISER

```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres
```

**⚠️ IMPORTANT :** 
- Remplacez `$$` par `$$` (deux dollars) dans Vercel Dashboard
- Ou utilisez `Adrien0334\$\$` si nécessaire

---

## 🚀 APRÈS CONFIGURATION

Une fois DATABASE_URL configuré dans `hearst-ai-v3` :

1. ✅ Le build Vercel réussira
2. ✅ Prisma se connectera à PostgreSQL
3. ✅ L'application fonctionnera
4. ✅ Toutes les API fonctionneront

---

## 🆘 SI LE PROBLÈME PERSISTE

### Vérifier que DATABASE_URL est bien configuré

1. Vercel Dashboard → hearst-ai-v3 → Settings → Environment Variables
2. Vérifiez que DATABASE_URL existe
3. Vérifiez que les 3 environnements sont cochés
4. Vérifiez que l'URL ne contient pas `xxx` ou `placeholder`

### Vérifier les logs de build

1. Vercel Dashboard → hearst-ai-v3 → Deployments
2. Cliquez sur le dernier déploiement
3. Regardez les **Build Logs**
4. Cherchez les erreurs liées à DATABASE_URL

---

**Temps estimé : 3 minutes**

Une fois DATABASE_URL configuré dans `hearst-ai-v3`, le déploiement réussira ! 🚀

