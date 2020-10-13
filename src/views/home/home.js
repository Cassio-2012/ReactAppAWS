import React from "react";
import Navbar from "../../components/navbar";
import UserInfo from "../../components/info-user-bar";
import Busca from "../Busca/busca";
import PostField from "./post-field";
import Fechar from "../../imagens/fechar.svg";
import Recomendation from "../../components/recomendation-field";
import Waypoint from "../../components/way";
import Imagem from "../../imagens/camera.svg";
import Pencil from "../../imagens/pencil.svg";
import File from "../../imagens/file.svg";
import LocalStorage from '../../services/local-storage'
// import Moon from '../../imagens/meia-lua.png'
// import WhiteMoon from '../../imagens/meia-lua white.png'
import axios from "axios";

class Home extends React.Component {
  state = {
    nome: "",
    idUser: "",
    photo: "",
    image: null,
    is_image: 0,
    conteudo: "",
    recomendados: [],
    busca_content: "",
    request: [],
    way: "",
    liked: [],
  };

  constructor() {
    super();
    this.busca = new Busca();
  }

  componentDidMount() {
    
    const usuarioLogado = LocalStorage.getItem("usuario_atual")
    var isDark = LocalStorage.getItem("_darkmode")
    const $html = document.querySelector('html')

    if(isDark) {
      $html.classList.add('dark-mode')      
    } 

    this.setState({ nome: usuarioLogado.nome });
    this.setState({ idUser: usuarioLogado.id });
    this.setState({ photo: usuarioLogado.photo });

    this.initial();
    this.loadRecomendation();
  }

