var agujeros;
var topo;
var acabado;
window.onload = function () {
  audio = document.getElementById('audio');
  audio.play();
  audio.volume = 0.2;
  agujeros = document.querySelectorAll(".agujero");

  document.getElementById("boton").addEventListener("click", jugar);

  topo = document.createElement("img");
  topo.src = "imgs/topo.png";
  topo.alt = "Topo";
  topo.id = "elemento";
  topo.addEventListener("click", sumarPuntuacion);
};

var puntuacion = 0;
var tiempoRestante = 60;
var puntuacionActual = 0;

function jugar() {
  iniciarTemporizador();
  document.getElementById("boton").disabled = true;
  var tiempoRandom = Math.round(Math.random() * (1500 - 1300) + 1300);
  var intervalo = setInterval(function () {
    acabado = false;
    var agujeroRandom = seleccionarAgujeroAleatorio();

    if (!AgujeroVacio(agujeros[agujeroRandom])) {
      puntuacionActual = puntuacion;
      agujeros[agujeroRandom].appendChild(topo);
    }

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      alert("¡Tiempo agotado!");
      document.getElementById("boton").disabled = false;
      topo.removeEventListener("click", sumarPuntuacion);
      var puntuacionFinal = puntuacion;
      puntuacion = 0;
      localStorage.setItem("Puntuacion", puntuacionFinal);
      let usuario = {
        nombre: localStorage.getItem("nombreUsuario"),
        dificultad: localStorage.getItem("dificultad"),
        puntuacion: puntuacionFinal,
      };
      guardarPuntuacion(usuario);
      document.getElementById('reiniciar').style.visibility = 'visible';
    }
  }, tiempoRandom);
}

function sumarPuntuacion(e) {
  audioTopo = document.getElementById('audioTopo');
  audioTopo.play();
  audioTopo.volume += 0.5;
  if (puntuacion == puntuacionActual) {
    puntuacion++;
    document.getElementById("puntuacion").innerText = puntuacion;
    elemento.parentElement.removeChild(elemento);
  }
}

function seleccionarAgujeroAleatorio() {
  return Math.floor(Math.random() * agujeros.length);
}

function AgujeroVacio(agujero) {
  var tieneElemento = false;
  var imagen = agujero.querySelector("img");

  if (imagen) {
    tieneElemento = imagen.alt === "Elemento";
  }

  return tieneElemento;
}

function actualizarTemporizador() {
  document.getElementById("temporizador").innerText = tiempoRestante + "s";
}

function iniciarTemporizador() {
    var temporizador = setInterval(function () {
        tiempoRestante--;
        actualizarTemporizador();

        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            alert("¡Tiempo agotado!");
            document.getElementById("boton").disabled = false;
        }
    }, 1000);
}

function guardarPuntuacion(usuario) {
  console.log('Guardando usuario:', usuario);
  var jugadores = JSON.parse(localStorage.getItem('Jugador')) || [];
  jugadores.push(usuario);
  localStorage.setItem('Jugador', JSON.stringify(jugadores));
}
