#!/bin/bash

# Script pour configurer .env.local avec DATABASE_URL

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

cd "$(dirname "$0")"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 CONFIGURATION .env.local"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Créer .env.local si nécessaire
if [ ! -f ".env.local" ]; then
    touch .env.local
    echo -e "${GREEN}✅ Fichier .env.local créé${NC}"
fi

# URL Supabase
SUPABASE_URL="postgresql://postgres:Adrien0334\$\$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres"

# Vérifier si DATABASE_URL existe déjà
if grep -q "^DATABASE_URL=" .env.local; then
    echo -e "${YELLOW}⚠️  DATABASE_URL existe déjà dans .env.local${NC}"
    echo ""
    echo "Valeur actuelle :"
    grep "^DATABASE_URL=" .env.local | sed 's/:[^:@]*@/:***@/g'
    echo ""
    echo -e "${BLUE}Voulez-vous la remplacer ? (o/n)${NC}"
    read -r replace
    if [[ "$replace" == "o" ]] || [[ "$replace" == "O" ]]; then
        # Supprimer l'ancienne ligne
        sed -i '' '/^DATABASE_URL=/d' .env.local
        echo "DATABASE_URL=\"$SUPABASE_URL\"" >> .env.local
        echo -e "${GREEN}✅ DATABASE_URL mis à jour${NC}"
    else
        echo -e "${YELLOW}DATABASE_URL conservé${NC}"
    fi
else
    echo "DATABASE_URL=\"$SUPABASE_URL\"" >> .env.local
    echo -e "${GREEN}✅ DATABASE_URL ajouté${NC}"
fi

# Vérifier NEXTAUTH_URL
if ! grep -q "^NEXTAUTH_URL=" .env.local; then
    echo "NEXTAUTH_URL=\"http://localhost:6001\"" >> .env.local
    echo -e "${GREEN}✅ NEXTAUTH_URL ajouté${NC}"
fi

# Vérifier NEXTAUTH_SECRET
if ! grep -q "^NEXTAUTH_SECRET=" .env.local; then
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
            echo -e "${YELLOW}⚠️  NEXTAUTH_SECRET par défaut ajouté${NC}"
        fi
    fi
fi

# Vérifier NODE_ENV
if ! grep -q "^NODE_ENV=" .env.local; then
    echo "NODE_ENV=\"development\"" >> .env.local
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ CONFIGURATION TERMINÉE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}Contenu de .env.local :${NC}"
cat .env.local | sed 's/:[^:@]*@/:***@/g'
echo ""

