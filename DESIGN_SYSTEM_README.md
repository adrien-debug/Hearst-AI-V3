# 🎨 Design System - Hearst AI

Système de design complet avec tokens CSS/SCSS, mixins typographiques et exemples d'application.

## 📁 Structure des fichiers

```
frontend/css/
├── design-tokens.css          # Variables CSS complètes
├── design-tokens.scss         # Version SCSS des tokens
├── typography.scss            # Mixins typographiques
├── design-system-examples.css # Exemples de composants
└── icons-guide.css            # Guide d'utilisation des icônes
```

## 🚀 Utilisation

### 1. Intégration dans votre projet

Ajoutez les fichiers CSS dans votre `index.html` :

```html
<link rel="stylesheet" href="css/design-tokens.css">
<link rel="stylesheet" href="css/typography.scss">
<link rel="stylesheet" href="css/design-system-examples.css">
<link rel="stylesheet" href="css/icons-guide.css">
```

### 2. Variables CSS

Toutes les variables sont disponibles via `var(--variable-name)` :

```css
.my-component {
    background: var(--color-surface-default);
    border-radius: var(--radius-cards);
    padding: var(--spacing-6);
    color: var(--color-text-default);
}
```

### 3. Mixins SCSS

Importez les tokens et utilisez les mixins :

```scss
@import 'design-tokens.scss';
@import 'typography.scss';

.my-title {
    @include typography-section-title;
    color: var(--color-text-default);
}
```

### 4. Classes utilitaires

Utilisez les classes pré-définies :

```html
<div class="card-example">
    <h2 class="typography-section-title text-default">Titre</h2>
    <p class="typography-body text-secondary-1">Contenu</p>
    <button class="btn-example gap-3">
        <span class="icon-container icon-accent">
            <svg>...</svg>
        </span>
        Action
    </button>
</div>
```

## 🎨 Tokens disponibles

### Couleurs

- **Primary Light Green** : `--color-primary-light-green` (#A3FF8B)
- **Accent Ash Grey** : `--color-accent-ash-grey` (#9EB3A8)
- **Variantes** : 1 à 5 pour chaque série
- **Text Colors** : default, negative, accent, secondary, tertiary, etc.
- **Surfaces** : default, subtle-green, green-light, accent, overlays
- **Graphics** : palette 1 à 15

### Typographie

- **Display** : 52px, Bold, 64px line-height
- **Page Title** : 32px, SemiBold, 40px line-height
- **Section Title** : 25px, SemiBold, 32px line-height
- **Sub Section Title** : 18px, Medium, 24px line-height
- **Body Bold** : 16px, Medium
- **Body** : 16px, Regular
- **Body Minor Bold** : 14px, Medium
- **Body Minor** : 14px, Regular
- **Caption Bold** : 12px, Medium
- **Caption** : 12px, Regular

### Espacements

Multiples de 8px : 0, 2, 4, 8, 12, 16, 24, 32, 48, 64, 80px

### Rayons de bordure

- `--radius-flat` : 0px
- `--radius-small-cards` : 8px
- `--radius-cards` : 16px (défaut)
- `--radius-sections` : 20px
- `--radius-rounded` : 1000px

### Icônes

- Taille standard : 24x24px
- Style : Outline Rounded
- Stroke width : 1.5px

### Grille

- Colonnes : 12
- Gutter : 24px
- Breakpoint desktop : 1440px

## 📝 Exemples de composants

### Card

```html
<div class="card-example">
    <div class="card-example-header">
        <h3 class="card-example-title">Titre de la carte</h3>
    </div>
    <div class="card-example-body">
        Contenu de la carte
    </div>
    <div class="card-example-footer">
        <button class="btn-example">Action</button>
    </div>
</div>
```

### Button

```html
<button class="btn-example">
    <svg class="btn-example-icon">...</svg>
    Texte du bouton
</button>
```

### Icon

```html
<div class="icon-container icon-accent">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="..." />
    </svg>
</div>
```

## ⚠️ Règles importantes

1. **NE PAS modifier** les dimensions de layout
2. **NE PAS modifier** la structure HTML
3. **NE PAS modifier** les positions d'éléments
4. **UNIQUEMENT** appliquer les styles (couleurs, radius, spacing, typography, icons)

## 🔗 Ressources

- Police principale : **FK Grotesk Trial**
- Taille d'icône standard : **24x24px**
- Système d'espacement : **Multiples de 8px**
- Rayon par défaut : **16px**

