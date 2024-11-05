import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [play, setplay] = useState([])
    const [palying, setPlaying] = useState([])
    
    return (
        <Context.Provider value={{ token, setToken, play, setplay, palying, setPlaying }}>
            {children}
        </Context.Provider>
    );
};
