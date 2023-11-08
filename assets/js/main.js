let mobileNavBtn = document.getElementById("mobile-nav-btn");
let mobileNav = document.getElementById("mobile-nav");

mobileNavBtn.addEventListener("click", function () {
  if (mobileNav.hasAttribute("class")) {
    mobileNav.removeAttribute("class");
  } else {
    mobileNav.setAttribute("class", "active");
  }
});

var button = document.getElementById('toggleButton');
var content = document.getElementById('content');

button.addEventListener('click', function () {
  var isExpanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isExpanded);
  content.style.display = isExpanded ? 'none' : 'block';
  // button.textContent = isExpanded ? 'Afficher le contenu' : 'Masquer le contenu';
});