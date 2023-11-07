const siteURL = "https://exemplo-time-futebol.com";

const numJogador = 10;

const bodyElement = document.body;
bodyElement.style.display = 'flex';
bodyElement.style.gap = '.5em';
bodyElement.style.flexWrap = 'wrap';

const criaCartao = (atleta) => {
    const atletaContainer = document.createElement('article');
    atletaContainer.style.width = '20rem';
    atletaContainer.style.backgroundColor = '#ccc';
    atletaContainer.style.textAlign = 'center';
    atletaContainer.style.margin = 'auto';

    atletaContainer.dataset.id = atleta.id;
    atletaContainer.dataset.altura = atleta.altura;
    atletaContainer.dataset.nomeCompleto = atleta.nomeCompleto;
    atletaContainer.dataset.nascimento = atleta.nascimento;

    const titulo = document.createElement('h3');
    titulo.innerHTML = atleta.nome;
    const imagem = document.createElement('img');
    imagem.src = atleta.imagem;
    imagem.alt = `Foto de ${atleta.nome}`;
    const descricao = document.createElement('p');
    descricao.innerHTML = atleta.descricao;

    atletaContainer.appendChild(titulo);
    atletaContainer.appendChild(imagem);
    atletaContainer.appendChild(descricao);

    atletaContainer.onclick = manipulaClique;

    document.body.appendChild(atletaContainer);
}

const manipulaClique = (e) => {
    const artigoElemento = e.target.closest('article');
    document.cookie = `id = ${artigoElemento.dataset.id}`;
    document.cookie = `altura = ${artigoElemento.dataset.altura}`;
    document.cookie = `nomeCompleto = ${artigoElemento.dataset.nomeCompleto}`;
    document.cookie = `nascimento = ${artigoElemento.dataset.nascimento}`;

    console.log(encontraCookie('id'));
}

const encontraCookie = (chave) => {
    const listaCookies = document.cookie.split("; ")
    const encontrado = listaCookies.find(
        (entrada) => entrada.startsWith(chave));
    return encontrado.split('=')[1];
}

const buscaDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

buscaDados(siteURL).then( (resultado) => console.log(resultado));

buscaDados(`${siteURL}/all`).then( (resultado) => {
    for (atleta of resultado){
        criaCartao(atleta);
    }
});

console.log('Operação síncrona');
