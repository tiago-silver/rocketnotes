// Import useState e useEffect para determinar estados e buscar dados
import { useState, useEffect } from "react"
import { Container, Links, Content } from "./styles"
// Import do useParams para pegar valores dos parametros
import { useParams, useNavigate } from "react-router-dom"


// Import da api para conexão com o back end
import { api } from "../../services/api"
// Importação dos componentes 
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tags"
import { ButtonText } from "../../components/ButtonText"

export  function Details(){
  const [ data, setData] = useState(null)
  // Ativar o useParams
  const params = useParams()
  const navigate = useNavigate()


  // Função para retornar para página anterior
  function handleBack(){
    navigate(-1)
  }
  
  // Função para excluir nota
  async function handleDeleteNotes(){
    const confirm = window.confirm(`Deseja realmente deletar esta nota?`)

    if(confirm){
      await api.delete(`/notes/${params.id}`)
      alert("Nota deletada com sucesso!")
      handleBack()

    }
  }

  // UseEffect para buscar notas de acordo com o id do params
  useEffect(()=>{
    async function fetchNotes(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    fetchNotes()
  },[])
  return(
    <Container>
      <Header/>
    {
      data &&
      <main>
        <Content>
        <ButtonText  
        title="Excluir nota"
        onClick = {handleDeleteNotes}
        />

        <h1>{data.title}</h1>

        <p>
         {data.description}
        </p>

        {
          // Renderiza os links
          data.links && 
          <Section title="Links úteis">
          <Links>
            {
              data.links.map(link => (

                <li  key={link.id}>
                  <a 
                    href={link.url}
                    target="a_blank"
                    >
                      {link.url}
                    </a> 
                </li>
              ))

            }
          </Links>

        </Section>
        }

        {
          data.tags &&
          <Section title="Marcadores">
            {
              data.tags.map(tag => (
                <Tag 
                key={tag.id}
                title= {tag.name}>

                </Tag>
              )

              )
            }
            
        </Section>
        }

        <Button 
        title = "Voltar"
        onClick = {handleBack}
        />

        </Content>
      </main>
    }
    </Container>
    
  )
}