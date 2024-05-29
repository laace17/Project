const game_size = 20;
const height = 500;
const width = 700;
const snake_body = "white";
const apples = new Image();
apples.src = "apple.png";
const head = new Image();
head.src = "snake_head.png";
const body = new Image();
body.src = "snake_body.png";
const tail = new Image();
tail.src = "snake_tail.png";
const field = new Image();
field.src = "field_snake.jpg"


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const restart = document.getElementById("restart");

let snake = [{x: 14, y: 10}, {x: 13, y: 10}, {x: 12, y: 10}, {x: 11, y: 10}, {x: 10, y: 10}];

let food = {x: 15, y: 10};
let dx = 0;
let dy = 0;
let score = 0;
let last_key;

let gameloop;

function Press(e){
    if(gameloop === undefined){
        gameloop = setInterval(gameProcess, 100);
    }
    
    const key = e.key;

    switch (key) {
        
        case "ArrowUp":
            if (dy !== -1 && (last_key !== "ArrowDown" || last_key === undefined || last_key === "ArrowUp")) {
                last_key = e.key;
                dx = 0;
                dy = -1;
            }
            break;
        case "ArrowDown":
            if (dy !== 1 && (last_key !== "ArrowUp" || last_key === undefined || last_key === "ArrowDown")) {
                last_key = e.key;
                dx = 0;
                dy = 1;
            }
            break;
        case "ArrowLeft":
            if (dx !== -1 && (last_key !== "ArrowRight" || last_key === undefined || last_key === "ArrowLeft")) {
                last_key = e.key;
                dx = -1;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx !== 1 && (last_key !== "ArrowLeft" || last_key === undefined || last_key === "ArrowRight")) {
                last_key = e.key;
                dx = 1;
                dy = 0;
            }
            break;
        default:
            break;
    }
}

function gameProcess(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    if(head.x < 0 || head.x >= canvas.width / game_size || head.y < 0 || head.y >= canvas.height / game_size){
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
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();

    drawApples();
}

function drawSnake(){
    for(let i = 0; i < canvas.height / game_size; i += game_size){
        for(let j = 0; j < canvas.width / game_size; j += game_size){
            if(j % 2 == 0 && i % 2 != 0){
                ctx.fillStyle = 'green';
            }
            ctx.fillRect( 
                j, 
                i, 
                game_size, 
                game_size
            );
        }
    }

    snake.forEach((segment, index) => {
        if(index === 0){
            ctx.drawImage(
                head,
                segment.x * game_size, 
                segment.y * game_size, 
                game_size, 
                game_size
            );
        }
        else if(index === snake.length - 1){
            ctx.drawImage(
                tail, 
                segment.x * game_size, 
                segment.y * game_size,
                game_size,
                game_size
            );
        }
        else{
            ctx.drawImage(
                body,
                segment.x * game_size, 
                segment.y * game_size, 
                game_size, 
                game_size
            );
        }
    });
}

function drawApples(){
    ctx.drawImage(apples, food.x * game_size, food.y * game_size, game_size, game_size);
}

function generateApples(){
    food = {x: Math.floor(Math.random() * (canvas.width / game_size)), y: Math.floor(Math.random() * (canvas.height / game_size))};
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