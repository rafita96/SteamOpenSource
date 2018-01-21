var mapa, jugador, tiempo, ciclo, marginX, marginY;
$(document).ready(function(){
    marginX = 100;
    marginY = 100;
    
    tiempo = 0; // Tiempo para contar los ciclos
    ciclo = 250; // Tiempo que se debe cumplir para un ciclo
    var limite = 40; // Limite de quantums del personaje... esto debe ser un atributo del personaje
    var regeneracion = 20; // Regeneracion de quantums por ciclo... debe ser atributo del personaje

    Context.create();
    mapa = new Mapa(Nivel1);

    var index = Math.floor((Math.random() * (Nivel1.posicionesIniciales1.length)));
    var posicionInicial = Nivel1.posicionesIniciales1[index];
    var vistas = ["img/swordman.png", "img/swordman_derecha.png", 
                    "img/swordman_izquierda.png", "img/swordman_atras.png"];
    jugador = new Personaje(vistas, posicionInicial[0], posicionInicial[1]);
    jugador.vida = 100;
    jugador.quant = 20;
    mapa.jugadores.push(jugador);

    index = Math.floor((Math.random() * (Nivel1.posicionesIniciales2.length)));
    posicionInicial = Nivel1.posicionesIniciales2[index];
    vistas = ["img/swordman.png", "img/swordman_derecha.png", 
            "img/swordman_izquierda.png", "img/swordman_atras.png"];

    // resize();
    Mouse.Initialize(Context.canvas);

    setInterval(function(){
        mapa.draw();
        ControlPanel.draw();

        if(tiempo == ciclo){
            jugador.quant = Math.min(jugador.quant + regeneracion, limite);
            tiempo = 0;
            jugador.pasos = 0;
        }
        
        tiempo += 1;
        
    }, 30);
});

function resize(){
    Context.canvas.width = $(window).width() - marginX;
    Context.canvas.height = $(window).height() - marginY;
    
    mapa.resize();
}

$(window).bind("resize", function(){
    // resize();
});