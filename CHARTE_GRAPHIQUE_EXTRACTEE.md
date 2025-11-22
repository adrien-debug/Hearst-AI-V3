# 🎨 CHARTE GRAPHIQUE EXTRACTÉE - HEARST AI

**Source:** Page HOME (Dashboard) - Analyse complète  
**Date:** 22 Novembre 2025  
**Version:** 1.0

---

## 🎯 PRINCIPE FONDAMENTAL

**Cette charte est extraite à 100% de ce qui est VRAIMENT utilisé sur la page HOME.**  
Tous les tokens, couleurs, espacements et patterns sont basés sur l'analyse réelle du code.

---

## 🌈 1. PALETTE DE COULEURS

### Couleur Principale (Brand)
```css
--hearst-green: #A7FB90              /* ✅ UTILISÉE pour valeurs KPI */
--hearst-green-alias: #C5FFA7        /* Alias dans certains fichiers */
--hearst-green-dark: #6fdc66         /* Hover states */
--hearst-green-light: #A7FB90        /* Light states */
```

**Usage:**
- Valeurs numériques importantes (KPI)
- Accents, highlights
- États actifs
- Bordures de focus

### Couleurs de Fond
```css
--bg-primary: #000000                 /* Noir pur - Background principal */
--bg-secondary: #1A1A1A              /* Gris foncé - Cards */
--bg-tertiary: #242424                /* Gris moyen - Inputs */
```

**Usage:**
- `--bg-primary`: Background global de la page
- `--bg-secondary`: Background des cards
- `--bg-tertiary`: Background des inputs, selects

### Couleurs de Texte
```css
--text-primary: #FFFFFF               /* Blanc - Texte principal */
--text-secondary: rgba(255, 255, 255, 0.7)  /* Blanc 70% - Texte secondaire */
--text-muted: #999999                 /* Gris - Texte tertiaire */
```

**Usage:**
- `--text-primary`: Titres, valeurs importantes
- `--text-secondary`: Descriptions, labels
- `--text-muted`: Texte auxiliaire

### Couleurs Système
```css
--color-success: #27AE60              /* Vert succès */
--color-warning: #FFB800              /* Orange warning */
--color-error: #E74C3C                /* Rouge erreur */
```

---

## 📝 2. TYPOGRAPHIE

### Font Families
```css
--font-family-primary: 'FK Grotesk Trial', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
--font-family-mono: 'Fira Code', 'Consolas', 'Monaco', monospace
```

**Usage:**
- `--font-family-primary`: Tous les textes standards
- `--font-family-mono`: Valeurs numériques, codes, adresses

### Échelle Typographique

| Token | Taille | Poids | Usage |
|-------|--------|-------|-------|
| `--typography-display-size` | 52px | 700 | Titres très grands |
| `--typography-page-title-size` | 32px | 600 | Titres de page |
| `--typography-section-title-size` | 25px | 600 | Titres de section |
| `--typography-subsection-title-size` | 18px | 500 | Sous-titres |
| `--typography-body-size` | 16px | 400 | Texte standard |
| `--typography-body-minor-size` | 14px | 400 | Texte secondaire |
| `--typography-caption-size` | 12px | 400 | Légendes |

### Letter Spacing
```css
Titres: -0.02em à -0.03em
Body: 0px
Labels uppercase: 0.5px
```

### Line Heights
```css
Display: 64px
Page Title: 40px
Section Title: 32px
Body: 24px
```

---

## 📏 3. ESPACEMENTS (SPACING SYSTEM)

### Système 8px Rule
```css
--space-1: 2px    /* Micro espacements */
--space-2: 4px    /* Petits gaps */
--space-3: 8px    /* Standard small */
--space-4: 12px   /* Standard medium */
--space-5: 16px   /* Standard large */
--space-6: 24px   /* Section gaps */
--space-7: 32px   /* Large gaps */
--space-8: 48px   /* Very large */
--space-9: 64px   /* Extra large */
--space-10: 80px  /* Maximum */
```

### Usage Standards
- **Gap entre KPI cards:** `var(--space-4)` (12px)
- **Gap entre sections:** `var(--space-6)` (24px)
- **Padding Card:** `var(--space-6)` (24px)
- **Padding Container:** `var(--space-8) var(--space-10)` (32px vertical, 40px horizontal)
- **Margin bottom titres:** `var(--space-4)` (12px)

---

## 🔲 4. BORDURES & OMBRES

### Border Radius
```css
--radius-sm: 8px      /* Petits éléments, badges */
--radius-md: 16px     /* Cards, boutons standards */
--radius-lg: 12px      /* Containers moyens */
--radius-xl: 16px      /* Cards grandes */
--radius-full: 1000px /* Pills, badges ronds */
```

**Usage:**
- Cards: `var(--radius-md)` (16px)
- Boutons: `var(--radius-md)` (16px)
- Inputs: `var(--radius-md)` (16px)
- Badges: `var(--radius-full)` (1000px)

