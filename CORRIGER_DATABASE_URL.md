# 🔧 Corriger DATABASE_URL dans Vercel

## ⚠️ Problème détecté

Le `DATABASE_URL` dans Vercel contient des caractères invalides (`\n\n` à la fin).

---

## ✅ Solution : Corriger dans Vercel Dashboard

### Étape 1 : Aller dans Environment Variables

1. **Vercel Dashboard** → votre projet
2. **Settings → Environment Variables**
3. Trouvez `DATABASE_URL`
4. Cliquez sur les **3 points** → **Edit**

### Étape 2 : Vérifier et corriger la valeur

La valeur doit être **exactement** au format :

```
postgresql://postgres:password@host:5432/database
```

**⚠️ IMPORTANT :**
- Pas d'espaces au début ou à la fin
- Pas de retours à la ligne (`\n`)
- Pas de guillemets
- Format exact : `postgresql://` ou `postgres://`

### Étape 3 : Si vous utilisez Supabase

1. Allez sur **https://supabase.com**
2. Sélectionnez votre projet
3. **Settings → Database**
4. Trouvez **"Connection String"**
5. Sélectionnez **"URI"** (pas "Session mode")
6. Copiez la chaîne complète
7. Collez-la dans Vercel (sans espaces ni retours à la ligne)

### Étape 4 : Si vous utilisez Vercel Postgres

1. **Vercel Dashboard** → votre projet
2. **Storage** → votre base PostgreSQL
3. **Settings** → **Connection String**
4. Copiez la chaîne
5. Collez-la dans Environment Variables

---

## 🔍 Vérifier le format

La valeur doit ressembler à :

```
postgresql://default:password@host.region.vercel-storage.com:5432/verceldb
```

**OU** (Supabase) :

```
postgresql://postgres.xxx:password@aws-0-region.pooler.supabase.com:5432/postgres
```

---

## ✅ Après correction

1. **Sauvegardez** la variable dans Vercel
2. **Redéployez** :
   ```bash
   vercel --prod
   ```
   Ou via Dashboard : Deployments → Redeploy

3. **Vérifiez les logs** pour confirmer que la connexion fonctionne

---

## 🧪 Tester la connexion localement

Après avoir corrigé dans Vercel :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# Récupérer les variables
vercel env pull .env.vercel

# Nettoyer et exporter DATABASE_URL
export DATABASE_URL=$(grep "^DATABASE_URL=" .env.vercel | cut -d'=' -f2- | sed 's/^"//' | sed 's/"$//' | sed 's/\\n//g' | tr -d '\n' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')

# Tester la connexion
npx prisma db push --accept-data-loss
```

---

*Une fois DATABASE_URL corrigé, tout fonctionnera automatiquement lors du prochain déploiement !*

