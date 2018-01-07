function GameObject(tipo) {
    this.tipo = tipo;
};

var FLOOR = new GameObject(0),
    TREE = new GameObject(1),
    HOUSE = new GameObject(2),
    PLAYER = 3;

function Jugador(src, x, y){

    GameObject.call(this, PLAYER);
    this.img = new Image;
    this.img.src = src;

    this.x = x;
    this.y = y;

    this.draw = function(width, height){
        Context.context.drawImage(this.img, this.x*width, this.y*height, width, height);
    };
};