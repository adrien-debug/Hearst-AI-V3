# ⚠️ ACTION IMMÉDIATE REQUISE

## ❌ Problème

Le `DATABASE_URL` dans Vercel contient encore : `db.xxx.supabase.com`

**Cette valeur ne fonctionne PAS.** C'est un placeholder.

---

## ✅ Solution en 3 étapes

### Étape 1 : Obtenir la vraie URL Supabase

1. Ouvrez : **https://supabase.com**
2. Connectez-vous
3. Sélectionnez votre projet
4. **Settings** → **Database**
5. **Connection String** → **URI**
6. **Copiez** l'URL complète

### Étape 2 : Corriger dans Vercel

1. Ouvrez : **https://vercel.com/dashboard**
2. Cliquez sur **"hearst-ai"**
3. **Settings** → **Environment Variables**
4. Trouvez **DATABASE_URL**
5. Cliquez sur les **3 points** → **Edit**
6. **Supprimez** `db.xxx.supabase.com`
7. **Collez** la vraie URL Supabase
8. **Sauvegardez**

### Étape 3 : Redéployer

Dites **"go"** et je redéploierai automatiquement.

---

## 🎯 Format attendu

L'URL doit ressembler à :

```
postgresql://postgres.abcdefghijklmnop:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
```

**⚠️ Ne doit PAS contenir `xxx`**

---

**C'est la dernière étape ! Une fois corrigé, tout fonctionnera.**

