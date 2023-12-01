window.addEventListener('load', function () {
  audio = document.getElementById('audio');
  audio.play();
});

var jugadores = JSON.parse(localStorage.getItem("Jugador"));

function agregarJugadoresEnCajas() {
  if (jugadores) {
    jugadores.sort(function (jugadorActual, siguienteJugador) {
      return siguienteJugador.puntuacion - jugadorActual.puntuacion;
    });
    
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
          break;
      }

      var caja = document.getElementById(cajaId);
      caja.appendChild(jugadorElemento);
    });
  }
}

agregarJugadoresEnCajas();
