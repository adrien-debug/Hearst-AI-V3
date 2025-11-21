#!/bin/bash

# Arrêter les processus existants
echo "Arrêt des processus..."
pkill -9 -f "next dev" 2>/dev/null
pkill -9 -f "node.*server.js" 2>/dev/null
sleep 2

# Démarrer Backend
echo "Démarrage Backend sur port 4000..."
cd "$(dirname "$0")/backend"
node server.js &
BACKEND_PID=$!
cd ..

# Attendre un peu
sleep 2

# Démarrer Frontend
echo "Démarrage Frontend sur port 6001..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Serveurs démarrés !"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Backend:  http://localhost:4000/api/health"
echo "Frontend: http://localhost:6001"
echo ""
echo "Pour arrêter: pkill -f 'node server' && pkill -f 'next dev'"

