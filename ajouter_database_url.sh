#!/bin/bash

# Script pour ajouter la DATABASE_URL après création de la base de données PostgreSQL sur Vercel

set -e

echo "🔗 Configuration de la DATABASE_URL sur Vercel"
echo "=============================================="
echo ""

echo "⚠️  Suppression de l'ancienne DATABASE_URL (Supabase)..."
vercel env rm DATABASE_URL production --yes 2>/dev/null || echo "   (Aucune DATABASE_URL Production à supprimer)"
vercel env rm DATABASE_URL preview --yes 2>/dev/null || echo "   (Aucune DATABASE_URL Preview à supprimer)"

echo ""
echo "📥 Collez votre Connection String PostgreSQL depuis Vercel Dashboard :"
echo "   (Format: postgresql://user:password@host:port/database)"
echo ""
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
echo "✅ DATABASE_URL configurée !"
echo ""
echo "📋 Variables d'environnement actuelles :"
vercel env ls

echo ""
echo "🚀 Redéploiement en cours..."
vercel --prod

echo ""
echo "✅ Terminé ! Votre application devrait être déployée sur :"
echo "https://hearst-ai-v3-cmxl1onrl-adrien-nejkovics-projects.vercel.app"
echo ""
echo "📊 Pour vérifier les logs :"
echo "vercel logs"

