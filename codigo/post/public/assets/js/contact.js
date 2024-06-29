document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const contactsList = document.getElementById('contactsList');
    const contactIdInput = document.getElementById('contactId');
    const messageDiv = document.getElementById('message');

    searchInput.addEventListener('input', async () => {
        const query = searchInput.value.toLowerCase();
        contactsList.innerHTML = '';

        if (query.length < 2) return;

        try {
            const users = await getUsers();
            const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query));

            filteredUsers.forEach(user => {
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.innerHTML = `
                    <img src="${user.profilePhotoUrl}" alt="${user.name}" width="40" height="40">
                    <span>${user.name}</span>
                    <button data-contact-id="${user.id}"><i class="fas fa-user-plus"></i></button>
                `;
                contactItem.querySelector('button').addEventListener('click', () => {
                    contactIdInput.value = user.id;
                    messageDiv.textContent = `${user.name} selecionado como contato.`;
                });
                contactsList.appendChild(contactItem);
            });
        } catch (error) {
            console.error('Erro ao buscar contatos:', error);
        }
    });
});

document.getElementById('addContact').addEventListener('click', async () => {
    const contactId = parseInt(document.getElementById('contactId').value, 10);
    const messageDiv = document.getElementById('message');
    
    if (isNaN(contactId)) {
        messageDiv.textContent = 'Por favor, insira um ID de contato válido.';
        return;
    }

    try {
        const users = await getUsers();
        const firstUser = users[0];
        const userId = firstUser.id;

        if (!firstUser || !firstUser.id) {
            messageDiv.textContent = 'Primeiro usuário não encontrado.';
            return;
        }

        const contact = await fetchUserById(contactId);

        if (!contact || !contact.id) {
            messageDiv.textContent = 'Contato não encontrado.';
            return;
        }

        const friendEntry = await fetchFriendEntryByUserId(userId);

        if (!friendEntry) {
            messageDiv.textContent = 'Entrada de amigo não encontrada.';
            return;
        }

        if (!Array.isArray(friendEntry.friends)) {
            friendEntry.friends = [];
        }

        if (!friendEntry.friends.includes(contactId)) {
            friendEntry.friends.push(contactId);

            await fetch(`http://localhost:3000/friends/${friendEntry.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(friendEntry)
            });

            messageDiv.textContent = `Contato ${contact.name} adicionado com sucesso.`;
        } else {
            messageDiv.textContent = `Contato ${contact.name} já está na sua lista de amigos.`;
        }
    } catch (error) {
        console.error('Erro ao adicionar contato:', error);
        messageDiv.textContent = 'Erro ao adicionar contato. Por favor, tente novamente.';
    }
});

async function getUsers() {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    return users;
}

async function fetchUserById(userId) {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await response.json();
    return user;
}

async function fetchFriendEntryByUserId(userId) {
    const response = await fetch('http://localhost:3000/friends');
    const friends = await response.json();
    return friends.find(friend => friend.userId == userId); // Comparação de igualdade solta para garantir a correspondência
}
