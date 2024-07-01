function gerarCalendarioSemanalSegSexHTML(dataInicial) {
    const diasSemana = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let data = new Date(dataInicial);
    data.setHours(0, 0, 0, 0);
    while (data.getDay() !== 0) {
        data.setDate(data.getDate() - 1);
    }

    let calendarioHtml = `
        <h2 class="text-center">${data.toLocaleDateString('en-ES', { month: 'long', year: 'numeric' })}</h2>
        <table class="table table-bordered style="background-color: #0D1C2E; color: #ffffff;">
            <thead>
                <tr>
                    ${diasSemana.map(dia => `<th>${dia}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
    `;

    calendarioHtml += '<tr>';
    for (let j = 0; j < 7; j++) { 
        calendarioHtml += `<td>${data.getDate()}</td>`;
        data.setDate(data.getDate() + 1);
    }
    calendarioHtml += '</tr>';

    calendarioHtml += `
            </tbody>
        </table>
    `;

    return calendarioHtml;
}

function inicializarCarrossel() {
    const carrossel = document.getElementById('carouselExample');
    const inner = carrossel.querySelector('.carousel-inner');

    const dataAtual = new Date();
    dataAtual.setDate(1); 

    const mesesAntes = 12;
    for (let i = mesesAntes; i > 0; i--) {
        const dataInicial = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - i, 1);
        const calendarioHtml = gerarCalendarioSemanalSegSexHTML(dataInicial);

        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.innerHTML = calendarioHtml;

        inner.appendChild(item);
    }

    const calendarioAtualHtml = gerarCalendarioSemanalSegSexHTML(dataAtual);
    const itemAtual = document.createElement('div');
    itemAtual.classList.add('carousel-item', 'active'); 
    itemAtual.innerHTML = calendarioAtualHtml;
    inner.appendChild(itemAtual);

    const mesesDepois = 12;
    for (let i = 1; i <= mesesDepois; i++) {
        const dataInicial = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + i, 1);
        const calendarioHtml = gerarCalendarioSemanalSegSexHTML(dataInicial);

        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.innerHTML = calendarioHtml;

        inner.appendChild(item);
    }

    new bootstrap.Carousel(carrossel, {
        interval: false 
    });
}

document.addEventListener('DOMContentLoaded', inicializarCarrossel);
