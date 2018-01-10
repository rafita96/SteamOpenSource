var ControlPanel = {
    width: 850,
    height: 50,
    maxSkills: 14,
    skillSelected: -1,
    extras: 3,
    cooldown: 0, // Retraso del click, para que no haga 2 cosas casi instantaneas.

    draw: function() {
        if(this.cooldown != 0){
            this.cooldown -= 1;
        }

        Context.context.fillStyle = "#34495e";
        Context.context.fillRect(0, Context.canvas.height - this.height, this.width, this.height);
        Context.context.strokeRect(0, Context.canvas.height - this.height, this.width, this.height);

        Context.context.textAlign = "center";
        this.drawTimer(1);
        this.drawQuantum(2);
        this.drawPasos(3);

        // Pinta los skills, siempre y cuando quepan en la pantalla.
        var menor = Math.min(this.maxSkills - this.extras, this.commands.length)
        for (var i = 0; i < menor; i++) {
            var seleccionado = false;
            if(this.skillSelected == i + this.extras){
                seleccionado = true;
            }

            this.commands[i].draw((i + this.extras)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
                Math.floor(this.width/this.maxSkills), this.height, seleccionado);
        }

        // Si son menos skills, entonces rellena con cuadros.
        if(this.commands.length < this.maxSkills - this.extras){
            for (var i = this.commands.length; i < this.maxSkills - this.extras; i++) {
                Context.context.strokeRect((i+this.extras)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
                    Math.floor(this.width/this.maxSkills), this.height);
            }
        }

        // Posicion del mouse en el mapa.
        var j = Math.floor(Mouse.x/mapa.ancho);
        var i = Math.floor(Mouse.y/mapa.alto);

        var distancia = Math.abs(j - jugador.x) + Math.abs(i - jugador.y);

        // Suma de numeros consecutivos.
        // El primer paso cuesta 1, el segundo 2, el tercero 3... el enesimo n*(n-1)/2
        // Se considera la distancia que se quiere recorrer mas la que ya se ha recorrido.
        // A los Quantums actuales les quitamos los quantums que cuesta caminar al momento del click
        // Esto se hace para no cobrar 2 veces lo que ya habiamos cobrado y se mantenga el criterio de
        // que cada paso cueste uno mas que el anterior.
        var costo = ((jugador.pasos + distancia)*(jugador.pasos + distancia + 1) - (jugador.pasos)*(jugador.pasos + 1))/2;

        if(distancia != 0 && costo <= jugador.quant && this.skillSelected == -1){

            // Deberia pintar un camino desde la posicion del personaje hasta donde quiere ir
            Context.context.fillStyle = "#2ecc71";
            Context.context.fillRect(j*mapa.ancho,i*mapa.alto,mapa.ancho,mapa.alto);

            // Si le pica significa que quiere caminar
            if(Mouse.down && this.cooldown == 0){
                jugador.x = j;
                jugador.y = i;

                jugador.pasos += distancia;
                jugador.quant = jugador.quant - costo;
            }
        }

        if(Mouse.down){
            this.handleClick(j, i);
        }

    },

    commands: [new Skill("img/basic.png"), new Skill("img/basic.png"), 
                new Skill("img/basic.png"), new Skill("img/basic.png")],

    handleClick: function(x, y){
        if(Mouse.y > Context.canvas.height - this.height){
            this.skillSelected = Math.floor(Mouse.x/(this.width/this.maxSkills)); 
        }else if(this.skillSelected != -1){ // Si hay alguna habilidad seleccionada
            // Si en el mapa hay algun objetivo y el alcance la habilidad lo permite,
            // entonces lo ejecuta 
            
            /* Aqui */
            
            //y la habilidad seleccionada se reinicia.
            this.skillSelected = -1;
        }

        this.cooldown = 20;
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