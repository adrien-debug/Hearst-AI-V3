#!/bin/bash

# Script pour préparer et pousser vers GitHub Hearst AI-V3

cd "$(dirname "$0")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Préparation pour GitHub: Hearst AI-V3"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vérifier Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git installé${NC}"
echo ""

# Vérifier l'état Git
echo "📋 État actuel du dépôt Git:"
git status --short | head -10
echo ""

# Demander confirmation
read -p "Voulez-vous créer un nouveau dépôt GitHub 'Hearst AI-V3'? (oui/non): " confirm

if [ "$confirm" != "oui" ] && [ "$confirm" != "o" ] && [ "$confirm" != "yes" ] && [ "$confirm" != "y" ]; then
    echo -e "${YELLOW}❌ Opération annulée${NC}"
    exit 0
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Préparation des fichiers..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Mettre à jour .gitignore si nécessaire
if ! grep -q "backend.log\|frontend.log" .gitignore 2>/dev/null; then
    echo "" >> .gitignore
    echo "# Logs de déploiement" >> .gitignore
    echo "backend.log" >> .gitignore
    echo "frontend.log" >> .gitignore
    echo "*.log" >> .gitignore
    echo -e "${GREEN}✅ .gitignore mis à jour${NC}"
fi

# Ajouter tous les fichiers
echo ""
echo "📝 Ajout des fichiers..."
git add .

# Créer un commit
echo ""
echo "💾 Création du commit..."
COMMIT_MESSAGE="🚀 Version V3 - Déploiement complet avec Backend et Frontend

- ✅ Synchronisation complète depuis Pino/DEV/HearstAI
- ✅ Backend Express sur port 4000
- ✅ Frontend Next.js sur port 6001
- ✅ Page Collateral Management complète
- ✅ Intégration DeBank API
- ✅ Tous les composants et routes API
- ✅ Documentation complète
- ✅ Scripts de déploiement local

Date: $(date '+%Y-%m-%d %H:%M:%S')"

git commit -m "$COMMIT_MESSAGE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Commit créé avec succès${NC}"
else
    echo -e "${YELLOW}⚠️  Aucun changement à commiter${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔗 Configuration du remote GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Vérifier le remote actuel
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "Remote actuel: $CURRENT_REMOTE"
    echo ""
    read -p "Voulez-vous remplacer le remote actuel? (oui/non): " replace_remote
    if [ "$replace_remote" = "oui" ] || [ "$replace_remote" = "o" ] || [ "$replace_remote" = "yes" ] || [ "$replace_remote" = "y" ]; then
        git remote remove origin
        echo -e "${GREEN}✅ Remote origin supprimé${NC}"
    fi
fi

# Demander l'URL du nouveau repo GitHub
echo ""
echo "📝 Entrez l'URL de votre nouveau dépôt GitHub 'Hearst AI-V3':"
echo "   Exemple: https://github.com/votre-username/Hearst-AI-V3.git"
read -p "URL GitHub: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo -e "${YELLOW}⚠️  URL non fournie. Création du remote manuel requis.${NC}"
    echo ""
    echo "Pour créer le dépôt GitHub:"
    echo "1. Allez sur https://github.com/new"
    echo "2. Créez un nouveau repo nommé 'Hearst-AI-V3'"
    echo "3. Ne l'initialisez PAS avec README, .gitignore ou license"
    echo "4. Exécutez ensuite:"
    echo ""
    echo "   git remote add origin $GITHUB_URL"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    exit 0
fi

# Ajouter le nouveau remote
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
    read -p "Renommer la branche en 'main'? (oui/non): " rename_branch
    if [ "$rename_branch" = "oui" ] || [ "$rename_branch" = "o" ]; then
        git branch -M main
        echo -e "${GREEN}✅ Branche renommée en 'main'${NC}"
    fi
else
    echo -e "${GREEN}✅ Branche actuelle: main${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Prêt pour le push vers GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Remote configuré: $GITHUB_URL"
echo "Branche: main"
echo ""
echo "Pour pousser le code, exécutez:"
echo -e "${BLUE}   git push -u origin main${NC}"
echo ""
echo "Ou pour forcer le push (si le repo existe déjà):"
echo -e "${YELLOW}   git push -u origin main --force${NC}"
echo ""