### Ombres Standards

#### Shadow Card
```css
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.4),
  0 2px 8px rgba(0, 0, 0, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

#### Shadow Card Hover
```css
box-shadow: 
  0 12px 48px rgba(0, 0, 0, 0.5),
  0 4px 16px rgba(0, 0, 0, 0.4),
  0 0 0 1px rgba(197, 255, 167, 0.2),
  inset 0 1px 0 rgba(255, 255, 255, 0.1);
```

#### Shadow Green Glow
```css
--shadow-glow-green: 0 0 20px rgba(167, 251, 144, 0.3), 0 0 40px rgba(167, 251, 144, 0.1);
```

---

## 🎬 5. TRANSITIONS & ANIMATIONS

### Durées
```css
--duration-fast: 150ms    /* Micro interactions */
--duration-normal: 250ms  /* Standard */
--duration-slow: 350ms    /* Animations complexes */
```

### Easings
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Transitions Standards
```css
/* Card hover */
transition: all var(--duration-normal) var(--ease-in-out);
transform: translateY(-4px);  /* Au hover */

/* Button */
transition: all 0.2s ease;

/* Input focus */
transition: all var(--duration-fast) var(--ease-in-out);
```

---

## 📐 6. LAYOUT & GRID

### Container Principal
```css
max-width: 1600px;
padding: var(--space-8) var(--space-10);  /* 32px vertical, 40px horizontal */
gap: var(--space-6);  /* 24px entre sections */
```

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

## 🎨 7. COMPOSANTS PATTERNS

### Pattern: KPI Box
```tsx
<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
  </CardHeader>
  <CardContent>
    <div style={{
      fontSize: '2rem',              // 32px
      fontWeight: 700,               // Bold
      color: '#A7FB90',             // Vert principal
      marginBottom: 'var(--space-2)',
      fontFamily: 'var(--font-mono), monospace',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    }}>
      Valeur
    </div>
    <p style={{
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-sm)'
    }}>
      Description
    </p>
  </CardContent>
</Card>
```

### Pattern: Card Standard
```css
.card {
  background: rgba(26, 26, 26, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);  /* 16px */
  padding: var(--space-6);           /* 24px */
  box-shadow: /* voir ombres standards */
}
```

### Pattern: Table
```css
.table-container {
  background: rgba(26, 26, 26, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.table thead {
  background: linear-gradient(180deg, #454646 0%, #3a3a3a 100%);
  border-bottom: 2px solid rgba(197, 255, 167, 0.3);
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

### Pattern: Bouton Toggle (Period Selector)
```css
button {
  padding: var(--space-2) var(--space-3);  /* 4px 8px */
  borderRadius: var(--radius-sm);          /* 8px */
  border: 1px solid;
  borderColor: active ? 'var(--hearst-green)' : 'rgba(255, 255, 255, 0.2)';
  backgroundColor: active ? '#A7FB90' : 'transparent';
  color: active ? '#000000' : 'var(--text-secondary)';
  fontSize: var(--text-sm);
  fontWeight: active ? 600 : 400;
  transition: all 0.2s ease;
}
```

---

## 📋 8. RÈGLES D'UTILISATION

### Couleurs
1. **Vert `#A7FB90`:** Uniquement pour valeurs numériques importantes, accents, états actifs
2. **Blanc `#FFFFFF`:** Titres, texte principal
3. **Gris `rgba(255, 255, 255, 0.7)`:** Descriptions, labels secondaires
4. **Fond noir `#000000`:** Background principal
5. **Fond gris `#1A1A1A`:** Cards, containers

### Typographie
1. **FK Grotesk Trial:** Tous les textes standards
2. **Fira Code (mono):** Valeurs numériques, codes, adresses
3. **Tabular nums:** Pour alignement des nombres

### Espacements
1. **Toujours utiliser les tokens `--space-X`**
2. **Gap entre éléments similaires:** `var(--space-4)` (12px)
3. **Gap entre sections:** `var(--space-6)` (24px)
4. **Padding cards:** `var(--space-6)` (24px)

### Ombres
1. **Cards:** Ombre standard avec inset highlight
2. **Hover:** Ombre plus prononcée + transform translateY(-4px)
3. **Glow vert:** Pour éléments actifs/importants

---

## ✅ CHECKLIST APPLICATION

Pour appliquer cette charte sur une nouvelle page:

- [ ] Utiliser les tokens CSS (`--hearst-green`, `--space-X`, etc.)
- [ ] Appliquer la font `FK Grotesk Trial`
- [ ] Utiliser les border-radius standards
- [ ] Appliquer les ombres cards
- [ ] Respecter le système d'espacement 8px
- [ ] Utiliser les patterns KPI Box pour les valeurs importantes
- [ ] Appliquer les transitions standards
- [ ] Respecter les couleurs de texte (primary/secondary/muted)

---

**FIN DE LA CHARTE GRAPHIQUE**

