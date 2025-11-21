# 🚀 Guide Ultime - Configuration DATABASE_URL

**Votre projet Supabase :** https://supabase.com/dashboard/project/tjakoymdonbylndibedh

---

## ⚡ Méthode la Plus Rapide (2 minutes)

### Étape 1 : Obtenir l'URL Supabase

1. **Ouvrez votre projet Supabase :**
   - 👉 https://supabase.com/dashboard/project/tjakoymdonbylndibedh

2. **Accédez aux paramètres Database :**
   - Menu gauche → **Settings** (⚙️)
   - Cliquez sur **Database**

3. **Obtenez la Connection String :**
   - Faites défiler jusqu'à **Connection string**
   - Cliquez sur l'onglet **URI**
   - **COPIEZ** toute l'URL

**Format attendu :**
```
postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```
ou
```
postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres
```

### Étape 2 : Configurer dans Vercel

**Option A - Script automatique (recommandé) :**
```bash
./obtenir_url_avec_id.sh
```
Le script vous guidera. Collez l'URL quand demandé.

**Option B - Script direct :**
```bash
./configurer_database_url_direct.sh
```
Collez l'URL quand demandé.

**Option C - En une ligne :**
```bash
./configurer_database_url_direct.sh "postgresql://postgres:[PASSWORD]@db.[REF].supabase.com:5432/postgres"
```

### Étape 3 : Redéployer

```bash
vercel --prod
```

---

## 🔧 Option Avancée : Utiliser l'API Supabase

Si vous avez une clé API Supabase (service_role), le script peut essayer d'obtenir l'URL automatiquement :

1. **Obtenir la clé API :**
   - Allez sur : https://supabase.com/dashboard/project/tjakoymdonbylndibedh
   - Settings → API → Project API keys
   - Copiez la **service_role** key

2. **Exécuter le script :**
```bash
./obtenir_url_avec_id.sh
```
Choisissez "o" pour utiliser l'API et collez votre clé.

---

## 📋 Checklist

- [ ] Ouvrir https://supabase.com/dashboard/project/tjakoymdonbylndibedh
- [ ] Settings → Database → Connection String → URI
- [ ] Copier l'URL
- [ ] Exécuter `./obtenir_url_avec_id.sh` ou `./configurer_database_url_direct.sh`
- [ ] Coller l'URL dans le script
- [ ] Redéployer avec `vercel --prod`

---

## ✅ Vérification

Après configuration, vérifiez :

```bash
vercel env ls | grep DATABASE_URL
```

L'URL ne doit plus contenir `xxx` ou `placeholder`.

---

**Temps estimé : 2-5 minutes**

