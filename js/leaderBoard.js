window.addEventListener('load',function (){
  audio = document.getElementById('audio');
  audio.play();
});

var jugadores = JSON.parse(localStorage.getItem("Jugador"));
console.log(jugadores);

function agregarJugadoresEnCajas() {
  if (jugadores) {
    jugadores.forEach(function (jugador) {
      var jugadorElemento = document.createElement("div");
      jugadorElemento.id = 'jugador';
      jugadorElemento.textContent = jugador.nombre + " ... " + jugador.puntuacion;

      var cajaId = "";
      switch (jugador.dificultad) {
        case "facil":
          cajaId = "facil";
          break;
        case "media":
          cajaId = "media";
          break;
        case "dificil":
          cajaId = "dificil";
          break;
        default:
          console.log("no funciona");
          break;
      }

      var caja = document.getElementById(cajaId);
      caja.appendChild(jugadorElemento);
    });
  } else {
    console.log("no entra jugadores...");
  }
}
agregarJugadoresEnCajas();
