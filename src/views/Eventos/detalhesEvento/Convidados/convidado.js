import React, { useEffect, useState } from 'react';
import {FiX } from 'react-icons/fi';
import api from '../../../../services/api';
import '../../css-evento.css';
import Exportar from '../../../../components/download'
export default function Convidado() {
    const id = localStorage.getItem("codigo");
    const admEvento = localStorage.getItem("admEvento");
    const usuario = localStorage.getItem('usuario_atual');
    const usuarioLogado = JSON.parse(usuario);

    const [convidados, setConvidados] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [idUsuario, setIdUsuario] = useState(usuarioLogado.id);
    
    useEffect(() => {
        api.get(`/convidado/${id}`).then(response => {
            setConvidados(response.data);
          

        })
    });
  
    return (
        <div>
        <button className="button-modal-list" onClick={() => setIsModalVisible(true)}>Visualizar lista</button>
        {isModalVisible ?
            <div className="modal-cad">
                <div className="container-modal">
                <FiX className="close" onClick={() => setIsModalVisible(false)}/>
             <Exportar/>
        
        <table className="container container-cad-conv" >
            <thead>
                <tr>
                    <th>Nome Convidado</th>
                    <th>Email</th>
                </tr>
            </thead>
            {convidados.map(convidado => (

                <tbody key={convidado.id}>
                    <tr>
                        <td>{convidado.nomeConvidado}</td>
                        <td>{convidado.email}</td>
                    </tr>
                </tbody>
            ))}
        </table>
       
</div></div>
: null}
</div>
    );
}


