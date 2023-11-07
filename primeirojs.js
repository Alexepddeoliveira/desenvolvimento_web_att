const autor = "J.K. Rowling";
let titulo = "Harry Potter e a Pedra Filosofal";
const generos = ['Fantasia', 'Aventura', 'Magia'];
let resenha;

console.log("Autor do livro: " + autor);

titulo += " (Livro 1)";
console.log("Título do livro após a adição do número: " + titulo);

console.log("Gêneros do livro: " + generos);
console.log("Número de gêneros: " + generos.length);
console.log("Primeiro gênero: " + generos[0]);

console.log("Adicionando 'Mistério' aos gêneros. Novo número de gêneros: " + generos.push('Mistério'));
console.log("Gêneros atualizados: " + generos);

console.log("Substituindo o gênero na posição 3 com 'Ação'. Gêneros atualizados: " + (generos[3] = 'Ação'));

console.log("Resenha do livro: " + resenha);

function escreverResenha(texto) {
  resenha = texto;
  console.log("Resenha atualizada: " + resenha);
}

escreverResenha("Um livro incrível que nos transporta para um mundo de magia e aventuras.");

const outraResenha = (texto) => {
  resenha = texto;
  console.log("Outra resenha atualizada: " + resenha);
}

outraResenha("Uma obra-prima da literatura que cativa leitores de todas as idades.");

const terceiraResenha = (texto) => {
  resenha = texto;
  console.log("Terceira resenha atualizada: " + resenha);
}

terceiraResenha("Um clássico que nunca envelhece, com personagens memoráveis e uma história envolvente.");
