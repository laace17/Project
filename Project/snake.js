const game_size = 20;
const area = 500;
const snake_body = "white";
const apples = new Image();
apples.src = "apple.png";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const restart = document.getElementById("restart");

let snake = [{x: 14, y: 10}, {x: 13, y: 10}, {x: 12, y: 10}, {x: 11, y: 10}, {x: 10, y: 10}];

let food = {x: 15, y: 10};
let dx = 0;
let dy = 0;
let score = 0;

let gameloop;

function Press(e){
    if(gameloop === undefined){
        gameloop = setInterval(gameProcess, 100);
    }

    const key = e.key;

    if(key === "ArrowUp" && dy !== -1){
        dx = 0;
        dy = -1;
    }
    else if(key === "ArrowDown" && dy !== 1){
        dx = 0;
        dy = 1;
    }
    else if(key === "ArrowLeft" && dx !== -1){
        dx = -1;
        dy = 0;
    }
    else if(key === "ArrowRight" && dx !== 1){
        dx = 1;
        dy = 0;
    }    
}

function gameProcess(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    if(head.x < 0 || head.x >= area / game_size || head.y < 0 || head.y >= area / game_size){
        gameOver();
        return; 
    }

    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === head.x && snake[i].y === head.y){
            gameOver();
            return; 
        }
    }

    snake.unshift(head);

    if(head.x === food.x && head.y === food.y){
        score += 10;
        generateApples();
    }
    else{
        snake.pop();
    }
    
    ctx.clearRect(0, 0, area, area);

    drawSnake();

    drawApples();
}

function drawSnake(){
    snake.forEach((segment, index) => {
        if(index === 0){
            ctx.fillStyle = "darkblue";
        }
        else{
            ctx.fillStyle = snake_body;
        }
        ctx.fillRect(
            segment.x * game_size, 
            segment.y * game_size, 
            game_size, 
            game_size
        );
    });
}

function drawApples(){
    ctx.drawImage(apples, food.x * game_size, food.y * game_size, game_size, game_size);
}

function generateApples(){
    food = {x: Math.floor(Math.random() * (area / game_size)), y: Math.floor(Math.random() * (area / game_size))};
}

function gameOver(){
    clearInterval(gameloop);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 180, 120);
    ctx.fillText(`Score:  ${score}`, 200, 170);
}

generateApples();

document.addEventListener('keydown', Press);