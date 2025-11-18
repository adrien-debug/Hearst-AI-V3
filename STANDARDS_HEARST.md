# 🎨 STANDARDS HEARST - RÉFÉRENCE COMPLÈTE

## 📋 Vue d'ensemble

Ce document définit tous les standards de design et de code à respecter dans le projet HearstAI.

---

## 🎨 COULEURS

### Couleur principale HEARST
- **Primary** : `#8afd81` ⬤ (Vert HEARST signature)
- **Primary Dark** : `#6fdc66` ⬤
- **Primary Light** : `#a5ff9c` ⬤

### Backgrounds
- **Primary** : `#0a0a0a` (Noir pur)
- **Secondary** : `#1a1a1a` (Noir doux - Sidebar, cards)
- **Tertiary** : `#242424` (Gris très foncé)
- **Hover** : `#2a2a2a` (Gris foncé)

### Accents secondaires
- **Secondary** : `#7bed9f` (Mint green)
- **Success** : `#8afd81` (Vert HEARST)
- **Warning** : `#f6c344` (Orange)
- **Danger** : `#ff6b6b` (Rouge)
- **Info** : `#4ecdc4` (Cyan)

### Textes
- **Primary** : `#ffffff` (Blanc)
- **Secondary** : `#b8b8b8` (Gris clair)
- **Muted** : `#6b6b6b` (Gris)

### Bordures
- **Normal** : `#2a2a2a`
- **Hover** : `#3a3a3a`

