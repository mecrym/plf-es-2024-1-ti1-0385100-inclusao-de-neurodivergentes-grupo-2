// calendario.js
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const monthElement = document.getElementById('month');

    let startDate = new Date(); // Data inicial: hoje
    renderWeek(startDate); // Renderiza os dias iniciais

    arrowLeft.addEventListener('click', function () {
        startDate.setDate(startDate.getDate() - 7); // Retrocede 7 dias
        renderWeek(startDate); // Renderiza a semana anterior
    });

    arrowRight.addEventListener('click', function () {
        startDate.setDate(startDate.getDate() + 7); // Avança 7 dias
        renderWeek(startDate); // Renderiza a próxima semana
    });

    function renderWeek(start) {
        carousel.innerHTML = ''; // Limpa o conteúdo atual

        // Encontrar o último domingo antes da data fornecida
        const lastSunday = new Date(start);
        lastSunday.setDate(start.getDate() - start.getDay());

        // Gerar dias da semana a partir de segunda-feira (Mon)
        for (let i = 1; i <= 7; i++) {
            const day = new Date(lastSunday);
            day.setDate(lastSunday.getDate() + i);
            const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNumber = day.getDate();

            const dayElement = createDayElement(dayName, dayNumber, day);
            carousel.appendChild(dayElement);
        }

        // Exibe o mês no formato "MMM YYYY" abaixo do carrossel
        const month = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthElement.textContent = month;
    }

    function createDayElement(dayName, dayNumber, fullDate) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

        const dayNameDiv = document.createElement('div');
        dayNameDiv.classList.add('day-name');
        dayNameDiv.textContent = dayName;

        const dayNumberDiv = document.createElement('div');
        dayNumberDiv.textContent = dayNumber;

        dayElement.appendChild(dayNameDiv);
        dayElement.appendChild(dayNumberDiv);

        dayElement.addEventListener('click', function() {
            fetchTasksForDate(fullDate);
        });

        return dayElement;
    }

    function fetchTasksForDate(date) {
        fetch('../../db/db.json')
            .then(response => response.json())
            .then(data => {
                const tasks = data.tasks;
                const selectedDateString = date.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
                const tasksForSelectedDate = tasks.filter(task => task.endDate === selectedDateString);
                const uniqueTaskCount = new Set(tasksForSelectedDate.map(task => task.id)).size;
                document.getElementById('texto-f').textContent = `Tasks: ${uniqueTaskCount}`;
            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
                document.getElementById('texto-f').textContent = 'tasks: 0';
            });
    }
});
