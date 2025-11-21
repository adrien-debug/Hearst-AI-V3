#!/bin/bash

# Script de démarrage complet en local
# Démarre le backend Express et le frontend (Next.js ou classique)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 Démarrage de HearstAI en local"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Fonction pour nettoyer les processus à l'arrêt
cleanup() {
    echo ""
    echo "🛑 Arrêt des serveurs..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "   Installez Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"
echo ""

# 1. Installer les dépendances backend si nécessaire
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installation des dépendances backend..."
    cd backend
    npm install
    cd ..
    echo "✅ Dépendances backend installées"
    echo ""
fi

# 2. Démarrer le backend
echo "🔌 Démarrage du backend..."
cd backend
PORT=5556 node server.js > /tmp/hearst-backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 2

# Vérifier que le backend est démarré
if ps -p $BACKEND_PID > /dev/null; then
    echo "✅ Backend démarré (PID: $BACKEND_PID) sur http://localhost:5556"
else
    echo "❌ Erreur au démarrage du backend"
    cat /tmp/hearst-backend.log
    exit 1
fi
echo ""

# 3. Vérifier si Next.js est configuré
if [ -f "package.json" ] && [ -d "node_modules/next" ]; then
    # Vérifier que les dépendances Next.js sont installées
    if [ ! -d "node_modules" ]; then
        echo "📦 Installation des dépendances Next.js..."
        npm install
        echo "✅ Dépendances installées"
        echo ""
    fi
    
    echo "⚡ Démarrage du frontend Next.js..."
    PORT=3000 npm run dev > /tmp/hearst-frontend.log 2>&1 &
    FRONTEND_PID=$!
    sleep 3
    
    if ps -p $FRONTEND_PID > /dev/null; then
        echo "✅ Frontend Next.js démarré (PID: $FRONTEND_PID) sur http://localhost:3000"
        FRONTEND_URL="http://localhost:3000"
    else
        echo "❌ Erreur au démarrage de Next.js, passage au frontend classique..."
        cat /tmp/hearst-frontend.log
        FRONTEND_PID=""
    fi
else
    # Frontend classique
    echo "🌐 Démarrage du frontend classique..."
    
    # Option 1: Node.js dev-server
    if [ -f "dev-server.js" ]; then
        PORT=3000 node dev-server.js > /tmp/hearst-frontend.log 2>&1 &
        FRONTEND_PID=$!
        sleep 2
        FRONTEND_URL="http://localhost:3000"
        
        if ps -p $FRONTEND_PID > /dev/null; then
            echo "✅ Frontend Node.js démarré (PID: $FRONTEND_PID) sur http://localhost:3000"
        else
            echo "❌ Erreur Node.js, passage à Python..."
            FRONTEND_PID=""
        fi
    fi
    
    # Option 2: Python si Node.js ne fonctionne pas
    if [ -z "$FRONTEND_PID" ] && command -v python3 &> /dev/null; then
        cd frontend
        python3 -m http.server 8000 > /tmp/hearst-frontend.log 2>&1 &
        FRONTEND_PID=$!
        cd ..
        sleep 2
        FRONTEND_URL="http://localhost:8000"
        
        if ps -p $FRONTEND_PID > /dev/null; then
            echo "✅ Frontend Python démarré (PID: $FRONTEND_PID) sur http://localhost:8000"
        else
            echo "❌ Erreur au démarrage du frontend"
            cat /tmp/hearst-frontend.log
            exit 1
        fi
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Serveurs démarrés!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Frontend: $FRONTEND_URL"
echo "🔌 Backend:  http://localhost:5556/api"
echo ""
echo "📝 Logs backend:  tail -f /tmp/hearst-backend.log"
echo "📝 Logs frontend: tail -f /tmp/hearst-frontend.log"
echo ""
echo "⚠️  Appuyez sur Ctrl+C pour arrêter les serveurs"
echo ""

# Attendre les processus
wait $BACKEND_PID $FRONTEND_PID


