 const listaOcurrencias = {};

 function generarAletario(numInicial, numFinal) {
    let semilla = Math.random();
    let numAleatorio = parseInt(semilla * numFinal) + numInicial;
    // console.log(semilla, numAleatorio) //Para comprender el uso del random
    return numAleatorio;
}

export function conteoAleatorios(numInicial, numFinal, cantidad) {
    let numAleatorio = 0;
    for (let conteo = 0; conteo < cantidad; conteo++) {
        numAleatorio = generarAletario(numInicial, numFinal);
        
        if (listaOcurrencias.hasOwnProperty(numAleatorio.toString())) {
            listaOcurrencias[numAleatorio.toString()] += 1;
        } else {
            listaOcurrencias[numAleatorio.toString()] = 1;
        }
    }
    return listaOcurrencias;
}

process.on('message', msg => {
    console.log('mensaje desde el procesos principal:\n');
    console.log(msg);

    const suma = conteoAleatorios(1,5000,cant);
    process.send(`resultado en segundo plano ${suma}`)
});