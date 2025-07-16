class Sprite {
    constructor(posX, posY, width, height, color){
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.visible = true; // vai falar se o objeto vai ser desenhado ou não
    }
    
}

// Criando prototipos para saber as posições dos objetos
Sprite.prototype.metadeWidth = function(){
    return this.width/2;
}
Sprite.prototype.metadeHeight = function(){
    return this.height/2;
}
Sprite.prototype.centroX = function(){
    return this.posX + this.metadeWidth();
}
Sprite.prototype.centroY = function(){
    return this.posY + this.metadeHeight();
}