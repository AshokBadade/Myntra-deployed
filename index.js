const express = require('express') ;
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema } = mongoose;

const app = express() ;

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200 
  };
  
app.use(express.json())
app.use(cors(corsOptions));
  

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ASHOK:ASHOK@cluster0.ysj5m5f.mongodb.net/GoogleKeep?retryWrites=true&w=majority');
  console.log("database conneted")
}

const NotesSchema = new Schema({
    "title" : {"type" : "String"} ,
     "content" : {"type" : "String"}
});

const Notes =  new mongoose.model("Notes",NotesSchema) ;

const n1 = new Notes({
    "title": "first note" ,
    "content" : "leraning mern to create project"
});

//n1.save() ;

app.get("/", (req, res) => {
    res.send("hello");
})

app.get("/get",cors(corsOptions),async(req,res) => {
    try{
      const docs = await Notes.find() ;
      res.json(docs);
    }
    catch(err){  res.status(400).json(err)  } 
     
   } ) ;
   
   app.post("/post" ,cors(corsOptions),(req,res) => {
    const p = new Notes(req.body) ;
    p.save() ;
    res.send("data added") ;
 })

 app.delete("/del" , async(req,res) => {
  const id = req.body.title ;
  try{
    const docs = await Notes.deleteMany({title:id}) ; 
    res.json(docs)
  }catch(err){ res.status(400).json(err) }
 })


 app.put("/put/:id" , async(req,res) => {
  const id = req.params.id ;
  console.log(id)
  try{
    const docs = await Products.findOneAndUpdate({title:id}, req.body ,{new:true}) ;
    res.json(docs) ;
  }catch(err){ res.status(400).json(err) }
 })
 


app.listen(3002)