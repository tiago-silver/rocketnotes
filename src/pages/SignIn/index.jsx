import  { Container, Form, Background} from "./styles"
import { Input } from "../../components/Input"
// Importar o link do react router dom
import { Link } from "react-router-dom"

// importar useState, para definir os estado da página de signIn e capturar os dados
import { useState } from "react"

// Importar o hook da pasta hooks
import { useAuth } from "../../hooks/auth"

// Importar os componentes
import { Button } from "../../components/Button"
import { FiMail, FiLock } from "react-icons/fi"

export function SignIn(){
    // Definir os estado
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    


    // Extrair a função signIn de useAuth
    const { signIn } = useAuth()

    // Função para ativar o signIn, que será disparada no evento de onclick do botão "Entrar"
    function handleSignIn(){

        if(!email || !password){
            return alert("Preenha todos os campos!")
        };
        signIn({email, password});
    }
    return(
        <Container>
            <Form>
            <h1>RocketNotes</h1>
            <p>
                Aplicação para salvar e gerenciar seus links utéis!
            </p>
            <h2>Faça seu login</h2>

            <Input 
            type="text" 
            placeholder = "E-mail" 
            icon={FiMail}
            onChange={e => setEmail(e.target.value)}
            />

            <Input 
            type="password" 
            placeholder = "Senha" 
            icon={FiLock}
            onChange = {e => setPassword(e.target.value)}
            />

            <Button 
            title="Entrar"
            onClick={handleSignIn}
            />

            <Link to="register">
                Criar conta
            </Link>

            
            </Form>

            <Background/>
        </Container>
    )
}