document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const emailError = document.createElement('div');
    emailError.style.color = 'red';
    emailError.style.display = 'none';
    emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);

    const successMessage = document.createElement('div');
    successMessage.style.color = 'green';
    successMessage.style.display = 'none';
    form.appendChild(successMessage);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = emailInput.value.trim();
        const password = document.getElementById('password').value.trim();
        const password2 = document.getElementById('password2').value.trim();

        if (password !== password2) {
            emailError.textContent = 'As senhas não coincidem';
            emailError.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('../../db/db.json');
            const data = await response.json();
            const users = data.users;

            if (users.some(user => user.email === email)) {
                emailError.textContent = 'Email já está sendo utilizado, por favor tente outro ou realize login';
                emailError.style.display = 'block';
                return;
            }

            emailError.style.display = 'none';
            const newUserId = generateUniqueId(users);

            const newUser = {
                id: newUserId,
                name: name,
                email: email,
                password: password
            };

            await saveNewUser(newUser);

            successMessage.textContent = 'Cadastro realizado';
            successMessage.style.display = 'block';

            setTimeout(() => {
                window.location.href = 'CAMINHO LOGIN AQ';
            }, 2000);

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    });

    function generateUniqueId(users) {
        let uniqueId;
        do {
            uniqueId = Math.floor(Math.random() * 10000).toString();
        } while (users.some(user => user.id === uniqueId));
        return uniqueId;
    }

    async function saveNewUser(newUser) {
        const response = await fetch('../../db/db.json');
        const data = await response.json();
        data.users.push(newUser);

        await fetch('../../db/db.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
});
