function GameObject(tipo) {
    this.tipo = tipo;
};

var FLOOR = new GameObject(0),
    TREE = new GameObject(1),
    HOUSE = new GameObject(2),
    PLAYER = 3;

function Jugador(src){

    GameObject.call(this, PLAYER);
    this.img = new Image;
    this.img.src = src;

    this.draw = function(x, y, width, height){
        Context.context.drawImage(this.img, x*width, y*height, width, height);
    };
};