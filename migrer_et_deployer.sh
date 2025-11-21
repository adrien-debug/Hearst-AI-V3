#!/bin/bash

# Script pour migrer le schéma et redéployer

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Migration et Déploiement Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vérifier DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  DATABASE_URL non défini localement${NC}"
    echo "Vérification dans Vercel..."
    DATABASE_URL=$(vercel env pull .env.vercel 2>/dev/null && grep DATABASE_URL .env.vercel | cut -d'=' -f2- || echo "")
    if [ -z "$DATABASE_URL" ]; then
        echo -e "${RED}❌ DATABASE_URL non trouvé${NC}"
        echo ""
        echo "Assurez-vous d'avoir:"
        echo "1. Créé PostgreSQL sur Vercel"
        echo "2. Ajouté DATABASE_URL dans Environment Variables"
        echo ""
        read -p "Continuer quand même? (oui/non): " continue
        if [ "$continue" != "oui" ] && [ "$continue" != "o" ]; then
            exit 1
        fi
    else
        export DATABASE_URL
        echo -e "${GREEN}✅ DATABASE_URL trouvé${NC}"
    fi
else
    echo -e "${GREEN}✅ DATABASE_URL défini${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Génération Prisma Client"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npx prisma generate

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erreur lors de la génération${NC}"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🗄️  Migration du schéma vers PostgreSQL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ ! -z "$DATABASE_URL" ]; then
    export DATABASE_URL
    npx prisma db push --accept-data-loss
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Schéma migré avec succès${NC}"
    else
        echo -e "${YELLOW}⚠️  Erreur lors de la migration${NC}"
        echo "Vérifiez que DATABASE_URL est correct dans Vercel"
    fi
else
    echo -e "${YELLOW}⚠️  DATABASE_URL non disponible, migration ignorée${NC}"
    echo "La migration se fera automatiquement lors du build Vercel"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Déploiement sur Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Voulez-vous redéployer maintenant? (oui/non): " deploy

if [ "$deploy" = "oui" ] || [ "$deploy" = "o" ]; then
    echo ""
    echo "Déploiement en cours..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Déploiement réussi !${NC}"
    else
        echo ""
        echo -e "${YELLOW}⚠️  Erreur lors du déploiement${NC}"
    fi
else
    echo ""
    echo "Pour redéployer plus tard:"
    echo "  vercel --prod"
    echo ""
    echo "Ou via Dashboard Vercel:"
    echo "  Deployments → Redeploy"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Terminé"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

