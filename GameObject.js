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
    var loadFinished = false;
    this.img.addEventListener('load', function() {
            loadFinished = true;
        }, false);
    this.img.src = src;

    // Stats básicos
    this.vida = 0;          // Puntos de vida
    this.quant = 0;         // Cantidad de quantums
    this.rec_quant = 0;     // Recuperación de quantums
    this.pasos = 0;         // Pasos caminados durante el ciclo

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

    this.habilidades = [new CutSkill("img/basic.png")];

    // Posicion actual
    this.x = x;
    this.y = y;

    // Posicion nueva
    this.x_new = x;
    this.y_new = y;
    // Velocidad a la que se va a mover
    this.speed = 0.2;
    this.direccion = 0; // 0 hacia abajo, 1 derecha, 2 izquierda, 3 arriba.

    this.draw = function(width, height){

        // Dibujar una caminata a traves de la cuadricula.
        // Si la nueva x es mayor entonces se debe aumentar la x actual
        if(this.x_new > this.x){
            this.x += this.speed;

            this.img.src = "img/swordman_derecha.png";
            this.direccion = 1;
            
            // Si la x actual sobre pasa la nueva x, entonces se le asigna la nueva x.
            if(Math.floor(this.x) == this.x_new){
                this.x = this.x_new;
            }
        }else if(this.x_new < this.x){ // Si la nueva x es menor, entonces se debe decrementar la x actual
            this.x -= this.speed;

            this.img.src = "img/swordman_izquierda.png";
            this.direccion = 2;

            // Si la x actual es menor a la nueva x, entonces se asigna la nueva x.
            if(Math.ceil(this.x) == this.x_new){
                this.x = this.x_new;
            }
        }else if(this.y_new > this.y){
            this.y += this.speed;

            this.img.src = "img/swordman.png";
            this.direccion = 0;
            
            if(Math.floor(this.y) == this.y_new){
                this.y = this.y_new;
            }
        }else if(this.y_new < this.y){
            this.y -= this.speed;

            this.img.src = "img/swordman_atras.png";
            this.direccion = 3;
            
            if(Math.ceil(this.y) == this.y_new){
                this.y = this.y_new;
            }
        }
        
        if(loadFinished){
            Context.context.drawImage(this.img, this.x*width, this.y*height, width, height);
        }

    };
};

function Skill(src){
    GameObject.call(this, ABILITY);

    this.img = new Image;
    this.loadFinished = false;
    this.img.addEventListener('load', function() {
            loadFinished = true;
        }, false);
    this.img.src = src;

    // Rango
    this.min = 0;
    this.max = 0;
    // Area de efecto:
    //  - Circulo = 0
    //  - Cruz = 1
    //  - Cuadrado = 2 
    this.AOE = 0;

    this.dmg_basico = 0;
    this.dmg_aire = 0;      
    this.dmg_tierra = 0;
    this.dmg_fuego = 0;
    this.dmg_agua = 0;

    this.draw = function(x, y, width, height, selected = false){
        if(selected){
            Context.context.fillStyle = "#ecf0f1";    
        }else{
            Context.context.fillStyle = "#2980b9";
        }
        Context.context.fillRect(x, y, width, height); 
        Context.context.strokeRect(x, y, width, height);
        if(loadFinished){
            Context.context.drawImage(this.img, x, y, width, height);  
        }
    };
};

function CutSkill(src){
    Skill.call(this, src);

    this.dmg_basico = 15;
    this.min = 1;
    this.max = 1;
};