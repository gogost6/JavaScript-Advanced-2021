function solve() {
    const departButton = document.getElementById('depart');
    const arriveButton = document.getElementById('arrive');
    const info = document.querySelector('#info span');

    let stopId = {
        next: 'depot'
    }


    async function depart() {
        const url = 'http://localhost:3030/jsonstore/bus/schedule/' + stopId.next;
        const response = await fetch(url);
        const data = await response.json();
        if (response == undefined || response.status == 400) {
            document.querySelector('span').textContent = 'Error';
            departButton.disabled = true;
            arriveButton.disabled = true;
        } else {
            info.textContent = `Next stop ${data.name}`;
            stopId = data;
            departButton.disabled = true;
            arriveButton.disabled = false;
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${stopId.name}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();