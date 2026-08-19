import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const apiURL = import.meta.env.VITE_API_URL;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // true until first checkSession resolves

  const checkSession = async () => {
    try {
      const response = await fetch(`${apiURL}checkSession.php`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (data.loggedIn) {
        setLoggedIn(true);
        setUser(data.user);
      } 
      else {
        setLoggedIn(false);
        setUser(null);
      }
    } 
    
    catch (error) {
      console.error(error);
      setLoggedIn(false);
      setUser(null);
    } 
    
    finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
        await fetch(`${apiURL}logout.php`, {
        method: "POST",
        credentials: "include",
      });
    } 
    
    catch (error) {
      console.error(error);
    } 
    
    finally {
      setLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loggedIn, loading, checkSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};