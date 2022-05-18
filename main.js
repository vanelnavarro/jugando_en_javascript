let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;
class Usuario{
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

let usuarios = []
let formUsuario = document.querySelector('#formUsuario');

formUsuario.addEventListener('submit', (event) => {
    event.preventDefault()
    let nombre = document.querySelector("#idNombre").value
    let apellido = document.querySelector("#idApellido").value
    let edad = document.querySelector("#idEdad").value
    console.log(nombre)
    console.log(apellido)
    console.log(edad)

    const usuario = new Usuario(nombre, apellido, edad)
    usuarios.push(usuario)
    formUsuario.reset()
})

//Seleccionando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Como realizar numeros aleatorios
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);

//Funciones
function contarTiempo(){
   tiempoRegresivoId = setInterval(()=>{
       timer --;
       mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
       if(timer == 0){
        clearInterval(tiempoRegresivoId);
        bloquearTarjetas();
       }
   },1000); 
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numbers[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Función Principal
function descubrir(id){

    if(temporizador == false) {
      contarTiempo();  
      temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numbers[id]
        tarjeta1.innerHTML = numbers [id];

        //Deshabilitar el primer boton
        tarjeta1.disabled = true;
    }else if (tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbers [id];
        tarjeta2.innerHTML = segundoResultado;

        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        
        if(primerResultado == segundoResultado){
            tarjetasDestapadas = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} Lo Lograste!!!`;
                mostrarTiempo.innerHTML = `Perfecto! Solo tardaste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} Asi se hace!!!!`;
            }
        }else{
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },1000);
        }

    }

}