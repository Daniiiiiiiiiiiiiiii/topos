var agujeros;
var elemento;
window.onload = function () {
  agujeros = document.querySelectorAll(".agujero");

  document.getElementById("boton").addEventListener("click", jugar);

  elemento = document.createElement("img");
  elemento.addEventListener("click", sumarPuntuacion);
};

var puntuacion = 0;
var tiempoRestante = 60;
var puntuacionActual = 0;
var punto = 0;

function jugar() {
  iniciarTemporizador();
  document.getElementById("boton").disabled = true;
  var tiempoRandom = Math.round(Math.random() * (1300 - 1100) + 1100);
  var intervalo = setInterval(function () {
    var agujeroRandom = seleccionarAgujeroAleatorio();

    if (!AgujeroVacio(agujeros[agujeroRandom])) {
      puntuacionActual = puntuacion;
      elegirElemento();
      agujeros[agujeroRandom].appendChild(elemento);
    }

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      alert("¡Tiempo agotado!");
      document.getElementById("boton").disabled = false;
      elemento.removeEventListener("click", sumarPuntuacion);
      var puntuacionFinal = puntuacion;
      puntuacion = 0;
      localStorage.setItem("Puntuacion", puntuacionFinal);
      let usuario = {
        nombre: localStorage.getItem("nombreUsuario"),
        dificultad: localStorage.getItem("dificultad"),
        puntuacion: puntuacionFinal,
      };
      guardarPuntuacion(usuario);
    }
  }, tiempoRandom);
}

function elegirElemento() {
  var elementoRandom = Math.floor(Math.random() * 10.0);

  if (elementoRandom >= 0 && elementoRandom <= 4) {
    elemento.src = "imgs/topo.png";
    elemento.alt = "Topo";
    elemento.id = "elemento";
    punto = 1;
  } else if (elementoRandom > 4 && elementoRandom <= 5.5) {
    elemento.src = "imgs/Familia.png";
    elemento.alt = "Topo";
    elemento.id = "elemento";
    punto = 3;
  } else if (elementoRandom > 5.5 && elementoRandom <= 7) {
    elemento.src = "imgs/topoConCasco.png";
    elemento.alt = "Topo";
    elemento.id = "elemento";
    punto = 0;
  } else {
    elemento.src = "imgs/bomba.png";
    elemento.alt = "Bomba";
    elemento.id = "elemento";
    punto = -3;
  }
}

function sumarPuntuacion(e) {
  if (puntuacion == puntuacionActual) {
    puntuacion += punto;
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

/*function reiniciarJuego(){
        tiempoRestante = 60;
        puntuacion = 0;
        puntuacionActual = 0;
        document.getElementById("puntuacion").innerText = puntuacion;
    }*/

function iniciarTemporizador() {
  var temporizador = setInterval(function () {
    tiempoRestante--;
    actualizarTemporizador();

    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      alert("¡Tiempo agotado!");
      document.getElementById("boton").disabled = false;
      //reiniciarJuego();
    }
  }, 1000);
}

function guardarPuntuacion(usuario) {
  console.log('Guardando usuario:', usuario);
  var jugadores = JSON.parse(localStorage.getItem('Jugador')) || [];
  jugadores.push(usuario);
  localStorage.setItem('Jugador', JSON.stringify(jugadores));
}
