document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('chart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {},
        options: {
            plugins: {
                legend: {
                    display: false,

                }
            },
            responsive: true,
            maintainAspectRatio: false,//garante que preencha o conteiner em que está contido o gráfico
            scales: {//configuração dos eixos
                y: {
                    min: 0,
                    ticks: {
                        callback: function (value) {
                            if (Number.isInteger(value) || value === 0) {
                                return value;
                            }else{
                                return null;
                            }
                            
                        }
                    }
                }
            }
            
        }
    });

    document.getElementById('day').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        chart.data = {
            labels: [],
            datasets: []
        };
        chart.options.plugins.title.text = 'Gráfico em construção';
        chart.update();
    });

    document.getElementById('week').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        fetchData(data => {
            const weekData = getWeeklyData(data);
            updateChart(chart, weekData.labels, weekData.data);
        });
    });

    document.getElementById('month').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'block';
        const monthSelect = document.getElementById('month-select');
        monthSelect.addEventListener('change', () => {
            fetchData(data => {
                const monthData = getMonthlyData(data, parseInt(monthSelect.value));
                updateChart(chart, monthData.labels, monthData.data);
            });
        });
        monthSelect.dispatchEvent(new Event('change'));
    });

    document.getElementById('year').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        fetchData(data => {
            const yearData = getYearlyData(data);
            updateChart(chart, yearData.labels, yearData.data);
        });
    });

    function fetchData(callback) {
        fetch('tasks_data.json')
            .then(response => response.json())
            .then(data => callback(data));
    }

    function getWeeklyData(data) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const result = new Array(7).fill(0);
        const today = new Date();
        const weekStart = new Date(today.setDate(today.getDate() - today.getDay() + 1));
        const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 7));

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            if (taskDate >= weekStart && taskDate <= weekEnd) {
                const dayOfWeek = taskDate.getDay() - 1;
                if (dayOfWeek >= 0 && dayOfWeek < 7) {
                    const tasks = data[date];
                    tasks.forEach(task => {
                        if (task.conclude) {
                            result[dayOfWeek]++;
                        }
                    });
                }
            }
        });

        return { labels: days, data: result };
    }

    function getMonthlyData(data, month) {
        const result = new Array(4).fill(0);
        const today = new Date();
        const currentYear = today.getFullYear();

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            if (taskDate.getFullYear() === currentYear && taskDate.getMonth() === month) {
                const weekOfMonth = Math.floor((taskDate.getDate() - 1) / 7);
                const tasks = data[date];
                tasks.forEach(task => {
                    if (task.conclude) {
                        result[weekOfMonth]++;
                    }
                });
            }
        });

        return { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: result };
    }

    function getYearlyData(data) {
        const result = new Array(12).fill(0);

        Object.keys(data).forEach(date => {
            const taskDate = new Date(date);
            const month = taskDate.getMonth();
            const tasks = data[date];
            tasks.forEach(task => {
                if (task.conclude) {
                    result[month]++;
                }
            });
        });

        return { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: result };
    }

    function updateChart(chart, labels, data, title) {
        chart.data = {
            labels: labels,
            datasets: [{
                label: 'tarefas concluidas',
                data: data,
                backgroundColor: '#f1c40f',
                borderColor: '#f1c40f',
                borderWidth: 1,
                fill: false
            }]
        };
        chart.options.plugins.title.text = title;
        chart.update();
    }

    });
