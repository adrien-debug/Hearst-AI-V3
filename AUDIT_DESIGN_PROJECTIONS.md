# 🎨 AUDIT DESIGN - PAGE PROJECTIONS (Référence Visuelle)

**Date:** 2025-01-22  
**Page analysée:** `/projects` (ProjectsOverview.tsx)  
**Référence:** Image de la page Projections avec onglets Overview/Calculator/Results/etc.

---

## 📋 1. STRUCTURE LAYOUT

### Container Principal
- **Classe:** `.dashboard-view`
- **Padding:** `var(--space-8) var(--space-10)` horizontal, `0` top
- **Max-width:** `1600px`
- **Margin:** `0 auto` (centré)

### Contenu Dashboard
- **Classe:** `.dashboard-content`
- **Display:** `flex`, `flex-direction: column`
- **Gap:** `var(--space-10)` (40px) entre sections

---

## 🎨 2. PALETTE DE COULEURS (PROJECTIONS)

### Couleur Principale HEARST
```css
--hearst-primary: #C5FFA7;        /* Vert HEARST principal (PAS #a5ff9c) */
--hearst-primary-dark: #6fdc66;
--hearst-primary-light: #A7FB90;
```

### Couleurs Backgrounds
```css
--bg-primary: #0A0A0A;            /* Fond principal très sombre */
--bg-secondary: #1A1A1A;          /* Fond cartes/secondaire */
--bg-tertiary: #141414;           /* Fond inputs/tertiaire */
```

### Couleurs Texte
```css
--text-primary: #ffffff;          /* Texte principal */
--text-secondary: rgba(255, 255, 255, 0.7);  /* Texte secondaire */
--text-muted: rgba(255, 255, 255, 0.5);     /* Texte désactivé */
```

### Couleurs Bordures
```css
--border-color: rgba(197, 255, 167, 0.08);   /* Bordure standard avec vert */
rgba(197, 255, 167, 0.15)                   /* Bordure hover */
rgba(197, 255, 167, 0.2)                    /* Bordure accent */
```

---

## 📐 3. TYPOGRAPHIE

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
```

### Tailles de Texte
```css
--text-xs: 0.75rem;      /* 12px - Descriptions, hints */
--text-sm: 0.875rem;     /* 14px - Labels, descriptions */
--text-base: 1rem;       /* 16px - Corps de texte */
--text-lg: 1.125rem;     /* 18px - Sous-titres */
--text-xl: 1.25rem;      /* 20px - Titres sections */
--text-2xl: 1.5rem;      /* 24px - Titres pages */
```

### Poids de Police
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 🎴 4. COMPOSANTS KPI CARDS (PROJECTIONS)

### Style des Cartes KPI
```css
.metric-card {
  background: #1A1A1A;
  border: 1px solid rgba(197, 255, 167, 0.08);
  border-radius: var(--radius-xl);  /* 16px */
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
  border-color: rgba(197, 255, 167, 0.15);
}
```

### Label KPI
```css
.metric-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}
```

### Valeur KPI
```css
.metric-value {
  font-size: 24px;        /* PAS 2rem, mais 24px exact */
  font-weight: 700;
  color: #C5FFA7;         /* Vert HEARST */
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin-bottom: 6px;
}
```

### Description KPI
```css
.metric-description {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.4;
}
```

---

## 📏 5. ESPACEMENTS

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
```

### Utilisation Standard
- **Gap entre cartes KPI:** `var(--space-4)` (16px) ou `12px`
- **Padding cartes:** `24px`
- **Margin bottom sections:** `var(--space-6)` (24px)

---

## 🔲 6. BORDER RADIUS

```css
--radius-sm: 8px;       /* Petits éléments */
--radius-md: 16px;      /* Standard (cartes) */
--radius-lg: 16px;      /* Grandes cartes */
--radius-xl: 16px;      /* Cartes premium */
```

**Utilisation:**
- Cartes KPI: `var(--radius-xl)` (16px)
- Cartes table: `var(--radius-xl)` (16px)

---

## 🌑 7. OMBRES

### Standard
```css
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
```

### Hover
```css
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
```

---

## 📊 8. TABLE STYLES (PROJECTIONS)

### Table Container
```css
.table-container {
  background: #1A1A1A;
  border: 1px solid rgba(197, 255, 167, 0.08);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
}
```

### Table Headers
```css
.table thead {
  background: #141414;
}

.table th {
  padding: 18px 24px;
  font-size: 12px;
  font-weight: 700;
  color: #C5FFA7;              /* Vert HEARST */
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
```

### Table Rows
```css
.table td {
  padding: 18px 24px;
  border-top: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--text-secondary);
}

.table tbody tr:hover {
  background: rgba(197, 255, 167, 0.03);
}
```

### Status ACTIVE
```css
color: #C5FFA7;  /* Vert HEARST */
font-weight: 700;
```

---

## 🎯 9. NAVIGATION TABS

### Style des Onglets
```css
/* Onglet inactif */
border-bottom: 2px solid transparent;
color: var(--text-secondary);
font-weight: 400;

/* Onglet actif */
border-bottom: 2px solid var(--hearst-green);  /* #C5FFA7 */
color: var(--hearst-green);                    /* #C5FFA7 */
font-weight: 600;
```

### Padding Onglets
```css
padding: var(--space-3) var(--space-4);  /* 12px 16px */
```

---

## 📐 10. GRID LAYOUTS

### KPI Cards Grid
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: var(--space-4);  /* 16px */
```

---

## ✅ 11. RÉSUMÉ DES DIFFÉRENCES AVEC HOME

| Élément | HOME | PROJECTIONS |
|---------|------|-------------|
| **Couleur accent** | `#a5ff9c` | `#C5FFA7` |
| **Background cartes** | `rgba(14, 14, 14, 0.75)` | `#1A1A1A` |
| **Border cartes** | `0.5px solid rgba(255, 255, 255, 0.04)` + bordure gauche verte 3px | `1px solid rgba(197, 255, 167, 0.08)` |
| **Border-radius** | `var(--radius-lg)` (12px) | `var(--radius-xl)` (16px) |
| **Padding cartes** | `var(--space-6)` (24px) | `24px` |
| **Valeur KPI** | `2.5rem` (40px), `700` | `24px`, `700` |
| **Label KPI** | `12px`, `600`, uppercase | `11px`, `700`, uppercase |
| **Box-shadow** | Multiples couches complexes | `0 4px 8px rgba(0, 0, 0, 0.7)` |

---

**FIN DE L'AUDIT**

