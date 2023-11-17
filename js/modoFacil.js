var agujeros;
    var topo;
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
    var tiempoRestante = 60;
    var puntuacionActual = 0;

    function jugar() {
        iniciarTemporizador();
        document.getElementById("boton").disabled = true;

        var intervalo = setInterval(function () {
            var agujeroRandom = seleccionarAgujeroAleatorio();

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
        }, 1500);
    }

    function sumarPuntuacion(e) {
        if(puntuacion == puntuacionActual){
            puntuacion++;
            document.getElementById("puntuacion").innerText = puntuacion;
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