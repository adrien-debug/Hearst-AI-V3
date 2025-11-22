# 🎨 CHARTE GRAPHIQUE PROJECTIONS - EXTRACTED

**Source:** Page PROJECTIONS (`/projects`) - ProjectsOverview.tsx  
**Date:** 2025-01-22  
**Status:** ✅ Basée sur les styles RÉELLEMENT utilisés (référence visuelle)

---

## 🎨 1. COULEURS (PROJECTIONS)

### Palette Principale
```css
/* Accent Principal HEARST */
--hearst-green: #C5FFA7;          /* Vert HEARST (PAS #a5ff9c) */
--hearst-primary: #C5FFA7;
--hearst-primary-dark: #6fdc66;
--hearst-primary-light: #A7FB90;

/* Backgrounds */
--bg-primary: #0A0A0A;            /* Fond principal */
--bg-secondary: #1A1A1A;          /* Cartes, panels */
--bg-tertiary: #141414;           /* Inputs, table headers */

/* Textes */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: rgba(255, 255, 255, 0.5);

/* Bordures */
--border-color: rgba(197, 255, 167, 0.08);   /* Standard */
rgba(197, 255, 167, 0.15)                    /* Hover */
rgba(197, 255, 167, 0.2)                     /* Accent */
```

---

## 📐 2. TYPOGRAPHIE

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
```

### Tailles
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
```

### Utilisation par Type
- **Titres Pages:** `2xl`, `700`
- **Titres Sections:** `xl` ou `base`, `600-700`
- **Labels KPI:** `11px`, `700`, uppercase, `var(--text-muted)`
- **Valeurs KPI:** `24px`, `700`, `#C5FFA7`
- **Descriptions:** `12px`, `500`, `var(--text-secondary)`

---

## 📏 3. ESPACEMENTS

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
```

### Standards
- **Gap cartes KPI:** `var(--space-4)` (16px) ou `12px`
- **Padding cartes:** `24px`
- **Margin bottom sections:** `var(--space-6)` (24px)

---

## 🔲 4. BORDER RADIUS

```css
--radius-xl: 16px;      /* Cartes standard */
```

---

## 🌑 5. OMBRES

### Standard
```css
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
```

### Hover
```css
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
```

---

## 🎴 6. COMPOSANTS STANDARDS (PROJECTIONS)

### Carte KPI (Metric Card)
```css
.metric-card {
  background: #1A1A1A;
  border: 1px solid rgba(197, 255, 167, 0.08);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
  border-color: rgba(197, 255, 167, 0.15);
}

.metric-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #C5FFA7;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin-bottom: 6px;
}

.metric-description {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.4;
}
```

### Table Container
```css
.table-container {
  background: #1A1A1A;
  border: 1px solid rgba(197, 255, 167, 0.08);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
}

.table thead {
  background: #141414;
}

.table th {
  padding: 18px 24px;
  font-size: 12px;
  font-weight: 700;
  color: #C5FFA7;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

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

---

## ✅ 7. CHECKLIST D'APPLICATION

Pour appliquer cette charte sur la page calculator :

- [ ] Utiliser couleur `#C5FFA7` (pas `#a5ff9c`)
- [ ] Background cartes: `#1A1A1A`
- [ ] Border: `1px solid rgba(197, 255, 167, 0.08)`
- [ ] Border-radius: `16px`
- [ ] Padding: `24px`
- [ ] Valeurs KPI: `24px`, `700`, `#C5FFA7`
- [ ] Labels KPI: `11px`, `700`, uppercase
- [ ] Box-shadow: `0 4px 8px rgba(0, 0, 0, 0.7)`
- [ ] Hover: `translateY(-2px)`, shadow `0 8px 16px rgba(0, 0, 0, 0.8)`

---

**FIN DE LA CHARTE**

