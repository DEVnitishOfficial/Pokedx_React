import { useEffect, useState } from "react";
function PokemonList(){
   const [x, setX] = useState(0);
    const [y, setY] = useState(0);

     useEffect(() => {
        console.log("hii")
    },[x])

    return(
    <>
    <div> List of pokemon</div>
    <button onClick={() => setX(x+1)}>X</button>
    <button onClick={() => setY(y+1)}>Y</button>
    </>
)
};
export default PokemonList;