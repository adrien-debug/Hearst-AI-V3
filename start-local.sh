#!/bin/bash

# Script pour démarrer la plateforme en local
# Backend Express sur le port 5001
# Frontend Next.js sur le port 3000

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
CYAN='\033[0;36m'
NC='\033[0m'

# Fonction pour nettoyer les processus au exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt des serveurs...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    # Nettoyer les processus Node.js restants
    pkill -f "node.*server.js" 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM EXIT

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

# Créer .env.local s'il n'existe pas
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}📝 Création du fichier .env.local...${NC}"
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        echo -e "${GREEN}✅ Fichier .env.local créé depuis .env.local.example${NC}"
    else
        # Créer .env.local avec les valeurs par défaut
        cat > .env.local << 'EOF'
# Configuration locale pour HearstAI
# Ce fichier est utilisé en développement local uniquement

# Backend Express - Port et URL
BACKEND_PORT=5001
BACKEND_URL=http://localhost:5001

# Frontend Next.js - Port et URL
PORT=3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# API URL pour le client
# Utilise le backend Express local en dev
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Environnement
NODE_ENV=development

# Database (si utilisé)
DATABASE_URL=file:./storage/dev.db

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-change-in-production
EOF
        echo -e "${GREEN}✅ Fichier .env.local créé avec les valeurs par défaut${NC}"
    fi
fi

# Charger les variables d'environnement depuis .env.local
export $(cat .env.local | grep -v '^#' | xargs)

# Vérifier que les dépendances sont installées (frontend)
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances frontend...${NC}"
    npm install
fi

# Vérifier que les dépendances sont installées (backend)
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances backend...${NC}"
    cd backend
    npm install
    cd ..
fi

# Générer Prisma Client
echo -e "${BLUE}🔧 Génération Prisma Client...${NC}"
npx prisma generate 2>/dev/null || echo -e "${YELLOW}⚠️  Prisma non configuré, on continue...${NC}"

# Définir les ports et environnement (valeurs par défaut si non définies)
export NODE_ENV=${NODE_ENV:-development}
export BACKEND_PORT=${BACKEND_PORT:-5001}
export PORT=${PORT:-3000}
export BACKEND_URL=${BACKEND_URL:-http://localhost:5001}
export NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:5001/api}

# Vérifier si les ports sont déjà utilisés
if lsof -Pi :${BACKEND_PORT} -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Le port ${BACKEND_PORT} est déjà utilisé${NC}"
fi

if lsof -Pi :${PORT} -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Le port ${PORT} est déjà utilisé${NC}"
fi

echo ""
echo -e "${GREEN}✅ Démarrage du backend Express sur le port ${BACKEND_PORT}...${NC}"
cd backend

# Vérifier que server.js existe
if [ ! -f "server.js" ]; then
    echo -e "${RED}❌ Fichier backend/server.js introuvable${NC}"
    exit 1
fi

# Démarrer le backend en arrière-plan
NODE_ENV=$NODE_ENV BACKEND_PORT=$BACKEND_PORT node server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre que le backend démarre et vérifier qu'il répond
echo -e "${BLUE}⏳ Attente du démarrage du backend...${NC}"
sleep 3

# Vérifier que le backend répond
for i in {1..10}; do
    if curl -s http://localhost:${BACKEND_PORT}/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend démarré avec succès${NC}"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Le backend n'a pas démarré correctement${NC}"
        echo -e "${YELLOW}📋 Vérifiez les logs dans backend.log${NC}"
        exit 1
    fi
    sleep 1
done

echo ""
echo -e "${GREEN}✅ Démarrage du frontend Next.js sur le port ${PORT}...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}🌐 Frontend: http://localhost:${PORT}${NC}"
echo -e "${CYAN}🔌 Backend API: http://localhost:${BACKEND_PORT}/api${NC}"
echo -e "${CYAN}📊 Health Check: http://localhost:${BACKEND_PORT}/api/health${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}💡 Appuyez sur Ctrl+C pour arrêter les serveurs${NC}"
echo ""

# Démarrer Next.js en arrière-plan
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!

# Attendre un peu pour que Next.js démarre
sleep 3

# Vérifier que le frontend répond
if curl -s http://localhost:${PORT} > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend démarré avec succès${NC}"
else
    echo -e "${YELLOW}⚠️  Le frontend démarre, patientez quelques secondes...${NC}"
fi

echo ""
echo -e "${GREEN}✅ Tous les serveurs sont démarrés !${NC}"
echo ""

# Attendre que les processus se terminent
wait
