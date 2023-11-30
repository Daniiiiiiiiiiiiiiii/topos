document.addEventListener("DOMContentLoaded", function () {
  const dificultad = localStorage.getItem("dificultad");

  let modo = "";
  switch (dificultad) {
    case "facil":
      modo = "js/modoFacil.js";
      break;
    case "media":
      modo = "js/modoMedio.js";
      break;
    case "dificil":
      modo = "js/modoDificil.js";
      break;
    default:
      modo = "js/modoFacil.js";
  }
  const script = document.createElement("script");
  script.src = modo;
  document.body.appendChild(script);
});
