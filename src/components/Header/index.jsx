import {RiShutDownLine} from 'react-icons/ri'
import  { Container, Profile, Logout } from "./style";

// Importar o hooks useAuth
import { useAuth } from '../../hooks/auth';

import { useNavigate } from 'react-router-dom';

// Importar a api
import { api } from '../../services/api';

// Importar a iamgem de placeholder
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
export function Header(){

    const navigate = useNavigate()

    const { signOut, user } = useAuth()

    function handleSignOut(){
        navigate("/")
        signOut();
    }
    function handleProfile(){
        navigate("/")
        navigate("/profile")
    }

    return (
        <Container>
            <Profile onClick={handleProfile}>
                <img src={user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder} alt={`Foto do perfil de ${user.name}`} />
                <div>
                    <span>Bem-vindo(a)</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            <Logout onClick={handleSignOut} title='Sair'>
                <RiShutDownLine />
                
            </Logout>
        
        </Container>
    )
}