import { StorageService } from "../../services/localStorage-service.js";

document.addEventListener('DOMContentLoaded', async () => {
    // Função para buscar os dados das tarefas do JSON Server
    async function fetchTasksData(userId) {
        try {
            const response = await fetch(`http://localhost:3000/tasks?userId=${userId}&completion=true`);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados das tarefas');
            }
            const tasksData = await response.json();
            return tasksData;
        } catch (error) {
            console.error('Erro ao buscar os dados das tarefas:', error);
            return [];
        }
    }

    // Função para buscar os dados das categorias do JSON Server
    async function fetchCategoriesData() {
        try {
            const response = await fetch('http://localhost:3000/categories');
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
        const tasksData = await fetchTasksData(userId);
        const categoriesData = await fetchCategoriesData();

        console.log('Dados das tarefas:', tasksData);
        console.log('Dados das categorias:', categoriesData);

        if (tasksData.length === 0) {
            console.log('Nenhuma tarefa encontrada.');
            return;
        }

        // Encontrar a data com mais tarefas completas
        const dates = tasksData.map(task => task.startDate).filter((value, index, self) => self.indexOf(value) === index); // Obter datas únicas
        let maxCompletedTasks = 0;
        let busiestDate = '';

        dates.forEach(date => {
            const completedTasks = tasksData.filter(task => task.startDate === date && task.endDate === date && task.startTime && task.endTime);
            if (completedTasks.length > maxCompletedTasks) {
                maxCompletedTasks = completedTasks.length;
                busiestDate = date;
            }
        });

        console.log('Data com mais tarefas completas:', busiestDate);

        // Filtrar as tarefas completas da data mais movimentada
        const filteredTasks = tasksData.filter(task => task.startDate === busiestDate && task.endDate === busiestDate && task.startTime && task.endTime);

        if (filteredTasks.length === 0) {
            console.log(`Nenhuma tarefa concluída encontrada para a data ${busiestDate}.`);
            return;
        }

        // Ordenar as tarefas por horário de término
        filteredTasks.sort((a, b) => a.endTime.localeCompare(b.endTime));

        // Extrair os horários de início e término das tarefas
        const startTimes = filteredTasks.map(task => task.startTime); // Extrair horas e minutos
        const finishTimes = filteredTasks.map(task => task.endTime); // Extrair horas e minutos
        const times = [...new Set([...startTimes, ...finishTimes])].sort(); // Combinar e ordenar horários

        console.log('Horários das tarefas:', times);

        let remainingTasks = filteredTasks.length;

        // Criar um array para armazenar a contagem de tarefas restantes ao longo do tempo
        const taskCountsOverTime = [];
        times.forEach(time => {
            filteredTasks.forEach(task => {
                if (task.endTime === time) {
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
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);

            const startTotalMinutes = startHour * 60 + startMinute;
            const endTotalMinutes = endHour * 60 + endMinute;

            const durationMinutes = endTotalMinutes - startTotalMinutes;

            const hours = Math.floor(durationMinutes / 60);
            const minutes = durationMinutes % 60;

            return `${hours}h ${minutes}min`;
        }

        function displayTaskDurations() {
            const tasksContainer = document.getElementById('tasks');
            tasksContainer.innerHTML = ''; // Limpar qualquer conteúdo existente

            filteredTasks.forEach(task => {
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
    const keyUser = "UI";
    const userId = StorageService.loadData(keyUser);
    if (!userId) {
        console.error('ID do usuário não encontrado no armazenamento.');
    } else {
        init(userId);
    }
});
