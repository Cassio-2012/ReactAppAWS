import React, { useState } from 'react';

import api from '../../../../services/api';
import '../../css-evento.css';
import { FiX } from 'react-icons/fi';

export default function CadastroConvidado() {
    const id = localStorage.getItem("codigo");
    const usuario = localStorage.getItem('usuario_atual');
    const usuarioLogado = JSON.parse(usuario);
    const [idUsuarioLogado, setIdUsuarioLogado] = useState(usuarioLogado.id);

    async function handleRegisterConvit(e) {
        e.preventDefault();   
        
       console.log(idUsuarioLogado);
       const response = await api.post(`/convidado/${id}/${idUsuarioLogado}`)
       .then( response => {
        alert("Cadastrado com sucesso");
       }).catch( error => {
        alert("Você é o administrador deste Evento");
       });
       
    
        
    }
    return (
        <div className="container-cad-conv">
            <button
                className="button-modal-cad"
                type="submit"
                onClick={handleRegisterConvit}>
                Participar
            </button>
        </div>


    );
}

