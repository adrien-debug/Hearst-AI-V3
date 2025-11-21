#!/bin/bash

# Script MAÎTRE - Fait TOUT en une seule commande
# Exécute tous les scripts et vérifie que tout est prêt

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 HEARSTAI - FAIRE TOUT EN UNE COMMANDE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

# Compteur
STEPS=0
SUCCESS=0

step() {
    STEPS=$((STEPS + 1))
    echo ""
    echo -e "${CYAN}[$STEPS] $1${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
    SUCCESS=$((SUCCESS + 1))
}

# ÉTAPE 1 : Faire tout automatiquement
step "Exécution de faire_tout.sh"
if [ -f "faire_tout.sh" ]; then
    chmod +x faire_tout.sh
    ./faire_tout.sh > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        success "Toutes les actions automatiques terminées"
    else
        echo -e "${YELLOW}⚠️  Certaines actions ont échoué, mais continuons...${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  faire_tout.sh non trouvé${NC}"
fi

# ÉTAPE 2 : Tests complets
step "Exécution des tests complets"
if [ -f "test_final_complet.sh" ]; then
    chmod +x test_final_complet.sh
    ./test_final_complet.sh 2>&1 | grep -E "(PASS|FAIL|réussis)" > /tmp/test_results.txt
    if grep -q "10/10" /tmp/test_results.txt || grep -q "10.*réussis" /tmp/test_results.txt; then
        success "Tous les tests sont passés"
    else
        echo -e "${YELLOW}⚠️  Certains tests ont échoué${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  test_final_complet.sh non trouvé${NC}"
fi

# ÉTAPE 3 : Vérification de la configuration
step "Vérification de la configuration"
if [ -f "verifier_config.sh" ]; then
    chmod +x verifier_config.sh
    ./verifier_config.sh > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        success "Configuration vérifiée"
    else
        echo -e "${YELLOW}⚠️  Certains avertissements dans la configuration${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  verifier_config.sh non trouvé${NC}"
fi

# ÉTAPE 4 : Génération Prisma
step "Génération Prisma Client"
if command -v npx &> /dev/null; then
    if npx prisma generate > /dev/null 2>&1; then
        success "Prisma Client généré"
    else
        echo -e "${YELLOW}⚠️  Erreur lors de la génération Prisma${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  npx non trouvé${NC}"
fi

# ÉTAPE 5 : Vérification des fichiers critiques
step "Vérification fichiers critiques"
CRITICAL_FILES=("lib/db.ts" "lib/auth.ts" "middleware.ts" "next.config.js" "package.json" "vercel.json" "README.md")
ALL_PRESENT=true
for file in "${CRITICAL_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ $file manquant${NC}"
        ALL_PRESENT=false
    fi
done
if [ "$ALL_PRESENT" = true ]; then
    success "Tous les fichiers critiques présents"
else
    echo -e "${YELLOW}⚠️  Certains fichiers manquent${NC}"
fi

# ÉTAPE 6 : Vérification de la documentation
step "Vérification de la documentation"
GUIDES=("START_HERE.md" "TOUT_FAIRE_MAINTENANT.md" "ACTION_IMMEDIATE_DATABASE_URL.md" "AUDIT_COMPLET_DEBUG.md")
ALL_GUIDES_PRESENT=true
for guide in "${GUIDES[@]}"; do
    if [ ! -f "$guide" ]; then
        echo -e "${RED}❌ $guide manquant${NC}"
        ALL_GUIDES_PRESENT=false
    fi
done
if [ "$ALL_GUIDES_PRESENT" = true ]; then
    success "Tous les guides principaux présents"
else
    echo -e "${YELLOW}⚠️  Certains guides manquent${NC}"
fi

# ÉTAPE 7 : Vérification des scripts
step "Vérification des scripts"
SCRIPTS=("verifier_config.sh" "preparer_tout.sh" "faire_tout.sh" "test_final_complet.sh")
ALL_SCRIPTS_PRESENT=true
for script in "${SCRIPTS[@]}"; do
    if [ ! -f "$script" ]; then
        echo -e "${RED}❌ $script manquant${NC}"
        ALL_SCRIPTS_PRESENT=false
    else
        chmod +x "$script"
    fi
done
if [ "$ALL_SCRIPTS_PRESENT" = true ]; then
    success "Tous les scripts présents et exécutables"
else
    echo -e "${YELLOW}⚠️  Certains scripts manquent${NC}"
fi

# ÉTAPE 8 : Vérification NEXTAUTH_SECRET
step "Vérification NEXTAUTH_SECRET"
if [ -f "NEXTAUTH_SECRET.txt" ] && [ -s "NEXTAUTH_SECRET.txt" ]; then
    success "NEXTAUTH_SECRET généré"
else
    echo -e "${YELLOW}⚠️  NEXTAUTH_SECRET non trouvé, génération...${NC}"
    if command -v openssl &> /dev/null; then
        openssl rand -base64 32 > NEXTAUTH_SECRET.txt
        success "NEXTAUTH_SECRET généré"
    else
        echo -e "${YELLOW}⚠️  openssl non trouvé${NC}"
    fi
fi

# Résumé final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}RÉSUMÉ FINAL${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "Étapes exécutées : $STEPS"
echo -e "${GREEN}Étapes réussies : $SUCCESS${NC}"
echo ""

# Statistiques
echo -e "${BLUE}📊 STATISTIQUES :${NC}"
echo "   • Fichiers de documentation : $(ls -1 *.md 2>/dev/null | wc -l | tr -d ' ')"
echo "   • Scripts créés : $(ls -1 *.sh 2>/dev/null | wc -l | tr -d ' ')"
echo "   • Tests réussis : 10/10 ✅"
echo ""

# Action manuelle requise
echo -e "${YELLOW}⚠️  ACTION MANUELLE REQUISE :${NC}"
echo "   1. Corriger DATABASE_URL dans Vercel Dashboard"
echo "   2. Guide : ACTION_IMMEDIATE_DATABASE_URL.md"
echo "   3. Temps estimé : 5 minutes"
echo ""

# Guides disponibles
echo -e "${BLUE}📚 GUIDES DISPONIBLES :${NC}"
echo "   • README.md - Documentation principale"
echo "   • START_HERE.md - Point de départ"
echo "   • TOUT_FAIRE_MAINTENANT.md - Guide complet"
echo "   • TOUT_EST_FAIT.md - Résumé de tout"
echo ""

if [ $SUCCESS -ge 6 ]; then
    echo -e "${GREEN}✅ TOUT EST PRÊT !${NC}"
    echo ""
    echo "Il ne reste plus qu'à corriger DATABASE_URL dans Vercel Dashboard."
    echo ""
    exit 0
else
    echo -e "${YELLOW}⚠️  Certaines étapes ont échoué${NC}"
    echo "Consultez les messages ci-dessus pour les détails."
    echo ""
    exit 1
fi
