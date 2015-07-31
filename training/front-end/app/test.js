// JavaScript Document

function Tablero () {
     var valores = ['a', 'b', 'c', 'd' , 'e' , 'f' ,'g' ,'h' ,'i' ,'j']; 
     var arr  = [];
     var arr1 = ['00','01'];
      var arr2 = ['10','11'];
var arr3 = ['20','21'];

arr.push(arr1);
arr.push(arr2);
arr.push(arr3);
arr.push(arr1);
arr.push(arr2);
arr.push(arr3);

alert(arr[0][1]); // '01'
alert(arr[1][1]); // '11'
alert(arr[2][0]); // '20'
};


function Item (valor, posiscion) {
    this.valor = valor;
    this.guessed = false;
    this.posicion = posiscion;
};

