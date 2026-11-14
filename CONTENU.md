# izi sendz — Contenu vitrine (website/)

> Statut : proposition de contenu à valider avant build. Source technique : `docs/architecture_technique.md`, `docs/étapes_de_conception.md`, `docs/structure_de_la_base_de_données.md`, `docs/charte_graphique.md`, `README.md`.
> Ton : sobre B2B, phrases courtes. Règles : aucun provider nommé, aucune preuve chiffrée, pas de lieu précis, pas de démo — le client essaie directement. Packs sans abonnement.

## 1. Positionnement

**Proposition de valeur (1 phrase) :**
Envoyez vos campagnes, codes OTP et notifications par SMS en Afrique — depuis un tableau de bord simple ou votre API. Disponible dès aujourd'hui en Côte d'Ivoire.

**3 piliers :**
1. **Fiable** — nom d'expéditeur personnalisé approuvé, accusés de réception, suivi message par message.
2. **Simple à piloter** — import CSV, messages personnalisés `{prenom}`, campagnes planifiées, rapports lisibles.
3. **Prêt pour vos devs** — API REST, clés API révocables, webhooks d'accusés, docs et bac à sable.

## 2. Personas et messages

| Persona | Douleur | Objection | Message qui convainc | CTA |
|---|---|---|---|---|
| **PME / commerce / marketeur** | Pub en ligne chère, messages concurrents qui n'arrivent pas | « Mes clients vont-ils recevoir ? » | Importez votre fichier clients, écrivez « Soldes -20 % ce week-end {prenom} », suivez les livrés en direct. | Essayer maintenant |
| **Dev / CTO SaaS** | Intégrer l'envoi SMS = quotas, retries, accusés à gérer | « Votre API tient-elle la charge ? » | Un appel API pour envoyer, une clé révocable, des accusés corrélés à chaque message. | Voir la doc API |
| **Banque / fintech / assurance** | OTP qui n'arrive pas = client bloqué | « C'est auditable et isolé ? » | Données isolées par client, clés hachées, journaux horodatés, expéditeur validé. | Essayer maintenant |
| **ONG / école / admin** | Sensibiliser vite des milliers de personnes | « Combien ça coûte ? » | Des packs sans abonnement dès 2 000 F, planification datée, sans engagement. | Voir les packs |

**Hiérarchie CTA :** 1. Essayer maintenant (primaire, partout) → 2. Voir la doc API (secondaire, hero + section devs) → 3. Voir les packs / Contact (tertiaire, tarifs + footer).

## 3. Arborescence (one-page + 2 pages légales)

