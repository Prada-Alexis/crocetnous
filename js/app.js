/* ============================================================
   NAVIGATION — ombre au scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ============================================================
   ANIMATIONS AU SCROLL (Intersection Observer)
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   SECTION PRODUITS — page d'accueil
   Chargé depuis data/catalog.json.
   Les onglets et les cartes sont générés automatiquement :
   ajouter une catégorie dans catalog.json suffit.
   ============================================================ */
async function loadHomepageProducts() {
  const productsSection = document.getElementById('produits');
  if (!productsSection) return;

  try {
    const res = await fetch('data/catalog.json');
    if (!res.ok) throw new Error('catalog.json introuvable');
    const catalog = await res.json();
    const keys    = Object.keys(catalog);

    /* -- Onglets -- */
    const tabsEl = productsSection.querySelector('.animal-tabs');
    tabsEl.innerHTML = keys.map((key, i) => {
      const cat = catalog[key];
      return `<button class="tab-btn ${i === 0 ? 'active' : ''}"
                      data-tab="${key}"
                      style="${i === 0 ? `border-bottom-color:${cat.couleur};color:${cat.couleur}` : ''}">
        ${cat.emoji} Pour les ${cat.label}
      </button>`;
    }).join('');

    /* -- Panneaux -- */
    // Retire les anciens panneaux s'il en reste
    productsSection.querySelectorAll('.tab-panel').forEach(p => p.remove());

    keys.forEach((key, i) => {
      const cat   = catalog[key];
      const panel = document.createElement('div');
      panel.id        = 'tab-' + key;
      panel.className = 'tab-panel' + (i === 0 ? ' active' : '');

      if (!cat.produits.length) {
        panel.innerHTML = `<p style="padding:2rem;color:var(--text-muted);font-size:.95rem;text-align:center;width:100%;">
          ${cat.emoji} Gamme ${cat.label.toLowerCase()} bientôt disponible.</p>`;
      } else {
        panel.innerHTML = cat.produits.slice(0, 4).map((p, j) => `
          <a href="produits.html?cat=${key}" class="product-card reveal${j > 0 ? ' reveal-delay-' + j : ''}">
            <img src="${p.image}" alt="${p.nom}" class="product-img" loading="lazy">
            <div class="product-body">
              <div class="product-tag" style="color:${cat.couleur}">${p.sous_categorie ? p.sous_categorie + ' · ' : ''}${cat.label}</div>
              <h3>${p.nom}</h3>
              <p>${p.description}</p>
              <span class="product-arrow" style="color:${cat.couleur}">Voir la gamme</span>
            </div>
          </a>`).join('');
      }

      productsSection.appendChild(panel);
      panel.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    });

    /* -- Comportement des onglets -- */
    productsSection.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tab;
        const cat = catalog[key];
        productsSection.querySelectorAll('.tab-btn').forEach(b => {
          b.classList.remove('active');
          b.style.borderBottomColor = '';
          b.style.color = '';
        });
        productsSection.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        btn.style.borderBottomColor = cat.couleur;
        btn.style.color             = cat.couleur;
        document.getElementById('tab-' + key)?.classList.add('active');
      });
    });

    const wrapper2  = document.querySelector('.animal-tabs-wrapper');
    const tabsEl2   = document.querySelector('.animal-tabs');

    function updateHint2() {
      const canScroll = tabsEl2.scrollLeft <
        (tabsEl2.scrollWidth - tabsEl2.clientWidth - 5);
      wrapper2.classList.toggle('show-hint', canScroll);
    }

    tabsEl2.addEventListener('scroll', updateHint2);
    window.addEventListener('resize', updateHint2);
    setTimeout(updateHint2, 100);

  } catch (err) {
    console.error('Erreur chargement produits :', err);
  }
}

loadHomepageProducts();

/* ============================================================
   FORMULAIRE DE CONTACT
   ============================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn      = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');
    btn.disabled    = true;
    btn.textContent = 'Envoi en cours…';
    setTimeout(() => {
      btn.style.display = 'none';
      feedback?.classList.remove('hidden');
    }, 800);
  });
}
