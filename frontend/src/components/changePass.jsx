import { EyeOff, Eye, KeyRound, X } from "lucide-react";
import { useState } from "react";

export function ChangePass({changePass}){
    const [formData, setFormData] = useState({
        oldPass: "",
        newPass: "",
        rePass: ""
    });

    const apiURL = import.meta.env.VITE_API_URL;
    
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
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

        if(!formData.oldPass.trim()||!formData.newPass.trim()||!formData.rePass.trim()){
            setMsg("All fields are required.");
            setMsgType("error");
            return;
        }

        if(formData.newPass.length < 8)
        {
            setMsg("Password must be atleast 8 characters.");
            setMsgType("error");
            return;
        }

        if(formData.newPass !== formData.rePass )
        {
            setMsg("Re-entered password doesn't match.");
            setMsgType("error");
            return;
        }

        setMsg("");

        try{
            const response = await fetch(`${apiURL}changePass.php`, {
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
                oldPass: "",
                newPass: "",
                rePass: ""
                });

                setTimeout(() => {
                    changePass();
                }, 700);
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
        <div className="popUp">
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-xl w-80 text-[14.5px] font-sans space-y-4"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <KeyRound className="size-5 shrink-0"/>
                        <h1 className="font-medium text-lg text-gray-800">Change Password</h1>
                    </div>
                   <button onClick={changePass}>
                        <X className="size-5 text-gray-600 hover:text-gray-800"/>
                   </button>
                </div>
                <label className="label">
                    Old password:
                </label> 
                <div className="flex items-center justify-between gap-1 passwordBox">
                    <input 
                        type={showOldPass ? "text" : "password"} 
                        name='oldPass'
                        value= {formData.oldPass}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="h-8 outline-none w-full"
                    />
                    <button
                    type="button"
                    title={showOldPass ? "Hide Password" : "Show Password"}
                    onClick={()=>setShowOldPass(prev => !prev)}
                    >
                        {showOldPass
                            ?<EyeOff className="h-4.5 w-4.5 text-black"/>
                            :<Eye className="h-4.5 w-4.5 text-black"/>
                        }
                    </button>
                </div>

                <label className="label">
                    New password:
                </label> 
                <div className="flex items-center justify-between gap-1 passwordBox">
                    <input 
                        type={showNewPass ? "text" : "password"} 
                        name='newPass'
                        value= {formData.newPass}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="h-8 outline-none w-full"
                    />
                    <button
                    type="button"
                    title={showNewPass ? "Hide Password" : "Show Password"}
                    onClick={()=>setShowNewPass(prev => !prev)}
                    >
                        {showNewPass
                            ?<EyeOff className="h-4.5 w-4.5 text-black"/>
                            :<Eye className="h-4.5 w-4.5 text-black"/>
                        }
                    </button>
                </div>

                <label className="label">
                    Re-enter password:
                </label> 
                <div className="flex items-center justify-between gap-1 passwordBox">
                    <input 
                        type={showRePass ? "text" : "password"} 
                        name='rePass'
                        value= {formData.rePass}
                        onChange={handleChange}
                        placeholder="Re-enter new password"
                        className="h-8 outline-none w-full"
                    />
                    <button
                    type="button"
                    title={showRePass ? "Hide Password" : "Show Password"}
                    onClick={()=>setShowRePass(prev => !prev)}
                    >
                        {showRePass
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
                        value="Confirm"
                        className="button bg-[#1B4332] text-white"
                    />
                </div>
            </form>
        </div>
    )
}