import React,{useRef,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import "./modal.css";




const Tm_edit = () => {
    let { id } = useParams();
    const form = useRef();
    let num =0;
  const [error1, setErr1] = useState(null);
  const [error2, setErr2] = useState(null);
  const [name, SetName] = useState("");
  const [occupation, Setoccupation] = useState("");
  const [image, Setimage] = useState();

    const [client, Setclient] = useState([]);
   

    const handler = (e) => {
      const file = e.target.files;
      Setimage(file[0]);
      //console.log(image);
       }
       
    
  
       const sendEmail = async (e) => {
        e.preventDefault();
        num = 0;
        SetName(e.target.name.value);
        Setoccupation(e.target.occupation.value);
        Setimage('now working');

        if (name.length <= 120 && name.length >= 2 && name !== null) {
            setErr1('');
        }
        else {
            setErr1('Введите имя в коректной форме(120 символов макс)');
            num++;
        }

        if (occupation.length <= 120 && occupation!== null) {
            setErr2('');
        }
        else {
            setErr2('Введите коректный тип занятости');
            num++;
        }

        //console.log(num);
        if (num < 1) {
           // console.log('here');
        const response = await fetch("http://localhost:3001/upteamimg", {
         method: "post",
         body: JSON.stringify({id, name, occupation, image }),
         headers: { "Content-Type": "application/json" },
       });
    }
        e.target.reset();
      }



      const response = fetch("http://localhost:3001/team", {
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
      Setoccupation(client.occupation);
      Setimage(client.image);
      
      }, [id,client])
      
  



  return (
    <section>


    <div className="container content">
    <h2 className="form_name">Форма редактирования сотрудника</h2>
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
         
          placeholder="Род деятельности"
          required
        />
        <input type="file" name="image" onChange={handler}  />

        <div className="group_but">
          <button type="submit" className="btn " >
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
    </section>
  );
};


export default Tm_edit;
