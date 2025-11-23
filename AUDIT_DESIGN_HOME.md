# 🎨 AUDIT DESIGN - PAGE HOME (Dashboard)

**Date:** 2025-01-22  
**Page analysée:** `/` (Dashboard.tsx)  
**Objectif:** Extraire tous les styles réellement utilisés pour créer une charte graphique exacte

---

## 📋 1. STRUCTURE LAYOUT

### Container Principal
- **Classe:** `.dashboard-view`
- **Padding:** `var(--space-8)` horizontal, `0` top
- **Max-width:** `1600px`
- **Margin:** `0 auto` (centré)
- **Box-sizing:** `border-box`

### Contenu Dashboard
- **Classe:** `.dashboard-content`
- **Display:** `flex`, `flex-direction: column`
- **Gap:** `var(--space-10)` (40px) entre sections
- **Width:** `100%`

---

## 🎨 2. PALETTE DE COULEURS

### Couleurs Principales
```css
--hearst-green: #a5ff9c;              /* Accent principal */
--bg-primary: #0a0a0a;               /* Fond principal */
--bg-secondary: #1a1a1a;              /* Fond cartes/secondaire */
--bg-tertiary: #242424;               /* Fond inputs/tertiaire */
```

### Couleurs Texte
```css
--text-primary: #ffffff;              /* Texte principal */
--text-secondary: rgba(255, 255, 255, 0.7);  /* Texte secondaire */
--text-muted: #999999;                /* Texte désactivé */
--text-error: #ff4d4d;                /* Erreur */
```

### Couleurs Bordures
```css
--border: #2a2a2a;                    /* Bordure standard */
--border-light: #3a3a3a;              /* Bordure hover */
```

### Couleurs Spéciales
```css
/* Gradient vert pour accents */
rgba(165, 255, 156, 0.1)             /* Background accent léger */
rgba(165, 255, 156, 0.2)             /* Border accent */
rgba(165, 255, 156, 0.3)             /* Shadow accent */
rgba(165, 255, 156, 0.4)             /* Shadow accent fort */
```

---

## 📐 3. TYPOGRAPHIE

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Tailles de Texte
```css
--text-xs: 0.75rem;      /* 12px - Labels, hints */
--text-sm: 0.875rem;     /* 14px - Labels, descriptions */
--text-base: 1rem;       /* 16px - Corps de texte */
--text-lg: 1.125rem;      /* 18px - Sous-titres */
--text-xl: 1.25rem;       /* 20px - Titres sections */
--text-2xl: 1.5rem;       /* 24px - Titres pages */
```

### Poids de Police
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Height
```css
line-height: 1.2;        /* Titres */
line-height: 1.4;        /* Corps */
line-height: 1.6;        /* Paragraphes */
```

### Letter Spacing
```css
letter-spacing: -0.02em;  /* Titres */
letter-spacing: -0.01em;  /* Sous-titres */
letter-spacing: 0.5px;    /* Labels uppercase */
```

---

## 📏 4. ESPACEMENTS (SPACING SYSTEM)

### Variables d'Espacement
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
- **Gap entre sections:** `var(--space-10)` (40px)
- **Padding cartes:** `var(--space-6)` (24px)
- **Margin bottom titres:** `var(--space-4)` à `var(--space-6)`
- **Gap dans grids:** `var(--space-6)` (24px)

---

## 🔲 5. BORDER RADIUS

```css
--radius-sm: 4px;       /* Petits éléments */
--radius-md: 8px;      /* Standard (cartes, inputs) */
--radius-lg: 12px;     /* Grandes cartes */
--radius-full: 9999px;  /* Boutons ronds */
```

**Utilisation:**
- Cartes: `var(--radius-lg)` (12px)
- Inputs/Selects: `var(--radius-md)` (8px)
- Badges: `var(--radius-md)` (8px)
- Boutons ronds: `var(--radius-full)`

---

## 🌑 6. OMBRES (SHADOWS)

### Ombres Standard
```css
/* Ombre légère */
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4),
            0 1px 4px rgba(0, 0, 0, 0.2),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.06);

/* Ombre hover */
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5),
            0 4px 16px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(165, 255, 156, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

### Glow Vert (Accent)
```css
/* Glow léger */
box-shadow: 0 0 20px rgba(165, 255, 156, 0.3);

/* Glow fort */
box-shadow: 0 0 40px rgba(165, 255, 156, 0.4),
            0 0 80px rgba(165, 255, 156, 0.2);
