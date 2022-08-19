import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const ip = 'http://127.0.0.1:8000';
    const [rating, setRating] = useState("");
    return (
        <AuthContext.Provider value={{rating, setRating, search, setSearch,ip }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;