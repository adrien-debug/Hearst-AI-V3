# 🚀 CONFIGURER DATABASE_URL AVEC POOLER - URGENT

**Date :** 21 novembre 2025  
**Action requise :** Configuration manuelle dans Vercel Dashboard

---

## ✅ URL POOLER GÉNÉRÉE

**URL à utiliser :**
```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

**Différence importante :**
- ✅ Port **6543** (pooler) au lieu de 5432
- ✅ `postgres.` au lieu de `postgres:`
- ✅ Fonctionne avec Vercel serverless

---

## 📋 ÉTAPES POUR CONFIGURER DANS VERCEL

### Étape 1 : Accéder au projet

1. Allez sur : **https://vercel.com/dashboard**
2. Cliquez sur le projet **hearst-ai-v3** (celui qui déploie)

### Étape 2 : Ajouter DATABASE_URL

1. Cliquez sur **Settings** (en haut)
2. Menu gauche → **Environment Variables**
3. Cliquez sur **Add New** (ou trouvez DATABASE_URL existant et cliquez sur **Edit**)

### Étape 3 : Configurer la valeur

**Key :**
```
DATABASE_URL
```

**Value :**
```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

**⚠️ IMPORTANT :**
- Copiez-collez exactement cette URL
- Les `$$` doivent rester (deux dollars)
- Le port est **6543** (pooler)

**Environments :** Cochez les 3 cases :
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

### Étape 4 : Sauvegarder

1. Cliquez sur **Save**
2. Vérifiez que DATABASE_URL apparaît dans la liste

### Étape 5 : Redéployer

1. Allez dans **Deployments**
2. Trouvez le dernier déploiement (celui qui a échoué)
3. Cliquez sur les **3 points** (⋯) à droite
4. Cliquez sur **Redeploy**
5. Attendez 2-5 minutes

---

## ✅ VÉRIFICATION

Après configuration, vérifiez :

1. Vercel Dashboard → hearst-ai-v3 → Settings → Environment Variables
2. DATABASE_URL doit être présent
3. La valeur doit contenir `:6543` (port pooler)
4. Les 3 environnements doivent être cochés

---

## 🎯 POURQUOI CETTE URL ?

### Ancienne URL (ne fonctionne pas) ❌
```
postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```
- Port 5432 = connexion directe
- Non accessible depuis Vercel serverless

### Nouvelle URL (fonctionne) ✅
```
postgresql://postgres.xxx:password@db.xxx.supabase.co:6543/postgres
```
- Port 6543 = pooler Supabase
- `postgres.` au lieu de `postgres:`
- Accessible depuis Vercel serverless

---

## 🚀 APRÈS CONFIGURATION

Une fois DATABASE_URL configuré avec le pooler et redéployé :

- ✅ Le build Vercel réussira
- ✅ Prisma se connectera via pooler
- ✅ Application fonctionnelle

---

## 📊 RÉSUMÉ

**Action requise :**
1. Copier l'URL pooler ci-dessus
2. Configurer dans Vercel Dashboard → hearst-ai-v3
3. Redéployer

**Temps estimé :** 2 minutes

**Une fois fait, le déploiement réussira ! 🚀**

---

**URL sauvegardée dans :** `SUPABASE_URL_POOLER.txt`  
**Dernière mise à jour :** 21 novembre 2025

