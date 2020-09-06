import React from 'react'

function UserInfo(prop) {

    return(
                <div className="col-md-2">
                    <div className="user-menu" align="center">
                        <div className="user-photo">
                            <img className="img-user-menu" src={prop.photo} alt="menu"/>
                        </div>
                        <span className="name-style">{prop.label}</span>
                        <div className="user-data">
                            <ul align="left">
                                <li className="data-user">Posts</li>
                                <li className="data-user">Eventos</li>
                                <li className="data-user">Informações</li>
                            </ul>
                        </div>
                    </div>   
                </div>

    )

}
export default UserInfo


