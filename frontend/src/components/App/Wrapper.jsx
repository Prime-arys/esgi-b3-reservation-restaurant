import { AuthContext } from "../../utils/AuthContext";
import {
    useQuery,
} from "@tanstack/react-query";
import { getUserInfo } from "../../api/UserInfo";



export default function Wrapper({ children }) {
    const { isPending, data: logged } = useQuery({
        queryKey: ["isLogged"],
        queryFn: getUserInfo,
        refetchOnWindowFocus: false,
    });

    if (isPending) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        );
    }

    return (

        <AuthContext.Provider
            value={{
                isLogged: logged !== undefined && logged !== null,
                setIsLogged: () => { },
                user: logged,
                setUser: () => { },
            }}>
            {children}
        </AuthContext.Provider>
    );
}