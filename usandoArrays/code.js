const body = document.body;
const container = document.createElement('div');
container.id = 'container';
body.appendChild(container);

const cria_cartao = (atleta) => {
    const container_atleta = document.createElement('div');
    const titulo = document.createElement('h3');
    titulo.innerHTML = atleta.nome;
    const imagem = document.createElement('img');
    imagem.src = atleta.imagem;
    const descricao = document.createElement('p');
    descricao.innerHTML = atleta.descricao;

    container_atleta.appendChild(titulo);
    container_atleta.appendChild(imagem);
    container_atleta.appendChild(descricao);

    container_atleta.style.width = '15rem'; // Define o estilo para o contêiner do atleta
    container_atleta.style.color = 'white'; // Define a cor do texto
    container_atleta.style.backgroundColor = 'black'; // Define o plano de fundo

    container.appendChild(container_atleta);
}

const atletas = [ /* Adicione seus atletas aqui */ ];

atletas.forEach((atleta) => {
    cria_cartao(atleta);
});
