import {Link} from "react-router-dom"

function Login(){
    return(
        <div className="font-serif">
            <h1 className="title">Login Portal</h1>
            <form>
                Email: 
                <input
                    type='text' 
                    name='email' 
                    className="inputBox"
                /><br/>
                Password: 
                <input 
                    type='password' 
                    name='password'
                    className="inputBox"
                /><br/>
                <input 
                    type='submit' 
                    value="Login"
                    className="button bg-green-500 text-white"
                />
            </form>
            <p className="mt-3"> 
                Don't have an account? <Link to="/signUp">Register now</Link>
            </p>
        </div>
    )
}

export default Login