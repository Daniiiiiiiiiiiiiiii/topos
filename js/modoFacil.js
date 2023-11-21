var agujeros;
var topo;
var acabado;
window.onload = function () {
    agujeros = document.querySelectorAll('.agujero');

    document.getElementById("boton").addEventListener("click", jugar);

    topo = document.createElement("img");
    topo.src = "imgs/topo.png";
    topo.alt = "Topo";
    topo.id = "elemento";
    topo.addEventListener('click', sumarPuntuacion)
};

var puntuacion = 0;
var tiempoRestante = 5;
var puntuacionActual = 0;

function jugar() {
    iniciarTemporizador();
    document.getElementById("boton").disabled = true;
    var tiempoRandom = Math.round(Math.random() * (1500 - 1300) + 1300);
    var intervalo = setInterval(function () {
        acabado = false;
        var agujeroRandom = seleccionarAgujeroAleatorio();

<<<<<<< HEAD
        if (!AgujeroVacio(agujeros[agujeroRandom])) {
            puntuacionActual = puntuacion;
            agujeros[agujeroRandom].appendChild(topo);
=======
            if (!AgujeroVacio(agujeros[agujeroRandom])) {
                puntuacionActual = puntuacion;
                agujeros[agujeroRandom].appendChild(topo);
            }

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                alert("¡Tiempo agotado!");
                document.getElementById("boton").disabled = false;
                topo.removeEventListener('click', sumarPuntuacion);

            }
        }, tiempoRandom);
    }

    function sumarPuntuacion(e) {
        if(puntuacion == puntuacionActual){
            puntuacion++;
            document.getElementById("puntuacion").innerText = puntuacion;
            topo.parentElement.removeChild(topo);
        }
    }


    function seleccionarAgujeroAleatorio() {
        return Math.floor(Math.random() * agujeros.length);
    }

    function AgujeroVacio(agujero) {
        var tieneTopo = false;
        var imagen = agujero.querySelector('img');
        
        if (imagen) {
            tieneTopo = imagen.alt === 'Topo';
>>>>>>> 35eb8091222a2c517a732ee2030e6884db5ec08c
        }

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            alert("¡Tiempo agotado!");
            document.getElementById("boton").disabled = false;
            topo.removeEventListener('click', sumarPuntuacion);
            var puntuacionFinal = puntuacion;
            puntuacion = 0;
            localStorage.setItem('Puntuacion', puntuacionFinal);
            let usuario =
            {
                "nombre": localStorage.getItem('nombreUsuario'),
                "dificultad": localStorage.getItem('dificultad'),
                "puntuacion": puntuacionFinal
            };
            guardarPuntuacion();
        }
    }, tiempoRandom);
}

function sumarPuntuacion(e) {
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
    var tieneTopo = false;
    var imagen = agujero.querySelector('img');

    if (imagen) {
        tieneTopo = imagen.alt === 'Topo';
    }

    return tieneTopo;
}

<<<<<<< HEAD
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

function guardarPuntuacion() {

}
=======
    function reiniciarJuego(){
        tiempoRestante = 60;
        puntuacion = 0;
        puntuacionActual = 0;
        document.getElementById("puntuacion").innerText = puntuacion;
    }

    function iniciarTemporizador() {
        var temporizador = setInterval(function () {
            tiempoRestante--;
            actualizarTemporizador();

            if (tiempoRestante <= 0) {
                clearInterval(temporizador);
                alert("¡Tiempo agotado!");
                document.getElementById("boton").disabled = false;
                reiniciarJuego();
            }
        }, 1000);
    }
>>>>>>> 35eb8091222a2c517a732ee2030e6884db5ec08c
