import React, { createContext, useState } from 'react';


export const ShoesContext = createContext();


export const ShoesWrapper = ({ children }) => {

    const [shoes, setShoes] = useState([]); 


    const [appLoading, setAppLoading] = useState(false); 

    return (
        <ShoesContext.Provider
            value={{
                shoes,          
                setShoes,      
                appLoading,     
                setAppLoading,  
            }}
        >
            {children} 
        </ShoesContext.Provider>
    );
};
