#!/bin/bash
echo "🚀 Démarrage complet des services Calculator"
echo "============================================="
echo ""

# Démarrer Backend Express
echo "1️⃣ Démarrage Backend Express..."
cd backend
if [ -f "../backend.pid" ]; then
    kill $(cat ../backend.pid) 2>/dev/null
    rm ../backend.pid
fi
nohup node server.js > ../backend.log 2>&1 &
echo $! > ../backend.pid
sleep 3

if curl -s http://localhost:4000/api/health > /dev/null 2>&1; then
    echo "   ✅ Backend Express démarré (PID: $(cat ../backend.pid))"
else
    echo "   ⚠️  Backend Express en cours de démarrage..."
fi

cd ..

# Vérifier Next.js
echo ""
echo "2️⃣ Vérification Next.js..."
if curl -s http://localhost:6001/api/hashprice-lite > /dev/null 2>&1; then
    echo "   ✅ Next.js fonctionne"
else
    echo "   ⚠️  Next.js non accessible - démarrer avec: npm run dev"
fi

echo ""
echo "✅ Services démarrés !"
echo ""
echo "🌐 URLs:"
echo "   • http://localhost:6001/calculator"
echo "   • http://localhost:6001/api/hashprice-lite"
echo ""
