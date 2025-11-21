#!/bin/bash

# Script semi-automatique pour configurer DATABASE_URL dans Vercel
# Vous devrez quand même copier l'URL depuis Supabase Dashboard

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 CONFIGURATION DATABASE_URL - Vercel CLI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé${NC}"
    echo ""
    echo "Installation :"
    echo "  npm i -g vercel"
    echo ""
    echo "Puis reconnectez-vous :"
    echo "  vercel login"
    echo ""
    exit 1
fi

# Vérifier si l'utilisateur est connecté
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vous n'êtes pas connecté à Vercel CLI${NC}"
    echo ""
    echo "Connectez-vous avec :"
    echo "  vercel login"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Vercel CLI configuré${NC}"
echo ""

# Instructions
echo -e "${BLUE}📋 INSTRUCTIONS :${NC}"
echo ""
echo "1. Allez sur https://supabase.com/dashboard"
echo "2. Sélectionnez votre projet"
echo "3. Settings → Database → Connection String → URI"
echo "4. Copiez l'URL complète"
echo ""
echo -e "${YELLOW}⚠️  L'URL doit ressembler à :${NC}"
echo "   postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
echo ""

# Demander l'URL
echo -e "${BLUE}Collez l'URL Supabase ici :${NC}"
read -r SUPABASE_URL

# Vérifier le format
if [[ ! "$SUPABASE_URL" =~ ^postgresql:// ]] && [[ ! "$SUPABASE_URL" =~ ^postgres:// ]]; then
    echo -e "${RED}❌ Format d'URL invalide${NC}"
    echo "L'URL doit commencer par 'postgresql://' ou 'postgres://'"
    exit 1
fi

if [[ "$SUPABASE_URL" == *"xxx"* ]] || [[ "$SUPABASE_URL" == *"placeholder"* ]]; then
    echo -e "${RED}❌ L'URL contient un placeholder${NC}"
    echo "Assurez-vous d'avoir copié la vraie URL depuis Supabase Dashboard"
    exit 1
fi

echo ""
echo -e "${BLUE}Configuration de DATABASE_URL dans Vercel...${NC}"
echo ""

# Ajouter pour Production
echo -e "${YELLOW}Ajout pour Production...${NC}"
echo "$SUPABASE_URL" | vercel env add DATABASE_URL production 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Production configuré${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'ajout pour Production${NC}"
fi

# Ajouter pour Preview
echo ""
echo -e "${YELLOW}Ajout pour Preview...${NC}"
echo "$SUPABASE_URL" | vercel env add DATABASE_URL preview 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Preview configuré${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'ajout pour Preview${NC}"
fi

# Ajouter pour Development
echo ""
echo -e "${YELLOW}Ajout pour Development...${NC}"
echo "$SUPABASE_URL" | vercel env add DATABASE_URL development 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Development configuré${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'ajout pour Development${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ CONFIGURATION TERMINÉE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}Vérification des variables :${NC}"
vercel env ls | grep DATABASE_URL
echo ""
echo -e "${YELLOW}⚠️  N'oubliez pas de redéployer :${NC}"
echo "   vercel --prod"
echo "   ou"
echo "   Allez sur Vercel Dashboard → Deployments → Redeploy"
echo ""

