// Mémorise les réglages d'accessibilité (thème, taille du texte) : le CSS seul
// les perdrait au rechargement. Les radios restent la source de vérité du CSS.
const panneau = document.getElementById("a11y");
const radios = panneau.querySelectorAll("input[type=radio]");
try {
  const saved = JSON.parse(localStorage.getItem("a11y") || "{}");
  radios.forEach((r) => { if (saved[r.name] === r.id) r.checked = true; });
  panneau.addEventListener("change", () => {
    const s = {};
    radios.forEach((r) => { if (r.checked) s[r.name] = r.id; });
    localStorage.setItem("a11y", JSON.stringify(s));
  });
} catch { /* stockage indisponible : les réglages restent valables pour la session */ }

// Billetterie : un lien « Choisir » (reservation.html#pass-…) coche le pass visé.
const pass = location.hash && document.querySelector(`${location.hash} input`);
if (pass) pass.checked = true;

// Menu burger (mobile) : un clic sur un lien referme le popover (sans effet sur desktop).
const menu = document.getElementById("menu");
menu.addEventListener("click", (e) => { if (e.target.closest("a")) menu.hidePopover(); });
