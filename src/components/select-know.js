import React from 'react'

export default prop =>{


    const select = prop.body.map( option => {


        return (
        <option value={option.id}>{option.key}</option>
        )

    })


    return(

        <select {...prop} onChange={e => prop.action(e.target.value)} className="input-style"  name="Selecione">
            <option value="">Selecione ...</option>
            {select}
        </select>

    )


}
