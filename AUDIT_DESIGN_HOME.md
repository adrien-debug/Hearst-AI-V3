# 🔍 AUDIT DESIGN - PAGE HOME (Dashboard)

**Date:** 22 Novembre 2025  
**Page analysée:** `/` (http://localhost:3000/)  
**Composant principal:** `components/Dashboard.tsx`

---

## 📊 1. STRUCTURE LAYOUT

### Container Principal
- **Classe:** `.dashboard-view` → `.dashboard-content`
- **Padding:** `var(--space-8) var(--space-10)` (32px vertical, 40px horizontal)
- **Max-width:** `1600px`
- **Background:** Gradient noir (`linear-gradient(180deg, #000000 0%, #0a0a0a 100%)`)
- **Gap entre sections:** `var(--space-6)` (24px)

### Sections Identifiées
1. **Hearst Corporation Section** (KPI Cards)
2. **BTC Mined Section** (Charts)
3. **Transaction History Section** (Table)

---

## 🎨 2. PALETTE DE COULEURS

### Couleurs Principales
```css
--color-primary-light-green: #A7FB90  /* Vert principal - Valeurs KPI */
--hearst-green: #C5FFA7                /* Vert HEARST (alias) */
--hearst-green-dark: #6fdc66          /* Hover, états actifs */
--hearst-green-light: #A7FB90         /* États hover légers */
```

### Couleurs de Fond
```css
--bg-primary: #000000                  /* Noir pur */
--bg-secondary: #1A1A1A                /* Gris foncé */
--bg-tertiary: #242424                 /* Gris moyen */
```

### Couleurs de Texte
```css
--text-primary: #FFFFFF                /* Blanc */
--text-secondary: rgba(255, 255, 255, 0.7)  /* Blanc 70% */
--text-muted: #999999                  /* Gris clair */
```

### Couleurs Système
```css
--color-success: #27AE60               /* Vert succès */
--color-warning: #FFB800               /* Orange warning */
--color-error: #E74C3C                 /* Rouge erreur */
```

---

## 📝 3. TYPOGRAPHIE

### Font Family
```css
--font-family-primary: 'FK Grotesk Trial', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
--font-family-mono: 'Fira Code', 'Consolas', 'Monaco', monospace
```

### Tailles de Police
```css
--typography-display-size: 52px        /* Titres très grands */
--typography-page-title-size: 32px     /* Titres de page */
--typography-section-title-size: 25px  /* Titres de section */
--typography-subsection-title-size: 18px /* Sous-titres */
--typography-body-size: 16px           /* Texte standard */
--typography-body-minor-size: 14px     /* Texte secondaire */
--typography-caption-size: 12px        /* Légendes */
```

### Poids de Police
```css
--typography-display-weight: 700       /* Bold */
--typography-page-title-weight: 600    /* Semi-bold */
--typography-section-title-weight: 600  /* Semi-bold */
--typography-body-bold-weight: 500     /* Medium */
--typography-body-weight: 400          /* Regular */
```

### Line Heights
```css
--typography-display-line-height: 64px
--typography-page-title-line-height: 40px
--typography-section-title-line-height: 32px
--typography-body-line-height: 24px
```

### Letter Spacing
```css
Titres: -0.02em à -0.03em
Body: 0px
Labels: 0.5px (uppercase)
```

---

## 📦 4. COMPOSANTS RÉUTILISABLES IDENTIFIÉS

### 4.1. Card Component (shadcn/ui)
**Fichier:** `components/ui/card.tsx`

**Styles appliqués:**
```css
borderRadius: var(--radius-md)        /* 16px */
border: 1px solid var(--border)
background: var(--bg-secondary)        /* #1A1A1A */
color: var(--text-primary)
boxShadow: var(--shadow-sm)
```

**Structure:**
- `Card` → Container principal
- `CardHeader` → Padding: `var(--space-6)` (24px), gap: `var(--space-2)` (4px)
- `CardTitle` → Font-size: `var(--text-xl)` (20px), Font-weight: 600, Letter-spacing: -0.02em
- `CardContent` → Padding: `var(--space-6)`, paddingTop: 0
- `CardDescription` → Font-size: `var(--text-sm)`, Color: `var(--text-secondary)`

### 4.2. KPI Box Pattern
**Pattern identifié dans Dashboard.tsx:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Active Customers</CardTitle>
  </CardHeader>
  <CardContent>
    <div style={{ 
      fontSize: '2rem',              /* 32px */
      fontWeight: 700,               /* Bold */
      color: '#A7FB90',             /* Vert principal */
      marginBottom: 'var(--space-2)',
      fontFamily: 'var(--font-mono), monospace',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    }}>
      1,247
    </div>
    <p style={{ 
      color: 'var(--text-secondary)', 
      fontSize: 'var(--text-sm)' 
    }}>
      Clients actifs
    </p>
  </CardContent>
</Card>
```

**Caractéristiques:**
- Valeur principale: `2rem` (32px), `font-weight: 700`, couleur `#A7FB90`
- Description: `var(--text-sm)` (14px), couleur `var(--text-secondary)`
- Font mono pour les nombres: `var(--font-mono)`
- Tabular nums pour alignement

### 4.3. Table Pattern
**Pattern identifié dans Transaction History:**

```css
.table-container {
  background: rgba(26, 26, 26, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);  /* 12px */
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.table thead {
  background: linear-gradient(180deg, #454646 0%, #3a3a3a 100%);
  border-bottom: 2px solid rgba(197, 255, 167, 0.3);
}

.table th {
  padding: var(--space-3) var(--space-4);  /* 8px 12px */
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table tbody tr:hover {
  background: linear-gradient(
    90deg,
    rgba(197, 255, 167, 0.05) 0%,
    rgba(197, 255, 167, 0.1) 50%,
    rgba(197, 255, 167, 0.05) 100%
  );
  box-shadow: inset 2px 0 0 #C5FFA7;
  transform: translateX(2px);
}
```

---

## 🎯 5. ESPACEMENTS (SPACING SYSTEM)

### Système 8px Rule
```css
--space-1: 2px
--space-2: 4px
--space-3: 8px
--space-4: 12px
--space-5: 16px
--space-6: 24px
--space-7: 32px
--space-8: 48px
--space-9: 64px
--space-10: 80px
```

### Utilisation dans Dashboard
- **Gap entre KPI cards:** `var(--space-4)` (12px)
- **Gap entre sections:** `var(--space-6)` (24px)
- **Padding Card:** `var(--space-6)` (24px)
- **Padding Container:** `var(--space-8) var(--space-10)` (32px vertical, 40px horizontal)

---

## 🔲 6. BORDURES & OMBRES

### Border Radius
```css
--radius-sm: 8px                      /* Petits éléments */
--radius-md: 16px                     /* Cards, boutons */
--radius-lg: 12px                     /* Containers moyens */
--radius-xl: 16px                     /* Cards grandes */
--radius-full: 1000px                 /* Pills, badges */
```

### Ombres
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
--shadow-glow-green: 0 0 20px rgba(167, 251, 144, 0.3), 0 0 40px rgba(167, 251, 144, 0.1)
```

### Ombres Card (Pattern)
```css
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.4),
  0 2px 8px rgba(0, 0, 0, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

---

## 🎬 7. TRANSITIONS & ANIMATIONS

### Durées
```css
--duration-fast: 150ms
--duration-normal: 250ms
--duration-slow: 350ms
```

### Easings
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Animations Card Hover
```css
transition: all var(--duration-normal) var(--ease-in-out);
transform: translateY(-4px);  /* Au hover */
```

---

## 📐 8. GRID & LAYOUT

### Grid KPI Cards
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: var(--space-4);  /* 12px */
```

### Grid Charts
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
gap: var(--space-6);  /* 24px */
```

---

## 🎨 9. BOUTONS

### Bouton Primary (dans Cards)
```css
padding: var(--space-2) var(--space-3);  /* 4px 8px */
borderRadius: var(--radius-sm);          /* 8px */
border: 1px solid;
borderColor: selected ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)';
backgroundColor: selected ? '#A7FB90' : 'transparent';
color: selected ? '#000000' : 'var(--text-secondary)';
fontSize: var(--text-sm);
fontWeight: selected ? 600 : 400;
transition: all 0.2s ease;
```

---

## 📋 10. RÉSUMÉ DES PATTERNS RÉCURRENTS

### Pattern KPI Card
1. Container: `Card` component
2. Header: `CardTitle` avec titre
3. Content: 
   - Valeur principale: `2rem`, `700`, `#A7FB90`, `monospace`, `tabular-nums`
   - Description: `var(--text-sm)`, `var(--text-secondary)`

### Pattern Section
1. Titre: `var(--text-xl)`, `font-weight: 600`, `margin-bottom: var(--space-4)`
2. Container: Grid avec `gap: var(--space-4)` ou `var(--space-6)`
3. Cards: Padding `var(--space-6)`, border-radius `var(--radius-md)`

### Pattern Table
1. Container: Background `rgba(26, 26, 26, 0.7)`, border `rgba(255, 255, 255, 0.05)`
2. Header: Gradient background, border-bottom vert
3. Rows: Hover avec gradient vert et translateX

---

## ✅ CHECKLIST DES ÉLÉMENTS À REPRODUIRE

- [x] Container principal avec padding et max-width
- [x] Cards avec ombres et bordures subtiles
- [x] KPI boxes avec valeurs en vert `#A7FB90`
- [x] Typographie FK Grotesk Trial
- [x] Espacements système 8px
- [x] Border-radius standards
- [x] Ombres premium
- [x] Transitions fluides
- [x] Grid responsive
- [x] Tables avec hover effects

---

**FIN DE L'AUDIT**

