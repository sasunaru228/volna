import React, { createContext, useContext } from "react";
import { userStore } from "./UserStore";
import { musicStore } from "./MusicStore";

const StoreContext = createContext({ userStore, musicStore })

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <StoreContext.Provider value={{ userStore, musicStore }}>
        {children}
    </StoreContext.Provider>
)

export const useStores = () => useContext(StoreContext)