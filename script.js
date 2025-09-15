// script.js

// 1. Inicializa as listas e variáveis de estado
let todosOsAmigos = [];
let amigosParaSortear = [];
let ultimoAmigoSorteado = null;

// 2. Seleciona os elementos do HTML
const nomeAmigoInput = document.getElementById('nome-amigo');
const botaoAdicionar = document.getElementById('botao-adicionar');
const listaAmigosDisplay = document.getElementById('lista-amigos');
const botaoSortear = document.getElementById('botao-sortear');
const botaoReiniciar = document.getElementById('botao-reiniciar');
const resultadoSorteioDisplay = document.getElementById('resultado-sorteio');
const botaoRevelar = document.getElementById('botao-revelar');
const mensagemFinalDisplay = document.getElementById('mensagem-final'); // NOVO: Elemento da mensagem

// ... (funções adicionarAmigo e atualizarLista continuam iguais) ...
function adicionarAmigo() {
    const nome = nomeAmigoInput.value.trim();
    if (nome === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }
    todosOsAmigos.push(nome);
    atualizarLista();
    nomeAmigoInput.value = '';
    nomeAmigoInput.focus();
    reiniciarSorteio();
}
function atualizarLista() {
    listaAmigosDisplay.innerHTML = '';
    for (const amigo of todosOsAmigos) {
        const elementoAmigo = document.createElement('p');
        elementoAmigo.textContent = amigo;
        listaAmigosDisplay.appendChild(elementoAmigo);
    }
}

// 5. Função para realizar o sorteio (LÓGICA MODIFICADA)
function sortearAmigo() {
    if (todosOsAmigos.length < 2) {
        alert('Adicione pelo menos dois amigos para realizar o sorteio.');
        return;
    }

    if (amigosParaSortear.length === 0) {
        // A mensagem na tela já informa o fim, o alert não é mais necessário.
        // Apenas garantimos que o botão esteja desabilitado.
        botaoSortear.disabled = true;
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * amigosParaSortear.length);
    
    ultimoAmigoSorteado = amigosParaSortear[indiceSorteado];

    resultadoSorteioDisplay.textContent = 'Sorteado! Clique para revelar';
    resultadoSorteioDisplay.classList.add('escondido');
    botaoRevelar.textContent = 'Revelar';
    botaoRevelar.style.display = 'inline-block';

    amigosParaSortear.splice(indiceSorteado, 1);

    // MODIFICADO: Verifica se o sorteio acabou AGORA
    if (amigosParaSortear.length === 0) {
        botaoSortear.disabled = true;
        
        // NOVO: Exibe a mensagem de finalização
        mensagemFinalDisplay.textContent = 'Fim do Sorteio! Todos os amigos foram sorteados.';
        mensagemFinalDisplay.style.display = 'block'; // Torna a mensagem visível
    }
}

// 6. Função para reiniciar o sorteio (LÓGICA MODIFICADA)
function reiniciarSorteio() {
    amigosParaSortear = [...todosOsAmigos];
    
    resultadoSorteioDisplay.textContent = '?';
    resultadoSorteioDisplay.classList.remove('escondido');
    
    botaoSortear.disabled = false;
    botaoRevelar.style.display = 'none';
    ultimoAmigoSorteado = null;
    
    // NOVO: Esconde a mensagem de finalização ao reiniciar
    mensagemFinalDisplay.style.display = 'none';
    
    console.log("Sorteio reiniciado.");
}

// ... (função revelarOuEsconder e os Event Listeners continuam iguais) ...
function revelarOuEsconder() {
    if (resultadoSorteioDisplay.classList.contains('escondido')) {
        resultadoSorteioDisplay.textContent = ultimoAmigoSorteado;
        resultadoSorteioDisplay.classList.remove('escondido');
        botaoRevelar.textContent = 'Esconder';
    } else {
        resultadoSorteioDisplay.textContent = 'Sorteado! Clique para revelar';
        resultadoSorteioDisplay.classList.add('escondido');
        botaoRevelar.textContent = 'Revelar';
    }
}

botaoAdicionar.addEventListener('click', adicionarAmigo);
botaoSortear.addEventListener('click', sortearAmigo);
botaoReiniciar.addEventListener('click', reiniciarSorteio);
botaoRevelar.addEventListener('click', revelarOuEsconder);

nomeAmigoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});

reiniciarSorteio();