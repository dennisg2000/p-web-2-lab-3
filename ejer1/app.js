const express = require('express')
const path = require('path')
const bp = require('body-parser')
const fs = require('fs')

const app =express()

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(express.static('pub'));

app.get('/',(req,res)=>{
    res.setHeader('Content-type', 'text/html');
    res.sendFile(path.resolve(__dirname, 'pub/index.html'));
})


app.get('/get-archivos',(req,res)=>{
    
    const file = fs.readFileSync('./archivos.json', 'UTF-8');
    
    res.setHeader('Content-type', 'text/json');
    res.send(file);
})

app.post('/crear',(req,res)=>{
    res.setHeader('Content-type', 'text/plain');
    const nombre = req.body.nombre;
    var nom=""
    nom=nombre
    var cont = ""
    const contenido = req.body.contenido
    cont=contenido
    fs.writeFile(path.resolve(__dirname)+'/pub/archivos/'+nom+'.txt',''+cont,(error)=>{
        if (error){
            console.log(error)
        }
    })
    fs.readdir('./pub/archivos',(error, archivosl)=>{
        if (error){
            throw error
        }
        
        let file = fs.readFileSync('./archivos.json', 'UTF-8');
        const json = JSON.parse(file);
        console.log(json)
        console.log("lonmgittti"+archivosl[0])
        
            archivosl.forEach(archivo =>{
                
                json.archivos.push({"nombre": archivo});
            })
            file = fs.writeFileSync('./archivos.json', JSON.stringify(json));
            
    })

    res.setHeader('Content-type', 'html/plain');
    res.send('archivo creado');
})
const nombre="manu"
const contenido="afasf"
fs.writeFile(path.resolve(__dirname)+'/pub/archivos/'+nombre+'.txt',contenido,(error)=>{
    if (error){
        console.log(error)
    }
})
app.listen(3000,()=>{
    console.log("server inic")
})