var ControlPanel = {
    width: 850,
    height: 50,
    maxSkills: 14,
    skillSelected: -1,
    extras: 1,

    draw: function() {
        Context.context.fillStyle = "#34495e";
        Context.context.fillRect(0, Context.canvas.height - this.height, this.width, this.height);
        Context.context.strokeRect(0, Context.canvas.height - this.height, this.width, this.height);

        this.drawQuantum();

        var menor = Math.min(this.maxSkills - this.extras, this.commands.length)
        for (var i = 0; i < menor; i++) {
            var seleccionado = false;
            if(this.skillSelected == i + this.extras){
                seleccionado = true;
            }

            this.commands[i].draw((i + this.extras)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
                Math.floor(this.width/this.maxSkills), this.height, seleccionado);
        }

        if(this.commands.length < this.maxSkills - this.extras){
            for (var i = this.commands.length; i < this.maxSkills - this.extras; i++) {
                Context.context.strokeRect((i+this.extras)*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
                    Math.floor(this.width/this.maxSkills), this.height);
            }
        }

        if(Mouse.down){
            this.handleClick();
        }
    },

    commands: [new Skill("img/basic.png"), new Skill("img/basic.png"), 
                new Skill("img/basic.png"), new Skill("img/basic.png")],

    handleClick: function(){
        if(Mouse.y > Context.canvas.height - this.height){
            this.skillSelected = Math.floor(Mouse.x/(this.width/this.maxSkills)); 
        }
    },

    drawQuantum: function(){
        // Context.context.fillStyle = "#c0392b";
        // Context.context.fillRect(0, Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);
        // Context.context.strokeRect(0, Context.canvas.height - this.height, Math.floor(this.width/this.maxSkills), this.height);
            
        Context.context.textAlign = "center";
        // Context.context.font = this.height+"px Arial";
        // Context.context.fillText("Q", Math.floor(this.width/this.maxSkills)/2, Context.canvas.height);

        Context.context.fillStyle = "#000";
        Context.context.font = "20px Arial";
        Context.context.fillText(jugador.quant, Math.floor(this.width/this.maxSkills)/2, Context.canvas.height - this.height/4);
    },
};