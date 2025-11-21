# 🔧 Debug Frontend - My Hearst AI

## Problèmes courants et solutions

### 1. Le frontend ne démarre pas

**Vérifications à faire :**

```bash
# Vérifier que Node.js est installé
node --version  # Doit être >= 18.x

# Vérifier les dépendances
cd /Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI
npm install

# Générer Prisma Client
npx prisma generate

# Vérifier le port 6001
lsof -i:6001
```

### 2. Erreurs de compilation

**Erreurs TypeScript/Next.js :**
```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run dev
```

### 3. Erreurs de dépendances manquantes

```bash
# Réinstaller toutes les dépendances
rm -rf node_modules package-lock.json
npm install
```

### 4. Erreurs Prisma

```bash
# Régénérer le client Prisma
npx prisma generate
npx prisma db push
```

### 5. Port déjà utilisé

```bash
# Arrêter tous les processus Next.js
pkill -f "next dev"
pkill -f "node.*6001"

# Attendre 2 secondes puis redémarrer
sleep 2
npm run dev
```

## Démarrage manuel

```bash
cd /Users/adrienbeyondcrypto/Desktop/Pino/DEV/HearstAI

# 1. Installer les dépendances (si nécessaire)
npm install

# 2. Générer Prisma Client
npx prisma generate

# 3. Démarrer le serveur
npm run dev
```

Le frontend devrait être accessible sur : **http://localhost:6001**

## Vérification

```bash
# Vérifier que le serveur répond
curl http://localhost:6001

# Vérifier les logs
tail -f /tmp/nextjs-dev.log
```

## Fichiers importants

- `app/layout.tsx` - Layout principal
- `components/Providers.tsx` - Providers NextAuth
- `components/LayoutWrapper.tsx` - Wrapper de layout
- `styles/globals.css` - Styles globaux
- `.env.local` - Variables d'environnement (optionnel)

