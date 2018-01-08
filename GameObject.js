function GameObject(tipo) {
    this.tipo = tipo;
};

var FLOOR = new GameObject(0),
    TREE = new GameObject(1),
    HOUSE = new GameObject(2),
    PLAYER = 3,
    ABILITY = 4;

function Personaje(src, x, y){

    GameObject.call(this, PLAYER);
    this.img = new Image;
    this.img.src = src;

    this.x = x;
    this.y = y;

    this.draw = function(width, height){
        Context.context.drawImage(this.img, this.x*width, this.y*height, width, height);
    };
};

function Skill(src){
    GameObject.call(this, ABILITY);
    this.img = new Image;
    this.img.src = src;

    this.draw = function(x, y, width, height){
        Context.context.fillStyle = "#2980b9";
        Context.context.fillRect(x, y, width, height); 
        Context.context.strokeRect(x, y, width, height); 
        Context.context.drawImage(this.img, x, y, width, height);
    };
};