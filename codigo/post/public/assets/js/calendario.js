// Função para carregar eventos do Calendarific API
async function loadCalendarEvents() {
    const apiKey = '15TbUaPXPbeJxOR2APCwbOU5OisHXll0'; // Substitua por sua chave de API
    const country = 'BR';
    const year = new Date().getFullYear();
    const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.response.holidays; // Retorna a lista de eventos
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        return [];
    }
}

// Função para renderizar os dias no carrossel usando dados da API
async function renderCarousel(selectedDate, startIndex) {
    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ''; // Limpa o conteúdo existente

    const events = await loadCalendarEvents(); // Carrega os dados da API Calendarific

    // Array com os nomes dos dias da semana em inglês (abreviados)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Loop através dos eventos para criar os elementos do carrossel
    events.forEach(event => {
        const eventDate = new Date(event.date.iso);
        const dayOfWeek = weekdays[eventDate.getDay()];
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `<div>${dayOfWeek}</div><div>${eventDate.getDate()}</div>`;
        dayElement.dataset.day = eventDate.getDate(); // Armazena o dia como um atributo de dados
        carousel.appendChild(dayElement);
    });

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

    // Destaque os dias com alta importância após o carrossel ser renderizado
    highlightDaysWithHighImportance(events);
}

// Função para destacar os dias com alta importância com um círculo vermelho
function highlightDaysWithHighImportance(events) {
    const daysWithHighImportance = events.filter(event => event.type.includes('National holiday'));
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        const dayElement = day.querySelector('div:nth-child(2)');
        const dayNumber = dayElement.textContent; // Obtém o número do dia dentro do div.day
        const hasHighImportance = daysWithHighImportance.some(event => new Date(event.date.iso).getDate() === parseInt(dayNumber));
        if (hasHighImportance) {
            const circle = document.createElement('div'); // Crie um novo elemento para o círculo
            circle.classList.add('circle');
            day.appendChild(circle); // Adicione o círculo como filho do elemento do dia
        }
    });
}

// Função para renderizar as informações da tarefa para o dia selecionado
async function renderTaskInfo(day) {
    const taskInfo = document.getElementById('taskInfo');
    taskInfo.innerHTML = ''; // Limpa o conteúdo existente

    const data = await loadData('.../db/db.json'); // Carrega os dados das tarefas do arquivo JSON local

    const filteredTasks = data.tasks.filter(task => task.completion && new Date(task.endDate).getDate() === parseInt(day));

    // Calcula a contagem total de tarefas para o período "fulltime"
    const fullTimeTaskCount = filteredTasks.length;

    // Renderiza as informações de tarefas
    renderTaskPeriodInfo('Tasks', fullTimeTaskCount, 'fulltime');
}

function renderTaskPeriodInfo(period, taskCount, periodClass) {
    const imageCarousel = document.getElementById('carousel-tarefas'); // Corrigido para 'carousel-tarefas'
    let periodElement = document.querySelector(`.${periodClass}`);
    if (!periodElement) {
        periodElement = document.createElement('div');
        periodElement.classList.add('task-period', periodClass);
        imageCarousel.appendChild(periodElement); // Corrigido para adicionar 'periodElement' ao 'imageCarousel'
    }
    periodElement.textContent = `${period} ${taskCount}`;
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
