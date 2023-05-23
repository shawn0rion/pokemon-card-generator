let colors = {
    "normal": "#A8A77A",
    "fire": "#EE8130",
    "water": "#6390F0",
    "electric": "#F7D02C",
    "grass": "#7AC74C",
    "ice": "#96D9D6",
    "fighting": "#C22E28",
    "poison": "#A33EA1",
    "ground": "#E2BF65",
    "flying": "#A98FF3",
    "psychic": "#F95587",
    "bug": "#A6B91A",
    "rock": "#B6A136",
    "ghost": "#735797",
    "dragon": "#6F35FC",
}

function rng(){
    return Math.floor(Math.random() * 150 + 1);
}

const button = document.querySelector('.get-btn');
button.addEventListener('click', async event => {
    const pokemon = await getPokemon(rng());
    displayPokemon(pokemon);
    event.target.blur();
})

async function getPokemon(number){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const data = await response.json(); 
        return {
            name: data.name,
            img: data.sprites.other['official-artwork'].front_default,
            hpStat: data.stats[0].base_stat,
            attackStat: data.stats[1].base_stat,
            defenseStat: data.stats[2].base_stat,
            speedStat: data.stats[5].base_stat,
            types: data.types.map(typeInfo => typeInfo.type.name),
        }
    }
    catch(error){
        console.error(error);
    }

}

function displayPokemon(pokemon){
    const types = pokemon.types.map(x => `<div class="type" style="background-color: ${colors[x]}">${x}</div>`).join('');
    const card = document.querySelector('.card');
    card.style.setProperty('border-color', colors[pokemon.types[0]]);
    const html = `
        <div class="hp">HP <span class="hpStat">${pokemon.hpStat}</span></div>
        <div class="img-wrapper"><img src=${pokemon.img}></div>
        <div class="name">${pokemon.name}</div>
        <div class="types">${types}</div>
        <div class="stats">
            <div class="stat">
                <div class="stat-name">Attack</div>
                <div class="stat-value">${pokemon.attackStat}</div>
            </div>
            <div class="stat">
                <div class="stat-name">Defense</div>
                <div class="stat-value">${pokemon.defenseStat}</div>
            </div>
            <div class="stat">
                <div class="stat-name">Speed</div>
                <div class="stat-value">${pokemon.speedStat}</div>
            </div>
        </div>`
    card.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', async event => {
    const pokemon = await getPokemon(1);
    displayPokemon(pokemon);
})