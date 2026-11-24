# izi sendz — Site vitrine (v2)

Site 100 % statique, sans build ni dépendance : HTML + `styles.css` + `app.js`.
Servir la racine telle quelle (GitHub Pages via `CNAME`, Netlify, Nginx…).

```bash
npx serve .        # ou : python -m http.server 8000
```

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Hero animé (conversations SMS/WhatsApp), canaux, Studio (simulateur de message), cas d'usage par métier, parcours d'un message, fonctionnalités, couverture UEMOA/CEMAC, tarifs, API, sécurité, FAQ, CTA |
| `fonctionnalites.html` | Les 11 fonctionnalités (bénéfice + exemple + CTA) |
| `tarifs.html` | Prix du pays détecté (monnaie locale + EUR + USD), volume, grille des 54 pays |
| `data/pricing.json` | Prix fixes par pays (F CFA) + taux de change, lus par le site |
| `tools/update-rates.mjs` | `node tools/update-rates.mjs` : rafraîchit les taux du JSON |
| `developpeurs.html` | Contrat d'envoi, exemples cURL/JS/Python/PHP/C#, OTP avec repli, statuts |
| `confidentialite.html`, `mentions-legales.html`, `404.html` | Pages annexes |
| `assets/logo.png`, `assets/logo-mark.png` | Logo d'origine + version recadrée sur fond transparent |

Thème clair et sombre automatique (préférence système). Animations désactivées si « réduire les animations » est activé.

## Tarifs

Prix fixes facturés en F CFA : SMS 15 F en Côte d'Ivoire, 25 F ailleurs en Afrique ; WhatsApp 5 F partout.
Pays détecté via le fuseau horaire du navigateur (puis la langue), sinon Côte d'Ivoire. Le choix du visiteur est mémorisé.
Le site doit être servi en HTTP (pas en `file://`) pour que `data/pricing.json` soit lu.

## À vérifier avant mise en ligne

- Numéro WhatsApp `2250708616289` = numéro de TEST : chercher/remplacer dans toutes les pages et `app.js`.
- `mentions-legales.html` : hébergeur à compléter.
- Réponse API affichée : `{ "resourceId": "…" }` uniquement (aucun autre champ inventé).
