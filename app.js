
const tiempo = document.getElementById('tiempo');
const searchBar = document.getElementById('searchBar');
let results = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredR = results.filter((character) => {
        return (
            character.weather_state_name.toLowerCase().includes(searchString) ||
            character.created.toLowerCase().includes(searchString)
        );
    });
    displayR(filteredR);
});

const loadR = async () => {
    try {
        const res = await fetch('https://www.metaweather.com/api/location/116545/2022/4/30/');
        results = await res.json();
        displayR(results);
    } catch (err) {
        console.error(err);
    }
};

const displayR = (time) => {
    const htmlString = time
        .map((time) => {
            return `
            <br><li class="tiempo">
                <h2>${time.weather_state_name}</h2>
                <p>Temperatura Mínima: ${time.min_temp}°</p>
                <p>Temperatura Máxima: ${time.max_temp}°</p>
                <p>Fecha: ${time.created}</p><br>
            </li>
            `;
        })
        .join('');
    tiempo.innerHTML = htmlString;
};

loadR();
