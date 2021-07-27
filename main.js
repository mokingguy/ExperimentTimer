let timerNado = 0;
let toggleNado = false;
let intervalNado;

let timerEscala = 0;
let toggleEscala = false;
let intervalEscala;

let timerFlotacion = 0;
let toggleFlotacion = false;
let intervalFlotacion;

let results = [];

function updateTimerLabel(id, time) {
    let seconds = time / 1000;
    document.getElementById(id).innerHTML = `${seconds}s`;
}

function updateTable() {
    let tableContent = "";
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        tableContent += `
            <tr>
                <td>${result[0]}</td>
                <td>${result[1]}s</td>
                <td>${result[2]}s</td>
                <td>${result[3]}s</td>
            </tr>`;
    }
    document.getElementById('tableBody').innerHTML = tableContent;
}

let buttonNado = document.getElementById("timer-nado-button");
buttonNado.addEventListener('click', function () {
    clearTimers('nado');
    if(!toggleNado) {
        intervalNado = setInterval(function () {
            timerNado += 10;
            updateTimerLabel('timer-nado', timerNado);
        }, 10);
        buttonNado.innerHTML = "Termina temporizador de nado";
    } else {
        buttonNado.innerHTML = "Inicia temporizador de nado";
        clearInterval(intervalNado)
    }
    toggleNado = !toggleNado;
})

let resetNado = document.getElementById("timer-nado-reset");
resetNado.addEventListener('click', function () {
    timerNado = 0;
    updateTimerLabel('timer-nado', 0);
})

let buttonEscala = document.getElementById("timer-escala-button");
buttonEscala.addEventListener('click', function () {
    clearTimers('escala');
    if(!toggleEscala) {
        intervalEscala = setInterval(function () {
            timerEscala += 10;
            updateTimerLabel('timer-escala', timerEscala);
        }, 10);
        buttonEscala.innerHTML = "Termina temporizador de escala";
    } else {
        buttonEscala.innerHTML = "Inicia temporizador de escala";
        clearInterval(intervalEscala)
    }
    toggleEscala = !toggleEscala;
})

let resetEscala = document.getElementById("timer-escala-reset");
resetEscala.addEventListener('click', function () {
    timerEscala = 0;
    updateTimerLabel('timer-escala', 0);
})

let buttonFlotacion = document.getElementById("timer-flotacion-button");
buttonFlotacion.addEventListener('click', function () {
    clearTimers('flotación');
    if(!toggleFlotacion) {
        intervalFlotacion = setInterval(function () {
            timerFlotacion += 10;
            updateTimerLabel('timer-flotacion', timerFlotacion);
        }, 10);
        buttonFlotacion.innerHTML = "Termina temporizador de flotación";
    } else {
        buttonFlotacion.innerHTML = "Inicia temporizador de flotación";
        clearInterval(intervalFlotacion)
    }
    toggleFlotacion = !toggleFlotacion;
})

let resetFlotacion = document.getElementById("timer-flotacion-reset");
resetFlotacion.addEventListener('click', function () {
    timerFlotacion = 0;
    updateTimerLabel('timer-flotacion', 0);
})

let agregarElement = document.getElementById("agregar");
agregarElement.addEventListener('click', function () {
    const result = [
        document.getElementById('input').value,
        `${timerNado/1000}`,
        `${timerEscala/1000}`,
        `${timerFlotacion/1000}`,
    ];
    document.getElementById('input').value = "";
    results.push(result);
    timerNado = 0;
    updateTimerLabel('timer-nado', 0);
    timerEscala = 0;
    updateTimerLabel('timer-escala', 0);
    timerFlotacion = 0;
    updateTimerLabel('timer-flotacion', 0);
    updateTable();
})

let exportElement = document.getElementById("export");
exportElement.addEventListener('click', function () {
    const rows = [
        ["Nombre", "Tiempo de nado", "Tiempo de escala", "Tiempo de flotación"],
        ...results
    ];
    
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
})

let clearTableElement = document.getElementById("clearTable");
clearTableElement.addEventListener('click', function () {
    results = [];
    document.getElementById('tableBody').innerHTML = "";
})

function clearTimers(type) {
    buttonNado.innerHTML = "Inicia temporizador de nado";
    buttonEscala.innerHTML = "Inicia temporizador de escala";
    buttonFlotacion.innerHTML = "Inicia temporizador de flotación";
    switch(type) {
        case 'nado':
            toggleEscala = false;
            toggleFlotacion = false;
            break;
        case 'escala':
            toggleNado = false;
            toggleFlotacion = false;
            break;
        case 'flotación':
            toggleEscala = false;
            toggleNado = false;
            break;
    }
    
    clearInterval(intervalEscala);
    clearInterval(intervalFlotacion);
    clearInterval(intervalNado);
}
