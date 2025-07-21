
import './Pokemon.css'

function Pokemon({name, image}){
    return(
        <div className="parent-poke">
        <div>{name}</div>
        <div>
            <img src={image} style={{width:"80px", height:"80px"}} />
        </div>
        </div>
    )
}

export default Pokemon;