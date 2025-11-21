# 🎯 Guide Visuel - Obtenir l'URL Supabase

**Votre projet :** adrien-debug's Project  
**URL :** https://supabase.com/dashboard/project/tjakoymdonbylndibedh

---

## 📋 ÉTAPES PRÉCISES (basées sur votre dashboard)

### Étape 1 : Accéder aux Settings
Vous êtes actuellement sur la page **Overview** (icône maison en surbrillance dans la sidebar).

1. **Dans la sidebar de gauche**, cliquez sur l'icône **⚙️ Settings** (en bas de la sidebar)
2. Cela vous amènera à la page des paramètres

### Étape 2 : Accéder à Database
1. Dans la page Settings, vous verrez plusieurs sections dans le menu de gauche
2. Cliquez sur **"Database"** dans le menu de gauche des Settings

### Étape 3 : Obtenir la Connection String
1. Sur la page Database, faites défiler jusqu'à la section **"Connection string"**
2. Vous verrez plusieurs onglets : **URI**, **JDBC**, **Golang**, etc.
3. **Cliquez sur l'onglet "URI"**
4. Vous verrez une URL qui ressemble à :
   ```
   postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
   ```
   ou
   ```
   postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres
   ```
5. **COPIEZ toute l'URL** (cliquez sur le bouton "Copy" ou sélectionnez tout et copiez)

### Étape 4 : Configurer dans Vercel

Une fois l'URL copiée, exécutez :

```bash
./configurer_database_url_direct.sh
```

Collez l'URL quand le script vous le demande.

---

## 🚀 Alternative : Script Automatique

Si vous préférez être guidé étape par étape :

```bash
./obtenir_url_avec_id.sh
```

Le script vous guidera et configurera tout automatiquement.

---

## 📍 Chemin Complet dans Supabase

```
Dashboard (Overview)
  └── Settings (⚙️ dans la sidebar)
      └── Database (dans le menu Settings)
          └── Connection string
              └── URI (onglet)
                  └── Copier l'URL
```

---

## ✅ Checklist

- [ ] Cliquer sur ⚙️ Settings dans la sidebar
- [ ] Cliquer sur Database dans le menu Settings
- [ ] Faire défiler jusqu'à Connection string
- [ ] Cliquer sur l'onglet URI
- [ ] Copier l'URL complète
- [ ] Exécuter `./configurer_database_url_direct.sh`
- [ ] Coller l'URL dans le script
- [ ] Redéployer avec `vercel --prod`

---

**Temps estimé : 2 minutes**

