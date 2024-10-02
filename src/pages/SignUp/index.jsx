// Import useState para criar estados (hook)
import { useState } from "react"
import { FiMail, FiLock, FiUser } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"

// Importar a api do service para mandar as informações para o backend
import { api } from "../../services/api"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import  { Container, Form, Background} from "./styles"
export function SignUp(){
    // Estruturando o useState
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Ativar use navigate
    const navigate = useNavigate()

    // Função para enviar as requisições
    function handleSignUp(){
        if(!name || !email || !password){
           return alert("Preencha todos os campos!")
        }

        api.post("/users",{name, email, password}).then(() => {
            alert("Usuário cadastrado com sucesso!")
            // permite o usuário após cadastrado, acessar a página de login
            navigate("/")

        }).catch(error => {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Não foi possível cadastrar usuário!")
            }
        })
    }

    return(
        <Container>
            <Background/>
            <Form>
                <h1>RocketNotes</h1>
                <p>
                    Aplicação para salvar e gerenciar seus links utéis!
                </p>
                <h2>Crie sua conta</h2>

                <Input 
                type="text" 
                placeholder = "Nome" 
                icon={FiUser}
                onChange = { e => setName(e.target.value)}
                />

                <Input 
                type="text" 
                placeholder = "E-mail" 
                icon={FiMail}
                onChange = { e => setEmail(e.target.value)}
                />

                <Input 
                type="password" 
                placeholder = "Senha" 
                icon={FiLock}
                onChange = { e => setPassword(e.target.value)}
                />

                <Button title="Cadastrar" onClick={handleSignUp}/>

                <Link to = "/">
                    Voltar para o login
                </Link>

            
            </Form>

            
        </Container>
    )
}