
import { StorageService } from "../../services/localStorage-service.js";
import { FriendsService } from "../../services/friends-services.js";
import { UserService } from "../../services/user-service.js";
import { TaskService } from "../../services/tasks-service.js";
import {RankingService} from "../../services/ranking-service.js"
/*
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${endpoint}`);
    const data = await response.json();
    console.log(`Dados recebidos de ${endpoint}:`, data); // Log dos dados recebidos
    return data;
  } catch (error) {
    console.error(`Erro ao buscar dados do endpoint ${endpoint}:`, error);
  }
}*/

async function fetchFriends(userId) {
  const friendsData = await getFriends();
  if (!friendsData) {
    console.error('Erro ao buscar dados dos amigos.');
    return [];
  }
  const friendEntry = friendsData.find(friend => friend.userId == userId);
  console.log(`Amigos encontrados para o usuário ${userId}:`, friendEntry ? friendEntry.friends : []); // Log dos amigos encontrados
  return friendEntry ? friendEntry.friends.map(id => parseInt(id, 10)) : [];
}

async function calculateUserScores(userId) {
  const user = new UserService();
  const friend = new FriendsService();
  const rank = new RankingService();
  const task = new TaskService();


  async function getFriends() {
    return await friend.getFriends();
  }
  async function getUsers() {
    return await user.getUsers();
  }
  async function getTasks() {
    return await task.getTasks();
  }
  async function getRankings() {
    return await rank.getRankings();
  }

  const users = await getUsers();
  const tasks = await getTasks();
  const rankings = await getRankings();
  const friends = await getFriends();

  if (!users || !tasks || !rankings) {
    console.error('Erro ao buscar dados necessários para calcular as pontuações.');
    return [];
  }

  const userScores = {};

  // Inicializar pontuação dos amigos e do usuário logado
  users.forEach(user => {
    if (user.id === userId || friends.includes(parseInt(user.id, 10))) {
      userScores[user.id] = {
        id: user.id,
        name: user.name,
        profilePhotoUrl: user.profilePhotoUrl,
        score: 0
      };
    }
  });

  // Adiciona o usuário logado ao userScores se não estiver na lista de amigos
  if (!userScores[userId]) {
    const loggedUser = users.find(user => user.id == userId);
    if (loggedUser) {
      userScores[userId] = {
        id: loggedUser.id,
        name: loggedUser.name,
        profilePhotoUrl: loggedUser.profilePhotoUrl,
        score: 0
      };
    }
  }

  console.log('Usuários iniciais com pontuação:', userScores); // Log dos usuários iniciais com pontuação

  // Criar um mapa de pontos por categoryId
  const categoryPoints = {};
  rankings.forEach(rank => {
    categoryPoints[rank.categoryId] = rank.points;
  });

  console.log('Mapa de pontos por categoria:', categoryPoints); // Log do mapa de pontos por categoria

  // Calcula pontuação com base nas tarefas concluídas
  tasks.forEach(task => {
    if (task.completion && userScores[task.userId]) {
      const points = categoryPoints[task.categoryId] || 0;
      userScores[task.userId].score += points;
    }
  });

  console.log('Pontuações dos usuários após cálculo:', userScores); // Log das pontuações após o cálculo

  // Verificar pontuação do usuário logado
  console.log(`Pontuação do usuário logado (ID: ${userId}):`, userScores[userId]);

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

async function renderCarousel(userScores) {
  const carouselInner = document.getElementById('carousel-inner');

  if (!userScores.length) {
    console.error('Nenhuma pontuação de usuário encontrada.');
    return;
  }

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

async function renderUserScore(userId) {
  const userScores = await calculateUserScores(userId);
  console.log('Pontuações dos usuários:', userScores);

  if (!userScores.length) {
    console.error('Nenhuma pontuação de usuário encontrada.');
    return;
  }

  renderCarousel(userScores);
}

const keyUser = "UI";
const userId = StorageService.loadData(keyUser);

if (!userId) {
  console.error('ID do usuário não encontrado no armazenamento.');
} else {
  renderUserScore(userId);
}
