var ControlPanel = {
    width: 850,
    height: 50,
    maxSkills: 14,
    skillSelected: -1,
    extras: 4,
    cooldown: 0, // Retraso del click, para que no haga 2 cosas casi instantaneas.

    draw: function() {
        if(this.cooldown != 0){
            this.cooldown -= 1;
        }

        // Posicion del mouse en el mapa.
        var x_click = Math.floor(Mouse.x/mapa.ancho);
        var y_click = Math.floor(Mouse.y/mapa.alto);

        var posicionValida = isPosicionValida(x_click, y_click);
        
        // opcion para caminar.
        if(posicionValida == null && Mouse.y < Context.canvas.height - this.height && this.skillSelected == -1){
            
            // Calcula el costo en Quantums para viajar a ese lugar.
            var costo_distancia = calcularCostoCaminata(jugador.pasos, jugador.x_new, jugador.y_new, x_click, y_click);
            var costo = costo_distancia[0];
            var distancia = costo_distancia[1];

            if(costo != 0 && costo <= jugador.quant){

                // Deberia pintar un camino desde la posicion del personaje hasta donde quiere ir
                Context.context.fillStyle = "#2ecc71";
                Context.context.fillRect(x_click*mapa.ancho,y_click*mapa.alto,mapa.ancho,mapa.alto);
                
                // Dibuja el costo de Quantums para llegar a ese cuadro
                Context.context.fillStyle = "#000";
                Context.context.font = "15px Arial";
                Context.context.fillText(costo, (x_click+0.5)*mapa.ancho, (y_click+0.75)*mapa.alto);

                // Si le pica significa que quiere caminar
                if(Mouse.down && this.cooldown == 0){
                    jugador.x_new = x_click;
                    jugador.y_new = y_click;

                    jugador.pasos += distancia;
                    jugador.quant = jugador.quant - costo;
                }
            }
        }else if(this.skillSelected != -1){ // Opcion para ejecutar una habilidad
            // Como hay alguna habilidad seleccionada se dibujara el alcance de la habilidad
            var habilidad = jugador.habilidades[this.skillSelected];
            Context.context.fillStyle = "#3498db";

            if(habilidad.tipoRango == CIRCULO){
                // Dibuja un circulo perfecto y depende del rango de la habilidad
                for(var y=-habilidad.max; y<=habilidad.max; y++){
                    for(var x=-habilidad.max; x<=habilidad.max; x++){
                        if((Math.abs(x - y) <= habilidad.max && Math.abs(x + y) <= habilidad.max)
                            && (Math.abs(x + y) >= habilidad.min || Math.abs(x - y) >= habilidad.min)){
                            Context.context.fillRect((x+jugador.x)*mapa.ancho,(y+jugador.y)*mapa.alto,mapa.ancho,mapa.alto);
                        }
                    }
                }
            }

            // Sobresaltar la posicion seleccionada al alcance de la habilidad
            if(Math.abs(jugador.x - x_click) + Math.abs(jugador.y - y_click) <= habilidad.max &&
                Math.abs(jugador.x - x_click) + Math.abs(jugador.y - y_click) >= habilidad.min){
                
                if(habilidad.AOE == MONO_OBJETIVO){
                    Context.context.fillStyle = "#e67e22";
                    Context.context.fillRect(x_click*mapa.ancho,y_click*mapa.alto,mapa.ancho,mapa.alto);
                }

                if(Mouse.down){ 
                    // Como hay una habilidad seleccionada y el click esta dentro del alcance
                    // entonces ejecuta la habilidad
                    executeSkill(x_click, y_click, habilidad);
                    jugador.quant -= habilidad.costo[habilidad.ejecuciones];

                    // Se reinicia la habilidad seleccionada
                    this.skillSelected = -1;
                }
            }
        }
        

        // Pinta el panel
        Context.context.fillStyle = "#34495e";
        Context.context.fillRect(0, Context.canvas.height - this.height, this.width, this.height);
        Context.context.strokeRect(0, Context.canvas.height - this.height, this.width, this.height);

        Context.context.textAlign = "center";
        this.drawTimer(1);
        this.drawQuantum(2);
        this.drawVida(3);
        this.drawPasos(4);

        // Pinta los skills, siempre y cuando quepan en la pantalla.
        var menor = Math.min(this.maxSkills - this.extras, jugador.habilidades.length)
        for (var i = 0; i < menor; i++) {
            var seleccionado = false;
            if(this.skillSelected == i){
                seleccionado = true;
            }

            jugador.habilidades[i].draw((i + this.extras)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
                Math.floor(this.width/this.maxSkills), this.height, seleccionado);
        }

        // Si son menos skills, entonces rellena con cuadros.
        if(jugador.habilidades.length < this.maxSkills - this.extras){
            for (var i = jugador.habilidades.length; i < this.maxSkills - this.extras; i++) {
                Context.context.strokeRect((i+this.extras)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
                    Math.floor(this.width/this.maxSkills), this.height);
            }
        }
        if(Mouse.down){
            this.handleClick(x_click, y_click);
        }

    },

    handleClick: function(x, y){
        if(Mouse.y >= Context.canvas.height - this.height){
            this.skillSelected = Math.floor(Mouse.x/(this.width/this.maxSkills)) - this.extras;
            if(this.skillSelected >= jugador.habilidades.length){
                this.skillSelected = -1;
            }
        }else if(this.skillSelected != -1){ // Si hay alguna habilidad seleccionada
            // Y esta fuera de rango entonces la habilidad seleccionada se reinicia.
            this.skillSelected = -1;
        }

        this.cooldown = 10;
    },

    drawQuantum: function(pos){
        // Context.context.fillStyle = "#c0392b";
        // Context.context.fillRect(0, Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);
        // Context.context.strokeRect(0, Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);
            
        // Context.context.font = this.height+"px Arial";
        // Context.context.fillText("Q", Math.floor(this.width/this.maxSkills)/2, Context.canvas.height);

        Context.context.fillStyle = "#000";
        Context.context.font = "20px Arial";
        Context.context.fillText(jugador.quant, (2*pos - 1)*Math.floor(this.width/this.maxSkills)/2, Context.canvas.height - this.height/4);
    },

    drawTimer: function(pos){
        Context.context.fillStyle = "#34495e";
        Context.context.fillRect((pos-1)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);
        Context.context.strokeRect((pos-1)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);

        
        // Context.context.font = this.height+"px Arial";
        // Context.context.fillText("Q", Math.floor(this.width/this.maxSkills)/2, Context.canvas.height);

        Context.context.fillStyle = "#000";
        Context.context.font = "20px Arial";
        Context.context.fillText(ciclo-tiempo, Math.floor(this.width/this.maxSkills)/2 * pos, Context.canvas.height - this.height/4);
    },

    drawVida: function(pos){
        Context.context.fillStyle = "#34495e";
        Context.context.fillRect((pos-1)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);
        Context.context.strokeRect((pos-1)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);

        
        // Context.context.font = this.height+"px Arial";
        // Context.context.fillText("Q", Math.floor(this.width/this.maxSkills)/2, Context.canvas.height);

        Context.context.fillStyle = "#000";
        Context.context.font = "20px Arial";
        Context.context.fillText(jugador.vida, (2*pos - 1)*Math.floor(this.width/this.maxSkills)/2, Context.canvas.height - this.height/4);
    },

    drawPasos: function(pos){
        Context.context.fillStyle = "#34495e";
        Context.context.fillRect((pos-1)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);
        Context.context.strokeRect((pos-1)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);

        
        // Context.context.font = this.height+"px Arial";
        // Context.context.fillText("Q", Math.floor(this.width/this.maxSkills)/2, Context.canvas.height);

        Context.context.fillStyle = "#000";
        Context.context.font = "20px Arial";
        Context.context.fillText(jugador.pasos, (2*pos - 1)*Math.floor(this.width/this.maxSkills)/2, Context.canvas.height - this.height/4);
    },
};