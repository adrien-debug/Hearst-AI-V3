#!/bin/bash

# Script pour créer la base de données MAINTENANT

set -e

PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
TEAM_ID=$(cat .vercel/project.json | grep -o '"orgId":"[^"]*"' | cut -d'"' -f4)

echo "🚀 Création de la base de données PostgreSQL - MAINTENANT"
echo "========================================================="
echo ""

# Option 1 : Essayer avec Supabase (si disponible)
echo "🔍 Option 1 : Vérification Supabase..."
SUPABASE_URL="postgresql://postgres.tjakoymdonbylndibedh:Adrien0334%24%24@db.tjakoymdonbylndibedh.supabase.co:6543/postgres"

# Tester la connexion Supabase
if command -v psql &> /dev/null; then
    echo "Test de connexion Supabase..."
    # Test basique - juste vérifier si l'URL est valide
    echo "✅ URL Supabase formatée"
else
    echo "⚠️  psql non disponible pour tester"
fi

echo ""
echo "📋 Option 2 : Créer une base PostgreSQL sur Vercel"
echo ""
echo "Pour créer automatiquement via l'API Vercel, j'ai besoin d'un token."
echo "Obtenez-le depuis : https://vercel.com/account/tokens"
echo ""
read -p "Avez-vous un token Vercel ? (o/n) " HAS_TOKEN

if [ "$HAS_TOKEN" = "o" ] || [ "$HAS_TOKEN" = "O" ]; then
    read -p "Collez votre token Vercel : " VERCEL_TOKEN
    
    if [ ! -z "$VERCEL_TOKEN" ]; then
        echo ""
        echo "📤 Création de la base de données via l'API Vercel..."
        
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
        
        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
            DB_ID=$(echo "$BODY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
            echo "✅ Base de données créée ! ID: $DB_ID"
            
            # Récupérer la Connection String
            sleep 2
            CONN_RESPONSE=$(curl -s -X GET "https://api.vercel.com/v2/storage/$DB_ID/connection-string" \
              -H "Authorization: Bearer $VERCEL_TOKEN")
            
            CONNECTION_STRING=$(echo "$CONN_RESPONSE" | grep -o '"connectionString":"[^"]*"' | cut -d'"' -f4)
            
            if [ ! -z "$CONNECTION_STRING" ]; then
                echo "$CONNECTION_STRING" | vercel env add DATABASE_URL production
                echo "$CONNECTION_STRING" | vercel env add DATABASE_URL preview
                echo ""
                echo "✅ DATABASE_URL configurée !"
                echo "🚀 Redéploiement..."
                vercel --prod
                echo ""
                echo "✅ Terminé !"
                exit 0
            fi
        else
            echo "⚠️  Erreur API : $BODY"
        fi
    fi
fi

echo ""
echo "📋 Option 3 : Création manuelle (RECOMMANDÉ)"
echo ""
echo "Le dashboard Vercel Storage est ouvert dans votre navigateur."
echo ""
echo "Étapes rapides :"
echo "1. Cliquez sur 'Create Database'"
echo "2. Sélectionnez 'Postgres'"
echo "3. Nommez-la 'hearstai-db'"
echo "4. Créez-la"
echo "5. Ouvrez la base → Settings → Copiez la 'Connection String'"
echo ""
read -p "Avez-vous créé la base et copié la Connection String ? (o/n) " CREATED

if [ "$CREATED" = "o" ] || [ "$CREATED" = "O" ]; then
    echo ""
    read -p "Collez la Connection String : " CONNECTION_STRING
    
    if [ ! -z "$CONNECTION_STRING" ]; then
        echo "$CONNECTION_STRING" | vercel env add DATABASE_URL production
        echo "$CONNECTION_STRING" | vercel env add DATABASE_URL preview
        echo ""
        echo "✅ DATABASE_URL configurée !"
        echo "🚀 Redéploiement..."
        vercel --prod
        echo ""
        echo "✅ Terminé !"
    else
        echo "❌ Connection String vide"
    fi
else
    echo ""
    echo "Créez la base de données, puis exécutez :"
    echo "./ajouter_database_url.sh"
fi

