//Creacion de algunas variables

let tarjetasDestapadas = 0;
let tarjeta1;
let tarjeta2;
let primerResultado;
let segundoResultado;
let movimientos = 0;
let aciertos = 0;
let tiempo = 30;
let mostrarTiempo = document.getElementById("tiempo");
let intervalo;
let temporizador = false;
let tiempoInicial = tiempo;
let banderin = false;
let nombreUsuario = document.getElementById("usuario");
let error = document.getElementById("error");
let boton = document.getElementById("botonEnviar");
let dataJuegoJSON;
let historialPartidas = [];
let arrayPartidas = [];
let botonTema = document.getElementById("oscuro");
let sonido = document.getElementById("cancion");
let botonMusica = document.getElementById("btnMusica")
let mostrarMovimientos = document.getElementById("movimientos");
let mostarAciertos = document.getElementById("aciertos");

// Creacion de numeros aleatorios

let numerosAletorios = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numerosAletorios = numerosAletorios.sort(()=>{return aletorio()});

function aletorio() {
    if (Math.random() > 0.5) { 
        return 1;
    }else{
        return -1
    }
}


// Creacion de la funcion para darle play al contador

boton.addEventListener("click",function(){
    if (nombreUsuario.value != "") {
        temporizador = false
        banderin = true;
        clearInterval(intervalo);
        tiempo = 30;
        mostrarTiempo.innerHTML = "Tiempo: " + tiempo + " segundos";
    }else{
        banderin = false;
        clearInterval(intervalo);
        tiempo = 30;
        mostrarTiempo.innerHTML = "Tiempo: " + tiempo + " segundos";
    }
})

// Creacion de la funcion para poder desabilitar las funciones y mostrar todas las cartas

