import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logos/displayLogo.png"
import {Eye, EyeOff} from "lucide-react"

function Signup() {

    //object to hold form data
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    const [msg,setMsg]=useState("");
    const [msgType, setMsgType] = useState(""); // success or error
    const [showPassword, setShowPassword] = useState (false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+$/;

    //copies the initial formData object and updated the field(name) with the new value
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        //prevents form submission by default and allows us to handle it with our own logic
        e.preventDefault();

        //basic form validation
        if (!formData.fname.trim()) {
            setMsg("First name is required.");
            setMsgType("error");
            return;
        }

        if (!formData.lname.trim()) {
            setMsg("Last name is required.");
            setMsgType("error");
            return;
        }

        if (!formData.email.trim()) {
            setMsg("Email is required.");
            setMsgType("error");
            return;
        }

        if (!formData.password.trim()) {
            setMsg("Password is required.");
            setMsgType("error");
            return;
        }

        if (!nameRegex.test(formData.fname)){
            setMsg("First name must contain only letters.");
            setMsgType("error");
            return;
        }

        if (!nameRegex.test(formData.lname)){
            setMsg("Last name must contain only letters.");
            setMsgType("error");
            return;
        }

        if (!emailRegex.test(formData.email)) {
            setMsg("Invalid email format.");
            setMsgType("error");
            return;
        }

        if (formData.password.length < 8) {
            setMsg("Password must be at least 8 characters.");
            setMsgType("error");
            return;
        }

        setMsg("");

        try 
        {
            const response = await fetch("http://localhost/project/onlineStore/backend/api/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                setMsg(data.message);
                setMsgType("success");
            } 
            else {
                setMsg(data.message);
                setMsgType("error");
            }

            setFormData({
                fname: "",
                lname: "",
                email: "",
                password: ""
            });

        } 
        
        catch (error) {
            console.error(error);
            setMsg("Failed to connect to the server.");
            setMsgType("error");
        }
    };

    return (
        
    <div className="h-screen overflow-hidden bg-[#1B4332]/95">
        <div className="flex items-center justify-center h-full">
            
            {/*Registration Card */}
            <div className="py-8 px-8 bg-gray-100 rounded-xl min-w-80 max-w-100
            overflow-y-auto scrollbar-none max-h-full">
            
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
                        <h1 className=" text-gray-700 font-medium text-nowrap">Registration Form</h1>
                        <div className="h-0.5 w-full bg-gray-400"></div>
                    </div>
                </div>
            
                {/* Form */}
                <form
                    onSubmit={handleSubmit} 
                    className="text-[14.5px] font-sans space-y-3"
                >
                    <label className="label">
                        First Name:
                    </label> 
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="inputBox"
                    />

                    <label className="label">
                        Last Name:
                    </label> 
                    <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="inputBox"
                    />

                    <label className="label">
                        Email:
                    </label> 
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                        className="inputBox"
                    />

                    <label className="font-medium text-gray-800">
                        Password:
                    </label> 

                    <div className="flex items-center justify-between gap-1 passwordBox">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            value={formData.password}
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
                        <p className={`pt-2 font-medium ${msgType==='success'?"text-green-500":"text-red-500"}`}>
                            {msg}
                        </p>
                    }

                    <div className="flex justify-end w-full">
                        <input 
                            type='submit' 
                            value="Register"
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
                    <p className="mt-3 text-sm"> 
                        Already have an account? 
                        <NavLink to="/login" className="pl-1 link"> 
                            Log in
                        </NavLink>
                    </p>
                </div>

            </div>
        </div>
    </div>
    
    );
}

export default Signup;