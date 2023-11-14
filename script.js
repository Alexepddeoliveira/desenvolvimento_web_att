document.addEventListener("DOMContentLoaded", function () {

    function limparCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var nome = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = nome + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
    const btnSair = document.getElementById("btnSair");

    if (btnSair) {
        btnSair.addEventListener("click", function () {
            // Redirecionar para a página de login e substituir a entrada no histórico
            location.replace("index.html");
            limparCookies();
        });
    }
});

// Função para verificar a senha e redirecionar para a página inicial
function verificarSenhaERedirecionar() {
    const senhaDigitada = document.getElementById('senha').value;
    const senhaHash = CryptoJS.MD5(senhaDigitada).toString();

    if (senhaHash === "e8d95a51f3af4a3b134bf6bb680a213a") {
        window.location.href = "home.html";
    } else {
        alert("Erro: Senha incorreta. Tente novamente.");
    }
}

// Função para verificar a tecla pressionada (Enter) e chamar a verificação da senha
function verificarTecla(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        verificarSenhaERedirecionar();
    }
}

// Adicionar listener ao botão de enviar para verificar a senha
const btnEnviar = document.querySelector('button');
if (btnEnviar) {
    btnEnviar.addEventListener("click", function () {
        verificarSenhaERedirecionar();
    });
}
// EventListener para aguardar o carregamento do DOM antes de executar as funções
document.addEventListener("DOMContentLoaded", function () {
    // Botões para carregar o elenco com base no gênero
    const btnElencoFeminino = document.getElementById("adicionarElencoFeminino");
    const btnElencoMasculino = document.getElementById("adicionarElencoMasculino");
    const btnElencoAmbos = document.getElementById("adicionarElencoAmbos");

    // Adicionar listeners aos botões para carregar o elenco correspondente
    btnElencoFeminino.addEventListener("click", () => carregarElenco("feminino"));
    btnElencoMasculino.addEventListener("click", () => carregarElenco("masculino"));
    btnElencoAmbos.addEventListener("click", () => carregarElenco("all"));

    // Função para carregar o elenco com base no gênero selecionado
    function carregarElenco(genero) {
        const elencoContainer = document.getElementById("elenco");
        elencoContainer.innerHTML = '';

        // Chamar a API para obter o elenco correspondente ao gênero
        fetch(`https://botafogo-atletas.mange.li/${genero}`)
            .then(response => response.json())
            .then(data => {
                // Iterar sobre os jogadores e criar cards para exibir na página
                data.forEach(jogador => {
                    const cardAtleta = document.createElement('div');
                    cardAtleta.className = 'atleta-card';
                    // Adicionar o ID do jogador como um atributo de dados ao card
                    cardAtleta.dataset.jogadorId = jogador.id;

                    const imagemAtleta = document.createElement('img');
                    imagemAtleta.className = 'atleta-img';
                    imagemAtleta.src = jogador.imagem;

                    const detalhesAtleta = document.createElement('div');
                    detalhesAtleta.className = 'atleta-detalhes';
                    detalhesAtleta.innerHTML = `
                        <p>Nome Completo: ${jogador.nome_completo}</p>
                        <p>Posição: ${jogador.posicao}</p>
                        <p>Altura: ${jogador.altura}</p>
                        <p>Data de Nascimento: ${jogador.nascimento}</p>
                    `;

                    cardAtleta.appendChild(imagemAtleta);
                    cardAtleta.appendChild(detalhesAtleta);

                    elencoContainer.appendChild(cardAtleta);
                });
            })
            .catch(error => {
                console.error(`Erro ao buscar elenco ${genero}:`, error);
            });
    }
});

// EventListener para aguardar o carregamento do DOM antes de executar as funções
document.addEventListener("DOMContentLoaded", function () {
    const elencoContainer = document.getElementById("elenco");
    
    // Adicionar listener para detectar cliques nos cards do elenco
    elencoContainer.addEventListener("click", function (event) {
        const cardClicado = event.target.closest(".atleta-card");
        if (cardClicado) {
            // Obter o ID do jogador do card clicado e chamar a função para exibir detalhes
            const jogadorId = cardClicado.dataset.jogadorId;
            mostrarDetalhesJogadorPorId(jogadorId);
        }
    });

    // Função para redirecionar para a página de detalhes com base no ID do jogador
    function mostrarDetalhesJogadorPorId(jogadorId) {
        window.location.href = `detalhes.html?jogador=${jogadorId}`;
    }
});

// EventListener para aguardar o carregamento do DOM antes de executar as funções
document.addEventListener("DOMContentLoaded", function () {
    const btnVoltar = document.getElementById("btnVoltar");

    // Adicionar listener ao botão de voltar para redirecionar para a página inicial
    if (btnVoltar) {
        btnVoltar.addEventListener("click", function () {
            window.location.href = "home.html";
        });
    }
});

// EventListener para aguardar o carregamento do DOM antes de executar as funções
document.addEventListener("DOMContentLoaded", function () {
    const detalhesContainer = document.querySelector('.detalhes-container');

    // Obter o ID do jogador da consulta na URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const jogadorId = urlParams.get('jogador');

    // Se o ID do jogador estiver presente na URL, buscar detalhes
    if (jogadorId) {
        mostrarDetalhesPorId(jogadorId);
    }

    // Função para mostrar os detalhes do jogador e da imagem com base no ID
    function mostrarDetalhesPorId(jogadorId) {
        // Fazer uma solicitação à API para obter detalhes específicos do jogador por ID
        fetch(`https://botafogo-atletas.mange.li/${encodeURIComponent(jogadorId)}`)
            .then(response => {
                // Verificar se a resposta da API foi bem-sucedida (status 200)
                if (!response.ok) {
                    throw new Error(`Erro na resposta da API: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Limpar conteúdo anterior, se houver
                detalhesContainer.innerHTML = '';

                // Verificar se as propriedades esperadas estão presentes nos dados
                if (data && data.nome) {
                    // Criar elementos HTML para exibir detalhes do jogador
                    const detalhesJogador = document.createElement('div');
                    detalhesJogador.className = 'detalhes-jogador';

                    detalhesJogador.innerHTML = `
                        <h2>${data.nome}</h2>
                        <p>Elenco: ${data.elenco || 'N/A'}</p>
                        <p>Posição: ${data.posicao || 'N/A'}</p>
                        <p>${data.descricao || 'N/A'}</p>
                        <p>Nome Completo: ${data.nome_completo || 'N/A'}</p>
                        <p>Nascimento: ${data.nascimento || 'N/A'}</p>
                        <p>Altura: ${data.altura || 'N/A'}</p>
                    `;

                    // Adicionar detalhes do jogador à página de detalhes
                    detalhesContainer.appendChild(detalhesJogador);

                    // Criar elementos HTML para exibir detalhes da imagem
                    const detalhesImagem = document.createElement('div');
                    detalhesImagem.className = 'detalhes-imagem';

                    detalhesImagem.innerHTML = `
                        <img src="${data.imagem || ''}" alt="${data.nome}">
                    `;

                    // Adicionar detalhes da imagem à página de detalhes
                    detalhesContainer.appendChild(detalhesImagem);
                } else {
                    throw new Error('Dados do jogador não encontrados ou incompletos.');
                }
            })
            .catch(error => {
                console.error(`Erro ao buscar detalhes do jogador ${jogadorId}:`, error);
                // Exibir mensagem de erro na página de detalhes
                detalhesContainer.innerHTML = '<p>Erro ao carregar detalhes do jogador.</p>';
            });
    }
});
