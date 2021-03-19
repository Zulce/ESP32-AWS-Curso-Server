const express = require('express'); //Lo va a buscar a los modules
const bodyParser = require('body-parser');
const path = require('path');
const num = require('./dummy');
const users = require('./usuarios');
const { fstat } = require('fs');
const {exec} =require('child_process')

console.log(num);
console.log(users);
const tapp = express();

//Middlewares (funciones que se ejecutan en medio de la solucitud)
tapp.use(bodyParser.urlencoded({extended:false}));
tapp.use(bodyParser.json());

//CORS

//Rutas 
/*tapp.get('/',(req,res)=>{
    res.status(200).send('<div> <h1>Mi sitio Web</h1> <p>Esp32 y AWS <p></h1>')
});*/

tapp.get('/homepage',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

/*tapp.get('/data',(req,res)=>{
    res.status(200).send(num.sort((a,b)=>{return a-b}));
    });
*/
/*
tapp.get('/data',(req,res)=>{
     res.status(200).send(users.sort((a,b)=>{
        return a.id-b.id
     }));
});
*/

tapp.get('/users/:id',(req,res)=>
{
    const id = req.params.id;
    var user ={};
    for(let u of users){
        if(u.id==id){
            user=u;
        }
    }

    //Compresión de clave
    var nuevaClave ='';
    var contador = 0;
    var cRef = ''; 

    for(let c of user.clave){
        //console.log(c);
        if(c===cRef){
            contador = contador +1;
        }else{
            cRef=c;
            nuevaClave=nuevaClave+cRef+String(contador);
        }
    }
    console.log(nuevaClave);

    res.status(200).send(user);
});

const comprimirCadena=(cadena)=>{
    for(let c of cadena){
        if(c===cRef){
            contador+=cRef;
            if((contador>0)) nuevaCadena=nuevaCadena+String(contador);
            cRef=c;
            contador=0;
        }
    }
}

var msg='';
tapp.get('/publish',(req,res)=>{
    //leer nombre de los archivos 
    exec("aws --region us-east-2 iot-data publish --topic 'inTopic' --cli-binary-format raw-in-base64-out --payload 'Hello world'",(error,stdout,stderr)=>{
        if(error){
            res.status(200).send(error);
        }
        if (stderr){
            res.status(200).send(stderr)
        }
        res.status(200).send("Enviado correctamente");
    });
});

const data = {
    message:'datos',
    payload: {
        temperatura:'22',
        presion: '1'
    }
}

tapp.get('/data', (req,res)=>{
    res.status(200).send(data);
});

module.exports = tapp;