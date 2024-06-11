document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('chartRing').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'doughnut',
        data: { labels: [], datasets: [] },
        options: {}
    });

    // Gera o gráfico diário
    document.getElementById('day').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        chart.data = { labels: ['Completed', 'Incompleted'], datasets: [ { data: [0, 100], backgroundColor: ['#f1c40f', '#0D1C2E'] } ] }; //populando o gráfico com dados padrão
        chart.options = { plugins: { title: { display: true, text: 'Gráfico em construção' } } };
        chart.update();
    });

    // Gera o gráfico semanal
    document.getElementById('week').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        fetchData(data => {
            const weekData = getWeeklyData(data);
            console.log("Weekly Data: ", weekData);
            updateChart(chart, weekData.labels, weekData.data, 'Porcentagem de tarefas concluídas na semana');
        });
    });

    // Gera o gráfico mensal
    document.getElementById('month').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'block';
        const monthSelect = document.getElementById('month-select');
        monthSelect.addEventListener('change', () => {
            fetchData(data => {
                const monthData = getMonthlyData(data, parseInt(monthSelect.value));
                console.log("Monthly Data: ", monthData);
                updateChart(chart, monthData.labels, monthData.data, 'Porcentagem de tarefas concluídas no mês');
            });
        });
        monthSelect.dispatchEvent(new Event('change'));
    });

    // Gera o gráfico anual
    document.getElementById('year').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        fetchData(data => {
            const yearData = getYearlyData(data);
            console.log("Yearly Data: ", yearData);
            updateChart(chart, yearData.labels, yearData.data, 'Porcentagem de tarefas concluídas no ano');
        });
    });

    // Função que busca os dados do arquivo JSON
    function fetchData(callback) {
        fetch('tasks_data.json')
            .then(response => response.json())
            .then(data => callback(data));
    }

    // Função que gera os dados semanais
    function getWeeklyData(data) {
        const result = { completed: 0, total: 0 };
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            if (taskDate >= weekStart && taskDate <= weekEnd) {
                const tasks = data[date];
                tasks.forEach(task => {
                    if (task.conclude) {
                        result.completed++;
                    }
                    result.total++;
                });
            }
        });

        const completedPercentage = (result.completed / result.total) * 100;
        const incompletedPercentage = 100 - completedPercentage;
        return { labels: ['Completed', 'Incompleted'], data: [completedPercentage, incompletedPercentage] };
    }

    // Função que gera os dados mensais
    function getMonthlyData(data, month) {
        const result = { completed: 0, total: 0 };
        const today = new Date();
        const currentYear = today.getFullYear();

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            if (taskDate.getFullYear() === currentYear && taskDate.getMonth() === month) {
                const tasks = data[date];
                tasks.forEach(task => {
                    if (task.conclude) {
                        result.completed++;
                    }
                    result.total++;
                });
            }
        });

        const completedPercentage = (result.completed / result.total) * 100;
        const incompletedPercentage = 100 - completedPercentage;
        return { labels: ['Completed', 'Incompleted'], data: [completedPercentage, incompletedPercentage] };
    }

    // Função que gera os dados anuais
    function getYearlyData(data) {
        const result = { completed: 0, total: 0 };

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            const tasks = data[date];
            tasks.forEach(task => {
                if (task.conclude) {
                    result.completed++;
                }
                result.total++;
            });
        });

        const completedPercentage = (result.completed / result.total) * 100;
        const incompletedPercentage = 100 - completedPercentage;
        return { labels: ['Completed', 'Incompleted'], data: [completedPercentage, incompletedPercentage] };
    }

    // Função que atualiza o gráfico
    function updateChart(chart, labels, data, title) {
        chart.data = {
            labels: labels,
            datasets: [
                {
                    label: 'Completed Tasks',
                    data: data,
                    backgroundColor: ['#4AA633', '#0D1C2E'],
                    borderColor: ['#4AA633', '#0D1C2E'],
                    borderWidth: 1
                }
            ]
        };
        chart.options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        };
        chart.update();
    }
});