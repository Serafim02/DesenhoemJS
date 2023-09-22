let canvas = document.getElementById("canvas");
let contexto = canvas.getContext("2d");
let desenhando = false;

contexto.lineWidth = 20;

canvas.addEventListener("mousedown", function (event) {
    desenhando = true;
    contexto.beginPath();
    contexto.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
});

canvas.addEventListener("mousemove", function (event) {
    if (desenhando) {
        contexto.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        contexto.strokeStyle = cor; // Defina a cor da linha antes de traçar
        contexto.stroke();
    }
});

canvas.addEventListener("mouseup", function () {
    desenhando = false;
});

// Crie um elemento para exibir a paleta de cores
let colorPalette = document.createElement("input");
colorPalette.type = "color";
document.body.appendChild(colorPalette);

let cor = "#000000"; // Cor inicial

// Adicione um ouvinte de mudança à paleta de cores
colorPalette.addEventListener("input", function (event) {
    cor = event.target.value; // Atualize a cor selecionada
});

let fillButton = document.querySelector('#fillButton');
let imageData;

fillButton.addEventListener('click', () => {
    fillButton.style.cursor = 'crosshair';
});

function preencherArea(x, y) {
    
    contexto.save();
    
    
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    let tempContext = tempCanvas.getContext('2d');
    
    
    tempContext.drawImage(canvas, 0, 0);
    
    
    let pixel = tempContext.getImageData(x, y, 1, 1).data;
    
    
    function coresIguais(c1, c2) {
        return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
    }
    
    
    function preencher(x, y) {
        if (x < 0 || x >= tempCanvas.width || y < 0 || y >= tempCanvas.height) {
            return;
        }

        let pixelAtual = tempContext.getImageData(x, y, 1, 1).data;
        if (!coresIguais(pixelAtual, pixel) || coresIguais(pixelAtual, contexto.strokeStyle)) {
            return;
        }

        tempContext.fillStyle = cor;
        tempContext.fillRect(x, y, 1, 1);


        preencher(x + 1, y);
        preencher(x - 1, y);
        preencher(x, y + 1);
        preencher(x, y - 1);
    }

    preencher(x, y);


    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.drawImage(tempCanvas, 0, 0);


    contexto.restore();
}