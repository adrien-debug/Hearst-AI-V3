# 🔧 CORRIGER L'URL SUPABASE - Utiliser le Pooler

**Erreur :** `Please make sure your database server is running at db.tjakoymdonbylndibedh.supabase.co:5432`

**Problème :** L'URL utilise une connexion directe qui n'est pas accessible depuis Vercel.

---

## ✅ SOLUTION : Utiliser le Pooler Supabase

Vercel nécessite d'utiliser le **Pooler** Supabase au lieu de la connexion directe.

### Étape 1 : Obtenir l'URL avec Pooler

1. Allez sur : **https://supabase.com/dashboard/project/tjakoymdonbylndibedh**
2. **Settings** → **Database**
3. Faites défiler jusqu'à **Connection string**
4. **IMPORTANT :** Cliquez sur l'onglet **"Session mode"** ou **"Transaction mode"** (pas "URI" direct)
5. **COPIEZ** l'URL qui contient `pooler.supabase.com` ou `aws-0-*.pooler.supabase.com`

**Format attendu avec pooler :**
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?pgbouncer=true
```

ou

```
postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:6543/postgres
```

**⚠️ IMPORTANT :** 
- Le port peut être **6543** (pooler) au lieu de **5432** (direct)
- Ou l'URL contient `pooler.supabase.com`

### Étape 2 : Configurer dans Vercel

1. Allez sur : **https://vercel.com/dashboard**
2. Projet **hearst-ai-v3** → **Settings** → **Environment Variables**
3. Trouvez **DATABASE_URL** → **Edit**
4. **Remplacez** l'URL par celle avec le pooler
5. **Save**

### Étape 3 : Redéployer

1. **Deployments** → Dernier déploiement → **⋯** → **Redeploy**

---

## 🔍 DIFFÉRENCE ENTRE LES URLS

### Connexion Directe (ne fonctionne pas avec Vercel)
```
postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```
- Port : 5432
- Host : `db.xxx.supabase.co`
- ❌ Pas accessible depuis Vercel

### Connexion Pooler (recommandé pour Vercel)
```
postgresql://postgres.xxx:password@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```
ou
```
postgresql://postgres.xxx:password@db.xxx.supabase.co:6543/postgres
```
- Port : 6543 (pooler) ou 5432 avec `pooler.supabase.com`
- Host : `pooler.supabase.com` ou port 6543
- ✅ Accessible depuis Vercel

---

## 📋 URLS À ESSAYER

Si vous ne trouvez pas l'option pooler dans Supabase Dashboard, essayez ces formats :

### Format 1 : Pooler avec port 6543
```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

### Format 2 : Pooler avec aws-0
```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**Remplacez `eu-west-1` par votre région Supabase si différente.**

---

## 🆘 SI LE PROBLÈME PERSISTE

### Vérifier la région Supabase

1. Supabase Dashboard → Settings → Database
2. Regardez la région de votre projet
3. Utilisez cette région dans l'URL pooler

### Vérifier les credentials

1. Supabase Dashboard → Settings → Database
2. Vérifiez le mot de passe de la base de données
3. Assurez-vous qu'il correspond à celui dans l'URL

---

## ✅ APRÈS CORRECTION

Une fois l'URL pooler configurée :

- ✅ Le build Vercel réussira
- ✅ Prisma se connectera à PostgreSQL via le pooler
- ✅ L'application fonctionnera

---

**Temps estimé : 3 minutes**

**Une fois l'URL pooler configurée, le déploiement réussira ! 🚀**

