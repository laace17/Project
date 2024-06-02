window.onload = function () {
    const game_size = 40;
    const height = 800;
    const width = 800;
    const apples = new Image();
    apples.src = "./img/apple.png"

    const turnL = new Image();
    turnL.src = "./img/turn_right.png"
    const turnR = new Image();
    turnR.src = "./img/turn_left.png"
    const turnUp = new Image();
    turnUp.src = "./img/turn_up.png"
    const turnDown = new Image();
    turnR.src = "./img/turn_up2.png"

    const head = new Image();
    head.src = "./img/snake_head.png";
    const head2 = new Image();
    head2.src = "./img/snake_head2.png";
    const head3 = new Image();
    head3.src = "./img/snake_head3.png";
    const head4 = new Image();
    head4.src = "./img/snake_head4.png";

    const body = new Image();
    body.src = "./img/snake_body.png";
    const body2 = new Image();
    body2.src = "./img/snake_body2.png";

    const tail = new Image();
    tail.src = "./img/snake_tail.png";
    const tail2 = new Image();
    tail2.src = "./img/snake_tail2.png";
    const tail3 = new Image();
    tail3.src = "./img/snake_tail3.png";
    const tail4 = new Image();
    tail4.src = "./img/snake_tail4.png";

    const field = new Image();
    field.src = "./img/field_snake.jpg"



    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    let w = canvas.width / 20;
    let h = w;
    let clr = "rgb(105, 177, 34)";

    const drawRect = (x, y, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x * w, y * h, w, h);
    }

    let snake = [{ x: 14, y: 10 }, { x: 13, y: 10 }, { x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }];

    let food = { x: 15, y: 10 };
    let dx = 0;
    let dy = 0;
    let score = 0;
    let last_key;
    let score1 = document.getElementById('scr');
    let apple = 0;
    let gameloop;


    function Press(e) {
        if (gameloop === undefined) {
            gameloop = setInterval(gameProcess, 100);
        }

        const key = e.key;

        switch (key) {
            case "ArrowUp":
                if (dy !== -1 && (last_key !== "ArrowDown" || last_key === undefined || last_key === "ArrowUp")) {
                    last_key = e.key;
                    dx = 0;
                    dy = -1;
                    pos = { x: snake[0].x + dx, y: snake[0].y + dy };

                }
                break;
            case "ArrowDown":
                if (dy !== 1 && (last_key !== "ArrowUp" || last_key === undefined || last_key === "ArrowDown")) {
                    last_key = e.key;
                    dx = 0;
                    dy = 1;
                    pos = { x: snake[0].x + dx, y: snake[0].y + dy };
                }
                break;
            case "ArrowLeft":
                if (dx !== -1 && (last_key !== "ArrowRight" || last_key === undefined || last_key === "ArrowLeft")) {
                    last_key = e.key;
                    dx = -1;
                    dy = 0;
                    pos = { x: snake[0].x + dx, y: snake[0].y + dy };
                }
                break;
            case "ArrowRight":
                if (dx !== 1 && (last_key !== "ArrowLeft" || last_key === undefined || last_key === "ArrowRight")) {
                    last_key = e.key;
                    dx = 1;
                    dy = 0;
                    pos = { x: snake[0].x + dx, y: snake[0].y + dy };
                }
                break;
            default:
                break;
        }
    }

    function addResultToLocalStorage(name, score) {
        let results = JSON.parse(localStorage.getItem('results')) || [];
        results.push({ name, score });
        results.sort((b, a) => a.score - b.score);
        localStorage.setItem('results', JSON.stringify(results));
        console.log(results);
    }

    function gameProcess() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (head.x < 0 || head.x >= width / game_size || head.y < 0 || head.y >= height / game_size) {
            gameOver();
            return;
        }

        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                gameOver();
                return;
            }
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            apple += 1;
            score1.innerHTML = score1.textContent.slice(0, 6) + Number(apple);
            generateApples();
        }
        else {
            snake.pop();
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawSnake();

        drawApples();
    }

    const directionHead = {
        "ArrowUp": head,
        "ArrowDown": head3,
        "ArrowLeft": head4,
        "ArrowRight": head2
    };
    const directionTail = {
        "ArrowUp": tail,
        "ArrowDown": tail3,
        "ArrowLeft": tail4,
        "ArrowRight": tail2
    };

    const directionBody = {
        "ArrowUp": body,
        "ArrowDown": body,
        "ArrowLeft": body2,
        "ArrowRight": body2
    };

    const directionTurn = {
        "ArrowUp": turnUp,
        "ArrowDown": turnDown,
        "ArrowLeft": turnL,
        "ArrowRight": turnR
    };


    function drawSnake() {
        for (let i = 0; i < 20; i += 2) {
            for (let j = 0; j < 20; j += 2) {
                drawRect(i, j, clr);
                drawRect(i + 1, j + 1, clr)
            }
        }

        snake.forEach((segment, index) => {
            if (index === 0) {
                if (last_key) {
                    ctx.drawImage(
                        directionHead[last_key],
                        segment.x * game_size,
                        segment.y * game_size,
                        game_size,
                        game_size
                    );
                }
            }
            // if(index === 1){
            //     if(last_key){
            //         ctx.drawImage(
            //             directionTurn[last_key],
            //             segment.x * game_size,
            //             segment.y * game_size,
            //             game_size,
            //             game_size
            //         );
            //     }
            // }
            else if (index === snake.length - 1) {
                if (last_key) {
                    ctx.drawImage(
                        directionTail[last_key],
                        segment.x * game_size,
                        segment.y * game_size,
                        game_size,
                        game_size
                    );
                }
            }
            else {
                if (last_key) {
                    ctx.drawImage(
                        directionBody[last_key],
                        segment.x * game_size,
                        segment.y * game_size,
                        game_size,
                        game_size
                    );
                }
            }
        });
    }

    function drawApples() {
        ctx.drawImage(apples, food.x * game_size, food.y * game_size, game_size, game_size);
    }

    function generateApples() {
        food = { x: Math.floor(Math.random() * (canvas.width / game_size)), y: Math.floor(Math.random() * (canvas.height / game_size)) };
    }

    function gameOver() {
        clearInterval(gameloop);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        addResultToLocalStorage('player 1', score);

        let restartButton = document.createElement('button');
        let g = document.createElement('p');
        let g1 = document.createElement('p');
        restartButton.innerHTML = 'Заново';
        g.innerHTML = 'ИГРА ОКОНЧЕНА';
        g1.innerHTML = `Счёт: ${score}`;
        restartButton.id = "restart";
        g.id = "gOver1";
        g1.id = "gOver2";

        restartButton.onclick = function () {
            location.reload();
        }
        document.body.appendChild(restartButton);
        document.body.appendChild(g);
        document.body.appendChild(g1);
    }

    generateApples();

    document.addEventListener('keydown', Press);
}