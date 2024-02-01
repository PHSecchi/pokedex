convertPokemonTypeToLi = function (pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

convertPokemonToHtml = function(pokemon){
    return`<li class="pokemon">
        <span class="number">#${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${convertPokemonTypeToLi(pokemon.types).join('')}
            </ol>
            <img src="${pokemon.sprites.other.dream_world.front_default}"
            alt=${pokemon.name}>
        </div>
    </li>`
}

const pokemonsListHTML = document.getElementById('pokemonList')

pokeAPI.getPokemons().then((pokemons = [])=>
    pokemonsListHTML.innerHTML+= pokemons.map(convertPokemonToHtml).join('')
)
    