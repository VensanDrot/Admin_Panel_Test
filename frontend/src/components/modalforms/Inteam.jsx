import React, { useRef, useState } from "react";
import "./modal.css";
import axios from "axios";
import { stringify } from "query-string";

const Inteam = () => {
  const form = useRef();
  let num = 0;
  const [error1, setErr1] = useState(null);
  const [error2, setErr2] = useState(null);
  const [name, SetName] = useState("");
  const [occupation, Setoccupation] = useState("");
  const [image, Setimage] = useState({ file: [] });

  const handler = (e) => {
    Setimage({
      file: e.target.files[0],
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    num = 0;
    SetName(e.target.name.value);
    Setoccupation(e.target.occupation.value);

    const data = new FormData();
    data.append("image", image.file);
    /*
    axios hard to save variable went to old type of fetch
    
    axios.post('http://localhost:3001/upload', data,{
      headers:{"Content-type": "multipart/form-data"}
    })
    .then(res => {
      response = res.data;
      
    return  response 
    })
    console.log(response)
    */

    if (name.length >= 2 && name.length <= 120 && name !== null) {
      setErr1(null);
    } else {
      setErr1("Введите коректное имя(макс:120 символов)");
      num++;
    }

    if (
      occupation.length >= 1 &&
      occupation.length <= 120 &&
      occupation !== null
    ) {
      setErr2(null);
    } else {
      setErr2("Введите коректное состояние(макс:120 символов)");
      num++;
    }

    //console.log(num);
    if (num < 1) {
      const icon = await fetch("http://localhost:3001/upload", {
        method: "post",
        body: data,
      }).then((res) => res.text());

      /*console.log('here'); */
      const response = await fetch("http://localhost:3001/createteam", {
        method: "post",
        body: JSON.stringify({ name, occupation, icon }),
        headers: { "Content-Type": "application/json" },
      });

      SetName("");
      Setoccupation("");
    }

    e.target.reset();
  };

  return (
    <div>
      <h2 className="form_name">Форма создание сотрудника</h2>
      <form ref={form} onSubmit={sendEmail}>
        {error1}
        <input
          onChange={(e) => {
            SetName(e.target.value);
          }}
          value={name}
          type="text"
          name="name"
          minLength="2"
          maxLength="120"
          placeholder="Ваше имя"
          required
        />
        {error2}
        <input
          onChange={(e) => {
            Setoccupation(e.target.value);
          }}
          value={occupation}
          type="text"
          name="occupation"
          minLength="2"
          maxLength="120"
          placeholder="Род деятельности"
          required
        />
        <input type="file" name="image" onChange={handler} required />

        <div className="group_but">
          <button type="submit" className="btn ">
            Отправить
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              Setoccupation("");
              SetName("");
            }}
          >
            Очистить все поля
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inteam;
