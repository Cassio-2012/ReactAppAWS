import React from 'react';

//Utilizei o axios pois me sinto mais confortável, porém, poderia ser o fetch e qlq outra api para realizar as requisições.
import axios from 'axios';

//Serve para trabalhar com os mymes types, recomendo que pesquise um pouco sobre é interessante
import mime from 'mime-types';

function download() {

    //Configuração padrão para o axios
    const config = {
        url: 'http://localhost:8080/export',
        method: 'GET',
        responseType: 'blob'
    };

    //função que fica responsável por buscar e salvar o arquivo, nesse casso uma imagem.
    function getImage() {

        //Realizando chamada no endpoint
        axios(config).then(response => {

            //exibindo no console o objeto que esse endpoint retorna(para fins didáticos)
            console.log(response);

            //Criando um objeto do tipo URL
            const imageUrl = window.URL.createObjectURL(new Blob([response.data]));

            //Criando um novo elemento <a></a>
            const link = document.createElement('a');

            //Colocando o atributo href nele
            link.href = imageUrl;

            //colocando o atributo href no <a>, repare que estou usando uma lib para converter o myme type para uma extensão válida.
            //Note que deixei "mocado" o titulo do arquivo, e na sequencia concateno com "." e a resposta da conversão, isso evita deixar a extensão mocada.
            link.setAttribute('download', `arq.${mime.extension(response.data.type)}`);

            //Colocando o <a> dentro do <body></body>
            document.body.append(link);

            //Forçando o click para que seja realizado o download
            link.click();
        })

    }


    return (
        <button className="botaoExportar" onClick={() => getImage()}>Baixar Lista</button>
    );
}

export default download;
