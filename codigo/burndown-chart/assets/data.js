document.addEventListener('DOMContentLoaded', () => {
    const tasksData = [
        {
            "task": "Leitura",
            "start": {"hour": "10", "minute": "30"},
            "finish": {"hour": "12", "minute": "00"}
        },
        {
            "task": "Estudos",
            "start": {"hour": "12", "minute": "15"},
            "finish": {"hour": "16", "minute": "45"}
        },
        {
            "task": "Treino",
            "start": {"hour": "17", "minute": "00"},
            "finish": {"hour": "19", "minute": "00"}
        },
        {
            "task": "Cuidados pessoais",
            "start": {"hour": "19", "minute": "20"},
            "finish": {"hour": "20", "minute": "40"}
        }
    ]
    // Armazenar os dados no Local Storage
    localStorage.setItem('task', JSON.stringify(tasksData));
});