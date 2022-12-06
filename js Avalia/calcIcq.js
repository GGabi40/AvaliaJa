const formularioIcq = document.querySelector('.form-icq');

formularioIcq.addEventListener('submit', function(e) {
    e.preventDefault();

    // Pega valores do Documento
    const cintura_doc = e.target.querySelector('#cintura_user');
    const quadril_doc = e.target.querySelector('#quadril_user');

    const cintura = cintura_doc.value;
    const quadril = quadril_doc.value;

    // --- Se falta dados
    if (!cintura && !quadril) {
        writeResults('Insira seus dados corretamente.', false);
        return;
    } else if (!cintura) {
        writeResults('Valor de cintura inválido.', false);
        return;
    } else if (!quadril) {
        writeResults('Valor de quadril inválido.', false);
        return;
    }

    // --- Pega funcao que retorna icq ---
    const icq = getIcq(cintura, quadril);
    const gen = verifyGender(); // genero
    const clasif_icq = getClalsifIcq(icq, gen);

    // --- Escreve mensagem
    if(gen == 'Femenino' || gen == 'Masculino') {
        let msg_icq = `Seu ICQ é de ${icq}, ${clasif_icq}.`
        writeResults(msg_icq, true);
    } else {
        let msg_icq = 'Insira seus dados corretamente.';
        writeResults(msg_icq, false)
    }

    // --- Cálculo ICQ ---
    function getIcq(cintura, quadril) {
        const resultado_Icq = cintura / quadril;
        return resultado_Icq.toFixed(2);
    }
    
    // --- Verifica genero ----
    function verifyGender() {
        if (formularioIcq.gender[0].checked == true) {
            return fem = 'Femenino';
        } else if (formularioIcq.gender[1].checked == true) {
            return masc = 'Masculino';
        } else {
            alert('Selecione o seu sexo biológico.');
        }
    }

    // --- Clasifica ICQ ---
    function getClalsifIcq(icq, gen) {
        const c_icq = ['Risco Baixo', 'Risco Moderado', 'Alto Risco'];

        // Se está selecionado sexo Femenino
        if (gen === 'Femenino') {
            if (icq <= 0.80) { return c_icq[0] }; // Baixo Risco
            if (icq >= 0.81 && icq <= 0.85) { return c_icq[1] }; // Risco Moderado
            if (icq >= 0.86) { return c_icq[2] }; // Alto Risco
        } else if (gen === 'Masculino') {
            if (icq <= 0.95) { return c_icq[0] }; // Baixo Risco
            if (icq >= 0.96 && icq < 1.00) { return c_icq[1] }; // Risco Moderado
            if (icq >= 1.00) { return c_icq[2] }; // Alto Risco
        }
    }

    // --- Escreve o Resultado ----
    function writeResults(msg_icq, isValid) {
        const text_results = document.querySelector('#results-icq');
        text_results.innerHTML = '';

        const p = document.createElement('p');

        p.innerHTML = msg_icq; // Recebe a mensagem;
        text_results.appendChild(p); // Escreve;

        if(isValid) {
            p.classList.add('pResultado');
        } else {
            p.classList.add('pEquivocado');
        }
    }
});