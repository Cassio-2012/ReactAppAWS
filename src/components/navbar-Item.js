import React from 'react'

function NavbarItem(prop) {

    return(

        <a onClick={prop.action}  href={prop.href}>
                <img src={prop.image} className={prop.classN} alt="alt"/>
                <span className={prop.spam}>{prop.label}</span> 
       </a>
        

    )

}

export default NavbarItem