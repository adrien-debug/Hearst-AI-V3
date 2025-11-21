# 📁 Localisation des fichiers Frontend - My Hearst AI

## 📍 Chemins absolus des fichiers frontend

### 🎯 Page Collateral (Next.js)
```
/Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI/app/collateral/page.tsx
```

### 🧩 Composants Collateral
```
/Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI/components/collateral/
├── CollateralOverview.tsx
├── CollateralAssets.tsx
├── CollateralLoans.tsx
├── CollateralTransactions.tsx
├── CollateralAnalytics.tsx
├── CollateralCustomers.tsx
├── AddCustomerModal.tsx
└── EditCustomerModal.tsx
```

### 📄 Pages principales
```
/Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI/app/
├── layout.tsx                    (Layout principal)
├── page.tsx                      (Page d'accueil)
├── auth/signin/page.tsx          (Page de connexion)
└── collateral/page.tsx           (Page Collateral)
```

### 🎨 Frontend vanilla JS (ancien système)
```
/Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI/frontend/js/
├── collateral.js                  (Logique Collateral)
├── export.js                      (Exports PDF)
├── config.js                      (Configuration)
└── views/collateral.js            (Vue Collateral)
```

### 🎨 Styles CSS
```
/Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI/frontend/css/
├── main.css
├── design-tokens.css
└── components.css
```

### 📦 Styles globaux Next.js
```
/Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI/styles/
└── globals.css
```

---

## 🔍 Comment trouver un fichier dans votre IDE

### Dans VS Code / Cursor :
1. Appuyez sur `Cmd + P` (Mac) ou `Ctrl + P` (Windows/Linux)
2. Tapez le nom du fichier, par exemple :
   - `collateral/page.tsx`
   - `CollateralOverview.tsx`
   - `export.js`

### Recherche par chemin :
1. `Cmd + Shift + P` → "Go to File"
2. Tapez le chemin complet ou partiel

---

## 📂 Structure du projet

```
HearstAI/
├── app/                          ← Pages Next.js
│   ├── collateral/
│   │   └── page.tsx             ← Page Collateral principale
│   ├── layout.tsx                ← Layout global
│   └── auth/
│       └── signin/
│           └── page.tsx          ← Page de connexion
│
├── components/                    ← Composants React
│   └── collateral/
│       ├── CollateralOverview.tsx
│       ├── CollateralAssets.tsx
│       └── ... (autres composants)
│
├── frontend/                     ← Ancien frontend vanilla JS
│   ├── js/
│   │   ├── collateral.js
│   │   └── export.js
│   └── css/
│       └── main.css
│
└── styles/                       ← Styles globaux Next.js
    └── globals.css
```

---

## 🎯 Fichiers les plus importants

### Pour la page Collateral :
1. **Page principale** : `app/collateral/page.tsx`
2. **Composant Overview** : `components/collateral/CollateralOverview.tsx`
3. **Composant Customers** : `components/collateral/CollateralCustomers.tsx`

### Pour le branding "My Hearst AI" :
1. **Layout** : `app/layout.tsx` (titre et description)
2. **Page connexion** : `app/auth/signin/page.tsx` (titre)
3. **Exports PDF** : `frontend/js/export.js` (titres des rapports)

---

## 💡 Astuce

Si vous ne trouvez pas un fichier :
1. Vérifiez que vous êtes dans le bon dossier : `/Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI`
2. Utilisez la recherche dans votre IDE (`Cmd + P`)
3. Vérifiez les filtres de votre explorateur de fichiers (peut masquer certains fichiers)

