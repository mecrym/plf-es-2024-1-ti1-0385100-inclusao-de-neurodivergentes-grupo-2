alert("Esta é uma funcionalidade que depende de dados do aplicativo! Os dados a seguir são somente exemplos, as informações deverão se adequar as necessidades do usuário.");
document.addEventListener('DOMContentLoaded', () => {
    // Buscar os dados do Local Storage
    const tasksData = JSON.parse(localStorage.getItem('task'));
    console.log('Dados das tarefas:', tasksData);

    // Extrair os horários de término das tarefas
    const finishTimes = tasksData.map(task => `${String(task.finish.hour).padStart(2, '0')}:${String(task.finish.minute).padStart(2, '0')}`);
    console.log('Horários de término das tarefas:', finishTimes);

    let remainingTasks = tasksData.length;

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
                    max: '00:00',
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

    function calculateDuration(start, finish) {
        const startHour = parseInt(start.hour);
        const startMinute = parseInt(start.minute);
        const finishHour = parseInt(finish.hour);
        const finishMinute = parseInt(finish.minute);

        const startMinutes = startHour * 60 + startMinute;
        const finishMinutes = finishHour * 60 + finishMinute;
        const durationMinutes = finishMinutes - startMinutes;

        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;

        return `${hours}h ${minutes}min`;
    }

    function displayTaskDurations() {
        const tasksContainer = document.getElementById('tasks');
        tasksContainer.innerHTML = ''; // Limpar qualquer conteúdo existente

        tasksData.forEach(task => {
            const taskName = task.task;
            const duration = calculateDuration(task.start, task.finish);

            // Criar um elemento de div para a tarefa
            const taskElement = document.createElement('div');
            taskElement.innerHTML = `<strong>${taskName}</strong> <span> ${duration}</span>`;

            // Adicionar o elemento da tarefa dentro da div "tasks"
            tasksContainer.appendChild(taskElement);
        });

        // Esconder o botão após clicar
        document.getElementById('durationCalc').style.display = 'none';
    }

    // Faz o botão funcionar
    document.getElementById('durationCalc').addEventListener('click', displayTaskDurations);
});

