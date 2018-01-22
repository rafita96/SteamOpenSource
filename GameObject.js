function GameObject(tipo) {
    this.tipo = tipo;
};

// Constantes para el mapa
var FLOOR = 0,
    TREE = 1,
    HOUSE = 2,
    PLAYER = 3,
    ABILITY = 4,
    VILLAIN = 5;

// Tipos de area de alcance o efecto
var MONO_OBJETIVO = 0,
    CIRCULO = 1,
    CUADRADO = 2,
    CRUZ = 3;

// Direccion del personaje
var ABAJO = 0,
    DERECHA = 1,
    IZQUIERDA = 2,
    ARRIBA = 3;

/**
 *  @param src   Arreglo de vistas del personaje con el siguiente orden [ABAJO, DERECHA, IZQUIERDA, ARRIBA]
 *  @param x     Posicion x en coordenadas del mapa.
 *  @param y     Posicion y en coordenadas del mapa.
 */
function Personaje(src, x, y){

    this.img = new Image;
    var loadFinished = false;
    this.img.addEventListener('load', function() {
            loadFinished = true;
        }, false);
    this.img.src = src[ABAJO];

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
    this.direccion = ABAJO; 

    this.draw = function(width, height){

        // Dibujar una caminata a traves de la cuadricula.
        // Si la nueva x es mayor entonces se debe aumentar la x actual
        if(this.x_new > this.x){
            this.x += this.speed;

            this.img.src = src[DERECHA];
            this.direccion = DERECHA;
            
            // Si la x actual sobre pasa la nueva x, entonces se le asigna la nueva x.
            if(Math.floor(this.x) == this.x_new){
                this.x = this.x_new;
            }
        }else if(this.x_new < this.x){ // Si la nueva x es menor, entonces se debe decrementar la x actual
            this.x -= this.speed;

            this.img.src = src[IZQUIERDA];
            this.direccion = IZQUIERDA;

            // Si la x actual es menor a la nueva x, entonces se asigna la nueva x.
            if(Math.ceil(this.x) == this.x_new){
                this.x = this.x_new;
            }
        }else if(this.y_new > this.y){
            this.y += this.speed;

            this.img.src = src[ABAJO];
            this.direccion = ABAJO;
            
            if(Math.floor(this.y) == this.y_new){
                this.y = this.y_new;
            }
        }else if(this.y_new < this.y){
            this.y -= this.speed;

            this.img.src = src[ARRIBA];
            this.direccion = ARRIBA;
            
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

    // Costo de la habilidad en Quantums
    this.costo = [0]; // Un arreglo de costos por ejecucion.
    this.ejecuciones = 0; // Numero de ejecuciones por ciclo. 

    // Rango
    this.min = 0;
    this.max = 0;
    // Tipo de rango de la habilidad
    this.tipoRango = CIRCULO;
    // Area de efecto:
    this.AOE = MONO_OBJETIVO;

    this.dmg_basico = 0;
    this.dmg_aire = 0;      
    this.dmg_tierra = 0;
    this.dmg_fuego = 0;
    this.dmg_agua = 0;

    this.executeSkill = function(objetivo){};

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
    this.costo = [2, 4, 6, 10, 15, 30, 60];
    this.ejecuciones = 0;

    this.executeSkill = function(objetivo){
        objetivo.vida -= this.dmg_basico;
        this.ejecuciones = Math.min(this.ejecuciones + 1, this.costo.length);
    };
};