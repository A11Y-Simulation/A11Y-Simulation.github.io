
// // Sélectionner les éléments du DOM
// let mobileNavBtn = document.getElementById("mobile-nav-btn");
// let mobileNav = document.getElementById("mobile-nav");
// let button = document.getElementById('toggleButton');
// let content = document.getElementById('content');

// // Définir une fonction générique pour basculer l'attribut aria-expanded
// function toggleExpanded(element) {
//   var isExpanded = element.getAttribute('aria-expanded') === 'true';
//   element.setAttribute('aria-expanded', !isExpanded);
// }

// // Ajouter un écouteur d'événements au bouton de navigation mobile
// mobileNavBtn.addEventListener("click", function () {
//   // Basculer la classe active sur le menu mobile
//   mobileNav.classList.toggle("active");
//   // Basculer l'attribut aria-expanded sur le bouton de navigation mobile
//   toggleExpanded(mobileNavBtn);
// });

// // Ajouter un écouteur d'événements au bouton de basculement
// button.addEventListener('click', function () {
//   // Basculer l'attribut aria-expanded sur le bouton de basculement
//   toggleExpanded(button);
//   // Basculer l'affichage du contenu
//   content.style.display = content.style.display === 'block' ? 'none' : 'block';
//   // Basculer le texte du bouton de basculement
//   // button.textContent = button.textContent === 'Afficher le contenu' ? 'Masquer le contenu' : 'Afficher le contenu';
// });
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
