import { Container, Form } from "./styles"

// Import hooks de estado
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importar a api para conectar com o backend
import { api } from "../../services/api";



import { Header} from "../../components/Header"

import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea";
import { Section} from "../../components/Section"
import { NoteItem } from "../../components/NoteItem";
import { Button} from "../../components/Button"
import { ButtonText } from "../../components/ButtonText";


export function New(){
    // Estado para salvar as infomações da nota
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // Estado para guardar todos os links
    const [links, setLinks] = useState([])
    // Estado para receber novos links
    const [newLink, setNewLink] = useState("")

     // Estado para guardar todos as Tags
     const [tags, setTags] = useState([])
     // Estado para receber novas tags
     const [newTag, setNewTag] = useState("")

     const navigate = useNavigate()

     // Função para retornar para página anterior
    function handleBack(){
         navigate(-1)
     }
 

    // Funçao para adicionar novos links
    function handleAddLinks(){
        // Pega os links anteriores e espalhem junto com o novo
        if(!newLink){
            return alert("Link vazio!")
        }
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    // Função para remover link
    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
       
    }


    // Função para adicionar Tags
    function handleAddTags(){

        if(!newTag){
            return alert("Tag vazia!")
        }
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    // Função para remover tag
    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
       
    }

    // Função para salvar as informações no banco de dados

    async function handleNewNote(){

        if(!title){
            return alert("Você precisa adicionar o título!")
        }
        if(newLink){
            return alert("Há links sem adicionar! Clique no botão adicionar.")
        }
        if(newTag){
            return alert("Há Tags sem adicionar! Clique no botão adicionar.")
        }
        await api.post("/notes", {
            title,
            description,
            tags,
            links
        })

        alert("Nota cadastrada com sucesso!")

        handleBack()
    }
    return(
        <Container>
            <Header/>

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText 
                        title= "Voltar" 
                        onClick = { handleBack}
                        />
                    </header>
                    {/* Input de entrada do título */}
                    <Input 
                    placeholder = "Título" 
                    onChange = {e => setTitle(e.target.value)}
                    />

                    <Textarea 
                    placeholder = "Observações"
                    onChange = {e => setDescription(e.target.value)}
                    />

                    <Section title="links úteis">

                        {
                            // Para qualquer componentes que for renderizado várias vezes, é necessário uma KEY, o map retona a propiedade index que será usado com chave.
                            links.map((link, index) => (
                                <NoteItem  
                                    key={String(index)}
                                    value={link}
                                    onClick={() => {handleRemoveLink(link)}}
                                />
                            ))
                        }
                        {/* Renderiza os links */}
                        <NoteItem  
                        isNew 
                        placeholder = "Novo link"
                        value={newLink}
                        onChange = {e => setNewLink(e.target.value)}
                        onClick={handleAddLinks}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                           

                            {
                                tags.map((tag, index) => (
                                    <NoteItem  
                                        key={String(index)}
                                        value={tag}
                                      
                                        onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            
                            <NoteItem  
                            isNew 
                            placeholder = "Nova tag"
                            value={newTag}
                            onChange = {e => setNewTag(e.target.value)}
                            onClick={handleAddTags}
                            />

                        </div>

                    </Section>

                    <Button title="Salvar" onClick = {handleNewNote}/>
                </Form>

            </main>
            
        </Container>
    )
}