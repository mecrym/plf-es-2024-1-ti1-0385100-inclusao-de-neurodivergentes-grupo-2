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

        // Extrair os horários de término das tarefas concluídas no mesmo dia
        const finishTimes = completedTasks.map(task => task.endTime.slice(0, 5)); // Extrair horas e minutos
        console.log('Horários de término das tarefas:', finishTimes);

        let remainingTasks = completedTasks.length;

        // Criar um array para armazenar a contagem de tarefas restantes ao longo do tempo
        const taskCountsOverTime = [];
        finishTimes.forEach(finishTime => {
            taskCountsOverTime.push(remainingTasks);
            remainingTasks--;
        });
        taskCountsOverTime.push(0); // Adicionar 0 para garantir que o gráfico alcance o zero

        // Criando o gráfico com os dados atualizados
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line', // Tipo do gráfico
            data: {
                labels: [...finishTimes, ''],
                datasets: [{
                    label: 'Tarefas restantes',
                    data: taskCountsOverTime,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18)',
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
                            text: 'Horário de término',
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

            const startTotalSeconds = startHour * 3600 + startMinute * 60 + startSecond;
            const endTotalSeconds = endHour * 3600 + endMinute * 60 + endSecond;

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
                const category = categoriesData.find(category => category.id === task.categoryId);
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
