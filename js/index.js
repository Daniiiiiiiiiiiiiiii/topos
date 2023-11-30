function guardarEnLocalStorage(nombre, valor) {
  localStorage.setItem(nombre, valor);
}

function cargarPagina() {
  audio = document.getElementById("audio");
  audio.play();

  const formularioJuego = document.getElementById("formularioJuego");

  formularioJuego.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombreUsuario = document.getElementById("nombre").value;
    const dificultad = document.getElementById("dificultad").value;

    guardarEnLocalStorage("nombreUsuario", nombreUsuario);
    guardarEnLocalStorage("dificultad", dificultad);
    window.location.href = "aplastaElTopo.html";
  });
}

window.onload = cargarPagina;
