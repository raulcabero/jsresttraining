// JavaScript Document

var Item = function(valor) {
    this.valor = valor;
    this.guessed = false;
};

Item.prototype.mostrar = function (){
         
    if (this.guessed){
        return this.valor;
    }
    else{
        return '*';  
    }
        
};
    
Item.prototype.mostrarValor = function (){
    return this.valor;
};
    
Item.prototype.adivinado = function (){
    this.guessed = true;
};
    
Item.prototype.getGuessed = function (){
    return this.guessed;
};

module.exports = Item;
