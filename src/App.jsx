import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'

function App() {

  return (
    <>
     <h1> 
      <Link to='/'> Home </Link>
     </h1>
    <CustomRoutes />
    </>
  )
}

export default App
