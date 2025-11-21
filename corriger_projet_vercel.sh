#!/bin/bash

# Script pour configurer DATABASE_URL dans le bon projet Vercel
# Projet : hearst-ai-v3

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

SUPABASE_URL="postgresql://postgres:Adrien0334\$\$@db.tjakoymdonbylndibedh.supabase.co:5432/postgres"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 CONFIGURATION DATABASE_URL - hearst-ai-v3"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé${NC}"
    exit 1
fi

echo -e "${BLUE}Configuration de DATABASE_URL pour le projet hearst-ai-v3...${NC}"
echo ""

# Lister les projets pour trouver le bon
echo -e "${YELLOW}Recherche du projet hearst-ai-v3...${NC}"
PROJECTS=$(vercel project ls 2>&1)

if echo "$PROJECTS" | grep -q "hearst-ai-v3"; then
    echo -e "${GREEN}✅ Projet hearst-ai-v3 trouvé${NC}"
else
    echo -e "${YELLOW}⚠️  Projet hearst-ai-v3 non trouvé dans la liste${NC}"
    echo "Projets disponibles :"
    echo "$PROJECTS"
    echo ""
    echo -e "${CYAN}Entrez le nom exact du projet Vercel :${NC}"
    read -r PROJECT_NAME
    if [ -z "$PROJECT_NAME" ]; then
        PROJECT_NAME="hearst-ai-v3"
    fi
fi

# Configurer pour chaque environnement
for env in production preview development; do
    echo ""
    echo -e "${YELLOW}[$env] Configuration...${NC}"
    
    # Essayer de supprimer l'ancienne valeur (peut échouer si elle n'existe pas)
    vercel env rm DATABASE_URL "$env" --yes --scope adrien-nejkovics-projects 2>&1 | grep -v "Retrieving project" | grep -v "Removing" || true
    
    # Ajouter la nouvelle valeur
    echo "$SUPABASE_URL" | vercel env add DATABASE_URL "$env" --scope adrien-nejkovics-projects 2>&1 | grep -v "Retrieving project" | grep -v "Adding" || true
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ [$env] Configuré${NC}"
    else
        echo -e "${RED}❌ [$env] Erreur - Essayez manuellement dans Vercel Dashboard${NC}"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ CONFIGURATION TERMINÉE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}Vérification :${NC}"
vercel env ls --scope adrien-nejkovics-projects 2>&1 | grep DATABASE_URL || echo "Vérifiez dans Vercel Dashboard"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANT :${NC}"
echo "Si le script n'a pas fonctionné, configurez manuellement :"
echo ""
echo "1. Allez sur : https://vercel.com/dashboard"
echo "2. Sélectionnez le projet 'hearst-ai-v3'"
echo "3. Settings → Environment Variables"
echo "4. Ajoutez DATABASE_URL avec cette valeur :"
echo "   $SUPABASE_URL"
echo "5. Cochez : Production, Preview, Development"
echo "6. Save"
echo ""
echo -e "${YELLOW}Ensuite redéployez :${NC}"
echo "  vercel --prod"
echo ""

