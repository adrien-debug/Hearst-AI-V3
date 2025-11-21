# 📍 Où ajouter les variables d'environnement dans Vercel

## 🎯 Chemin complet dans Vercel

### Étape par étape

1. **Allez sur Vercel Dashboard**
   - 👉 https://vercel.com/dashboard

2. **Sélectionnez votre projet**
   - Cliquez sur **"Hearst-AI-V3"** (ou le nom de votre projet)

3. **Allez dans Settings**
   - Dans le menu du projet, cliquez sur **"Settings"** (en haut à droite)

4. **Ouvrez Environment Variables**
   - Dans le menu de gauche, cliquez sur **"Environment Variables"**

5. **Ajoutez les variables**
   - Cliquez sur **"Add New"** ou **"Add"**
   - Remplissez chaque variable une par une

---

## 🔑 Variables à ajouter

### 1. NEXTAUTH_URL

```
Key: NEXTAUTH_URL
Value: https://votre-projet.vercel.app
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**Comment trouver votre URL Vercel ?**
- Après le premier déploiement, Vercel vous donne une URL
- Format : `https://hearst-ai-v3-xxx.vercel.app`
- Ou votre domaine personnalisé si configuré

### 2. NEXTAUTH_SECRET

```
Key: NEXTAUTH_SECRET
Value: [générez avec la commande ci-dessous]
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**Générer le secret :**
```bash
openssl rand -base64 32
```

Copiez le résultat et collez-le dans la valeur.

### 3. DATABASE_URL

```
Key: DATABASE_URL
Value: file:./storage/claude-cicd.db
Environments: ✅ Production, ✅ Preview, ✅ Development
```

**Pour PostgreSQL (recommandé en production) :**
```
Key: DATABASE_URL
Value: postgresql://user:password@host:5432/database
Environments: ✅ Production
```

### 4. DEBANK_ACCESS_KEY (optionnel)

```
Key: DEBANK_ACCESS_KEY
Value: votre-cle-debank-ici
Environments: ✅ Production, ✅ Preview, ✅ Development
```

### 5. NODE_ENV

```
Key: NODE_ENV
Value: production
Environments: ✅ Production uniquement
```

---

## 📸 Chemin visuel

```
Vercel Dashboard
  └── Votre Projet (Hearst-AI-V3)
      └── Settings (menu en haut)
          └── Environment Variables (menu de gauche)
              └── Add New (bouton)
                  └── Remplir: Key, Value, Environments
                      └── Save
```

---

## 🎯 URL directe (après avoir créé le projet)

Une fois votre projet créé sur Vercel, vous pouvez accéder directement aux variables :

```
https://vercel.com/[votre-compte]/hearst-ai-v3/settings/environment-variables
```

---

## ✅ Checklist

Pour chaque variable :

- [ ] **Key** : Nom de la variable (ex: `NEXTAUTH_URL`)
- [ ] **Value** : Valeur de la variable
- [ ] **Environments** : Cochez les environnements concernés
  - ✅ Production (pour la prod)
  - ✅ Preview (pour les previews)
  - ✅ Development (pour le dev local)

---

## 🔄 Après avoir ajouté les variables

1. **Redéployez** votre projet :
   - Allez dans **"Deployments"**
   - Cliquez sur les **3 points** du dernier déploiement
   - Cliquez sur **"Redeploy"**

2. **Ou attendez** le prochain push sur GitHub (déploiement automatique)

---

## 🆘 Si vous ne voyez pas "Environment Variables"

1. Assurez-vous d'être dans **Settings** (pas dans Overview)
2. Vérifiez que vous avez les droits d'administration sur le projet
3. Si vous êtes collaborateur, demandez les droits d'admin au propriétaire

---

## 📝 Exemple complet

Voici à quoi ça ressemble dans Vercel :

```
┌─────────────────────────────────────────┐
│ Environment Variables                   │
├─────────────────────────────────────────┤
│                                         │
│  [Add New]                              │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ Key: NEXTAUTH_URL                  │ │
│  │ Value: https://hearst-ai-v3...     │ │
│  │ ☑ Production  ☑ Preview  ☐ Dev   │ │
│  │                    [Save] [Cancel] │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Variables existantes:                  │
│  • NEXTAUTH_URL                         │
│  • NEXTAUTH_SECRET                      │
│  • DATABASE_URL                         │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🚀 Commandes rapides

### Via Vercel CLI (alternative)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier le projet
vercel link

# Ajouter une variable
vercel env add NEXTAUTH_URL production
# Entrez la valeur quand demandé

# Lister les variables
vercel env ls
```

---

*Dernière mise à jour : 21 novembre 2025*

