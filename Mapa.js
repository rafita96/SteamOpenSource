function Mapa(arreglo, width, height){
    this.arreglo = arreglo;

    this.ancho = Context.canvas.width/width;
    this.alto = Context.canvas.height/height;

    this.draw = function(){
        Context.context.fillStyle = "#95a5a6";
        Context.context.fillRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < height; i++){
            for(var j = 0; j < width; j++){
                Context.context.strokeRect(j*this.ancho,i*this.alto,this.ancho,this.alto);
                if(arreglo[i][j].tipo == PLAYER){
                    arreglo[i][j].draw(i, j, this.ancho, this.alto);
                }
            }
        }
    };

    this.resize = function(){
        this.ancho = Context.canvas.width/width;
        this.alto = Context.canvas.height/height;
    };
};