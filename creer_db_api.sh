#!/bin/bash

# Script pour créer automatiquement la base de données PostgreSQL via l'API Vercel

set -e

PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

echo "🗄️  Création automatique de la base de données PostgreSQL"
echo "Project ID: $PROJECT_ID"
echo "Team ID: $TEAM_ID"
echo ""

echo "Pour créer la base de données via l'API, vous avez besoin d'un token Vercel."
echo "Obtenez-le depuis : https://vercel.com/account/tokens"
echo ""
read -p "Collez votre token Vercel (ou appuyez sur Entrée pour utiliser le dashboard) : " VERCEL_TOKEN

if [ -z "$VERCEL_TOKEN" ]; then
    echo ""
    echo "📋 Création manuelle via le Dashboard :"
    echo "1. Le dashboard Vercel devrait être ouvert"
    echo "2. Allez dans Storage → Create Database → Postgres"
    echo "3. Nommez-la 'hearstai-db'"
    echo "4. Créez-la"
    echo "5. Récupérez la Connection String depuis Settings"
    echo "6. Exécutez : ./ajouter_database_url.sh"
    exit 0
fi

echo ""
echo "📤 Création de la base de données via l'API Vercel..."

# Créer la base de données PostgreSQL via l'API Vercel
RESPONSE=$(curl -s -X POST "https://api.vercel.com/v1/storage/create" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"hearstai-db\",
    \"projectId\": \"$PROJECT_ID\",
    \"teamId\": \"$TEAM_ID\",
    \"type\": \"postgres\"
  }")

echo "Réponse API : $RESPONSE"

# Extraire la Connection String de la réponse
CONNECTION_STRING=$(echo "$RESPONSE" | grep -o '"connectionString":"[^"]*"' | cut -d'"' -f4)

if [ -z "$CONNECTION_STRING" ]; then
    echo ""
    echo "⚠️  Impossible de créer automatiquement la base de données."
    echo "   Créez-la manuellement via le Dashboard Vercel."
    echo "   Ensuite, exécutez : ./ajouter_database_url.sh"
    exit 1
fi

echo ""
echo "✅ Base de données créée !"
echo "📤 Ajout de DATABASE_URL..."

echo "$CONNECTION_STRING" | vercel env add DATABASE_URL production
echo "$CONNECTION_STRING" | vercel env add DATABASE_URL preview

echo ""
echo "🚀 Redéploiement..."
vercel --prod

echo ""
echo "✅ Terminé !"

