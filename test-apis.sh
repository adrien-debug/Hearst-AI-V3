#!/bin/bash

echo "🧪 Test des APIs Calculator"
echo "=========================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}1. Test Backend Express (port 4000)...${NC}"
if curl -s -f --max-time 5 http://localhost:4000/api/hashprice-lite > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend Express fonctionne${NC}"
    echo "   Réponse:"
    curl -s http://localhost:4000/api/hashprice-lite | head -c 300
    echo ""
else
    echo -e "${RED}❌ Backend Express ne répond pas${NC}"
    echo "   → Vérifiez: cd backend && npm start"
fi

echo ""

echo -e "${YELLOW}2. Test Next.js API (port 6001)...${NC}"
if curl -s -f --max-time 5 http://localhost:6001/api/hashprice-lite > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Next.js API fonctionne${NC}"
    echo "   Réponse:"
    curl -s http://localhost:6001/api/hashprice-lite | head -c 300
    echo ""
else
    echo -e "${RED}❌ Next.js API ne répond pas${NC}"
    echo "   → Vérifiez: npm run dev"
fi

echo ""

echo -e "${YELLOW}3. Test Page Calculator...${NC}"
if curl -s -f --max-time 5 http://localhost:6001/api/calculator > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Page Calculator accessible${NC}"
    echo "   → Ouvrez: http://localhost:6001/calculator"
else
    echo -e "${RED}❌ Page Calculator non accessible${NC}"
fi

echo ""
echo "=========================="
echo "✅ Tests terminés"
