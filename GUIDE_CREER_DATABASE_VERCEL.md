# 📍 Où trouver "Create Database" dans Vercel

## 🎯 Chemin exact

### Étape 1 : Accéder au projet
1. Allez sur : **https://vercel.com/dashboard**
2. Cliquez sur le projet **"hearst-ai-v3"**

### Étape 2 : Aller dans Storage
Dans le menu de gauche du projet, vous verrez plusieurs onglets :
- **Overview**
- **Deployments**
- **Settings**
- **Storage** ← **CLIQUEZ ICI**

### Étape 3 : Créer la base de données
Sur la page **Storage**, vous verrez :
- En haut à droite : un bouton **"Create Database"** ou **"Add Database"**
- OU au centre de la page : une carte avec **"Create Database"**

Cliquez sur **"Create Database"**

### Étape 4 : Sélectionner Postgres
Une fenêtre/modal s'ouvre avec les options :
- **Postgres** ← Sélectionnez celui-ci
- Blob (pour fichiers)
- KV (Key-Value)

Cliquez sur **"Postgres"**

### Étape 5 : Configurer
- **Nom de la base** : `hearstai-db` (ou tout autre nom)
- **Région** : Laissez par défaut (généralement `iad1` - Washington D.C.)
- Cliquez sur **"Create"** ou **"Create Database"**

### Étape 6 : Récupérer la Connection String
Une fois créée :
1. Cliquez sur votre base de données (`hearstai-db`)
2. Allez dans l'onglet **"Settings"** (en haut)
3. Trouvez la section **"Connection String"** ou **"Connection Info"**
4. Cliquez sur **"Copy"** pour copier la Connection String

---

## 🔗 Liens directs

**Dashboard Storage** :
https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage

**Dashboard Projet** :
https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3

---

## 📸 À quoi ça ressemble

Le bouton "Create Database" peut apparaître :
- **En haut à droite** : Bouton bleu/vert "Create Database"
- **Au centre** : Grande carte avec "Create Database" et une icône de base de données
- **Dans une liste vide** : "Create your first database"

---

## ⚠️ Si vous ne voyez pas "Create Database"

1. **Vérifiez que vous êtes sur l'onglet "Storage"** (pas Settings ou Deployments)
2. **Vérifiez votre plan Vercel** : Le plan gratuit (Hobby) permet de créer des bases Postgres
3. **Essayez de rafraîchir la page** (F5 ou Cmd+R)
4. **Vérifiez que vous êtes bien sur le bon projet** : `hearst-ai-v3`

---

## 🎯 Alternative : Via l'URL directe

Si le menu ne fonctionne pas, essayez cette URL :
```
https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage/create
```

---

**Une fois la base créée, retournez au terminal et continuez avec le script !**

