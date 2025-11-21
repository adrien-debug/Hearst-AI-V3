# 🚀 Hearst AI Platform V3

Plateforme d'intelligence minière avec gestion de collatéral et intégration DeBank API.

## ✨ Fonctionnalités

- 📊 **Dashboard** : Vue d'ensemble des opérations minières
- 💰 **Collateral Management** : Gestion complète des actifs collatéraux
- 📈 **Projects** : Gestion de projets avec calculs Monte Carlo
- ⚡ **Electricity** : Suivi de la consommation électrique
- 🎛️ **Cockpit** : Tableau de bord opérationnel
- 📋 **Jobs** : Gestion des tâches et exécutions
- 👥 **Admin** : Administration et gestion des utilisateurs

## 🛠️ Technologies

- **Frontend** : Next.js 14, React, TypeScript, Tailwind CSS
- **Backend** : Express.js, Node.js
- **Database** : Prisma ORM, SQLite (dev) / PostgreSQL (prod)
- **Authentication** : NextAuth.js
- **API** : DeBank Pro OpenAPI
- **Deployment** : Vercel (Frontend), Railway/Vercel (Backend)

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- Git

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/adrien-debug/Hearst-AI-V3.git
cd Hearst-AI-V3

# Installer les dépendances
npm install

# Installer les dépendances backend
cd backend
npm install
cd ..

# Générer Prisma Client
npx prisma generate

# Copier les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

### Démarrage local

```bash
# Démarrer backend et frontend
./start-all.sh

# Ou manuellement :
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
npm run dev
```

### Accès

- **Frontend** : http://localhost:6001
- **Backend API** : http://localhost:4000/api
- **Health Check** : http://localhost:4000/api/health

## 📚 Documentation

- [Guide de Déploiement Vercel](./GUIDE_DEPLOIEMENT_VERCEL.md)
- [Déploiement Local](./DEPLOIEMENT_LOCAL.md)
- [Status Collateral Page](./STATUS_COLLATERAL_PAGE.md)
- [Intégration DeBank](./DEBANK_INTEGRATION.md)
- [Architecture](./ARCHITECTURE.md)

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connectez votre dépôt GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

👉 [Guide complet de déploiement Vercel](./GUIDE_DEPLOIEMENT_VERCEL.md)

### Variables d'environnement requises

```env
NEXTAUTH_URL=https://votre-domaine.vercel.app
NEXTAUTH_SECRET=votre-secret-aleatoire
DATABASE_URL=votre-database-url
DEBANK_ACCESS_KEY=votre-cle-debank (optionnel)
```

## 📁 Structure du projet

```
HearstAI/
├── app/                    # Pages Next.js
│   ├── api/               # Routes API
│   ├── collateral/        # Page Collateral Management
│   ├── dashboard/         # Dashboard
│   └── ...
├── components/            # Composants React
│   ├── collateral/       # Composants Collateral
│   ├── cockpit/          # Composants Cockpit
│   └── ...
├── lib/                   # Bibliothèques utilitaires
│   ├── debank.ts         # Intégration DeBank
│   ├── db.ts             # Prisma database
│   └── ...
├── backend/              # Backend Express
│   ├── routes/           # Routes API
│   ├── services/         # Services
│   └── ...
└── prisma/               # Schema Prisma
```

## 🔐 Sécurité

- Authentification NextAuth.js
- Headers de sécurité configurés
- Validation des entrées
- Protection CSRF

## 📊 API Routes

### Backend (Express)

- `GET /api/health` - Health check
- `GET /api/projects` - Liste des projets
- `GET /api/jobs` - Liste des jobs
- `GET /api/stats` - Statistiques

### Frontend (Next.js API Routes)

- `GET /api/collateral` - Données collatérales
- `GET /api/customers` - Gestion des clients
- `GET /api/projects` - CRUD projets
- `GET /api/jobs` - CRUD jobs

## 🤝 Contribution

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est privé et propriétaire.

## 👤 Auteur

**Adrien Beyond Crypto**

- GitHub: [@adrien-debug](https://github.com/adrien-debug)
- Dépôt: [Hearst-AI-V3](https://github.com/adrien-debug/Hearst-AI-V3)

## 🙏 Remerciements

- DeBank pour l'API Pro
- Next.js pour le framework
- Vercel pour l'hébergement

---

**Version** : 3.0.0  
**Dernière mise à jour** : 21 novembre 2025
