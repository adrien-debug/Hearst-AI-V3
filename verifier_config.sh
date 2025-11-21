#!/bin/bash

# Script de vérification de configuration HearstAI
# Vérifie que toutes les configurations sont correctes avant le déploiement

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "🔍 VÉRIFICATION DE CONFIGURATION HEARSTAI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ERRORS=0
WARNINGS=0

# 1. Vérifier que Prisma est installé
echo -e "${BLUE}1. Vérification Prisma...${NC}"
if command -v npx &> /dev/null; then
    if npx prisma --version &> /dev/null; then
        PRISMA_VERSION=$(npx prisma --version | head -n 1)
        echo -e "${GREEN}✅ Prisma installé: $PRISMA_VERSION${NC}"
    else
        echo -e "${RED}❌ Prisma non trouvé${NC}"
        echo -e "${YELLOW}   Solution: npm install${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ npx non trouvé${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Vérifier le schema Prisma
echo -e "${BLUE}2. Vérification schema Prisma...${NC}"
if [ -f "prisma/schema.prisma" ]; then
    if grep -q 'provider = "postgresql"' prisma/schema.prisma; then
        echo -e "${GREEN}✅ Schema Prisma utilise PostgreSQL${NC}"
    else
        echo -e "${YELLOW}⚠️  Schema Prisma n'utilise pas PostgreSQL${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q 'env("DATABASE_URL")' prisma/schema.prisma; then
        echo -e "${GREEN}✅ Schema Prisma utilise DATABASE_URL${NC}"
    else
        echo -e "${RED}❌ Schema Prisma n'utilise pas DATABASE_URL${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ Fichier prisma/schema.prisma non trouvé${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Vérifier les variables d'environnement locales
echo -e "${BLUE}3. Vérification variables d'environnement locales...${NC}"
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ Fichier .env.local trouvé${NC}"
    
    if grep -q "^DATABASE_URL=" .env.local; then
        DB_URL=$(grep "^DATABASE_URL=" .env.local | cut -d'=' -f2- | sed 's/^"//' | sed 's/"$//')
        if [[ "$DB_URL" == *"xxx"* ]] || [[ "$DB_URL" == *"placeholder"* ]]; then
            echo -e "${RED}❌ DATABASE_URL contient un placeholder${NC}"
            ERRORS=$((ERRORS + 1))
        elif [[ "$DB_URL" == *"postgresql://"* ]] || [[ "$DB_URL" == *"postgres://"* ]]; then
            echo -e "${GREEN}✅ DATABASE_URL format correct (PostgreSQL)${NC}"
        elif [[ "$DB_URL" == *"file:"* ]]; then
            echo -e "${YELLOW}⚠️  DATABASE_URL utilise SQLite (local uniquement)${NC}"
            WARNINGS=$((WARNINGS + 1))
        else
            echo -e "${YELLOW}⚠️  Format DATABASE_URL non reconnu${NC}"
            WARNINGS=$((WARNINGS + 1))
        fi
    else
        echo -e "${YELLOW}⚠️  DATABASE_URL non trouvé dans .env.local${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q "^NEXTAUTH_URL=" .env.local; then
        echo -e "${GREEN}✅ NEXTAUTH_URL trouvé${NC}"
    else
        echo -e "${YELLOW}⚠️  NEXTAUTH_URL non trouvé dans .env.local${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q "^NEXTAUTH_SECRET=" .env.local; then
        echo -e "${GREEN}✅ NEXTAUTH_SECRET trouvé${NC}"
    else
        echo -e "${YELLOW}⚠️  NEXTAUTH_SECRET non trouvé dans .env.local${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Fichier .env.local non trouvé (normal si vous utilisez seulement Vercel)${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 4. Vérifier la configuration Vercel
echo -e "${BLUE}4. Vérification configuration Vercel...${NC}"
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ Fichier vercel.json trouvé${NC}"
    
    if grep -q '"buildCommand"' vercel.json; then
        echo -e "${GREEN}✅ buildCommand configuré${NC}"
    else
        echo -e "${YELLOW}⚠️  buildCommand non configuré (utilise la valeur par défaut)${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Fichier vercel.json non trouvé${NC}"
    WARNINGS=$((WARNINGS + 1))
fi
echo ""

# 5. Vérifier package.json
echo -e "${BLUE}5. Vérification package.json...${NC}"
if [ -f "package.json" ]; then
    if grep -q '"postinstall"' package.json; then
        echo -e "${GREEN}✅ Script postinstall trouvé${NC}"
        if grep -q 'prisma generate' package.json; then
            echo -e "${GREEN}✅ postinstall génère Prisma Client${NC}"
        else
            echo -e "${YELLOW}⚠️  postinstall ne génère pas Prisma Client${NC}"
            WARNINGS=$((WARNINGS + 1))
        fi
    else
        echo -e "${YELLOW}⚠️  Script postinstall non trouvé${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
    
    if grep -q '"@prisma/client"' package.json; then
        echo -e "${GREEN}✅ @prisma/client dans les dépendances${NC}"
    else
        echo -e "${RED}❌ @prisma/client non trouvé dans package.json${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ Fichier package.json non trouvé${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Vérifier les fichiers critiques
echo -e "${BLUE}6. Vérification fichiers critiques...${NC}"
CRITICAL_FILES=(
    "lib/db.ts"
    "lib/auth.ts"
    "app/api/auth/[...nextauth]/route.ts"
    "middleware.ts"
    "next.config.js"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file trouvé${NC}"
    else
        echo -e "${RED}❌ $file non trouvé${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# Résumé
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}RÉSUMÉ${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Toutes les vérifications sont passées !${NC}"
    echo ""
    echo -e "${BLUE}⚠️  IMPORTANT:${NC}"
    echo "   Assurez-vous que DATABASE_URL est correct dans Vercel Dashboard"
    echo "   Vérifiez que toutes les variables d'environnement sont configurées"
    echo ""
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS avertissement(s) trouvé(s)${NC}"
    echo ""
    echo -e "${BLUE}⚠️  IMPORTANT:${NC}"
    echo "   Vérifiez les avertissements ci-dessus"
    echo "   Assurez-vous que DATABASE_URL est correct dans Vercel Dashboard"
    echo ""
    exit 0
else
    echo -e "${RED}❌ $ERRORS erreur(s) trouvée(s)${NC}"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  $WARNINGS avertissement(s) trouvé(s)${NC}"
    fi
    echo ""
    echo -e "${BLUE}🔧 ACTIONS REQUISES:${NC}"
    echo "   1. Corrigez les erreurs ci-dessus"
    echo "   2. Consultez GUIDE_CORRECTION_RAPIDE.md"
    echo "   3. Vérifiez AUDIT_COMPLET_DEBUG.md pour plus de détails"
    echo ""
    exit 1
fi

