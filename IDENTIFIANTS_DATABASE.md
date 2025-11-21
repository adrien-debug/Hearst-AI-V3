# 🔐 Identifiants Base de Données

## ⚠️ Base de données actuelle (Supabase) - NE FONCTIONNE PAS

**Problème** : Cette base Supabase génère l'erreur "no such user" lors des déploiements.

### Identifiants Supabase actuels :

```
Username: postgres.tjakoymdonbylndibedh
Password: Adrien0334$$
Host: db.tjakoymdonbylndibedh.supabase.co
Port: 6543
Database: postgres
```

**Connection String complète** :
```
postgresql://postgres.tjakoymdonbylndibedh:Adrien0334$$@db.tjakoymdonbylndibedh.supabase.co:6543/postgres
```

---

## ✅ Solution recommandée : Base PostgreSQL Vercel

### Pour créer une nouvelle base sur Vercel :

1. **Allez sur** : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage
2. **Cliquez sur** "Create Database" → "Postgres"
3. **Nommez-la** : `hearstai-db`
4. **Créez-la**

### Identifiants Vercel Postgres :

Une fois créée, Vercel génère automatiquement :
- ✅ Une Connection String complète
- ✅ Tous les identifiants nécessaires
- ✅ Variables d'environnement prêtes à l'emploi

**Les identifiants seront visibles dans** :
- Dashboard Vercel → Storage → votre base → Settings
- Connection String disponible directement

### Après création :

1. **Récupérez la Connection String** depuis le dashboard Vercel
2. **Ajoutez-la** : `./ajouter_database_url.sh`
3. **Initialisez la base** : `./initialiser_database.sh`

---

## 🔍 Vérifier les identifiants actuels

```bash
# Voir la DATABASE_URL configurée (masquée)
vercel env ls

# Récupérer la DATABASE_URL complète
vercel env pull .env.vercel
cat .env.vercel | grep DATABASE_URL
```

---

**Recommandation** : Utilisez une base PostgreSQL Vercel plutôt que Supabase pour éviter les problèmes de connexion.

