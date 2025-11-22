#!/bin/bash

echo "🧪 TEST COMPLET DES APIs CALCULATOR"
echo "===================================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test 1: Backend Express Health
echo -e "${BLUE}1. Test Backend Express Health...${NC}"
RESPONSE=$(curl -s --max-time 5 http://localhost:4000/api/health 2>&1)
if echo "$RESPONSE" | grep -q "ok"; then
    echo -e "${GREEN}✅ Backend Express fonctionne${NC}"
    echo "   Réponse: $RESPONSE"
else
    echo -e "${RED}❌ Backend Express ne répond pas${NC}"
    echo "   → Démarrer: cd backend && npm start"
    exit 1
fi
echo ""

# Test 2: Backend Express hashprice-lite
echo -e "${BLUE}2. Test Backend Express /api/hashprice-lite...${NC}"
RESPONSE=$(curl -s --max-time 10 http://localhost:4000/api/hashprice-lite 2>&1)
if echo "$RESPONSE" | grep -q "btcPrice"; then
    echo -e "${GREEN}✅ API hashprice-lite fonctionne${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
else
    echo -e "${RED}❌ API hashprice-lite ne fonctionne pas${NC}"
    echo "   Réponse: $RESPONSE"
fi
echo ""

# Test 3: Next.js API hashprice-lite
echo -e "${BLUE}3. Test Next.js API /api/hashprice-lite...${NC}"
RESPONSE=$(curl -s --max-time 10 http://localhost:6001/api/hashprice-lite 2>&1)
if echo "$RESPONSE" | grep -q "btcPrice"; then
    echo -e "${GREEN}✅ Next.js API hashprice-lite fonctionne${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
else
    echo -e "${RED}❌ Next.js API hashprice-lite ne fonctionne pas${NC}"
    echo "   Réponse: $RESPONSE"
fi
echo ""

# Test 4: Page Calculator HTML
echo -e "${BLUE}4. Test Page Calculator /api/calculator...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:6001/api/calculator 2>&1)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Page Calculator accessible (HTTP $HTTP_CODE)${NC}"
    echo "   → Ouvrir: http://localhost:6001/calculator"
else
    echo -e "${RED}❌ Page Calculator non accessible (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Test 5: Routes Next.js
echo -e "${BLUE}5. Test Routes Next.js...${NC}"
HTTP_CODE_CALC=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:6001/calculator 2>&1)
HTTP_CODE_COLL=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:6001/collateral/calculator 2>&1)

if [ "$HTTP_CODE_CALC" = "200" ] || [ "$HTTP_CODE_CALC" = "307" ]; then
    echo -e "${GREEN}✅ Route /calculator accessible (HTTP $HTTP_CODE_CALC)${NC}"
else
    echo -e "${YELLOW}⚠️  Route /calculator: HTTP $HTTP_CODE_CALC${NC}"
fi

if [ "$HTTP_CODE_COLL" = "200" ] || [ "$HTTP_CODE_COLL" = "307" ]; then
    echo -e "${GREEN}✅ Route /collateral/calculator accessible (HTTP $HTTP_CODE_COLL)${NC}"
else
    echo -e "${YELLOW}⚠️  Route /collateral/calculator: HTTP $HTTP_CODE_COLL${NC}"
fi
echo ""

# Test 6: Fichiers statiques
echo -e "${BLUE}6. Vérification fichiers statiques...${NC}"
if [ -f "public/css/calculator.css" ]; then
    echo -e "${GREEN}✅ calculator.css présent${NC}"
else
    echo -e "${RED}❌ calculator.css manquant${NC}"
fi

if [ -f "public/js/calculator.js" ]; then
    echo -e "${GREEN}✅ calculator.js présent${NC}"
else
    echo -e "${RED}❌ calculator.js manquant${NC}"
fi

if [ -f "frontend/calculator.html" ]; then
    echo -e "${GREEN}✅ calculator.html présent${NC}"
else
    echo -e "${RED}❌ calculator.html manquant${NC}"
fi
echo ""

# Résumé
echo "===================================="
echo -e "${GREEN}✅ Tests terminés${NC}"
echo ""
echo "📋 URLs à tester dans le navigateur:"
echo "   • http://localhost:6001/calculator"
echo "   • http://localhost:6001/collateral/calculator"
echo "   • http://localhost:6001/api/calculator"
echo "   • http://localhost:6001/api/hashprice-lite"
echo ""

