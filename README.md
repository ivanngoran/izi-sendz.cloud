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
| `index.html` | One-page + SEO/OG + JSON-LD |
| `styles.css` | Styles (clair uniquement) |
| `app.js` | Menu mobile, hero, simulateur SMS, calculateur packs, FAQ |
| `confidentialite.html`, `mentions-legales.html` | Pages légales |
| `assets/logo.png` | Logo |
| `CONTENU.md` | Copywriting source (à valider avant modif du HTML) |

## Config à adapter au déploiement

- Domaine canonique dans `index.html` : `https://www.izi-sendz.com/`
- Lien `Se connecter` (`/login`) → URL du backoffice
- Extraits API `https://api.izi-sendz.com/...` → base API réelle
- Contact `contact@izi-sendz.com`
- Page `mentions-legales.html` : hébergeur à compléter

## Déploiement

Site 100 % statique : servir la racine telle quelle (Vercel, Netlify, Nginx, S3+CDN).
Aucune variable d'environnement, aucun build.
