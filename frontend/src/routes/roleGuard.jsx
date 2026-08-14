import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Shown briefly while checkSession() is still resolving (e.g. on page refresh)
export function LoadingScreen() {
    return (
        <div  className="fixed inset-0 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-md">
            <div className="size-8 rounded-full border-2 border-green-900 border-t-transparent animate-spin" />
        </div>
    );
}

// Browsing cart/checkout: requires a logged-in customer.
// Guests are sent to log in; retailers are sent to their dashboard.
export function CustomerOnlyRoute({ children }) {
    const { user, loggedIn, loading } = useAuth();

    if (loading) return <LoadingScreen />;

    if (!loggedIn) return <Navigate to="/login" replace />;

    if (user?.role !== "customer") return <Navigate to="/dashboard" replace />;

    return children;
}

// Retailer-only area: requires a logged-in retailer.
export function RetailerRoute({ children }) {
    const { user, loggedIn, loading } = useAuth();

    if (loading) return <LoadingScreen />;

    if (!loggedIn) return <Navigate to="/login" replace />;

    if (user?.role !== "retailer") return <Navigate to="/home" replace />;

    return children;
}
