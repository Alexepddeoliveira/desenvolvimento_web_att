const body = document.body;
const searchContainer = document.getElementById("search-container");
const athleteContainer = document.getElementById("athlete-container");
const searchInput = document.getElementById("search-input");

const createCard = (athlete) => {
    const card = document.createElement('div');
    card.className = 'athlete-card';
    card.innerHTML = `<h3>${athlete.nome}</h3><img src="${athlete.imagem}" alt="Foto de ${athlete.nome}"><p>${athlete.descricao}</p>`;
    athleteContainer.appendChild(card);
};

const buildAthleteCards = (athleteList) => {
    athleteContainer.innerHTML = "";
    athleteList.forEach(createCard);
};

const filterAthletes = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredAthletes = atletas.filter(athlete => athlete.nome.toLowerCase().includes(searchTerm));
    buildAthleteCards(filteredAthletes);
};

document.getElementById("search-button").addEventListener("click", filterAthletes);
searchInput.addEventListener("input", filterAthletes);

buildAthleteCards(atletas);
