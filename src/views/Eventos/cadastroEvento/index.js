import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../css-evento.css';

import api from '../../../services/api';
import Navbar from '../../../components/navbar';
import UserInfo from '../../../components/info-user-bar';


export default function CadastroEvento() {
    const usuario = localStorage.getItem('usuario_atual');
    const usuarioLogado = JSON.parse(usuario);

    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [uf, setUf] = useState('');
    const [busca_content, setBusca] = useState('');
    const [dataEvento, setDataEvento] = useState('');
    const [horario, setHorario] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idUsuarioLogado, setIdUsuarioLogado] = useState(usuarioLogado.id);
   
   
    async function handleRegister(e) {
        e.preventDefault();

        const env = {
            nome,
            cep,
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
            dataEvento,
            horario,
            descricao,
        };
        const response = await api.post(`cadastrarEvento/${idUsuarioLogado}`, env)
        .then( response => {
            alert("Cadastrado com sucesso");
           }).catch( error => {
            alert("Erro ao cadastrar Evento");
           });
        limparCampos();


    }

    async function buscaCep() {
        if (cep.length == 8) {
            console.log(cep)
            await api.get(`cep/${cep}`, {})
                .then(response => {

                    setLogradouro(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setLocalidade(response.data.localidade);
                    setUf(response.data.uf);

                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }
    function limparCampos() {
        setNome("");
        setCep("");
        setLogradouro("");
        setComplemento("");
        setBairro("");
        setLocalidade("");
        setUf("");
        setDataEvento("");
        setHorario("");
        setDescricao("");
    }


    const history = useHistory();



    return (

        <> <Navbar
            className="container"
            action={() => history.push(`/busca/${busca_content}`)}
            value={busca_content}
            change={e => setBusca(e)} />
            <div className="body">
                <div className=" container">
                    <div className="box-body">
                        <form onSubmit={handleRegister} className="formContainer">
                            <h1 className="titulo-cad">Novo Evento</h1>
                            <div className="form-row">
                                <div className="col-sm-10">
                                    <label className="label" >Nome</label>
                                    <input name="nome" type="text" className="form-control1" value={nome} onChange={e => setNome(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="col-sm-5">
                                    <label className="label" >Cep</label>
                                    <input name="cep" className="form-control1 " type="text" id="cep" value={cep} onChange={e => setCep(e.target.value)} onBlur={buscaCep} />

                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="col-sm-7">
                                    <label className="label" >Logradouro</label>
                                    <input name="local" type="text" className="form-control1 " value={logradouro} onChange={e => setLogradouro(e.target.value)} />
                                </div>
                                <div className="col-sm-3">
                                    <label className="label" >Complemento</label>
                                    <input name="complemento" type="text" className="form-control1 " value={complemento} onChange={e => setComplemento(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-row ">
                                <div className="col-sm-4">
                                    <label className="label" >Bairro</label>
                                    <input name="local" type="text" className="form-control1 " value={bairro} onChange={e => setBairro(e.target.value)} />
                                </div>
                                <div className="col-sm-4">
                                    <label className="label" >Cidade</label>
                                    <input name="local" type="text" className="form-control1 " value={localidade} onChange={e => setLocalidade(e.target.value)} />
                                </div>
                                <div className="col-sm-2">
                                    <label className="label" >Estado</label>
                                    <input name="local" type="text" className="form-control1 " value={uf} onChange={e => setUf(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-row ">
                                <div className="col-sm-5">
                                    <label className="label">Data</label>
                                    <input name="dataEvento" type="date" className="form-control1 " value={dataEvento} onChange={e => setDataEvento(e.target.value)} />
                                </div>

                                <div className="col-sm-5">
                                    <label className="label" >Horário</label>
                                    <input name="horario" type="time" className="form-control1  " value={horario} onChange={e => setHorario(e.target.value)} />

                                </div>
                                <div className="col-sm-10">
                                    <label className="label" >Descrição</label>
                                    <textarea name="descricao" type="text" className="form-control-textarear" value={descricao} onChange={e => setDescricao(e.target.value)} />

                                </div>
                            </div>
                            <div className="buttonCad">
                                <button className="botaoCadastro" type="submit" >Cadastrar</button>
                                <button className="botaoLista" type="button" ><Link className="a" to="/listarEvento">Lista de eventos</Link></button>
                            </div></form>

                    </div>   </div >
            </div>
        </>
    );
}