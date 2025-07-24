import axios from 'axios'
import { useState, useEffect } from 'react'
import usePokemonList from './usePokemonList'

function usePokemonDetails (id) {
//   let pokemonDataArray = []
  const [pokemons, setPokemons] = useState({})
  const { pokemonListState, setPokemonListState } = usePokemonList()

  async function downloadPokemons () {

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const pokemonOfSameType = await axios.get(
      `https://pokeapi.co/api/v2/type/${
        response.data.types ? response.data.types[0].type.name : ''
      }`
    )

    console.log('checkPokemonOfSameType',pokemonOfSameType);

    setPokemons({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map(t => t.type.name),
      similarPokemons: pokemonOfSameType.data.pokemon.slice(0, 5)
    })
    setPokemonListState({
      ...pokemonListState,
      type: response.data.types ? response.data.types[0].type.name : ''
    })

  }
  useEffect(() => {
    downloadPokemons()
  }, [])
  return [pokemons]
}
export default usePokemonDetails
