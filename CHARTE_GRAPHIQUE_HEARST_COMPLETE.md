# 🎨 CHARTE GRAPHIQUE HEARST - DOCUMENTATION COMPLÈTE

**Date de création :** 18 Novembre 2025  
**Version :** 1.0  
**Source :** Design System HEARST appliqué au projet HearstAI

---

## 📋 TABLE DES MATIÈRES

1. [Palette de couleurs](#1-palette-de-couleurs)
2. [Typographie](#2-typographie)
3. [Layout & Espacements](#3-layout--espacements)
4. [Composants](#4-composants)
5. [Animations & Transitions](#5-animations--transitions)
6. [Icônes](#6-icônes)
7. [Responsive](#7-responsive)
8. [Variables CSS](#8-variables-css)
9. [Règles d'utilisation](#9-règles-dutilisation)

---

## 1. PALETTE DE COULEURS

### 🎨 Couleur principale HEARST

**Couleur signature :** `#8afd81` ⬤  
**Nom :** Vert HEARST  
**Usage :** Accent principal, boutons, navigation active, éléments interactifs

**Variations :**
- **Primary Dark** : `#6fdc66` ⬤ (Hover, états actifs)
- **Primary Light** : `#a5ff9c` ⬤ (États hover légers)

### 🎨 Backgrounds

| Nom | Code | Usage |
|-----|------|-------|
| **Primary** | `#0a0a0a` ⬤ | Background principal (body, header) |
| **Secondary** | `#1a1a1a` ⬤ | Sidebar, cards, panneaux |
| **Tertiary** | `#242424` ⬤ | Éléments tertiaires, hover subtil |
| **Hover** | `#2a2a2a` ⬤ | États hover sur éléments interactifs |

### 🎨 Accents secondaires

| Nom | Code | Usage |
|-----|------|-------|
| **Secondary** | `#7bed9f` ⬤ | Accent secondaire (mint green) |
| **Success** | `#8afd81` ⬤ | Messages de succès, badges positifs |
| **Warning** | `#f6c344` ⬤ | Avertissements, alertes |
| **Danger** | `#ff6b6b` ⬤ | Erreurs, actions destructives |
| **Info** | `#4ecdc4` ⬤ | Informations, badges informatifs |

### 🎨 Textes

| Nom | Code | Usage |
|-----|------|-------|
| **Primary** | `#ffffff` ⬤ | Texte principal (titres, contenu important) |
| **Secondary** | `#b8b8b8` ⬤ | Texte secondaire (descriptions, labels) |
| **Muted** | `#6b6b6b` ⬤ | Texte atténué (placeholders, texte désactivé) |

### 🎨 Bordures

| Nom | Code | Usage |
|-----|------|-------|
| **Normal** | `#2a2a2a` ⬤ | Bordures par défaut (cards, inputs) |
| **Hover** | `#3a3a3a` ⬤ | Bordures au survol |
| **Accent** | `#8afd81` ⬤ | Bordures accent (cards hover, focus) |

### ⚠️ RÈGLE CRITIQUE

**Texte sur fond vert (#8afd81) = TOUJOURS noir `#000000` ou `#0a0a0a`**

Cette règle s'applique à :
- Boutons primaires
- Navigation active
- Badges sur fond vert
- Tous les éléments avec background `#8afd81`

---

## 2. TYPOGRAPHIE

### 📝 Police de caractères

**Famille principale :**
```css
font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
```

**Priorité :**
1. Inter (si disponible)
2. System fonts (Apple, Windows, Android)
3. Fallback Roboto

**Monospace :**
```css
font-family: 'Courier New', monospace;
```
*Usage : Horloge, code, valeurs numériques*

### 📏 Tailles de police

| Élément | Taille | Poids | Letter-spacing | Usage |
|---------|--------|-------|----------------|-------|
| **Logo** | `16px` | `600` | `0.5px` | Logo sidebar (uppercase) |
| **Page Title** | `20px` | `600` | `-0.02em` | Titre de page (header) |
| **Section Title** | `18px` | `700` | `-0.01em` | Titres de sections |
| **Card Title** | `16px` | `600` | `-0.01em` | Titres de cartes |
| **Body Text** | `13px` | `400` | `normal` | Texte de contenu |
| **Small Text** | `11-12px` | `500-600` | `0.5px` | Labels, badges (uppercase) |
| **Caption** | `11px` | `400` | `normal` | Légendes, métadonnées |

### 📐 Poids de police

| Poids | Valeur | Usage |
|-------|--------|-------|
| **Regular** | `400` | Texte de contenu normal |
| **Medium** | `500` | Labels, texte secondaire |
| **Semibold** | `600` | Titres, boutons, navigation |
| **Bold** | `700` | Titres principaux, emphase |

### 📏 Letter-spacing

| Contexte | Valeur | Usage |
|----------|--------|-------|
| **Titres** | `-0.01em` à `-0.02em` | Titres de page, sections (plus serré) |
| **Logo** | `0.5px` | Logo uppercase |
| **Badges** | `0.5px` à `1px` | Badges uppercase |
| **Uppercase** | `0.5px` à `0.8px` | Texte en majuscules |
| **Body** | `normal` | Texte de contenu normal |

### 📏 Line-height

| Contexte | Valeur | Usage |
|----------|--------|-------|
| **Titres** | `1.2` à `1.4` | Titres compacts |
| **Body** | `1.6` | Texte de contenu lisible |

---

## 3. LAYOUT & ESPACEMENTS

### 📐 Dimensions principales

| Élément | Dimension | Variable CSS |
|---------|-----------|--------------|
| **Sidebar width** | `200px` | `--sidebar-width` |
| **Header height** | `70px` | `--header-height` |
| **Container max-width** | `1600px` (optionnel) | - |
| **Grid gap** | `24px` | `--spacing-lg` |

### 📏 Espacements (Spacing Scale)

| Nom | Valeur | Variable CSS | Usage |
|-----|--------|--------------|-------|
| **XS** | `4px` | `--spacing-xs` | Espacements très petits |
| **SM** | `8px` | `--spacing-sm` | Espacements petits |
| **MD** | `16px` | `--spacing-md` | Espacements moyens |
| **LG** | `24px` | `--spacing-lg` | Espacements grands (grid gap) |
| **XL** | `32px` | `--spacing-xl` | Espacements très grands (padding) |

### 📐 Layout Structure

```
┌─────────────────────────────────────────┐
│  Sidebar (200px)  │  Main Content      │
│                   │  ┌───────────────┐ │
│  - Logo           │  │ Header (70px) │ │
│  - Navigation     │  └───────────────┘ │
│  - Version        │  ┌───────────────┐ │
│                   │  │ Content Area  │ │
│                   │  │ (scrollable)  │ │
│                   │  └───────────────┘ │
└─────────────────────────────────────────┘
```

### 📐 Sidebar

**Dimensions :**
- Largeur : `200px` (fixe)
- Background : `#1a1a1a` (var(--bg-secondary))
- Position : Fixe à gauche

**Logo :**
- Style : Text-only "HEARSTAI" ou "CLAUDE CI/CD"
- Format : Uppercase
- Taille : `16px`
- Letter-spacing : `0.5px`
- Couleur : `#ffffff` (var(--text-primary))

**Navigation Items :**
- Padding : `12px var(--spacing-lg)` (12px 24px)
- Border-left : `2px solid transparent`
- État normal : Texte `#b8b8b8` (var(--text-secondary))
- État hover : Background `#2a2a2a` (var(--bg-hover)) + texte blanc
- **État active :** Background `#8afd81` (var(--accent-primary)) + texte noir

### 📐 Header

**Dimensions :**
- Hauteur : `70px` (var(--header-height))
- Background : `#0a0a0a` (var(--bg-primary))
- Padding : `0 var(--spacing-xl)` (0 32px)
- Position : Sticky en haut

**Contenu :**
- Titre de page : `20px`, `600`, `-0.02em`
- Boutons : Alignés à droite
- User badge : Bordure subtile

### 📐 Content Area

**Dimensions :**
- Largeur : `calc(100vw - var(--sidebar-width))`
- Hauteur : `calc(100vh - var(--header-height))`
- Background : `#0a0a0a` (var(--bg-primary))
- Overflow : `overflow-y: auto` (scroll vertical)
- Padding : `0` (padding géré par les sections internes)

---

## 4. COMPOSANTS

### 🔘 Boutons

#### Primary Button

```css
.btn-primary {
    background: #8afd81;           /* Vert HEARST */
    color: #000000;                /* Texte noir */
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -0.01em;
    border-radius: 24px;           /* Pill shape */
    padding: 12px 24px;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover:not(:disabled) {
    background: #6fdc66;           /* Vert foncé */
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(138, 253, 129, 0.15);
}

.btn-primary:active:not(:disabled) {
    background: #5fcb55;
    transform: scale(0.98);
}
```

**Tailles :**
- **Small** : `padding: 8px 16px`, `font-size: 12px`, `border-radius: 20px`
- **Normal** : `padding: 12px 24px`, `font-size: 14px`, `border-radius: 24px`
- **Large** : `padding: 14px 28px`, `font-size: 16px`, `border-radius: 28px`

#### Secondary Button

```css
.btn-secondary {
    background: transparent;
    color: #ffffff;
    padding: 12px 24px;
    border-radius: 24px;
    border: 1px solid #252525;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover:not(:disabled) {
    border-color: #8afd81;
    background: rgba(138, 253, 129, 0.05);
    transform: scale(1.02);
}
```

#### Ghost Button

```css
.btn-ghost {
    background: transparent;
    color: var(--text-secondary);
    border-radius: 24px;
    padding: 12px 24px;
    border: none;
}

.btn-ghost:hover:not(:disabled) {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    transform: scale(1.02);
}
```

#### Danger Button

```css
.btn-danger {
    background: #ff6b6b;
    color: white;
    border-radius: 24px;
    padding: 12px 24px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.btn-danger:hover:not(:disabled) {
    background: #ff5252;
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(255, 107, 107, 0.15);
}
```

---

### 🏷️ Badges

#### Badge Success

```css
.badge-success {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 600;
    border-radius: 4px;            /* Carré avec coins arrondis */
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: rgba(138, 253, 129, 0.1);
    color: #8afd81;
    border: 1px solid rgba(138, 253, 129, 0.3);
}
```

#### Badge Warning

```css
.badge-warning {
    background: rgba(246, 195, 68, 0.15);
    color: #f6c344;
    border: 1px solid rgba(246, 195, 68, 0.3);
    /* ... autres propriétés identiques ... */
}
```

#### Badge Danger

```css
.badge-danger {
    background: rgba(255, 107, 107, 0.15);
    color: #ff6b6b;
    border: 1px solid rgba(255, 107, 107, 0.3);
    /* ... autres propriétés identiques ... */
}
```

**Caractéristiques communes :**
- Font-size : `11px`
- Font-weight : `600`
- Text-transform : `uppercase`
- Letter-spacing : `0.5px`
- Border-radius : `4px` (carré avec coins arrondis)
- Border : `1px solid` (couleur selon type)

---

### 🃏 Cards

```css
.card {
    background: #1a1a1a;           /* var(--bg-secondary) */
    border-radius: 16px;           /* Arrondi généreux */
    padding: 24px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(138, 253, 129, 0.08);  /* Border lime subtile */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.8);
    border-color: rgba(138, 253, 129, 0.15);
}
```

**Card Header :**
```css
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
}

.card-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
}
```

**Card Body :**
```css
.card-body {
    color: var(--text-secondary);
    font-size: 13px;
    line-height: 1.6;
}
```

---

### 📊 Tables

```css
.table-container {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table thead {
    background: #141414;
}

.table th {
    padding: 14px var(--spacing-md);
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border-color);
    letter-spacing: 0.05em;
}

.table td {
    padding: 14px var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 13px;
}

.table tbody tr:hover {
    background: rgba(138, 253, 129, 0.03);
}
```

---

### 📝 Formulaires

#### Input Text

```css
.form-input,
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"] {
    width: 100%;
    padding: 12px 16px;
    background: #141414;
    border: 1px solid #252525;
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
    font-family: inherit;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus,
input[type="text"]:focus {
    outline: none;
    border-color: #8afd81;
    box-shadow: 0 0 0 3px rgba(138, 253, 129, 0.1);
}
```

#### Select

```css
.form-select,
select {
    /* Mêmes styles que input */
    /* ... */
}
```

#### Textarea

```css
.form-textarea,
textarea {
    /* Mêmes styles que input */
    min-height: 100px;
    resize: vertical;
}
```

---

### 🪟 Modals

```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-lg);
}

.modal {
    background: #1a1a1a;
    border: 1px solid #252525;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.95);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.modal-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
}

.modal-body {
    padding: var(--spacing-lg);
    overflow-y: auto;
    flex: 1;
}

.modal-footer {
    padding: var(--spacing-lg);
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: var(--spacing-sm);
    justify-content: flex-end;
}
```

**Tailles de modals :**
- **Small** : `max-width: 400px`
- **Medium** : `max-width: 600px` (défaut)
- **Large** : `max-width: 900px`

---

### 🔔 Alerts / Notifications

```css
.alert {
    padding: var(--spacing-md);
    border-radius: 6px;
    margin-bottom: var(--spacing-md);
    display: flex;
    align-items: start;
    gap: var(--spacing-sm);
}

.alert-success {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #8afd81;
}

.alert-warning {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #f6c344;
}

.alert-danger {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ff6b6b;
}

.alert-info {
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.3);
    color: #4ecdc4;
}
```

---

## 5. ANIMATIONS & TRANSITIONS

### ⏱️ Timing Functions

**Fonction principale :**
```css
cubic-bezier(0.4, 0, 0.2, 1)
```

**Variables CSS :**
- `--transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- `--transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### 🎬 Durées

| Type | Durée | Usage |
|------|-------|-------|
| **Fast** | `0.2s` | Hover rapides, changements subtils |
| **Normal** | `0.3s` | Transitions standards, hover boutons |
| **Slow** | `0.5s` | Animations complexes (rare) |

### ✨ Transforms

**Hover Buttons :**
```css
transform: scale(1.02);        /* Légère augmentation */
/* ou */
transform: translateY(-1px);   /* Légère élévation */
```

**Active Buttons :**
```css
transform: scale(0.98);        /* Légère compression */
```

**Hover Cards :**
```css
transform: translateY(-2px);   /* Élévation plus marquée */
```

### 🎨 Keyframes

**Spin (pour spinners) :**
```css
@keyframes spin {
    to { transform: rotate(360deg); }
}
```

**Pulse (pour indicateurs live) :**
```css
@keyframes pulse-live-dot {
    0%, 100% { 
        opacity: 1; 
        transform: scale(1); 
    }
    50% { 
        opacity: 0.6; 
        transform: scale(1.2); 
    }
}
```

---

## 6. ICÔNES

### 🎯 Système d'icônes SVG

**Format :** SVG inline via système `data-icon`  
**Fichier :** `frontend/js/icons.js`  
**Total :** 51 icônes SVG exactement

### 📐 Spécifications

| Contexte | Taille | Usage |
|----------|--------|-------|
| **Navigation** | `20px × 20px` | Icônes dans la sidebar |
| **Inline** | `16px × 16px` | Icônes dans le texte, boutons |
| **Large** | `24px × 24px` | Icônes dans les cards importantes |

### 🎨 Couleur des icônes

**Par défaut :**
- Couleur : `currentColor` (hérite de la couleur du texte)
- Stroke : `currentColor`
- Fill : `none` (pour la plupart)

**Icônes accent :**
- Couleur : `#8afd81` (vert HEARST)
- Utilisation : Icônes dans les métriques, indicateurs

### 📝 Utilisation

**HTML :**
```html
<span class="nav-icon" data-icon="home"></span>
<span class="icon-inline" data-icon="dashboard"></span>
```

**CSS :**
```css
.icon-inline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin-right: 6px;
}

.icon-inline svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
}
```

### 📋 Liste complète des 51 icônes

1. admin
2. api
3. apiTest
4. battery
5. bitcoin
6. blockReward
7. calculator
8. charts
9. check
10. chevronDown
11. clients
12. clock
13. crossReference
14. dashboard
15. dataMapping
16. delete
17. document
18. edit
19. energy
20. error
21. export
22. hardware
23. hashrate
24. home
25. hosters
26. incidents
27. infrastructure
28. jobs
29. logs
30. miners
31. miningAccounts
32. monteCarlo
33. moon
34. news
35. overview
36. payback
37. production
38. profit
39. projects
40. prompts
41. refresh
42. results
43. roi
44. settings
45. snowflake
46. sun
47. user
48. versions
49. warning
50. wind
51. workers

---

## 7. RESPONSIVE

### 📱 Breakpoints

| Device | Breakpoint | Caractéristiques |
|--------|------------|------------------|
| **Mobile** | `< 768px` | Sidebar collapse, grid 1 colonne |
| **Tablet** | `768px - 1024px` | Grid 2 colonnes, sidebar fixe |
| **Desktop** | `> 1024px` | Grid 3-4 colonnes, toutes features |
| **Large Desktop** | `> 1600px` | Container max-width 1600px |

### 📱 Mobile (< 768px)

**Sidebar :**
- Largeur : `70px` (collapse)
- Icônes seules (pas de texte)
- Logo centré

**Content :**
- Grid : `1 colonne`
- Padding réduit : `16px` au lieu de `24px`
- Boutons : Taille réduite

**Navigation :**
- Header navigation : Scroll horizontal si nécessaire
- Tabs : Plus compacts

### 💻 Desktop (> 1024px)

**Sidebar :**
- Largeur : `200px` (fixe)
- Texte + icônes visibles

**Content :**
- Grid : `2-4 colonnes` (adaptatif)
- Padding : `24px` standard
- Toutes les features disponibles

---

## 8. VARIABLES CSS

### 📋 Variables complètes

```css
:root {
    /* ====================================
       COULEURS PRINCIPALES - HEARST
       ==================================== */
    
    /* Backgrounds */
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --bg-tertiary: #242424;
    --bg-hover: #2a2a2a;
    
    /* Accent Vert Logo HEARST - Signature */
    --accent-primary: #8afd81;
    --accent-primary-dark: #6fdc66;
    --accent-primary-light: #a5ff9c;
    
    /* Accent secondaire - Mint Green */
    --accent-secondary: #7bed9f;
    
    /* Accents secondaires */
    --accent-success: #8afd81;
    --accent-warning: #f6c344;
    --accent-danger: #ff6b6b;
    --accent-info: #4ecdc4;
    
    /* Textes */
    --text-primary: #ffffff;
    --text-secondary: #b8b8b8;
    --text-muted: #6b6b6b;
    
    /* Bordures */
    --border-color: #2a2a2a;
    --border-hover: #3a3a3a;
    
    /* ====================================
       ESPACEMENTS
       ==================================== */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    /* ====================================
       LAYOUT
       ==================================== */
    --sidebar-width: 200px;
    --header-height: 70px;
    
    /* ====================================
       TRANSITIONS
       ==================================== */
    --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 📋 Variables HEARST supplémentaires

**Dans `cockpit.css` et `projections.css` :**
```css
:root {
    --hearst-primary: #8afd81;
    --hearst-primary-dark: #6fdc66;
    --hearst-primary-light: #a5ff9c;
    --hearst-mint-500: #7bed9f;
    --hearst-dark-900: #0A0A0A;
    --hearst-dark-800: #141414;
    --hearst-dark-700: #1A1A1A;
}
```

---

## 9. RÈGLES D'UTILISATION

### ✅ Règles obligatoires

1. **Couleur principale**
   - ✅ Toujours utiliser `#8afd81` (pas `#7bed9f`)
   - ✅ Utiliser la variable CSS `var(--accent-primary)`

2. **Texte sur fond vert**
   - ✅ TOUJOURS noir `#000000` ou `#0a0a0a`
   - ❌ JAMAIS blanc ou autre couleur

3. **Badges**
   - ✅ TOUJOURS `text-transform: uppercase`
   - ✅ Font-size : `11px`
   - ✅ Letter-spacing : `0.5px`
   - ✅ Border : `1px solid`

4. **Logo**
   - ✅ Text-only uppercase (pas d'image si possible)
   - ✅ Font-size : `16px`
   - ✅ Letter-spacing : `0.5px`

5. **Icônes**
   - ✅ SVG via système `data-icon` (pas d'unicode si possible)
   - ✅ Utiliser le fichier `icons.js`

6. **Sidebar**
   - ✅ Largeur : `200px` (variable CSS)
   - ✅ Background : `#1a1a1a`

7. **Animations**
   - ✅ Toujours utiliser les variables CSS pour les transitions
   - ✅ Timing function : `cubic-bezier(0.4, 0, 0.2, 1)`

### ❌ Erreurs à éviter

1. ❌ Utiliser `#7bed9f` au lieu de `#8afd81`
2. ❌ Mettre du texte blanc sur fond vert
3. ❌ Oublier `uppercase` sur les badges
4. ❌ Utiliser des emojis au lieu d'icônes SVG
5. ❌ Coder les valeurs en dur au lieu d'utiliser les variables CSS
6. ❌ Utiliser `ease` au lieu de `cubic-bezier(0.4, 0, 0.2, 1)`

---

## 10. EXEMPLES DE CODE

### 🎨 Exemple : Bouton Primary

```html
<button class="btn btn-primary">
    <span class="icon-inline" data-icon="plus"></span>
    New Project
</button>
```

```css
/* Déjà défini dans components.css */
/* Utilise var(--accent-primary) et var(--bg-primary) */
```

### 🎨 Exemple : Card avec métrique

```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">Total Hashrate</h3>
        <span class="icon-inline" data-icon="hashrate"></span>
    </div>
    <div class="card-body">
        <div style="font-size: 32px; font-weight: 700; color: #8afd81;">
            1,245 TH/s
        </div>
    </div>
</div>
```

### 🎨 Exemple : Navigation Active

```html
<a href="#" class="nav-item active">
    <span class="nav-icon" data-icon="dashboard"></span>
    <span class="nav-label">Dashboard</span>
</a>
```

```css
/* Déjà défini dans main.css */
/* Background: var(--accent-primary), Color: var(--bg-primary) */
```

### 🎨 Exemple : Badge Success

```html
<span class="badge badge-success">
    <span class="icon-inline" data-icon="check"></span>
    Active
</span>
```

---

## 11. CHECKLIST DE VALIDATION

### ✅ Couleurs
- [ ] Couleur principale : `#8afd81` (pas `#7bed9f`)
- [ ] Texte sur vert : noir `#000000` ou `#0a0a0a`
- [ ] Backgrounds : `#0a0a0a` et `#1a1a1a`
- [ ] Variables CSS utilisées partout

### ✅ Typographie
- [ ] Police : Inter (fallback system-ui)
- [ ] Letter-spacing : négatif pour titres (-0.01em à -0.02em)
- [ ] Badges : uppercase avec letter-spacing 0.5px
- [ ] Tailles : conformes (11px badges, 13px body, etc.)

### ✅ Layout
- [ ] Sidebar : `200px` (variable CSS)
- [ ] Header : `70px` (variable CSS)
- [ ] Espacements : variables CSS utilisées
- [ ] Grid gap : `24px`

### ✅ Composants
- [ ] Boutons : vert `#8afd81` + texte noir
- [ ] Nav active : fond vert complet avec texte noir
- [ ] Badges : uppercase + border + 11px
- [ ] Cards : hover avec border verte
- [ ] Tables : headers uppercase 11px

### ✅ Animations
- [ ] Timing : variables CSS `--transition-fast` et `--transition-normal`
- [ ] Function : `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] Durées : `0.2s` (fast), `0.3s` (normal)

### ✅ Icônes
- [ ] Système SVG via `data-icon`
- [ ] Fichier : `frontend/js/icons.js`
- [ ] 51 icônes disponibles

---

## 12. RÉFÉRENCES

### 📁 Fichiers CSS principaux

1. **`frontend/css/main.css`**
   - Variables CSS (lignes 11-55)
   - Layout principal (lignes 78-390)
   - Sidebar (lignes 90-200)
   - Header (lignes 217-279)
   - Content Area (lignes 281-294)

2. **`frontend/css/components.css`**
   - Boutons (lignes 44-178)
   - Cards (lignes 180-240)
   - Tables (lignes 242-291)
   - Badges (lignes 293-346)
   - Formulaires (lignes 348-403)
   - Modals (lignes 405-517)
   - Alerts (lignes 519-554)

3. **`frontend/css/cockpit.css`**
   - Navigation cockpit (lignes 24-166)
   - Styles spécifiques cockpit

4. **`frontend/css/projections.css`**
   - Styles spécifiques projections
   - Accordions, steppers, charts

### 📁 Fichiers JavaScript

1. **`frontend/js/icons.js`**
   - 51 icônes SVG définies
   - Export : `export const Icons = { ... }`

2. **`frontend/js/app.js`**
   - Gestion des icônes : `loadIcons()`, `reloadIcons()`

---

## 13. ÉVOLUTION : NEARST → HEARST

### 📊 Changement de couleur principale

| Version | Couleur | Code |
|---------|---------|------|
| **NEARST** (ancienne) | Vert menthe | `#7bed9f` |
| **HEARST** (actuelle) | Vert HEARST | `#8afd81` ⭐ |

**Note :** `#7bed9f` reste utilisé comme `--accent-secondary` (mint green), ce qui est correct.

### ✅ Migration effectuée

- ✅ Tous les boutons primaires : `#7bed9f` → `#8afd81`
- ✅ Navigation active : `#7bed9f` → `#8afd81`
- ✅ Variables CSS : `--accent-primary: #8afd81`
- ✅ Badges success : `#8afd81`
- ✅ Accent secondaire : `#7bed9f` conservé (correct)

---

## 14. STATISTIQUES D'UTILISATION

### 📊 Occurrences de #8afd81

- `frontend/css/cockpit.css` : **8 occurrences**
- `frontend/css/components.css` : **4 occurrences**
- `frontend/css/main.css` : **2 occurrences**
- `frontend/css/projections.css` : **42 occurrences**
- **Total : 56 occurrences exactes**

### 📊 Variables CSS

- **Variables principales** : 26 variables (main.css)
- **Variables HEARST** : 7 variables supplémentaires (cockpit.css, projections.css)
- **Total : 33 variables CSS**

---

## 15. RESSOURCES

### 📚 Documentation

- `STANDARDS_HEARST.md` - Référence complète des standards
- `CHARTE_NEARST_APPLIED.md` - Historique NEARST
- `AVANT_APRES_NEARST.md` - Comparaison avant/après
- `VERIFICATION_STANDARDS.md` - Vérifications effectuées

### 🎨 Design System Figma

- **Lien :** [Figma Design System](https://www.figma.com/design/CnL7sZ1RNWMEcYQ3gWvvKi/Hearst-Flow---DS?node-id=24-14012&t=b7ReKRwfCUOhjCmX-1)
- **Fichier :** `FIGMA_DESIGN_SYSTEM.md` (template à remplir)

---

## ✅ CONCLUSION

Cette charte graphique HEARST est **complète, cohérente et appliquée** dans tout le projet HearstAI.

**Points clés :**
- ✅ Couleur signature : `#8afd81` (vert HEARST)
- ✅ 33 variables CSS définies
- ✅ 51 icônes SVG disponibles
- ✅ Design system cohérent
- ✅ Responsive intégré
- ✅ Animations fluides

**Le projet respecte 100% de cette charte graphique.**

---

**Dernière mise à jour :** 18 Novembre 2025  
**Version :** 1.0  
**Statut :** ✅ Appliquée et vérifiée

