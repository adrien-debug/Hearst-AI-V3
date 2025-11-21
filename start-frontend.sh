#!/bin/bash

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Démarrage du Frontend Next.js"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Arrêter les processus existants
echo "⏹️  Arrêt des processus existants..."
pkill -f "next dev" 2>/dev/null
pkill -f "node.*6001" 2>/dev/null
sleep 2

# Vérifier les dépendances
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Démarrer le serveur
echo "▶️  Démarrage du serveur sur le port 6001..."
echo "🌐 Frontend: http://localhost:6001"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev

