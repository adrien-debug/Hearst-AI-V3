#!/bin/bash

# Script pour obtenir l'URL Supabase avec l'ID du projet
# Projet ID: tjakoymdonbylndibedh

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_ID="tjakoymdonbylndibedh"
PROJECT_URL="https://supabase.com/dashboard/project/$PROJECT_ID"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 OBTENIR URL SUPABASE - Projet $PROJECT_ID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

echo -e "${BLUE}📋 Votre projet Supabase :${NC}"
echo "   $PROJECT_URL"
echo ""

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé${NC}"
    exit 1
fi

if ! vercel whoami &> /dev/null; then
    echo -e "${RED}❌ Vous n'êtes pas connecté à Vercel CLI${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Vercel CLI configuré${NC}"
echo ""

# Guide pour obtenir l'URL
echo -e "${BLUE}📋 POUR OBTENIR L'URL SUPABASE :${NC}"
echo ""
echo "1. Ouvrez votre navigateur et allez sur :"
echo "   $PROJECT_URL"
echo ""
echo "2. Dans le menu de gauche, cliquez sur 'Settings' (⚙️)"
echo ""
echo "3. Cliquez sur 'Database'"
echo ""
echo "4. Faites défiler jusqu'à 'Connection string'"
echo ""
echo "5. Cliquez sur l'onglet 'URI'"
echo ""
echo "6. COPIEZ toute l'URL (format :)"
echo "   postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
echo ""
echo "   OU"
echo ""
echo "   postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
echo ""

# Essayer d'utiliser l'API Supabase si une clé est fournie
echo -e "${CYAN}Voulez-vous essayer d'utiliser l'API Supabase ? (o/n)${NC}"
read -r use_api

if [[ "$use_api" == "o" ]] || [[ "$use_api" == "O" ]]; then
    echo ""
    echo -e "${BLUE}Pour obtenir une clé API Supabase :${NC}"
    echo "1. Allez sur : $PROJECT_URL"
    echo "2. Settings → API → Project API keys"
    echo "3. Copiez la 'service_role' key (⚠️ gardez-la secrète)"
    echo ""
    echo -e "${CYAN}Collez votre clé API Supabase (service_role) :${NC}"
    read -r SUPABASE_API_KEY
    
    if [ -n "$SUPABASE_API_KEY" ]; then
        echo ""
        echo -e "${YELLOW}Tentative d'obtention de l'URL via l'API...${NC}"
        
        # Essayer d'obtenir les détails du projet
        API_RESPONSE=$(curl -s -H "apikey: $SUPABASE_API_KEY" \
                            -H "Authorization: Bearer $SUPABASE_API_KEY" \
                            "https://api.supabase.com/v1/projects/$PROJECT_ID" 2>&1)
        
        if echo "$API_RESPONSE" | grep -q "db_host\|connection_string"; then
            echo -e "${GREEN}✅ Informations obtenues via l'API${NC}"
            
            # Extraire le host
            DB_HOST=$(echo "$API_RESPONSE" | grep -o '"db_host":"[^"]*"' | cut -d'"' -f4)
            DB_PASSWORD=$(echo "$API_RESPONSE" | grep -o '"db_password":"[^"]*"' | cut -d'"' -f4)
            
            if [ -n "$DB_HOST" ]; then
                if [ -z "$DB_PASSWORD" ]; then
                    echo ""
                    echo -e "${CYAN}Entrez le mot de passe de la base de données (trouvé dans .env.vercel : Adrien0334$$) :${NC}"
                    read -s DB_PASSWORD
                    if [ -z "$DB_PASSWORD" ]; then
                        DB_PASSWORD="Adrien0334\$\$"
                    fi
                fi
                
                # Construire l'URL
                SUPABASE_URL="postgresql://postgres:${DB_PASSWORD}@${DB_HOST}:5432/postgres"
                echo ""
                echo -e "${GREEN}✅ URL construite automatiquement !${NC}"
            else
                echo -e "${YELLOW}⚠️  Impossible d'extraire l'URL depuis l'API${NC}"
                SUPABASE_URL=""
            fi
        else
            echo -e "${YELLOW}⚠️  L'API n'a pas retourné les informations attendues${NC}"
            SUPABASE_URL=""
        fi
    fi
fi

# Si l'URL n'a pas été obtenue automatiquement, demander manuellement
if [ -z "$SUPABASE_URL" ]; then
    echo ""
    echo -e "${CYAN}Collez l'URL Supabase ici :${NC}"
    read -r SUPABASE_URL
fi

if [ -z "$SUPABASE_URL" ]; then
    echo -e "${RED}❌ URL vide${NC}"
    exit 1
fi

# Nettoyer l'URL
SUPABASE_URL=$(echo "$SUPABASE_URL" | tr -d '\n' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//' | sed 's/\\n//g')

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
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}CONFIGURATION DANS VERCEL...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Configurer pour chaque environnement
for env in production preview development; do
    echo -e "${YELLOW}[$env] Configuration...${NC}"
    vercel env rm DATABASE_URL "$env" --yes 2>&1 | grep -v "Retrieving project" | grep -v "Removing" || true
    echo "$SUPABASE_URL" | vercel env add DATABASE_URL "$env" 2>&1 | grep -v "Retrieving project" | grep -v "Adding" || true
    echo -e "${GREEN}✅ [$env] Configuré${NC}"
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ DATABASE_URL CONFIGURÉ AVEC SUCCÈS !${NC}"
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

