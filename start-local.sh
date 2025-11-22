#!/bin/bash

# Script pour démarrer la plateforme en local
# Backend Express sur le port 5001
# Frontend Next.js sur le port 5000

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Démarrage Hearst AI - Local"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Fonction pour nettoyer les processus au exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt des serveurs...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM

# Vérifier que les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
    npm install
fi

# Générer Prisma Client
echo -e "${BLUE}🔧 Génération Prisma Client...${NC}"
npx prisma generate

# Définir les ports et environnement
export NODE_ENV=development
export BACKEND_PORT=5001
export PORT=3000
export BACKEND_URL=http://localhost:5001

echo ""
echo -e "${GREEN}✅ Démarrage du backend Express sur le port 5001...${NC}"
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Attendre que le backend démarre
sleep 2

echo ""
echo -e "${GREEN}✅ Démarrage du frontend Next.js sur le port 3000...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:5001/api"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}💡 Appuyez sur Ctrl+C pour arrêter les serveurs${NC}"
echo ""

# Démarrer Next.js (qui inclut les routes API)
npm run dev &
FRONTEND_PID=$!

# Attendre que les processus se terminent
wait
