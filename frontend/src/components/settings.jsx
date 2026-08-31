import { KeyRound, LogIn, LogOut, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../routes/roleGuard";
import { useState } from "react";

function Setting({changePass, deleteAcc}){
    const { loggedIn, user, logout } = useAuth();
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const navigate = useNavigate();

    const isRetailer = user?.role==="retailer";

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
            className=" bg-gray-500 text-gray-100 shadow-xl rounded-xl overflow-hidden w-45 mx-5 shrink-0"
        >
            {!loggedIn &&
            <div className="p-1.5">
                <button 
                    onClick={()=>navigate("/login")}
                    className="flex w-full items-center text-[14.5px] font-medium gap-2 rounded-lg p-2
                    hover:bg-gray-300/30"
                >
                    <LogIn className="size-5"/>
                    Login
                </button>
            </div>
            }

            {loggedIn && !isRetailer &&
            <div className="flex flex-col gap-0.5 p-1.5">
                <button 
                    onClick={handleLogout}
                    className="flex items-center text-[14.5px] font-medium gap-2 rounded-lg p-2
                    hover:bg-gray-300/30"
                >
                    <LogOut className="size-5"/>
                    Logout
                </button>
                
                <button 
                    onClick={changePass}
                    className="flex items-center text-[14.5px] font-medium gap-2 rounded-lg p-2
                    hover:bg-gray-300/30"
                >
                    <KeyRound className="size-5"/>
                    Change password
                </button>

                <button 
                    onClick={deleteAcc}
                    className="flex items-center text-[14.5px] font-medium gap-2 rounded-lg p-2
                    hover:bg-gray-300/30"
                >
                    <Trash className="size-5"/>
                    Delete account
                </button>
            </div>
            }

            {loggedIn && isRetailer &&
            <div className="flex flex-col gap-0.5 p-1.5">
                <button 
                    onClick={handleLogout}
                    className="flex items-center text-[14.5px] font-medium gap-2 rounded-lg p-2
                    hover:bg-gray-300/30"
                >
                    <LogOut className="size-5"/>
                    Logout
                </button>

                <button 
                    onClick={changePass}
                    className="flex items-center text-[14.5px] font-medium gap-2 rounded-lg p-2
                    hover:bg-gray-300/30"
                >
                    <KeyRound className="size-5"/>
                    Change password
                </button>
            </div>
            }
        </div>
    )
}

export default Setting;