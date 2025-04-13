import { Container, Main_Menu, Main_Content, Main_Title } from './style.jsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import  Clientes  from './Sections/Clientes/Clientes.jsx'
import Processos from './Sections/Processos/Processos.jsx'
import Logo from '../../Images/logo.png'

export default function MainScreen() {
  const [DataLoaded, set_DataLoaded] = useState(false)

  const [option, setOption] = useState("Visão Geral")
  const contentMap = {
    "Visão Geral": <>
                  
                  </>,
    "Clientes": <Clientes Section={option} DataLoaded={DataLoaded} set_DataLoaded={set_DataLoaded}/>,
    "Processos": <Processos />,
    "Intimações": <></>,
    "Tarefas": <></>,
    "Relatórios": <></>
  }

  const SubTitleObject = {
    SubTitles: [
      <p key="Visão Geral">Seja bem-vindo ao sistema de gestão de processos judiciais!</p>,
      <p key="Clientes">Aqui você pode visualizar e gerenciar todos os clientes cadastrados.</p>,
      <p key="Processos">Adicione e gerencie processos de forma eficiente.</p>,
      <p key="Intimações">Veja todas as intimações pendentes e arquivadas.</p>,
      <p key="Tarefas">Organize suas tarefas e prazos importantes.</p>,
      <p key="Relatórios">Visualize relatórios detalhados das suas atividades.</p>
    ]
  }

  return (
    <Container>
      <Main_Menu>
        <img src={Logo} alt="Logo" />
        <ul>
          {Object.keys(contentMap).map((item) => (
            <li key={item} onClick={() => setOption(item)}
            data-active={option === item}>
              {item}
            </li>
          ))}
        </ul>
        <button id="bottone1"><Link to={'/'}><strong>Sair</strong></Link></button>
      </Main_Menu>
      <Main_Content>
        <Main_Title>
          <h1>{option}</h1>
          {/* Adicionando o subtitulo dinamicamente */}
          {SubTitleObject.SubTitles.map((item) => {
            if (item.key === option) {
              return item
            }
            return null
          })}
          <hr />
        </Main_Title>
        {contentMap[option]}
      </Main_Content>
    </Container>
  )
}