### Règle importante
⚠️ **Texte sur fond vert (#8afd81)** = TOUJOURS noir `#000000` ou `#0a0a0a`

---

## 📐 TYPOGRAPHIE

### Police
- **Primaire** : `Inter` (si disponible)
- **Fallback** : `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace** : `'Courier New', monospace` (pour horloge)

### Tailles
- **Logo** : `16px` (uppercase, letter-spacing: 0.5px)
- **Page title** : `20px` (letter-spacing: -0.02em)
- **Section titles** : `18px` (letter-spacing: -0.01em)
- **Card titles** : `16px`
- **Body text** : `13px`
- **Small text** : `11-12px` (uppercase pour badges)

### Poids
- **Regular** : `400`
- **Medium** : `500`
- **Semibold** : `600`
- **Bold** : `700`

### Letter-spacing
- **Titres** : `-0.01em` à `-0.02em` (plus serré)
- **Logo** : `0.5px`
- **Badges** : `0.5px` à `1px`
- **Uppercase** : `0.5px` à `0.8px`

---

## 📏 LAYOUT

### Sidebar
- **Largeur** : `200px` (fixe)
- **Background** : `#1a1a1a` (var(--bg-secondary))
- **Logo** : Text-only "HEARSTAI" ou "CLAUDE CI/CD" uppercase
- **Nav items** :
  - Normal : Texte gris clair
  - Hover : Background `#2a2a2a`
  - **Active** : Background `#8afd81` avec texte noir

### Header
- **Hauteur** : `70px`
- **Background** : `#0a0a0a` (var(--bg-primary))
- **Padding** : `0 var(--spacing-xl)`

### Espacements
- **XS** : `4px`
- **SM** : `8px`
- **MD** : `16px`
- **LG** : `24px`
- **XL** : `32px`
- **Grid gap** : `24px`

---

## 🎨 COMPOSANTS

### Boutons

#### Primary
```css
background: #8afd81;
color: #000000;
font-weight: 600;
letter-spacing: -0.01em;
border-radius: 24px; /* pill shape */
padding: 12px 24px;
```

#### Hover
```css
background: #6fdc66;
transform: scale(1.02);
box-shadow: 0 8px 16px rgba(138, 253, 129, 0.15);
```

### Badges
- **Style** : Carrés avec bordure
- **Text transform** : `uppercase`
- **Font size** : `11px`
- **Letter-spacing** : `0.5px` à `1px`
- **Border** : `1px solid` (couleur selon type)

### Cards
- **Background** : `#1a1a1a` (var(--bg-secondary))
- **Border** : `1px solid #2a2a2a`
- **Border-radius** : `8px`
- **Hover** : Border `#8afd81` + `translateY(-2px)`

### Tables
- **Headers** : `uppercase`, `11px`, letter-spacing
- **Body** : `13px`
- **Hover row** : Background `#242424` (var(--bg-tertiary))

### Nav Items
- **Active** : Background `#8afd81` avec texte noir
- **Padding** : `12px var(--spacing-lg)`
- **Border-left** : `2px solid transparent` (pas de border sur active)

---

## ✨ ANIMATIONS

### Timing
- **Function** : `cubic-bezier(0.4, 0, 0.2, 1)`
- **Fast** : `0.2s`
- **Normal** : `0.3s`

### Transforms
- **Hover buttons** : `scale(1.02)` ou `translateY(-1px)`
- **Hover cards** : `translateY(-2px)`

---

## 🎯 ICÔNES

### Système d'icônes
- **Format** : SVG via système `data-icon`
- **Fichier** : `frontend/js/icons.js`
- **Total** : 51 icônes SVG
- **Taille standard** : `20px` (nav), `16px` (inline)

### Utilisation
```html
<span class="nav-icon" data-icon="home"></span>
```

---

## 📱 RESPONSIVE

### Mobile (< 768px)
- Sidebar collapse à `70px`
- Icônes seules (pas de texte)
- Grid 1 colonne

### Desktop
- Sidebar `200px` fixe
- Grid adaptatif (2-4 colonnes)

---

## ✅ CHECKLIST DE VALIDATION

### Couleurs
- [ ] Couleur principale : `#8afd81` (pas `#7bed9f`)
- [ ] Texte sur vert : noir `#000000`
- [ ] Backgrounds : `#0a0a0a` et `#1a1a1a`

### Typographie
- [ ] Police : Inter (fallback system-ui)
- [ ] Letter-spacing : négatif pour titres
- [ ] Badges : uppercase

### Layout
- [ ] Sidebar : `200px`
- [ ] Header : `70px`
- [ ] Espacements cohérents

### Composants
- [ ] Boutons : vert `#8afd81` + texte noir
- [ ] Nav active : fond vert complet
- [ ] Badges : uppercase + border
- [ ] Cards : hover avec border verte

### Animations
- [ ] Timing : `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] Durées : `0.2s` (fast), `0.3s` (normal)

---

## 🔧 VARIABLES CSS

```css
:root {
    /* Couleurs principales - HEARST */
    --bg-primary: #0a0a0a;
    --bg-secondary: #1a1a1a;
    --bg-tertiary: #242424;
    --bg-hover: #2a2a2a;
    
    /* Accent Vert Logo HEARST - Signature */
    --accent-primary: #8afd81;
    --accent-primary-dark: #6fdc66;
    --accent-primary-light: #a5ff9c;
    
    /* Accent secondaire */
    --accent-secondary: #7bed9f;
    
    /* Accents */
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
    
    /* Espacements */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    /* Layout */
    --sidebar-width: 200px;
    --header-height: 70px;
    
    /* Transitions */
    --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📝 NOTES IMPORTANTES

1. **Couleur HEARST** : Toujours utiliser `#8afd81` (pas `#7bed9f` de NEARST)
2. **Texte sur vert** : TOUJOURS noir pour le contraste
3. **Badges** : TOUJOURS uppercase
4. **Logo** : Text-only uppercase (pas d'image si possible)
5. **Icônes** : SVG via système `data-icon` (pas d'unicode si possible)
6. **Sidebar** : `200px` fixe (pas `260px`)
7. **Animations** : Toujours utiliser les variables CSS pour les transitions

---

**Dernière mise à jour** : 18 Novembre 2025

