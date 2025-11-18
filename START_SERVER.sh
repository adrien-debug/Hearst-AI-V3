#!/bin/bash

# Script de démarrage du serveur de développement HearstAI
# Les modules ES6 nécessitent un serveur HTTP (pas file://)

echo "🚀 Démarrage du serveur de développement HearstAI..."
echo ""

# Vérifier si Python 3 est installé
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 détecté"
    echo ""
    echo "📡 Serveur HTTP démarré sur http://localhost:8000"
    echo "🌐 Ouvrez cette URL dans votre navigateur"
    echo ""
    echo "⚠️  IMPORTANT: Ne fermez pas cette fenêtre tant que vous utilisez l'application"
    echo ""
    echo "Pour arrêter le serveur: Appuyez sur Ctrl+C"
    echo ""
    echo "=========================================="
    echo ""
    
    # Démarrer le serveur Python dans le dossier frontend
    cd frontend
    python3 -m http.server 8000
else
    echo "❌ Python 3 n'est pas installé"
    echo ""
    echo "Alternatives:"
    echo "1. Installer Python 3: https://www.python.org/downloads/"
    echo "2. Utiliser Node.js: npx http-server frontend -p 8000"
    echo "3. Utiliser PHP: php -S localhost:8000 -t frontend"
    exit 1
fi

