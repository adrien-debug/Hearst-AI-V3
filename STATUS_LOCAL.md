# 🚀 STATUS DÉMARRAGE LOCAL - HearstAI

**Date :** 21 novembre 2025

---

## ✅ DÉMARRAGE EN COURS

Le script `demarrer_local.sh` est en cours d'exécution et configure automatiquement :

1. ✅ Configuration `.env.local`
2. ⏳ Installation des dépendances (si nécessaire)
3. ⏳ Génération Prisma Client
4. ⏳ Configuration de la base de données
5. ⏳ Démarrage du serveur

---

## 🌐 ACCÈS À L'APPLICATION

Une fois le démarrage terminé, l'application sera accessible sur :

**URL principale :**
```
http://localhost:6001
```

**Endpoints API :**
- Health Check : `http://localhost:6001/api/health`
- Customers : `http://localhost:6001/api/customers`
- Collateral : `http://localhost:6001/api/collateral`

---

## ⏱️ TEMPS DE DÉMARRAGE

Le démarrage prend généralement **1-2 minutes** :
- Installation dépendances : ~30-60 secondes
- Génération Prisma : ~5 secondes
- Configuration DB : ~5-10 secondes
- Démarrage serveur : ~10-20 secondes

---

## 📋 VÉRIFICATION

Pour vérifier que le serveur est démarré :

```bash
curl http://localhost:6001/api/health
```

Devrait retourner : `{"status":"ok","timestamp":"..."}`

---

## 🛑 ARRÊTER LE SERVEUR

Pour arrêter le serveur, appuyez sur `Ctrl+C` dans le terminal où il tourne.

---

## 🆘 EN CAS DE PROBLÈME

### Le serveur ne démarre pas

1. Vérifiez les logs dans le terminal
2. Vérifiez que le port 6001 n'est pas déjà utilisé :
   ```bash
   lsof -i :6001
   ```
3. Vérifiez la configuration dans `.env.local`

### Erreur de base de données

- Pour SQLite : Vérifiez que le dossier `storage` existe
- Pour PostgreSQL : Vérifiez que DATABASE_URL est correct

### Erreur Prisma

```bash
npx prisma generate
npx prisma db push
```

---

**Le serveur démarre en arrière-plan. Attendez 1-2 minutes puis ouvrez http://localhost:6001 🚀**

