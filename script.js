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
            icon = "https://png.pngtree.com/png-clipart/20210910/ourmid/pngtree-the-sun-png-png-image_3921225.png";
            break;
        case 1:
        case 2:
            description = "Poco nuvoloso";
            icon = "https://e1.pngegg.com/pngimages/469/157/png-clipart-my-phone-12-partially-cloudy-illustration-thumbnail.png";
            break;
        case 3:
            description = "Nuvoloso";
            icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonOgwweU4YHqF3HXDXz0MB_u90_TEQ3eBUA&s";
            break;
        case 45:
        case 48:
            description = "Nebbia";
            icon = "https://static.vecteezy.com/system/resources/thumbnails/020/918/090/small_2x/fog-motion-blured-isolated-3d-render-png.png";
            break;
        case 51:
        case 53:
        case 55:
            description = "Pioggia leggera";
            icon = "https://img.freepik.com/vettori-gratuito/pioggia-di-vettore-isolata-su-sfondo-trasparente_433751-176.jpg";
            break;
        case 61:
        case 63:
        case 65:
            description = "Pioggia moderata";
            icon = "https://img.lovepik.com/element/45004/1819.png_860.png";
            break;
        case 71:
        case 73:
        case 75:
            description = "Nevicate";
            icon = "https://img.freepik.com/vettori-gratuito/sovrapposizione-bianca-di-neve-su-uno-sfondo-trasparente-e-scuro-illustrazione-di-particelle-di-ghiaccio-vettoriale_90220-3076.jpg";
            break;
        case 80:
        case 81:
        case 82:
            description = "Pioggia forte";
            icon = "https://e1.pngegg.com/pngimages/642/644/png-clipart-nuage-de-pluie-dessin-animation-orage-tenor-art-gif-bleu-ciel-thumbnail.png";
            break;
        case 95:
        case 96:
        case 99:
            description = "Tempesta";
            icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFU5r74rt8bftob9KYN9yEreYkPQkuOwzMQ&s";
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
