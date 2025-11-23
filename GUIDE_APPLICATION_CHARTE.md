# 📘 GUIDE D'APPLICATION DE LA CHARTE GRAPHIQUE

**Date:** 2025-01-22  
**Objectif:** Appliquer la charte graphique de la page HOME sur toutes les autres pages

---

## 🎯 PRINCIPE

La charte graphique a été **extrait de la page HOME** (`/`) qui sert de référence. Toutes les autres pages doivent utiliser les **mêmes styles** pour une cohérence visuelle parfaite.

---

## 📦 COMPOSANTS RÉUTILISABLES

### 1. CardWrapper
**Fichier:** `components/ui/CardWrapper.tsx`

**Usage:** Wrapper pour toutes les cartes (même style que `.premium-stat-box`)

```tsx
import CardWrapper from '@/components/ui/CardWrapper'

<CardWrapper>
  {/* Contenu de la carte */}
</CardWrapper>

// Avec highlight
<CardWrapper highlight={true}>
  {/* Carte mise en avant */}
</CardWrapper>
```

**Style appliqué:**
- Fond: `rgba(14, 14, 14, 0.75)`
- Bordure gauche verte: `3px solid var(--hearst-green)`
- Border-radius: `var(--radius-lg)` (12px)
- Padding: `var(--space-6)` (24px)
- Ombres et transitions identiques à HOME

---

### 2. KpiBox
**Fichier:** `components/ui/KpiBox.tsx`

**Usage:** Boîtes KPI (métriques) avec le style exact de la page HOME

```tsx
import KpiBox from '@/components/ui/KpiBox'

<KpiBox
  label="Total Projects"
  value={42}
  description="Active projects"
  highlight={false}
  valueColor="primary" // ou "green"
/>

// Avec icône
<KpiBox
  label="Jobs Running"
  value={5}
  description="Currently running"
  icon={<IconComponent />}
  valueColor="green"
/>
```

**Props:**
- `label`: string - Label du KPI (uppercase automatique)
- `value`: string | number | ReactNode - Valeur affichée
- `description`: string (optionnel) - Description sous la valeur
- `icon`: ReactNode (optionnel) - Icône à gauche du label
- `highlight`: boolean (optionnel) - Mise en avant
- `valueColor`: 'primary' | 'green' (optionnel) - Couleur de la valeur

---

### 3. SectionTitle
**Fichier:** `components/ui/SectionTitle.tsx`

**Usage:** Titres de sections avec le style exact

```tsx
import SectionTitle from '@/components/ui/SectionTitle'

<SectionTitle level={1}>Page Title</SectionTitle>
<SectionTitle level={2}>Section Title</SectionTitle>
<SectionTitle level={3}>Subsection Title</SectionTitle>
```

**Props:**
- `level`: 1 | 2 | 3 - Niveau du titre (h1, h2, h3)
- `className`: string (optionnel) - Classes CSS additionnelles

**Tailles appliquées:**
- Level 1: `var(--text-2xl)` (24px), weight 700
- Level 2: `var(--text-lg)` (18px), weight 600
- Level 3: `var(--text-base)` (16px), weight 600

---

## 🎨 STRUCTURE DE PAGE STANDARD

### Template de Base

```tsx
'use client'

import SectionTitle from '@/components/ui/SectionTitle'
import CardWrapper from '@/components/ui/CardWrapper'
import KpiBox from '@/components/ui/KpiBox'

export default function MaPage() {
  return (
    <div className="dashboard-view">
      <div className="dashboard-content">
        {/* Header */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <SectionTitle level={1}>Titre de la Page</SectionTitle>
        </div>

        {/* Section KPI */}
        <section className="premium-stats-section" style={{ marginBottom: 'var(--space-8)' }}>
          <div className="premium-stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
            width: '100%',
          }}>
            <KpiBox label="KPI 1" value={100} />
            <KpiBox label="KPI 2" value={200} valueColor="green" />
          </div>
        </section>

        {/* Section Contenu */}
        <section style={{ marginBottom: 'var(--space-8)' }}>
          <CardWrapper>
            <SectionTitle level={2}>Titre Section</SectionTitle>
            {/* Contenu */}
          </CardWrapper>
        </section>
      </div>
    </div>
  )
}
```

---

## ✅ CHECKLIST D'APPLICATION

Pour appliquer la charte sur une nouvelle page :

