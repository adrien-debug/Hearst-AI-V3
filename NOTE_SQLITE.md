# ⚠️ NOTE IMPORTANTE - SQLite vs PostgreSQL

## Problème

Le schema Prisma actuel utilise des fonctionnalités non supportées par SQLite :
- ❌ Enums (Role, ProjectType, JobType, etc.)
- ❌ Type Json
- ❌ @db.Text

## Solutions

### Option 1 : Utiliser PostgreSQL (Recommandé)

1. Installer PostgreSQL
2. Créer la base de données :
```sql
CREATE DATABASE hearstai;
```

3. Dans `prisma/schema.prisma`, utiliser :
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Dans `.env.local` :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/hearstai?schema=public"
```

5. Générer et pousser :
```bash
npm run db:generate
npm run db:push
```

### Option 2 : Adapter le schema pour SQLite

Il faut :
- Remplacer tous les enums par des String avec des CHECK constraints
- Remplacer tous les Json par String
- Enlever tous les @db.Text

**C'est un travail important qui nécessite de modifier tout le schema.**

### Option 3 : Démarrer sans base de données (pour tester le frontend)

Le serveur Next.js peut démarrer sans base de données pour tester le frontend. Les routes API retourneront des erreurs, mais les pages frontend fonctionneront.

```bash
npm run dev
```

---

**Recommandation** : Utiliser PostgreSQL pour le développement local. C'est plus simple et compatible avec le schema actuel.