  initial = () => {
    axios
      .get("http://ec2-18-205-79-20.compute-1.amazonaws.com:8080/post/load/initial")
      .then((response) => {
        this.loadPage();
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  loadRecomendation = () => {
    axios
      .get("http://ec2-18-205-79-20.compute-1.amazonaws.com:8080/conhecimentos/recomendados")
      .then((response) => {
        const dados = response.data;
        this.setState({ recomendados: dados });
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  loadPage = () => {
    axios
      .get("http://ec2-18-205-79-20.compute-1.amazonaws.com:8080/post/load/feed")
      .then((response) => {
        const dados = response.data;
        if (!dados[0].id) {
          console.log("Acabaram os dados");
          document.getElementById("load").style.display = "none";
        } else {
          this.setState({ way: "" });

          this.setState({ request: [...this.state.request, ...dados] });

          this.setState({ way: <Waypoint onEnter={this.loadPage} /> });
        }
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  interact = (id, type, count) => {
    const id_post = id;
    const type_format = type;
    const aumento = count + 1;
    var tipo =
      type == "interesting"
        ? (type = 1)
        : type == "gratefull"
        ? (type = 2)
        : (type = 3);
    var achou = 0;
    var base = this.state.liked;

    if (
      document.getElementById(id_post + "interesting").className ===
        "size-liked" ||
      document.getElementById(id_post + "gratefull").className ===
        "size-liked" ||
      document.getElementById(id_post + "inovated").className === "size-liked"
    ) {
      console.log("já curtido");
    } else {
      for (let index = 0; index < base.length; index++) {
        if (id_post === this.state.liked[index]) {
          achou++;
        }
      }
      if (achou > 0) {
        this.setState({ liked: base });
        return console.log("já curtido");
      } else {
        axios
          .post(`http://ec2-18-205-79-20.compute-1.amazonaws.com:8080/reacoes/reagir`, {
            id_user: this.state.idUser,
            id_post: id_post,
            tipo: tipo,
          })
          .then((response) => {
            const data = response.data;
            console.log(data);

            document.getElementById(id_post + type_format).className =
              "size-liked";
            document.getElementById(id_post).innerHTML = `• ${aumento}`;
            this.setState({ liked: base });
            base.push(id_post);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
  };

  sair = () => {
    axios
      .get("http://ec2-18-205-79-20.compute-1.amazonaws.com:8080/user/logoff")
      .then((response) => {
        this.props.history.push("/login");
      })
      .catch((erro) => {
        console.log(erro.response.data);
      });
  };

  toPerfil = () => {
    this.props.history.push("/perfil");
  };

  toHome = () => {
    this.props.history.push("/home");
  };

  toView = (id) => {
    if (this.state.idUser == id) {
      this.props.history.push(`/perfil`);
    } else {
      this.props.history.push(`/view/${id}`);
    }
  };

  loadUpload = () => {
    document.getElementById("svg-close").style.display = "inline";
    document.getElementById("label-upload").className = "label-image-b";
  };

  cancelUpload = () => {
    document.getElementById("svg-close").style.display = "none";
    document.getElementById("label-upload").className = "label-image";
    document.getElementById("photo").value = null;
    this.setState({ is_image: 0 });
    this.setState({ image: "" });
  };

  postar = () => {
    axios
      .post("http://ec2-18-205-79-20.compute-1.amazonaws.com:8080/post/new", {
        conteudo: this.state.conteudo,
        id_user: this.state.idUser,
        imagem: this.state.image,
        isImg: this.state.is_image,
      })
      .then((response) => {
        this.setState({ conteudo: "" });
        document.getElementById("One").reset();
        window.location.reload();
      })
      .catch((erro) => {
        console.log("falha na requisição");
      });
  };

  buscar = () => {
    this.props.history.push(`/busca/${this.state.busca_content}`);
    this.loadRecomendation();
  };

  darkChange = () => {
    const $html = document.querySelector('html')
    var is_dark = LocalStorage.getItem("_darkmode")
    $html.classList.toggle('dark-mode')

    if(is_dark) {
      LocalStorage.removeItem("_darkmode")
    } else {
      LocalStorage.putItem("_darkmode",true)
    }
 

  }

  render() {
    return (
      <>
        <Navbar
          executeSair={this.sair}
          executePerfil={this.toPerfil}
          sendTo={this.toHome}
          className="container"
          action={this.buscar}
          value={this.state.busca_content}
          change={(e) => this.setState({ busca_content: e })}
        />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <UserInfo id="user" action={this.darkChange} photo={this.state.photo} label={this.state.nome} />              
              <div className="col-md-8">
                <div className="row search">
                  <span className="icon-pencil">
                    <img className="icon-pencil" src={Pencil} alt="pencil" />
                  </span>

                  <span className="icon-file">
                    <img className="icon-pencil" src={File} alt="pencil" />
                  </span>
                  <div className="text-field-size">
                    <form id="One">
                      <textarea
                        onChange={(e) =>
                          this.setState({ conteudo: e.target.value })
                        }
                        className="text-field field-left"
                        placeholder="Algo que queira compartilhar ?"
                        rows="5"
                        cols="33"
                      ></textarea>
                      <textarea
                        className="text-field"
                        placeholder="Algum conteudo que queira compartilhar ?"
                        rows="5"
                        cols="33"
                      ></textarea>

                      <label
                        id="label-upload"
                        className="label-image"
                        for="photo"
                      >
                        <img className="icon-image" src={Imagem} />
                        
                      </label>
                      <input
                        className="input-image"
                        id="photo"
                        type="file"
                        name="photo"
                        onChange={() => {
                          let fileReader = new FileReader();
                          var fileToRead = document.querySelector("#photo")
                            .files[0];
                          fileReader.addEventListener("loadend", () => {
                            this.setState({
                              image: fileReader.result,
                              is_image: 1,
                            });
                            this.loadUpload();
                          });
                          fileReader.readAsDataURL(fileToRead);
                        }}
                      />
                      <img
                        className="close-upload"
                        onClick={() => this.cancelUpload()}
                        id="svg-close"
                        src={Fechar}
                      />
                    </form>
                  </div>
                  <button onClick={this.postar} className="btn-sender">
                    Enviar
                  </button>
                </div>

                <PostField
                  user={this.state.idUser}
                  action={this.interact}
                  view={this.toView}
                  body={this.state.request}
                />
              </div>

              <Recomendation body={this.state.recomendados} />
              

              {/* <img id="load" className="gif-load" alt="load" /> */}

              <div className="way">{this.state.way}</div>
              
            </div>
            <div id="load" className="gif-load"  ></div>
          </div>
        </div>

      </>
    );
  }
}

export default Home;
