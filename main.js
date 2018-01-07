var mapa, jugador, marginX, marginY;
$(document).ready(function(){
    marginX = 100;
    marginY = 100;

    Context.create();
    mapa = new Mapa(Nivel1.arreglo, Nivel1.width, Nivel1.height);
    jugador = new Jugador("img/swordman.png");

    mapa.arreglo[0][0] = jugador;
    resize();

    setInterval(function(){
        mapa.draw();
    }, 30);
});

function resize(){
    Context.canvas.width = $(window).width() - marginX;
    Context.canvas.height = $(window).height() - marginY;
    
    mapa.resize();
}

$(window).bind("resize", function(){
    resize();
});