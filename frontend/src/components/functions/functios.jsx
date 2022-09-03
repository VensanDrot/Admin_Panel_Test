import React, { useState } from "react";
import "./main.css";
import Cl_Create from "../modalforms/Cl_create";
import { Link } from "react-router-dom";

const Functions = () => {
  const [cl_create_st, setCl_Create] = useState(false);
  const [parser, setParser] = useState("");

  return (
    <section>
      <div className="container">
        <h1 className="welcome">Добро пожаловать в режим администратора</h1>
        <div className="tables">
          <div className="clients db_block">
            <h2>Клиенты</h2>
            <h3>Список возможностей</h3>
            <ul className="Functions">
              <li>
                <a
                  onClick={() => {
                    setCl_Create(true);
                    setParser("inclient");
                  }}
                >
                  Создать запись
                </a>
              </li>
              {/*<li><a onClick={() =>{ setCl_Create(true); setParser('readclient');}}>Просмотреть список</a></li>*/}
              <li>
                <Link to="/List/readclient">Просмотреть список</Link>
              </li>
              <li>
              <Link to="/List/readclient">Редактировать запись</Link>
              </li>
              <li>
              <Link to="/List/readclient">Удалить запись</Link>
              </li>
            </ul>
          </div>
          <div className="team db_block">
            <h2>Команда</h2>
            <h3>Список возможностей</h3>
            <ul className="Functions">
              <li>
                <a
                  onClick={() => {
                    setCl_Create(true);
                    setParser("inteam");
                  }}
                >
                  Создать запись
                </a>
              </li>
              {/*<li><a onClick={() =>{ setCl_Create(true); setParser('readteam');}}>Просмотреть список</a></li>*/}
              <li>
                <Link to="/List/readteam">Просмотреть список</Link>
              </li>
              <li>
              <Link to="/List/readteam">Редактировать запись</Link>
              </li>
              <li>
              <Link to="/List/readteam">Удалить запись</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Cl_Create
        active={cl_create_st}
        SetActive={setCl_Create}
        parser={parser}
      ></Cl_Create>
    </section>
  );
};

export default Functions;
