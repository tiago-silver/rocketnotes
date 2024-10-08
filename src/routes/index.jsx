import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

// Importar o auth de verificação do login
import { useAuth } from "../hooks/auth";

export function Routes(){
    const { user} = useAuth()
    return(
        <BrowserRouter>
            {user ? <AppRoutes/> : <AuthRoutes/>}
        </BrowserRouter>
    )
}