#!/bin/bash

cd "$(dirname "$0")/.."

echo "🔄 Génération de Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
  echo "❌ Erreur lors de la génération de Prisma Client"
  exit 1
fi

echo "✅ Prisma Client généré avec succès"
echo "🚀 Démarrage du serveur Next.js..."
npm run dev

