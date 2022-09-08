import React, { useRef, useState } from "react";
import "./modal.css";
import { stringify } from "query-string";

const Inclient = () => {
  const [error1, setErr1] = useState("");
  const [error2, setErr2] = useState("");
  const [error3, setErr3] = useState("");
  const form = useRef();
  let num = 0;
  const [name, SetName] = useState("");
  const [category, Setcategory] = useState("");
  const [description, Setdescription] = useState("");
  const [image1, Setimage1] = useState({ file: [] });

  const handler = (e) => {
    Setimage1({
      file: e.target.files[0],
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    num = 0;
    setErr1(null);
    setErr2(null);
    setErr3(null);
    SetName(e.target.name.value);
    Setcategory(e.target.category.value);
    Setdescription(e.target.description.value);

    const data = new FormData();
    data.append("image", image1.file);

    if (name.length >= 2 && name.length <= 30 && name !== null) {
      setErr1(null);
    } else {
      setErr1("Имя слишком короткое");
      num++;
    }

    if (category.toString().length <= 11 && category !== null) {
      setErr2(null);
    } else {
      setErr2("Слишком длинное число");
      num++;
    }

    if (description !== null) {
      setErr3(null);
    } else {
      setErr3("Введите описание");
      num++;
    }

    //console.log(name, " ", description, " ", category, " ", image);

    if (num < 1) {
      const image = await fetch("http://localhost:3001/upload", {
        method: "post",
        body: data,
      }).then((res) => res.text());

      const response = await fetch("http://localhost:3001/createclient", {
        method: "post",
        body: JSON.stringify({ name, category, description, image }),
        headers: { "Content-Type": "application/json" },
      });

      SetName("");
      Setcategory("");
      Setdescription("");
    }

    e.target.reset();
  };

  return (
    <div>
      <h2 className="form_name">Форма создание клиента</h2>
      <form ref={form} onSubmit={sendEmail}>
        {error1}
        <input
          onChange={(e) => {
            SetName(e.target.value);
          }}
          value={name}
          type="text"
          name="name"
          maxLength="30"
          placeholder="Ваше имя"
          required
        />

        {error2}

        <input
          onChange={(e) => {
            Setcategory(e.target.value);
          }}
          value={category}
          type="number"
          name="category"
          min="0"
          placeholder="Категория"
          required
        />
        <input type="file" name="image" onChange={handler} required />

        {error3}
        <textarea
          onChange={(e) => {
            Setdescription(e.target.value);
          }}
          value={description}
          name="description"
          placeholder="Описание"
          maxLength="255"
          rows="7"
          required
        ></textarea>
        <div className="group_but">
          <button type="submit" className="btn ">
            Отправить
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              SetName("");
              Setcategory("");
              Setdescription("");
            }}
          >
            Очистить все поля
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inclient;
