async function attachEvents() {
    const location = document.getElementById('location');
    const current = document.getElementById('current');

    const weatherSymbols = {
        Sunny: '☀', 
        'Partly sunny': '⛅', 
        Overcast: '☁', 
        Rain: '☂', 
        Degrees: '°' 
    }

    try {
        const url = `http://localhost:3030/jsonstore/forecaster/locations`;
        const response = await fetch(url);
        const data = await response.json();
    
        document.getElementById('submit').addEventListener('click', function () {
            let found = data.find(x => location.value == x.name);
            
            if (found) {
                document.getElementById('forecast').style = 'display: block;';
                currentWeather(found);
                nextThreeDaysForecast(found);
            } 
        })
    } catch (error){
        alert(error);
    }

    async function currentWeather(f) {
        const url = `http://localhost:3030/jsonstore/forecaster/today/${f.code}`;

        const response = await fetch(url);
        const data = await response.json();

        const forecasts = createEl('div', 'forecasts');
        const symbolCode = weatherSymbols[data.forecast.condition];
        const symbol = createEl('span', 'condition symbol', symbolCode);
        const condition = createEl('span', 'condition');

        condition.appendChild(createEl('span', 'forecast-data', data.name));
        condition.appendChild(createEl('span', 'forecast-data', `${data.forecast.low}${weatherSymbols.Degrees}/${data.forecast.high}${weatherSymbols.Degrees}`));
        condition.appendChild(createEl('span', 'forecast-data', data.forecast.condition));
        forecasts.append(symbol, condition);

        current.appendChild(forecasts);
    }

    async function nextThreeDaysForecast(f) {
        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${f.code}`;

        const response = await fetch(url);
        const data = await response.json();

        const upcomingDiv = document.getElementById('upcoming');
        const forecasts = createEl('div', 'forecast-info');

        let arr = data.forecast;

        arr.forEach(x => {
            let [c, h, l] = Object.values(x);

            const upcoming = createEl('span', 'upcoming');

            upcoming.appendChild(createEl('span', 'symbol', weatherSymbols[c]));
            upcoming.appendChild(createEl('span', 'forecast-data', `${l}${weatherSymbols.Degrees}/${h}${weatherSymbols.Degrees}`));
            upcoming.appendChild(createEl('span', 'forecast-data', c));
            forecasts.appendChild(upcoming);
            upcomingDiv.appendChild(forecasts);
        })
    }

    function createEl(type, className, content) {
        let element = document.createElement(type);

        if (className) {
            element.className = className;
        }

        if (content) {
            element.textContent = content
        }

        return element;
    }
}

attachEvents();