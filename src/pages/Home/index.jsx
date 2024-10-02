import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"
import { Header} from "../../components/Header"
import { FiPlus, FiSearch} from "react-icons/fi"

import { ButtonText} from "../../components/ButtonText"
import { Input } from "../../components/Input"
import { Section } from "../../components/Section"
import { Note } from "../../components/Notes"

// Import o hooks de estado
import { useEffect, useState } from "react"
// Importar a api
import { api } from "../../services/api"

// Importar o useNavigation para navegção das páginas
import { useNavigate } from "react-router-dom"

export function Home(){
    // estado para o search
    const [search, setSearch] = useState("")
    // Estado para as notas
    const [notes, setNotes] = useState([])
    // Construindo o  estado como uma array vazia
    const [tags, setTags] = useState([])
    // Criando o estado para pegar as tags selecionadas
    const [tagsSelected, setTagsSelected] = useState([])

    // Ativando o navigate
    const navigate = useNavigate()

    // Função para lhe da com as tags selecionadas
    function handleTagsSelected(tagName){
        if(tagName === "todos"){
            setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName)
    

        if(alreadySelected){
            const tagsFiltered = tagsSelected.filter(tag => tag !== tagName)

            setTagsSelected(tagsFiltered)
        }else{
            setTagsSelected(prevState => [...prevState,tagName])

        }
    }

    useEffect(() =>{
            // useEffect para buscar todas as tags, não tem dependência, ou seja, vai acontecer somente uma vez.
        	async function fetchTags(){
               const response = await api.get("/tags")
                setTags(response.data)
            }

            fetchTags()
    }, [])

    // UseEffect para buscar todas as notas, com dependências nas tags selecionadas e no search, ou seja, quando o estado destes campos alterarem, será disparada a função que estiver dentro.
    useEffect(() =>{
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }

        fetchNotes();
    }, [tagsSelected, search])

    // Função para visualizar as notas 
    function handleDetails(id){
        navigate(`/details/${id}`)
    }

    return(
        <Container>
            <Brand>
                <h1>RocketNotes</h1>
            </Brand>
            <Header>

            </Header>
            <Menu>
                 <li>
                 <ButtonText 
                 title="Todos" 
                 $isactive = {tagsSelected.length === 0} 
                 onClick={() => handleTagsSelected("todos")}
                 />
                </li>
                {
                    // verifica se existe tag, se existir, renderiza-lo
                    tags && tags.map(tag => (
                        
                        <li  key={String(tag.id)}>
                            <ButtonText 
                                title={tag.name}
                                onClick = {() => handleTagsSelected(tag.name)} 
                                $isactive = {tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>
            <Search>
                <Input 
                icon={FiSearch} 
                placeholder = "Pesquisar pelo título"
                onChange={(e)=> setSearch(e.target.value)}
                />
            </Search>
            <Content>
                <Section title="Minhas notas">

                    {
                        // Renderiza as notas
                        notes.map(note =>(
                            <Note 
                            key={String(note.id)}
                            data={note}
                            onClick = {() => handleDetails(note.id)}
                            />
                        ))
                    }
                    
                </Section>
                
            </Content>
            <NewNote to="new">
               <FiPlus/>
               Adicionar nota
            </NewNote>
        </Container>
    )
}