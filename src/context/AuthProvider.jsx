import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const signup = ({ email, password }) => {
    localStorage.setItem("user", JSON.stringify({ email, password }));
  };

  const login = ({ email, password }) => {
    const stored = JSON.parse(localStorage.getItem("user"));

    if (!stored) return false;

    if (stored?.email === email && stored?.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };


  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const sync = () =>
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");

    window.addEventListener("storage", sync);

    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
