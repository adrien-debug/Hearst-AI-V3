# 🔑 Comment obtenir votre clé DeBank API

## ⚠️ Important

Je ne peux pas vous donner votre clé DeBank car :
- Les clés API sont personnelles et confidentielles
- Chaque développeur doit obtenir sa propre clé
- Les clés ne doivent jamais être partagées publiquement

---

## 🚀 Obtenir votre clé DeBank Pro API

### Étape 1 : Créer un compte DeBank

1. Allez sur **https://debank.com/**
2. Créez un compte ou connectez-vous

### Étape 2 : Accéder à DeBank Pro

1. Allez sur **https://pro.debank.com/**
2. Connectez-vous avec votre compte

### Étape 3 : Obtenir votre API Key

1. Allez dans **"API"** ou **"Developers"** dans le menu
2. Cliquez sur **"Create API Key"** ou **"Get API Key"**
3. Remplissez le formulaire :
   - Nom du projet : "Hearst AI Platform"
   - Description : "Mining Intelligence Platform"
   - Usage : "Collateral Management"
4. Acceptez les conditions d'utilisation
5. Votre clé API sera générée

### Étape 4 : Copier votre clé

- Votre clé ressemblera à : `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **⚠️ IMPORTANT** : Copiez-la immédiatement, elle ne sera affichée qu'une seule fois
- Si vous la perdez, vous devrez en créer une nouvelle

---

## 📝 Documentation DeBank Pro API

- **Documentation** : https://docs.debank.com/
- **API Reference** : https://docs.debank.com/en/reference/api-reference
- **Dashboard** : https://pro.debank.com/

---

## 🔐 Sécurité de la clé

### ✅ À FAIRE

- ✅ Stocker la clé dans les variables d'environnement Vercel
- ✅ Ne jamais commiter la clé dans Git
- ✅ Utiliser des variables d'environnement locales pour le dev
- ✅ Limiter les permissions de la clé si possible

### ❌ À NE PAS FAIRE

- ❌ Ne jamais partager votre clé publiquement
- ❌ Ne jamais commiter la clé dans le code
- ❌ Ne jamais la mettre dans des fichiers publics
- ❌ Ne jamais la donner à d'autres personnes

---

## 💻 Utilisation dans le projet

### En local (.env.local)

```env
DEBANK_ACCESS_KEY=votre-cle-debank-ici
```

### Sur Vercel

1. Allez dans **Settings → Environment Variables**
2. Ajoutez :
   - **Key** : `DEBANK_ACCESS_KEY`
   - **Value** : votre clé DeBank
   - **Environments** : Production, Preview

---

## 🆘 Si vous avez déjà une clé

Si vous avez déjà une clé DeBank mais ne vous en souvenez plus :

1. Allez sur **https://pro.debank.com/**
2. Connectez-vous
3. Allez dans **"API Keys"** ou **"Developers"**
4. Vous verrez la liste de vos clés existantes
5. Si nécessaire, créez-en une nouvelle

---

## 📊 Limites de l'API

DeBank Pro API a des limites de taux :
- **Free tier** : Limité (vérifiez la documentation)
- **Paid tier** : Limites plus élevées

Consultez la documentation pour les détails des limites.

---

## 🔄 Alternative : Données mockées

Si vous n'avez pas encore de clé DeBank, l'application fonctionne avec des données mockées en fallback.

Le code dans `lib/debank.ts` gère automatiquement le fallback si la clé n'est pas disponible.

---

*Dernière mise à jour : 21 novembre 2025*

