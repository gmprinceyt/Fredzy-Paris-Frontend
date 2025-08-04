import type { ReactElement } from "react";
import { Navigate, Outlet } from "react-router";

interface Props {
    isAuthoticate: boolean;
    children?: ReactElement;
    navigate?: string
}  


const ProtectedRoute = ({isAuthoticate, children, navigate="/"}:Props) => {

    if (!isAuthoticate){
        return <Navigate to={navigate}/>
    }

  return children ? children : <Outlet/>
}

export default ProtectedRoute