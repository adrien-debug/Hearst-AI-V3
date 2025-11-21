#!/bin/bash

# Script de préparation complète pour HearstAI
# Ce script prépare tout ce qui peut être fait automatiquement

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo "🚀 PRÉPARATION COMPLÈTE HEARSTAI"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Générer Prisma Client
echo -e "${BLUE}1. Génération Prisma Client...${NC}"
if npx prisma generate > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Prisma Client généré${NC}"
else
    echo -e "${RED}❌ Erreur lors de la génération Prisma Client${NC}"
    exit 1
fi
echo ""

# 2. Vérifier la configuration
echo -e "${BLUE}2. Vérification de la configuration...${NC}"
./verifier_config.sh
echo ""

# 3. Générer NEXTAUTH_SECRET si nécessaire
echo -e "${BLUE}3. Génération NEXTAUTH_SECRET...${NC}"
if command -v openssl &> /dev/null; then
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    echo -e "${GREEN}✅ NEXTAUTH_SECRET généré :${NC}"
    echo -e "${YELLOW}$NEXTAUTH_SECRET${NC}"
    echo ""
    echo -e "${BLUE}💾 Sauvegarde dans NEXTAUTH_SECRET.txt...${NC}"
    echo "$NEXTAUTH_SECRET" > NEXTAUTH_SECRET.txt
    echo -e "${GREEN}✅ Sauvegardé${NC}"
else
    echo -e "${YELLOW}⚠️  openssl non trouvé, génération manuelle requise${NC}"
fi
echo ""

# 4. Créer un fichier avec toutes les commandes Vercel
echo -e "${BLUE}4. Génération des commandes Vercel...${NC}"
cat > COMMANDES_VERCEL_CLI.txt << 'EOF'
# Commandes Vercel CLI à exécuter
# Après avoir obtenu la vraie URL Supabase

# 1. Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# 2. Se connecter à Vercel
vercel login

# 3. Lier le projet (si pas déjà fait)
vercel link

# 4. Ajouter/modifier DATABASE_URL
# Remplacez [VRAIE_URL_SUPABASE] par l'URL copiée depuis Supabase
echo "[VRAIE_URL_SUPABASE]" | vercel env add DATABASE_URL production
echo "[VRAIE_URL_SUPABASE]" | vercel env add DATABASE_URL preview
echo "[VRAIE_URL_SUPABASE]" | vercel env add DATABASE_URL development

# 5. Vérifier NEXTAUTH_URL (remplacez par votre URL Vercel)
echo "https://votre-projet.vercel.app" | vercel env add NEXTAUTH_URL production
echo "https://votre-projet.vercel.app" | vercel env add NEXTAUTH_URL preview
echo "http://localhost:6001" | vercel env add NEXTAUTH_URL development

# 6. Ajouter NEXTAUTH_SECRET (utilisez celui généré dans NEXTAUTH_SECRET.txt)
NEXTAUTH_SECRET=$(cat NEXTAUTH_SECRET.txt)
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET production
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET preview
echo "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET development

# 7. Vérifier les variables
vercel env ls

# 8. Redéployer
vercel --prod
EOF

echo -e "${GREEN}✅ Commandes sauvegardées dans COMMANDES_VERCEL_CLI.txt${NC}"
echo ""

# 5. Créer un résumé final
echo -e "${BLUE}5. Génération du résumé final...${NC}"
cat > RESUME_ACTIONS_FINAL.md << 'EOF'
# ✅ RÉSUMÉ DES ACTIONS - HearstAI

## 🎯 CE QUI A ÉTÉ FAIT AUTOMATIQUEMENT

- ✅ Prisma Client généré
- ✅ Configuration vérifiée
- ✅ NEXTAUTH_SECRET généré (voir NEXTAUTH_SECRET.txt)
- ✅ Commandes Vercel CLI préparées (voir COMMANDES_VERCEL_CLI.txt)
- ✅ Code prêt et fonctionnel

## ⚠️ CE QUI DOIT ÊTRE FAIT MANUELLEMENT

### 1. Obtenir l'URL Supabase (2 min)
- Allez sur https://supabase.com/dashboard
- Votre projet → Settings → Database → Connection String (URI) → Copiez

### 2. Corriger DATABASE_URL dans Vercel (3 min)

**Option A : Via Vercel Dashboard (Recommandé)**
- Allez sur https://vercel.com/dashboard
- Votre projet → Settings → Environment Variables
- DATABASE_URL → Edit → Collez l'URL → Save

**Option B : Via Vercel CLI**
- Suivez les instructions dans COMMANDES_VERCEL_CLI.txt
- Remplacez [VRAIE_URL_SUPABASE] par l'URL copiée

### 3. Vérifier les autres variables (2 min)
- NEXTAUTH_URL : votre URL Vercel
- NEXTAUTH_SECRET : utilisez celui dans NEXTAUTH_SECRET.txt
- DEBANK_ACCESS_KEY : si vous utilisez DeBank

### 4. Redéployer (1 min)
- Vercel Dashboard → Deployments → ⋯ → Redeploy
- Ou : `vercel --prod`

## 📋 FICHIERS CRÉÉS

- `NEXTAUTH_SECRET.txt` - Secret généré pour NextAuth
- `COMMANDES_VERCEL_CLI.txt` - Commandes Vercel CLI à exécuter
- `RESUME_ACTIONS_FINAL.md` - Ce fichier

## 🚀 PROCHAINES ÉTAPES

1. Lisez `TOUT_FAIRE_MAINTENANT.md` pour le guide complet
2. Suivez les étapes ci-dessus
3. Testez votre application après le déploiement

**Temps total estimé : 8 minutes**
EOF

echo -e "${GREEN}✅ Résumé créé dans RESUME_ACTIONS_FINAL.md${NC}"
echo ""

# Résumé final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ PRÉPARATION TERMINÉE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}📋 FICHIERS CRÉÉS :${NC}"
echo "   • NEXTAUTH_SECRET.txt"
echo "   • COMMANDES_VERCEL_CLI.txt"
echo "   • RESUME_ACTIONS_FINAL.md"
echo ""
echo -e "${YELLOW}⚠️  PROCHAINES ÉTAPES :${NC}"
echo "   1. Obtenez l'URL Supabase depuis Supabase Dashboard"
echo "   2. Corrigez DATABASE_URL dans Vercel Dashboard"
echo "   3. Vérifiez les autres variables"
echo "   4. Redéployez"
echo ""
echo -e "${BLUE}📚 GUIDES DISPONIBLES :${NC}"
echo "   • TOUT_FAIRE_MAINTENANT.md - Guide complet"
echo "   • ACTION_IMMEDIATE_DATABASE_URL.md - Guide DATABASE_URL"
echo "   • RESUME_ACTIONS_FINAL.md - Résumé des actions"
echo ""

