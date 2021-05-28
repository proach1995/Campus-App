import React ,{useState, createContext} from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) =>{

   
    const [user, setUser] = useState();
    const [logged, setLogged] = useState();
    

    return(
        <AppContext.Provider value = {{
                                        user:user,
                                        logged:logged,
                                        setUser:setUser,
                                        setLogged:setLogged
                                            }}>    
        {props.children}
        </AppContext.Provider>
    )

}