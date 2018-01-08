function GameObject(tipo) {
    this.tipo = tipo;
};

var FLOOR = new GameObject(0),
    TREE = new GameObject(1),
    HOUSE = new GameObject(2),
    PLAYER = 3;

function Personaje(src, x, y){

    GameObject.call(this, PLAYER);
    this.img = new Image;
    this.img.src = src;

    // Stats básicos
    this.vida = 0;          // Puntos de vida
    this.quant = 0;         // Cantidad de quantums
    this.rec_quant = 0;     // Recuperación de quantums

    // Daño 
    this.dmg_basico = 0;
    this.dmg_aire = 0;      
    this.dmg_tierra = 0;
    this.dmg_fuego = 0;
    this.dmg_agua = 0;

    // Resistencia al daño  // Se pueden manejar valores negativos (debilidades)
    this.res_basico = 0; 
    this.res_aire = 0;
    this.res_tierra = 0;
    this.res_fuego = 0;
    this.res_agua = 0;

    // Multiplicadores
    this.rango_atk = 0;


    this.x = x;
    this.y = y;

    this.draw = function(width, height){
        Context.context.drawImage(this.img, this.x*width, this.y*height, width, height);
    };
};