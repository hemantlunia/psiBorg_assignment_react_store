import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


export default function RootRouter(){
   const {isloggedIn}= useAuth();

   if (isloggedIn) {
    return<Navigate to="/products" replace/>
   }

   return <Navigate to="/auth" replace/>
}