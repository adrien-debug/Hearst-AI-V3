# 🎯 Guide Final - Déploiement Vercel Complet

## 🚀 Tout faire en 5 étapes

### Étape 1 : Exécuter le script de configuration

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./setup_vercel_complet.sh
```

Le script va :
- ✅ Installer Vercel CLI si nécessaire
- ✅ Vous connecter à Vercel
- ✅ Lier le projet
- ✅ Générer NEXTAUTH_SECRET
- ✅ Proposer d'ajouter les variables automatiquement

---

### Étape 2 : Créer PostgreSQL sur Vercel

1. Allez sur **https://vercel.com/dashboard**
2. Cliquez sur votre projet **"Hearst-AI-V3"**
3. Cliquez sur **"Storage"** (menu de gauche)
4. Cliquez sur **"Create Database"**
5. Sélectionnez **"Postgres"**
6. Nom : `hearstai-db`
7. Cliquez sur **"Create"**

---

### Étape 3 : Récupérer DATABASE_URL

1. Cliquez sur la base de données créée
2. Allez dans **"Settings"**
3. Trouvez **"Connection String"**
4. Copiez la chaîne (format : `postgresql://...`)

---

### Étape 4 : Ajouter DATABASE_URL dans Vercel

1. Allez dans **Settings → Environment Variables**
2. Cliquez sur **"Add New"**
3. Remplissez :
   - **Key** : `DATABASE_URL`
   - **Value** : La connection string copiée
   - **Environments** : ✅ Production, ✅ Preview
4. Cliquez sur **"Save"**

---

### Étape 5 : Migrer et Redéployer

```bash
# Migrer le schéma vers PostgreSQL
npx prisma db push

# Redéployer sur Vercel (via Dashboard)
# Ou via CLI:
vercel --prod
```

Dans Vercel Dashboard :
1. Allez dans **"Deployments"**
2. Cliquez sur les **3 points** du dernier déploiement
3. Cliquez sur **"Redeploy"**

---

## ✅ Vérification

Après le redéploiement, vérifiez :

1. **Application accessible** : https://votre-projet.vercel.app
2. **Pas d'erreurs 500** dans la console
3. **API fonctionne** : `/api/stats` répond correctement
4. **Authentification** : `/api/auth/session` fonctionne

---

## 🔍 Si erreurs persistent

Consultez les logs :
```bash
vercel logs
```

Ou dans le Dashboard :
- Deployments → [Déploiement] → Logs

---

## 📋 Checklist finale

- [ ] Script `setup_vercel_complet.sh` exécuté
- [ ] PostgreSQL créé sur Vercel
- [ ] DATABASE_URL ajouté dans Environment Variables
- [ ] NEXTAUTH_SECRET ajouté (via script ou manuellement)
- [ ] NEXTAUTH_URL ajouté (via script ou manuellement)
- [ ] DEBANK_ACCESS_KEY ajouté (via script ou manuellement)
- [ ] Schéma Prisma migré (`npx prisma db push`)
- [ ] Projet redéployé sur Vercel
- [ ] Application fonctionne sans erreurs 500

---

*Tout est prêt ! Suivez ces 5 étapes et votre application sera déployée sur Vercel.*

