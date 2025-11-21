# 🎯 Trouver la Connection String - Instructions Précises

**Vous êtes actuellement sur :** Database Settings  
**URL actuelle :** https://supabase.com/dashboard/project/tjakoymdonbylndibedh/database/settings

---

## 📍 OÙ TROUVER LA CONNECTION STRING

La Connection String n'est **PAS** sur la page Settings où vous êtes actuellement.

### Option 1 : Depuis la page Database principale (Recommandé)

1. **Dans la sidebar de gauche**, cliquez sur **"Database"** (l'icône principale, pas "Settings")
   - Cela vous amènera à la page principale Database (Overview)

2. Sur la page Database principale, cherchez une section **"Connection string"** ou **"Connection info"**
   - Elle se trouve généralement en haut de la page ou dans un encadré visible

3. Cliquez sur l'onglet **"URI"**

4. **COPIEZ** l'URL complète

### Option 2 : Depuis Settings → Database

1. Vous êtes déjà dans Database → Settings
2. **Revenez en arrière** : cliquez sur **"Database"** dans la sidebar (pas "Settings")
3. Sur la page Database principale, cherchez **"Connection string"**
4. Cliquez sur l'onglet **"URI"**
5. **COPIEZ** l'URL

### Option 3 : Via le bouton "Connect"

1. En haut à droite de votre dashboard, il y a un bouton **"Connect"**
2. Cliquez dessus
3. Une popup/modal devrait s'ouvrir avec les informations de connexion
4. Cherchez **"Connection string"** ou **"URI"**
5. **COPIEZ** l'URL

---

## 🔍 CE QUE VOUS CHERCHEZ

L'URL ressemble à l'un de ces formats :

```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

ou

```
postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres
```

**⚠️ IMPORTANT :** L'URL ne doit **PAS** contenir `xxx` ou `placeholder`

---

## ✅ UNE FOIS L'URL OBTENUE

Exécutez ce script :

```bash
./configurer_database_url_direct.sh
```

Collez l'URL quand le script vous le demande.

---

## 🆘 SI VOUS NE TROUVEZ PAS LA CONNECTION STRING

Essayez ces chemins alternatifs :

1. **Database** (sidebar) → Cherchez un encadré "Connection string" ou "Connection info"
2. **Settings** (sidebar principale, pas Database Settings) → **API** → Cherchez "Database URL" ou "Connection string"
3. **Bouton "Connect"** en haut à droite → Popup avec les informations de connexion

---

**La Connection String est généralement visible sur la page principale Database, pas dans Settings.**

