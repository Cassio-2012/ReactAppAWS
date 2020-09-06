
import React from 'react'


export default prop => {


    const corpo = prop.body.map(req => {

        return (
            <div className="box standard-recomandation itens-rec">

                <div className="row row-anulled">
                    <div className="col-md-4 img-box">
                        <img className="imgRecomandation" src={req.imagem} alt="img-rec" />
                    </div>

                    <div className="col-md-8 anulled">
                        <div className="title-recomandation"> 
                            {req.conhecimento}
                        </div>

                        <div className="text-recomandation">
                            {req.descricao}
                        </div>
                    </div>
                </div>
            </div>

        )
    })


    return (

        <div className="col-md-2-b">
            <div className="user-recomandation">
                <div className="first box">
                     Aqui estão os conteúdos mais recomendados para <b>você</b>
                </div>
                { corpo }



            </div>
        </div>


    )
}



// import React from "react";

// export default (prop) => {
//   const corpo = prop.body.map((req) => {
//     return (
//         <div className="col-md-2-b">
//             <div className="user-recomandation">
//                 <div className="row row-anulled">
//                     <button id="learn"  className="btn-choose">Aprenda Também</button>
//                    <button id="event" className="btn-choose">Eventos</button>
//                 </div>
//                 <div className="first box">
//                      Aqui estão os conteúdos mais recomendados para <b>você</b>
//                 </div>
//                 <div id="aprenda">
//                     {corpo}
//                 </div>

//           <div className="col-md-8 anulled">
//             <div className="title-recomandation">{req.conhecimento}</div>

//             <div className="text-recomandation">{req.descricao}</div>
//           </div>
//         </div>
//       </div>
//     );
//   });

//   return (
//     <div className="col-md-2-b">
//       <div className="user-recomandation">
//         <div className="row row-anulled">
//           <button id="learn" className="btn-choose">
//             Aprenda Também
//           </button>
//           <button id="event" className="btn-choose">
//             Eventos
//           </button>
//         </div>
//         <div className="first box">
//           Conteúdos mais recomendados para <b>você</b>
//         </div>
//         <div id="aprenda">{corpo}</div>
//       </div>
//     </div>
//   );
// };
