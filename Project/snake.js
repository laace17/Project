let field = document.createElement('div');
document.body.append(field);
field.classList.add('field');
let img = document.createElement('img');
img.classList.add('img');
img.src = 'field.jpg';

field.append(img);

for(let i = 0; i < 100; i++){
    let excel = document.createElement('div');
    field.append(excel);
    excel.classList.add('excel');
}