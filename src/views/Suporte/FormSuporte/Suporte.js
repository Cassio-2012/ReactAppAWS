import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from '../../../services/api';
import Navbar from '../../../components/navbar';
import UserInfo from '../../../components/info-user-bar';
import '../../Suporte/FormSuporte/css-suporte.css'


export default class Suporte extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            status: ""
        };
    }

    render() {

        const { status } = this.state;

        return (
            <>
                <Navbar className=" container" />

                <div className="formContainer">

                    <section className="body">

                        <div className="container-form">

                            <div className="col-md-12" >

                                <form
                                    onSubmit={this.submitForm}
                                    action="https://formspree.io/xzbjrwpy"
                                    method="POST"
                                >
                                    <div className="row">
                                        <div className="col-md-12">


                                            <h2> Fale Conosco </h2>
                                                <h3 className="texto"> 
                                               Queremos lhe proporcionar a melhor experiência.
                                                Caso necessite, nos envie uma mensagem. 
                                                Feedbacks são super bem-vindos. 
                                                Nos deixe saber da sua opinião, ela é muito importante ! 
                                            </h3> <br></br>


                                            <div className="form-group mt-6">
                                                <label htmlFor="name">Nome Completo:</label>
                                                <input type="text" name="Nome Completo" id="name" className="form-control"
                                                    title="Preencha com seu nome completo" tabIndex="1"
                                                    required
                                                    errorMessage="Campo obrigatório"
                                                />
                                            </div>

                                            <div className="form-group mt-6">
                                                <label htmlFor="email">Email:</label>
                                                <input type="email" name="E-mail" id="email" className="form-control"
                                                    title="Preencha com o email que você mais utiliza" tabIndex="2"
                                                    required
                                                    errorMessage="Campo obrigatório"
                                                />
                                            </div>

                                            <div className="form-group mt-6">
                                                <label htmlFor="subject">Assunto:</label>

                                                <select className="appearance-select" name="Assunto" id="subject" title="Escolha uma opção, dentre 4 opções disponiveis" tabIndex="3"
                                                    required
                                                    errorMessage="Campo obrigatório">

                                                    <option value="Selecione">-- Selecione --</option>
                                                    <option value="Dúvida">Dúvida</option>
                                                    <option value="Reclamação">Reclamação</option>
                                                    <option value="Sugestão">Sugestão</option>
                                                    <option value="Feedback">Feedback</option>
                                                    <option value="Outros">Outros</option>
                                                </select>
                                            </div>

                                            <div className="form-group mt-6">
                                                <label htmlFor="message">Mensagem:</label>
                                                <textarea name="Mensagem" id="message" cols="30" rows="10"
                                                    className="form-control" tabIndex="4"
                                                    required
                                                    errorMessage="Campo obrigatório"
                                                />
                                            </div>

                                            <div className="form-group">
                                                
                                                {status === "SUCCESS" ? <p>Obrigada :) </p> : <button type="submit" tabIndex="6" className="btnEnviar">Enviar</button>}
                                                {status === "ERROR" && <p>Ooops! Algo deu errado :/ </p>}
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
              
            </>
        );
    };

    submitForm(ev) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS" });
            } else {
                this.setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }
}