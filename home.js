async function getPokemonDetails(identifier) {
    const url = `https://pokeapi.co/api/v2/pokemon/${String(identifier).toLowerCase()}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`yaAllah. HTTP error! Status: ${response.status}. Pokémon not found!`);
        }
        const pokemonData = await response.json();
        console.log("mashaAllah. Data successfully fetched for:", pokemonData.name);
        return pokemonData;
    } catch (error) {
        console.error("Fetch operation failed:", error);
        throw error;
    }
}

function updateDisplay(data) {
    document.getElementById('pokemon-name-display').textContent = data.name.toUpperCase();
    const imageUrl = data.sprites.other['official-artwork'].front_default;
    
    document.getElementById('pokemon-image').src = imageUrl;
    document.getElementById('pokemon-image').alt = `Official artwork of ${data.name}`;
}

const searchButton = document.getElementById('search-button');
const pokemonInput = document.getElementById('pokemon-input');

searchButton.addEventListener('click', () => {
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