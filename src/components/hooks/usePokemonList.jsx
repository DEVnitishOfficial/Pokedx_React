import axios from 'axios'
import { useEffect, useState } from 'react'

function usePokemonList () {
//   let pokemonDataArray = []
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    loading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    prevUrl: '',
    nextUrl: ''
  })

  async function downloadPokemon () {
    setPokemonListState({ ...pokemonListState, loading: true })
    const response = await axios.get(pokemonListState.pokedexUrl) // this download the list of 20 pokemons
    setPokemonListState(state => ({
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
      setPokemonListState(state => ({
        ...state,
        pokemonList: pokemonProp,
        loading: false
      }))
  }

  useEffect(() => {
    downloadPokemon()
  }, [pokemonListState.pokedexUrl])

  return { pokemonListState, setPokemonListState }
}

export default usePokemonList
