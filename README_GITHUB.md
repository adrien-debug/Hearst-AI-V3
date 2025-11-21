# 🚀 Déploiement sur GitHub - Hearst AI-V3

## 📋 Instructions pour créer le dépôt GitHub

### Étape 1 : Créer le dépôt sur GitHub

1. Allez sur https://github.com/new
2. **Nom du dépôt** : `Hearst-AI-V3`
3. **Description** : `Hearst AI Platform V3 - Mining Intelligence Platform with Collateral Management`
4. **Visibilité** : Public ou Private (selon votre choix)
5. **⚠️ IMPORTANT** : Ne cochez PAS les options suivantes :
   - ❌ Ne pas initialiser avec README
   - ❌ Ne pas ajouter .gitignore
   - ❌ Ne pas choisir de license
6. Cliquez sur **"Create repository"**

### Étape 2 : Exécuter le script de préparation

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI
./prepare_github_v3.sh
```

Le script va :
- ✅ Vérifier l'état Git
- ✅ Ajouter tous les fichiers
- ✅ Créer un commit
- ✅ Configurer le remote GitHub

### Étape 3 : Pousser vers GitHub

Après avoir exécuté le script, vous obtiendrez l'URL du remote. Ensuite :

```bash
# Pousser vers GitHub
git push -u origin main
```

Si le dépôt existe déjà et contient des fichiers :

```bash
# Forcer le push (ATTENTION: écrase le contenu existant)
git push -u origin main --force
```

---

## 🔗 Commandes manuelles (alternative)

Si vous préférez faire manuellement :

```bash
cd /Users/adrienbeyondcrypto/Desktop/HearstAI

# 1. Vérifier l'état
git status

# 2. Ajouter tous les fichiers
git add .

# 3. Créer un commit
git commit -m "🚀 Version V3 - Déploiement complet"

# 4. Ajouter/changer le remote
git remote remove origin  # Si remote existe déjà
git remote add origin https://github.com/VOTRE-USERNAME/Hearst-AI-V3.git

# 5. Renommer la branche en main si nécessaire
git branch -M main

# 6. Pousser vers GitHub
git push -u origin main
```

---

## 📁 Fichiers qui seront inclus

✅ **Tout le code source**
- Pages Next.js (`app/`)
- Composants React (`components/`)
- Routes API (`app/api/`)
- Bibliothèques (`lib/`)
- Styles (`styles/`, `frontend/css/`)
- Scripts (`scripts/`)

✅ **Configuration**
- `package.json`
- `tsconfig.json`
- `next.config.js`
- `tailwind.config.js`
- `prisma/schema.prisma`

✅ **Documentation**
- Tous les fichiers `.md`
- `README.md`

❌ **Exclus** (via .gitignore)
- `node_modules/`
- `.next/`
- `*.log`
- `.env.local`
- `storage/*.db`
- `.DS_Store`

---

## ⚠️ Avant de pousser

### Vérifier les fichiers sensibles

Assurez-vous que ces fichiers ne sont PAS dans le dépôt :
- `.env.local` (contient des secrets)
- `.env.production`
- Clés API
- Mots de passe

### Vérifier .gitignore

Le fichier `.gitignore` doit contenir :
```
node_modules/
.next/
*.log
.env.local
.env.production
storage/*.db
.DS_Store
```

---

## 🔐 Sécurité

### Variables d'environnement

Créez un fichier `.env.example` avec les variables nécessaires (sans valeurs) :

```env
# Exemple de .env.example
DEBANK_ACCESS_KEY=your_debank_key_here
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:6001
DATABASE_URL=file:./storage/claude-cicd.db
```

---

## 📝 Structure du README principal

Le README.md principal devrait contenir :

```markdown
# Hearst AI Platform V3

Plateforme d'intelligence minière avec gestion de collatéral.

## 🚀 Démarrage rapide

\`\`\`bash
npm install
npx prisma generate
npm run dev
\`\`\`

## 📋 Documentation

- [Déploiement Local](./DEPLOIEMENT_LOCAL.md)
- [Guide de Synchronisation](./GUIDE_SYNCHRONISATION.md)
- [Status Collateral](./STATUS_COLLATERAL_PAGE.md)
```

---

## ✅ Checklist avant push

- [ ] Dépôt GitHub créé (nom: `Hearst-AI-V3`)
- [ ] `.gitignore` vérifié et à jour
- [ ] Fichiers sensibles exclus (`.env.local`, etc.)
- [ ] Script `prepare_github_v3.sh` exécuté
- [ ] Commit créé
- [ ] Remote GitHub configuré
- [ ] Push effectué avec succès

---

## 🆘 En cas de problème

### Erreur: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/VOTRE-USERNAME/Hearst-AI-V3.git
```

### Erreur: "failed to push some refs"
```bash
# Si le dépôt GitHub contient déjà des fichiers
git push -u origin main --force
```

### Erreur: "authentication failed"
```bash
# Utiliser un token GitHub ou SSH
git remote set-url origin git@github.com:VOTRE-USERNAME/Hearst-AI-V3.git
```

---

*Dernière mise à jour : 21 novembre 2025*

