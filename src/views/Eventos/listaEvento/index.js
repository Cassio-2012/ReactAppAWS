import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiList, FiPlusSquare } from 'react-icons/fi';
import Navbar from '../../../components/navbar'
import api from '../../../services/api';
import '../css-evento.css';



export default function Eventos() {
    const [eventos, setEventos] = useState([]);
    const id = localStorage.getItem("codigo");
    const usuario = localStorage.getItem('usuario_atual');
    const usuarioLogado = JSON.parse(usuario);
    const [idUsuarioLogado, setIdUsuarioLogado] = useState(usuarioLogado.id);


    useEffect(() => {
        api.get('/eventos').then(response => {
            setEventos(response.data);

        })
    });


    async function deletarEvento(id) {
         const response = await api.delete(`/evento/${id}/${idUsuarioLogado}`)
         .then( response => {
            alert("Evento deletado com sucesso");
           }).catch( error => {
            alert("Você não pode deletar esse evento por não ser o administrador");
           });
        }

    async function detalhesEvento(codigo) {
        try {
            const response = await api.get(`eventos/${codigo}`);

            localStorage.setItem("codigo", codigo);
            console.log(response.data)
        } catch (error) {

        }
    }

    return (
        <>
            <Navbar className="container" />
            <div className="body">
                <div className="box-body-list">
                    <div>
                        <h1 className="text-h1">Lista de Eventos</h1>

                        <Link to="/cadastrarEvento"> <button className="botaoCadEvento">Novo evento</button></Link>
                    </div>
                    <div className="box-body-list-itens">
                        <table className=" table">
                            <thead >
                                <tr className="table-light" >
                                    <th>Nome</th>
                                    <th>Local</th>
                                    <th>Data</th>
                                    <th>Horario</th>
                                    <th>Deletar</th>
                                </tr>
                            </thead>


                            {eventos.map(evento => (
                                <tbody key={evento.codigo}>

                                    <tr className="table-light">
                                        <td>{evento.nome}</td>
                                        <td>{`${evento.logradouro} Nº ${evento.complemento}- ${evento.bairro} - ${evento.localidade} - ${evento.uf}`}</td>
                                        <td>{evento.dataEvento}</td>
                                        <td>{evento.horario}</td>
                                        <td>
                                            <button className="btDelete" onClick={() => deletarEvento(evento.codigo)} type="onsubmit" > <FiTrash2 /></button>
                                        </td>
                                        <td>  <button type="submit" className="btLista" >
                                            <Link to="/detalhesEvento" onClick={() => detalhesEvento(evento.codigo)}><FiList /></Link> </button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>

                    </div>  </div></div>
        </>
    );
}