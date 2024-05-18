const apiJsonServer = 'https://replit.com/@BrunaMarkowisk/JSONServer-2';
export function readDb(processaDados) {
    fetch(apiJsonServer)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Erro ao ler task via API JSONServer:', error);
            displayMessage("Erro ao ler task");
        });
}
export function saveToServer(taskData){
    console.log(taskData);
    fetch(apiJsonServer, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)  
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dados salvos com sucesso:', taskData);
        // Aqui você pode realizar outras operações após o salvamento
    })
    .catch(error => {
        console.error('Erro ao salvar task via API JSONServer:', error);
        displayMessage("Erro ao salvar task");
    });
}