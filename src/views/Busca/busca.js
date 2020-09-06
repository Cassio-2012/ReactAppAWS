import React from 'react'
import Navbar from '../../components/navbar'
import UserInfo from '../../components/info-user-bar'
import CardBusca from './busca-card'
import {Dropdown} from 'primereact/dropdown';
import Loading from '../../imagens/Spinner.gif'

import axios from 'axios'

class Busca extends React.Component {

    state = {

        nome: '',
        idUser : '',
        photo : '',
        conteudo : '',
        recomendados : [],
        busca_content: '',
        resultados : 0,
        request : [],
        busca_content: '',
        no_content: '',
        level: 0,
        tipo: null

    }


    componentDidMount(){
        
               
        const usuario = localStorage.getItem('usuario_atual')
        const usuarioLogado = JSON.parse(usuario)


        this.setState({nome: usuarioLogado.nome})
        this.setState({idUser: usuarioLogado.id})
        this.setState({photo: usuarioLogado.photo})      
        document.getElementById('load').style.display = 'inline';  
       
         
        this.buscar();

    }

    buscar = (dado) => {

        const parametro = this.props.match.params.conhecimento
        const nivel = this.state.level
        const tipo = this.state.tipo

        this.setState({request: ''})  
        document.getElementById('load').style.display = 'inline';   
        document.getElementById('content-busca').style.display = 'none';

        if(dado){
            axios.get(`http://localhost:8080/conhecimentos/find?conhecimento=${dado}&level=${nivel}`)
            .then(response => {
                const data = response.data
               
                this.setState({request: data})
                this.setState({resultados: data.length})
                document.getElementById('load').style.display = 'none';
                document.getElementById('content-busca').style.display = 'inline';
                
            }).catch(error => {
                this.setState({no_content: error.response.data })   
                document.getElementById('load').style.display = 'none';
                document.getElementById('content-busca').style.display = 'inline';             
            })

        }
        else if(tipo) {
            axios.get(`http://localhost:8080/conhecimentos/find?tipo=${tipo}&level=${nivel}`)
            .then(response => {
                const data = response.data
               
                this.setState({request: data})
                this.setState({resultados: data.length})
                document.getElementById('load').style.display = 'none';
                document.getElementById('content-busca').style.display = 'inline';
                
            }).catch(error => {
                this.setState({no_content: error.response.data })   
                document.getElementById('load').style.display = 'none';
                document.getElementById('content-busca').style.display = 'inline';   
            })
        }
        else {
            axios.get(`http://localhost:8080/conhecimentos/find?conhecimento=${parametro}&level=${nivel}`)
            .then(response => {
                const data = response.data
               
                this.setState({request: data})
                this.setState({resultados: data.length})
                document.getElementById('load').style.display = 'none';
                document.getElementById('content-busca').style.display = 'inline';
              
            }).catch(error => {
                this.setState({no_content: error.response.data })   
                document.getElementById('load').style.display = 'none';
                document.getElementById('content-busca').style.display = 'inline';   
            })
        }
               
            
    }

  
    sair = () => {
        axios.get('http://localhost:8080/logoff')
        .then( response => {
          this.props.history.push('/login')
        }).catch( erro => {
            console.log(erro.response.data)
        })
    }

    toPerfil = () => {
        this.props.history.push('/perfil')
    }

    toHome = () => {
        this.props.history.push('/home')
    }

    toView = (id) => {

        if(this.state.idUser == id) {
            this.props.history.push(`/perfil`)
        }
        else{
            this.props.history.push(`/view/${id}`)
        }

    }



    verifyBusca = () => {

        if(this.state.request.length >=1) {
            return(
                <>
                <label className="label-resultados">Exibindo <b>{this.state.resultados}</b> resultado(s)</label>
                <CardBusca view={this.toView} body={this.state.request}/>
                </>
            )
        }else{
            return(
                <div className="frase-no-content">{this.state.no_content}</div>
            )
        }

    }


    render() {

        const levelSelectItems = [
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5},
            {label: '6', value: 6},
            {label: '7', value: 7},
            {label: '8', value: 8},
            {label: '9', value: 9},
            {label: '10', value: 10}
        ];

        const typeSelectItems = [
            {label: 'Programação', value: 'PROGRAMACAO'},
            {label: 'Infgraestrutura', value: 'INFRAESTRUTURA'},
            {label: 'Dados', value: 'DADOS'},
            {label: 'Design e UX', value: 'DESIGN'},
            {label: 'Testes', value: 'TESTES'},
            {label: 'Segurança', value: 'SEGURANCA'},
            {label: 'Gestão e Planejamento', value: 'GESTAO'}

        ];


        return(
            <>
            <Navbar           
            executeSair={this.sair}
            executePerfil={this.toPerfil} 
            sendTo={this.toHome}
            className="container"
            action={e =>this.buscar(this.state.busca_content)}
            value={this.state.busca_content}
            change={e =>this.setState({busca_content: e})}/>

                <div className="filtro-busca">
                    <label className="label-select-nivel"><b>Nível</b></label>
                    <Dropdown className="filtro-busca-level" value={this.state.level} options={levelSelectItems}
                    onChange={(e) => {this.setState({level: e.value})}} placeholder="Selecione um nível"/>
                    <label className="label-select-nivel"><b>Categoria</b></label>
                    <Dropdown className="filtro-busca-type" value={this.state.tipo} options={typeSelectItems}
                    onChange={(e) => {this.setState({tipo: e.value})}} placeholder="Selecione uma categoria"/>
                </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                                                                        
                        <UserInfo photo={this.state.photo} label={this.state.nome} />                        
                           
                          </div>

                                                    
                          <div id="content-busca" className="div-superior-busca">                    

                             {this.verifyBusca()}

                          </div>
                          <img id="load" className="gif-load" src={Loading} alt="load"/>
            
                        
                        {/* <Recomendation body={this.state.recomendados}/> */}
                                           
                        

                    </div>
                </div>
               
        
                      

                
            </>
        )

    }


}

export default Busca
