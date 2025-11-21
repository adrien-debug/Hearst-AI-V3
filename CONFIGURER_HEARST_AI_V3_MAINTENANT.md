# 🚀 CONFIGURER DATABASE_URL DANS hearst-ai-v3 - MAINTENANT

**Action requise :** Configuration manuelle dans Vercel Dashboard

---

## ⚡ SOLUTION RAPIDE (2 minutes)

### Étape 1 : Ouvrir Vercel Dashboard

1. Allez sur : **https://vercel.com/dashboard**
2. Connectez-vous si nécessaire

### Étape 2 : Sélectionner le projet hearst-ai-v3

1. Dans la liste des projets, trouvez **hearst-ai-v3**
2. **Cliquez dessus** (c'est celui qui déploie depuis GitHub)

### Étape 3 : Configurer DATABASE_URL

1. En haut de la page, cliquez sur **Settings**
2. Dans le menu de gauche, cliquez sur **Environment Variables**
3. Cliquez sur **Add New** (ou trouvez DATABASE_URL existant et cliquez sur **Edit**)

### Étape 4 : Remplir le formulaire

**Key :**
```
DATABASE_URL
```

**Value :**
```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

**⚠️ IMPORTANT :**
- Copiez-collez exactement cette URL
- Les `$$` doivent rester (deux dollars)
- Le port est **6543** (pooler)

**Environments :** Cochez les 3 cases :
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

### Étape 5 : Sauvegarder

1. Cliquez sur **Save**
2. Vérifiez que DATABASE_URL apparaît dans la liste

### Étape 6 : Redéployer

1. Cliquez sur **Deployments** (en haut)
2. Trouvez le dernier déploiement (celui qui a échoué)
3. Cliquez sur les **3 points** (⋯) à droite
4. Cliquez sur **Redeploy**
5. Attendez 2-5 minutes

---

## ✅ VÉRIFICATION

Après configuration, vérifiez :

1. Vercel Dashboard → **hearst-ai-v3** → Settings → Environment Variables
2. DATABASE_URL doit être présent
3. La valeur doit être exactement :
   ```
   postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
   ```
4. Les 3 environnements doivent être cochés

---

## 🎯 POURQUOI CETTE MÉTHODE ?

Le Vercel CLI nécessite que le projet soit lié localement. Comme `hearst-ai-v3` n'est pas lié localement (le projet local est lié à `hearst-ai`), la configuration doit se faire via le Dashboard Vercel.

**C'est la méthode la plus fiable et la plus rapide !** ✅

---

## 🚀 APRÈS CONFIGURATION

Une fois DATABASE_URL configuré dans `hearst-ai-v3` et redéployé :

- ✅ Le build Vercel réussira
- ✅ Prisma se connectera via pooler
- ✅ Application fonctionnelle

---

## 📊 RÉSUMÉ

**Action requise :**
1. Configurer DATABASE_URL dans Vercel Dashboard → **hearst-ai-v3**
2. Redéployer

**Temps estimé :** 2 minutes

**URL à utiliser :**
```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

**Une fois configuré, le déploiement réussira ! 🚀**

---

**Dernière mise à jour :** 21 novembre 2025  
**Projet concerné :** hearst-ai-v3

