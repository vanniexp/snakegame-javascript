
let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
let pathImg = 'img/snakeHeadRight.png'; //Cria a cabeça da cobrinha
let scoreValue = 0;

snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){

    for(i = 0; i < snake.length; i++){
        

        let oImg = new Image();
        oImg.src = pathImg;

        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            context.drawImage(oImg, snake[i].x, snake[i].y, box, box)
        } else {
            context.fillStyle = "#29A05F";
            context.fillRect(snake[i].x, snake[i].y, box, box);          
        }
    }
}

function drawFood (){
    context.fillStyle = "red";
    // let maca = document.getElementById("maca");
    // context.fillRect(food.x, food.y, box, box);
    let pathImg = 'img/maca.png';
    let oImg = new Image();
    oImg.src = pathImg;

    context.drawImage(oImg, food.x, food.y, box - 5, box - 5)

}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            // alert('Game Over');
            // context.font = '';
            context.font = "110px Arial";
            context.fillText('Oieee', 10, 50)
            console.log('Perdeu, se ferrou')
            document.getElementById('id01').style.display='block'
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") {
        snakeX += box
        pathImg = 'img/snakeHeadRight.png';
    }; //aqui
    if(direction == "left") {
        snakeX -= box
        pathImg = 'img/snakeHeadLeft.png';
    };
    if (direction == "up") {
        snakeY -= box
        pathImg = 'img/snakeHeadUp.png';
    };
    if(direction == "down") {
        snakeY += box
        pathImg = 'img/snakeHeadDown.png';
    };

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        scoreValue += 10;
        document.getElementById('score').innerHTML = scoreValue;
        
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);