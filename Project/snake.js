let field = document.createElement('div');
document.body.append(field);
field.classList.add('field');

// let img = document.createElement('img');
// img.classList.add('img');
// img.src = 'field.jpg';
// field.append(img);

for(let i = 0; i < 100; i++){
    let excel = document.createElement('div');
    field.append(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');

let x = 1;
let y = 10;

for(let i = 0; i < excel.length; i++){
    excel[i].setAttribute('X', x);
    excel[i].setAttribute('Y', y);
    if(x == 10){
        x = 0;
        y--;

    }
    x++;
}
x = 5;
y = 5;
let snake_body = [document.querySelector('[X = "' + 5 + '"][Y = "' + 6 + '"]'), document.querySelector('[X = "' + 5 + '"][Y = "' + 5 + '"]'), document.querySelector('[X = "' + 5 + '"][Y = "' + 4 + '"]')];

console.log(snake_body);

snake_body[0].classList.add('snake_head');
snake_body[snake_body.length - 1].classList.add('snake_tail');

for(let i = 1; i < snake_body.length - 1; i++){
    snake_body[i].classList.add('snake_body');
}

let apple;

// function randomBorn(){
//     let X = Math.random() * (10 - 1) + 1;
//     let Y = Math.random() * (10 - 1) + 1;
//     return [X, Y];
// }

function createApple(){
    function randomApple(){
        let X = Math.round(Math.random() * (10 - 1) + 1);
        let Y = Math.round(Math.random() * (10 - 1) + 1);
        return [X, Y];
    }

    let apple_cord = randomApple();
    console.log(apple_cord);
    apple = [document.querySelector('[X = "' + 5 + '"][Y = "' + 6 + '"]')];

    let size = snake_body.length;
    console.log(snake_body[size] == apple[0]);

    while(size != 0){
        if(snake_body[size - 1] == apple[0]){
            let apple_cord = randomApple();
            apple = [document.querySelector('[X = "' + apple_cord[0] + '"][Y = "' + apple_cord[1] + '"]')];
        }
        size--;
    }
    
    
    apple[0].classList.add('apple');
}
createApple();