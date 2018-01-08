function Mapa(arreglo, width, height){
    this.arreglo = arreglo;
    this.jugadores = [];

    this.ancho = Context.canvas.width/width;
    this.alto = (Context.canvas.height - ControlPanel.height)/height;

    this.draw = function(){
        // Dibuja una base gris sobre todo el mapa.
        Context.context.fillStyle = "#95a5a6";
        Context.context.fillRect(0, 0, canvas.width, canvas.height - ControlPanel.height);

        // Dibujar la cuadricula, por eso es strokeRect
        for(var i = 0; i < height; i++){
            for(var j = 0; j < width; j++){
                Context.context.strokeRect(j*this.ancho,i*this.alto,this.ancho,this.alto);
            }
        }

        // Dibujar a los jugadores sobre el mapa
        for (var i = 0; i < this.jugadores.length; i++) {
            this.jugadores[i].draw(this.ancho, this.alto);
        }

        // Cuadrito que dice en donde esta el mouse.
        j = Math.floor(Mouse.x/this.ancho);
        i = Math.floor(Mouse.y/this.alto); 

        Context.context.fillStyle = "#2ecc71";
        Context.context.fillRect(j*this.ancho,i*this.alto,this.ancho,this.alto);  
    };

    this.resize = function(){
        this.ancho = Context.canvas.width/width;
        this.alto = Context.canvas.height/height;
    };
};