#!/bin/bash

# Script complet pour créer l'utilisateur une fois la base Vercel créée

set -e

echo "👤 Création de l'utilisateur admin - Guide complet"
echo "=================================================="
echo ""

echo "📋 ÉTAPE 1 : Créer la base PostgreSQL sur Vercel"
echo ""
echo "Le dashboard Vercel Storage devrait être ouvert dans votre navigateur."
echo "Si ce n'est pas le cas : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
echo ""
echo "Actions à faire :"
echo "1. Cliquez sur 'Create Database'"
echo "2. Sélectionnez 'Postgres'"
echo "3. Nommez-la 'hearstai-db'"
echo "4. Cliquez sur 'Create'"
echo "5. Ouvrez la base créée → Settings → Copiez la 'Connection String'"
echo ""

read -p "✅ Avez-vous créé la base et copié la Connection String ? (o/n) " CREATED

if [ "$CREATED" != "o" ] && [ "$CREATED" != "O" ]; then
    echo ""
    echo "Créez d'abord la base de données, puis relancez ce script."
    exit 1
fi

echo ""
echo "📋 ÉTAPE 2 : Ajouter la DATABASE_URL"
echo ""
read -p "Collez la Connection String PostgreSQL : " CONNECTION_STRING

if [ -z "$CONNECTION_STRING" ]; then
    echo "❌ Connection String vide"
    exit 1
fi

echo ""
echo "📤 Ajout de la DATABASE_URL à Vercel..."

# Supprimer l'ancienne
vercel env rm DATABASE_URL production --yes 2>/dev/null || true
vercel env rm DATABASE_URL preview --yes 2>/dev/null || true

# Ajouter la nouvelle
echo "$CONNECTION_STRING" | vercel env add DATABASE_URL production
echo "$CONNECTION_STRING" | vercel env add DATABASE_URL preview

echo ""
echo "✅ DATABASE_URL ajoutée !"

echo ""
echo "📋 ÉTAPE 3 : Initialiser la base de données"
echo ""
echo "Création des tables..."
export DATABASE_URL="$CONNECTION_STRING"
npx prisma generate > /dev/null 2>&1
npx prisma db push --accept-data-loss

echo ""
echo "✅ Base de données initialisée !"

echo ""
echo "📋 ÉTAPE 4 : Créer l'utilisateur admin"
echo ""
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

