#!/bin/bash

# Script automatique pour pousser vers GitHub Hearst AI-V3

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Push automatique vers GitHub: Hearst AI-V3"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Déterminer l'URL GitHub basée sur le remote actuel
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null)

if [ -z "$CURRENT_REMOTE" ]; then
    echo -e "${RED}❌ Aucun remote trouvé${NC}"
    echo "Veuillez créer le dépôt GitHub d'abord et fournir l'URL"
    exit 1
fi

# Extraire le nom d'utilisateur et créer l'URL
if echo "$CURRENT_REMOTE" | grep -q "github.com"; then
    # Extraire le nom d'utilisateur
    USERNAME=$(echo "$CURRENT_REMOTE" | sed -n 's|.*github.com[:/]\([^/]*\)/.*|\1|p')
    
    if [ -z "$USERNAME" ]; then
        USERNAME="adrien-debug"  # Par défaut basé sur le remote actuel
    fi
    
    # Créer l'URL du nouveau dépôt
    if echo "$CURRENT_REMOTE" | grep -q "^git@"; then
        GITHUB_URL="git@github.com:${USERNAME}/Hearst-AI-V3.git"
    else
        GITHUB_URL="https://github.com/${USERNAME}/Hearst-AI-V3.git"
    fi
else
    echo -e "${RED}❌ Remote GitHub non reconnu${NC}"
    exit 1
fi

echo "Remote actuel: $CURRENT_REMOTE"
echo "Nouveau dépôt: $GITHUB_URL"
echo ""

# Demander confirmation
read -p "Voulez-vous configurer le remote vers '$GITHUB_URL'? (oui/non): " confirm

if [ "$confirm" != "oui" ] && [ "$confirm" != "o" ] && [ "$confirm" != "yes" ] && [ "$confirm" != "y" ]; then
    echo -e "${YELLOW}❌ Opération annulée${NC}"
    echo ""
    echo "Pour configurer manuellement:"
    echo "  git remote set-url origin https://github.com/VOTRE-USERNAME/Hearst-AI-V3.git"
    exit 0
fi

# Changer le remote
echo ""
echo "🔗 Configuration du remote..."
git remote set-url origin "$GITHUB_URL"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Remote configuré: $GITHUB_URL${NC}"
else
    echo -e "${RED}❌ Erreur lors de la configuration du remote${NC}"
    exit 1
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

# Push
echo "📤 Envoi du code vers GitHub..."
echo "   Dépôt: $GITHUB_URL"
echo "   Branche: main"
echo ""

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
    echo "📋 Pour voir le dépôt:"
    echo "   https://github.com/${USERNAME}/Hearst-AI-V3"
    echo ""
else
    echo ""
    echo -e "${YELLOW}⚠️  Erreur lors du push${NC}"
    echo ""
    echo "Causes possibles:"
    echo "1. Le dépôt GitHub n'existe pas encore"
    echo "2. Problème d'authentification"
    echo ""
    echo "Solutions:"
    echo "1. Créez le dépôt sur https://github.com/new"
    echo "   Nom: Hearst-AI-V3"
    echo "   Ne cochez AUCUNE option"
    echo ""
    echo "2. Si le dépôt existe déjà avec des fichiers:"
    echo -e "${BLUE}   git push -u origin main --force${NC}"
    echo ""
    echo "3. Vérifiez votre authentification GitHub:"
    echo "   git config --global user.name"
    echo "   git config --global user.email"
fi

