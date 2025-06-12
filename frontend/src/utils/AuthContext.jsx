import { createContext } from "react";
import { User } from "../models/UserInfo";

export const AuthContext = createContext({
    isLogged: false,
    setIsLogged: () => {},
    user: new User(),
    setUser: () => {},
});
