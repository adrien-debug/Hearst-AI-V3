#!/bin/bash

# Script pour démarrer HearstAI sur le port 3000

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Démarrage HearstAI sur port 3000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Arrêter les processus existants sur les ports 2222 et 3000
echo "🛑 Arrêt des processus existants..."
pkill -9 -f "next dev.*2222" 2>/dev/null
lsof -ti:2222 | xargs kill -9 2>/dev/null
sleep 1

# Vérifier que le port 3000 est libre, sinon arrêter le processus
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  Port 3000 déjà utilisé, arrêt du processus existant..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Vérifier les dépendances
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Générer Prisma Client si nécessaire
if [ -f "prisma/schema.prisma" ]; then
    echo "🔧 Génération Prisma Client..."
    npx prisma generate 2>/dev/null || true
fi

# Définir le port explicitement
export PORT=3000
export NODE_ENV=development

echo ""
echo "✅ Démarrage de Next.js sur le port 3000..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Application: http://localhost:3000"
echo "📡 API: http://localhost:3000/api"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Appuyez sur Ctrl+C pour arrêter"
echo ""

# Démarrer Next.js sur le port 3000
npm run dev

