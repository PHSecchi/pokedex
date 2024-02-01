const pokeAPI={}

pokeAPI.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
           .then((response)=> response.json())}

pokeAPI.getPokemons = (limit = 10, offset = 0) => {
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