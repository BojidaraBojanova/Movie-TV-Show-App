import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";


export default function AuthGuard(props) {
    const { isAuthenticated } = useContext(AuthContext);

    console.log(isAuthenticated)

    if(!isAuthenticated) {
        return <Navigate to='/login' />
    }

    return <Outlet/>
}