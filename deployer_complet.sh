#!/bin/bash

# Script complet pour déployer Hearst AI V3 avec base de données

set -e

echo "🚀 Déploiement complet de Hearst AI V3"
echo "======================================"
echo ""

PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

# Vérifier si DATABASE_URL existe déjà et fonctionne
echo "🔍 Vérification de la DATABASE_URL existante..."
EXISTING_DB=$(vercel env ls 2>/dev/null | grep DATABASE_URL | head -1 || echo "")

if [ ! -z "$EXISTING_DB" ]; then
    echo "✅ DATABASE_URL trouvée dans les variables d'environnement"
    echo ""
    echo "📤 Test du déploiement avec la DATABASE_URL existante..."
    vercel --prod --yes
    
    echo ""
    echo "✅ Déploiement terminé !"
    echo "🌐 Application : https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app"
    echo ""
    echo "📊 Pour vérifier les logs :"
    echo "vercel logs"
    exit 0
fi

echo ""
echo "⚠️  Aucune DATABASE_URL configurée pour Production."
echo ""
echo "📋 Options disponibles :"
echo ""
echo "Option 1 : Créer une base de données PostgreSQL sur Vercel (RECOMMANDÉ)"
echo "  1. Le dashboard Vercel Storage est ouvert dans votre navigateur"
echo "  2. Cliquez sur 'Create Database' → 'Postgres'"
echo "  3. Nommez-la 'hearstai-db'"
echo "  4. Créez-la"
echo "  5. Récupérez la Connection String depuis Settings"
echo "  6. Exécutez : ./ajouter_database_url.sh"
echo ""
echo "Option 2 : Utiliser Supabase (si vous avez les identifiants)"
echo "  Exécutez : ./ajouter_database_url.sh"
echo "  Et collez votre Connection String Supabase"
echo ""
echo "Option 3 : Créer automatiquement via API (nécessite un token)"
echo "  1. Obtenez un token depuis : https://vercel.com/account/tokens"
echo "  2. Exécutez : export VERCEL_TOKEN='votre-token' && ./creer_db_direct.sh"
echo ""

read -p "Voulez-vous ouvrir le dashboard Vercel Storage maintenant ? (o/n) " OPEN_DASHBOARD

if [ "$OPEN_DASHBOARD" = "o" ] || [ "$OPEN_DASHBOARD" = "O" ]; then
    open "https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    echo ""
    echo "✅ Dashboard ouvert !"
    echo "Créez la base de données, puis exécutez : ./ajouter_database_url.sh"
fi

