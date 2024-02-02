const pokemonsListHTML = document.getElementById('pokemonList')
const buttonNext = document.getElementById('BtnNext')
const buttonPrev = document.getElementById('BtnPrev')
const maxLimit = 151
const limit =12
let offset = 0

convertPokemonToHtml = function(pokemon){
    return`<li class="pokemon ${pokemon.color}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${(pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`)).join('')}
            </ol>
            <img src="${pokemon.img}"
            alt=${pokemon.name}>
        </div>
    </li>`
}

loadPokemons = function(offset,limit){
pokeAPI.getPokemons(offset,limit).then((pokemons = [])=>
    pokemonsListHTML.innerHTML+= pokemons.map(convertPokemonToHtml).join('')
)}

loadPokemons()

//prototipagem do botão de prévia 
/*buttonPrev.addEventListener('click',()=>{
    offset-=limit;
    if(offset <= 0 ){
        offset = 0 //garante que seja pelo menos 0
        buttonPrev.parentElement.removeEventListener(buttonPrev)}
    loadPokemons(offset,limit)})*/

buttonNext.addEventListener('click',()=>{
    offset+=limit;

    const maxNextPage = offset+limit

    if (maxNextPage>= maxLimit){
        const newLimit = maxLimit - offset
        loadPokemons(offset,newLimit)
        buttonNext.parentElement.removeChild(buttonNext)
    }
    else{
        loadPokemons(offset,limit)
    }
})

    