1. Header sticky (logo, Produit, Cas d'usage, Tarifs, Développeurs, FAQ, [Se connecter] + [Essayer maintenant])
2. Hero
3. Bandeau confiance (sans provider, sans chiffres)
4. Cas d'usage (3 cartes : Promo masse / OTP & transactionnel / Notifications)
5. Comment ça marche (3 étapes)
6. Fonctionnalités (6 cartes)
7. Couverture (Afrique, démarrage Côte d'Ivoire)
8. Tarifs (4 packs sans abonnement)
9. Développeurs (code + webhooks + statuts)
10. FAQ (8 questions)
11. CTA final + inscription / essai
12. Footer légal (mentions, confidentialité, contact)

Pages : `/confidentialite`, `/mentions-legales` (prévoir, contenu §7).

## 4. Copywriting FR complet (prêt à intégrer)

### 4.1 Header
- Logo izi sendz (bulle + éclair). Liens : Produit · Cas d'usage · Tarifs · Développeurs · FAQ.
- Boutons : `Se connecter` (fantôme) / `Essayer maintenant` (dégradé bleu→violet).

### 4.2 Hero
**Titre :** Vos SMS arrivent. Vos clients répondent.
**Sous-titre :** Campagnes promo, codes OTP et notifications — envoyez à des milliers de clients depuis un tableau de bord simple ou votre API, avec un accusé de réception pour chaque message. Disponible en Côte d'Ivoire, pensé pour l'Afrique.
**CTA :** [Essayer maintenant] [Voir la doc API]
**Micro-preuve :** Expéditeur personnalisé · 160 caractères contrôlés · Packs sans abonnement dès 2 000 F.
**Visuel :** mockup tableau de bord (campagne promo, badge `Livré`, compteur `142/160`).

### 4.3 Bandeau confiance
« Expéditeur vérifié · Accusés de réception · Données isolées par client · Sans abonnement »

### 4.4 Cas d'usage
**A. Promo de masse — « Remplissez votre boutique ce week-end. »**
Importez votre CSV, personnalisez avec `{prenom}` ou `{code}`, planifiez, suivez les livrés. Exemple : « Bonjour {prenom}, -20% ce samedi avec le code promo '{code}'. Profitez en rapidement ! »
**B. OTP & transactionnel — « Vos clients ne restent jamais bloqués. »**
Codes de connexion, confirmation de paiement, réinitialisation. Envoi unitaire via API, reprises automatiques, statut livré suivi.
**C. Notifications — « Chaque rendez-vous honoré. »**
Rappels RDV, alertes livraison, échéances, sensibilisation. Planifiez à date fixe, même à 10 000 destinataires.

### 4.5 Comment ça marche (3 étapes)
1. **Importez** — CSV de contacts, variables `{prenom, code}` validées avant envoi.
2. **Écrivez et planifiez** — nom d'expéditeur approuvé (11 caractères max), message contrôlé à 160 caractères après personnalisation, envoi immédiat ou daté.
3. **Suivez** — chaque SMS passe par `Enregistré → Pris en charge → Envoyé → Livré / Échoué`, horodaté.

### 4.6 Fonctionnalités (6 cartes)
1. **Campagnes planifiées** — brouillon, test, envoi immédiat ou `programmé le…`, reprise sur erreur.
2. **Carnets d'adresses** — dossiers par audience, schéma de variables imposé, rejets CSV expliqués ligne par ligne.
3. **Expéditeur à votre nom** — `MA-BOUTIQUE` au lieu d'un numéro court, validé avant usage.
4. **Rapports de livraison** — livrés, en attente, échoués avec code explicite, export CSV.
5. **Clés API & rôles** — clé affichée une seule fois, révocable, rôles Propriétaire / Admin / Marketing / Développeur.
6. **Packs flexibles** — sans abonnement, solde par pays, alerte seuil bas, historique d'achats.

### 4.7 Couverture (Afrique, démarrage Côte d'Ivoire)
« izi sendz est pensé pour l'Afrique. Le service démarre en Côte d'Ivoire et s'étend pays par pays. Dites-nous où vous envoyez : vos besoins guident nos prochaines ouvertures. »

### 4.8 Tarifs (packs sans abonnement — Côte d'Ivoire)
Paiements flexibles, sans abonnement : vous achetez un pack, vos unités restent disponibles jusqu'à épuisement.
- **Pack 100 unités — 2 000 XOF** (idéal pour tester)
- **Pack 1 000 unités — 15 000 XOF** [Le plus choisi]
- **Pack 5 000 unités — 60 000 XOF**
- **Pack 10 000 unités — 100 000 XOF**
- **Plus de 10 000 unités ?** Contactez-nous directement pour un devis.
Note : « 1 SMS de 160 caractères = 1 unité. Les SMS non délivrés par l'opérateur ne sont pas remboursés — nous vous montrons le statut exact de chacun. »

### 4.9 Développeurs
**Titre :** Une API que vos devs vont aimer.
Envoi unitaire et campagnes via API REST. Clé via en-tête API, JWT pour le tableau de bord. Webhooks d'accusés : livré, acheminé, impossible. Exemple cURL + lien doc OpenAPI + bac à sable. [Accéder à la doc] [Obtenir une clé test]

### 4.10 FAQ (7)
1. **En combien de temps partent mes SMS ?** Vos envois sont mis en file et traités en continu. Pour un créneau précis, planifiez la veille.
2. **Pourquoi 160 caractères ?** C'est la limite d'un SMS simple. On compte après remplacement de `{prenom}` et on vous bloque avant dépassement.
3. **Mon nom d'expéditeur ?** 11 caractères max, lettres/chiffres/espaces, validé avant usage (24-72 h). Sans validation, envoi impossible.
4. **Et si un numéro est invalide ?** Rejeté avant débit avec le code exact. Pas de facturation aveugle.
5. **Mes contacts sont-ils en sécurité ?** Données isolées par client, mots de passe et clés hachés, clé API à vue unique, journaux horodatés.
6. **Puis-je tester ?** Oui : créez un compte, achetez un pack dès 2 000 F, et utilisez le bac à sable + clé test.
7. **Quels pays après la Côte d'Ivoire ?** izi sendz couvre l'Afrique pays par pays. Indiquez-nous vos destinations : elles guident nos prochaines ouvertures.

### 4.11 CTA final + inscription
« Créez votre compte, achetez un pack et envoyez vos premiers SMS aujourd'hui. »
Formulaire : nom, entreprise, téléphone, volume mensuel estimé (select), message. Validation native + message de confirmation local (pas de `mailto:` — brancher sur `POST /contact` quand le backend expose la route). Case opt-in obligatoire.

### 4.12 Footer
Produit · Tarifs · Doc API · Contact (Abidjan, CI — contact@izi-sendz.com) · Légal : Mentions · Confidentialité · « Unités valables jusqu’épuisement » · © 2026 izi sendz.

## 5. Conformité (règles SHIELD à imposer)

- **Opt-in :** n'écrire qu'à des contacts ayant consenti. Le client est responsable de sa base ; izi sendz bloque les imports sans consentement déclaré.
- **Vérité tarifaire :** afficher « SMS non délivrés non remboursés par l'opérateur » en tarifs + FAQ + CGU. Ne jamais promettre « 100 % livrés » ni « envoi instantané de 100k SMS ».
- **Données :** numéros `tel:+…` + attributs contacts = données personnelles. Isolation par tenant, clés hachées, journaux conservés 3 ans, hébergement à préciser, droit d'accès/suppression via support.
- **Expéditeur :** usage uniquement après approbation opérateur. Interdit : marques tierces, État, noms trompeurs.
- **Pages légales à créer :** `/mentions-legales` (éditeur, contact, hébergeur) + `/confidentialite` (données collectées, finalités, durée, droits, cookies de mesure seule).

## 6. Décision technique (NEXUS — site statique d'abord)

- **Site statique d'abord** (Astro ou Hugo ou HTML simple), pas Angular : la vitrine n'a pas besoin du dashboard Angular 22. Rapide, SEO FR parfait, hébergeable partout (GitHub Pages / Netlify / VPS existant).
- **Charte appliquée :** fond blanc, bleu `#0B51ED` action, violet `#6213C7` accent, dégradé `135deg` réservé au CTA hero, Sora titres + Inter texte, Lucide two-tone, angles 4 px, logo `docs/references/main_logo.png` tel quel.
- **Formulaires sans backend :** validation native + confirmation locale dans un premier temps ; brancher ensuite sur l'API .NET (`POST /contact`) quand le backend expose la route.
- **Header :** `Se connecter` → `/login` (app), `Essayer maintenant` → `#essai`. Menu burger + drawer sur mobile (Escape pour fermer).
- **Liens :** doc API → Scalar/OpenAPI du backend (`/openapi/v1.json`), dashboard → sous-domaine `app.` quand Angular livré. Aucun secret dans le site.
- **SEO :** 1 page FR, `<title>` « izi sendz — Envoi SMS Côte d'Ivoire : campagnes, OTP, API », meta description, sitemap, images avec `alt`, temps de chargement < 1,5 s.

## 7. Prochaine étape proposée

Valider ce contenu → je construis la one-page statique dans `website/` (HTML + CSS charte, responsive, sans dépendance lourde), avec le logo et les 12 sections ci-dessus.
