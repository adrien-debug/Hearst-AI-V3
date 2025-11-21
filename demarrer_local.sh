#!/bin/bash

# Script pour démarrer l'application HearstAI en local
# Configure tout automatiquement et démarre les serveurs

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 DÉMARRAGE LOCAL - HearstAI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js : $NODE_VERSION${NC}"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm disponible${NC}"
echo ""

# Étape 1 : Vérifier/Créer .env.local
echo -e "${CYAN}[1/6] Configuration de l'environnement...${NC}"

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local n'existe pas, création...${NC}"
    touch .env.local
fi

# Vérifier DATABASE_URL dans .env.local
if ! grep -q "^DATABASE_URL=" .env.local 2>/dev/null; then
    echo -e "${YELLOW}⚠️  DATABASE_URL manquant dans .env.local${NC}"
    echo ""
    echo -e "${BLUE}Choisissez votre base de données :${NC}"
    echo "1. SQLite (local, rapide pour développement)"
    echo "2. PostgreSQL Supabase (production)"
    echo ""
    echo -e "${CYAN}Votre choix (1 ou 2) :${NC}"
    read -r db_choice
    
    if [ "$db_choice" = "2" ]; then
        SUPABASE_URL="postgresql://postgres:Adrien0334\$\$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres"
        echo "DATABASE_URL=\"$SUPABASE_URL\"" >> .env.local
        echo -e "${GREEN}✅ DATABASE_URL PostgreSQL ajouté${NC}"
    else
        echo "DATABASE_URL=\"file:./storage/hearstai.db\"" >> .env.local
        echo -e "${GREEN}✅ DATABASE_URL SQLite ajouté${NC}"
    fi
else
    echo -e "${GREEN}✅ DATABASE_URL déjà configuré${NC}"
fi

# Vérifier NEXTAUTH_URL
if ! grep -q "^NEXTAUTH_URL=" .env.local 2>/dev/null; then
    echo "NEXTAUTH_URL=\"http://localhost:6001\"" >> .env.local
    echo -e "${GREEN}✅ NEXTAUTH_URL ajouté${NC}"
fi

# Vérifier NEXTAUTH_SECRET
if ! grep -q "^NEXTAUTH_SECRET=" .env.local 2>/dev/null; then
    if [ -f "NEXTAUTH_SECRET.txt" ]; then
        SECRET=$(cat NEXTAUTH_SECRET.txt | tr -d '\n')
        echo "NEXTAUTH_SECRET=\"$SECRET\"" >> .env.local
        echo -e "${GREEN}✅ NEXTAUTH_SECRET ajouté depuis NEXTAUTH_SECRET.txt${NC}"
    else
        if command -v openssl &> /dev/null; then
            SECRET=$(openssl rand -base64 32)
            echo "NEXTAUTH_SECRET=\"$SECRET\"" >> .env.local
            echo -e "${GREEN}✅ NEXTAUTH_SECRET généré${NC}"
        else
            echo "NEXTAUTH_SECRET=\"change-me-in-production\"" >> .env.local
            echo -e "${YELLOW}⚠️  NEXTAUTH_SECRET par défaut ajouté (changez-le en production)${NC}"
        fi
    fi
fi

# Vérifier NODE_ENV
if ! grep -q "^NODE_ENV=" .env.local 2>/dev/null; then
    echo "NODE_ENV=\"development\"" >> .env.local
fi

echo ""

# Étape 2 : Installer les dépendances
echo -e "${CYAN}[2/6] Installation des dépendances...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installation en cours...${NC}"
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Dépendances installées${NC}"
    else
        echo -e "${RED}❌ Erreur lors de l'installation${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Dépendances déjà installées${NC}"
fi
echo ""

# Étape 3 : Générer Prisma Client
echo -e "${CYAN}[3/6] Génération Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma Client généré${NC}"
else
    echo -e "${RED}❌ Erreur lors de la génération Prisma Client${NC}"
    exit 1
fi
echo ""

# Étape 4 : Créer/Pousser la base de données
echo -e "${CYAN}[4/6] Configuration de la base de données...${NC}"
DB_URL=$(grep "^DATABASE_URL=" .env.local | cut -d'=' -f2- | sed 's/^"//' | sed 's/"$//')

if [[ "$DB_URL" == *"file:"* ]]; then
    echo -e "${YELLOW}Base de données SQLite détectée${NC}"
    # Créer le dossier storage si nécessaire
    mkdir -p storage
    npx prisma db push --accept-data-loss
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Base de données SQLite créée${NC}"
    else
        echo -e "${YELLOW}⚠️  Erreur lors de la création de la base (peut être normal si elle existe déjà)${NC}"
    fi
else
    echo -e "${YELLOW}Base de données PostgreSQL détectée${NC}"
    echo -e "${BLUE}Tentative de connexion...${NC}"
    npx prisma db push --accept-data-loss
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Base de données PostgreSQL configurée${NC}"
    else
        echo -e "${YELLOW}⚠️  Erreur de connexion à PostgreSQL${NC}"
        echo -e "${BLUE}Vérifiez que DATABASE_URL est correct dans .env.local${NC}"
    fi
fi
echo ""

# Étape 5 : Vérifier la configuration
echo -e "${CYAN}[5/6] Vérification de la configuration...${NC}"
if [ -f "lib/db.ts" ] && [ -f "lib/auth.ts" ] && [ -f "next.config.js" ]; then
    echo -e "${GREEN}✅ Fichiers critiques présents${NC}"
else
    echo -e "${RED}❌ Fichiers critiques manquants${NC}"
    exit 1
fi
echo ""

# Étape 6 : Démarrer le serveur
echo -e "${CYAN}[6/6] Démarrage du serveur de développement...${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🚀 SERVEUR EN COURS DE DÉMARRAGE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}L'application sera accessible sur :${NC}"
echo -e "${GREEN}   http://localhost:6001${NC}"
echo ""
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter le serveur${NC}"
echo ""

# Démarrer le serveur
npm run dev

