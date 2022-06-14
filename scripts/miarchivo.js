//El script es un simulador de creditos hipotecarios

//Tasa nominal anual para prestamos hipotecario por el Banco Nacion Argentina

//Permite relizar varias simulaciones hasta que el usuario indique que no

let intento = "si";

while (intento == 'si') {

    let TasaNominalAnual = 0.1950;
    let TasaNominalMensual = TasaNominalAnual/12;

    let ingreso = 0;
    let periodos = 0;

    //ingreso de datos para la simulacion

    do{ingreso = Number(prompt('Ingrese su nivel de ingreso (el tope de la cuota del préstamos puede representar el 30% de su ingreso actual):'));} while (isNaN(ingreso)) {};

    do{periodos = Number(prompt('Ingrese la cantidad de periodos en meses que desea para el prestamo (debe ser entre 60, 5 años, y 240, 20 años:'));} while (isNaN(periodos)||(periodos<60)||(periodos>240)) {};

    //Funcion para calcular el monto maximo a otorgar
    const prestamo = (TasaNominalMensual,ingreso,periodos) => 0.3*ingreso*[1-(1+TasaNominalMensual)**(-periodos)]/TasaNominalMensual;

    //calculo de la simulacion con los datos del usuario

    monto = Math.ceil(prestamo(TasaNominalMensual,ingreso,periodos));
    cuota = Math.ceil(ingreso*0.3);

    alert("El préstamo máximo que se le puede otorgar es por el monto de $"+monto+ 
        " para una cuota mensual de $"+cuota+", y el plazo total del crédito son "
        + periodos/12 +" años.");

        intento = prompt("Desea realizar otra simulación? (ingrese 'si' o 'no'):").toLocaleLowerCase();
}