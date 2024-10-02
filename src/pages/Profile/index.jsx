import { Container,Form, Avatar} from "./styles";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";

// Importação dos componentes
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";import { ButtonText } from "../../components/ButtonText";


// Importação dos hooks
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

// Importta o useNavigate
import { useNavigate } from "react-router-dom";

// IMportatr a imagem de placeholder do perfil
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

// Importar api 
import { api} from '../../services/api'

export function Profile(){
    // Pegar os dados do usuário dos hooks
    const { user, updateProfile} = useAuth()

    // Criando os estados 
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()

    // Ativar o use navigate
    const navigate = useNavigate()

    // Criar para verificar se já existe uma foto de perfil cadastrada
    const avatarUrl =  user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
    console.log(`${api.defaults.baseURL}/files/${user.avatar}`)

    // Criando o estado da imagem de perfil do usuário
    const [avatar, setAvatar] = useState(avatarUrl)
    // estado para guardar o arquivo de imagem
    const [avatarFile, setAvatarFile] = useState(null)

    // Função para retornar para página anterior
    function handleBack(){
        navigate(-1)
    }


   async function handleUpdate(){
        const updated = {
            name : name,
            email : email,
            password : newPassword,
            oldPassword : oldPassword

        }
        const userUpdated = Object.assign(user, updated);

        await updateProfile({user: userUpdated, avatarFile})
    }
    // Função para atualizar foto de perfil
    async function handleChangeAvatar(event){
        const file = event.target.files[0]
        setAvatarFile(file);

        // Cria uma URL para visualizar imagem
        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
        
    }
    return(
        <Container>
            <header>
                <button onClick={handleBack}>
                    <FiArrowLeft/>
                </button>
               
                   
                
            </header>

            <Form>

                <Avatar>
                    <img src={avatar} alt={`Foto do perfil de ${user.name}`} />
                    <label htmlFor="avatar">
                        <FiCamera/>
                        <input type="file" name="" id="avatar" onChange={handleChangeAvatar} />
                    </label>
                </Avatar>
                
                <Input 
                    type="text" 
                    placeholder="Nome" 
                    icon={FiUser} 
                    value={name} 
                    onChange = {e => setName(e.target.value)}
                />

                <Input 
                    type="email" 
                    placeholder="E-mail" 
                    value = {email}
                    icon={FiMail}
                    onChange = {e => setEmail(e.target.value)}
                />

                <Input 
                    type="password" 
                    placeholder="Senha antiga" 
                    icon={FiLock}
                    
                    onChange = {e => setOldPassword(e.target.value)}
                
                />

                <Input 
                    type="password"
                    placeholder="Nova senha" 
                    icon={FiLock}
                  
                    onChange = {e => setNewPassword(e.target.value)}
                />

                <Button title="Salvar" onClick = {handleUpdate}/>
            </Form>
        </Container>
    )
}