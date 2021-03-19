
var num = 2;
s = '2';

//Funcines anónimas, calcula esl espacio justo para almacenarlo 
const comparador = (data1,data2) => {
    if (data1==data2){
        console.log('iguales');
    }else{
        console.log('diferentes');
    }
}

comparador(s,num);