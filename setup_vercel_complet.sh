#!/bin/bash

# Script complet pour préparer le déploiement Vercel

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Configuration Complète pour Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Installation de Vercel CLI...${NC}"
    npm i -g vercel
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Vercel CLI installé${NC}"
    else
        echo -e "${RED}❌ Erreur lors de l'installation${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Vercel CLI déjà installé${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 Génération des secrets"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Générer NEXTAUTH_SECRET si pas déjà fait
if [ ! -f ".vercel_secrets.txt" ]; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" > .vercel_secrets.txt
    echo -e "${GREEN}✅ NEXTAUTH_SECRET généré${NC}"
else
    NEXTAUTH_SECRET=$(grep NEXTAUTH_SECRET .vercel_secrets.txt | cut -d'=' -f2)
    echo -e "${GREEN}✅ NEXTAUTH_SECRET récupéré${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 Connexion à Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Se connecter à Vercel
echo "Connexion à Vercel..."
vercel login

# Lier le projet
echo ""
echo "Liaison du projet..."
vercel link

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Variables d'environnement à ajouter"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Récupérer l'URL Vercel
VERCEL_URL=$(vercel inspect 2>/dev/null | grep "Production" | head -1 | awk '{print $NF}' || echo "")
if [ -z "$VERCEL_URL" ]; then
    echo -e "${YELLOW}⚠️  URL Vercel non détectée automatiquement${NC}"
    echo "Entrez l'URL de votre déploiement Vercel:"
    read -p "URL: " VERCEL_URL
fi

echo ""
echo "Variables à ajouter dans Vercel Dashboard:"
echo ""
echo "1. NEXTAUTH_SECRET"
echo "   Value: $NEXTAUTH_SECRET"
echo ""
echo "2. NEXTAUTH_URL"
echo "   Value: $VERCEL_URL"
echo ""
echo "3. DATABASE_URL"
echo "   Value: [À créer sur Vercel → Storage → Postgres]"
echo ""
echo "4. DEBANK_ACCESS_KEY"
DEBANK_KEY=$(grep DEBANK_ACCESS_KEY .env.local 2>/dev/null | cut -d'=' -f2 || echo "")
if [ ! -z "$DEBANK_KEY" ]; then
    echo "   Value: $DEBANK_KEY"
else
    echo "   Value: [À ajouter manuellement]"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Ajout automatique des variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Voulez-vous ajouter les variables automatiquement via CLI? (oui/non): " auto_add

if [ "$auto_add" = "oui" ] || [ "$auto_add" = "o" ]; then
    echo ""
    echo "Ajout de NEXTAUTH_SECRET..."
    echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET production
    
    echo ""
    echo "Ajout de NEXTAUTH_URL..."
    echo "$VERCEL_URL" | vercel env add NEXTAUTH_URL production
    
    echo ""
    echo "Ajout de DEBANK_ACCESS_KEY..."
    if [ ! -z "$DEBANK_KEY" ]; then
        echo "$DEBANK_KEY" | vercel env add DEBANK_ACCESS_KEY production
    else
        echo -e "${YELLOW}⚠️  DEBANK_ACCESS_KEY non trouvé dans .env.local${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}⚠️  DATABASE_URL doit être ajouté manuellement après création de PostgreSQL${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🗄️  Migration Prisma"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Voulez-vous migrer le schéma Prisma maintenant? (oui/non): " migrate

if [ "$migrate" = "oui" ] || [ "$migrate" = "o" ]; then
    echo ""
    echo "Génération du client Prisma..."
    npx prisma generate
    
    echo ""
    echo "Migration du schéma..."
    npx prisma db push
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Configuration terminée${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Actions restantes:"
echo ""
echo "1. Créer PostgreSQL sur Vercel:"
echo "   → Dashboard → Storage → Create Database → Postgres"
echo ""
echo "2. Ajouter DATABASE_URL dans Environment Variables"
echo ""
echo "3. Redéployer sur Vercel:"
echo "   → Deployments → Redeploy"
echo ""