function desabilitarTarjetas() {
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src='./imagenes/${numerosAletorios[i]}.png'>`;
        tarjetaBloqueada.disabled = true;
    }
}

// Creacion de la funcion que va a contabilizar el tiempo 

function contarTiempo() {
    intervalo = setInterval(function(){
        tiempo --;
        mostrarTiempo.innerHTML = "Tiempo: " + tiempo + " segundos";
        if (tiempo == 0) {
            clearInterval(intervalo);
            mostrarTiempo.innerHTML = "Tiempo: Se termino el tiempo" ;
            desabilitarTarjetas();
        }
    },1000)
}

// Creacion de la funcion que va a destapar una carta

function destapar(id) {
    if (banderin) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas ++;
    console.log(tarjetasDestapadas);
    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numerosAletorios[id];
        tarjeta1.innerHTML = `<img src='./imagenes/${primerResultado}.png'>`;

        tarjeta1.disabled = true
    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numerosAletorios[id];
        tarjeta2.innerHTML = `<img src='./imagenes/${segundoResultado}.png'>`;

        tarjeta2.disabled = true
        movimientos++;
        mostrarMovimientos.innerHTML = "Movimientos: " + movimientos ;

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos ++;
            mostarAciertos.innerHTML = "Aciertos: " + aciertos;

            if (aciertos == 8) {
                mostarAciertos.innerHTML = "Completado";
                clearInterval(intervalo);
                mostrarTiempo.innerHTML = "Fantastico te demoraste " + (tiempoInicial - tiempo)  + " segundos";

                const dataJuego = {
                    nombre : nombreUsuario.value,
                    movimientos : movimientos
                }
                historialPartidas = JSON.parse(localStorage.getItem("historialPartidas")) || []
                historialPartidas.push(dataJuego);
                historialPartidas.sort((a,b)=>   a.movimientos - b.movimientos)
                localStorage.setItem("historialDePartidas", JSON.stringify(historialPartidas));
                console.log(historialPartidas);
            }
        }else {
           setTimeout(function(){
            tarjeta1.innerHTML = " ";
            tarjeta2.innerHTML = " ";
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
           },700)
        }
    }
}else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Para empezar a jugar debes de colocar tu nombre de usuario",
      });

}
}

// Creacion de algunas variable y la creacion de la funcion modo oscuro

const sc1 = document.querySelector(".seccion1")
const sc2 = document.querySelector(".seccion2");
const sc3 = document.querySelector(".seccion3");
const labl = document.querySelector(".label");
const scf = document.querySelector(".seccionFetch");

botonTema.addEventListener("click",function(){
    document.body.classList.toggle("modo-oscuro");
    sc1.classList.toggle("modo-oscuro-section")
    sc2.classList.toggle("modo-oscuro-section")
    sc3.classList.toggle("modo-oscuro-section")
    scf.classList.toggle("modo-oscuro-section")
    labl.classList.toggle("label-oscuro")

    if (document.body.classList.contains("modo-oscuro")) {
        botonTema.innerText = "Modo luminoso"
        localStorage.setItem("modo-oscuro", true);
        localStorage.setItem("modo-oscuro-section",true)
        localStorage.setItem("label-oscuro",true)
    }else{
        botonTema.innerText = "Modo oscuro"
        localStorage.setItem("modo-oscuro", false);
        localStorage.setItem("modo-oscuro-section",false)
        localStorage.setItem("label-oscuro",false)
    }

})

let valorStorage = localStorage.getItem("modo-oscuro");
valorStorage = valorStorage === "true";


if (valorStorage) {
    document.body.classList.add("modo-oscuro");
    sc1.classList.add("modo-oscuro-section");
    sc2.classList.add("modo-oscuro-section");
    sc3.classList.add("modo-oscuro-section");
    scf.classList.add("modo-oscuro-section");
    labl.classList.add("label-oscuro")
    botonTema.innerText = "Modo luminoso"
}else{
    document.body.classList.remove("modo-oscuro");
    sc1.classList.remove("modo-oscuro-section");
    sc2.classList.remove("modo-oscuro-section");
    sc3.classList.remove("modo-oscuro-section");
    scf.classList.remove("modo-oscuro-section");
    labl.classList.remove("label-oscuro")
    botonTema.innerText = "Modo oscuro"
}

// Creacion de la funcion para reproducir la cancion o melodia de fondo

document.addEventListener("DOMContentLoaded",function() {
    botonMusica.addEventListener("click",function(){
        if(sonido.paused){
            sonido.play();
            botonMusica.innerText = "Pausar"
        }else{
            sonido.pause();
            botonMusica.innerHTML = "Reproducir Musica";
        }
    });

})

// Creacion de la funcion para poder consumir y mostrar los datos de la api SWAPI

const valoresApi = ["people/1","people/2","people/3","people/4","people/5","people/10","people/11","people/12","people/14","people/20","people/21"];

const numeroAleatorioEntre0y10 = function () {
    return Math.floor(Math.random() * 11);
}



fetch("https://swapi.dev/api/" + valoresApi[numeroAleatorioEntre0y10()])
    .then((res)=>{
        console.log(res);
        return res.json()
    
    })
    .then((data)=>{
        console.log(data)
        document.querySelector(".nombreFetch").innerHTML = data.name
        document.querySelector(".alturaFetch").innerHTML = "Altura: " + data.height + "cm"
        document.querySelector(".pesoFetch").innerHTML = "Peso: " + data.mass + "KG"
        if (data.hair_color == "blond") {
            document.querySelector(".colorPeloFetch").innerHTML = "Color de pelo: Rubio" 
        }else if(data.hair_color == "brown"){
            document.querySelector(".colorPeloFetch").innerHTML = "Color de pelo: Castaño"
        }else if(data.hair_color == "auburn, white"){
            document.querySelector(".colorPeloFetch").innerHTML = "Color de pelo: Castaño, blanco"
        }else if(data.hair_color == "auburn, grey"){
            document.querySelector(".colorPeloFetch").innerHTML = "Color de pelo: Castaño rojizo, gris"
        }else if(data.hair_color == "white"){
            document.querySelector(".colorPeloFetch").innerHTML = "Color de pelo: Blanco"
        }else if(data.hair_color == "grey"){
            document.querySelector(".colorPeloFetch").innerHTML = "Color de pelo: Gris"
        }else if(data.hair_color == "n/a" || data.hair_color == "none"){
            document.querySelector(".colorPeloFetch").innerHTML = "Color de pelo: No tiene pelo"
        }
        if (data.eye_color == "blue") {
            document.querySelector(".colorOjosFetch").innerHTML = "Color de ojos: Azules"
        }else if(data.eye_color == "yellow"){
            document.querySelector(".colorOjosFetch").innerHTML = "Color de ojos: Amarillos"
        }else if(data.eye_color == "red"){
            document.querySelector(".colorOjosFetch").innerHTML = "Color de ojos: Rojos"
        }else if(data.eye_color == "brown"){
            document.querySelector(".colorOjosFetch").innerHTML = "Color de ojos: Marrones"
        }else if(data.eye_color == "blue-gray"){
            document.querySelector(".colorOjosFetch").innerHTML = "Color de ojos: Gris azulado"
        }
        
        document.querySelector(".fechaNacFetch").innerHTML = "Fecha de nacimiento: " + data.birth_year
        if (data.gender == "male") {
            document.querySelector(".generoFetch").innerHTML = "Genero: Masculino"
        }else if(data.gender == "female"){
            document.querySelector(".generoFetch").innerHTML = "Genero: Femenino"
        }else if(data.gender == "n/a"){
            document.querySelector(".generoFetch").innerHTML = "Genero: No tiene genero"
        }
    })
    .catch((err)=>{
        console.log(err);
    })
    