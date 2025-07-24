import { useParams } from "react-router-dom";
import './PokemonDetail.css'
import usePokemonDetails from "../hooks/usePokemonDetails";

function PokemonDetails(){
     const {id} = useParams()
  const [pokemons] = usePokemonDetails(id);

   console.log("seee my pokeeee", pokemons.similarPokemons);


    return(
        <div className="t-body"> 
        <div className="pokemon-detail-wrapper">
            <div className="poke-name"> Name : {pokemons.name} </div>
            <div><img src={pokemons.image} /></div>
            <div>Height : <span> {pokemons.height} </span></div>
            <div>weight : <span> {pokemons.weight} </span></div>
            <div>Type : <span> {pokemons.types} </span> </div>

           

        </div>
        {pokemons.types &&(
             <div className="pokemon-type-wrapper">
            <h4>More {pokemons.types} type pokemon</h4>
            <div className="pokemon-type-name">
            <ul>
                 {pokemons.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}
            </ul>

                

                </div>
                

            </div>
         )}
        
        </div>
    )
}

export default PokemonDetails;