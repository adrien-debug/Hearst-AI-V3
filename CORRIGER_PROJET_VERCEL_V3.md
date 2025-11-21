# 🔧 CORRIGER DÉPLOIEMENT - hearst-ai-v3

**Problème :** Le déploiement se fait sur `hearst-ai` au lieu de `hearst-ai-v3`

---

## ⚠️ SITUATION ACTUELLE

- **Projet local lié :** `hearst-ai`
- **Projet qui déploie :** `hearst-ai-v3` (celui qui a les erreurs)
- **DATABASE_URL configuré :** Dans `hearst-ai` (mauvais projet)

---

## ✅ SOLUTION : Configurer DATABASE_URL dans hearst-ai-v3

### Étape 1 : Accéder au bon projet

1. Allez sur : **https://vercel.com/dashboard**
2. **Cliquez sur le projet `hearst-ai-v3`** (pas "hearst-ai")
   - C'est celui qui a les erreurs de build
   - C'est celui qui déploie depuis GitHub

### Étape 2 : Configurer DATABASE_URL

1. Dans le projet `hearst-ai-v3`, cliquez sur **Settings**
2. Menu gauche → **Environment Variables**
3. **Ajoutez** ou **modifiez** DATABASE_URL avec cette valeur :
   ```
   postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
   ```
4. **Cochez** les 3 environnements :
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

## 🔍 COMMENT IDENTIFIER LE BON PROJET

**hearst-ai-v3 :**
- ✅ C'est celui qui déploie depuis GitHub
- ✅ C'est celui qui a les erreurs de build
- ✅ C'est celui qui doit être configuré

**hearst-ai :**
- ❌ C'est un autre projet (peut-être ancien)
- ❌ Ce n'est pas celui qui déploie

---

## 📋 URL À CONFIGURER

```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

**Caractéristiques :**
- Format : `postgresql://` (standard)
- Port : 6543 (pooler Supabase)
- Mot de passe : `Adrien0334$$` (sans crochets)

---

## ✅ VÉRIFICATION

Après configuration, vérifiez :

1. Vercel Dashboard → **hearst-ai-v3** → Settings → Environment Variables
2. DATABASE_URL doit être présent
3. La valeur doit être exactement l'URL ci-dessus
4. Les 3 environnements doivent être cochés

---

## 🚀 APRÈS CONFIGURATION

Une fois DATABASE_URL configuré dans `hearst-ai-v3` et redéployé :

- ✅ Le build Vercel réussira
- ✅ Prisma se connectera via pooler
- ✅ Application fonctionnelle

---

## 📊 RÉSUMÉ

**Action requise :**
1. Configurer DATABASE_URL dans **hearst-ai-v3** (pas hearst-ai)
2. Redéployer

**Temps estimé :** 2 minutes

**Une fois configuré dans le bon projet, le déploiement réussira ! 🚀**

---

**Dernière mise à jour :** 21 novembre 2025  
**Projet concerné :** hearst-ai-v3

