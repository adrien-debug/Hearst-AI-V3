#!/bin/bash

# Script pour générer l'URL Supabase avec pooler
# Projet ID: tjakoymdonbylndibedh

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ID="tjakoymdonbylndibedh"
PASSWORD="Adrien0334\$\$"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 GÉNÉRATION URL SUPABASE AVEC POOLER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}URLs possibles avec pooler :${NC}"
echo ""

# Format 1 : Pooler avec port 6543
URL1="postgresql://postgres.${PROJECT_ID}:${PASSWORD}@db.${PROJECT_ID}.supabase.co:6543/postgres"
echo -e "${GREEN}Format 1 (Port 6543 - Pooler) :${NC}"
echo "$URL1"
echo ""

# Format 2 : Pooler avec aws-0 (essayer différentes régions)
REGIONS=("eu-west-1" "us-east-1" "us-west-1" "ap-southeast-1")
echo -e "${BLUE}Format 2 (AWS Pooler - différentes régions) :${NC}"
for region in "${REGIONS[@]}"; do
    URL2="postgresql://postgres.${PROJECT_ID}:${PASSWORD}@aws-0-${region}.pooler.supabase.com:5432/postgres?pgbouncer=true"
    echo "$URL2"
done
echo ""

echo -e "${YELLOW}⚠️  IMPORTANT :${NC}"
echo "1. Vérifiez dans Supabase Dashboard quelle région vous utilisez"
echo "2. Utilisez l'URL correspondant à votre région"
echo "3. Ou utilisez le Format 1 (port 6543) qui fonctionne généralement"
echo ""

echo -e "${BLUE}Pour obtenir l'URL exacte depuis Supabase :${NC}"
echo "1. https://supabase.com/dashboard/project/${PROJECT_ID}"
echo "2. Settings → Database → Connection string"
echo "3. Onglet 'Session mode' ou 'Transaction mode'"
echo "4. Copiez l'URL avec 'pooler' ou port 6543"
echo ""

# Demander quelle URL utiliser
echo -e "${YELLOW}Quelle URL voulez-vous utiliser ?${NC}"
echo "1. Format 1 (Port 6543)"
echo "2. Format 2 (AWS Pooler - vous devrez choisir la région)"
echo "3. J'ai l'URL depuis Supabase Dashboard"
echo ""
echo -e "${BLUE}Votre choix (1, 2 ou 3) :${NC}"
read -r choice

FINAL_URL=""

if [ "$choice" = "1" ]; then
    FINAL_URL="$URL1"
    echo -e "${GREEN}✅ URL sélectionnée : Format 1${NC}"
elif [ "$choice" = "2" ]; then
    echo ""
    echo -e "${BLUE}Choisissez votre région :${NC}"
    for i in "${!REGIONS[@]}"; do
        echo "$((i+1)). ${REGIONS[$i]}"
    done
    echo -e "${CYAN}Votre choix (1-${#REGIONS[@]}) :${NC}"
    read -r region_choice
    region_index=$((region_choice - 1))
    if [ $region_index -ge 0 ] && [ $region_index -lt ${#REGIONS[@]} ]; then
        selected_region="${REGIONS[$region_index]}"
        FINAL_URL="postgresql://postgres.${PROJECT_ID}:${PASSWORD}@aws-0-${selected_region}.pooler.supabase.com:5432/postgres?pgbouncer=true"
        echo -e "${GREEN}✅ URL sélectionnée : Format 2 (${selected_region})${NC}"
    else
        echo -e "${RED}❌ Choix invalide${NC}"
        exit 1
    fi
elif [ "$choice" = "3" ]; then
    echo ""
    echo -e "${CYAN}Collez l'URL depuis Supabase Dashboard :${NC}"
    read -r FINAL_URL
else
    echo -e "${RED}❌ Choix invalide${NC}"
    exit 1
fi

if [ -z "$FINAL_URL" ]; then
    echo -e "${RED}❌ URL vide${NC}"
    exit 1
fi

# Nettoyer l'URL
FINAL_URL=$(echo "$FINAL_URL" | tr -d '\n' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}URL GÉNÉRÉE :${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "$FINAL_URL" | sed 's/:[^:@]*@/:***@/g'
echo ""

# Sauvegarder dans un fichier
echo "$FINAL_URL" > SUPABASE_URL_POOLER.txt
echo -e "${GREEN}✅ URL sauvegardée dans SUPABASE_URL_POOLER.txt${NC}"
echo ""

# Proposer de configurer dans Vercel
echo -e "${BLUE}Voulez-vous configurer cette URL dans Vercel maintenant ? (o/n)${NC}"
read -r configure_vercel

if [[ "$configure_vercel" == "o" ]] || [[ "$configure_vercel" == "O" ]]; then
    echo ""
    echo -e "${BLUE}Configuration dans Vercel...${NC}"
    
    if command -v vercel &> /dev/null && vercel whoami &> /dev/null; then
        for env in production preview development; do
            echo -e "${YELLOW}[$env] Configuration...${NC}"
            vercel env rm DATABASE_URL "$env" --yes 2>&1 | grep -v "Retrieving project" || true
            echo "$FINAL_URL" | vercel env add DATABASE_URL "$env" 2>&1 | grep -v "Retrieving project" || true
        done
        echo ""
        echo -e "${GREEN}✅ Configuration terminée !${NC}"
        echo ""
        echo -e "${YELLOW}Redéployez maintenant :${NC}"
        echo "  vercel --prod"
    else
        echo -e "${YELLOW}⚠️  Vercel CLI non configuré${NC}"
        echo ""
        echo "Configurez manuellement dans Vercel Dashboard :"
        echo "1. https://vercel.com/dashboard"
        echo "2. Projet hearst-ai-v3 → Settings → Environment Variables"
        echo "3. Ajoutez DATABASE_URL avec cette valeur :"
        echo "   $FINAL_URL"
    fi
else
    echo ""
    echo -e "${BLUE}Pour configurer manuellement dans Vercel :${NC}"
    echo "1. https://vercel.com/dashboard"
    echo "2. Projet hearst-ai-v3 → Settings → Environment Variables"
    echo "3. Ajoutez DATABASE_URL avec cette valeur :"
    echo "   $FINAL_URL"
fi

echo ""

