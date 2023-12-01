var agujeros;
var elemento;
var mensaje;
window.onload = function () {
  audio = document.getElementById('audio');
  audio.play();
  audio.volume = 0.2;
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
  mensaje = document.getElementById('tiempo');
  if (mensaje.style.visibility == 'visible') {
    mensaje.style.visibility = 'hidden';
  }
  iniciarTemporizador();
  document.getElementById("boton").disabled = true;
  var tiempoRandom = Math.round(Math.random() * (1100 - 900) + 900);
  var intervalo = setInterval(function () {
    var agujeroRandom = seleccionarAgujeroAleatorio();

    if (!AgujeroVacio(agujeros[agujeroRandom])) {
      puntuacionActual = puntuacion;
      elegirElemento();
      agujeros[agujeroRandom].appendChild(elemento);
    }

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      document.getElementById("boton").disabled = false;
      document.getElementById("boton").style.display='none';
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
      document.getElementById("reiniciar").style.visibility = "visible";
    }
  }, 1500);
}

var altElemento;

function elegirElemento() {
  var elementoRandom = Math.floor(Math.random() * 10.0);

  if (elementoRandom >= 0 && elementoRandom <= 1.5) {
    elemento.src = "imgs/topo.png";
    elemento.alt = "Topo";
    elemento.id = "elemento";
    punto = 1;
  } else if (elementoRandom > 1.5 && elementoRandom <= 3.25) {
    elemento.src = "imgs/familia.png";
    elemento.alt = "Familia";
    elemento.id = "elemento";
    punto = 3;
  } else if (elementoRandom > 3.25 && elementoRandom <= 5) {
    elemento.src = "imgs/topoConCasco.png";
    elemento.alt = "TopoCasco";
    elemento.id = "elemento";
    punto = 0;
  } else if (elementoRandom > 5 && elementoRandom <= 7) {
    elemento.src = "imgs/bomba.png";
    elemento.alt = "Bomba";
    elemento.id = "elemento";
    punto = -3;
  } else if (elementoRandom > 7 && elementoRandom <= 8) {
    elemento.src = "imgs/bombaDorada.png";
    elemento.alt = "BombaDorada";
    elemento.id = "elemento";
    punto = -6;
  } else {
    elemento.src = "imgs/topoDorado.png";
    elemento.alt = "TopoDorado";
    elemento.id = "elemento";
    punto = 6;
  }
  altElemento = elemento.alt;
}



function sumarPuntuacion(e) {
  if (puntuacion == puntuacionActual) {
    puntuacion += punto;
    document.getElementById("puntuacion").innerText = puntuacion;
    elemento.parentElement.removeChild(elemento);
    if (altElemento == "BombaDorada" || altElemento == "Bomba") {
      audioBomba = document.getElementById('audioBomba');
      audioBomba.play();
      audioBomba.volume += 0.5;
    } else {
      audioTopo = document.getElementById('audioTopo');
      audioTopo.play();
      audioTopo.volume += 0.5;
    }
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
      mensaje = document.getElementById('tiempo');
      mensaje.style.visibility = 'visible';
      document.getElementById("boton").disabled = false;
    }
  }, 1000);
}

function guardarPuntuacion(usuario) {
  var jugadores = JSON.parse(localStorage.getItem('Jugador')) || [];
  jugadores.push(usuario);
  localStorage.setItem('Jugador', JSON.stringify(jugadores));
}