```

---

## 🎴 7. COMPOSANTS RÉCURRENTS

### Premium Stat Box (KPI Cards)
```css
.premium-stat-box {
  background: rgba(14, 14, 14, 0.75);
  border: 0.5px solid rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--hearst-green);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4),
             0 1px 4px rgba(0, 0, 0, 0.2),
             inset 0 0.5px 0 rgba(255, 255, 255, 0.06);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.premium-stat-box-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.premium-stat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.premium-stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: var(--space-2);
  letter-spacing: -0.02em;
}

.premium-stat-value-green {
  color: var(--hearst-green);
}

.premium-stat-footer {
  padding-top: var(--space-3);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.premium-stat-description {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}
```

### Premium Wallet Box
```css
.premium-wallet-box {
  background: rgba(14, 14, 14, 0.75);
  border: 0.5px solid rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--hearst-green);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4),
             0 1px 4px rgba(0, 0, 0, 0.2),
             inset 0 0.5px 0 rgba(255, 255, 255, 0.06);
}

.premium-wallet-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.premium-wallet-balance-btc {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--hearst-green);
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-shadow: 0 0 12px rgba(165, 255, 156, 0.2);
}

.premium-wallet-balance-usd {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-secondary);
  line-height: 1.4;
}
```

### Chart Section
```css
.wallet-chart-section {
  background: rgba(26, 26, 26, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
             0 2px 8px rgba(0, 0, 0, 0.3),
             inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
  gap: var(--space-4);
}

.chart-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.4;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 240px;
  min-height: 240px;
}
```

### Transaction Table
```css
.premium-transaction-placeholder {
  background: rgba(14, 14, 14, 0.75);
  border: 0.5px solid rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--hearst-green);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4),
             0 1px 4px rgba(0, 0, 0, 0.2),
             inset 0 0.5px 0 rgba(255, 255, 255, 0.06);
}

.table thead tr {
  background: var(--gradient-accent);
  border-bottom: 2px solid var(--color-primary-light-green);
}

.table thead th {
  padding: var(--space-5) var(--space-6);
  font-size: var(--typography-caption-bold-size);
  font-weight: var(--typography-caption-bold-weight);
  color: var(--color-text-negative);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.table tbody td {
  padding: var(--space-5) var(--space-6);
  font-size: var(--typography-body-size);
  color: var(--color-text-default);
  border-bottom: 1px solid var(--color-ash-grey-1);
}
```

---

## 🎯 8. GRID LAYOUTS

### Premium Stats Grid
```css
.premium-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  width: 100%;
}
```

### Wallet Charts Grid
```css
.wallet-charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  width: 100%;
}
```

---

## ⚡ 9. TRANSITIONS & ANIMATIONS

### Transitions Standard
```css
transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: all var(--duration-fast) var(--ease-in-out);  /* 150ms */
transition: all var(--duration-normal) var(--ease-in-out); /* 250ms */
```

### Animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 8px var(--primary-green);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 16px var(--primary-green);
  }
}
```

---

## 🎨 10. EFFETS VISUELS

### Glassmorphism
```css
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
```

### Border Left Accent
```css
border-left: 3px solid var(--hearst-green);
```

### Pseudo-éléments (::before, ::after)
- **Top border gradient:** Ligne de 2px en haut avec gradient vert
- **Radial gradient overlay:** Overlay radial en haut à droite avec vert transparent

---

## 📱 11. RESPONSIVE BREAKPOINTS

```css
/* Tablet */
@media (max-width: 1024px) {
  .premium-stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-4);
  }
  
  .wallet-charts-container {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .dashboard-view {
    padding: var(--space-5) var(--space-6);
  }
  
  .premium-stat-value {
    font-size: 2rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .dashboard-view {
    padding: var(--space-4) var(--space-5);
  }
}
```

---

## ✅ 12. RÉSUMÉ DES PATTERNS RÉCURRENTS

1. **Cartes:** Fond `rgba(14, 14, 14, 0.75)`, bordure gauche verte 3px, radius `12px`, padding `24px`
2. **Titres:** Font-size `16px-24px`, weight `700`, letter-spacing `-0.01em` à `-0.02em`
3. **Labels:** Font-size `12px-14px`, weight `600`, color `var(--text-secondary)`, uppercase pour certains
4. **Valeurs:** Font-size `2.5rem` pour grandes valeurs, weight `700`, color `var(--text-primary)` ou `var(--hearst-green)`
5. **Gaps:** `var(--space-6)` (24px) entre éléments dans grids
6. **Shadows:** Multiples couches avec ombres noires + glow vert au hover
7. **Transitions:** `0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)` pour cartes

---

**FIN DE L'AUDIT**


