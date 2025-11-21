# HearstAI - Next.js Migration

## 🚀 Structure Next.js avec App Router

Cette plateforme a été migrée vers Next.js 14 avec App Router.

## 📁 Structure du projet

```
/
├── app/                      # App Router (Next.js 13+)
│   ├── layout.js            # Layout principal
│   ├── page.js              # Page d'accueil (Dashboard)
│   ├── dashboard/           # Dashboard route
│   ├── electricity/         # Page Electricity
│   ├── jobs/                # Page Jobs
│   ├── cockpit/             # Page Cockpit
│   └── collateral/          # Page Collateral
├── components/              # Composants React
│   ├── Sidebar.js          # Navigation sidebar
│   ├── Header.js           # Header principal
│   ├── Dashboard.js        # Composant Dashboard
│   ├── ElectricityView.js  # Vue Electricity
│   └── IconsLoader.js      # Chargeur d'icônes
├── lib/                     # Utilitaires
│   └── api.js              # Client API
├── public/                  # Assets statiques
│   ├── css/                # Styles CSS
│   ├── js/                 # Scripts JS (icons, etc.)
│   └── logo.svg            # Logo
├── styles/                  # Styles globaux
│   └── globals.css         # Import de tous les CSS
└── next.config.js          # Configuration Next.js

```

## 🏃 Démarrage

### Installation des dépendances

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build de production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:5556/api
```

### Backend

Assurez-vous que le backend Express est lancé sur le port 5556 :

```bash
cd backend
npm start
```

## 📝 Pages disponibles

- `/` - Dashboard (Home)
- `/electricity` - Monitor d'électricité
- `/jobs` - Liste des jobs
- `/cockpit` - Cockpit (en cours)
- `/collateral` - Collateral (en cours)

## 🎨 Styles

Les styles CSS existants ont été conservés et importés dans `styles/globals.css`. Le style NEARST est préservé avec :
- Thème sombre avec accents vert lime (#9EFF00)
- Glassmorphism subtil
- Coins arrondis
- Layout responsive

## 🔄 Migration

### Ce qui a été migré :

✅ Structure App Router Next.js  
✅ Layout avec Sidebar et Header  
✅ Page Dashboard  
✅ Page Electricity  
✅ Page Jobs  
✅ Composants React  
✅ Client API  
✅ Styles CSS  
✅ Configuration Next.js  

### À compléter :

⚠️ Composants Cockpit et Collateral (stubs)  
⚠️ Système d'icônes (besoin d'adaptation)  
⚠️ Charts interactifs (Chart.js intégré)  
⚠️ Modals et notifications  

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **React 18** - Bibliothèque UI
- **Chart.js** - Graphiques
- **CSS Modules** - Styles

## 📚 Documentation

Pour plus de détails, consultez :
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)




