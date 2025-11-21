#!/bin/bash

# Script pour ajouter automatiquement les variables dans Vercel

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Ajout Variables Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI non installé${NC}"
    echo "Installez avec: npm i -g vercel"
    exit 1
fi

# Lier le projet si nécessaire
if [ ! -f ".vercel/project.json" ]; then
    echo "Liaison du projet Vercel..."
    vercel link --yes
fi

# Récupérer les valeurs
NEXTAUTH_SECRET=$(grep NEXTAUTH_SECRET .vercel_secrets.txt 2>/dev/null | cut -d'=' -f2)
if [ -z "$NEXTAUTH_SECRET" ]; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" > .vercel_secrets.txt
fi

DEBANK_KEY=$(grep DEBANK_ACCESS_KEY .env.local 2>/dev/null | cut -d'=' -f2 || echo "bd96b970a2c07a67739266c434cd0e8ea00fa656")

# Récupérer l'URL Vercel
VERCEL_URL=$(vercel inspect 2>/dev/null | grep -i "production\|url" | head -1 | awk '{print $NF}' | tr -d '()' || echo "")
if [ -z "$VERCEL_URL" ]; then
    echo -e "${YELLOW}⚠️  URL Vercel non détectée${NC}"
    echo "Entrez l'URL de votre déploiement Vercel:"
    read -p "URL: " VERCEL_URL
fi

echo ""
echo "📋 Variables à ajouter:"
echo ""
echo "1. NEXTAUTH_SECRET: $NEXTAUTH_SECRET"
echo "2. NEXTAUTH_URL: $VERCEL_URL"
echo "3. DEBANK_ACCESS_KEY: $DEBANK_KEY"
echo ""
read -p "Ajouter ces variables automatiquement? (oui/non): " confirm

if [ "$confirm" != "oui" ] && [ "$confirm" != "o" ]; then
    echo -e "${YELLOW}❌ Annulé${NC}"
    exit 0
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📤 Ajout des variables..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Ajouter NEXTAUTH_SECRET
echo "Ajout de NEXTAUTH_SECRET..."
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET production --yes 2>&1 | grep -v "password" || echo -e "${YELLOW}⚠️  Variable peut-être déjà existante${NC}"

# Ajouter NEXTAUTH_URL
echo ""
echo "Ajout de NEXTAUTH_URL..."
echo "$VERCEL_URL" | vercel env add NEXTAUTH_URL production --yes 2>&1 | grep -v "password" || echo -e "${YELLOW}⚠️  Variable peut-être déjà existante${NC}"

# Ajouter DEBANK_ACCESS_KEY
echo ""
echo "Ajout de DEBANK_ACCESS_KEY..."
echo "$DEBANK_KEY" | vercel env add DEBANK_ACCESS_KEY production --yes 2>&1 | grep -v "password" || echo -e "${YELLOW}⚠️  Variable peut-être déjà existante${NC}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Variables ajoutées${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "⚠️  IMPORTANT: DATABASE_URL doit être ajouté manuellement"
echo "   après avoir créé PostgreSQL sur Vercel"
echo ""
echo "📋 Vérifier les variables:"
echo "   vercel env ls"
echo ""

