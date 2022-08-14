import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const [ip, setIp] = useState('http://192.168.43.39:9000');
    const [rating, setRating] = useState("");
    return (
        <AuthContext.Provider value={{rating, setRating, search, setSearch,ip }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;