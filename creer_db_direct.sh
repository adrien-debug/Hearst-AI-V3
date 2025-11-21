#!/bin/bash

# Script pour créer directement la base de données PostgreSQL sur Vercel

set -e

PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

echo "🗄️  Création de la base de données PostgreSQL sur Vercel"
echo "Project ID: $PROJECT_ID"
echo "Team ID: $TEAM_ID"
echo ""

# Obtenir le token depuis les variables d'environnement ou demander
if [ -z "$VERCEL_TOKEN" ]; then
    echo "Pour créer la base de données, j'ai besoin d'un token Vercel."
    echo "Obtenez-le depuis : https://vercel.com/account/tokens"
    echo ""
    read -p "Collez votre token Vercel : " VERCEL_TOKEN
fi

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Token requis. Annulation."
    exit 1
fi

echo ""
echo "📤 Création de la base de données 'hearstai-db'..."

# Créer la base de données PostgreSQL
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.vercel.com/v2/storage" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"hearstai-db\",
    \"projectId\": \"$PROJECT_ID\",
    \"teamId\": \"$TEAM_ID\",
    \"plan\": \"hobby\",
    \"region\": \"iad1\"
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Code HTTP: $HTTP_CODE"
echo "Réponse: $BODY"

if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "201" ]; then
    echo ""
    echo "⚠️  Erreur lors de la création. Réponse complète :"
    echo "$BODY"
    echo ""
    echo "Essayez de créer la base de données manuellement via le dashboard :"
    echo "https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    echo "Puis exécutez : ./ajouter_database_url.sh"
    exit 1
fi

# Extraire l'ID de la base de données
DB_ID=$(echo "$BODY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$DB_ID" ]; then
    echo ""
    echo "⚠️  Impossible d'extraire l'ID de la base de données."
    echo "   Vérifiez sur le dashboard si la base a été créée."
    echo "   Puis exécutez : ./ajouter_database_url.sh"
    exit 1
fi

echo ""
echo "✅ Base de données créée ! ID: $DB_ID"
echo "📥 Récupération de la Connection String..."

# Attendre un peu pour que la base soit prête
sleep 2

# Récupérer la Connection String
CONN_RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "https://api.vercel.com/v2/storage/$DB_ID/connection-string" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json")

CONN_HTTP_CODE=$(echo "$CONN_RESPONSE" | tail -n1)
CONN_BODY=$(echo "$CONN_RESPONSE" | sed '$d')

if [ "$CONN_HTTP_CODE" != "200" ]; then
    echo ""
    echo "⚠️  Impossible de récupérer automatiquement la Connection String."
    echo "   Récupérez-la depuis le dashboard Vercel :"
    echo "   https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    echo "   Puis exécutez : ./ajouter_database_url.sh"
    exit 1
fi

CONNECTION_STRING=$(echo "$CONN_BODY" | grep -o '"connectionString":"[^"]*"' | cut -d'"' -f4)

if [ -z "$CONNECTION_STRING" ]; then
    echo ""
    echo "⚠️  Connection String non trouvée dans la réponse."
    echo "   Récupérez-la depuis le dashboard Vercel, puis exécutez :"
    echo "   ./ajouter_database_url.sh"
    exit 1
fi

echo ""
echo "✅ Connection String récupérée !"
echo "📤 Configuration de DATABASE_URL..."

# Supprimer l'ancienne DATABASE_URL si elle existe
vercel env rm DATABASE_URL production --yes 2>/dev/null || true
vercel env rm DATABASE_URL preview --yes 2>/dev/null || true

# Ajouter la nouvelle DATABASE_URL
echo "$CONNECTION_STRING" | vercel env add DATABASE_URL production
echo "$CONNECTION_STRING" | vercel env add DATABASE_URL preview

echo ""
echo "✅ DATABASE_URL configurée !"
echo ""
echo "🚀 Redéploiement en production..."
vercel --prod

echo ""
echo "✅ Terminé ! Votre application est déployée sur :"
echo "https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app"

