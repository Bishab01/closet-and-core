import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="body">
            <div className="responsiveM">
                <div
                    className="flex flex-col items-center justify-center text-center p-16 gap-4
                    border border-dashed bg-white/60 rounded-3xl"
                >
                    <ShieldCheck className="w-12 h-12 text-green-800" />
                    <p className="text-xl sm:text-2xl font-serif font-bold">Retailer Dashboard</p>
                    <p className="text-gray-600 max-w-md">
                        You're logged in as a retailer{user?.email ? ` (${user.email})` : ""}.
                        Product and order management tools will be added here next.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
