#!/bin/bash

# Script pour créer une base de données PostgreSQL sur Vercel via l'API

echo "🗄️  Création de la base de données PostgreSQL sur Vercel"
echo ""

# Obtenir le project ID
PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

echo "📋 Project ID: $PROJECT_ID"
echo "📋 Team ID: $TEAM_ID"
echo ""

# Obtenir le token Vercel
echo "Pour créer la base de données, vous avez deux options :"
echo ""
echo "Option 1 : Via le Dashboard (RECOMMANDÉ)"
echo "1. Le dashboard Vercel devrait être ouvert dans votre navigateur"
echo "2. Cliquez sur 'Storage' dans le menu de gauche"
echo "3. Cliquez sur 'Create Database'"
echo "4. Sélectionnez 'Postgres'"
echo "5. Nommez-la 'hearstai-db'"
echo "6. Cliquez sur 'Create'"
echo ""
echo "Option 2 : Via l'API Vercel"
echo "Vous devez obtenir un token d'accès depuis :"
echo "https://vercel.com/account/tokens"
echo ""
read -p "Avez-vous créé la base de données ? (o/n) " REPONSE

if [ "$REPONSE" = "o" ] || [ "$REPONSE" = "O" ]; then
    echo ""
    echo "✅ Parfait ! Maintenant, récupérez la Connection String :"
    echo "1. Dans Vercel Dashboard → Storage → votre base de données"
    echo "2. Allez dans l'onglet 'Settings'"
    echo "3. Copiez la 'Connection String'"
    echo ""
    read -p "Collez la Connection String ici : " DATABASE_URL
    
    if [ -z "$DATABASE_URL" ]; then
        echo "❌ DATABASE_URL vide, annulation."
        exit 1
    fi
    
    echo ""
    echo "📤 Ajout de DATABASE_URL pour Production..."
    echo "$DATABASE_URL" | vercel env add DATABASE_URL production
    
    echo ""
    echo "📤 Ajout de DATABASE_URL pour Preview..."
    echo "$DATABASE_URL" | vercel env add DATABASE_URL preview
    
    echo ""
    echo "✅ DATABASE_URL ajoutée !"
    echo ""
    echo "🚀 Redéploiement en cours..."
    vercel --prod
    
    echo ""
    echo "✅ Terminé ! Votre application devrait être déployée sur :"
    echo "https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app"
else
    echo ""
    echo "⚠️  Créez d'abord la base de données sur Vercel Dashboard, puis relancez ce script."
    echo "Ou utilisez le script ajouter_database_url.sh après avoir créé la base."
fi

