#!/bin/bash

# Script pour initialiser la base de données après création

set -e

echo "🗄️  Initialisation de la base de données PostgreSQL"
echo "===================================================="
echo ""

# Afficher le projet Vercel utilisé
PROJECT_NAME=$(cat .vercel/project.json 2>/dev/null | grep -o '"projectName":"[^"]*"' | cut -d'"' -f4 || echo "non trouvé")
echo "📋 Projet Vercel : $PROJECT_NAME"
echo ""

# Vérifier que DATABASE_URL est configurée
echo "🔍 Vérification de DATABASE_URL..."
DATABASE_URL=$(vercel env pull .env.temp 2>/dev/null && grep DATABASE_URL .env.temp | cut -d'=' -f2- | tr -d '"' || echo "")

if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL non trouvée dans les variables d'environnement Vercel"
    echo ""
    echo "Créez d'abord la base de données sur Vercel, puis :"
    echo "1. Ajoutez la DATABASE_URL : ./ajouter_database_url.sh"
    echo "2. Exécutez ce script : ./initialiser_database.sh"
    exit 1
fi

echo "✅ DATABASE_URL trouvée"
echo ""

# Exporter DATABASE_URL pour Prisma
export DATABASE_URL

echo "📤 Initialisation du schéma Prisma..."
echo "   (Cela va créer les tables dans la base de données)"
echo ""

# Générer Prisma Client
echo "1️⃣  Génération de Prisma Client..."
npx prisma generate

# Pousser le schéma vers la base de données
echo ""
echo "2️⃣  Application du schéma à la base de données..."
npx prisma db push --accept-data-loss

echo ""
echo "✅ Base de données initialisée avec succès !"
echo ""
echo "🚀 Vous pouvez maintenant déployer :"
echo "vercel --prod"

# Nettoyer
rm -f .env.temp

