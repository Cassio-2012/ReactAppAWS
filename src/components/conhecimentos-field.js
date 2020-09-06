import React from 'react'
import Delete from '../imagens/delete.svg'


export default prop => {


const card = prop.body.map( req => {

    


    return(
        <>
        <label className="label-name-know">{req.conhecimento}</label>
        <label className="label-type-know">Tipo</label>
        <label className="label-level-know">Nível</label>
        <div className="div-know-inferior">
        <img className="box-img-know" src={req.imagem} />
            <div className="desc-know">{req.descricao_user}</div>   
            <span className="level-know">{req.nivel}</span>         
            <img onClick={e => prop.action(req.id)} className="delete-know" src={Delete} />  
            <div className="type-know">{req.tipoConhecimento}</div>
   
            
        </div>
        </>
    )


})


return (
<>
<div className="div-know-superior">{ card }</div>
</>
)


}