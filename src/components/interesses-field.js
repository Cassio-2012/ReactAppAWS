import React from 'react'
import Delete from '../imagens/delete.svg'


export default prop => {



const card = prop.body.map( req => {
    


    return(
        <>
        <label className="label-name-know">{req.conhecimento}</label>
        <label className="label-type-interest">Tipo</label>
        <div className="div-know-inferior">
        <div className="desc-interest">{req.descricao_interesse}</div>
        <img onClick={e => prop.action(req.id)} className="delete-interest" src={Delete} />  
        <div className="type-interest">{req.tipoConhecimento}</div>        
            <img className="box-img-interest" src={req.imagem} />                                    
        </div>
        </>
    )


})


return (
<div className="div-know-superior">{ card }</div>
)


}