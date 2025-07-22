import { Link } from 'react-router-dom'
import './Pokemon.css'

function Pokemon ({ name, image, id }) {
  return (
    <div className='parent-poke'>
    <Link to={`/pokemon/${id}`}>
      <div>{name}</div>
      <div>
        <img 
        src={image}
        style={{ width: '80px', height: '80px' }} 
        />
      </div>
        </Link>
    </div>
  )
}

export default Pokemon