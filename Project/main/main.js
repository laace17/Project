window.onload = function () {
    const button = document.querySelector('.div-three');
    const speedBut = document.getElementById('SpeedBut');
    button.addEventListener('click', function () {
        
        if(document.querySelector('#SpeedBut button') != undefined){
            speedBut.removeChild(document.querySelector('#SpeedBut .but1'));
            speedBut.removeChild(document.querySelector('#SpeedBut .but2'));
            speedBut.removeChild(document.querySelector('#SpeedBut .but3'));
            return;
        }
    
        const but1 = document.createElement('button');
        const but2 = document.createElement('button');
        const but3 = document.createElement('button');
        
        but1.classList.add('but1');
        but2.classList.add('but2');
        but3.classList.add('but3');

        but1.innerHTML = 'Легкая';
        but2.innerHTML = 'Средняя';
        but3.innerHTML = 'Сложная';

        but1.addEventListener('click', ()=> {
            localStorage.setItem('speed', 200);
        })
        but2.addEventListener('click', ()=> {
            localStorage.setItem('speed', 100);
        })
        but3.addEventListener('click', ()=> {
            localStorage.setItem('speed', 70);
        })
        
        speedBut.appendChild(but1);
        speedBut.appendChild(but2);
        speedBut.appendChild(but3);
    })
}