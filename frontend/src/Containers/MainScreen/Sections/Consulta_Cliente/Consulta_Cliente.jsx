import { Grid_Box, Search_box, Consult_button, Card_Cliente, ShowClientes } from "./style"
import { useState, useEffect } from "react"
import { UserPlusIcon } from "@heroicons/react/20/solid"
import { motion, AnimatePresence } from "framer-motion"
import Clientes from "./Add_Clientes/Clientes"
import Loading from "../../../../components/Loading_Form/Loading"
import Particles from "../../../../components/Particles/ParticlesBackground"
import axios from "axios"

export default function Consulta_Cliente(){

    // Clientes adicionados
    const [allClientes, set_allClientes] = useState([]) 
    const [filterClientes, set_filterClientes] = useState("")
    const filter = allClientes.filter(cliente => cliente.nm_Cliente.toLowerCase().includes(filterClientes.toLocaleLowerCase()))

    // Variáveis de Estado
    const [firstRender, set_firstRender] = useState(false)
    const [addCliente, set_addCliente] = useState(false)
    const [Loading_clientes, setLoading_clientes] = useState(false)
    const [cardOpen, set_cardOpen] = useState(null)
    const [cardVeryDetailed, set_cardVeryDetailed] = useState(null)
    const [addedCliente, set_addedCliente] = useState(false)

    // Função para chamar todos os clientes
    const getAllClientes = async () => {
        setLoading_clientes(true)

        try{
            const response = await axios.get("http://192.168.100.3:5000//get_Allclientes")
            console.log(response.data)
            set_allClientes(response.data)

            setLoading_clientes(false)
        }catch(error){
            console.log(error)
            setLoading_clientes(false)
        }
    }

    // Pegando os clientes (também pega após uma inserção)
    useEffect(() => {
        if(!firstRender){
            set_firstRender(true)
            getAllClientes()
        }

        if(addedCliente)
            getAllClientes()
    }, [firstRender, addedCliente])


    // Ordena os cards pelo que foi clicado em "ver mais detalhes"
    const orderedClientes = [...filter].sort((e) => {
        if(e.cd_Cliente === cardVeryDetailed) 
            return -1 // a Vem antes
        return 0 // Mantem a ordem
    })

    return(
        <>
            <ShowClientes $addClientes={addCliente}>
                {Loading_clientes && (<Loading setDOM={true} />)}
                <Search_box>
                    <label htmlFor="input" id="desktopLabel">Nome do cliente</label>
                    <label htmlFor="input" id="mobileLabel">Nome</label>
                    <input type="text" id="input" onChange={(e) => set_filterClientes(e.target.value)}/>
                    <Consult_button type="button" onClick={() => set_addCliente(prev => !prev)}>
                            <p>Adicionar Cliente</p>
                            <UserPlusIcon />
                    </Consult_button>
                </Search_box>
                
                <Grid_Box>
                    <div className="onlyDesktop"> { /* Muito pesado para mobile, retirado até aumentar performance */}
                        <Particles />
                    </div>
                    <AnimatePresence>
                        {orderedClientes.map((cliente) => {

                            const isOpen = cardOpen === cliente.cd_Cliente
                            const veryDetailed = cardVeryDetailed === cliente.cd_Cliente
                            const isFullDetailed = cardVeryDetailed !== null 
                            ? veryDetailed // Só o selecionado fica visível
                            : true // todos aparecem

                            // Formatando e exibindo o CPF ou CNPJ dinamicamente
                            const codigoParte = () => {

                                if(cliente.cd_CPF == null)
                                    return cliente.cd_CNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
                                return cliente.cd_CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                            }

                            // Alguns endereços não possuem complementos, removendo o espaço em branco
                            const ComplementoEndereco = () =>{
                                if(cliente.ds_ComplementoEndereco == null)
                                    return null
                                return(
                                    <p>{cliente.ds_ComplementoEndereco}</p>
                                ) 
                            }

                            const formatedPhone = cliente.cd_Telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")

                            return(
                                <motion.div
                                    key={cliente.cd_Cliente}
                                    layout="position"  // layout sozinho causa o bug "elastico" ao mudar a largura
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Card_Cliente $detailed={isOpen} $fullDetailed={isFullDetailed} key={cliente.cd_Cliente} onClick={() => {
                                        if(!veryDetailed) set_cardOpen(isOpen ? null : cliente.cd_Cliente)
                                        }}>
                                        <div className="card-Content">
                                            <p><strong>{cliente.nm_Cliente}</strong></p>
                                            <p>{codigoParte()}</p>
                                            <p>{formatedPhone}</p>
                                            <p>{cliente.ds_Email}</p>
                                            <hr />
                                            <p>{cliente.nm_Logradouro}, Nº {cliente.cd_NumeroEndereco}</p>
                                            <p>{cliente.nm_Bairro}</p>
                                            {ComplementoEndereco()}
                                            <p>{cliente.nm_Cidade}, {cliente.sg_Estado}</p>
                                            <br />
                                            <h6 onClick={(e) => {
                                                e.stopPropagation() // Evita que o Pai escute o evento
                                                set_cardVeryDetailed(veryDetailed ? null : cliente.cd_Cliente)
                                                }}>{veryDetailed ? "voltar" : "ver mais detalhes"}
                                            </h6>
                                            {/* Quando o usuário clicar em "ver mais detalhes" */}
                                            {veryDetailed && (
                                                <>
                                                    <hr style={{ height: "3px", backgroundColor: "#CDAF6F", border: "none", boxShadow: "0 0 30px #CDAF6F" }}/>
                                                    <h4><strong>Processos</strong></h4>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        {(cliente.cd_numProcessos).split("@").map((item, index) => 
                                                            <p key={index} style={{ textAlign: "center" }}>{item}</p>)
                                                        }
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </Card_Cliente>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </Grid_Box>
            </ShowClientes>
            <Clientes showWindow={addCliente} setShowWindow={set_addCliente} setaddedCliente={set_addedCliente} />
        </>
    )
}