### 1. Structure
- [ ] Utiliser `.dashboard-view` comme container principal
- [ ] Utiliser `.dashboard-content` pour le contenu
- [ ] Appliquer `gap: var(--space-10)` (40px) entre sections principales

### 2. Titres
- [ ] Utiliser `<SectionTitle>` au lieu de `<h1>`, `<h2>`, `<h3>` inline
- [ ] Respecter les niveaux (1 pour titre page, 2 pour sections, 3 pour sous-sections)

### 3. Cartes
- [ ] Utiliser `<CardWrapper>` pour toutes les cartes
- [ ] Appliquer le style `.premium-stat-box` via CardWrapper
- [ ] Utiliser `border-left: 3px solid var(--hearst-green)` (déjà dans CardWrapper)

### 4. KPI / Métriques
- [ ] Utiliser `<KpiBox>` pour toutes les métriques
- [ ] Utiliser la grid `.premium-stats-grid` avec `repeat(auto-fit, minmax(280px, 1fr))`
- [ ] Appliquer `gap: var(--space-6)` (24px) dans la grid

### 5. Inputs / Formulaires
- [ ] Background: `var(--bg-tertiary)`
- [ ] Border: `1px solid var(--border)`
- [ ] Border-radius: `var(--radius-md)` (8px)
- [ ] Padding: `var(--space-2) var(--space-3)`
- [ ] Focus: border `var(--hearst-green)` + shadow `0 0 0 3px rgba(165, 255, 156, 0.1)`

### 6. Boutons
- [ ] Bouton principal: background `var(--hearst-green)`, color `#000`
- [ ] Border-radius: `var(--radius-md)` (8px)
- [ ] Padding: `var(--space-3) var(--space-4)`
- [ ] Hover: background `#B0FF8F`, transform `translateY(-1px)`, shadow

### 7. Charts / Graphiques
- [ ] Utiliser le style `.wallet-chart-section`
- [ ] Background: `rgba(26, 26, 26, 0.7)`
- [ ] Backdrop-filter: `blur(20px) saturate(180%)`
- [ ] Border-radius: `var(--radius-lg)` (12px)
- [ ] Padding: `var(--space-6)` (24px)

### 8. Espacements
- [ ] Sections principales: `marginBottom: var(--space-8)` (32px)
- [ ] Gap dans grids: `var(--space-6)` (24px)
- [ ] Padding cartes: `var(--space-6)` (24px)
- [ ] Margin titres: `var(--space-4)` à `var(--space-6)`

### 9. Transitions
- [ ] Cartes: `transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- [ ] Inputs/Boutons: `transition: all var(--duration-fast) var(--ease-in-out)`

### 10. Ombres
- [ ] Cartes standard: ombres multiples avec `rgba(0, 0, 0, 0.4)` et `rgba(0, 0, 0, 0.2)`
- [ ] Hover: ombres renforcées + glow vert `rgba(165, 255, 156, 0.2)`

---

## 🔄 EXEMPLE DE TRANSFORMATION

### AVANT (Style inline)
```tsx
<div style={{
  padding: 'var(--space-4)',
  background: 'var(--bg-secondary)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border)',
}}>
  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>
    Titre
  </h2>
</div>
```

### APRÈS (Style HOME)
```tsx
<CardWrapper>
  <SectionTitle level={2}>Titre</SectionTitle>
</CardWrapper>
```

---

## 📝 NOTES IMPORTANTES

1. **Ne pas toucher aux APIs** - Seuls les styles sont modifiés
2. **Ne pas supprimer de code** - Conserver toute la logique existante
3. **Utiliser les composants wrappers** - Ils appliquent automatiquement les bons styles
4. **Respecter les gaps** - `var(--space-10)` entre sections, `var(--space-6)` dans grids
5. **Cohérence visuelle** - La page doit avoir le même "look & feel" que la HOME

---

## 🚀 PAGES À MIGRER

- [x] `/` (HOME) - ✅ Référence
- [x] `/calculator` - ✅ Migré
- [ ] `/electricity` - À migrer
- [ ] `/jobs` - À migrer
- [ ] `/cockpit` - À migrer
- [ ] `/collateral` - À migrer
- [ ] `/projects` - À migrer

---

## 📚 RESSOURCES

- **Audit Design:** `AUDIT_DESIGN_HOME.md`
- **Charte Graphique:** `CHARTE_GRAPHIQUE_EXTRACTED.md`
- **Composants UI:** `components/ui/`

---

**FIN DU GUIDE**


