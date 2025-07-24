import { useEffect, useState } from 'react'
import axios from 'axios'
import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'
function PokemonList () {
//   const [pokemonList, setPokemonList] = useState([])
//   const [loading, setIsLoading] = useState(true)

//   const [pokedexUrl, setPokedexUrl] = useState(
//     'https://pokeapi.co/api/v2/pokemon'
//   )
//   const [prevUrl, setPrevUrl] = useState('')
//   const [nextUrl, setNextUrl] = useState('')

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    loading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    prevUrl: '',
    nextUrl: ''
  })

  async function downloadPokemon () {
    // setIsLoading(true)
    setPokemonListState({ ...pokemonListState, loading: true })
    const response = await axios.get(pokemonListState.pokedexUrl) // this download the list of 20 pokemons
    console.log('resData', response.data)
    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.next
    }))

    setPokemonListState({
      ...pokemonListState,
      nextUrl: response.data.next,
      prevUrl: response.data.next
    })

    const pokemonResult = response.data.results // get the array of pokemons from result

    // iterating over the result array of pokemons and created an array of promise using the url
    // that will download those 20 pokemons
    const pokemonResultPromise = pokemonResult.map(pokemon =>
      axios.get(pokemon.url)
    )

    // passing those promis to axios.all similr to Promise.all, it resolve all promised parllely
    const pokemonData = await axios.all(pokemonResultPromise) // array of 20 pokemon detaild data

    // extracing property from detailed data
    const pokemonProp = pokemonData.map(pokeData => {
      const pokemon = pokeData.data
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.order,
        types: pokemon.types
      }
    })
    console.log('pokemonproperty', pokemonProp)
    //    setPokemonList(pokemonProp);
    //    setIsLoading(false);
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokemonProp,
      loading: false
    }))

    //  setPokemonListState({
    //   ...pokemonListState,
    //   pokemonList: pokemonProp,
    //   loading: false
    // })
  }
  useEffect(() => {
    downloadPokemon()
  }, [pokemonListState.pokedexUrl])

  return (
    <>
      <div className='pokemon-list-wrapper'>
        List of pokemon
        <div className='pokemon-container'>
          {pokemonListState.loading
            ? 'Pokemon is loading'
            : pokemonListState.pokemonList.map(p => (
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
              ))}
        </div>
        <div className='btn-control'>
          <button
            disabled={pokemonListState.prevUrl == null}
            className='previous-btn'
            onClick={() => {
              const urlToSet = pokemonListState.prevUrl
              setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
            }}
          >
            Previous
          </button>
          <button
            disabled={pokemonListState.nextUrl == null}
            className='next-btn'
            onClick={() => {
              const urlToSet = pokemonListState.nextUrl
              setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet })
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}
export default PokemonList
