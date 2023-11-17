var agujeros;
    var topo;
    window.onload = function () {
        agujeros = document.querySelectorAll('.agujero');

        document.getElementById("boton").addEventListener("click", jugar);

        elemento = document.createElement("img");
        elemento.addEventListener('click', sumarPuntuacion)
        
    };

    var puntuacion = 0;
    var tiempoRestante = 60;
    var puntuacionActual = 0;
    var punto = 0;

    function jugar() {
        iniciarTemporizador();
        document.getElementById("boton").disabled = true;

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
                elemento.removeEventListener('click', sumarPuntuacion);

            }
        }, 1500);
    }

    function elegirElemento(){
        var elementoRandom = Math.floor(Math.random() * 10.00);

        if( elementoRandom >= 0 && elementoRandom <= 4){
            elemento.src = "imgs/topo.png";
            elemento.alt = "Topo";
            elemento.id = "elemento";
            punto = 1;
        } else if(elementoRandom > 4 && elementoRandom <= 5.5){//familia topo
            elemento.src = "imgs/topoDorado.png";
            elemento.alt = "Topo";
            elemento.id = "elemento";
            punto = 3;
        } else if(elementoRandom > 5.5 && elementoRandom <= 7){//con casco
            elemento.src = "imgs/topoMoviendose.png";
            elemento.alt = "Topo";
            elemento.id = "elemento";
            punto = 0;
        } else{
            elemento.src = "imgs/bomba.png";
            elemento.alt = "Bomba";
            elemento.id = "elemento";
            punto = -3;
        }
        
    }

    function sumarPuntuacion(e) {
        if(puntuacion == puntuacionActual){
            puntuacion += punto;
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