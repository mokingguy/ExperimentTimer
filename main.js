(function() {
    let timerNado = 0;
    let counterNado = 0;
    let toggleNado = false;
    let intervalNado;
    let timerEscala = 0;
    let counterEscala = 0;
    let toggleEscala = false;
    let intervalEscala;
    let timerFlotacion = 0;
    let counterFlotacion = 0;
    let toggleFlotacion = false;
    let intervalFlotacion;
    let results = [];
    let buttonEscala = document.getElementById("timer-escala-button");
    let resetEscala = document.getElementById("timer-escala-reset");
    let buttonFlotacion = document.getElementById("timer-flotacion-button");
    let resetFlotacion = document.getElementById("timer-flotacion-reset");
    let agregarElement = document.getElementById("agregar");
    let exportElement = document.getElementById("export");
    let clearTableElement = document.getElementById("clearTable");
    let buttonNado = document.getElementById("timer-nado-button");
    let resetNado = document.getElementById("timer-nado-reset");
    let counterNadoElement = document.getElementById("counter-nado");
    let counterEscalaElement = document.getElementById("counter-escala");
    let counterFlotacionElement = document.getElementById("counter-flotacion");

    let callbackNado = () => {
        clearTimers('nado');
        if(!toggleNado) {
            intervalNado = setInterval(function () {
                timerNado += 10;
                updateTimerLabel('timer-nado', timerNado);
            }, 10);
            counterNado++;
            counterNadoElement.innerHTML = `${counterNado}`;
            buttonNado.innerHTML = "Termina temporizador de nado (1)";
        } else {
            buttonNado.innerHTML = "Inicia temporizador de nado (1)";
            clearInterval(intervalNado)
        }
        toggleNado = !toggleNado;
    }

    let callbackResetNado = () => {
        timerNado = 0;
        counterNado = 0;
        counterNadoElement.innerHTML = `${counterNado}`;
        updateTimerLabel('timer-nado', 0);
    }

    let callbackEscala = () => {
        clearTimers('escala');
        if(!toggleEscala) {
            intervalEscala = setInterval(function () {
                timerEscala += 10;
                updateTimerLabel('timer-escala', timerEscala);
            }, 10);
            counterEscala++;
            counterEscalaElement.innerHTML = `${counterEscala}`;
            buttonEscala.innerHTML = "Termina temporizador de escala (2)";
        } else {
            buttonEscala.innerHTML = "Inicia temporizador de escala (2)";
            clearInterval(intervalEscala)
        }
        toggleEscala = !toggleEscala;
    }

    let callbackResetEscala = () => {
        timerEscala = 0;
        counterEscala = 0;
        counterEscalaElement.innerHTML = `${counterEscala}`;
        updateTimerLabel('timer-escala', 0);
    }

    let callbackFlotacion = () => {
        clearTimers('flotación');
        if(!toggleFlotacion) {
            intervalFlotacion = setInterval(function () {
                timerFlotacion += 10;
                updateTimerLabel('timer-flotacion', timerFlotacion);
            }, 10);
            counterFlotacion++;
            counterFlotacionElement.innerHTML = `${counterFlotacion}`;
            buttonFlotacion.innerHTML = "Termina temporizador de flotación (3)";
        } else {
            buttonFlotacion.innerHTML = "Inicia temporizador de flotación (3)";
            clearInterval(intervalFlotacion)
        }
        toggleFlotacion = !toggleFlotacion;
    }

    let callbackResetFlotacion = () => {
        timerFlotacion = 0;
        countereTimerLabel = 0;
        counterFlotacionElement.innerHTML = `${counterFlotacion}`;
        updateTimerLabel('timer-flotacion', 0);
    }

    let callbackAgregar = () => {
        clearTimers('nado');
        clearTimers('escala');
        clearTimers('flotación');
        const name = document.getElementById('input').value ? document.getElementById('input').value : `Sujeto ${results.length + 1}`
        const result = [
            name,
            `${timerNado/1000}`,
            `${timerEscala/1000}`,
            `${timerFlotacion/1000}`,
            counterNado,
            counterEscala,
            counterFlotacion
        ];
        document.getElementById('input').value = "";
        results.push(result);
        counterNado = 0;
        timerNado = 0;
        updateTimerLabel('timer-nado', 0);
        counterNadoElement.innerHTML = `${counterNado}`;
        counterEscala = 0;
        timerEscala = 0;
        updateTimerLabel('timer-escala', 0);
        counterEscalaElement.innerHTML = `${counterEscala}`;
        counterFlotacion = 0;
        timerFlotacion = 0;
        updateTimerLabel('timer-flotacion', 0);
        counterFlotacionElement.innerHTML = `${counterFlotacion}`;
        updateTable();
    }

    let updateTimerLabel = (id, time) => {
        let seconds = time / 1000;
        document.getElementById(id).innerHTML = `${seconds}s`;
    }

    let updateTable = () => {
        let tableContent = "";
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            tableContent += `
                <tr>
                    <td>${result[0]}</td>
                    <td>${result[1]}s</td>
                    <td>${result[4]}</td>
                    <td>${result[2]}s</td>
                    <td>${result[5]}</td>
                    <td>${result[3]}s</td>
                    <td>${result[6]}</td>
                </tr>`;
        }
        document.getElementById('tableBody').innerHTML = tableContent;
    }

    let clearTimers = (type) => {
        buttonNado.innerHTML = "Inicia temporizador de nado (1)";
        buttonEscala.innerHTML = "Inicia temporizador de escala (2)";
        buttonFlotacion.innerHTML = "Inicia temporizador de flotación (3)";
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

    buttonNado.addEventListener('click', callbackNado)

    resetNado.addEventListener('click', callbackResetNado)

    buttonEscala.addEventListener('click', callbackEscala)

    resetEscala.addEventListener('click', callbackResetEscala)

    buttonFlotacion.addEventListener('click', callbackFlotacion)

    resetFlotacion.addEventListener('click', callbackResetFlotacion)

    agregarElement.addEventListener('click', callbackAgregar)

    exportElement.addEventListener('click', () => {
        const rows = [
            ["Nombre", "Tiempo de nado", "Instancia de nado", "Tiempo de escala", "Instancia de escala", "Tiempo de flotación", "Instancia de flotación"],
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

    clearTableElement.addEventListener('click', () => {
        results = [];
        document.getElementById('tableBody').innerHTML = "";
    })

    document.addEventListener('keydown', (e) => {
        if (e.target === document.body) {
            console.log(e);
            if (e.code === "Digit1") {
                if (e.shiftKey) {
                    callbackResetNado();
                } else {
                    callbackNado();
                }
            }
            if (e.code === "Digit2") {
                if (e.shiftKey) {
                    callbackResetEscala();
                } else {
                    callbackEscala();
                }
            }
            if (e.code === "Digit3") {
                if (e.shiftKey) {
                    callbackResetFlotacion();
                } else {
                    callbackFlotacion();
                }
            }
            if (e.code === "Enter") {
                callbackAgregar();
            }
        }
    }, false);

})();
