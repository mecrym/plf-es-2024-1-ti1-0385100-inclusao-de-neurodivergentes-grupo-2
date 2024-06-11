document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('chartRing').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'doughnut',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Para garantir que o gráfico preencha o contêiner
        }
    });

    const monthSelect = document.getElementById('month-select');

    document.getElementById('day').addEventListener('click', () => {
        monthSelect.style.display = 'none';
        updateChart(chart, ['Completed', 'Incompleted'], [0, 100], 'Gráfico em construção');
    });

    document.getElementById('week').addEventListener('click', () => {
        monthSelect.style.display = 'none';
        fetchData(data => {
            const weekData = getWeeklyData(data);
            console.log("Weekly Data: ", weekData);
            updateChart(chart, weekData.labels, weekData.data, 'Porcentagem de tarefas concluídas na semana');
        });
    });

    document.getElementById('month').addEventListener('click', () => {
        monthSelect.style.display = 'block';
        monthSelect.addEventListener('change', () => {
            fetchData(data => {
                const monthData = getMonthlyData(data, parseInt(monthSelect.value));
                console.log("Monthly Data: ", monthData);
                updateChart(chart, monthData.labels, monthData.data, 'Porcentagem de tarefas concluídas no mês');
            });
        });
        monthSelect.dispatchEvent(new Event('change'));
    });

    document.getElementById('year').addEventListener('click', () => {
        monthSelect.style.display = 'none';
        fetchData(data => {
            const yearData = getYearlyData(data);
            console.log("Yearly Data: ", yearData);
            updateChart(chart, yearData.labels, yearData.data, 'Porcentagem de tarefas concluídas no ano');
        });
    });

    function fetchData(callback) {
        fetch('tasks_data.json')
            .then(response => response.json())
            .then(data => callback(data));
    }

    function getWeeklyData(data) {
        const result = { completed: 0, total: 0 };
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            if (taskDate >= weekStart && taskDate <= weekEnd) {
                data[date].forEach(task => {
                    result.total++;
                    if (task.conclude) result.completed++;
                });
            }
        });

        const completedPercentage = (result.completed / result.total) * 100;
        return { labels: ['Completed', 'Incompleted'], data: [completedPercentage, 100 - completedPercentage] };
    }

    function getMonthlyData(data, month) {
        const result = { completed: 0, total: 0 };
        const currentYear = new Date().getFullYear();

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            if (taskDate.getFullYear() === currentYear && taskDate.getMonth() === month) {
                data[date].forEach(task => {
                    result.total++;
                    if (task.conclude) result.completed++;
                });
            }
        });

        const completedPercentage = (result.completed / result.total) * 100;
        return { labels: ['Completed', 'Incompleted'], data: [completedPercentage, 100 - completedPercentage] };
    }

    function getYearlyData(data) {
        const result = { completed: 0, total: 0 };

        Object.keys(data).forEach(date => {
            data[date].forEach(task => {
                result.total++;
                if (task.conclude) result.completed++;
            });
        });

        const completedPercentage = (result.completed / result.total) * 100;
        return { labels: ['Completed', 'Incompleted'], data: [completedPercentage, 100 - completedPercentage] };
    }

    function updateChart(chart, labels, data, title) {
        chart.data = {
            labels: labels,
            datasets: [{
                label: 'Completed Tasks',
                data: data,
                backgroundColor: ['#4AA633', '#0D1C2E'],
                borderColor: ['#4AA633', '#0D1C2E'],
                borderWidth: 1
            }]
        };
        chart.options = {
            responsive: true,
            maintainAspectRatio: false,
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
