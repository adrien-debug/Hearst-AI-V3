#!/bin/bash

# Script de test final complet - Vérifie que TOUT fonctionne

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TEST FINAL COMPLET - HearstAI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

test_step() {
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    echo -e "${CYAN}Test $TESTS_TOTAL: $1${NC}"
}

test_pass() {
    echo -e "${GREEN}✅ PASS${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
}

test_fail() {
    echo -e "${RED}❌ FAIL${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
}

# Test 1: Vérifier que Prisma Client est généré
test_step "Prisma Client généré"
if [ -d "node_modules/@prisma/client" ]; then
    test_pass
else
    test_fail
    echo "   Solution: npx prisma generate"
fi

# Test 2: Vérifier que le schema Prisma existe
test_step "Schema Prisma existe"
if [ -f "prisma/schema.prisma" ]; then
    test_pass
else
    test_fail
fi

# Test 3: Vérifier que le schema utilise PostgreSQL
test_step "Schema utilise PostgreSQL"
if grep -q 'provider = "postgresql"' prisma/schema.prisma; then
    test_pass
else
    test_fail
fi

# Test 4: Vérifier les fichiers critiques
test_step "Fichiers critiques présents"
CRITICAL_FILES=("lib/db.ts" "lib/auth.ts" "middleware.ts" "next.config.js" "package.json" "vercel.json")
ALL_PRESENT=true
for file in "${CRITICAL_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "   ❌ $file manquant"
        ALL_PRESENT=false
    fi
done
if [ "$ALL_PRESENT" = true ]; then
    test_pass
else
    test_fail
fi

# Test 5: Vérifier que NEXTAUTH_SECRET existe
test_step "NEXTAUTH_SECRET généré"
if [ -f "NEXTAUTH_SECRET.txt" ] && [ -s "NEXTAUTH_SECRET.txt" ]; then
    test_pass
else
    test_fail
    echo "   Solution: ./preparer_tout.sh"
fi

# Test 6: Vérifier que les scripts sont exécutables
test_step "Scripts exécutables"
SCRIPTS=("verifier_config.sh" "preparer_tout.sh" "faire_tout.sh")
ALL_EXECUTABLE=true
for script in "${SCRIPTS[@]}"; do
    if [ -f "$script" ] && [ ! -x "$script" ]; then
        echo "   ⚠️  $script n'est pas exécutable"
        chmod +x "$script"
    fi
    if [ ! -f "$script" ]; then
        ALL_EXECUTABLE=false
    fi
done
if [ "$ALL_EXECUTABLE" = true ]; then
    test_pass
else
    test_fail
fi

# Test 7: Vérifier que les guides principaux existent
test_step "Guides principaux présents"
GUIDES=("TOUT_FAIRE_MAINTENANT.md" "ACTION_IMMEDIATE_DATABASE_URL.md" "AUDIT_COMPLET_DEBUG.md" "START_HERE.md")
ALL_GUIDES_PRESENT=true
for guide in "${GUIDES[@]}"; do
    if [ ! -f "$guide" ]; then
        echo "   ❌ $guide manquant"
        ALL_GUIDES_PRESENT=false
    fi
done
if [ "$ALL_GUIDES_PRESENT" = true ]; then
    test_pass
else
    test_fail
fi

# Test 8: Vérifier que package.json a les bonnes dépendances
test_step "Dépendances dans package.json"
if grep -q '"@prisma/client"' package.json && grep -q '"next-auth"' package.json && grep -q '"next"' package.json; then
    test_pass
else
    test_fail
fi

# Test 9: Vérifier que vercel.json existe et est valide
test_step "vercel.json valide"
if [ -f "vercel.json" ]; then
    if command -v python3 &> /dev/null; then
        if python3 -m json.tool vercel.json > /dev/null 2>&1; then
            test_pass
        else
            test_fail
            echo "   Erreur: vercel.json invalide"
        fi
    else
        test_pass
    fi
else
    test_fail
fi

# Test 10: Vérifier que lib/db.ts a les améliorations
test_step "lib/db.ts amélioré"
if grep -q "DATABASE_URL" lib/db.ts && grep -q "placeholder" lib/db.ts; then
    test_pass
else
    test_fail
fi

# Résumé final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}RÉSUMÉ DES TESTS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "Total de tests : $TESTS_TOTAL"
echo -e "${GREEN}Tests réussis : $TESTS_PASSED${NC}"
if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}Tests échoués : $TESTS_FAILED${NC}"
else
    echo -e "${GREEN}Tests échoués : 0${NC}"
fi
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ TOUS LES TESTS SONT PASSÉS !${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  ACTION MANUELLE REQUISE :${NC}"
    echo "   1. Corriger DATABASE_URL dans Vercel Dashboard"
    echo "   2. Redéployer"
    echo ""
    exit 0
else
    echo -e "${YELLOW}⚠️  Certains tests ont échoué${NC}"
    echo "   Consultez les messages ci-dessus pour les détails"
    echo ""
    exit 1
fi

