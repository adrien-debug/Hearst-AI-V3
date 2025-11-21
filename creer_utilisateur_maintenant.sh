#!/bin/bash

# Script pour créer l'utilisateur MAINTENANT

set -e

echo "👤 Création de l'utilisateur admin - MAINTENANT"
echo "=============================================="
echo ""

# Vérifier la DATABASE_URL actuelle
echo "🔍 Vérification de la DATABASE_URL..."
vercel env pull .env.vercel.check 2>/dev/null || true

if [ -f .env.vercel.check ]; then
    CURRENT_DB=$(grep DATABASE_URL .env.vercel.check | grep -v "^#" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    
    if echo "$CURRENT_DB" | grep -q "supabase"; then
        echo "⚠️  DATABASE_URL Supabase détectée (ne fonctionne pas)"
        echo ""
        echo "📋 ACTION REQUISE : Créer une base PostgreSQL sur Vercel"
        echo ""
        echo "Le dashboard Vercel Storage est ouvert dans votre navigateur."
        echo ""
        echo "Étapes :"
        echo "1. Cliquez sur 'Create Database'"
        echo "2. Sélectionnez 'Postgres'"
        echo "3. Nommez-la 'hearstai-db'"
        echo "4. Créez-la"
        echo "5. Ouvrez la base → Settings → Copiez la 'Connection String'"
        echo ""
        read -p "✅ Avez-vous créé la base et copié la Connection String ? (o/n) " CREATED
        
        if [ "$CREATED" != "o" ] && [ "$CREATED" != "O" ]; then
            echo ""
            echo "Créez d'abord la base de données, puis relancez ce script."
            rm -f .env.vercel.check
            exit 1
        fi
        
        echo ""
        read -p "Collez la Connection String PostgreSQL : " CONNECTION_STRING
        
        if [ -z "$CONNECTION_STRING" ]; then
            echo "❌ Connection String vide"
            rm -f .env.vercel.check
            exit 1
        fi
        
        echo ""
        echo "📤 Ajout de la DATABASE_URL à Vercel..."
        vercel env rm DATABASE_URL production --yes 2>/dev/null || true
        vercel env rm DATABASE_URL preview --yes 2>/dev/null || true
        echo "$CONNECTION_STRING" | vercel env add DATABASE_URL production
        echo "$CONNECTION_STRING" | vercel env add DATABASE_URL preview
        
        DATABASE_URL="$CONNECTION_STRING"
    else
        echo "✅ DATABASE_URL Vercel trouvée"
        DATABASE_URL="$CURRENT_DB"
    fi
    
    rm -f .env.vercel.check
else
    echo "❌ Impossible de récupérer la DATABASE_URL"
    echo ""
    echo "Créez d'abord une base PostgreSQL sur Vercel :"
    echo "https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    exit 1
fi

echo ""
echo "🗄️  Initialisation de la base de données..."
export DATABASE_URL

# Générer Prisma Client
echo "1️⃣  Génération de Prisma Client..."
npx prisma generate > /dev/null 2>&1

# Initialiser la base
echo "2️⃣  Création des tables..."
npx prisma db push --accept-data-loss > /dev/null 2>&1 || {
    echo "⚠️  Erreur lors de la création des tables"
    echo "Vérifiez que la Connection String est correcte"
    exit 1
}

echo ""
echo "👤 Création de l'utilisateur admin@hearst.ai..."
node scripts/create-user.js

echo ""
echo "✅ TERMINÉ !"
echo ""
echo "🔐 Identifiants de connexion :"
echo "   📧 Email: admin@hearst.ai"
echo "   🔑 Mot de passe: n'importe quel mot de passe"
echo ""
echo "🌐 Connectez-vous sur :"
echo "   https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app/auth/signin"

