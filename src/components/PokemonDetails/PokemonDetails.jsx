import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetail.css'

function PokemonDetails(){
    const {id} = useParams()
    const [pokemon, setPokemon] = useState({})
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        setPokemon({
            name : response.data.name,
            image : response.data.sprites.other.dream_world.front_default,
            height : response.data.height,
            weight : response.data.weight,
            type : response.data.types.map((t) => t.type.name )
        })
    }
    useEffect(() => {
        downloadPokemon();
    },[])

    return(
        <div className="t-body"> 
        <div className="pokemon-detail-wrapper">
            <div className="poke-name"> Name : {pokemon.name} </div>
            <div><img src={pokemon.image} /></div>
            <div>Height : <span> {pokemon.height} </span></div>
            <div>weight : <span> {pokemon.weight} </span></div>
            <div>Type : <span> {pokemon.type} </span> </div>
        </div>
        </div>
    )
}

export default PokemonDetails;