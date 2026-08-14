import {NavLink, useNavigate} from "react-router-dom";
import logo from "../assets/logos/displayLogo.png";
import {Eye, EyeOff} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login(){
    const apiURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { checkSession } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("") // success or error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!formData.email.trim()||!formData.password.trim())
        {
            setMsg("All fields are required.");
            setMsgType("error");
            return;
        }

        setMsg("");

        try{
            const response = await fetch(`${apiURL}login.php`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                setMsg(data.message);
                setMsgType("success");

                setFormData({
                email: "",
                password: ""
                });
                 
                await checkSession(); // sync AuthContext with the new session/role

                // send retailers to their dashboard, everyone else to the storefront
                const destination = data.user?.role === "retailer"
                    ? "/dashboard"
                    : "/home";
                navigate(destination);
            } 
            else {
                setMsg(data.message);
                setMsgType("error");
            }
        }

        catch(error){
            console.error(error);
            setMsg("Failed to connect to the server."); //message for when the fetch doesn't establish connection
            setMsgType("error");
        }
    };

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
                    <form
                        onSubmit={handleSubmit} 
                        className="text-[14.5px] font-sans space-y-3"
                    >
                        <label className="label">
                            Email:
                        </label> 
                        <input
                            type='text' 
                            name='email' 
                            value={formData.email}
                            onChange= {handleChange}
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
                                value= {formData.password}
                                onChange={handleChange}
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

                        {msg && 
                            <p className={`mt-2 font-medium rounded-md text-center px-3 py-1.5
                                ${msgType==='success'
                                    ?"text-green-600 bg-green-200"
                                    :"text-red-500 bg-red-200"}`}
                            >
                                {msg}
                            </p>
                        }

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
                            <NavLink to="/home">
                                <button
                                    className="button border border-gray-500 bg-gray-200 text-gray-800"
                                >
                                    Continue as Guest
                                </button>
                            </NavLink>
                        </div>
                        <p className="mt-3 text-sm"> 
                            Don't have an account? 
                            <NavLink to="/signUp" className="pl-1 link"> 
                                Register now
                            </NavLink>
                        </p>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default Login