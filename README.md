
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Previsioni Meteo - Givoletto</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Previsioni Meteo per Givoletto</h1>
        <p>Posizione: <strong>45.1623, 7.4964</strong></p>
        
        <div id="weather-info">
            <h2>Previsioni Settimanali</h2>
            <table>
                <thead>
                    <tr>
                        <th>Giorno</th>
                        <th>Temperatura (°C)</th>
                        <th>Umidità (%)</th>
                        <th>Precipitazione (mm)</th>
                    </tr>
                </thead>
                <tbody id="weather-table-body">
                    <!-- Le righe della tabella saranno popolate dinamicamente -->
                </tbody>
            </table>
        </div>
        
        <button onclick="getWeatherData()">Aggiorna Dati Meteo</button>
    </div>

    <script src="script.js"></script>
</body>
</html>


javascript

function getWeatherData() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=45.1623&longitude=7.4964&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min,precipitation_sum&timezone=Europe/Rome";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherTableBody = document.getElementById('weather-table-body');
            weatherTableBody.innerHTML = '';  // Pulisce la tabella prima di popolarla

            // Ottieni i giorni della settimana
            const days = data.daily.time;
            const maxTemperatures = data.daily.temperature_2m_max;
            const minTemperatures = data.daily.temperature_2m_min;
            const maxHumidity = data.daily.relative_humidity_2m_max;
            const minHumidity = data.daily.relative_humidity_2m_min;
            const precipitation = data.daily.precipitation_sum;

            // Aggiungi una riga per ogni giorno
            days.forEach((day, index) => {
                const date = new Date(day);
                const dayName = date.toLocaleDateString('it-IT', { weekday: 'long' });

                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${dayName}</td>
                    <td>${maxTemperatures[index]}°C / ${minTemperatures[index]}°C</td>
                    <td>${maxHumidity[index]}% / ${minHumidity[index]}%</td>
                    <td>${precipitation[index]} mm</td>
                `;
                weatherTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Errore nel recupero dei dati meteo:", error);
        });
}



style.css

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 900px;
}

h1 {
    font-size: 28px;
    color: #333;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
}

button:hover {
    background-color: #45a049;
}

#weather-info {
    margin: 20px 0;
}

table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

td {
    background-color: #fafafa;
}

td:nth-child(1) {
    font-weight: bold;
}

#weather-table-body tr:nth-child(even) {
    background-color: #f9f9f9;
}

#weather-table-body tr:hover {
    background-color: #e0e0e0;
}

