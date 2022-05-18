const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');
//Inicializar Canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

//Dibujo del hombre del ahorcado
const bodyParts = [
    [4,2,1,1], //cabeza
    [4,3,1,2], //torso
    [3,5,1,1], 
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1],
];

//Declaramos variables
let selectedWord;
let usedLetters;
let errores;
let aciertos;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElement.appendChild(letterElement);
}

//Declaramos las partes del cuerpo
const addBodyPart = bodyPart => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(...bodyPart);
};

//Cuando Ingresas una letra equivocada
const wrongLetter = () => {
    addBodyPart(bodyParts[errores]);
    errores++;
    if(errores === bodyParts.length) endGame();
}

//Finalizar el juego
const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
}

const correctLetter = letter => {
    const { children } =  wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            aciertos++;
        }
    }
    if(aciertos === selectedWord.length) endGame();
}

//cuando el usuario ingresa una letra
const letterInput = letter =>{
    if(selectedWord.includes(letter)) {
        correctLetter(letter);
    } else {
        wrongLetter(letter);
    }
    addLetter(letter);
    usedLetters.push(letter);
}

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) { //
        letterInput(newLetter);
    };
};

const drawWord = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement ('span');
        letterElement.innerHTML = letter.toUpperCase(); //contenido sea una letra en mayuscula
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden'); //para que no se vea las letras
        wordContainer.appendChild(letterElement);
        
    });
};

//Seleccionamos Palabras aleatorias
const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
};

const drawHombre = () =>{
  ctx.canvas.width = 120;
  ctx.canvas.height = 160;
  ctx.scale(20, 20);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#d95d39';  
  ctx.fillRect(0, 7, 4, 1);  //arma el soporte
  ctx.fillRect(1, 0, 1, 8);
  ctx.fillRect(2, 0, 3, 1);
  ctx.fillRect(4, 1, 1, 1);

}

//Limpia el juego
const startGame = () => {
    usedLetters = [];
    errores = 0;
    aciertos = 0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none'; //esconde el boton al clickearlo
    drawHombre();
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

startButton.addEventListener('click', startGame);


const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const slider = document.getElementById('slider');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

slider.addEventListener('click', ()  => {
    let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme(switchToTheme);
});

setTheme(localStorage.getItem('theme') || preferedColorScheme);