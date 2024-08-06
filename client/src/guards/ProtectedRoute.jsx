import {Navigate} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';

export default function ProtectedRoute({
    element, 
    redirectPath = '/',
    ...rest
}){
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Navigate to={redirectPath} /> : element;
}