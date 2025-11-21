#!/bin/bash

# Script pour obtenir automatiquement l'URL Supabase et la configurer dans Vercel
# Utilise l'API Supabase si une clé API est fournie

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 OBTENIR URL SUPABASE AUTOMATIQUEMENT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

# Vérifier si curl est disponible
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ curl n'est pas installé${NC}"
    exit 1
fi

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé${NC}"
    exit 1
fi

echo -e "${BLUE}📋 OPTIONS POUR OBTENIR L'URL SUPABASE :${NC}"
echo ""
echo "1. Utiliser l'API Supabase (si vous avez une clé API)"
echo "2. Guide manuel (ouvrir Supabase Dashboard)"
echo ""
echo -e "${CYAN}Choisissez une option (1 ou 2) :${NC}"
read -r option

if [ "$option" = "1" ]; then
    echo ""
    echo -e "${BLUE}Pour utiliser l'API Supabase :${NC}"
    echo "1. Allez sur https://supabase.com/dashboard/org/etcwyazrdadzweuvvxuy"
    echo "2. Cliquez sur votre projet"
    echo "3. Settings → API → Project API keys"
    echo "4. Copiez la 'service_role' key (ou 'anon' key)"
    echo ""
    echo -e "${CYAN}Collez votre clé API Supabase :${NC}"
    read -r SUPABASE_API_KEY
    
    if [ -z "$SUPABASE_API_KEY" ]; then
        echo -e "${RED}❌ Clé API vide${NC}"
        exit 1
    fi
    
    echo ""
    echo -e "${YELLOW}Tentative d'obtention de l'URL via l'API...${NC}"
    
    # Essayer d'obtenir les projets
    ORG_ID="etcwyazrdadzweuvvxuy"
    RESPONSE=$(curl -s -H "apikey: $SUPABASE_API_KEY" \
                    -H "Authorization: Bearer $SUPABASE_API_KEY" \
                    "https://api.supabase.com/v1/projects" 2>&1)
    
    if echo "$RESPONSE" | grep -q "id"; then
        echo -e "${GREEN}✅ Connexion à l'API Supabase réussie${NC}"
        echo ""
        echo "Projets trouvés :"
        echo "$RESPONSE" | grep -o '"id":"[^"]*"' | sed 's/"id":"\([^"]*\)"/  - \1/' | head -5
        echo ""
        echo -e "${CYAN}Entrez l'ID de votre projet Supabase :${NC}"
        read -r PROJECT_ID
        
        if [ -n "$PROJECT_ID" ]; then
            # Essayer d'obtenir les détails du projet
            PROJECT_DETAILS=$(curl -s -H "apikey: $SUPABASE_API_KEY" \
                                   -H "Authorization: Bearer $SUPABASE_API_KEY" \
                                   "https://api.supabase.com/v1/projects/$PROJECT_ID" 2>&1)
            
            # Extraire l'URL de la base de données si disponible
            DB_HOST=$(echo "$PROJECT_DETAILS" | grep -o '"db_host":"[^"]*"' | cut -d'"' -f4)
            
            if [ -n "$DB_HOST" ]; then
                echo -e "${GREEN}✅ Host trouvé : $DB_HOST${NC}"
                echo ""
                echo -e "${CYAN}Entrez le mot de passe de la base de données (trouvé dans .env.vercel : Adrien0334$$) :${NC}"
                read -s DB_PASSWORD
                
                if [ -z "$DB_PASSWORD" ]; then
                    DB_PASSWORD="Adrien0334\$\$"
                fi
                
                SUPABASE_URL="postgresql://postgres:${DB_PASSWORD}@${DB_HOST}:5432/postgres"
                echo ""
                echo -e "${GREEN}✅ URL construite${NC}"
            else
                echo -e "${YELLOW}⚠️  Impossible d'obtenir l'URL automatiquement${NC}"
                echo "Passons à l'option manuelle..."
                option="2"
            fi
        else
            echo -e "${YELLOW}⚠️  ID de projet non fourni${NC}"
            option="2"
        fi
    else
        echo -e "${YELLOW}⚠️  Impossible de se connecter à l'API Supabase${NC}"
        echo "Erreur : $RESPONSE"
        echo ""
        echo "Passons à l'option manuelle..."
        option="2"
    fi
fi

if [ "$option" = "2" ] || [ -z "$SUPABASE_URL" ]; then
    echo ""
    echo -e "${BLUE}📋 GUIDE MANUEL :${NC}"
    echo ""
    echo "1. Ouvrez votre navigateur et allez sur :"
    echo "   https://supabase.com/dashboard/org/etcwyazrdadzweuvvxuy"
    echo ""
    echo "2. Cliquez sur votre projet HearstAI (ou le nom de votre projet)"
    echo ""
    echo "3. Dans le menu de gauche, cliquez sur 'Settings' (⚙️)"
    echo ""
    echo "4. Cliquez sur 'Database'"
    echo ""
    echo "5. Faites défiler jusqu'à la section 'Connection string'"
    echo ""
    echo "6. Cliquez sur l'onglet 'URI'"
    echo ""
    echo "7. COPIEZ toute l'URL (elle ressemble à :)"
    echo "   postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
    echo ""
    echo -e "${CYAN}Collez l'URL Supabase ici :${NC}"
    read -r SUPABASE_URL
fi

if [ -z "$SUPABASE_URL" ]; then
    echo -e "${RED}❌ URL vide${NC}"
    exit 1
fi

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

# Supprimer l'ancienne valeur et ajouter la nouvelle
for env in production preview development; do
    echo -e "${YELLOW}Configuration pour $env...${NC}"
    vercel env rm DATABASE_URL "$env" --yes 2>&1 | grep -v "Retrieving project" || true
    echo "$SUPABASE_URL" | vercel env add DATABASE_URL "$env" 2>&1 | grep -v "Retrieving project" || true
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ DATABASE_URL CONFIGURÉ AVEC SUCCÈS !${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}Vérification :${NC}"
vercel env ls | grep DATABASE_URL
echo ""
echo -e "${YELLOW}⚠️  REDÉPLOIEMENT REQUIS :${NC}"
echo ""
echo "Option 1 - Via Vercel CLI :"
echo "  vercel --prod"
echo ""
echo "Option 2 - Via Vercel Dashboard :"
echo "  https://vercel.com/dashboard"
echo "  → Votre projet → Deployments → ⋯ → Redeploy"
echo ""

