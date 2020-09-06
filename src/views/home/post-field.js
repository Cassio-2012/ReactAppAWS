import React from 'react'
import Inovador from '../../imagens/rocket.svg'
import Interessante from '../../imagens/conhecimento.svg'
import Compartilhar from '../../imagens/compartilhar.svg'
import Gratidao from '../../imagens/graticao.svg'


export default prop => {
  

    const corpo = prop.body.map( post => {


        return (
            <>
            
            {/*DataHora do banco ---->>> <h2 classNameName="data-post">{"• "+ post.data + " •"}</h2> */}
                  <div className="row">
                        <div className="post-field">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="row">
                                        <div className="photo-postField">
                                            <img className="img-user-menu" src={post.imagem} alt="img-user" />
                                        </div>
                                        <div className="userPost-name">
                                            <div onClick={e => prop.view(post.id_user)} className="username"> {post.nome} </div>
                                            <div className="carrerJob-user user-text">Ocupação-: Back-end Developer</div>
                                            <div className="carrerCollege-user user-text">Estudou(a)-: Bandtec</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tag col-md-2">
                                    <span className="tag-size">Tags:</span><a className="tags-reference">#Java
                                        #Database</a>
                                </div>
                            </div>

                            <div className="content-field">
                                {post.isImg == 1 ? <> <span className="span-content">{post.conteudo}</span>
                                <img className="image-content" src={post.img_conteudo}/> </> : <> <div>{post.conteudo}</div> </> }
                                                                                              
                            </div>
                            <div className="row anulled">
                           
                                <div className="icon-value col-md-10">    
                                <span id={post.id} className="counter">• {post.total}</span>  

  
                                    <div className="react-box-one">
                                        <span className={post.reacao == 1 ? 'size-liked-light':'size-around-light'} id={post.id+"interesting"}
                                        onClick={e =>prop.action(post.id,"interesting",post.total)}>                                        
                                            
                                            <b>Interessante</b></span>
                                            <span className="score-style-light">
                                                <img src={Interessante} alt="interessante" />
                                            </span >
                                            
                                     </div>

                                                                 
                                     <div className="react-box-two">                                                          
                                            <span className={post.reacao == 2 ? 'size-liked':'size-around'} id={post.id+"gratefull"}
                                            onClick={e =>prop.action(post.id,"gratefull",post.total)}>
                                               <b>Gratidão</b></span>

                                               <span className="score-style">
                                                    <img src={Gratidao} alt="gratidao" />
                                                </span>
                                      </div>   
                                  
                                     <div className="react-box-three">  
                                        <span className={post.reacao == 3 ? 'size-liked-rocket':'size-around-rocket'} id={post.id+"inovated"}
                                        onClick={e =>prop.action(post.id,"inovated",post.total)}>
                                            <b>Inovador</b></span>

                                            <span className="score-style-rocket">
                                            <img src={Inovador} alt="inovador" className="rocket-asjust"/>
                                            </span>
                                     </div> 
                                </div>
                           
                                <div className="icon-value  col-md-2">
                                    <div className="share-icon">                                        
                                        compartilhar
                                    </div>  
                                    <img className="icon-share" src={Compartilhar} alt="share" />                                 
                                </div>                                
                            </div>
                            
                        </div>
                    </div>
          </>
        )
    })

    return(
        <div>{ corpo }</div>
    )

}
