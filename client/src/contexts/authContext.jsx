import { createContext } from "react";
import { useNavigate } from "react-router-dom"
import usePersistedState from "../hooks/usePersistedState";

import * as authService from '../services/authService'
import Path from "../paths";

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.firstName, values.lastName, values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate(Path.Home)
    }

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate(Path.Home);
    }

    const logoutHandler = () => {
        setAuth({});
        localStorage.removeItem('token');
    }

    const values = {
        registerSubmitHandler,
        loginSubmitHandler,
        logoutHandler,
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.email,
        userId: auth._id,
        isAuthenticated: !!auth.token
    };

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;