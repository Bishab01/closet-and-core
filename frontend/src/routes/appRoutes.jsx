import Login from '../auth/login'
import Signup from '../auth/signUp'
import '../styling/index.css'
import App from '../core/App'
import { Routes, Route, Navigate} from 'react-router-dom'

function Approutes() {
  return(
    <Routes>
        <Route path="/" element={<Navigate to="/app" replace/>}/>
        {/* <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<Signup/>}/> */}
        <Route path="/app" element={<App/>}/>
    </Routes>
  )
}

export default Approutes