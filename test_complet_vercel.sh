#!/bin/bash

# Script de test complet pour Vercel

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Test Complet - Configuration Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Compteurs
TESTS_PASSED=0
TESTS_FAILED=0

test_check() {
    local name="$1"
    local command="$2"
    
    echo -n "Test: $name... "
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSÉ${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ ÉCHOUÉ${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

echo "📋 Vérification de la configuration..."
echo ""

# Test 1: Vercel CLI installé
test_check "Vercel CLI installé" "command -v vercel"

# Test 2: Projet lié
test_check "Projet Vercel lié" "[ -f .vercel/project.json ]"

# Test 3: Variables d'environnement
echo ""
echo "📦 Variables d'environnement Vercel:"
vercel env ls 2>&1 | grep -E "NEXTAUTH|DATABASE|DEBANK" || echo -e "${YELLOW}⚠️  Variables non trouvées${NC}"

# Test 4: Récupérer les variables
echo ""
echo "📥 Récupération des variables depuis Vercel..."
vercel env pull .env.vercel.test 2>&1 | tail -3

# Test 5: Vérifier NEXTAUTH_SECRET
if grep -q "NEXTAUTH_SECRET" .env.vercel.test 2>/dev/null; then
    echo -e "${GREEN}✅ NEXTAUTH_SECRET trouvé${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ NEXTAUTH_SECRET manquant${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 6: Vérifier NEXTAUTH_URL
if grep -q "NEXTAUTH_URL" .env.vercel.test 2>/dev/null; then
    echo -e "${GREEN}✅ NEXTAUTH_URL trouvé${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ NEXTAUTH_URL manquant${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 7: Vérifier DATABASE_URL
if grep -q "DATABASE_URL" .env.vercel.test 2>/dev/null; then
    DB_URL=$(grep "^DATABASE_URL=" .env.vercel.test | cut -d'=' -f2- | sed 's/^"//' | sed 's/"$//' | sed 's/\\n//g' | tr -d '\n' | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
    if echo "$DB_URL" | grep -q "^postgresql://"; then
        echo -e "${GREEN}✅ DATABASE_URL trouvé (format PostgreSQL)${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        
        # Test de connexion
        echo ""
        echo "🔌 Test de connexion à la base de données..."
        export DATABASE_URL="$DB_URL"
        if npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Connexion réussie${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        else
            echo -e "${YELLOW}⚠️  Connexion échouée (vérifiez l'URL)${NC}"
            TESTS_FAILED=$((TESTS_FAILED + 1))
        fi
    else
        echo -e "${RED}❌ DATABASE_URL format invalide${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
else
    echo -e "${RED}❌ DATABASE_URL manquant${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# Test 8: Vérifier DEBANK_ACCESS_KEY
if grep -q "DEBANK_ACCESS_KEY" .env.vercel.test 2>/dev/null; then
    echo -e "${GREEN}✅ DEBANK_ACCESS_KEY trouvé${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  DEBANK_ACCESS_KEY manquant (optionnel)${NC}"
fi

# Test 9: Prisma Client généré
if [ -d "node_modules/@prisma/client" ]; then
    echo -e "${GREEN}✅ Prisma Client généré${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${YELLOW}⚠️  Prisma Client non généré${NC}"
    echo "Génération..."
    npx prisma generate > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Prisma Client généré maintenant${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
fi

# Nettoyer
rm -f .env.vercel.test

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Résultats des tests"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}✅ Tests réussis: $TESTS_PASSED${NC}"
echo -e "${RED}❌ Tests échoués: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Tous les tests sont passés !${NC}"
    echo ""
    echo "Prochaine étape: Redéployer sur Vercel"
    echo "  vercel --prod"
else
    echo -e "${YELLOW}⚠️  Certains tests ont échoué${NC}"
    echo ""
    echo "Vérifiez les variables dans Vercel Dashboard"
fi

echo ""

