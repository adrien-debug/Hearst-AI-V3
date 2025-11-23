# 🎨 CHARTE GRAPHIQUE HEARST - EXTRACTED FROM HOME PAGE

**Source:** Page HOME (`/`) - Dashboard.tsx  
**Date:** 2025-01-22  
**Status:** ✅ Basée sur les styles RÉELLEMENT utilisés

---

## 🎨 1. COULEURS

### Palette Principale
```css
/* Accent Principal */
--hearst-green: #a5ff9c;

/* Backgrounds */
--bg-primary: #0a0a0a;        /* Fond principal */
--bg-secondary: #1a1a1a;     /* Cartes, panels */
--bg-tertiary: #242424;      /* Inputs, selects */

/* Textes */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: #999999;
--text-error: #ff4d4d;

/* Bordures */
--border: #2a2a2a;
--border-light: #3a3a3a;
```

### Couleurs Accent (Vert)
```css
/* Backgrounds */
rgba(165, 255, 156, 0.1)    /* Accent léger */
rgba(165, 255, 156, 0.2)    /* Border accent */
rgba(165, 255, 156, 0.3)    /* Shadow accent */
rgba(165, 255, 156, 0.4)    /* Shadow accent fort */

/* Text Shadow */
text-shadow: 0 0 12px rgba(165, 255, 156, 0.2);
filter: drop-shadow(0 0 10px rgba(165, 255, 156, 0.3));
```

---

## 📐 2. TYPOGRAPHIE

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Tailles
```css
--text-xs: 0.75rem;      /* 12px - Labels, hints */
--text-sm: 0.875rem;     /* 14px - Labels, descriptions */
--text-base: 1rem;       /* 16px - Corps */
--text-lg: 1.125rem;     /* 18px - Sous-titres */
--text-xl: 1.25rem;      /* 20px - Titres sections */
--text-2xl: 1.5rem;      /* 24px - Titres pages */
```

### Poids
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Utilisation par Type
- **Titres Pages:** `2xl`, `700`, `-0.02em`
- **Titres Sections:** `xl` ou `lg`, `700`, `-0.01em`
- **Labels:** `sm`, `600`
- **Valeurs:** `2.5rem`, `700`, `-0.02em`
- **Descriptions:** `sm` ou `xs`, `500`

---

## 📏 3. ESPACEMENTS

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

### Standards
- **Gap sections:** `var(--space-10)` (40px)
- **Padding cartes:** `var(--space-6)` (24px)
- **Gap grids:** `var(--space-6)` (24px)
- **Margin titres:** `var(--space-4)` à `var(--space-6)`

---

## 🔲 4. BORDER RADIUS

```css
--radius-sm: 4px;       /* Petits éléments */
--radius-md: 8px;       /* Standard (inputs, badges) */
--radius-lg: 12px;      /* Cartes */
--radius-full: 9999px;  /* Boutons ronds */
```

---

## 🌑 5. OMBRES

### Standard
```css
box-shadow: 
  0 4px 24px rgba(0, 0, 0, 0.4),
  0 1px 4px rgba(0, 0, 0, 0.2),
  inset 0 0.5px 0 rgba(255, 255, 255, 0.06);
```

### Hover
```css
box-shadow: 
  0 12px 48px rgba(0, 0, 0, 0.5),
  0 4px 16px rgba(0, 0, 0, 0.4),
  0 0 0 1px rgba(165, 255, 156, 0.2),
  inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

### Glow Vert
```css
box-shadow: 
  0 0 20px rgba(165, 255, 156, 0.3),
  0 0 40px rgba(165, 255, 156, 0.4),
  0 0 80px rgba(165, 255, 156, 0.2);
```

---

## 🎴 6. COMPOSANTS STANDARDS

### Carte Standard (Card)
```css
.card {
  background: rgba(14, 14, 14, 0.75);
  border: 0.5px solid rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--hearst-green);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 1px 4px rgba(0, 0, 0, 0.2),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.06);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(165, 255, 156, 0.3);
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(165, 255, 156, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### KPI Box
```css
.kpi-box {
  /* Même style que .card */
  /* Valeur: 2.5rem, 700, color: var(--text-primary) ou var(--hearst-green) */
  /* Label: 12px, 600, uppercase, color: var(--text-secondary) */
}
```

### Input/Select
```css
.input,
.select {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
  transition: all var(--duration-fast) var(--ease-in-out);
}

.input:focus,
.select:focus {
  outline: none;
  border-color: var(--hearst-green);
  box-shadow: 0 0 0 3px rgba(165, 255, 156, 0.1);
}
```

### Bouton Principal
```css
.btn-primary {
  padding: var(--space-3) var(--space-4);
  background: var(--hearst-green);
  color: #000;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-in-out);
}

.btn-primary:hover {
  background: #B0FF8F;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(165, 255, 156, 0.3);
}
```

---

## ⚡ 7. TRANSITIONS

```css
/* Standard */
transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Rapide */
transition: all var(--duration-fast) var(--ease-in-out);  /* 150ms */

/* Normal */
transition: all var(--duration-normal) var(--ease-in-out); /* 250ms */
```

---

## 📱 8. RESPONSIVE

### Breakpoints
- **Tablet:** `max-width: 1024px`
- **Mobile:** `max-width: 768px`
- **Small Mobile:** `max-width: 480px`

### Grid Adaptations
- **Desktop:** `repeat(auto-fit, minmax(280px, 1fr))`
- **Tablet:** `repeat(auto-fit, minmax(240px, 1fr))`
- **Mobile:** `1fr` (colonne unique)

---

## ✅ 9. CHECKLIST D'APPLICATION

Pour appliquer cette charte sur une nouvelle page :

- [ ] Utiliser `.dashboard-view` et `.dashboard-content` pour le container
- [ ] Appliquer `gap: var(--space-10)` entre sections
- [ ] Utiliser `.premium-stat-box` pour les KPI
- [ ] Utiliser le style `.card` pour toutes les cartes
- [ ] Appliquer `border-left: 3px solid var(--hearst-green)` sur les cartes
- [ ] Utiliser `var(--radius-lg)` pour les cartes
- [ ] Utiliser `var(--radius-md)` pour les inputs
- [ ] Appliquer les ombres standard
- [ ] Utiliser les transitions `0.35s cubic-bezier(...)`
- [ ] Respecter les tailles de texte standards
- [ ] Utiliser `var(--hearst-green)` pour les accents
- [ ] Appliquer les gaps `var(--space-6)` dans les grids

---

**FIN DE LA CHARTE**


