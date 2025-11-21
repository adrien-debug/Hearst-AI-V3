#!/bin/bash
VERCEL_URL="https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app"
NEXTAUTH_SECRET="mdO/+tjnQEHXeii1giZLAq/OVwJmNPD2BE+tYz6bwCk="
DEBANK_KEY="bd96b970a2c07a67739266c434cd0e8ea00fa656"

echo "Ajout NEXTAUTH_SECRET..."
printf "%s\nproduction\n" "$NEXTAUTH_SECRET" | vercel env add NEXTAUTH_SECRET 2>&1 | tail -2

echo ""
echo "Ajout NEXTAUTH_URL..."
printf "%s\nproduction\n" "$VERCEL_URL" | vercel env add NEXTAUTH_URL 2>&1 | tail -2

echo ""
echo "Ajout DEBANK_ACCESS_KEY..."
printf "%s\nproduction\n" "$DEBANK_KEY" | vercel env add DEBANK_ACCESS_KEY 2>&1 | tail -2

echo ""
echo "✅ Variables ajoutées !"
vercel env ls
