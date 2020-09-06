import React from 'react'


function FieldBusca (props) {


        return (

            <div htmlFor="imputBusca" className="col-md-5 col-sm-10 col-8">
                <form onSubmit={props.action}>
                    <input className="form-control mr-sm-2" value={props.value} 
                        onChange={e => props.change(e.target.value)} placeholder="O que você gostaria de aprender hoje ?" />
                    
                </form>            
            </div>


        )
    }



export default FieldBusca