import React,{useRef,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import "./modal.css";




const Tm_edit = () => {
    let { id } = useParams();
    const form = useRef();
    let num =0;
  const [flag, setFlag] = useState(true)
  const [error1, setErr1] = useState(null);
  const [error2, setErr2] = useState(null);
  const [name, SetName] = useState("");
  const [occupation, Setoccupation] = useState("");
  const [client, Setclient] = useState([]);
  const [oldlink, Setold] = useState();
  const [image, Setimage] = useState({file:[]});

  // image handler 
  const handler = (e) => {
    Setimage({
      file: e.target.files[0],
    })
     setFlag(false);
  }

  //fetch data input 
  
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
  Setold(client.icon);
  
  }, [id,client,])
  
   
    
  
       const SendEmail = async (e) => {
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

       console.log(flag);

        if (num < 1 && flag === true) {
        const icon = oldlink;
        console.log('content only');
        const response = await fetch("http://localhost:3001/upteamimg", {
          method: "post",
          body: JSON.stringify({id, name, occupation, icon }),
          headers: { "Content-Type": "application/json" },
        });
         
    }
    else if (num <1 && flag === false) {
    const nameOfPic = oldlink.split('/').slice(4);
    
    fetch("http://localhost:3001/delimage/"+nameOfPic, {
     method: "get",
    }).then((res) => res.text());

    const data = new FormData();
    data.append('image',image.file);
    const icon = await fetch("http://localhost:3001/upload", {
      method: "post",
      body: data,
    
    }).then(res => res.text())

    Setold(icon);
    
          fetch("http://localhost:3001/upteamimg", {
         method: "post",
         body: JSON.stringify({id, name, occupation, icon }),
         headers: { "Content-Type": "application/json" },
       })

      setFlag(true);
      console.log(flag + 'ss');
     
      }

      e.target.reset();
      }


  



  return (
    <section>


    <div className="container content">
    <h2 className="form_name">Форма редактирования сотрудника</h2>
      <form ref={form} onSubmit={SendEmail}>
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


//const link =https://localhost/image/asdjflkaksdjflkas
 