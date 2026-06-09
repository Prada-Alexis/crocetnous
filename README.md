# CrocEtNous — version statique maintenable

Projet statique léger pour servir une liste d'articles maintenue via un fichier plat JSON.

Structure:

- `index.html` — page d'accueil listant les articles
- `article.html` — vue détail d'un article (`?id=...`)
- `data/articles.json` — fichier plat contenant les articles
- `css/styles.css` — styles
- `js/app.js` — logique client pour charger/afficher les articles

Modifier les articles:

Éditez `data/articles.json` et ajoutez/supprimez/éditez des objets. Chaque objet doit avoir les clés: `id`, `title`, `date`, `tags`, `summary`, `content`.

Tester localement:

Avec Python 3 (serveur HTTP simple):

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000/
```

Ou avec `npx serve` si Node.js est installé:

```bash
npx serve . -l 8000
```

Notes:

- Le site est volontairement simple (sans base de données) pour faciliter la maintenance. Si vous voulez une interface d'édition web, je peux en ajouter une qui modifie le JSON côté client + serveur ou via une API minimale.
