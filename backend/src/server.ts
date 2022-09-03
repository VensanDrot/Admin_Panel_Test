import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import multer from "multer"
import cors from 'cors'
import path from "path"





var jsonParser = bodyParser.json();
const prisma = new PrismaClient();
const app = express();





// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['POST', 'GET'],
  credentials: true
}))



// sql requests to mysql db
app.post("/createteam", async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, occupation, icon  } = req.body;
  const user = await prisma.team.create({
    data: {
     name: name,
     occupation: occupation,
     icon: icon,
    },
  });
  res.json(user);
});


app.post("/createclient", async (req: Request, res: Response) => {
  console.log(req.body);

  const { name, category, description, image  } = req.body;
  const user = await prisma.clients.create({
    data: {
     name: name,
     category: Number(category),
     description: description,
     image: image,
    },
  });
  res.json(user);
});

// read db

app.get("/getteam", async (req: Request, res: Response) => {
  const users = await prisma.team.findMany();
  res.json(users);

});

app.get("/getclient", async (req: Request, res: Response) => {
  const users = await prisma.clients.findMany();
  res.json(users);
});


app.post('/client', async (req: Request, res:Response)=> {
  const { id } = req.body;
  const user = await prisma.clients.findUnique({
    where: {
      id: Number(id),
    },
  })
  res.json(user);
});


app.post('/team', async (req: Request, res:Response)=> {
  const { id } = req.body;
  const user = await prisma.team.findUnique({
    where: {
      id: Number(id),
    },
  })
  res.json(user);
});
//delete post from db

app.post("/dteam", async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log('here');
    const user = await prisma.team.delete({
      where: {
        id: Number(id), 
      },
    })
    res.json(user);
});

app.post("/dclient", async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log('here');
  const user = await prisma.clients.delete({
    where: {
      id: Number(id), 
    },
  })
  res.json(user);
});


// upload photo try

const storage = multer.diskStorage({
  destination: (req,file, cb) => {
     cb(null,'./public/');
     console.log(file);
  },
  filename: (req,file,cb) => {
    const filename =  Date.now() + '-' + file.originalname;
    cb(null, filename);
    
  }
})


const upload = multer({storage}).single('file');

app.post('/upload', async (req,res)=> {
  upload(req,res,(err)=> {
    if (err){
      return res.status(500).json(err)
    }
  
    return res.status(200).send(req.file);
  })
})


// end of upload (not working idk)


// update functions 

app.post('/upclientimg',async (req:Request,res:Response)=> {
  //console.log(req.body);
  const {id,name, category,description, image} = req.body;
  const updateUser = await prisma.clients.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      category: Number(category),
      description:description,
      image:image,
    },
  })
})


app.post('/upteamimg',async (req:Request,res:Response)=> {
  //console.log(req.body);
  const {id,name, occupation, image} = req.body;
  const updateUser = await prisma.team.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      occupation: occupation,
      icon: image,
    },
  })
})

app.listen(3001, () => console.log("listening on port 3001"));
