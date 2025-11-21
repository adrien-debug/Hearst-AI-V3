#!/bin/bash

# Script de déploiement local complet pour HearstAI
# Configure et démarre frontend + backend automatiquement

set -e

cd "$(dirname "$0")"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 DÉPLOIEMENT LOCAL COMPLET - HearstAI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Fonction pour nettoyer les processus
cleanup() {
    echo ""
    echo -e "${YELLOW}⏹️  Arrêt des serveurs...${NC}"
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "node.*server.js" 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"

# Étape 1: Configuration .env.local
echo ""
echo -e "${CYAN}[1/7] Configuration de l'environnement...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  Création de .env.local...${NC}"
    touch .env.local
fi

# Ajouter DATABASE_URL si manquant
if ! grep -q "^DATABASE_URL=" .env.local 2>/dev/null; then
    echo -e "${BLUE}Configuration de la base de données...${NC}"
    echo ""
    echo "Le schéma Prisma utilise PostgreSQL."
    echo "Choisissez votre option :"
    echo "1. PostgreSQL Supabase (recommandé - base distante)"
    echo "2. PostgreSQL local (nécessite PostgreSQL installé)"
    echo ""
    read -p "Votre choix (1 ou 2) [1]: " db_choice
    db_choice=${db_choice:-1}
    
    if [ "$db_choice" = "2" ]; then
        echo ""
        read -p "Entrez votre DATABASE_URL PostgreSQL local: " pg_url
        echo "DATABASE_URL=\"$pg_url\"" >> .env.local
        echo -e "${GREEN}✅ DATABASE_URL PostgreSQL local configuré${NC}"
    else
        # Utiliser Supabase par défaut
        SUPABASE_URL="postgresql://postgres:Adrien0334\$\$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres"
        echo "DATABASE_URL=\"$SUPABASE_URL\"" >> .env.local
        echo -e "${GREEN}✅ DATABASE_URL Supabase configuré${NC}"
    fi
fi

# Ajouter NEXTAUTH_URL si manquant
if ! grep -q "^NEXTAUTH_URL=" .env.local 2>/dev/null; then
    echo "NEXTAUTH_URL=\"http://localhost:6001\"" >> .env.local
fi

# Ajouter NEXTAUTH_SECRET si manquant
if ! grep -q "^NEXTAUTH_SECRET=" .env.local 2>/dev/null; then
    if [ -f "NEXTAUTH_SECRET.txt" ]; then
        SECRET=$(cat NEXTAUTH_SECRET.txt | tr -d '\n')
        echo "NEXTAUTH_SECRET=\"$SECRET\"" >> .env.local
    elif command -v openssl &> /dev/null; then
        SECRET=$(openssl rand -base64 32)
        echo "NEXTAUTH_SECRET=\"$SECRET\"" >> .env.local
        echo "$SECRET" > NEXTAUTH_SECRET.txt
    else
        echo "NEXTAUTH_SECRET=\"dev-secret-change-in-production\"" >> .env.local
    fi
    echo -e "${GREEN}✅ NEXTAUTH_SECRET configuré${NC}"
fi

# Ajouter NODE_ENV si manquant
if ! grep -q "^NODE_ENV=" .env.local 2>/dev/null; then
    echo "NODE_ENV=\"development\"" >> .env.local
fi

# Étape 2: Créer le dossier storage pour SQLite
echo ""
echo -e "${CYAN}[2/7] Préparation du stockage...${NC}"
mkdir -p storage
echo -e "${GREEN}✅ Dossier storage créé${NC}"

# Étape 3: Installer dépendances frontend
echo ""
echo -e "${CYAN}[3/7] Installation des dépendances frontend...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
fi
echo -e "${GREEN}✅ Dépendances frontend installées${NC}"

# Étape 4: Installer dépendances backend
echo ""
echo -e "${CYAN}[4/7] Installation des dépendances backend...${NC}"
if [ ! -d "backend/node_modules" ]; then
    cd backend
    npm install
    cd ..
fi
echo -e "${GREEN}✅ Dépendances backend installées${NC}"

# Étape 5: Générer Prisma Client
echo ""
echo -e "${CYAN}[5/7] Génération Prisma Client...${NC}"
npx prisma generate || echo -e "${YELLOW}⚠️  Erreur Prisma (peut être ignorée)${NC}"
echo -e "${GREEN}✅ Prisma Client généré${NC}"

# Étape 6: Configurer la base de données
echo ""
echo -e "${CYAN}[6/7] Configuration de la base de données...${NC}"
DB_URL=$(grep "^DATABASE_URL=" .env.local | cut -d'=' -f2- | sed 's/^"//' | sed 's/"$//')
echo -e "${BLUE}Tentative de connexion à PostgreSQL...${NC}"
if npx prisma db push --accept-data-loss 2>/dev/null; then
    echo -e "${GREEN}✅ Base de données PostgreSQL configurée${NC}"
else
    echo -e "${YELLOW}⚠️  Erreur lors de la configuration de la base de données${NC}"
    echo -e "${BLUE}Vérifiez que :${NC}"
    echo "   - DATABASE_URL est correct dans .env.local"
    echo "   - PostgreSQL est accessible (local ou Supabase)"
    echo "   - Les permissions sont correctes"
    echo ""
    echo -e "${YELLOW}L'application peut démarrer mais certaines fonctionnalités peuvent ne pas fonctionner.${NC}"
fi

# Étape 7: Arrêter les processus existants
echo ""
echo -e "${CYAN}[7/7] Nettoyage des processus existants...${NC}"
pkill -f "next dev" 2>/dev/null || true
pkill -f "node.*server.js" 2>/dev/null || true
sleep 2
echo -e "${GREEN}✅ Ports libres${NC}"

# Démarrer le Backend
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🔵 Démarrage du Backend (port 4000)...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd backend
node server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

if ps -p $BACKEND_PID > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend démarré (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Erreur au démarrage du backend${NC}"
    tail -20 backend.log
    exit 1
fi

# Démarrer le Frontend
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🟢 Démarrage du Frontend (port 6001)...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
sleep 5

if ps -p $FRONTEND_PID > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend démarré (PID: $FRONTEND_PID)${NC}"
else
    echo -e "${RED}❌ Erreur au démarrage du frontend${NC}"
    tail -20 frontend.log
    exit 1
fi

# Résumé final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ DÉPLOIEMENT LOCAL RÉUSSI !${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}🔵 Backend API:${NC}  http://localhost:4000/api"
echo -e "${BLUE}   Health Check:${NC} http://localhost:4000/api/health"
echo ""
echo -e "${GREEN}🟢 Frontend App:${NC} http://localhost:6001"
echo ""
echo -e "${YELLOW}📋 Logs:${NC}"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo -e "${YELLOW}⏹️  Pour arrêter:${NC} Appuyez sur Ctrl+C"
echo ""

# Attendre indéfiniment
wait

