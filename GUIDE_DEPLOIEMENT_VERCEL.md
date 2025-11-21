# 🚀 Guide de Déploiement Vercel - Hearst AI-V3

## 📋 Prérequis

- ✅ Compte GitHub avec le dépôt `Hearst-AI-V3`
- ✅ Compte Vercel (gratuit) : https://vercel.com/signup
- ✅ Node.js 18+ installé localement (pour les tests)

---

## 🚀 Déploiement en 3 étapes

### Étape 1 : Connecter GitHub à Vercel

1. Allez sur **https://vercel.com/new**
2. Cliquez sur **"Import Git Repository"**
3. Sélectionnez **"GitHub"** et autorisez Vercel
4. Recherchez et sélectionnez **`adrien-debug/Hearst-AI-V3`**
5. Cliquez sur **"Import"**

### Étape 2 : Configurer le projet

Vercel détecte automatiquement Next.js. Vérifiez :

- **Framework Preset** : Next.js
- **Root Directory** : `./` (racine)
- **Build Command** : `npm run build` (automatique)
- **Output Directory** : `.next` (automatique)
- **Install Command** : `npm install` (automatique)

### Étape 3 : Configurer les variables d'environnement

Avant de déployer, configurez ces variables dans **Settings → Environment Variables** :

#### Variables requises

```env
# NextAuth.js
NEXTAUTH_URL=https://votre-projet.vercel.app
NEXTAUTH_SECRET=votre-secret-aleatoire-32-caracteres

# Database (Prisma)
DATABASE_URL=file:./storage/claude-cicd.db

# DeBank API (optionnel)
DEBANK_ACCESS_KEY=votre-cle-debank

# Node Environment
NODE_ENV=production
```

#### Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## ⚙️ Configuration Vercel

### Fichier `vercel.json`

Le fichier `vercel.json` est déjà configuré avec :
- ✅ Headers de sécurité
- ✅ Commandes de build
- ✅ Configuration Next.js

### Variables d'environnement par environnement

Configurez les variables pour :
- **Production** : Variables pour la production
- **Preview** : Variables pour les previews (branches)
- **Development** : Variables pour le développement local

---

## 🔄 Déploiement automatique

Une fois connecté à GitHub, Vercel déploie automatiquement :
- ✅ À chaque push sur `main` → Production
- ✅ À chaque pull request → Preview
- ✅ À chaque push sur autres branches → Preview

---

## 📤 Déploiement manuel

### Via Vercel Dashboard

1. Allez sur votre projet Vercel
2. Cliquez sur **"Deployments"**
3. Cliquez sur **"Redeploy"**

### Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet (première fois)
vercel link

# Déployer en production
vercel --prod

# Déployer en preview
vercel
```

---

## 🔧 Configuration avancée

### Build Settings

Si nécessaire, ajustez dans **Settings → General → Build & Development Settings** :

```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Headers de sécurité

Déjà configurés dans `vercel.json` :
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

---

## 🗄️ Base de données

### Option 1 : SQLite (développement)

Pour le développement, SQLite fonctionne avec `DATABASE_URL=file:./storage/claude-cicd.db`

### Option 2 : PostgreSQL (production recommandé)

Pour la production, utilisez une base de données PostgreSQL :

1. **Vercel Postgres** (recommandé) :
   - Allez sur **Storage → Create Database → Postgres**
   - Copiez la `DATABASE_URL` fournie
   - Ajoutez-la dans les variables d'environnement

2. **Autres options** :
   - Railway
   - Supabase
   - Neon
   - PlanetScale

### Migration vers PostgreSQL

```bash
# Mettre à jour DATABASE_URL
DATABASE_URL=postgresql://user:password@host:5432/database

# Générer Prisma Client
npx prisma generate

# Pousser le schéma
npx prisma db push
```

---

## ✅ Vérification après déploiement

### Checklist

- [ ] Application accessible sur `https://votre-projet.vercel.app`
- [ ] Page d'accueil se charge
- [ ] Authentification fonctionne
- [ ] Routes API répondent
- [ ] Base de données connectée
- [ ] Pas d'erreurs dans les logs

### Vérifier les logs

```bash
# Via Vercel CLI
vercel logs

# Via Dashboard
# Allez sur Deployments → Cliquez sur un déploiement → Logs
```

---

## 🐛 Résolution de problèmes

### Erreur : "Module not found"

```bash
# Vérifier que toutes les dépendances sont dans package.json
npm install

# Rebuild
npm run build
```

### Erreur : "Prisma Client not generated"

Ajoutez dans `package.json` :
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Erreur : "Database connection failed"

1. Vérifiez `DATABASE_URL` dans les variables d'environnement
2. Vérifiez que la base de données est accessible depuis Vercel
3. Pour SQLite, assurez-vous que le fichier est dans le repo (non recommandé pour production)

### Erreur : "NextAuth secret missing"

Générez un secret et ajoutez-le :
```bash
openssl rand -base64 32
```

---

## 📊 Monitoring

### Analytics Vercel

Activez dans **Settings → Analytics** :
- Web Analytics
- Speed Insights

### Logs

Consultez les logs dans :
- **Dashboard → Deployments → [Déploiement] → Logs**
- Ou via CLI : `vercel logs`

---

## 🔐 Sécurité

### Variables sensibles

⚠️ **Ne jamais** commiter :
- `.env.local`
- `.env.production`
- Clés API
- Secrets

✅ Utilisez **Vercel Environment Variables** pour tous les secrets.

### Headers de sécurité

Déjà configurés dans `vercel.json`. Vérifiez qu'ils sont appliqués :
```bash
curl -I https://votre-projet.vercel.app
```

---

## 🚀 Commandes rapides

```bash
# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les variables d'environnement
vercel env ls

# Ajouter une variable
vercel env add VARIABLE_NAME production

# Ouvrir le dashboard
vercel dashboard
```

---

## 📝 Checklist de déploiement

- [ ] Compte Vercel créé
- [ ] Projet GitHub connecté
- [ ] Variables d'environnement configurées
- [ ] Base de données configurée
- [ ] Build réussi
- [ ] Application accessible
- [ ] Tests fonctionnels

---

## 🎯 URLs importantes

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Votre projet** : https://vercel.com/[votre-compte]/Hearst-AI-V3
- **Application déployée** : https://hearst-ai-v3.vercel.app (exemple)

---

## 📚 Documentation

- **Vercel Docs** : https://vercel.com/docs
- **Next.js on Vercel** : https://vercel.com/docs/frameworks/nextjs
- **Environment Variables** : https://vercel.com/docs/concepts/projects/environment-variables

---

*Dernière mise à jour : 21 novembre 2025*

