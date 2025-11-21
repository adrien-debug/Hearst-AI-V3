#!/bin/bash

echo "🚀 REDÉMARRAGE COMPLET DES SERVICES"
echo "===================================="
echo ""

# Arrêter les processus existants
echo "1️⃣ Arrêt des processus existants..."
pkill -f "node.*server.js" 2>/dev/null
sleep 2
echo "   ✅ Arrêté"
echo ""

# Démarrer Backend Express
echo "2️⃣ Démarrage Backend Express..."
cd "$(dirname "$0")/backend"
if [ -f "../backend.pid" ]; then
    kill $(cat ../backend.pid) 2>/dev/null
    rm ../backend.pid
fi

nohup node server.js > ../backend.log 2>&1 &
echo $! > ../backend.pid
sleep 4

if curl -s http://localhost:4000/api/health > /dev/null 2>&1; then
    echo "   ✅ Backend Express démarré (PID: $(cat ../backend.pid))"
    echo "   → http://localhost:4000/api"
else
    echo "   ⚠️  Backend Express en cours de démarrage..."
    echo "   → Vérifiez les logs: tail -f backend.log"
fi

cd ..

echo ""
echo "3️⃣ Vérification Next.js..."
if curl -s http://localhost:6001/api/hashprice-lite > /dev/null 2>&1; then
    echo "   ✅ Next.js fonctionne"
    echo "   → http://localhost:6001"
else
    echo "   ⚠️  Next.js non accessible"
    echo "   → Démarrer avec: npm run dev"
fi

echo ""
echo "===================================="
echo "✅ Redémarrage terminé"
echo ""
echo "📋 URLs:"
echo "   • Backend: http://localhost:4000/api"
echo "   • Next.js: http://localhost:6001"
echo "   • Calculator: http://localhost:6001/calculator"
echo ""

