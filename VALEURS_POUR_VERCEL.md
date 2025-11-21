# 📋 Valeurs à Copier pour Vercel

## 🔑 NEXTAUTH_SECRET (généré)

```
ZeYi7nRaUty5X+aUyCxESnpVBKuU6jmQli3ROt5gq/s=
```

**À ajouter dans Vercel :**
- Key : `NEXTAUTH_SECRET`
- Value : `ZeYi7nRaUty5X+aUyCxESnpVBKuU6jmQli3ROt5gq/s=`
- Environments : ✅ Production, ✅ Preview, ✅ Development

---

## 🌐 NEXTAUTH_URL

```
https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app
```

**À ajouter dans Vercel :**
- Key : `NEXTAUTH_URL`
- Value : `https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app`
- Environments : ✅ Production, ✅ Preview

---

## 🔑 DEBANK_ACCESS_KEY

```
bd96b970a2c07a67739266c434cd0e8ea00fa656
```

**À ajouter dans Vercel :**
- Key : `DEBANK_ACCESS_KEY`
- Value : `bd96b970a2c07a67739266c434cd0e8ea00fa656`
- Environments : ✅ Production, ✅ Preview

---

## 🗄️ DATABASE_URL

**⚠️ À créer sur Vercel d'abord !**

1. Allez sur Vercel Dashboard → votre projet
2. Cliquez sur **"Storage"**
3. Créez une base **Postgres**
4. Récupérez la **Connection String**
5. Ajoutez-la comme `DATABASE_URL`

**Format attendu :**
```
postgresql://user:password@host:5432/database
```

---

## 📋 Checklist complète

Dans **Vercel → Settings → Environment Variables**, ajoutez :

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXTAUTH_SECRET` | `ZeYi7nRaUty5X+aUyCxESnpVBKuU6jmQli3ROt5gq/s=` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://hearst-ai-v3-nle89m4d3-adrien-nejkovics-projects.vercel.app` | Production, Preview |
| `DATABASE_URL` | `postgresql://...` (à récupérer depuis Vercel Postgres) | Production, Preview |
| `DEBANK_ACCESS_KEY` | `bd96b970a2c07a67739266c434cd0e8ea00fa656` | Production, Preview |

---

## 🚀 Après avoir ajouté les variables

1. **Migrer le schéma Prisma** :
   ```bash
   npx prisma db push
   ```

2. **Redéployer sur Vercel** :
   - Dashboard → Deployments → 3 points → Redeploy

---

*Toutes ces valeurs sont prêtes à être copiées-coller dans Vercel*

