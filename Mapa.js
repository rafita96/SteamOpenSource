function Mapa(nivel){
    this.arreglo = nivel.arreglo;

    // Numero de casillas del mapa.
    this.casillasX = nivel.width;
    this.casillasY = nivel.height;

    this.ancho = Context.canvas.width/this.casillasX;
    this.alto = (Context.canvas.height - ControlPanel.height)/this.casillasY;

    this.draw = function(){
        // Dibuja una base gris sobre todo el mapa.
        Context.context.fillStyle = "#95a5a6";
        Context.context.fillRect(0, 0, canvas.width, canvas.height - ControlPanel.height);

        // Dibujar la cuadricula, por eso es strokeRect
        for(var i = 0; i < this.casillasY; i++){
            for(var j = 0; j < this.casillasX; j++){
                Context.context.strokeRect(j*this.ancho,i*this.alto,this.ancho,this.alto);
            }
        }  
    };

    this.resize = function(){
        this.ancho = Context.canvas.width/this.casillasX;
        this.alto = Context.canvas.height/this.casillasY;
    };
};