import { useState } from "react";
import { X, ChevronDown, CircleFadingPlus } from "lucide-react";
import { saveContactDetails } from "../../api/contact";

function ContactDetails({onClose, onSaved}) {
    const [formData, setFormData] = useState({
        platform:"",
        handle:"",
    });
  
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("success"); //success or error
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const platforms = [
        {id:1, name: "Instagram"},
        {id:2, name: "WhatsApp"},
        {id:3, name: "Phone"},
        {id:4, name: "Email"},
    ]

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactNum = /^9\d{9}$/;
    const usernameInsta = /^[a-zA-Z0-9._]{1,30}$/;

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMsg("");

        if(!formData.platform.trim() || !formData.handle.trim()){
            setMsg("All fields are required.");
            setMsgType("error");
            return;
        }

        if(formData.platform === "Instagram")
        {
            if(!usernameInsta.test(formData.handle))
            {
                setMsgType("error");
                setMsg("Username can only contain letters, numbers, . and _.");
                return;
            }
        }

        if(formData.platform === "WhatsApp" || formData.platform === "Phone")
        {
            if(!contactNum.test(formData.handle))
            {
                setMsgType("error");
                setMsg("Invalid phone number.");
                return;
            }
        }

        if(formData.platform === "Email")
        {
            if(!emailRegex.test(formData.handle))
            {
                setMsgType("error");
                setMsg("Invalid email address.");
                return;
            }
        }

        setSubmitting(true);
        try{
            const data = await saveContactDetails(formData);
            if (data.success) {
                setMsg(data.message);
                setMsgType("success");
                setTimeout(() => onSaved(), 500);
            } else {
                setMsg(data.message);
                setMsgType("error");
            }
        }
        catch(error){
            console.error(error);
            setMsg("Failed to connect to the server.");
            setMsgType("error");
        }
        finally{
            setSubmitting(false);
        }
    }

    return (
        <div className="popUp p-4">
            <form
                className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-none
                font-sans text-[14.5px]"
                onSubmit={handleSubmit}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-2 text-[15px]">
                        <CircleFadingPlus className="size-4 shrink-0"/>
                        <span>Contact Details</span>
                    </div>
                    <button type="button" onClick={onClose}>
                        <X className="size-5 text-gray-600 hover:text-gray-800" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    
                    {/* Platform Name */}
                    <div>
                        <label className="label">Platform</label>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="relative w-full">
                                <select
                                    name="platform"
                                    value={formData.platform}
                                    onChange={handleChange}
                                    className="w-full h-8.5 px-2 pr-8 rounded-sm border border-gray-400 bg-gray-200
                                    outline-none focus:outline-green-800 appearance-none"
                                >
                                    <option value="" disabled>Select category</option>
                                    {platforms.map((platform) => (
                                        <option key={platform.id} value={platform.name}>
                                            {platform.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="size-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/*Platform Handle*/}
                    <div>
                        <label className="label">Handle</label>
                        <input
                            type="text"
                            name="handle"
                            value={formData.handle}
                            onChange={handleChange}
                            placeholder={formData.platform==="Instagram"
                                ? "closet.core" 
                                : formData.platform === "WhatsApp" || formData.platform === "Phone"
                                ? "9xxxxxxxxx"
                                : formData.platform === "Email"
                                ? "example@email.com"
                                : "Select platform first"
                            }
                            className="inputBox"
                        />
                    </div>

                    {msg && (
                        <p
                            className={`font-medium rounded-md text-center px-3 py-1.5 ${
                                msgType === "success" ? "text-green-600 bg-green-200" : "text-red-500 bg-red-200"
                            }`}
                        >
                            {msg}
                        </p>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="button border border-gray-400 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <input
                            type="submit"
                            disabled={submitting}
                            value={submitting ? "Saving..." : "Save Details" }
                            className="button bg-green-800 text-white hover:bg-green-900 disabled:opacity-60 cursor-pointer"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ContactDetails;