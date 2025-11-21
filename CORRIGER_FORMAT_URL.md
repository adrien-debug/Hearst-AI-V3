# 🔧 CORRIGER FORMAT URL SUPABASE - Erreur "no such user"

**Erreur :** `FATAL: no such user`

**Problème :** Le format de l'utilisateur dans l'URL est incorrect.

---

## ✅ SOLUTION : Obtenir l'URL exacte depuis Supabase Dashboard

Le format `postgres.tjakoymdonbylndibedh` n'est pas correct. Il faut obtenir l'URL exacte depuis Supabase Dashboard.

---

## 📋 ÉTAPES POUR OBTENIR L'URL CORRECTE

### Étape 1 : Accéder à Supabase Dashboard

1. Allez sur : **https://supabase.com/dashboard/project/tjakoymdonbylndibedh**
2. Connectez-vous si nécessaire

### Étape 2 : Obtenir la Connection String avec Pooler

1. Cliquez sur **Settings** (icône engrenage en bas à gauche)
2. Cliquez sur **Database** dans le menu
3. Faites défiler jusqu'à **Connection string**
4. **IMPORTANT :** Cliquez sur l'onglet **"Session mode"** ou **"Transaction mode"**
   - ❌ **NE PAS** utiliser "URI" (connexion directe)
   - ✅ Utiliser "Session mode" ou "Transaction mode" (pooler)

### Étape 3 : Copier l'URL

L'URL devrait ressembler à l'un de ces formats :

**Format 1 (avec pooler.supabase.com) :**
```
postgresql://postgres.tjakoymdonbylndibedh:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true
```

**Format 2 (avec port 6543) :**
```
postgresql://postgres.tjakoymdonbylndibedh:[YOUR-PASSWORD]@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

**Format 3 (avec référence) :**
```
postgresql://postgres.[REF]:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres
```

**⚠️ IMPORTANT :**
- Remplacez `[YOUR-PASSWORD]` par votre mot de passe : `Adrien0334$$`
- L'URL doit contenir `pooler` ou utiliser le port `6543`
- Le format `postgres.` au lieu de `postgres:` est correct pour le pooler

### Étape 4 : Construire l'URL complète

Une fois que vous avez l'URL depuis Supabase Dashboard, remplacez `[YOUR-PASSWORD]` par votre mot de passe :

**Exemple :**
```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**Ou :**
```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

---

## 🔍 VÉRIFICATION DU FORMAT

L'URL correcte doit avoir :

1. ✅ **Format utilisateur :** `postgres.tjakoymdonbylndibedh` ou `postgres.[REF]`
2. ✅ **Mot de passe :** `Adrien0334$$` (avec les deux dollars)
3. ✅ **Host :** Contient `pooler` OU utilise le port `6543`
4. ✅ **Port :** `6543` (pooler) ou `5432` avec `pooler.supabase.com`
5. ✅ **Database :** `postgres`

---

## 🚀 CONFIGURER DANS VERCEL

Une fois l'URL correcte obtenue :

1. **Vercel Dashboard** → Projet `hearst-ai-v3`
2. **Settings** → **Environment Variables**
3. Trouvez/modifiez **DATABASE_URL**
4. Collez l'URL complète avec le mot de passe
5. Cochez : Production, Preview, Development
6. **Save**
7. **Redéployez**

---

## 🆘 SI VOUS NE TROUVEZ PAS L'OPTION POOLER

### Option A : Utiliser l'URL directe avec modification

Si Supabase ne montre pas l'option pooler, essayez cette URL :

```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres?sslmode=require
```

**⚠️ Note :** Cette URL peut ne pas fonctionner avec Vercel serverless. Le pooler est recommandé.

### Option B : Activer le pooler dans Supabase

1. Supabase Dashboard → Settings → Database
2. Vérifiez que "Connection Pooling" est activé
3. Utilisez l'URL avec pooler fournie

---

## 📋 RÉSUMÉ

**Problème :** Format utilisateur incorrect (`postgres.tjakoymdonbylndibedh`)

**Solution :** Obtenir l'URL exacte depuis Supabase Dashboard avec l'onglet "Session mode" ou "Transaction mode"

**Action :** 
1. Obtenir l'URL depuis Supabase Dashboard
2. Remplacer `[YOUR-PASSWORD]` par `Adrien0334$$`
3. Configurer dans Vercel
4. Redéployer

---

**Temps estimé :** 3 minutes

**Une fois l'URL correcte configurée, le build réussira ! 🚀**

