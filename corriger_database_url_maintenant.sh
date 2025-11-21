#!/bin/bash

# Script pour corriger DATABASE_URL dans Vercel
# Utilise les informations trouvées dans .env.vercel

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 CORRECTION DATABASE_URL - Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(dirname "$0")"

# Vérifier Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI n'est pas installé${NC}"
    exit 1
fi

# Vérifier la connexion
if ! vercel whoami &> /dev/null; then
    echo -e "${RED}❌ Vous n'êtes pas connecté à Vercel CLI${NC}"
    echo "Connectez-vous avec : vercel login"
    exit 1
fi

echo -e "${GREEN}✅ Vercel CLI configuré${NC}"
echo ""

# Lire la valeur actuelle
echo -e "${BLUE}📋 Valeur actuelle de DATABASE_URL dans Vercel :${NC}"
CURRENT_DB=$(vercel env pull .env.vercel.tmp 2>/dev/null && grep "^DATABASE_URL=" .env.vercel.tmp 2>/dev/null | cut -d'=' -f2- | sed 's/^"//' | sed 's/"$//' | tr -d '\n' | sed 's/\\n//g')
rm -f .env.vercel.tmp

if [ -n "$CURRENT_DB" ]; then
    echo "$CURRENT_DB" | sed 's/:[^:@]*@/:***@/g'  # Masquer le mot de passe
    echo ""
    
    # Vérifier si c'est un placeholder
    if [[ "$CURRENT_DB" == *"xxx"* ]] || [[ "$CURRENT_DB" == *"placeholder"* ]]; then
        echo -e "${YELLOW}⚠️  DATABASE_URL contient un placeholder (db.xxx.supabase.com)${NC}"
        echo ""
        echo -e "${BLUE}📋 Pour corriger :${NC}"
        echo ""
        echo "1. Allez sur https://supabase.com/dashboard"
        echo "2. Sélectionnez votre projet"
        echo "3. Settings → Database → Connection String → URI"
        echo "4. Copiez l'URL complète"
        echo ""
        echo -e "${YELLOW}Collez l'URL Supabase ici (ou appuyez sur Entrée pour annuler) :${NC}"
        read -r SUPABASE_URL
        
        if [ -z "$SUPABASE_URL" ]; then
            echo "Annulé."
            exit 0
        fi
        
        # Vérifier le format
        if [[ ! "$SUPABASE_URL" =~ ^postgresql:// ]] && [[ ! "$SUPABASE_URL" =~ ^postgres:// ]]; then
            echo -e "${RED}❌ Format d'URL invalide${NC}"
            exit 1
        fi
        
        if [[ "$SUPABASE_URL" == *"xxx"* ]] || [[ "$SUPABASE_URL" == *"placeholder"* ]]; then
            echo -e "${RED}❌ L'URL contient encore un placeholder${NC}"
            exit 1
        fi
        
        echo ""
        echo -e "${BLUE}Configuration de DATABASE_URL dans Vercel...${NC}"
        echo ""
        
        # Supprimer l'ancienne valeur pour Production
        echo -e "${YELLOW}Suppression de l'ancienne valeur pour Production...${NC}"
        vercel env rm DATABASE_URL production --yes 2>&1 | grep -v "Retrieving project" || true
        
        # Ajouter la nouvelle valeur
        echo -e "${YELLOW}Ajout de la nouvelle valeur pour Production...${NC}"
        echo "$SUPABASE_URL" | vercel env add DATABASE_URL production 2>&1 | grep -v "Retrieving project"
        
        # Faire de même pour Preview et Development
        echo ""
        echo -e "${YELLOW}Configuration pour Preview...${NC}"
        vercel env rm DATABASE_URL preview --yes 2>&1 | grep -v "Retrieving project" || true
        echo "$SUPABASE_URL" | vercel env add DATABASE_URL preview 2>&1 | grep -v "Retrieving project"
        
        echo ""
        echo -e "${YELLOW}Configuration pour Development...${NC}"
        vercel env rm DATABASE_URL development --yes 2>&1 | grep -v "Retrieving project" || true
        echo "$SUPABASE_URL" | vercel env add DATABASE_URL development 2>&1 | grep -v "Retrieving project"
        
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo -e "${GREEN}✅ DATABASE_URL configuré avec succès !${NC}"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo -e "${BLUE}Vérification :${NC}"
        vercel env ls | grep DATABASE_URL
        echo ""
        echo -e "${YELLOW}⚠️  N'oubliez pas de redéployer :${NC}"
        echo "   vercel --prod"
        echo ""
    else
        echo -e "${GREEN}✅ DATABASE_URL semble correct (pas de placeholder détecté)${NC}"
        echo ""
        echo "Voulez-vous quand même le vérifier/modifier ? (o/n)"
        read -r response
        if [[ "$response" == "o" ]] || [[ "$response" == "O" ]]; then
            echo ""
            echo -e "${YELLOW}Collez la nouvelle URL Supabase (ou appuyez sur Entrée pour garder l'actuelle) :${NC}"
            read -r SUPABASE_URL
            
            if [ -n "$SUPABASE_URL" ]; then
                # Même processus de mise à jour
                vercel env rm DATABASE_URL production --yes 2>&1 | grep -v "Retrieving project" || true
                echo "$SUPABASE_URL" | vercel env add DATABASE_URL production 2>&1 | grep -v "Retrieving project"
                vercel env rm DATABASE_URL preview --yes 2>&1 | grep -v "Retrieving project" || true
                echo "$SUPABASE_URL" | vercel env add DATABASE_URL preview 2>&1 | grep -v "Retrieving project"
                vercel env rm DATABASE_URL development --yes 2>&1 | grep -v "Retrieving project" || true
                echo "$SUPABASE_URL" | vercel env add DATABASE_URL development 2>&1 | grep -v "Retrieving project"
                echo -e "${GREEN}✅ DATABASE_URL mis à jour !${NC}"
            fi
        fi
    fi
else
    echo -e "${YELLOW}⚠️  Impossible de lire DATABASE_URL actuel${NC}"
    echo ""
    echo "Entrez l'URL Supabase manuellement :"
    read -r SUPABASE_URL
    echo "$SUPABASE_URL" | vercel env add DATABASE_URL production
    echo "$SUPABASE_URL" | vercel env add DATABASE_URL preview
    echo "$SUPABASE_URL" | vercel env add DATABASE_URL development
fi

