#!/bin/bash

# Script pour configurer DATABASE_URL directement dans Vercel
# Usage: ./configurer_database_url_direct.sh "postgresql://..."

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SUPABASE_URL="$1"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 CONFIGURATION DATABASE_URL - Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé${NC}"
    exit 1
fi

# Vérifier la connexion
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}❌ Vous n'êtes pas connecté à Vercel CLI${NC}"
    exit 1
fi

# Si aucune URL fournie, demander
if [ -z "$SUPABASE_URL" ]; then
    echo -e "${BLUE}📋 Pour obtenir l'URL Supabase :${NC}"
    echo ""
    echo "1. Allez sur : https://supabase.com/dashboard/org/etcwyazrdadzweuvvxuy"
    echo "2. Cliquez sur votre projet"
    echo "3. Settings → Database → Connection String → URI"
    echo "4. Copiez l'URL complète"
    echo ""
    echo -e "${YELLOW}Collez l'URL Supabase ici :${NC}"
    read -r SUPABASE_URL
fi

if [ -z "$SUPABASE_URL" ]; then
    echo -e "${RED}❌ URL vide${NC}"
    exit 1
fi

# Nettoyer l'URL (enlever les espaces, retours à la ligne)
SUPABASE_URL=$(echo "$SUPABASE_URL" | tr -d '\n' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')

# Vérifier le format
if [[ ! "$SUPABASE_URL" =~ ^postgresql:// ]] && [[ ! "$SUPABASE_URL" =~ ^postgres:// ]]; then
    echo -e "${RED}❌ Format d'URL invalide${NC}"
    echo "L'URL doit commencer par 'postgresql://' ou 'postgres://'"
    exit 1
fi

if [[ "$SUPABASE_URL" == *"xxx"* ]] || [[ "$SUPABASE_URL" == *"placeholder"* ]]; then
    echo -e "${RED}❌ L'URL contient encore un placeholder${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Configuration de DATABASE_URL dans Vercel...${NC}"
echo ""

# Supprimer et ajouter pour chaque environnement
for env in production preview development; do
    echo -e "${YELLOW}[$env] Suppression de l'ancienne valeur...${NC}"
    vercel env rm DATABASE_URL "$env" --yes 2>&1 | grep -v "Retrieving project" | grep -v "Removing" || true
    
    echo -e "${YELLOW}[$env] Ajout de la nouvelle valeur...${NC}"
    echo "$SUPABASE_URL" | vercel env add DATABASE_URL "$env" 2>&1 | grep -v "Retrieving project" | grep -v "Adding" || true
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ [$env] Configuré${NC}"
    else
        echo -e "${RED}❌ [$env] Erreur${NC}"
    fi
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ CONFIGURATION TERMINÉE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}Vérification :${NC}"
vercel env ls | grep DATABASE_URL
echo ""
echo -e "${YELLOW}⚠️  REDÉPLOIEMENT REQUIS :${NC}"
echo ""
echo "Pour redéployer :"
echo "  vercel --prod"
echo ""
echo "Ou via Vercel Dashboard :"
echo "  https://vercel.com/dashboard"
echo "  → Votre projet → Deployments → ⋯ → Redeploy"
echo ""

