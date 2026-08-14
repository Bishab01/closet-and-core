import {LogIn, X} from "lucide-react";

function LoginRequest({ onConfirm, onCancel }){
    return(
        <div className="popUp">
            <div 
                className="relative flex items-center justify-center w-85 h-55 bg-white rounded-lg" 
            >
                <button 
                    className="absolute top-3 left-[91%] text-gray-600 hover:text-gray-900"
                    onClick={onCancel}
                >
                    <X className="size-5"/>
                </button>
                <div className="flex flex-col items-center gap-6">
                    <div className="text-center">
                        <h1 className="font-bold text-xl tracking-tight leading-12">Log in to continue</h1>
                        <p className="text-[15px] px-6 font-medium text-gray-500">Please login to access this feature and continue with purchase.</p>
                    </div>
                    <button 
                        className="flex items-center gap-1.5 button bg-green-800 text-white text-[15px] hover:bg-green-900" 
                        onClick={onConfirm}
                    >
                        <LogIn className="size-4.5"/>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginRequest;