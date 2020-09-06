import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import uuid from "uuid/dist/v4";
const myId = uuid();
const socket = io("https://serverchatjust.azurewebsites.net");
socket.on("connect", () =>
  console.log("[IO] Connect => A new connection has been established")
);

const Chat = (props) => {
  const [message, updateMessage] = useState("");
  const [photo, updatePhoto] = useState("");
  const [photos, updatePhotos] = useState([]);
  const [messages, updateMessages] = useState([]);
let photoM = props.sendPhotoToChat;
  useEffect(() => {
    const handleNewMessage = (newMessage, photoM) =>
      updateMessages([...messages, newMessage]);
      updatePhotos([...photos, photoM]);

    socket.on("chat.message", handleNewMessage);
    return () => socket.off("chat.message", handleNewMessage);
  }, [messages],[photos]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("chat.message", {
        id: myId,
        message,
        photoM
      });
      updateMessage("");
    }
  };

  const handleInputChange = (event) => updateMessage(event.target.value);

  return (
    <main className="chat">
      <div className="window-chat">
        <div className="container">
          <div id="chat_window_1" style={{ marginLeft: "10px" }}>
            <div className="col-xs-12 col-md-12">
              <div className="panel panel-default" style={{ width: "500px" }}>
                <div className="panel-heading top-bar">
                  <div className="row">
                    <div className="col-md-8 col-xs-8">
                      <h6 className="panel-title">
                        <span className="glyphicon glyphicon-comment">
                        Sala Bate-Papo
                        </span>
                      </h6>
                    </div>
                    <div
                      className="col-md-4 col-xs-4"
                      style={{ textAlign: "right" }}
                      
                    >
                      <a>
                        <span
                          id="minim_chat_window"
                          className="glyphicon glyphicon-minus icon_minim"
                        >
                          -
                        </span>
                      </a>
                      <a>
                        X
                        <span
                          className="glyphicon glyphicon-remove icon_close"
                          data-id="chat_window_1"
                        ></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="panel-full">
                  <div
                    className="panel-body msg_container_base"
                    id="historico_mensagens" style={{display:"none"}}
                  >
                    {messages.map((m, index) => (
                      <div key={index * (index + index * 10000)}>
                        {m.id === myId ? (
                          <div
                            className="row msg_container base_sent"
                            key={index}
                          >
                            <div className="offset-md-1 col-xs-9 col-md-9">
                              <div className="messages msg_sent">
                                <p>{m.message} </p>
                              </div>
                            </div>
                            <div className="col-md-2 col-xs-2 avatar">
                              <img
                                src={m.photoM}
                                className="img-responsive"
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            className="row msg_container base_receive"
                            key={index}
                          >
                            <div className="col-md-2 col-xs-2 avatar">
                              <img
                                src={m.photoM}
                                className="img-responsive"
                              />
                            </div>
                            <div className="col-xs-9 col-md-9 ">
                              <div className="messages msg_receive">
                                <p>{m.message}</p>
                                
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="panel-footer row nullRow">
                    <form
                      className="col-md-12 nullMarginPadding"
                      onSubmit={handleFormSubmit}
                    >
                      <div className="row nullRow">
                        <div className="col-md-8 nullMarginPadding">
                          <input
                            onChange={handleInputChange}
                            id="texto_mensagem"
                            name="texto_mensagem"
                            type="text"
                            className="form-control input-sm chat_input conversar"
                            
                            value={message}
                            placeholder="Escreva aqui a sua mensagem"
                          ></input>
                        </div>
                        <div className="col-md-4 nullMarginPadding">
                          <button
                            style={{ height: "100%", width: "100%"}}
                            type="submit"
                            className="btn-m btn-p btn-sm"
                            id="btn-chat"
                            onClick={handleFormSubmit,function(){
                              document.querySelector("#historico_mensagens").style.display = "block"
                            }}
                          >
                          <span style={{fontSize:"25px"}}>  > </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;
