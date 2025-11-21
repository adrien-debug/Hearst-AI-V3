# 🚀 GUIDE DE CORRECTION RAPIDE - HearstAI

**Temps estimé:** 15 minutes  
**Priorité:** 🔴 CRITIQUE

---

## ⚡ CORRECTION URGENTE : DATABASE_URL

### Étape 1 : Obtenir la vraie URL Supabase (2 min)

1. Allez sur **https://supabase.com**
2. Connectez-vous et sélectionnez votre projet
3. Cliquez sur **Settings** (⚙️ en bas à gauche)
4. Cliquez sur **Database**
5. Dans la section **Connection string**, cliquez sur **URI**
6. **Copiez** la chaîne complète (format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)

### Étape 2 : Corriger dans Vercel (3 min)

1. Allez sur **https://vercel.com/dashboard**
2. Cliquez sur votre projet **Hearst-AI-V3** (ou votre nom de projet)
3. Cliquez sur **Settings** (en haut)
4. Cliquez sur **Environment Variables** (menu de gauche)
5. Trouvez **DATABASE_URL** dans la liste
6. Cliquez sur **Edit** (icône crayon)
7. **Supprimez** tout le contenu de la valeur
8. **Collez** la vraie URL Supabase que vous avez copiée
9. Vérifiez que les cases sont cochées : ✅ Production, ✅ Preview, ✅ Development
10. Cliquez sur **Save**

### Étape 3 : Vérifier les autres variables (5 min)

Vérifiez que ces variables existent dans Vercel :

#### NEXTAUTH_URL
- **Key:** `NEXTAUTH_URL`
- **Value:** `https://votre-projet.vercel.app` (remplacez par votre vraie URL Vercel)
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### NEXTAUTH_SECRET
- **Key:** `NEXTAUTH_SECRET`
- **Value:** Générez avec cette commande :
  ```bash
  openssl rand -base64 32
  ```
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### DEBANK_ACCESS_KEY (optionnel)
- **Key:** `DEBANK_ACCESS_KEY`
- **Value:** Votre clé API DeBank
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

### Étape 4 : Redéployer (2 min)

1. Dans Vercel Dashboard, allez dans **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les **3 points** (⋯)
4. Cliquez sur **Redeploy**
5. Attendez que le déploiement se termine (2-5 minutes)

### Étape 5 : Vérifier (3 min)

1. Une fois le déploiement terminé, cliquez sur votre URL Vercel
2. Testez ces endpoints :
   - `https://votre-projet.vercel.app/api/health` → doit retourner `{ status: 'ok' }`
   - `https://votre-projet.vercel.app/api/customers` → doit retourner la liste des customers
   - `https://votre-projet.vercel.app/api/collateral` → doit retourner les données collatérales

---

## ✅ CHECKLIST RAPIDE

- [ ] DATABASE_URL corrigé avec vraie URL Supabase
- [ ] NEXTAUTH_URL configuré
- [ ] NEXTAUTH_SECRET généré et ajouté
- [ ] DEBANK_ACCESS_KEY ajouté (si nécessaire)
- [ ] Projet redéployé sur Vercel
- [ ] Tests des endpoints API réussis

---

## 🆘 EN CAS DE PROBLÈME

### Erreur "DATABASE_URL contains placeholder"
- **Solution:** Vérifiez que vous avez bien remplacé le placeholder dans Vercel Dashboard

### Erreur "Cannot connect to database"
- **Solution:** Vérifiez que l'URL Supabase est correcte et que la base de données est accessible

### Erreur "Prisma Client not generated"
- **Solution:** Le build Vercel devrait générer Prisma automatiquement. Vérifiez les logs de build.

### Erreur 500 sur les routes API
- **Solution:** Vérifiez les logs Vercel (Deployments → Cliquez sur le déploiement → Logs)

---

## 📞 SUPPORT

Si vous rencontrez toujours des problèmes après avoir suivi ce guide :

1. Vérifiez les logs Vercel
2. Vérifiez que DATABASE_URL est correct dans Vercel Dashboard
3. Vérifiez que toutes les variables d'environnement sont configurées
4. Consultez `AUDIT_COMPLET_DEBUG.md` pour plus de détails

---

**Dernière mise à jour:** 21 novembre 2025

