import React from 'react'
import Navbar from '../components/navbar'
import Cancelar from '../imagens/cancelar.svg'
// import Editar from '../imagens/editar.svg'
import Add from '../imagens/add.svg'
import Busca from './Busca/busca'
import Chat from '../components/Chat'
import DOMPurify from 'dompurify';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import SelectType from '../components/select'
import SelectKnow from '../components/select-know'
import Conhecimentos from '../components/conhecimentos-field'
import Interesses from '../components/interesses-field'
import LocalStorage from '../services/local-storage'
import axios from 'axios'



class Perfil extends React.Component {


    state = {

        nome: '',
        id_user: '',
        photo: '',
        desc_atualize: '',
        desc_default: '',
        visible: false,
        tod_delete: '',
        busca_content: '',
        footer: '',
        boolean: true,
        description: '',
        know_request: [],
        know_select: [],
        interest_request: [],
        type_request :[],
        id_select_conhecimento: '',
        desc_new_know: '',
        desc_new_interest: '',

    }

    constructor() {
        super();
        this.busca = new Busca();
    }


    componentDidMount() {


        this.load();
        this.reset();       
        this.loadType();   
        this.scrollTop();     
        this.loadConhecimentos();
        this.loadInteresses();

        var isDark = LocalStorage.getItem("_darkmode")
        const $html = document.querySelector('html')
    
        if(isDark) {
          $html.classList.add('dark-mode')      
        } 


    }

    scrollTop = () => {
        window.scrollTo(0, 0);
    };


    load = () => {

        const usuario = localStorage.getItem('usuario_atual')
        const usuarioLogado = JSON.parse(usuario)

        this.setState({ nome: usuarioLogado.nome })
        this.setState({ id_user: usuarioLogado.id })
        this.setState({ photo: usuarioLogado.photo })

        axios.get(`https://35.168.142.138:4040/user/about?id=${usuarioLogado.id}`)
            .then(response => {
                const data = response.data

                this.setState({ description: data })

                this.setState({ desc_default: data })

                this.format();

            })
            .catch(erro => {
                console.log(erro.data)
            })

    }

    loadType = () => {


        axios.get('https://35.168.142.138:4040/conhecimentos/types')
            .then(response => {
                const data = response.data

                this.setState({ type_request: data })

            }).catch(erro => {
                console.log(erro.data)
            })

    }

    reset = () => {
        this.setState({ know_request: [] })
        this.setState({ interest_request: [] })
    }

    loadConhecimentos = () => {

        const usuario = localStorage.getItem('usuario_atual')
        const usuarioLogado = JSON.parse(usuario)

        axios.get(`https://35.168.142.138:4040/conhecimentos/buscar/conhecimentos?id=${usuarioLogado.id}`)
            .then(response => {
                const data = response.data

                this.setState({ know_request: data })

            }).catch(erro => {
                console.log(erro.data)
            })

    }

    loadInteresses = () => {
        

        const usuario = localStorage.getItem('usuario_atual')
        const usuarioLogado = JSON.parse(usuario)

        axios.get(`https://35.168.142.138:4040/conhecimentos/buscar/interesses?id=${usuarioLogado.id}`)
            .then(response => {
                const data = response.data

                this.setState({ interest_request: data })

            }).catch(erro => {
                console.log(erro.data)
            })

    }

    format = () => {


        const data = this.state.description

        let str = data.replace(/(?:\r\n|\r|\n)/g, '<br>');

        this.setState({ description: str })

        


    }

    editar = () => {
        let descript = this.state.desc_default;
        document.getElementById('text-about').value = descript;
        document.getElementById('div-about').style.display = 'inline';
        document.getElementById('text-about').style.display = 'inline';
        document.getElementById('div-blur').style.filter = 'blur(4px)';

    }

    editarConhecimento = () => {

        document.getElementById('div-about-conhecimento').style.display = 'inline';        
        document.getElementById('div-blur').style.filter = 'blur(4px)';
        document.getElementById('chat-component').style.display = 'none' 

       

    }

    toHome = () => {
        this.props.history.push('/home')
    }

    toPerfil = () => {
        this.props.history.push('/perfil')
    }

    sair = () => {
        axios.get('https://35.168.142.138:4040/logoff')
            .then(response => {
                LocalStorage.removeAll();
                this.props.history.push('/login')
            }).catch(erro => {
                console.log(erro.response.data)
            })
    }


