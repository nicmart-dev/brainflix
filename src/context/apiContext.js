/* api feature switch to keep app functional even if API is not */
import React, { createContext, useState, useContext } from "react";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [useAPI, setUseAPI] = useState(true);

    return (
        <APIContext.Provider value={{ useAPI, setUseAPI }}>
            {children}
        </APIContext.Provider>
    );
};

export const useAPIContext = () => useContext(APIContext);