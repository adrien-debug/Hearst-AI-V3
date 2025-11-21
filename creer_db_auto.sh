#!/bin/bash

# Script pour créer automatiquement la base de données PostgreSQL sur Vercel

set -e

PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

echo "🗄️  Création automatique de la base de données PostgreSQL sur Vercel"
echo "Project ID: $PROJECT_ID"
echo "Team ID: $TEAM_ID"
echo ""

# Essayer d'obtenir le token depuis la config Vercel
VERCEL_TOKEN_FILE="$HOME/.vercel/auth.json"
if [ -f "$VERCEL_TOKEN_FILE" ]; then
    VERCEL_TOKEN=$(cat "$VERCEL_TOKEN_FILE" | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [ ! -z "$VERCEL_TOKEN" ]; then
        echo "✅ Token Vercel trouvé"
    fi
fi

if [ -z "$VERCEL_TOKEN" ]; then
    echo "⚠️  Token Vercel non trouvé automatiquement."
    echo ""
    echo "Pour créer la base de données automatiquement, vous avez besoin d'un token Vercel."
    echo "Obtenez-le depuis : https://vercel.com/account/tokens"
    echo ""
    read -p "Collez votre token Vercel (ou appuyez sur Entrée pour créer via le dashboard) : " MANUAL_TOKEN
    VERCEL_TOKEN="$MANUAL_TOKEN"
fi

if [ -z "$VERCEL_TOKEN" ]; then
    echo ""
    echo "📋 Création manuelle via le Dashboard :"
    echo "1. Ouvrez : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    echo "2. Cliquez sur 'Create Database' → 'Postgres'"
    echo "3. Nommez-la 'hearstai-db'"
    echo "4. Créez-la"
    echo "5. Récupérez la Connection String depuis Settings"
    echo "6. Exécutez : ./ajouter_database_url.sh"
    exit 0
fi

echo ""
echo "📤 Création de la base de données via l'API Vercel..."

# Créer la base de données PostgreSQL via l'API Vercel Storage
RESPONSE=$(curl -s -X POST "https://api.vercel.com/v2/storage" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"hearstai-db\",
    \"projectId\": \"$PROJECT_ID\",
    \"teamId\": \"$TEAM_ID\",
    \"plan\": \"hobby\",
    \"region\": \"iad1\"
  }" 2>&1)

echo "Réponse API : $RESPONSE"

# Vérifier si la création a réussi
if echo "$RESPONSE" | grep -q "error\|Error\|ERROR"; then
    echo ""
    echo "⚠️  Erreur lors de la création via l'API :"
    echo "$RESPONSE"
    echo ""
    echo "📋 Créez la base de données manuellement via le Dashboard :"
    echo "https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    echo "Puis exécutez : ./ajouter_database_url.sh"
    exit 1
fi

# Extraire l'ID de la base de données
DB_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$DB_ID" ]; then
    echo ""
    echo "⚠️  Impossible d'extraire l'ID de la base de données."
    echo "   La base a peut-être été créée. Vérifiez sur le dashboard."
    echo "   Puis exécutez : ./ajouter_database_url.sh"
    exit 1
fi

echo ""
echo "✅ Base de données créée ! ID: $DB_ID"
echo "📥 Récupération de la Connection String..."

# Récupérer la Connection String
CONN_STRING_RESPONSE=$(curl -s -X GET "https://api.vercel.com/v2/storage/$DB_ID/connection-string" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json")

CONNECTION_STRING=$(echo "$CONN_STRING_RESPONSE" | grep -o '"connectionString":"[^"]*"' | cut -d'"' -f4)

if [ -z "$CONNECTION_STRING" ]; then
    echo ""
    echo "⚠️  Impossible de récupérer automatiquement la Connection String."
    echo "   Récupérez-la depuis le dashboard Vercel, puis exécutez :"
    echo "   ./ajouter_database_url.sh"
    exit 1
fi

echo ""
echo "✅ Connection String récupérée !"
echo "📤 Ajout de DATABASE_URL..."

echo "$CONNECTION_STRING" | vercel env add DATABASE_URL production
echo "$CONNECTION_STRING" | vercel env add DATABASE_URL preview

echo ""
echo "🚀 Redéploiement..."
vercel --prod

echo ""
echo "✅ Terminé ! Votre application est déployée sur :"
echo "https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app"

