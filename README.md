<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Previsioni Meteo - Ricerca Zona</title>
    <!-- Aggiungi Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="container p-4 bg-white shadow rounded">
        <h1 class="text-center">Previsioni Meteo</h1>

        <!-- Seleziona tipo di ricerca -->
        <div class="mb-3 text-center">
            <button class="btn btn-info me-2" id="city-search-btn" onclick="toggleSearchMethod('city')">Ricerca per Città</button>
            <button class="btn btn-info" id="coords-search-btn" onclick="toggleSearchMethod('coords')">Ricerca per Coordinate</button>
        </div>

        <!-- Barra di ricerca per la zona (Nome città) -->
        <div id="city-search" class="d-flex justify-content-center mb-3">
            <input type="text" id="location-search" class="form-control me-2" placeholder="Cerca una città o zona" />
            <button class="btn btn-primary" onclick="searchLocation()">Cerca</button>
        </div>

        <!-- Barra di ricerca per la zona (Latitudine e Longitudine) -->
        <div id="coords-search" class="d-flex justify-content-center mb-3" style="display: none;">
            <input type="text" id="latitude" class="form-control me-2" placeholder="Latitudine" />
            <input type="text" id="longitude" class="form-control me-2" placeholder="Longitudine" />
            <button class="btn btn-primary" onclick="searchLocationByCoords()">Cerca</button>
        </div>

        <p id="location-name" class="text-center">Posizione: <strong>Lat: 45.1623, Lon: 7.4964</strong></p>

        <div id="weather-info" class="mt-4">
            <h2>Previsioni Settimanali</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Giorno</th>
                        <th>Descrizione</th>
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

        <div class="text-center">
            <button class="btn btn-success" onclick="getWeatherData()">Aggiorna Dati Meteo</button>
        </div>
    </div>

    <!-- Aggiungi il JS di Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
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
                    countryName = result.country;

                    // Aggiorna la posizione e il nome della città e stato
                    document.getElementById("city-state-name").innerHTML = `Città: <strong>${locationName}, ${countryName}</strong>`;
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

// Funzione per cercare la località tramite latitudine e longitudine
function searchLocationByCoords() {
    const lat = parseFloat(document.getElementById("latitude").value);
    const lon = parseFloat(document.getElementById("longitude").value);

    if (!isNaN(lat) && !isNaN(lon)) {
        latitude = lat;
        longitude = lon;

        // Utilizzo dell'API di Open-Meteo per la geocodifica
        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=it`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const result = data.results[0];
                    locationName = result.name;
                    countryName = result.country;

                    // Aggiorna la posizione e il nome della città e stato
                    document.getElementById("city-state-name").innerHTML = `Città: <strong>${locationName}, ${countryName}</strong>`;
                    getWeatherData(); // Richiama la funzione per aggiornare i dati meteo
                } else {
                    alert("Località non trovata. Per favore, prova con altre coordinate.");
                }
            })
            .catch(error => {
                console.error("Errore nel recupero dei dati di geocodifica:", error);
                alert("Errore nel recupero dei dati di geocodifica.");
            });
    } else {
        alert("Per favore inserisci coordinate valide.");
    }
}

// Funzione per ottenere i dati meteo per la posizione attuale
function getWeatherData() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min,precipitation_sum,weathercode&timezone=Europe/Rome`;

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
            const weatherCodes = data.daily.weathercode;

            // Aggiungi una riga per ogni giorno
            days.forEach((day, index) => {
                const date = new Date(day);
                const dayName = date.toLocaleDateString('it-IT', { weekday: 'long' });
                const weatherDescription = getWeatherDescription(weatherCodes[index]);

                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${dayName}</td>
                    <td>
                        <img src="${weatherDescription.icon}" alt="${weatherDescription.description}" width="40" />
                        ${weatherDescription.description}
                    </td>
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

// Funzione per ottenere la descrizione del meteo e l'icona in base al codice meteo
function getWeatherDescription(code) {
    let description = "";
    let icon = "";

    switch (code) {
        case 0:
            description = "Soleggiato";
            icon = "https://open-meteo.com/assets/icons/sun.svg";
            break;
        case 1:
        case 2:
            description = "Poco nuvoloso";
            icon = "https://open-meteo.com/assets/icons/partly-cloudy-day.svg";
            break;
        case 3:
            description = "Nuvoloso";
            icon = "https://open-meteo.com/assets/icons/cloudy.svg";
            break;
        case 45:
        case 48:
            description = "Nebbia";
            icon = "https://open-meteo.com/assets/icons/fog.svg";
            break;
        case 51:
        case 53:
        case 55:
            description = "Pioggia leggera";
            icon = "https://open-meteo.com/assets/icons/rain.svg";
            break;
        case 61:
        case 63:
        case 65:
            description = "Pioggia moderata";
            icon = "https://open-meteo.com/assets/icons/rain.svg";
            break;
        case 71:
        case 73:
        case 75:
            description = "Nevicate";
            icon = "https://open-meteo.com/assets/icons/snow.svg";
            break;
        case 80:
        case 81:
        case 82:
            description = "Pioggia forte";
            icon = "https://open-meteo.com/assets/icons/rain-heavy.svg";
            break;
        case 95:
        case 96:
        case 99:
            description = "Tempesta";
            icon = "https://open-meteo.com/assets/icons/thunderstorm.svg";
            break;
        default:
            description = "Stato sconosciuto";
            icon = "https://open-meteo.com/assets/icons/cloud.svg";
            break;
    }

    return { description, icon };
}

// Funzione per alternare il tipo di ricerca (Città o Coordinate)
function toggleSearchMethod(method) {
    if (method === 'city') {
        document.getElementById('city-search').style.display = 'flex';
        document.getElementById('coords-search').style.display = 'none';
    } else {
        document.getElementById('city-search').style.display = 'none';
        document.getElementById('coords-search').style.display = 'flex';
    }
}

style.css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
}

h1 {
    font-size: 28px;
    color: #333;
}

button {
    font-size: 16px;
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
}

#weather-table-body tr:nth-child(even) {
    background-color: #f9f9f9;
}

#weather-table-body tr:hover {
    background-color: #e0e0e0;
}
