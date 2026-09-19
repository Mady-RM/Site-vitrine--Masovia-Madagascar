document.addEventListener("DOMContentLoaded", () => {
    const navlinks = document.querySelectorAll(".nav-link-custom");
    const allClickableLinks = document.querySelectorAll("a[href^='#']");
    const sections = document.querySelectorAll("section");

    // Elements du menu burger
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mainNav = document.getElementById("main-nav");

    // Ouverture du menu
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.add("show-nav");
        });
    }

    // Fermeture du menu via le bouton X
    if (menuClose && mainNav) {
        menuClose.addEventListener("click", () => {
            mainNav.classList.remove("show-nav");
        });
    }

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
            if (section.id.toLowerCase() === targetid.toLowerCase()) {
                section.classList.remove("d-none");

                if (targetid.toLowerCase() === "apropos") {
                    const elementsAnim = section.querySelectorAll('.anim-histoire, .anim-valeur');
                    elementsAnim.forEach(el => {
                        el.style.animation = 'none';
                        el.offsetHeight; // Reflow
                        el.style.animation = '';
                    });
                }

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

        navlinks.forEach(link => {
            const linkHref = link.getAttribute("href").replace("#", "").toLowerCase();
            if (linkHref === targetid.toLowerCase()) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        if (targetid.toLowerCase() === "accueil") {
            document.body.classList.remove("bg-fixed");
        } else {
            document.body.classList.add("bg-fixed");
        }
    }

    // 3. Gestion des clics sur les liens & fermeture automatique du menu mobile
    allClickableLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetid = this.getAttribute("href").replace("#", "");
            if (targetid) {
                ActiverSection(targetid);
            }
            
            // Referme le menu mobile au clic sur un lien
            if (mainNav && mainNav.classList.contains("show-nav")) {
                mainNav.classList.remove("show-nav");
            }
        });
    });

    // 4. Force l'affichage de l'Accueil au démarrage
    ActiverSection("accueil");
});

// Met à jour l'année automatiquement sur toutes les sections
document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
});

// Dictionnaire contenant les détails des offres
const offresDetails = {
    'vitrine': {
        nom: 'Site vitrine (600 000Ar)',
        details: "Bonjour,\nJe suis intéressé(e) par l'offre Site Vitrine (600 000Ar) comprenant :\n- Design de Logo\n- Charte Graphique\n- Cartes de Visite\n- Kit Réseaux Sociaux"
    },
    'sur-mesure': {
        nom: 'Développement sur mesure (650 000Ar)',
        details: "Bonjour,\nJe suis intéressé(e) par l'offre Développement sur mesure (650 000Ar) comprenant :\n- Design & logo\n- Cahier de charge\n- Charte graphique\n- Hébergement gratuit\n- Développement de A à Z\n- Maintenance gratuit 1 mois"
    },
    'ecommerce': {
        nom: 'Ecommerce (1 200 000Ar)',
        details: "Bonjour,\nJe suis intéressé(e) par l'offre Ecommerce (1 200 000Ar) comprenant :\n- Design & logo\n- Charte graphique\n- Hébergements gratuit\n- Mode de payement\n- Maintenance gratuit 1 mois"
    },
    'mobile': {
        nom: 'Développement mobile (3 000 000Ar)',
        details: "Bonjour,\nJe suis intéressé(e) par l'offre Développement mobile (3 000 000Ar) comprenant :\n- Déploiement sur Apple store & play store\n- Logo design\n- Charte graphique\n- Cahier de charge\n- Développement de A à Z\n- Maintenance gratuit 1 mois"
    }
};

function choisirOffre(typeOffre) {
    const selectSujet = document.getElementById('subject');
    const textareaMessage = document.getElementById('message');

    if (offresDetails[typeOffre]) {
        selectSujet.value = typeOffre;
        textareaMessage.value = offresDetails[typeOffre].details;
    }
}