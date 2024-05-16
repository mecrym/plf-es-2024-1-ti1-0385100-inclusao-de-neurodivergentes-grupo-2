// Função para carregar os dados do arquivo JSON local
async function loadData(url) {
    try {
        const response = await fetch(url); // Carrega o arquivo localmente
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        return [];
    }
}

// Função para renderizar os dias no carrossel
async function renderCarousel(selectedDate, startIndex) {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ''; // Limpa o conteúdo existente

    const data = await loadData('calendar_data.json'); // Carrega os dados do arquivo JSON local

    // Array com os nomes dos dias da semana em inglês (abreviados)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Calcula o índice do dia selecionado
    const selectedIndex = data.findIndex(item => item.day === selectedDate);

    // Calcula o intervalo de datas para exibir no carrossel
    const endIndex = Math.min(data.length - 1, startIndex + 6); // Fim do intervalo (no máximo o último índice)

    // Loop através dos dados para criar os elementos do carrossel
    for (let i = startIndex; i <= endIndex; i++) {
        const item = data[i];
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        const dayOfWeek = weekdays[new Date(item.year, item.month - 1, item.day).getDay()]; // Obtém o nome do dia da semana
        dayElement.innerHTML = `<div>${dayOfWeek}</div><div>${item.day}</div>`;
        dayElement.dataset.day = item.day; // Armazena o dia como um atributo de dados
        carousel.appendChild(dayElement);
    }

    // Adiciona um evento de clique para destacar o dia selecionado e mostrar as tarefas
    carousel.addEventListener('click', event => {
        const selectedDay = event.target.closest('.day');
        if (selectedDay) {
            const days = carousel.querySelectorAll('.day');
            days.forEach(day => day.classList.remove('selected'));
            selectedDay.classList.add('selected');
            const day = selectedDay.dataset.day;
            renderTaskInfo(day);
        }
    });
}

// Função para renderizar as informações da tarefa para o dia selecionado
async function renderTaskInfo(day) {
    const taskInfo = document.getElementById('taskInfo');
    taskInfo.innerHTML = ''; // Limpa o conteúdo existente

    const data = await loadData('tasks_data.json'); // Carrega os dados das tarefas do arquivo JSON local

    const tasks = data[day] || []; // Obtém as tarefas para o dia selecionado

    // Divide as tarefas em períodos do dia: manhã, dia todo e tarde
    const morningTasks = tasks.filter(task => task.period === 'morning');
    const fullDayTasks = tasks.filter(task => task.period === 'fulltime');
    const afternoonTasks = tasks.filter(task => task.period === 'nigth');

    // Renderiza as informações de tarefas em cada período do dia
    renderTaskPeriodInfo('Manhã', morningTasks.length, 'morning');
    renderTaskPeriodInfo('Dia Todo', fullDayTasks.length, 'fulltime');
    renderTaskPeriodInfo('Tarde', afternoonTasks.length, 'nigth');
}

// Chamada inicial para renderizar o carrossel com a data atual e índice inicial
const currentDate = new Date().getDate();
let startIndex = 0;
renderCarousel(currentDate, startIndex);

// Adiciona eventos de clique para as setas de rolagem do carrossel
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

arrowLeft.addEventListener('click', () => {
    if (startIndex > 0) {
        startIndex -= 7;
        renderCarousel(currentDate, startIndex);
    }
});

arrowRight.addEventListener('click', () => {
    startIndex += 7;
    renderCarousel(currentDate, startIndex);
});

// Função para renderizar as informações de tarefas em um período do dia específico
function renderTaskPeriodInfo(period, taskCount, periodClass) {
    const imageCarousel = document.getElementById('imageCarousel');
    let periodElement = document.querySelector(`.${periodClass}`);
    if (!periodElement) {
        periodElement = document.createElement('div');
        periodElement.classList.add('task-period', periodClass);
        imageCarousel.appendChild();
    }
    periodElement.textContent = `${period}: ${taskCount} tarefas`;
}
