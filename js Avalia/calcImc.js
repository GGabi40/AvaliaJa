const formulario = document.querySelector('.form-imc');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const peso_doc = e.target.querySelector('#peso_user');
    const altura_doc = e.target.querySelector('#altura_user');

    // Recebe valores:
    const peso = peso_doc.value;
    const altura = altura_doc.value;

    // Se falta algum valor:
    if (!altura && !peso) {
        writeResults('Insira seus dados corretamente.', false);
        return;
    } else if (!peso) {
        writeResults('Peso inválido.', false);
        return;
    } else if (!altura) {
        writeResults('Altura inválida.', false);
        return;
    }

    // Escreve mensagem:
    const imc = getIMC(peso, altura); // pega a funcao e retorna o resultado na variavel 'imc'
    const clasif = getClasif(imc);

    const msg = `Seu IMC é de ${imc} (${clasif}).`;
    writeResults(msg, true)

    /* console.log(imc, clasif, msg) */

    // Calcula o IMC
    function getIMC(peso, altura) {
        const resultado = peso / altura ** 2;

        return resultado.toFixed(2); // Gera o resultado com 2 decimais
    }

    // Recebe variavel 'imc' e a Classifica
    function getClasif(imc) { 
        const clasificacion = ['Baixo Peso', 'Eutrófico', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

        // Retorna a clasificacion
        if (imc <= 18.5) { return clasificacion[0] };
        if (imc > 40) { return clasificacion[5] };
        if (imc > 39.9) { return clasificacion[4] };
        if (imc > 29.9) { return clasificacion[3] };
        if (imc > 24.9) { return clasificacion[2] };
        if (imc > 18.5) { return clasificacion[1] };
    }

    function writeResults(msg, isValid) {
        const text_results = document.querySelector('#results');
        text_results.innerHTML = '';

        const p = document.createElement('p');

        p.innerHTML = msg; // Recebe a mensagem;
        text_results.appendChild(p); // Escreve;

        if(isValid) {
            p.classList.add('pResultado');
        } else {
            p.classList.add('pEquivocado');
        }
    }
});
