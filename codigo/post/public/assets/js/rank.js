const BASE_URL = 'http://localhost:3000';

async function fetchData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  return response.json();
}

async function calculateUserScores() {
  const users = await fetchData('users');
  const tasks = await fetchData('tasks');
  const rankings = await fetchData('ranking');

  const userScores = {};

  // Inicializar pontuação dos usuários para não ter problema depois
  users.forEach(user => {
    userScores[user.id] = {
      id: user.id,
      name: user.name,
      profilePhotoUrl: user.profilePhotoUrl,
      score: 0
    };
  });

  // Criar um mapa de pontos por categoryId
  const categoryPoints = {};
  rankings.forEach(rank => {
    categoryPoints[rank.categoryId] = rank.points;
  });

  // Calcula pontuação com base nas tarefas concluídas
  tasks.forEach(task => {
    if (task.completion && userScores[task.userId]) {
      const points = categoryPoints[task.categoryId] || 0;
      userScores[task.userId].score += points;
    }
  });

  // Filtrar usuários que possuem pontuação maior que 0 e ordenar por pontuação
  return Object.values(userScores).filter(user => user.score > 0).sort((a, b) => b.score - a.score);
}

function createStarElement(rankClass) {
  const starElement = document.createElement('i');
  starElement.classList.add('fas', 'fa-star');
  
  if (rankClass === 'gold') {
    starElement.style.color = 'gold';
  } else if (rankClass === 'silver') {
    starElement.style.color = 'silver';
  } else if (rankClass === 'bronze') {
    starElement.style.color = '#ac6116';
  }
  
  return starElement;
}

async function renderCarousel() {
  const carouselInner = document.getElementById('carousel-inner');
  const userScores = await calculateUserScores();

  userScores.forEach((user, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    let rankClass = '';
    if (index === 0) {
      rankClass = 'gold gold-border';
    } else if (index === 1) {
      rankClass = 'silver silver-border';
    } else if (index === 2) {
      rankClass = 'bronze bronze-border';
    }

    carouselItem.innerHTML = `
      <div class="${rankClass}">
        <img src="${user.profilePhotoUrl}" alt="${user.name}">
        <div class="carousel-caption">
          <h5>${user.name}</h5>
          <p class="carousel-score">${user.score} pts</p>
        </div>
      </div>
    `;

    // Adiciona estrelas para os três primeiros lugares
    const carouselCaption = carouselItem.querySelector('.carousel-caption');
    if (index < 3) {
      const starElement = createStarElement(rankClass.split(' ')[0]);
      carouselCaption.appendChild(starElement);
    }

    carouselInner.appendChild(carouselItem);
  });
}

renderCarousel();
