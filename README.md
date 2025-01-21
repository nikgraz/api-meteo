<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Previsioni Meteo - Ricerca Zona</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Previsioni Meteo</h1>
        
        <!-- Barra di ricerca per la zona -->
        <input type="text" id="location-search" placeholder="Cerca una città o zona" />
        <button onclick="searchLocation()">Cerca</button>

        <p id="location-name">Posizione: <strong>Givoletto</strong></p>
        
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

let latitude = 45.1623; // Coordinate di default (Givoletto)
let longitude = 7.4964; // Coordinate di default (Givoletto)
let locationName = "Givoletto"; // Nome di default della città

// Funzione per cercare una città
function searchLocation() {
    const locationInput = document.getElementById("location-search").value;

    if (locationInput.trim() !== "") {
        // Utilizzo dell'API di Open-Meteo per la geocodifica
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationInput)}&count=1&language=it`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const result = data.results[0];
                    latitude = result.latitude;
                    longitude = result.longitude;
                    locationName = result.name;

                    document.getElementById("location-name").innerHTML = `Posizione: <strong>${locationName}</strong>`;
                    getWeatherData(); // Richiama la funzione per aggiornare i dati meteo
                } else {
                    alert("Località non trovata. Per favore, prova un altro nome.");
                }
            })
            .catch(error => {
                console.error("Errore nel recupero dei dati di geocodifica:", error);
                alert("Errore nel recupero dei dati di geocodifica.");
            });
    } else {
        alert("Per favore inserisci un nome di località.");
    }
}

// Funzione per ottenere i dati meteo per la posizione attuale
function getWeatherData() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min,precipitation_sum&timezone=Europe/Rome`;

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

let latitude = 45.1623; // Coordinate di default (Givoletto)
let longitude = 7.4964; // Coordinate di default (Givoletto)
let locationName = "Givoletto"; // Nome di default della città

// Funzione per cercare una città
function searchLocation() {
    const locationInput = document.getElementById("location-search").value;

    if (locationInput.trim() !== "") {
        // Utilizzo dell'API di Open-Meteo per la geocodifica
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationInput)}&count=1&language=it`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const result = data.results[0];
                    latitude = result.latitude;
                    longitude = result.longitude;
                    locationName = result.name;

                    document.getElementById("location-name").innerHTML = `Posizione: <strong>${locationName}</strong>`;
                    getWeatherData(); // Richiama la funzione per aggiornare i dati meteo
                } else {
                    alert("Località non trovata. Per favore, prova un altro nome.");
                }
            })
            .catch(error => {
                console.error("Errore nel recupero dei dati di geocodifica:", error);
                alert("Errore nel recupero dei dati di geocodifica.");
            });
    } else {
        alert("Per favore inserisci un nome di località.");
    }
}

// Funzione per ottenere i dati meteo per la posizione attuale
function getWeatherData() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min,precipitation_sum&timezone=Europe/Rome`;

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

// Aggiungi l'evento per il tasto "Invio" sulla barra di ricerca
document.getElementById("location-search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Previene l'eventuale invio del modulo
        searchLocation(); // Esegui la ricerca quando viene premuto "Invio"
    }
});


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

input[type="text"] {
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
