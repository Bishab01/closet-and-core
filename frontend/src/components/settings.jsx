import { LogIn, LogOut, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../routes/roleGuard";
import { useState } from "react";

function Setting(){
    const { loggedIn, logout } = useAuth();
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowLoadingScreen(true);

        setTimeout(() => {
            logout();
            navigate("/login");
        }, 700);
    };

    if (showLoadingScreen){
        return <LoadingScreen/>
    }

    return(
        <div 
            onClick={(e)=>e.stopPropagation()}
            className={`absolute left-[18%] md:left-[28%] z-50 bg-gray-50 shadow-lg rounded-lg w-50
            border border-gray-400/20 ${
                !loggedIn 
                ? "-top-8"
                : "-top-20"
            }`}
        >
            {!loggedIn &&
                <button 
                    onClick={()=>navigate("/login")}
                    className="flex w-full items-center text-[14.5px] font-medium px-3 py-2 text-gray-500 gap-2
                    hover:bg-green-200 hover:text-green-700"
                >
                    <LogIn className="size-5"/>
                    Login
                </button>
            }

            {loggedIn &&
                <div className="flex flex-col gap-1">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center px-3 py-2.5 text-[14.5px] font-medium text-gray-500 gap-2 
                        hover:bg-gray-200 hover:text-gray-700 rounded-lg"
                    >
                        <LogOut className="size-5"/>
                        Logout
                    </button>
                    <button 
                        className="flex items-center px-3 py-2.5 text-[14.5px] font-medium text-gray-500 gap-2 
                        hover:bg-red-100 hover:text-red-700 rounded-lg"
                    >
                        <Trash className="size-5"/>
                        Delete account
                    </button>
                </div>
            }
        </div>
    )
}

export default Setting;