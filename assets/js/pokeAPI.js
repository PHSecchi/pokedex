const pokeAPI={}

convertPokeApiToPokemon = function (pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    pokemon.color = pokemon.types[0]
    pokemon.img = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeAPI.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
           .then((response)=> response.json())
           .then(convertPokeApiToPokemon)}

pokeAPI.getPokemons = (offset = 0 , limit = 12) => {
    offset = offset < 0 ? 0 : offset
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
            .then((response)=> response.json())
            .then((jsonBody)=> jsonBody.results)
            .then((pokemons)=> pokemons.map(pokeAPI.getPokemonDetails))
            .then((detailRequests)=> Promise.all(detailRequests))
            .then((pokemonsDetailsList)=> pokemonsDetailsList)
            .catch(error=>{console.error(error)})
            .finally()
}