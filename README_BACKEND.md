# 🔗 Configuration Backend Railway

Le backend est maintenant hébergé sur **Railway** et accessible à l'adresse :

**https://hearstai-backend-production.up.railway.app/api**

## ⚙️ Configuration

Le frontend Next.js est configuré pour utiliser le backend Railway via la variable d'environnement `NEXT_PUBLIC_API_URL` dans `.env.local` :

```env
NEXT_PUBLIC_API_URL=https://hearstai-backend-production.up.railway.app/api
```

## 🔄 Utilisation

### En production
Le frontend utilise automatiquement le backend Railway configuré dans `.env.local`.

### En développement local
Pour utiliser le backend local au lieu de Railway, modifiez `.env.local` :

```env
# Commenter la ligne Railway
# NEXT_PUBLIC_API_URL=https://hearstai-backend-production.up.railway.app/api

# Utiliser les routes API Next.js locales
NEXT_PUBLIC_API_URL=/api
```

## 📡 Endpoints disponibles

- `GET /api/health` - Health check
- `GET /api` - Informations sur l'API
- `GET /api/projects` - Liste des projets
- `GET /api/jobs` - Liste des jobs
- `GET /api/versions` - Liste des versions
- `GET /api/stats` - Statistiques globales
- `GET /api/logs` - Logs système
- `GET /api/prompts` - Templates de prompts

## ✅ Vérification

Pour vérifier que le backend Railway fonctionne :

```bash
curl https://hearstai-backend-production.up.railway.app/api/health
```

Devrait retourner :
```json
{"status":"ok","timestamp":"...","environment":"local"}
```

