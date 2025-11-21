# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [2.0.0] - 2024-11-20

### Phase 1 : Foundation ✅

#### Ajouté
- Configuration Next.js 15 avec App Router
- Configuration TypeScript strict
- Configuration Tailwind CSS + shadcn/ui
- Schema Prisma complet avec toutes les entités
- Configuration NextAuth.js v5
- Middleware de protection des routes
- Utilitaires de base (lib/utils.ts, lib/db.ts, lib/api.ts)
- Composants UI de base (Button, Card)
- Styles globaux avec design system NEARST
- Documentation complète (README_PHASE1.md, ARCHITECTURE.md, QUICKSTART.md)

#### Modifié
- `package.json` - Mise à jour avec toutes les dépendances Next.js 15
- `tsconfig.json` - Configuration TypeScript strict
- `styles/globals.css` - Intégration Tailwind + variables CSS shadcn/ui

---

## [2.1.0] - 2024-11-20

### Phase 2 : Migration Backend ✅

#### Ajouté
- Routes API Next.js complètes :
  - `/api/health` - Health check
  - `/api/stats` - Statistiques globales
  - `/api/projects` - CRUD projets
  - `/api/projects/[id]` - Détails, modification, suppression
  - `/api/projects/[id]/rollback` - Rollback vers une version
  - `/api/jobs` - CRUD jobs
  - `/api/jobs/[id]` - Détails, annulation
  - `/api/jobs/[id]/execute` - Exécution de jobs
  - `/api/versions` - CRUD versions
  - `/api/versions/[id]` - Détails, suppression
  - `/api/versions/[id]/stable` - Marquer comme stable
- Authentification sur toutes les routes
- Vérification de propriété (ownership)
- Validation des données d'entrée
- Gestion des erreurs complète

#### Modifié
- Migration de Express routes vers Next.js API Routes
- Migration de SQLite (better-sqlite3) vers Prisma ORM
- Remplacement des modèles JavaScript par Prisma

#### Documentation
- `README_PHASE2.md` - Documentation Phase 2
- `CHANGELOG.md` - Ce fichier

---

## [2.2.0] - 2024-11-20

### Phase 3 : Migration Frontend ✅

#### Ajouté
- Page Dashboard avec intégration API stats
- Page Projects avec liste en grille
- Page Jobs avec tableau et refresh automatique
- Composant Dashboard TypeScript avec graphiques
- Intégration shadcn/ui (Card, Button)
- Types TypeScript pour toutes les pages
- Gestion des erreurs et états de chargement

#### Modifié
- `app/page.tsx` - Migration vers TypeScript avec API stats
- `components/Dashboard.tsx` - Migration vers TypeScript
- `components/Sidebar.js` - Ajout lien Projects
- `components/Header.js` - Ajout titre Projects
- `lib/api.ts` - Types TypeScript pour toutes les réponses

#### Documentation
- `README_PHASE3.md` - Documentation Phase 3

---

## [Unreleased]

### Phase 4 : Features (À venir)
- Services (JobExecutorService, ClaudeAPIService, FileStorageService)
- Exécution réelle des jobs avec Claude API
- Upload de fichiers
- Authentification complète (pages signin/signup)

### Phase 5 : Polish (À venir)
- UI/UX final
- Tests
- Documentation complète
- Déploiement production

---

## Format

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

