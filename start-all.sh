#!/bin/bash

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Démarrage complet - My Hearst AI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour vérifier les ports
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo -e "${RED}❌ Port $1 déjà utilisé${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Port $1 libre${NC}"
        return 0
    fi
}

# Arrêter les processus existants
echo "⏹️  Arrêt des processus existants..."
pkill -9 -f "next dev" 2>/dev/null
pkill -9 -f "node.*server.js" 2>/dev/null
pkill -9 -f "node.*6001" 2>/dev/null
pkill -9 -f "node.*4000" 2>/dev/null
sleep 2

# Vérifier les ports
echo ""
echo "🔍 Vérification des ports..."
check_port 4000
check_port 6001
echo ""

# Vérifier Node.js
echo "🔍 Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi
NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js: $NODE_VERSION${NC}"
echo ""

# Vérifier les dépendances Frontend
echo "📦 Vérification des dépendances Frontend..."
if [ ! -d "node_modules" ]; then
    echo "📥 Installation des dépendances frontend..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation des dépendances frontend${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✅ Dépendances frontend OK${NC}"

# Générer Prisma Client
echo ""
echo "🔧 Génération du client Prisma..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Erreur Prisma (peut être ignorée si pas de DB)${NC}"
fi

# Vérifier les dépendances Backend
echo ""
echo "📦 Vérification des dépendances Backend..."
if [ ! -d "backend/node_modules" ]; then
    echo "📥 Installation des dépendances backend..."
    cd backend
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erreur lors de l'installation des dépendances backend${NC}"
        exit 1
    fi
    cd ..
fi
echo -e "${GREEN}✅ Dépendances backend OK${NC}"

# Démarrer le Backend
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔵 Démarrage du Backend (port 4000)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd backend
node server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

# Vérifier que le backend démarre
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend démarré (PID: $BACKEND_PID)${NC}"
    echo "   🌐 API: http://localhost:4000/api"
    echo "   📋 Health: http://localhost:4000/api/health"
else
    echo -e "${RED}❌ Le backend n'a pas démarré${NC}"
    echo "📋 Logs backend:"
    tail -20 backend.log
    exit 1
fi

# Démarrer le Frontend
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🟢 Démarrage du Frontend (port 6001)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 5

# Vérifier que le frontend démarre
if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Frontend démarré (PID: $FRONTEND_PID)${NC}"
    echo "   🌐 App: http://localhost:6001"
else
    echo -e "${RED}❌ Le frontend n'a pas démarré${NC}"
    echo "📋 Logs frontend:"
    tail -20 frontend.log
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Tous les serveurs sont démarrés !${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔵 Backend:  http://localhost:4000/api"
echo "🟢 Frontend: http://localhost:6001"
echo ""
echo "📋 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "⏹️  Pour arrêter: pkill -f 'node.*server' && pkill -f 'next dev'"
echo ""

