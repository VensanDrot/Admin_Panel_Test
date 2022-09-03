import React,{useRef,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import "./modal.css";




const Cl_edit = () => {
    let { id } = useParams();
    const [error1, setErr1] = useState(null);
    const [error2, setErr2] = useState(null);
    const [error3, setErr3] = useState(null);
    const form = useRef();
    const [name, SetName] = useState("");
    const [category, Setcategory] = useState("");
    const [description, Setdescription] = useState("");
    const [image, Setimage] = useState("");
    const [client, Setclient] = useState([]);
    let num = 0;

    const handler = (e) => {
      const file = e.target.files;
      Setimage(file[0]);
      //console.log(image);
       }
  
  
       const sendEmail = async (e) => {
        e.preventDefault();
        num = 0;
        SetName(e.target.name.value);
        Setcategory(e.target.category.value);
        Setdescription(e.target.description.value);
        Setimage('smth');
        
        if (name.length <= 30 && name !==null && name.length >=2 ) {
          setErr1('');
        }else {
          setErr1('Введите коректное имя (максимальная длина 30)');
          num++;
        }


        if (category.toString().length << 12 && category!== null ) {
          setErr2('');
        }else {
          setErr2('Введите коректное число (максимальная длина 11)');
          num++;
        }

        if (description.length <= 255 && description !== null) {
          setErr3('');
        }else {
          setErr3('Введите коректное число (максимальная длина 11)');
          num++;
        }
        //console.log(num)

        if (num < 1) {
          const response = await fetch("http://localhost:3001/upclientimg", {
          method: "post",
          body: JSON.stringify({id, name, category, description, image }),
          headers: { "Content-Type": "application/json" },
        });
      }
       
    

        e.target.reset();
      }



      const response = fetch("http://localhost:3001/client", {
        method: "post",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
    
    
      useEffect(() => {
      response.then((data) => {
      Setclient(data);
      });
      }, []);

      useEffect(()=> {
        
      SetName(client.name);
      Setdescription(client.description);
      Setcategory(client.category);
      Setimage(client.image);
      
      }, [id,client])
      
   
    
     






  




  return (
    <section>


    <div className="container content">
    <h2 className="form_name">Форма редактирования данных клиента</h2>
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
        <input type="file" name="image" onChange={handler}  />

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
    </section>
  );
};


export default Cl_edit;
