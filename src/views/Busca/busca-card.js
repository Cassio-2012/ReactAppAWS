import React from 'react'

export default prop => {

const card = prop.body.map( req => {


    return(
        <>
        <div className="div-sub-busca">
                <div className="frase-busca">{req.nome} possui nível {req.nivel} em <b>{req.conhecimento}</b></div>
                <img src={req.imagem} className="box-busca-img"/>
                <label className="name-busca"><b>{req.nome}</b></label>
                <label className="title-busca">{req.titulo}</label>
                <label className="email-busca">{req.email}</label>
                <label className="local-busca">{req.local}</label>        

                <button onClick={e => prop.view(req.id)} className="btn-view">Visualizar</button>

        </div>
        </>

    )


})

return(

    <div  className="div-inferior-busca">
        {card}
    </div>

)

}