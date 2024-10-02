document.addEventListener('DOMContentLoaded', () => {
    const dataTableBody = document.querySelector('#dataTable tbody');
    const filterName = document.getElementById('filterName');
    const filterDate = document.getElementById('filterDate');
    const filterBtn = document.getElementById('filterBtn');
    const modal = document.getElementById('editModal');
    const closeModalBtn = document.querySelector('.close-btn');
    const editForm = document.getElementById('editForm');
    
    // Dados simulados
    const data = [
        {
            nome: "Ana Silva",
            nascimento: "1990-01-01",
            email: "ana@email.com",
            telefone: "9999-8888",
            alergia: "Não",
            imagem: "Sim",
            dataCadastro: "2023-01-15",
            horario: "08:00 - 17:00"
        },
        {
            nome: "Pedro Souza",
            nascimento: "1985-07-10",
            email: "pedro@email.com",
            telefone: "9999-7777",
            alergia: "Sim",
            imagem: "Não",
            dataCadastro: "2023-02-20",
            horario: "09:00 - 18:00"
        }
        // Mais dados simulados...
    ];

    // Carrega dados na tabela
    function loadData(filterByName = '', filterByDate = '') {
        dataTableBody.innerHTML = '';

        const filteredData = data.filter(item => {
            const matchName = item.nome.toLowerCase().includes(filterByName.toLowerCase());
            const matchDate = !filterByDate || item.dataCadastro === filterByDate;
            return matchName && matchDate;
        });

        filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.nascimento}</td>
                <td>${item.email}</td>
                <td>${item.telefone}</td>
                <td>${item.alergia}</td>
                <td>${item.imagem}</td>
                <td>${item.dataCadastro}</td>
                <td>${item.horario}</td>
                <td class="actions">
                    <button onclick="editRecord('${item.nome}', '${item.email}', '${item.telefone}')">Editar</button>
                </td>
            `;
            dataTableBody.appendChild(row);
        });
    }

    loadData();

    filterBtn.addEventListener('click', () => {
        const name = filterName.value;
        const date = filterDate.value;
        loadData(name, date);
    });

    // Função para abrir o modal com os dados do registro a ser editado
    window.editRecord = function(nome, email, telefone) {
        document.getElementById('editNome').value = nome;
        document.getElementById('editEmail').value = email;
        document.getElementById('editTelefone').value = telefone;

        modal.style.display = 'flex'; // Exibe o modal
    }

    // Fechar o modal ao clicar no botão "x"
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar o modal ao clicar fora da área de conteúdo
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Salva os dados editados (simulação)
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Aqui você enviaria os dados editados para o backend via API
        alert('Dados salvos com sucesso!');
        modal.style.display = 'none'; // Fecha o modal após salvar
    });
});