    atualizar = () => {


        axios.patch("https://35.168.142.138:4040/user/about", {
            id: this.state.id_user,
            sobre: this.state.desc_atualize
        })
            .then(response => {
                if (response) {
                    this.load()
                    document.getElementById('div-about').style.display = 'none';
                    document.getElementById('div-blur').style.filter = 'blur(0px)';
                    this.setState({ desc_atualize: '' });
                }
            }).catch(erro => {
                console.log(erro.data)
            })
    }

    cancelar = () => {
        document.getElementById('div-about').style.display = 'none';
        document.getElementById('div-blur').style.filter = 'blur(0px)';        
        this.setState({ desc_atualize: '' });
    }

    cancelarDelecao = () => {
        this.setState({visible: false})
        this.setState({to_delete: ''})
        
    }

    cancelarConhecimento = () => {
        document.getElementById('div-about-conhecimento').style.display = 'none';
        document.getElementById('div-blur').style.filter = 'blur(0px)';
        document.getElementById('chat-component').style.display = 'inline-block' 
        this.setState({ desc_atualize: '' });
    }

    editarInteresse = () => {

        document.getElementById('div-about-interesse').style.display = 'inline';
        document.getElementById('chat-component').style.display = 'none' 
        document.getElementById('div-blur').style.filter = 'blur(4px)';

    }

    cancelarInteresse = () => {
        document.getElementById('div-about-interesse').style.display = 'none';
        document.getElementById('div-blur').style.filter = 'blur(0px)';
        document.getElementById('chat-component').style.display = 'inline-block' 
        this.setState({ desc_atualize: '' });
    }

    addConhecimento = () => {

        axios.post('https://35.168.142.138:4040/conhecimentos/adicionar/conhecimento',
        {
            descricao_user: this.state.desc_new_know,
            nivel: 1,
            usuario: {
                id:this.state.id_user
            },
            conhecimento : {
                id_conhecimento: this.state.id_select_conhecimento
            }        
        }).then(response =>{
            window.location.reload();
        }).catch(erro => {
            console.log(erro.data)
        })
   
        }

        addInteresse = () => {

            axios.post('https://35.168.142.138:4040/conhecimentos/adicionar/interesse',
            {
                descricao_interesse: this.state.desc_new_interest,
                usuario: {
                    id:this.state.id_user
                },
                conhecimento : {
                    id_conhecimento: this.state.id_select_conhecimento
                }        
            }).then(response =>{
                console.log(response.data)
                window.location.reload();
                console.log(this.state.id_select_conhecimento)
            }).catch(erro => {
                console.log(erro.data)
            })
       
            }

    
     select = (value) =>{

           axios.get(`https://35.168.142.138:4040/conhecimentos/knowledges/${value}`)
                    .then(response => {
                        const data = response.data
        
                        this.setState({know_select: data })
        
                    }).catch(erro => {
                        console.log(erro.data)
                    })
        
            }


    setID = (id) => {

        this.setState({id_select_conhecimento: id})

    }



    showDeleteDialogConhecimento = (id) => {

        this.setState({boolean: true})

        const conhecimento = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletarConhecimento} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        this.setState({footer: conhecimento})
        this.setState({visible: true})
        this.setState({to_delete: id})

    }

    showDeleteDialogInteresse = (id) => {

        this.setState({boolean: false})

        const interesse = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletarInteresse} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        this.setState({footer: interesse})
        this.setState({visible: true})
        this.setState({to_delete: id})

    }



     deletarConhecimento = () => {

    axios.delete(`https://35.168.142.138:4040/conhecimentos/remover/conhecimento/${this.state.to_delete}`)
    .then(response => {
        console.log("Deletado com sucesso")
        window.location.reload();
    }).catch(erro => {
        console.log(erro.data)
    })

    
        
}

    deletarInteresse = () => {
        axios.delete(`https://35.168.142.138:4040/conhecimentos/remover/interesse/${this.state.to_delete}`)
        .then(response => {
            console.log("Deletado com sucesso")
            window.location.reload();
        }).catch(erro => {
            console.log(erro.data)
        })

}

