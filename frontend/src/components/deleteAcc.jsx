import { TriangleAlert, X } from "lucide-react";

export function DeleteAccount({deleteAcc}){
    const apiURL = import.meta.env.VITE_API_URL;

    handleConfirm = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch(`${apiURL}deleteAccount.php`, {
                method: "POST",
                credentials: "include",
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
        }

        catch(error){
            console.error(error);
            setMsg("Failed to connect to the server."); 
            setMsgType("error");
        }
    };
   
    return(
        <div className="popUp">
            <div className="flex flex-col items-center relative bg-white rounded-xl p-5 min-w-80 max-w-100 space-y-4">
                <div className="flex items-center text-red-500 gap-1 font-medium text-xl">
                    <TriangleAlert className="size-6"/>
                    <h1>Delete Account</h1>
                </div>
                <p className="text-center">Do you really want to delete your account? You will lose all the data related to this account.</p>
                <button
                    className="button bg-gray-700 text-white hover:bg-gray-800"
                >
                    Confirm
                </button>
                <button 
                    className="absolute right-3.5 top-3.5 z-50"
                    onClick={deleteAcc}
                >
                    <X className="size-5 text-gray-600 hover:text-gray-800"/>
                </button>
            </div>
        </div>
    )
}