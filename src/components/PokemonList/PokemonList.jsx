import './PokemonList.css'
import Pokemon from '../Pokemon/Pokemon'
import usePokemonList from '../hooks/usePokemonList'
function PokemonList () {

    const {pokemonListState, setPokemonListState} = usePokemonList(false);
  return (
    <>
      <div className='pokemon-list-wrapper'>
        List of pokemon
        <div className='pokemon-container'>
          {pokemonListState.loading ? 'Pokemon is loading'
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
