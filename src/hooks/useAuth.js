import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = ()=>{
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("error in AuthContext! check it again.")
    }
    return ctx;
}