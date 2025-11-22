# 📘 GUIDE D'APPLICATION DE LA CHARTE GRAPHIQUE

**Date:** 22 Novembre 2025  
**Version:** 1.0

---

## 🎯 OBJECTIF

Ce guide explique comment appliquer la charte graphique extraite de la page HOME sur les autres pages de l'application.

---

## 📋 ÉTAPES D'APPLICATION

### Étape 1: Analyser la page cible

1. Identifier tous les composants utilisés
2. Identifier les styles inline
3. Identifier les classes CSS personnalisées
4. Noter les différences avec la charte HOME

### Étape 2: Créer un patch CSS

Créer un fichier `[page-name]-charte-patch.css` qui :

1. **Harmonise les couleurs**
   - Remplacer toutes les couleurs hardcodées par les tokens CSS
   - Utiliser `#A7FB90` pour les valeurs importantes
   - Utiliser `var(--text-primary)`, `var(--text-secondary)` pour les textes

2. **Harmonise les espacements**
   - Remplacer tous les espacements hardcodés par `var(--space-X)`
   - Utiliser `var(--space-4)` pour les gaps entre éléments similaires
   - Utiliser `var(--space-6)` pour les gaps entre sections

3. **Harmonise les border-radius**
   - Cards: `var(--radius-md)` (16px)
   - Petits éléments: `var(--radius-sm)` (8px)
   - Badges: `var(--radius-full)` (1000px)

4. **Harmonise les ombres**
   - Utiliser les ombres standards des cards HOME
   - Appliquer les mêmes effets hover

5. **Harmonise la typographie**
   - Utiliser `var(--font-family-primary)` pour tous les textes
   - Utiliser `var(--font-family-mono)` pour les valeurs numériques
   - Respecter les tailles de police standards

### Étape 3: Appliquer le patch

Dans le fichier `page.tsx` de la page cible :

```tsx
useEffect(() => {
  // Charger le CSS existant
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/css/[page-name]-desktop.css'
  document.head.appendChild(link)

  // Charger le patch CSS
  const patchLink = document.createElement('link')
  patchLink.rel = 'stylesheet'
  patchLink.href = '/css/[page-name]-charte-patch.css'
  document.head.appendChild(patchLink)

  return () => {
    // Cleanup
    const existingLink = document.querySelector(`link[href="/css/[page-name]-desktop.css"]`)
    if (existingLink && existingLink.parentNode) {
      existingLink.parentNode.removeChild(existingLink)
    }
    const existingPatchLink = document.querySelector(`link[href="/css/[page-name]-charte-patch.css"]`)
    if (existingPatchLink && existingPatchLink.parentNode) {
      existingPatchLink.parentNode.removeChild(existingPatchLink)
    }
  }
}, [])
```

### Étape 4: Utiliser les composants wrappers

Remplacer les structures manuelles par les composants wrappers :

#### Avant:
```tsx
<div className="custom-card">
  <div className="card-header">
    <h3>Titre</h3>
  </div>
  <div className="card-content">
    <div className="value">123</div>
    <p>Description</p>
  </div>
</div>
```

#### Après:
```tsx
import { CardWrapper } from '@/components/ui/CardWrapper'
import { KpiBoxLayout } from '@/components/ui/KpiBoxLayout'

<KpiBoxLayout
  title="Titre"
  value={123}
  description="Description"
  valueColor="green"
/>
```

---

## 🎨 TOKENS CSS À UTILISER

### Couleurs
```css
/* Couleur principale */
#A7FB90                    /* Valeurs importantes */
var(--hearst-green)        /* Alias */

/* Backgrounds */
var(--bg-primary)          /* #000000 */
var(--bg-secondary)        /* #1A1A1A */
var(--bg-tertiary)         /* #242424 */

/* Textes */
var(--text-primary)        /* #FFFFFF */
var(--text-secondary)      /* rgba(255, 255, 255, 0.7) */
var(--text-muted)          /* #999999 */
```

### Espacements
```css
var(--space-1)  /* 2px */
var(--space-2)  /* 4px */
var(--space-3)  /* 8px */
var(--space-4)  /* 12px */
var(--space-5)  /* 16px */
var(--space-6)  /* 24px */
var(--space-7)  /* 32px */
var(--space-8)  /* 48px */
```

### Border Radius
```css
var(--radius-sm)   /* 8px */
var(--radius-md)   /* 16px */
var(--radius-lg)   /* 12px */
var(--radius-xl)   /* 16px */
var(--radius-full) /* 1000px */
```

### Typographie
```css
var(--font-family-primary)  /* FK Grotesk Trial */
var(--font-family-mono)     /* Fira Code */

var(--typography-page-title-size)      /* 32px */
var(--typography-section-title-size)   /* 25px */
var(--typography-subsection-title-size) /* 18px */
var(--typography-body-size)            /* 16px */
var(--typography-body-minor-size)      /* 14px */
var(--typography-caption-size)         /* 12px */
```

---

## 📦 COMPOSANTS WRAPPERS DISPONIBLES

### CardWrapper
```tsx
import { CardWrapper } from '@/components/ui/CardWrapper'

<CardWrapper
  title="Titre"
  description="Description optionnelle"
  className="custom-class"
>
  {/* Contenu */}
</CardWrapper>
```

### KpiBoxLayout
```tsx
import { KpiBoxLayout } from '@/components/ui/KpiBoxLayout'

<KpiBoxLayout
  title="Total Projects"
  value={12}
  description="Active projects"
  valueColor="green" // 'green' | 'primary' | 'secondary'
/>
```

### ContainerPage
```tsx
import { ContainerPage } from '@/components/ui/ContainerPage'

<ContainerPage maxWidth="1600px">
  {/* Contenu de la page */}
</ContainerPage>
```

---

## ✅ CHECKLIST D'APPLICATION

Pour chaque nouvelle page :

- [ ] Analyser la page existante
- [ ] Créer un fichier `[page-name]-charte-patch.css`
- [ ] Harmoniser les couleurs (utiliser les tokens)
- [ ] Harmoniser les espacements (utiliser `var(--space-X)`)
- [ ] Harmoniser les border-radius (utiliser `var(--radius-X)`)
- [ ] Harmoniser les ombres (utiliser les patterns HOME)
- [ ] Harmoniser la typographie (utiliser les tokens)
- [ ] Remplacer les structures manuelles par les composants wrappers
- [ ] Tester visuellement la cohérence avec la page HOME
- [ ] Vérifier le responsive

---

## 🔍 EXEMPLE COMPLET: Wallet Scraper

### Fichiers créés:
1. `/public/css/wallet-scraper-charte-patch.css` - Patch CSS
2. Modification de `/app/wallet-scraper/page.tsx` - Chargement du patch

### Changements appliqués:
- ✅ Couleur principale harmonisée: `#A7FB90`
- ✅ Container avec même max-width et padding que HOME
- ✅ Cards avec mêmes ombres et bordures
- ✅ Tables avec mêmes styles hover
- ✅ Boutons avec mêmes gradients
- ✅ Typographie harmonisée

---

## 🚀 PROCHAINES PAGES À TRAITER

1. **Calculator** (`/calculator`)
2. **Transactions** (`/transactions`)
3. **Projects** (`/projects`)
4. **Electricity** (`/electricity`)
5. **Cockpit** (`/cockpit`)

Pour chaque page, suivre le même processus :
1. Analyser
2. Créer le patch CSS
3. Appliquer le patch
4. Utiliser les composants wrappers si possible

---

**FIN DU GUIDE**

