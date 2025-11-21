# 🚀 Comment démarrer l'application HearstAI

## ⚠️ IMPORTANT : Modules ES6

Votre application utilise des **modules ES6** (`import`/`export` JavaScript).

**Les modules ES6 ne fonctionnent PAS avec le protocole `file://`**

Vous **DEVEZ** utiliser un serveur HTTP pour faire fonctionner l'application.

---

## ✅ Solution Rapide

### Option 1 : Script automatique (Recommandé)

```bash
# Rendre le script exécutable (une seule fois)
chmod +x START_SERVER.sh

# Lancer le serveur
./START_SERVER.sh
```

Puis ouvrez dans votre navigateur : **http://localhost:8000**

---

### Option 2 : Python 3 (Manuel)

```bash
cd frontend
python3 -m http.server 8000
```

Puis ouvrez : **http://localhost:8000**

---

### Option 3 : Node.js (Si vous avez Node.js)

```bash
npx http-server frontend -p 8000
```

Puis ouvrez : **http://localhost:8000**

---

### Option 4 : PHP (Si vous avez PHP)

```bash
php -S localhost:8000 -t frontend
```

Puis ouvrez : **http://localhost:8000**

---

## 📋 Vérification

Une fois le serveur démarré, vous devriez voir :

1. ✅ Le serveur écoute sur le port 8000
2. ✅ Aucune erreur dans la console
3. ✅ L'application se charge dans le navigateur

---

## 🐛 Problèmes courants

### "Cannot GET /"
- Vérifiez que vous êtes dans le bon dossier
- Le serveur doit pointer vers le dossier `frontend/`

### "Module not found"
- Vérifiez que tous les fichiers sont présents
- Vérifiez la console du navigateur (F12) pour les erreurs

### Port déjà utilisé
- Changez le port : `python3 -m http.server 8080`
- Ou arrêtez l'autre processus utilisant le port 8000

---

## 📝 Notes

- **Ne fermez pas le terminal** tant que vous utilisez l'application
- Le serveur doit rester actif pour que l'application fonctionne
- Pour arrêter : Appuyez sur `Ctrl+C` dans le terminal

