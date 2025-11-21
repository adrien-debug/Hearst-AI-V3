# 🏗️ ARCHITECTURE ET DÉPLOIEMENT - HearstAI

**Date :** 21 novembre 2025

---

## 📊 ARCHITECTURE ACTUELLE

### Option 1 : Architecture Monolithique (Actuelle) ✅

**Next.js avec API Routes intégrées**

```
HearstAI/
├── app/                    # Front-end Next.js
│   ├── page.js           # Pages React
│   └── api/              # Back-end intégré (API Routes)
│       ├── customers/    # API Customers
│       ├── collateral/   # API Collateral
│       └── auth/          # API Auth
├── lib/                   # Utilitaires partagés
│   ├── db.ts            # Prisma Client
│   └── auth.ts          # NextAuth
└── prisma/               # Base de données
    └── schema.prisma
```

**Avantages :**
- ✅ Un seul déploiement (Vercel)
- ✅ Pas de CORS à gérer
- ✅ Déploiement simplifié
- ✅ Performance optimale (même domaine)

**Déploiement :**
- **1 seul projet Vercel** (`hearst-ai-v3`)
- Front-end + Back-end dans le même déploiement

---

### Option 2 : Architecture Séparée (Backend Express existant)

**Backend Express séparé + Front-end Next.js**

```
HearstAI/
├── app/                    # Front-end Next.js
├── backend/                # Back-end Express séparé
│   ├── server.js          # Serveur Express (port 4000)
│   └── routes/            # Routes API Express
└── prisma/                 # Base de données
```

**Avantages :**
- ✅ Séparation des responsabilités
- ✅ Scalabilité indépendante
- ✅ Backend peut servir d'autres clients

**Inconvénients :**
- ⚠️ 2 déploiements à gérer
- ⚠️ CORS à configurer
- ⚠️ Plus complexe

**Déploiement :**
- **Backend Express** : Railway, Render, ou Vercel Serverless Functions
- **Front-end Next.js** : Vercel (`hearst-ai-v3`)

---

## 🔍 ANALYSE DE VOTRE PROJET

### Architecture Actuelle

D'après l'analyse du code :

1. **Next.js avec API Routes** ✅ (Utilisé actuellement)
   - `app/api/customers/route.ts`
   - `app/api/collateral/route.ts`
   - `app/api/auth/[...nextauth]/route.ts`
   - Utilise Prisma directement

2. **Backend Express** ⚠️ (Existe mais semble non utilisé)
   - `backend/server.js` (port 4000)
   - Routes Express séparées
   - Base SQLite séparée

### Conclusion

**Vous utilisez actuellement l'architecture monolithique (Option 1)** ✅

- Next.js gère le front-end ET le back-end
- Les API Routes Next.js remplacent le backend Express
- **Un seul déploiement suffit** sur Vercel

---

## ✅ RECOMMANDATION : RESTER EN MONOLITHIQUE

### Pourquoi ?

1. **C'est déjà configuré** ✅
   - Vercel déploie automatiquement les API Routes
   - Pas besoin de configuration supplémentaire

2. **Plus simple** ✅
   - Un seul projet à gérer
   - Un seul déploiement
   - Pas de CORS

3. **Performance** ✅
   - Même domaine = pas de latence réseau
   - Optimisations Next.js automatiques

4. **Coût** ✅
   - Un seul service Vercel
   - Pas de backend séparé à payer

---

## 🚀 DÉPLOIEMENT ACTUEL (Recommandé)

### Configuration Vercel

**1 seul projet :** `hearst-ai-v3`

**Structure :**
```
hearst-ai-v3 (Vercel)
├── Front-end (app/)
├── Back-end (app/api/)
└── Base de données (Supabase PostgreSQL)
```

**Variables d'environnement :**
- `DATABASE_URL` (Supabase avec pooler)
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `DEBANK_ACCESS_KEY`

**Déploiement :**
- Push sur GitHub → Vercel déploie automatiquement
- Front-end + Back-end déployés ensemble

---

## 🔄 SI VOUS VOULEZ SÉPARER (Optionnel)

### Déploiement Backend Express séparé

Si vous voulez utiliser le backend Express existant :

#### Option A : Railway (Recommandé pour Express)

1. **Créer un projet Railway**
   ```bash
   cd backend
   railway init
   railway up
   ```

2. **Configurer les variables**
   - `DATABASE_URL`
   - `PORT=4000`

3. **Obtenir l'URL du backend**
   - Exemple : `https://hearstai-backend.railway.app`

#### Option B : Render

1. **Créer un service Web sur Render**
2. **Connecter le repo GitHub**
3. **Configurer** :
   - Build Command : `cd backend && npm install`
   - Start Command : `cd backend && npm start`

#### Option C : Vercel Serverless Functions

1. **Créer un projet Vercel séparé** (`hearst-ai-backend`)
2. **Déployer uniquement le dossier `backend/`**
3. **Configurer** dans `vercel.json` :
   ```json
   {
     "builds": [
       {
         "src": "backend/server.js",
         "use": "@vercel/node"
       }
     ]
   }
   ```

### Déploiement Front-end

Une fois le backend déployé :

1. **Configurer `NEXT_PUBLIC_API_URL`** dans Vercel
   ```
   NEXT_PUBLIC_API_URL=https://votre-backend.railway.app/api
   ```

2. **Modifier le code** pour utiliser le backend externe
   - Remplacer les appels API internes par des appels au backend externe

---

## 📋 COMPARAISON

| Critère | Monolithique (Actuel) | Séparé |
|---------|----------------------|--------|
| **Complexité** | ✅ Simple | ⚠️ Plus complexe |
| **Déploiements** | 1 | 2 |
| **CORS** | ✅ Pas besoin | ⚠️ À configurer |
| **Coût** | ✅ 1 service | ⚠️ 2 services |
| **Performance** | ✅ Optimal | ⚠️ Latence réseau |
| **Scalabilité** | ✅ Bonne | ✅ Excellente |

---

## ✅ RECOMMANDATION FINALE

**RESTER EN ARCHITECTURE MONOLITHIQUE** ✅

**Raisons :**
1. C'est déjà configuré et fonctionnel
2. Plus simple à maintenir
3. Performance optimale
4. Coût réduit
5. Vercel gère tout automatiquement

**Le backend Express dans `/backend` peut être :**
- Supprimé si non utilisé
- Ou conservé pour référence/future migration

---

## 🎯 ACTION RECOMMANDÉE

**Continuer avec 1 seul déploiement Vercel** ✅

1. Corriger DATABASE_URL avec pooler Supabase
2. Déployer sur Vercel (`hearst-ai-v3`)
3. Tout fonctionnera (front-end + back-end)

**Pas besoin de 2 déploiements séparés !** 🚀

---

**Dernière mise à jour :** 21 novembre 2025  
**Architecture recommandée :** Monolithique (Next.js avec API Routes)

