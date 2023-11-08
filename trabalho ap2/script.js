function verificarSenhaERedirecionar() {
    var senhaDigitada = document.getElementById('senha').value;
    var senhaHash = CryptoJS.MD5(senhaDigitada).toString();

    if (senhaHash === "e8d95a51f3af4a3b134bf6bb680a213a") { // Hash para "senha"
        window.location.href = "home.html";
    } else {
        alert("Erro: Senha incorreta. Tente novamente.");
    }
}

function verificarTecla(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita a submissão do formulário por padrão
        verificarSenhaERedirecionar();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const btnElencoFeminino = document.getElementById("adicionarElencoFeminino");
    const btnElencoMasculino = document.getElementById("adicionarElencoMasculino");
    const btnElencoAmbos = document.getElementById("adicionarElencoAmbos");

    // Adicione manipuladores de evento aos botões
    btnElencoFeminino.addEventListener("click", () => carregarElenco("feminino"));
    btnElencoMasculino.addEventListener("click", () => carregarElenco("masculino"));
    btnElencoAmbos.addEventListener("click", () => carregarElenco("all"));

    // Função para carregar o elenco com base no gênero
    function carregarElenco(genero) {
        const elencoContainer = document.getElementById("elenco");
        elencoContainer.innerHTML = ''; // Limpar conteúdo

        // Fazer uma solicitação para a API externa com base no gênero
        fetch(`https://botafogo-atletas.mange.li/${genero}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(jogador => {
                    const cardAtleta = document.createElement('div');
                    cardAtleta.className = 'atleta-card';

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
