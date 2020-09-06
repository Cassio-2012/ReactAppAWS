import React from 'react'
import {Route, Switch, HashRouter} from 'react-router-dom'
import Home from '../views/home/home'
import Login from '../views/login'
import Busca from '../views/Busca/busca'
import Cadastro from '../views/cadastro'
import Perfil from '../views/perfil'
import PerfilViewOnly from '../views/perfil-view-only'
import CadastrarEventos from '../views/Eventos/cadastroEvento';
import ListarEventos from '../views/Eventos/listaEvento';
import DetalhesEventos from '../views/Eventos/detalhesEvento';
import Suporte from '../views/Suporte/FormSuporte/Suporte';
import Chat from '../components/Chat' 

function Rotas() {

    return(
        <HashRouter>
            <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/cadastro" component={Cadastro} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/home" component={Home} />
                    <Route path="/busca/:conhecimento" component={Busca} />
                    <Route path="/perfil" component={Perfil} />
                    <Route path="/view/:id" component={PerfilViewOnly} />
                    <Route path="/cadastrarEvento" component={CadastrarEventos} />
                    <Route path="/listarEvento" component={ListarEventos} />
                    <Route path="/detalhesEvento" component={DetalhesEventos} />
                    <Route path="/suporte" component={Suporte} />                     
            </Switch>
        </HashRouter>
    )

}

export default Rotas