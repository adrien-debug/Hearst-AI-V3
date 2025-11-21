# 🔧 Instructions Finales pour DATABASE_URL

## ⚠️ Problème

Le `DATABASE_URL` dans Vercel contient encore `db.xxx.supabase.com` au lieu de la vraie URL.

---

## ✅ Solution : Mettre à jour dans Vercel Dashboard

### Option 1 : Via Dashboard (RECOMMANDÉ)

1. **Allez sur** : https://vercel.com/dashboard
2. **Sélectionnez** votre projet **"hearst-ai"**
3. **Settings** → **Environment Variables**
4. **Trouvez** `DATABASE_URL`
5. **Cliquez** sur les **3 points** à droite → **Edit**
6. **Supprimez** complètement l'ancienne valeur
7. **Collez** la nouvelle URL Supabase (format : `postgresql://...`)
8. **Vérifiez** qu'il n'y a **PAS** d'espaces ni retours à la ligne
9. **Cliquez** sur **Save**

### Option 2 : Supprimer et Recréer

Si l'édition ne fonctionne pas :

1. **Supprimez** l'ancienne variable `DATABASE_URL`
2. **Ajoutez** une nouvelle variable `DATABASE_URL`
3. **Collez** la vraie URL Supabase
4. **Sauvegardez**

---

## 🔍 Comment obtenir la vraie URL Supabase

1. Allez sur **https://supabase.com**
2. Connectez-vous
3. Sélectionnez votre projet
4. **Settings** → **Database**
5. Trouvez **"Connection String"**
6. Sélectionnez **"URI"** (pas "Session mode")
7. Copiez la chaîne complète

**Format attendu :**
```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres
```

**OU** (direct connection) :
```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

---

## ✅ Vérification

Après avoir mis à jour :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
vercel env pull .env.test
cat .env.test | grep DATABASE_URL
```

La valeur ne doit **PAS** contenir `xxx`.

---

## 🚀 Après correction

Une fois corrigé, redéployez :

```bash
vercel --prod
```

Ou via Dashboard : **Deployments** → **Redeploy**

---

*C'est la dernière étape ! Une fois DATABASE_URL corrigé, tout fonctionnera.*

