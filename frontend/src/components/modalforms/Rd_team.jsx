import React, { useRef, useEffect, useState } from "react";
import { TiUserDelete } from "react-icons/ti";
import "./modal.css";
import { stringify } from "query-string";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Rd_team = () => {
  const [team, SetTeam] = useState([]);

  const response = fetch("http://localhost:3001/getteam", {
    method: "get",
  }).then((res) => res.json());

  useEffect(() => {
    response.then((data) => {
      SetTeam(data);
    });
  }, []);

  const del = async (icon, event) => {
    const nameOfPic = icon.split("/").slice(4);

    fetch("http://localhost:3001/delimage/" + nameOfPic, {
      method: "get",
    }).then((res) => res.text());

    const id = event.currentTarget.id;
    const response = await fetch("http://localhost:3001/dteam", {
      method: "post",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    window.location.reload(true);
  };

  //console.log(team)
  return (
    <div className="list">
      <h1>Список сотрудников</h1>
      <div className="answers height">
        <div className="group">
          <p> Айди </p>{" "}
        </div>
        <div>
          <p>Имя</p>
        </div>
        <div>
          <p>Род Деятельности</p>
        </div>
        <div className="image">
          <p>Картинка</p>
        </div>
      </div>

      {team.map((g) => {
        return (
          <div key={g.id} className="answers">
            <div className="group">
              <p> {g.id} </p>{" "}
              <button
                className="pre"
                id={g.id}
                onClick={(event) => del(g.icon, event)}
              >
                <TiUserDelete />
              </button>
              <Link className="pre" id={g.id} to={"/Tm_edit/" + g.id}>
                <FaEdit />
              </Link>
            </div>
            <div className="scorll">
              <p>{g.name}</p>
            </div>
            <div className="scorll">
              <p>{g.occupation}</p>
            </div>
            <div className="image">
              <img src={g.icon} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Rd_team;
