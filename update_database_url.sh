#!/bin/bash

# Script pour mettre à jour DATABASE_URL dans Vercel

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Mise à jour DATABASE_URL dans Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "📋 Pour obtenir la vraie URL Supabase:"
echo ""
echo "1. Allez sur https://supabase.com"
echo "2. Votre projet → Settings → Database"
echo "3. Connection String → URI"
echo "4. Copiez l'URL complète"
echo ""
echo "Format attendu: postgresql://postgres.xxxxx:password@host:5432/postgres"
echo ""

read -p "Collez la vraie URL Supabase ici: " SUPABASE_URL

if [ -z "$SUPABASE_URL" ]; then
    echo -e "${RED}❌ URL vide${NC}"
    exit 1
fi

# Nettoyer l'URL
CLEAN_URL=$(echo "$SUPABASE_URL" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//' | tr -d '\n')

if ! echo "$CLEAN_URL" | grep -q "^postgresql://\|^postgres://"; then
    echo -e "${YELLOW}⚠️  L'URL ne commence pas par postgresql:// ou postgres://${NC}"
    read -p "Continuer quand même? (oui/non): " confirm
    if [ "$confirm" != "oui" ] && [ "$confirm" != "o" ]; then
        exit 1
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🗑️  Suppression de l'ancienne variable..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

vercel env rm DATABASE_URL production --yes 2>&1 | tail -3

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "➕ Ajout de la nouvelle variable..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "$CLEAN_URL" | vercel env add DATABASE_URL production 2>&1 | tail -5

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ DATABASE_URL mis à jour avec succès !${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🚀 Redéploiement..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    vercel --prod
else
    echo -e "${RED}❌ Erreur lors de la mise à jour${NC}"
    exit 1
fi

