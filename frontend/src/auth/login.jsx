import {Link} from "react-router-dom"
import logo from "../assets/logos/displayLogo.png"
import {Eye, EyeOff} from "lucide-react"
import { useState } from "react"

function Login(){

    const [showPassword, setShowPassword] = useState(false);

    return(
        <div className="h-screen overflow-hidden bg-[#1B4332]/95">
            <div className="flex items-center justify-center h-full">
                
                {/*Login Card */}
               <div className="py-10 px-8 bg-gray-100 rounded-xl min-w-80 max-w-100">
                
                    {/*Logo + Heading */}
                    <div className="flex flex-col w-full items-center">
                        <div className="w-40 h-30">
                            <img 
                                src={logo} 
                                alt="Closet and Core logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="flex my-4 items-center w-65 gap-2">
                            <div className="h-0.5 w-full bg-gray-400"></div>
                            <h1 className=" text-gray-700 font-medium text-nowrap">Login Portal</h1>
                            <div className="h-0.5 w-full bg-gray-400"></div>
                        </div>
                    </div>
                
                    {/* Form */}
                    <form className="text-[14.5px] font-sans space-y-3">
                        <label className="label">
                            Email:
                        </label> 
                        <input
                            type='text' 
                            name='email' 
                            placeholder="example@gmail.com"
                            className="inputBox"
                        />

                        <label className="label">
                            Password:
                        </label> 

                        <div className="flex items-center justify-between gap-1 passwordBox">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name='password'
                                placeholder="Enter your password"
                                className="h-8 outline-none w-full"
                            />
                           <button
                            type="button"
                            title={showPassword ? "Hide Password" : "Show Password"}
                            onClick={()=>setShowPassword(prev => !prev)}
                           >
                                {showPassword
                                    ?<EyeOff className="h-4.5 w-4.5 text-black"/>
                                    :<Eye className="h-4.5 w-4.5 text-black"/>
                                }
                           </button>
                        </div>

                        <div className="flex justify-center w-full">
                            <input 
                                type='submit' 
                                value="Log in"
                                className="button bg-[#1B4332] text-white"
                            />
                        </div>
                    </form>

                    {/* Option */}
                    <div className="w-full flex flex-col items-center">
                        <div className="flex my-4 items-center w-65 gap-2">
                            <div className="h-0.5 w-full bg-gray-400"></div>
                            <h1 className=" text-gray-700 font-medium text-nowrap">OR</h1>
                            <div className="h-0.5 w-full bg-gray-400"></div>
                        </div>
                        <div className="flex justify-center w-full">
                            <Link to="/home">
                                <button
                                    className="button border border-gray-500 bg-gray-200 text-gray-800"
                                >
                                    Continue as Guest
                                </button>
                            </Link>
                        </div>
                        <p className="mt-3 text-sm"> 
                            Don't have an account? 
                            <Link to="/signUp" className="pl-1 link"> 
                                Register now
                            </Link>
                        </p>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default Login