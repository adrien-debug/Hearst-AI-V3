# 🎯 Guide Visuel - Corriger DATABASE_URL

## ⚠️ Problème actuel

Le `DATABASE_URL` dans Vercel contient encore : `db.xxx.supabase.com`

Il faut le remplacer par la **vraie URL Supabase**.

---

## 📋 Étapes détaillées

### Étape 1 : Obtenir la vraie URL Supabase

1. **Allez sur** : https://supabase.com
2. **Connectez-vous**
3. **Sélectionnez** votre projet
4. **Cliquez** sur **Settings** (icône ⚙️ en bas à gauche)
5. **Cliquez** sur **Database** dans le menu
6. **Faites défiler** jusqu'à **"Connection String"**
7. **Sélectionnez** l'onglet **"URI"** (pas "Session mode")
8. **Cliquez** sur le bouton **"Copy"** à côté de l'URL

**L'URL ressemble à :**
```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres
```

---

### Étape 2 : Corriger dans Vercel Dashboard

1. **Allez sur** : https://vercel.com/dashboard
2. **Cliquez** sur votre projet **"hearst-ai"**
3. **Cliquez** sur **"Settings"** (en haut)
4. **Cliquez** sur **"Environment Variables"** (menu de gauche)
5. **Trouvez** la ligne avec **"DATABASE_URL"**
6. **Cliquez** sur les **3 points** (⋮) à droite de la ligne
7. **Cliquez** sur **"Edit"**
8. **Sélectionnez** tout le texte dans le champ "Value"
9. **Supprimez** l'ancienne valeur (`db.xxx.supabase.com`)
10. **Collez** la nouvelle URL Supabase que vous avez copiée
11. **Vérifiez** qu'il n'y a **PAS** d'espaces avant ou après
12. **Cliquez** sur **"Save"**

---

### Étape 3 : Vérifier

Après avoir sauvegardé, vérifiez que la valeur ne contient plus `xxx` :

1. **Rechargez** la page Vercel
2. **Vérifiez** que `DATABASE_URL` affiche bien la nouvelle URL
3. L'URL doit commencer par `postgresql://` et ne pas contenir `xxx`

---

### Étape 4 : Redéployer

Une fois corrigé, redéployez :

**Option 1 : Via Dashboard**
- **Deployments** → dernier déploiement → **3 points** → **Redeploy**

**Option 2 : Via CLI**
```bash
vercel --prod
```

---

## ✅ Format correct attendu

L'URL doit ressembler à :

```
postgresql://postgres.abcdefghijklmnop:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
```

**OU** (direct connection) :

```
postgresql://postgres:[PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
```

**⚠️ IMPORTANT :**
- Ne doit **PAS** contenir `xxx`
- Ne doit **PAS** avoir d'espaces
- Doit commencer par `postgresql://` ou `postgres://`

---

## 🆘 Si vous n'avez pas de projet Supabase

Si vous n'avez pas encore créé de projet Supabase :

1. **Créez un compte** sur https://supabase.com
2. **Créez un nouveau projet**
3. **Attendez** que la base de données soit créée (2-3 minutes)
4. **Récupérez** la Connection String comme expliqué ci-dessus

---

*Une fois DATABASE_URL corrigé, le déploiement réussira automatiquement !*

