let table;
let results;

window.onload = function () {
    results = JSON.parse(localStorage.getItem('results')) || [];
    displayResultsTable();
    console.log(results);
}

function displayResultsTable() {
    table = document.getElementById('tableL');

    for (let i = 0; i < 10 && i < results.length; i++) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td.innerHTML = i + 1;
        td1.innerHTML = results[i].name;
        td2.innerHTML = results[i].score;
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
}


