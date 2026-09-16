document.addEventListener("DOMContentLoaded", () => {
    const navlinks = document.querySelectorAll(".nav-link-custom");
    const allClickableLinks = document.querySelectorAll("a[href^='#']");
    const sections = document.querySelectorAll("section");

    // 1. Initialisation de Typed.js
    let typed;
    const typedElement = document.querySelector('#typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        typed = new Typed('#typed-text', {
            strings: [
                'Bienvenue chez <span class="text-jaune">MASOVIA Madagascar</span>',
                'Votre partenaire en informatique de confiance',
                'Des solutions web et IT sur mesure'
            ],
            contentType: 'html',
            typeSpeed: 50,
            backSpeed: 0,
            fadeOut: true,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 500,
            backDelay: 2000,
            startDelay: 300,
            loop: true
        });
    }

    // 2. Fonction d'activation des sections
    function ActiverSection(targetid) {
        if (!targetid) return;

        sections.forEach(section => {
            // Comparaison insensible à la casse pour éviter les erreurs de frappe (ex: Contact vs contact)
            if (section.id.toLowerCase() === targetid.toLowerCase()) {
                section.classList.remove("d-none");

                // Relance animations À Propos
                if (targetid.toLowerCase() === "apropos") {
                    const elementsAnim = section.querySelectorAll('.anim-histoire, .anim-valeur');
                    elementsAnim.forEach(el => {
                        el.style.animation = 'none';
                        el.offsetHeight; // Reflow
                        el.style.animation = '';
                    });
                }

                // Relance animations Procédure
                if (targetid.toLowerCase() === "procedure") {
                    const steps = section.querySelectorAll('.procedure-step');
                    steps.forEach(step => {
                        step.style.animation = 'none';
                        step.offsetHeight; // Reflow
                        step.style.animation = '';
                    });
                }
            } else {
                section.classList.add("d-none");
            }
        });

        // Mise à jour de la Navbar active
        navlinks.forEach(link => {
            const linkHref = link.getAttribute("href").replace("#", "").toLowerCase();
            if (linkHref === targetid.toLowerCase()) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Gestion du fond animé
        if (targetid.toLowerCase() === "accueil") {
            document.body.classList.remove("bg-fixed");
        } else {
            document.body.classList.add("bg-fixed");
        }
    }

    // 3. Gestion des clics sur les liens
    allClickableLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetid = this.getAttribute("href").replace("#", "");
            if (targetid) {
                ActiverSection(targetid);
            }
        });
    });

    // 4. Force l'affichage de l'Accueil au démarrage
    ActiverSection("accueil");
});

  // Met à jour l'année automatiquement
  document.getElementById('year').textContent = new Date().getFullYear();

  // Dictionnaire contenant les détails des offres
  const offresDetails = {
    'vitrine': {
      nom: 'Site vitrine (300 Ar)',
      details: "Bonjour,\nJe suis intéressé(e) par l'offre Site Vitrine (300 Ar) comprenant :\n- Design de Logo\n- Charte Graphique\n- Cartes de Visite\n- Kit Réseaux Sociaux"
    },
    'sur-mesure': {
      nom: 'Développement sur mesure (250 Ar)',
      details: "Bonjour,\nJe suis intéressé(e) par l'offre Développement sur mesure (250 Ar) comprenant :\n- 10 Templates Posts\n- 5 Templates Stories\n- Couvertures Highlights\n- Planning 1 Mois"
    },
    'ecommerce': {
      nom: 'Ecommerce (600 Ar)',
      details: "Bonjour,\nJe suis intéressé(e) par l'offre Ecommerce (600 AR) comprenant :\n- 5 Pages Sur-Mesure\n- Design Responsive\n- Référencement SEO\n- Révisions Offertes"
    },
    'mobile': {
      nom: 'Développement mobile (1 000 Ar)',
      details: "Bonjour,\nJe suis intéressé(e) par l'offre Développement mobile (1 000 Ar) comprenant :\n- Site Web + Hébergement\n- Branding & Logo inclus\n- Maintenance IT & Réseau\n- Support prioritaire 24/7"
    }
  };

  // Fonction appelée lors du clic sur un bouton "Choisir cette offre"
  function choisirOffre(typeOffre) {
    const selectSujet = document.getElementById('subject');
    const textareaMessage = document.getElementById('message');

    if (offresDetails[typeOffre]) {
      // 1. Sélectionne automatiquement la bonne option dans le menu déroulant
      selectSujet.value = typeOffre;

      // 2. Remplit automatiquement la zone de message avec les points inclus dans l'offre
      textareaMessage.value = offresDetails[typeOffre].details;
    }
  }