import type { ReactElement } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router";

interface Props {
    isAuthoticate: boolean;
    children?: ReactElement;
    navigate?: string;
    message?:string;
}  


const ProtectedRoute = ({isAuthoticate, children, navigate="/",message}:Props) => {
    if (!isAuthoticate && message){
        toast.error(`Login then proceed to ${message}`);
    }
    if (!isAuthoticate){
        return <Navigate to={navigate}/>
    }

  return children ? children : <Outlet/>
}

export default ProtectedRoute