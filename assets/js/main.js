
// Sélectionner les éléments du DOM
let mobileNavBtn = document.getElementById("mobile-nav-btn");
let mobileNav = document.getElementById("mobile-nav");
let button = document.getElementById('toggleButton');
let content = document.getElementById('content');

// Définir une fonction générique pour basculer l'attribut aria-expanded
function toggleExpanded(element) {
  var isExpanded = element.getAttribute('aria-expanded') === 'true';
  element.setAttribute('aria-expanded', !isExpanded);
}

// Ajouter un écouteur d'événements au bouton de navigation mobile
mobileNavBtn.addEventListener("click", function () {
  // Basculer la classe active sur le menu mobile
  mobileNav.classList.toggle("active");
  // Basculer l'attribut aria-expanded sur le bouton de navigation mobile
  toggleExpanded(mobileNavBtn);
});

// Ajouter un écouteur d'événements au bouton de basculement
button.addEventListener("click", function () {
  // Basculer l'attribut aria-expanded sur le bouton de basculement
  toggleExpanded(button);
  // Basculer l'affichage du contenu
  content.style.display = content.style.display === 'block' ? 'none' : 'block';
  // Basculer le texte du bouton de basculement
  // button.textContent = button.textContent === 'Afficher le contenu' ? 'Masquer le contenu' : 'Afficher le contenu';
});

// Ajouter un attribut tabindex aux éléments focusables
mobileNavBtn.setAttribute("tabindex", "0");
button.setAttribute("tabindex", "0");

// Ajouter un écouteur d'événements au clavier sur les éléments focusables
mobileNavBtn.addEventListener("keydown", function (event) {
  // Si la touche Entrée ou Espace est pressée
  if (event.key === "Enter" || event.key === " ") {
    // Simuler un clic sur l'élément
    mobileNavBtn.click();
    // Empêcher le comportement par défaut du navigateur
    event.preventDefault();
  }
});

button.addEventListener("keydown", function (event) {
  // Si la touche Entrée ou Espace est pressée
  if (event.key === "Enter" || event.key === " ") {
    // Simuler un clic sur l'élément
    button.click();
    // Empêcher le comportement par défaut du navigateur
    event.preventDefault();
  }
});


//ACCORDEON

// Convertit la NodeList en tableau pour faciliter le traitement
Array.from(document.querySelectorAll('.Accordion')).forEach(function (accordion) {
  // Permet à plusieurs sections de l'accordéon d'être étendues simultanément
  var allowMultiple = accordion.hasAttribute('data-allow-multiple');
  // Permet à chaque basculement d'ouvrir et de fermer individuellement
  var allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');
  // Crée le tableau d'éléments de basculement pour le groupe d'accordéons
  var triggers = Array.from(accordion.querySelectorAll('.Accordion-trigger'));
  var panels = Array.from(accordion.querySelectorAll('.Accordion-panel'));

  // Gère l'événement de clic sur l'accordéon
  accordion.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('Accordion-trigger')) {
      // Vérifie si le basculement actuel est étendu.
      var isExpanded = target.getAttribute('aria-expanded') === 'true';
      var active = accordion.querySelector('[aria-expanded="true"]');

      // Sans allowMultiple, ferme l'accordéon ouvert
      if (!allowMultiple && active && active !== target) {
        // Définit l'état étendu sur l'élément de déclenchement
        active.setAttribute('aria-expanded', 'false');
        // Masque les sections de l'accordéon, en utilisant aria-controls pour spécifier la section désirée
        document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');

        // Lorsque le basculement n'est pas autorisé, nettoie l'état désactivé
        if (!allowToggle) {
          active.removeAttribute('aria-disabled');
        }

        // Ajoute la logique de défilement ici
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (!isExpanded) {
        // Définit l'état étendu sur l'élément de déclenchement
        target.setAttribute('aria-expanded', 'true');
        // Masque les sections de l'accordéon, en utilisant aria-controls pour spécifier la section désirée
        document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');

        // Si le basculement n'est pas autorisé, définit l'état désactivé sur le déclencheur
        if (!allowToggle) {
          target.setAttribute('aria-disabled', 'true');
        }

        // Ajoute la logique de défilement ici
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (allowToggle && isExpanded) {
        // Définit l'état étendu sur l'élément de déclenchement
        target.setAttribute('aria-expanded', 'false');
        // Masque les sections de l'accordéon, en utilisant aria-controls pour spécifier la section désirée
        document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');

        // Ajoute la logique de défilement ici
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      event.preventDefault();
    }
  });

  // Gère les comportements du clavier sur le conteneur principal de l'accordéon
  accordion.addEventListener('keydown', function (event) {
    var target = event.target;
    var key = event.which.toString();
    var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

    // Vient-il de l'en-tête de l'accordéon ?
    if (target.classList.contains('Accordion-trigger')) {
      // Opérations clavier Haut/Bas et Contrôle + Page Haut/Page Bas
      // 38 = Haut, 40 = Bas
      if (key.match(/38|40/) || ctrlModifier) {
        var index = triggers.indexOf(target);
        var direction = (key.match(/34|40/)) ? 1 : -1;
        var length = triggers.length;
        var newIndex = (index + length + direction) % length;
        triggers[newIndex].focus();
        event.preventDefault();
      } else if (key.match(/35|36/)) {
        // 35 = Fin, 36 = Début des opérations clavier
        switch (key) {
          // Aller au premier accordéon
          case '36':
            triggers[0].focus();
            break;
          // Aller au dernier accordéon
          case '35':
            triggers[triggers.length - 1].focus();
            break;
        }
        event.preventDefault();
      }
    } else if (ctrlModifier) {
      // Opérations clavier Contrôle + Page Haut/Page Bas
      // Capture les événements qui se produisent à l'intérieur des panneaux
      panels.forEach(function (panel, index) {
        if (panel.contains(target)) {
          triggers[index].focus();
          event.preventDefault();
        }
      });
    }
  });

  // Configuration mineure : définira l'état désactivé, via aria-disabled, sur
  // un accordéon étendu/actif qui ne peut pas être basculé pour être fermé
  if (!allowToggle) {
    // Obtient le premier accordéon étendu/actif
    var expanded = accordion.querySelector('[aria-expanded="true"]');
    // Si un accordéon étendu/actif est trouvé, le désactive
    if (expanded) {
      expanded.setAttribute('aria-disabled', 'true');
    }
  }
});

