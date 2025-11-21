# 🚨 ACTION URGENTE - Configurer DATABASE_URL dans Vercel

**Erreur :** `Environment variable not found: DATABASE_URL`  
**Projet concerné :** hearst-ai-v3

---

## ⚡ SOLUTION EN 3 ÉTAPES (2 minutes)

### Étape 1 : Ouvrir Vercel Dashboard

1. Allez sur : **https://vercel.com/dashboard**
2. Connectez-vous si nécessaire

### Étape 2 : Sélectionner le projet hearst-ai-v3

1. Dans la liste des projets, trouvez **hearst-ai-v3**
2. **Cliquez dessus** (pas sur "hearst-ai")

### Étape 3 : Ajouter DATABASE_URL

1. En haut de la page, cliquez sur **Settings**
2. Dans le menu de gauche, cliquez sur **Environment Variables**
3. Cliquez sur **Add New** (bouton en haut à droite)
4. Remplissez le formulaire :
   
   **Key :**
   ```
   DATABASE_URL
   ```
   
   **Value :**
   ```
   postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres
   ```
   
   **Environments :** Cochez les 3 cases :
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**
   
5. Cliquez sur **Save**

### Étape 4 : Redéployer

1. Cliquez sur **Deployments** (en haut)
2. Trouvez le dernier déploiement (celui qui a échoué avec l'erreur DATABASE_URL)
3. Cliquez sur les **3 points** (⋯) à droite du déploiement
4. Cliquez sur **Redeploy**
5. Attendez 2-5 minutes

---

## ✅ VÉRIFICATION

Après avoir ajouté DATABASE_URL :

1. Vercel Dashboard → hearst-ai-v3 → Settings → Environment Variables
2. Vous devriez voir **DATABASE_URL** dans la liste
3. Vérifiez que la valeur ne contient **PAS** `xxx` ou `placeholder`
4. Vérifiez que les 3 environnements sont cochés

---

## 📋 URL EXACTE À UTILISER

```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres
```

**⚠️ IMPORTANT :**
- Copiez-collez exactement cette URL
- Les `$$` doivent rester (deux dollars)
- Pas d'espaces avant ou après

---

## 🚀 APRÈS CONFIGURATION

Une fois DATABASE_URL configuré et redéployé :

- ✅ Le build Vercel réussira
- ✅ Prisma se connectera à PostgreSQL
- ✅ L'application sera accessible sur votre URL Vercel
- ✅ Toutes les API fonctionneront

---

## 🆘 SI LE PROBLÈME PERSISTE

### Vérifier les logs de build

1. Vercel Dashboard → hearst-ai-v3 → Deployments
2. Cliquez sur le dernier déploiement
3. Regardez les **Build Logs**
4. Cherchez les erreurs liées à DATABASE_URL

### Vérifier que c'est le bon projet

Assurez-vous que vous configurez DATABASE_URL dans **hearst-ai-v3** (pas "hearst-ai").

---

## 📊 RÉSUMÉ

**Action requise :**
1. Ajouter DATABASE_URL dans Vercel Dashboard → hearst-ai-v3
2. Redéployer

**Temps estimé :** 2 minutes

**Une fois fait, le déploiement réussira automatiquement ! 🚀**

---

**Guide créé le :** 21 novembre 2025  
**Status :** ⚠️ En attente de configuration DATABASE_URL dans Vercel

