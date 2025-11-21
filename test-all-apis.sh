#!/bin/bash

echo "🧪 TEST COMPLET DE TOUTES LES APIs CALCULATOR"
echo "=============================================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Test 1: Backend - Hashprice Lite
echo -e "${BLUE}1. Backend GET /api/hashprice-lite${NC}"
RESPONSE=$(curl -s --max-time 5 http://localhost:4000/api/hashprice-lite)
if echo "$RESPONSE" | grep -q "btcPrice"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -8
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 2: Backend - Calculator Metrics
echo -e "${BLUE}2. Backend GET /api/calculator/metrics${NC}"
RESPONSE=$(curl -s --max-time 5 http://localhost:4000/api/calculator/metrics)
if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -10
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 3: Backend - Calculator Calculate
echo -e "${BLUE}3. Backend POST /api/calculator/calculate${NC}"
RESPONSE=$(curl -s --max-time 10 -X POST http://localhost:4000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"hashrate":100,"power":3500,"electricity":0.05,"equipmentCost":5000}')
if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -15
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 4: Backend - Calculator Projection
echo -e "${BLUE}4. Backend GET /api/calculator/projection${NC}"
RESPONSE=$(curl -s --max-time 10 "http://localhost:4000/api/calculator/projection?hashrate=100&power=3500&electricity=0.05&equipmentCost=5000&months=12")
if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -20
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 5: Next.js - Hashprice Lite
echo -e "${BLUE}5. Next.js GET /api/hashprice-lite${NC}"
RESPONSE=$(curl -s --max-time 5 http://localhost:6001/api/hashprice-lite)
if echo "$RESPONSE" | grep -q "btcPrice"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -8
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 6: Next.js - Calculator Metrics
echo -e "${BLUE}6. Next.js GET /api/calculator/metrics${NC}"
RESPONSE=$(curl -s --max-time 5 http://localhost:6001/api/calculator/metrics)
if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -10
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 7: Next.js - Calculator Calculate
echo -e "${BLUE}7. Next.js POST /api/calculator/calculate${NC}"
RESPONSE=$(curl -s --max-time 10 -X POST http://localhost:6001/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"hashrate":100,"power":3500,"electricity":0.05,"equipmentCost":5000}')
if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -15
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 8: Next.js - Calculator Projection
echo -e "${BLUE}8. Next.js GET /api/calculator/projection${NC}"
RESPONSE=$(curl -s --max-time 10 "http://localhost:6001/api/calculator/projection?hashrate=100&power=3500&electricity=0.05&equipmentCost=5000&months=12")
if echo "$RESPONSE" | grep -q "success"; then
    echo -e "${GREEN}✅ OK${NC}"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -20
else
    echo -e "${RED}❌ Erreur${NC}"
fi
echo ""

# Test 9: Next.js - Calculator HTML
echo -e "${BLUE}9. Next.js GET /api/calculator${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:6001/api/calculator)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ OK (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ Erreur (HTTP $HTTP_CODE)${NC}"
fi
echo ""

echo "=============================================="
echo -e "${GREEN}✅ Tests terminés${NC}"
echo ""
echo "📋 Documentation: APIS_CALCULATOR_COMPLETE.md"

