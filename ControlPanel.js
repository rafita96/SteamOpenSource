var ControlPanel = {
    width: 850,
    height: 50,
    maxSkills: 14,
    skillSelected: -1,

    draw: function() {
        Context.context.fillStyle = "#34495e";
        Context.context.fillRect(0, Context.canvas.height - this.height, this.width, this.height);
        Context.context.strokeRect(0, Context.canvas.height - this.height, this.width, this.height);

        var menor = Math.min(this.maxSkills, this.commands.length)
        for (var i = 0; i < menor; i++) {

            this.commands[i].draw(i*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
                Math.floor(this.width/this.maxSkills), this.height);
        }

        if(this.commands.length < this.maxSkills){
            for (var i = this.commands.length; i < this.maxSkills; i++) {
                Context.context.strokeRect(i*Math.floor(this.width/this.maxSkills), Context.canvas.height - this.height, 
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
};