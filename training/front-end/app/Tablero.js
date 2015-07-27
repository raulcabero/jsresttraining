// JavaScript Document
var Item = require("./Item.js");

var Tablero = function() {
     this.valores = ['a', 'b', 'c', 'd' , 'e' , 'f' ,'g' ,'h' ,'i' ,'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
     this.tablero = [[]]; 
     this.size = 6;
     this.countPar = 0;
     this.intentos = 0;
     this.maxIntentos = 20;
     this.ultimoValor = '';
     this.ultimoPos1 = 0;
     this.ultimoPos2 = 0;
};     

Tablero.prototype.create = function(){
    this.tablero = new Array(this.size);   
    for (i = 0; i < this.size; i++) { 
        this.tablero[i] = new Array(this.size);
        for (j = 0; j < this.size; j++) { 
            this.tablero[i][j] = 0;
        }
    }       
    var countPosFilled = this.size * this.size 
    var valoresPos = 0;
    var valPosAsigned = 0;
                  
    while (countPosFilled > 0){
        var pos1 = Math.floor((Math.random() * this.size ) );
        var pos2 = Math.floor((Math.random() * this.size ) );
        if (this.tablero[pos1][pos2] == 0 ){
            myItem = new Item(this.valores[valoresPos]);
            this.tablero[pos1][pos2] = myItem;
            countPosFilled = countPosFilled - 1;
            valPosAsigned = valPosAsigned + 1;
            if (valPosAsigned == 2){
                valoresPos = valoresPos + 1;
                valPosAsigned = 0;
            }
        }
    } 
            
    //console.log (this.tablero);            
};
         
Tablero.prototype.mostrar = function(){
    var print = '';
    for (i = 0; i < this.size; i++) { 
        print = print + '\n';
        for (j = 0; j < this.size; j++) { 
            print = print + this.tablero[i][j].mostrar();
        }
    }
    return print;
}; 
        
Tablero.prototype.mostrarTodo = function(){
    var print = '';
    for (i = 0; i < this.size; i++) { 
        print = print + '\n';
        for (j = 0; j < this.size; j++) { 
            print = print + this.tablero[i][j].mostrarValor();
        }
    }
    return print;
}; 
        
Tablero.prototype.adivinado = function(){
    var res = true;
    for (i = 0; i < this.size; i++) { 
        for (j = 0; j < this.size; j++) { 
            if(!this.tablero[i][j].getGuessed()){;
                res = false;
                break;
            }   
        }
    }     
    return res;
};
        
Tablero.prototype.entradaValida = function(pos1, pos2){
    var res = true;
    if (pos1 > this.size-1 || pos2 > this.size-1){
        res = false
    }      
    return res;
};

Tablero.prototype.intentosAlcanzados = function(pos1, pos2){
    res = true;
    if (this.intentos != this.maxIntentos ){
        res = false;
    }
    return res;
};

Tablero.prototype.getCountPar = function(){
    return this.countPar;
};

Tablero.prototype.adivinar = function(pos1, pos2){
    if (this.entradaValida(pos1,pos2)){
         if (this.intentos != this.maxIntentos ){ 
           var valor = this.tablero[pos1][pos2].mostrarValor();
           console.log ('This is the value in the pos ' + pos1 + pos2 + " '" + this.tablero[pos1][pos2].mostrarValor() + "'.") ;
           this.countPar = this.countPar + 1;
           if (this.ultimoValor == ''){
               this.ultimoValor = valor;
               this.ultimoPos1 = pos1;
               this.ultimoPos2 = pos2;
           }
           
           if (this.countPar == 2){
                this.intentos = this.intentos + 1;
                this.countPar = 0;
                if (valor == this.ultimoValor){
                    this.tablero[this.ultimoPos1][this.ultimoPos2].adivinado(); 
                    this.tablero[pos1][pos2].adivinado();
                }
                this.ultimoValor = '';
           }
           
           if (this.adivinado()){
              console.log('ganaste');              
           }
        }
        else {
           console.log('max intentos alcanzados');
        }
    }
    else {
         console.log('la entrada no es valida entre una pocision entre 0 y ', this.size-1);  
    } 
};

miTablero = new Tablero();
miTablero.create();
console.log(miTablero.mostrar());

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

console.log('please enter a position e.g. 01:');
process.stdin.on('data', function (text) {
   
   values = text.split('');
   var pos1 = parseInt(values[0]);
   var pos2 = parseInt(values[1]);
   
   miTablero.adivinar(pos1,pos2);
   
   console.log(miTablero.mostrar() + '\n\n');
      
 
    if(miTablero.adivinado()){
        console.log('Congratulations you win');
        process.exit();
    }
    if(miTablero.intentosAlcanzados()){
         console.log('Max attenps reach you lose');
         process.exit();
    }  

    console.log('please enter a position e.g. 01:');
    
});

module.exports = Tablero;
