const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port:"3307",
    user: "root",
    password: "",
    database: "news"
});

app.post("/create",(req,res)=>{
    const topic = req.body.topic;
    const imagen = req.body.imagen;
    const fecha = req.body.fecha;
    const subject = req.body.subject;
    const zona = req.body.zona;
    

    db.query('INSERT INTO noticias(topic,imagen,fecha,subject,zona) VALUES(?,?,?,?,?)',[topic,imagen,fecha,subject,zona],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});


app.get("/noticias",(req,res)=>{

    db.query('SELECT * FROM noticias',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});


app.put("/update",(req,res)=>{
    const id = req.body.id;
    const topic = req.body.topic;
    const imagen = req.body.imagen;
    const fecha = req.body.fecha;
    const subject = req.body.subject;
    const zona = req.body.zona;
    

    db.query('UPDATE noticias SET topic=?, imagen=?, fecha=?, subject=?, zona=? WHERE id=?',[topic,imagen,fecha,subject,zona,id],
    (err,result)=>{
        if(err){
            console.log(err)
            console.log(id)
        }else{
            res.send(result)
            
        }
    }
    );
});



app.delete("/delete/:id",(req,res)=>{
    
    const id = req.params.id;


    db.query('DELETE FROM noticias WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});




app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")

})