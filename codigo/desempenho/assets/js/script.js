document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('chart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'bar',
        data: {},
        options: {}
    });

    document.getElementById('day').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        chart.data = { labels: [], datasets: [] };
        chart.options = { plugins: { title: { display: true, text: 'Gráfico em construção' } } };
        chart.update();
    });

    document.getElementById('week').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        fetchData(data => {
            const weekData = getWeeklyData(data);
            console.log("Weekly Data: ", weekData);
            updateChart(chart, weekData.labels, weekData.data, 'Tasks Completed This Week');
        });
    });

    document.getElementById('month').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'block';
        const monthSelect = document.getElementById('month-select');
        monthSelect.addEventListener('change', () => {
            fetchData(data => {
                const monthData = getMonthlyData(data, parseInt(monthSelect.value));
                console.log("Monthly Data: ", monthData);
                updateChart(chart, monthData.labels, monthData.data, 'Tasks Completed This Month');
            });
        });
        monthSelect.dispatchEvent(new Event('change'));
    });

    document.getElementById('year').addEventListener('click', () => {
        document.getElementById('month-select').style.display = 'none';
        fetchData(data => {
            const yearData = getYearlyData(data);
            console.log("Yearly Data: ", yearData);
            updateChart(chart, yearData.labels, yearData.data, 'Tasks Completed This Year');
        });
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
    
    console.log("Week Start: ", weekStart, "Week End: ", weekEnd, "Result: ", result);
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

    console.log("Month: ", month, "Result: ", result);
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

    console.log("Year Result: ", result);
    return { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: result };
}

function updateChart(chart, labels, data, title) {
    chart.data = {
        labels: labels,
        datasets: [{
            label: 'Completed Tasks',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
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
