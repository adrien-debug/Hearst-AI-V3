# 🔍 URLS SUPABASE POSSIBLES - Formats à essayer

**Erreur :** `FATAL: no such user`

**Problème :** Le format de l'utilisateur doit être obtenu depuis Supabase Dashboard.

---

## 📋 FORMATS À ESSAYER

### Format 1 : Pooler avec aws-0 (Recommandé)

```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**Régions possibles :**
- `eu-west-1` (Europe Ouest)
- `us-east-1` (US Est)
- `us-west-1` (US Ouest)
- `ap-southeast-1` (Asie Sud-Est)

**Comment trouver votre région :**
- Supabase Dashboard → Settings → General → Region

---

### Format 2 : Pooler avec port 6543

```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

---

### Format 3 : Connexion directe (peut ne pas fonctionner avec Vercel)

```
postgresql://postgres:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres?sslmode=require
```

---

## ✅ MÉTHODE RECOMMANDÉE : Obtenir depuis Supabase Dashboard

**C'est la SEULE méthode fiable :**

1. **Supabase Dashboard** → Projet `tjakoymdonbylndibedh`
2. **Settings** → **Database**
3. **Connection string** → Onglet **"Session mode"** ou **"Transaction mode"**
4. **Copiez** l'URL exacte
5. **Remplacez** `[YOUR-PASSWORD]` par `Adrien0334$$`
6. **Configurez** dans Vercel

---

## 🔍 COMMENT IDENTIFIER LE BON FORMAT

L'URL correcte doit avoir :

- ✅ Format utilisateur : `postgres.tjakoymdonbylndibedh` ou `postgres.[REF]`
- ✅ Host : Contient `pooler` OU port `6543`
- ✅ Port : `6543` (pooler) ou `5432` avec `pooler.supabase.com`
- ✅ Paramètre : `?pgbouncer=true` (si format aws-0)

---

## 🚀 CONFIGURER DANS VERCEL

Une fois l'URL correcte :

1. Vercel Dashboard → `hearst-ai-v3`
2. Settings → Environment Variables
3. DATABASE_URL → Edit
4. Collez l'URL complète
5. Save → Redéployez

---

**Important :** Obtenez toujours l'URL depuis Supabase Dashboard pour garantir le bon format ! 🚀

