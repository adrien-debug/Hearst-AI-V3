#!/bin/bash
# Script pour configurer DATABASE_URL dans hearst-ai-v3

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

cd "$(dirname "$0")"

URL_CORRIGEE=$(cat SUPABASE_URL_CORRIGEE.txt)

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 CONFIGURATION hearst-ai-v3"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -z "$URL_CORRIGEE" ]; then
    echo -e "${YELLOW}❌ URL non trouvée dans SUPABASE_URL_CORRIGEE.txt${NC}"
    exit 1
fi

echo -e "${BLUE}URL à configurer :${NC}"
echo "$URL_CORRIGEE" | sed 's/:[^:@]*@/:***@/g'
echo ""

# Essayer avec Vercel CLI
echo -e "${YELLOW}Tentative via Vercel CLI...${NC}"

for env in production preview development; do
    echo ""
    echo -e "${BLUE}[$env] Configuration...${NC}"
    
    # Essayer différentes méthodes
    echo "$URL_CORRIGEE" | vercel env add DATABASE_URL "$env" --project="hearst-ai-v3" 2>&1 | tail -3 || \
    echo "$URL_CORRIGEE" | vercel env add DATABASE_URL "$env" --scope adrien-nejkovics-projects 2>&1 | tail -3 || \
    echo -e "${YELLOW}⚠️  Configuration via CLI échouée pour $env${NC}"
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ CONFIGURATION TERMINÉE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}Si la configuration CLI a échoué,${NC}"
echo -e "${YELLOW}configurez manuellement dans Vercel Dashboard :${NC}"
echo ""
echo "1. https://vercel.com/dashboard"
echo "2. Projet hearst-ai-v3 → Settings → Environment Variables"
echo "3. Ajoutez DATABASE_URL avec :"
echo "   $URL_CORRIGEE"
echo "4. Cochez : Production, Preview, Development"
echo "5. Save → Redéployez"
echo ""
