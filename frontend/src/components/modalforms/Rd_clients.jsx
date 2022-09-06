import React, { useRef, useEffect, useState } from "react";
import "./modal.css";
import {TiUserDelete} from "react-icons/ti"
import {FaEdit} from "react-icons/fa"
import { Link } from "react-router-dom"

const Rd_clients = () => {
  /* here console.log("here"); */
  const [client, Setclient] = useState([]);

  const response = fetch("http://localhost:3001/getclient", {
    method: "get",
  }).then((res) => res.json());

  useEffect(() => {
    response.then((data) => {
      Setclient(data);
    });
  }, []);


  const del = async event => 
  {
   const id = event.currentTarget.id;
  const response = await fetch("http://localhost:3001/dclient", {
     method: "post",
     body: JSON.stringify({ id }),
     headers: { "Content-Type": "application/json" },
   }); 

   window.location.reload(true);
  }

  const edit = '';

  



  /* here console.log(client);*/
  return (
      
      <div className="list">
        <h1>Список клиентов</h1>
      <div  className="answers_client height">
              <div className="group"><p> Айди </p> </div>
              <div>
                <p>Имя</p>
              </div>
              <div>
                <p>Категория</p>
              </div>
              <div className="scroll">
                <p>Описание</p>
              </div>
              <div>
                <p>Картинка</p>
              </div>
            </div>

        {client.map((g) => {
          return (
            <div key={g.id} className="answers_client">
              <div className="group"><p> {g.id} </p> <button className="pre" id={g.id} onClick={del} ><TiUserDelete /></button>
          
              <Link className="pre" id={g.id} to={"/Cl_Edit/"+g.id} ><FaEdit /></Link>
              </div>
              <div className="scroll">
                <p>{g.name}</p>
              </div>
              <div className="scroll">
                <p>{g.category}</p>
              </div>
              <div className="scroll">
                <p>{g.description}</p>
              </div>
              <div>
              <img src={g.image} alt="" />
              </div>
            </div>
          );
        })}
      </div>
  
  );
};

export default Rd_clients;
