#!/bin/bash

# Script complet pour créer et configurer la base de données PostgreSQL sur Vercel

set -e

echo "🗄️  Configuration de la base de données PostgreSQL pour Hearst AI V3"
echo "=================================================================="
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur : Ce script doit être exécuté depuis la racine du projet HearstAI"
    exit 1
fi

echo "📋 Étapes à suivre :"
echo ""
echo "1️⃣  Le dashboard Vercel devrait être ouvert dans votre navigateur"
echo "   Si ce n'est pas le cas, ouvrez : https://vercel.com/adrien-nejkovics-projects/hearst-ai-v3"
echo ""
echo "2️⃣  Créez la base de données PostgreSQL :"
echo "   - Cliquez sur 'Storage' dans le menu de gauche"
echo "   - Cliquez sur 'Create Database'"
echo "   - Sélectionnez 'Postgres'"
echo "   - Nommez-la : hearstai-db (ou tout autre nom)"
echo "   - Cliquez sur 'Create'"
echo ""
echo "3️⃣  Récupérez la Connection String :"
echo "   - Cliquez sur votre base de données créée"
echo "   - Allez dans l'onglet 'Settings'"
echo "   - Copiez la 'Connection String' (format: postgresql://...)"
echo ""

read -p "✅ Avez-vous créé la base de données et copié la Connection String ? (o/n) " REPONSE

if [ "$REPONSE" != "o" ] && [ "$REPONSE" != "O" ]; then
    echo ""
    echo "⚠️  Créez d'abord la base de données sur Vercel Dashboard."
    echo "   Ensuite, relancez ce script."
    exit 1
fi

echo ""
echo "📥 Collez la Connection String PostgreSQL :"
read -p "DATABASE_URL: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL vide, annulation."
    exit 1
fi

# Vérifier le format
if [[ ! "$DATABASE_URL" =~ ^postgresql:// ]]; then
    echo "⚠️  Attention : La Connection String devrait commencer par 'postgresql://'"
    read -p "Continuer quand même ? (o/n) " CONTINUE
    if [ "$CONTINUE" != "o" ] && [ "$CONTINUE" != "O" ]; then
        exit 1
    fi
fi

echo ""
echo "📤 Ajout de DATABASE_URL pour Production..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL production

echo ""
echo "📤 Ajout de DATABASE_URL pour Preview..."
echo "$DATABASE_URL" | vercel env add DATABASE_URL preview

echo ""
echo "✅ DATABASE_URL ajoutée avec succès !"
echo ""

# Vérifier les variables d'environnement
echo "📋 Variables d'environnement configurées :"
vercel env ls

echo ""
echo "🚀 Redéploiement en production..."
vercel --prod

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "🌐 Votre application est accessible sur :"
echo "   https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app"
echo ""
echo "📊 Pour vérifier les logs :"
echo "   vercel logs"
echo ""

