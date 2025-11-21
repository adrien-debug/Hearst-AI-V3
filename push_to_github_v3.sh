#!/bin/bash

# Script pour pousser vers GitHub Hearst AI-V3

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Push vers GitHub: Hearst AI-V3"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vérifier le remote actuel
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "Remote actuel: $CURRENT_REMOTE"
    echo ""
fi

# Demander l'URL du nouveau repo
echo "📝 Entrez l'URL de votre dépôt GitHub 'Hearst-AI-V3':"
echo "   Exemple: https://github.com/adrien-debug/Hearst-AI-V3.git"
echo "   Ou: git@github.com:adrien-debug/Hearst-AI-V3.git"
read -p "URL GitHub: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo -e "${RED}❌ URL requise${NC}"
    exit 1
fi

# Changer le remote
echo ""
echo "🔗 Configuration du remote..."
if git remote | grep -q "^origin$"; then
    git remote set-url origin "$GITHUB_URL"
    echo -e "${GREEN}✅ Remote origin mis à jour${NC}"
else
    git remote add origin "$GITHUB_URL"
    echo -e "${GREEN}✅ Remote origin ajouté${NC}"
fi

# Vérifier la branche
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo ""
    echo "Renommage de la branche en 'main'..."
    git branch -M main
    echo -e "${GREEN}✅ Branche renommée en 'main'${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📤 Push vers GitHub..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Demander confirmation
read -p "Voulez-vous pousser maintenant? (oui/non): " confirm_push

if [ "$confirm_push" != "oui" ] && [ "$confirm_push" != "o" ] && [ "$confirm_push" != "yes" ] && [ "$confirm_push" != "y" ]; then
    echo -e "${YELLOW}❌ Push annulé${NC}"
    echo ""
    echo "Pour pousser plus tard:"
    echo -e "${BLUE}   git push -u origin main${NC}"
    exit 0
fi

# Push
echo ""
echo "📤 Envoi du code vers GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}✅ Code poussé avec succès vers GitHub !${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🌐 Votre dépôt est disponible à:"
    echo "   $GITHUB_URL"
    echo ""
else
    echo ""
    echo -e "${YELLOW}⚠️  Erreur lors du push${NC}"
    echo ""
    echo "Si le dépôt existe déjà et contient des fichiers, essayez:"
    echo -e "${BLUE}   git push -u origin main --force${NC}"
    echo ""
    echo "⚠️  ATTENTION: --force écrase le contenu existant du dépôt"
fi