buscar = () => {


    this.props.history.push(`/busca/${this.state.busca_content}`)
           
   
   }


    render() {

        const sanitizer = DOMPurify.sanitize;
       
        return (
            
            <>
      
                <div id="div-blur" className="blur">
                    <Navbar 
                    executeSair={this.sair}
                    executePerfil={this.toPerfil} 
                    sendTo={this.toHome}
                    className="container"
                    action={this.buscar}
                    value={this.state.busca_content}
                    change={e =>this.setState({busca_content: e})}/>
                    <div className="back-img"></div>
                    <div className="circle-perf">
                        <img className="img-perfil" src={this.state.photo} />
                    </div>
                    <div className="container-fluid">
                        <div className="user-space">

                            <span className="about">Sobre</span>
                            <div onClick={this.editar} className="btn-edit"></div>
                           
                            <br></br><br></br>
                            <div id="span-desc" dangerouslySetInnerHTML={{ __html:sanitizer(this.state.description)}} className="descript-user"></div>


                        </div>

                        <div className="box-perf1">
                            <div className="row">
                                <div className="div-know">

                                <label className="label-know">Conhecimentos</label>
                                <img onClick={this.editarConhecimento} className="add-know" src={Add} />

                                </div>
                               

                            </div>
                            <Conhecimentos action={this.showDeleteDialogConhecimento} body={this.state.know_request} />
                        </div>
                        <div className="box-perf2">
                            <div className="row">
                                <div className="div-interest">

                                <label className="label-interest">Interesses</label>
                                <img onClick={this.editarInteresse} className="add-interest" src={Add} />

                                </div>
                                 
                            </div>
                            <Interesses action={this.showDeleteDialogInteresse} body={this.state.interest_request} />
                        </div>
                    </div>
                </div>

                

                                
                <Dialog p-dialog-visible="false" footer={this.state.footer} header={this.state.boolean ? 'Deletando Conhecimento'
                                                        : 'Deletando Interesse'} visible={this.state.visible} 
                                                        style={{width: '50vw'}} modal={true} onHide={() => this.setState({visible: false})}>
                                                           Você está prestes a remover um {this.state.boolean ? 'Conhecimento'
                                                        : 'Interesse'}, tem certeza disso ?
                </Dialog>

                    

                <div id="div-about" className="div-sobre-user">
                    <label className="label-about">Conte-nos um pouco sobre <b className="blue">você</b></label>
                    <img onClick={this.cancelar} className="exit-about" src={Cancelar} />
                    <textarea onChange={e => this.setState({ desc_atualize: e.target.value })} id="text-about" className="text-sobre" cols="30" rows="5"></textarea>
                    <button onClick={this.atualizar} className="btn-sender-about-user">Enviar</button>
                </div>



                {/* Modal conhecimento */}
                <div id="div-about-conhecimento" className="div-sobre con">
            
                    <div className="conhecimento">
                        
                    
                        <label className="label-about "><h3>Conhecimento</h3></label>
                        <img onClick={this.cancelarConhecimento} className="exit-about" src={Cancelar} />
                        
                        
                    </div>
                    <div className="content-conhecimento">
                        <label for="tipoC">Tipo:*</label>
                        <SelectType action={this.select} body={this.state.type_request}/>

                        <label for="cTipo">Conhecimento:*</label>

                        <SelectKnow action={this.setID} body={this.state.know_select} />

                        <div className="text-contentC">
                        Seu nível iniciará com <b className="one-level">1</b> compartilhe este conhecimento com alguém para aumentar seu nível.
                        </div>
                        <label for="cTipo">Descrição:</label>                        
                        <textarea onChange={e => this.setState({desc_new_know: e.target.value})} id="text-aboutC" className="text-sobreC" cols="30" rows="5"></textarea>
                        <button onClick={this.addConhecimento} className="btn-sender-about">Enviar</button>
                    </div>
                    
                </div>


                {/* Modal interesse */}
                <div id="div-about-interesse" className="div-sobre con">
                    <div className="conhecimento">
                        <label className="label-about "><h3>Interesse</h3></label>
                        <img onClick={this.cancelarInteresse} className="exit-about" src={Cancelar} />
                    </div>
                    <div className="content-conhecimento">
                        <label for="tipoC">Tipo:*</label>

                        <SelectType action={this.select} body={this.state.type_request}/>
                        
                        <label for="cTipo">Conhecimento:*</label>

                        <SelectKnow action={this.setID} body={this.state.know_select} />

                        <div className="text-contentC">
                        Seus interesses ficarão disponíveis no seu perfil, abaixo você pode contar um pouco sobre o que
                        você gostaria de aprender.  
                        </div>
                        <label for="cTipo">Descrição:</label> 
                        <textarea onChange={e => this.setState({desc_new_interest: e.target.value})} id="text-aboutC" className="text-sobreC" cols="30" rows="5"></textarea>
                        <button onClick={this.addInteresse} className="btn-sender-about">Enviar</button>
                    </div>

                                      

                </div>

                <div id="chat-component">
                <Chat sendPhotoToChat={this.state.photo} />  
                </div>
                
             </>
           
        )

    }

}


                


export default Perfil