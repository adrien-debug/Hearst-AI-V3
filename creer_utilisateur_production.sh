#!/bin/bash

# Script pour créer l'utilisateur directement sur la base de production

set -e

echo "👤 Création de l'utilisateur admin sur la base de PRODUCTION"
echo "============================================================"
echo ""

# Récupérer la DATABASE_URL de production depuis Vercel
echo "📥 Récupération de la DATABASE_URL de production..."
vercel env pull .env.prod 2>/dev/null || {
    echo "❌ Impossible de récupérer les variables d'environnement"
    exit 1
}

DATABASE_URL=$(grep "^DATABASE_URL=" .env.prod | cut -d'=' -f2- | tr -d '"' | tr -d "'")

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL non trouvée"
    rm -f .env.prod
    exit 1
fi

echo "✅ DATABASE_URL récupérée"
echo ""

# Exporter pour Prisma
export DATABASE_URL

echo "🗄️  Connexion à la base de production..."
echo ""

# Générer Prisma Client
npx prisma generate > /dev/null 2>&1

# Créer l'utilisateur
echo "👤 Création de l'utilisateur admin@hearst.ai..."
node scripts/create-user.js

echo ""
echo "✅ Utilisateur créé sur la base de PRODUCTION !"
echo ""
echo "🔐 Identifiants :"
echo "   Email: admin@hearst.ai"
echo "   Mot de passe: n'importe quel mot de passe"
echo ""

# Nettoyer
rm -f .env.prod

