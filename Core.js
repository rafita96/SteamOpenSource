/**
 *  Suma de numeros consecutivos.
 *  El primer paso cuesta 1, el segundo 2, el tercero 3... el enesimo n*(n-1)/2
 *  Se considera la distancia que se quiere recorrer mas la que ya se ha recorrido.
 *  A los Quantums actuales les quitamos los quantums que cuesta caminar al momento del click
 *  Esto se hace para no cobrar 2 veces lo que ya habiamos cobrado y se mantenga el criterio de
 *  que cada paso cueste uno mas que el anterior.
 *
 * @param pasos     Cantidad de pasos que ya ha dado durante el ciclo.
 * @param x         Posicion x actual en el mapa.
 * @param y         Posicion y actual en el mapa.
 * @param x_new     Posicion x a la que se quiere ir en el mapa.
 * @param y_new     Posicion y a la que se quiere ir en el mapa.
 */
function calcularCostoCaminata(pasos, x, y, x_new, y_new) {
    var distancia = Math.abs(x_new - x) + Math.abs(y_new - y);
    var costo = ((pasos + distancia)*(pasos + distancia + 1) - pasos*(pasos + 1))/2;

    return [costo, distancia];
}

