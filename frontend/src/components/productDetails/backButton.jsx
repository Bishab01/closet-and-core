import { ArrowLeft } from "lucide-react";

function BackButton({ onClick }) {
    return (
        <div className="absolute top-0 left-0 right-0 z-20 responsiveM mt-5!">
            <button
                className="bg-white/70 backdrop-blur-md border border-white/70 shadow-sm rounded-xl py-1 px-2
                flex items-center gap-1.5 text-sm text-gray-600 font-medium hover:text-gray-800"
                onClick={onClick}
            >
                <ArrowLeft className="w-4 h-4" />
                Back 
            </button>
        </div>
    );
}

export default BackButton;