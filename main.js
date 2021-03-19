const tapp =require('./tapp');

const port = 8000;

tapp.listen(port, ()=>{
    console.log("Servidor corriendo correctamente");
});