document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar os dados das tarefas do JSON Server
    async function fetchTasksData(userId) {
        try {
            const response = await fetch('http://localhost:3000/tasks');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados das tarefas');
            }
            const tasksData = await response.json();
            // Filtrar as tarefas pelo userId
            return tasksData.filter(task => task.userId === userId);
        } catch (error) {
            console.error('Erro ao buscar os dados das tarefas:', error);
            return [];
        }
    }

    // Função para buscar os dados das categorias do JSON Server
    async function fetchCategoriesData() {
        try {
            const response = await fetch('http://localhost:3000/categorys');
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados das categorias');
            }
            const categoriesData = await response.json();
            return categoriesData;
        } catch (error) {
            console.error('Erro ao buscar os dados das categorias:', error);
            return [];
        }
    }

    // Função para inicializar o gráfico e as durações das tarefas
    async function init(userId) {
        const [tasksData, categoriesData] = await Promise.all([fetchTasksData(userId), fetchCategoriesData()]);
        console.log('Dados das tarefas:', tasksData);
        console.log('Dados das categorias:', categoriesData);

        if (tasksData.length === 0) {
            console.log('Nenhuma tarefa encontrada.');
            return;
        }

        // Filtrar as tarefas concluídas no mesmo dia
        const completedTasks = tasksData.filter(task => task.completion && task.startDate === task.endDate);
        console.log('Tarefas concluídas no mesmo dia:', completedTasks);

        if (completedTasks.length === 0) {
            console.log('Nenhuma tarefa concluída no mesmo dia encontrada.');
            return;
        }

        // Ordenar as tarefas por horário de término
        completedTasks.sort((a, b) => a.endTime.localeCompare(b.endTime));

        // Extrair os horários de início e término das tarefas concluídas no mesmo dia
        const startTimes = completedTasks.map(task => task.startTime.slice(0, 5)); // Extrair horas e minutos
        const finishTimes = completedTasks.map(task => task.endTime.slice(0, 5)); // Extrair horas e minutos
        const times = [...new Set([...startTimes, ...finishTimes])].sort(); // Combinar e ordenar horários

        console.log('Horários das tarefas:', times);

        let remainingTasks = completedTasks.length;

        // Criar um array para armazenar a contagem de tarefas restantes ao longo do tempo
        const taskCountsOverTime = [];
        times.forEach(time => {
            completedTasks.forEach(task => {
                if (task.endTime.slice(0, 5) === time) {
                    remainingTasks--;
                }
            });
            taskCountsOverTime.push(remainingTasks);
        });

        // Criando o gráfico com os dados atualizados
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line', // Tipo do gráfico
            data: {
                labels: times,
                datasets: [{
                    label: 'Tarefas restantes',
                    data: taskCountsOverTime,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.2)',
                    borderWidth: 3,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#ffc0cb',
                            stepSize: 1 // Definir o tamanho do passo para 1 para garantir valores inteiros no eixo y
                        },
                        title: {
                            display: true,
                            text: 'Tarefas restantes',
                            color: '#ffc0cb'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffc0cb',
                        },
                        title: {
                            display: true,
                            text: 'Horário das tarefas',
                            color: '#ffc0cb'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffc0cb'
                        }
                    }
                }
            }
        });

        function calculateDuration(startTime, endTime) {
            const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
            const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

            const startTotalSeconds = startHour * 3600 + startMinute * 60 + (startSecond || 0);
            const endTotalSeconds = endHour * 3600 + endMinute * 60 + (endSecond || 0);

            const durationSeconds = endTotalSeconds - startTotalSeconds;

            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds % 3600) / 60);
            const seconds = durationSeconds % 60;

            return `${hours}h ${minutes}min ${seconds}s`;
        }

        function displayTaskDurations() {
            const tasksContainer = document.getElementById('tasks');
            tasksContainer.innerHTML = ''; // Limpar qualquer conteúdo existente

            completedTasks.forEach(task => {
                const category = categoriesData.find(category => category.id == task.categoryId);
                const categoryName = category ? category.name : 'Categoria desconhecida';
                const duration = calculateDuration(task.startTime, task.endTime);

                // Criar um elemento de div para a tarefa
                const taskElement = document.createElement('div');
                taskElement.innerHTML = `<strong>${categoryName}</strong> <span> ${duration}</span>`;

                // Adicionar o elemento da tarefa dentro da div "tasks"
                tasksContainer.appendChild(taskElement);
            });

            // Esconder o botão após clicar
            document.getElementById('durationCalc').style.display = 'none';
        }

        // Faz o botão funcionar
        document.getElementById('durationCalc').addEventListener('click', displayTaskDurations);
    }

    // Chamar a função init para inicializar o gráfico e as durações das tarefas
    // Passe o userId desejado para a função init
    const userId = 5633; // Substitua pelo userId desejado
    init(userId);
});
