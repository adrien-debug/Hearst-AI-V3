#!/bin/bash

# Script pour créer l'utilisateur admin sur la base Vercel Postgres

set -e

echo "👤 Création de l'utilisateur admin sur Vercel Postgres"
echo "======================================================"
echo ""

# Récupérer la DATABASE_URL depuis Vercel
echo "📥 Récupération de la DATABASE_URL depuis Vercel..."
vercel env pull .env.vercel.temp 2>/dev/null

if [ ! -f .env.vercel.temp ]; then
    echo "❌ Impossible de récupérer les variables d'environnement"
    exit 1
fi

DATABASE_URL=$(grep DATABASE_URL .env.vercel.temp | grep -v "^#" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL non trouvée dans les variables Vercel"
    echo ""
    echo "📋 Créez d'abord une base PostgreSQL sur Vercel :"
    echo "1. Allez sur : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    echo "2. Créez une base Postgres"
    echo "3. Exécutez : ./ajouter_database_url.sh"
    echo "4. Relancez ce script : ./creer_utilisateur_vercel.sh"
    rm -f .env.vercel.temp
    exit 1
fi

echo "✅ DATABASE_URL trouvée"
echo ""

# Vérifier si c'est Supabase (ne fonctionne pas)
if echo "$DATABASE_URL" | grep -q "supabase"; then
    echo "⚠️  DATABASE_URL Supabase détectée (ne fonctionne pas)"
    echo ""
    echo "📋 Créez une base PostgreSQL sur Vercel :"
    echo "1. Allez sur : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3/storage"
    echo "2. Créez une base Postgres"
    echo "3. Exécutez : ./ajouter_database_url.sh"
    echo "4. Relancez ce script : ./creer_utilisateur_vercel.sh"
    rm -f .env.vercel.temp
    exit 1
fi

# Exporter DATABASE_URL
export DATABASE_URL

echo "🗄️  Vérification de la connexion à la base de données..."
echo ""

# Générer Prisma Client si nécessaire
npx prisma generate > /dev/null 2>&1

# Créer l'utilisateur
echo "👤 Création de l'utilisateur admin@hearst.ai..."
echo ""

node scripts/create-user.js

echo ""
echo "✅ Utilisateur créé avec succès !"
echo ""
echo "🔐 Identifiants de connexion :"
echo "   Email: admin@hearst.ai"
echo "   Mot de passe: n'importe quel mot de passe"
echo ""

# Nettoyer
rm -f .env.vercel.temp

