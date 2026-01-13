async function getPokemonDetails(identifier) {
    const url = `https://pokeapi.co/api/v2/pokemon/${String(identifier).toLowerCase()}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`yaAllah. HTTP error! Status: ${response.status}. Pokémon not found!`);
        }
        const pokemonData = await response.json();
        console.log("mashaAllah. Data successfully fetched for:", pokemonData.name);
        // console.log(pokemonData);
        return pokemonData;
    } catch (error) {
        console.error("Fetch operation failed:", error);
        throw error;
    }
}


const container = document.querySelector("container");
const searchButton = document.getElementById('search-button');
const pokemonInput = document.getElementById('pokemon-input');
const pokemonImg = document.getElementById('pokemon-image');


function updateDisplay(data) {
    const modal = document.querySelector('.pokemon-modal');
    
    const nameDisplay = modal.querySelector('.pokemon-name-display');
    const pokemonImg = modal.querySelector('.pokemon-image');
    const statsDisplay = modal.querySelector('.stats-display');

    nameDisplay.textContent = data.name.toUpperCase();
    pokemonImg.src = data.sprites.other['official-artwork'].front_default;

    statsDisplay.innerHTML = '';
    data.stats.forEach(stat => {
        const statElement = document.createElement('li');
        statElement.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
        statsDisplay.appendChild(statElement);
    });
}

searchButton.addEventListener('click', () => {
    const hover = document.querySelector('.pokemon-modal');
    hover.classList.remove('hidden');
    const identifier = pokemonInput.value.trim(); 
    if (identifier) {
        getPokemonDetails(identifier)
            .then(data => {
                updateDisplay(data);
            })
            .catch(error => {
                document.getElementById('pokemon-name-display').textContent = "Pokémon Not Found. Try a different name/ID!";
                document.getElementById('pokemon-image').src = "";
            });
    } else {
        alert("Please enter a Pokémon name or ID!");
    }
});

const pokemonDivs = document.querySelectorAll('.pokemon-container');
pokemonDivs.forEach((div, index) => {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    getPokemonDetails(randomId)
        .then(data => {
            const nameDisplay = div.querySelector('.pokemon-name-display');
            const imgDisplay = div.querySelector('.pokemon-image');
            const statsDisplay = div.querySelector('.stats-display');

            nameDisplay.textContent = data.name.toUpperCase();
            imgDisplay.src = data.sprites.other['official-artwork'].front_default;
            const statsText = data.stats
                .map(stat => `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`)
                .join('\n');
            
            statsDisplay.textContent = statsText;
        });
});

const closeBtn = document.getElementById('close-modal-btn');

closeBtn.addEventListener('click', () => {
    const modal = document.querySelector('.pokemon-modal');
    modal.classList.add('hidden');
});