#!/bin/bash

# Script pour vérifier la configuration Vercel

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Vérification Configuration Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "📋 Checklist des variables d'environnement requises:"
echo ""

# Vérifier si Vercel CLI est installé
if command -v vercel &> /dev/null; then
    echo -e "${GREEN}✅ Vercel CLI installé${NC}"
    echo ""
    echo "📊 Variables d'environnement actuelles sur Vercel:"
    vercel env ls 2>/dev/null || echo -e "${YELLOW}⚠️  Projet non lié. Exécutez: vercel link${NC}"
else
    echo -e "${YELLOW}⚠️  Vercel CLI non installé${NC}"
    echo "   Installez avec: npm i -g vercel"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Variables requises pour Vercel:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. DATABASE_URL"
echo "   ⚠️  DOIT être PostgreSQL (pas SQLite)"
echo "   Format: postgresql://user:password@host:5432/database"
echo ""
echo "2. NEXTAUTH_SECRET"
echo "   Générez avec: openssl rand -base64 32"
echo ""
echo "3. NEXTAUTH_URL"
echo "   URL de votre déploiement Vercel"
echo "   Exemple: https://hearst-ai-v3-xxx.vercel.app"
echo ""
echo "4. DEBANK_ACCESS_KEY (optionnel)"
echo "   Votre clé DeBank API"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Actions à faire:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Créer PostgreSQL sur Vercel:"
echo "   - Dashboard → Storage → Create Database → Postgres"
echo ""
echo "2. Ajouter les variables dans Vercel:"
echo "   - Settings → Environment Variables"
echo ""
echo "3. Migrer le schéma:"
echo "   npx prisma db push"
echo ""
echo "4. Redéployer:"
echo "   - Dashboard → Deployments → Redeploy"
echo ""

