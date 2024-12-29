import {useState, createContext} from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({children}) => {
    const [token, setToken] = useState(null);
    return (
        <AuthenticationContext.Provider value = {{token, setToken}}>
            {children}
        </AuthenticationContext.Provider>
    )
}

