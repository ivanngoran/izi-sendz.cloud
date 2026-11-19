# izi sendz — Site vitrine

Site vitrine statique (sans build) : `index.html` + `styles.css` + `app.js`.
Extrait du monorepo `izi_sms/website/` le 2026-11-14 — désormais projet indépendant.

## Lancer en local

```bash
npx serve .        # ou : python -m http.server 8000
```

Ouvrir http://localhost:3000 (ou :8000).

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : hero multi-canal, 2 canaux, tarifs, FAQ, CTA final |
| `fonctionnalites.html` | Les 11 fonctions (bénéfice + exemple + CTA) |
| `tarifs.html` | Grille par pays + simulateur canal × volume |
| `developpeurs.html` | Contrat d'envoi unique + exemples + OTP via API |
| `styles.css` | Styles (clair uniquement) |
| `app.js` | Menu mobile, hero, simulateur SMS, simulateur tarifs, FAQ, onglets |
| `confidentialite.html`, `mentions-legales.html` | Pages légales |
| `assets/logo.png` | Logo |
| `CONTENU.md` | Copywriting source (à valider avant modif du HTML) |

## Config à adapter au déploiement

- Domaine canonique dans `index.html` : `https://izi-sendz.cloud/`
- Lien `Se connecter` → `https://app.izi-sendz.cloud/login`
- Extraits API → `https://api.izi-sendz.cloud/...` (public ; backend derrière `api-backend.izi-sendz.cloud`)
- Contact `contact@izi-sendz.cloud`
- Page `mentions-legales.html` : hébergeur à compléter
- Contact WhatsApp : `https://wa.me/2250708616289` (numéro de TEST — basculer sur le numéro prod au lancement : chercher/remplacer dans les 4 pages)
- Offre affichée : SMS à paliers en CI (100 u → 2 000 F · 1 000 u → 15 000 F · 5 000 u → 60 000 F · 10 000 u → 100 000 F) / 25 FCFA ailleurs en Afrique, WhatsApp 3 FCFA/message, 1 crédit = 1 unité, gros volumes sur devis

## Déploiement

Site 100 % statique : servir la racine telle quelle (Vercel, Netlify, Nginx, S3+CDN).
Aucune variable d'environnement, aucun build.
