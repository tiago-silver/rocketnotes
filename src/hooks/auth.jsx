// Importa o hook useContext (permite uasr o context)
import { createContext, useContext, useState, useEffect} from "react";

// Importar a api para conectar com banco de dados e autenticar o usuário
import { api} from "../services/api"


export const authContext = createContext({})

function AuthProvider({ children}){
    // Salvando o usuário no estado
    const [ data, setData] = useState({})

    async function signIn({ email, password}){
        // Passa as informções para a rota de sessions, que contém a verificação do usuário        
        try {
            const response = await api.post("/sessions", { email, password})
            const {user, token} = response.data

            // Passar o o user e o token para o cabeçalho da aplicação
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            // Salvando o usuário no objeto data no estado
            setData({user, token})

            // Salvar os dados (user) no localstorage do navegadior 
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            // Salvar o token
            localStorage.setItem("@rocketnotes:token", token)


    
        } catch (error) {
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert ("Não foi possível entrar!")
            }
        }
        
    }

    // Função para atualizar os daos do usuário
    async function updateProfile({ user, avatarFile}){
        try{

            // Verifica se existe um arquivo selecionado
            if(avatarFile){
                // Converter para arquivo 
                const fileUploadForm = new FormData();
                // Criar um campo avatar dentro de fileUploadForm
                fileUploadForm.append("avatar", avatarFile)

                // Fazer uma requisição para as rotas de usuario
                const response = await api.patch("/users/avatar", fileUploadForm);
                // Atualiza o usuario com novas informações do perfil
                user.avatar = response.data.user.avatar
                console.log(response.data.user.avatar);
            }

            await api.put("/users", user)

            // Atualizar os dados do localStorage
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

            // Atualizar os estado
            setData({user, token: data.token})

            alert("Pefil atualizado com sucesso!")

        }catch (error) {
            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert ("Não foi possível atualizar o perfil!")
            }
        }
    }

    // Função para deslogar da aplicação e remover os dado do localStorage
    function signOut(){
        localStorage.removeItem("@rocketnotes:user")
        localStorage.removeItem("@rocketnotes:token")

        setData({});

    }

    // Utilizar o useEffect  para atualizar os estado com os salvos no localStorage
    useEffect(() => {
        const user = localStorage.getItem("@rocketnotes:user");
        const token = localStorage.getItem("@rocketnotes:token");

        if(user && token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, [])

    return(
        // Passando  os dados para to da aplicação
        <authContext.Provider value={
        {signIn, 
        signOut, 
        updateProfile, 
        user: data.user
        }}>
            {children}
        </authContext.Provider>
    )
}

function useAuth(){
    const context = useContext(authContext)

    return context
}

export { AuthProvider, useAuth } 