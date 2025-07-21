import { useEffect, useState} from "react";
import axios from 'axios';
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setIsLoading] = useState(true);

    const POKEDX_URL = "https://pokeapi.co/api/v2/pokemon";

    async function downloadPokemon(){
        const response = await axios.get(POKEDX_URL); // this download the list of 20 pokemons
        console.log('resData',response);

        const pokemonResult = response.data.results; // get the array of pokemons from result

        // iterating over the result array of pokemons and created an array of promise using the url
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url))

        // passing those promis to axios.all similr to Promise.all, it resolve all promised parllely
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detaild data

        // extracing property from detailed data
        const pokemonProp = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{
                id : pokemon.id,
                name : pokemon.name,
                image : (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.order,
                types : pokemon.types
            }
            
        });
       console.log('pokemonproperty',pokemonProp);
       setPokemonList(pokemonProp);
       setIsLoading(false);
    }
     useEffect(() => {
       downloadPokemon();
    },[]);

    return(
    <>
    <div className="pokemon-list-wrapper"> 
        List of pokemon
        
        </div>
    <div className="pokemon-container">
        {loading ? "Pokemon is loading" : 
        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} id={p.id} />)}
    </div>
    </>
)
};
export default PokemonList;