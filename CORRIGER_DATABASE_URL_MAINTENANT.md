# 🚨 ACTION IMMÉDIATE : CORRIGER DATABASE_URL

**⏱️ Temps estimé : 5 minutes**  
**🔴 PRIORITÉ CRITIQUE**

---

## 📍 ÉTAPE 1 : OBTENIR LA VRAIE URL SUPABASE

### 1.1 Ouvrir Supabase

👉 **Allez sur : https://supabase.com**

### 1.2 Se connecter et sélectionner le projet

1. Cliquez sur **"Sign In"** (en haut à droite)
2. Connectez-vous avec vos identifiants
3. Dans la liste des projets, **cliquez sur votre projet HearstAI**

### 1.3 Accéder aux paramètres de la base de données

1. Dans le menu de gauche, cliquez sur **"Settings"** (⚙️ icône)
2. Dans le sous-menu, cliquez sur **"Database"**

### 1.4 Copier la Connection String

1. Faites défiler jusqu'à la section **"Connection string"**
2. Cliquez sur l'onglet **"URI"** (pas "Session mode" ou "Transaction mode")
3. Vous verrez quelque chose comme :
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
   ```
4. **⚠️ IMPORTANT :** Cliquez sur l'icône **"Copy"** (📋) à côté de la chaîne
5. **Collez-la dans un fichier texte temporaire** pour ne pas la perdre

---

## 📍 ÉTAPE 2 : CORRIGER DATABASE_URL DANS VERCEL

### 2.1 Ouvrir Vercel Dashboard

👉 **Allez sur : https://vercel.com/dashboard**

### 2.2 Sélectionner votre projet

1. Dans la liste des projets, **cliquez sur "Hearst-AI-V3"** (ou le nom de votre projet)
2. Vous arrivez sur la page **"Overview"** du projet

### 2.3 Accéder aux Environment Variables

1. Dans le menu en haut, cliquez sur **"Settings"**
2. Dans le menu de gauche, cliquez sur **"Environment Variables"**

### 2.4 Trouver et modifier DATABASE_URL

1. Vous verrez une liste de variables d'environnement
2. **Trouvez la ligne avec "DATABASE_URL"**
3. À droite de cette ligne, vous verrez deux icônes :
   - ✏️ **Edit** (crayon)
   - 🗑️ **Delete** (poubelle)
4. **Cliquez sur l'icône ✏️ Edit** (crayon)

### 2.5 Remplacer la valeur

1. Une fenêtre modale s'ouvre avec :
   - **Key:** `DATABASE_URL` (ne pas modifier)
   - **Value:** (champ texte avec l'ancienne valeur)
   - **Environments:** Cases à cocher (Production, Preview, Development)

2. **Dans le champ "Value" :**
   - **Sélectionnez tout le texte** (Cmd+A ou Ctrl+A)
   - **Supprimez-le** (Backspace ou Delete)
   - **Collez la vraie URL Supabase** que vous avez copiée à l'étape 1.4

3. **Vérifiez les environnements :**
   - ✅ **Production** doit être coché
   - ✅ **Preview** doit être coché
   - ✅ **Development** doit être coché

4. **Cliquez sur "Save"** (en bas à droite de la fenêtre modale)

### 2.6 Vérifier la modification

1. Après avoir sauvegardé, vous revenez à la liste des variables
2. **Vérifiez que DATABASE_URL affiche bien la nouvelle valeur**
3. La valeur doit commencer par `postgresql://` et contenir votre vrai projet Supabase (pas `xxx`)

---

## 📍 ÉTAPE 3 : REDÉPLOYER LE PROJET

### 3.1 Accéder aux déploiements

1. Dans le menu en haut, cliquez sur **"Deployments"**
2. Vous verrez la liste de tous vos déploiements

### 3.2 Redéployer

1. Trouvez le **dernier déploiement** (en haut de la liste)
2. À droite de ce déploiement, cliquez sur les **3 points** (⋯)
3. Dans le menu déroulant, cliquez sur **"Redeploy"**
4. Une fenêtre de confirmation s'ouvre
5. Cliquez sur **"Redeploy"** pour confirmer

### 3.3 Attendre le déploiement

- Le déploiement prend généralement **2-5 minutes**
- Vous verrez un indicateur de progression
- Attendez que le statut passe à **"Ready"** (vert)

---

## ✅ VÉRIFICATION FINALE

### Test 1 : Health Check

1. Une fois le déploiement terminé, cliquez sur votre **URL Vercel**
2. Ajoutez `/api/health` à la fin de l'URL
3. Exemple : `https://hearst-ai-v3-xxx.vercel.app/api/health`
4. Vous devriez voir : `{"status":"ok","timestamp":"..."}`

### Test 2 : API Customers

1. Allez sur : `https://votre-projet.vercel.app/api/customers`
2. Vous devriez voir : `{"customers":[...]}` (peut être un tableau vide si aucun customer)

### Test 3 : API Collateral

1. Allez sur : `https://votre-projet.vercel.app/api/collateral`
2. Vous devriez voir : `{"clients":[...]}` (peut être un tableau vide si aucun customer)

---

## 🆘 EN CAS DE PROBLÈME

### Erreur "Cannot connect to database"

**Vérifiez :**
1. ✅ L'URL Supabase est correcte (pas de `xxx`)
2. ✅ L'URL commence bien par `postgresql://`
3. ✅ Le mot de passe dans l'URL est correct
4. ✅ La base de données Supabase est active

**Solution :**
- Recopiez la Connection String depuis Supabase
- Vérifiez que vous avez bien sélectionné l'onglet "URI"

### Erreur "DATABASE_URL contains placeholder"

**Vérifiez :**
1. ✅ Vous avez bien remplacé tout le contenu du champ Value
2. ✅ Il ne reste pas de `db.xxx.supabase.com` dans la valeur

**Solution :**
- Supprimez complètement l'ancienne valeur
- Collez la nouvelle valeur depuis Supabase

### Erreur 500 sur les routes API

**Vérifiez :**
1. ✅ DATABASE_URL est correct dans Vercel Dashboard
2. ✅ Le projet a été redéployé après la modification
3. ✅ Consultez les logs Vercel (Deployments → Cliquez sur le déploiement → Logs)

---

## 📋 CHECKLIST RAPIDE

- [ ] URL Supabase copiée depuis Supabase Dashboard
- [ ] DATABASE_URL modifié dans Vercel Dashboard
- [ ] Tous les environnements cochés (Production, Preview, Development)
- [ ] Modification sauvegardée
- [ ] Projet redéployé
- [ ] Tests des endpoints API réussis

---

## 🎯 RÉSUMÉ VISUEL

```
1. Supabase.com
   └── Settings → Database → Connection String → URI → Copy

2. Vercel.com/dashboard
   └── Votre Projet → Settings → Environment Variables
       └── DATABASE_URL → Edit → Remplacer → Save

3. Vercel Dashboard
   └── Deployments → 3 points → Redeploy → Attendre

4. Tester
   └── /api/health → ✅ OK
   └── /api/customers → ✅ OK
   └── /api/collateral → ✅ OK
```

---

**⏱️ Temps total : 5 minutes**  
**🔴 Faites-le maintenant pour que tout fonctionne !**

