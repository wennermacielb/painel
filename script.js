document.addEventListener('DOMContentLoaded', function() {

    // --- SELEÇÃO DE ELEMENTOS DA PÁGINA DE SITES ---
    const tabelaCorpo = document.querySelector('#tabela-sites-corpo');
    const btnNovoSite = document.querySelector('#btn-novo-site');
    
    // Elementos do Modal de Sites
    const modal = document.getElementById('modal-site');
    const modalTitulo = document.getElementById('modal-titulo-site');
    const formModal = document.getElementById('form-site');
    const btnFecharModal = modal.querySelector('.modal-close');
    const btnCancelarModal = document.getElementById('btn-cancelar');
    const btnSalvarModal = document.getElementById('btn-salvar');
    const inputNomeSite = document.getElementById('nome-site');
    const inputClienteSite = document.getElementById('cliente-site');
    const inputUrlSite = document.getElementById('url-site');

    // --- DADOS DA APLICAÇÃO DE SITES ---
    let indiceSendoEditado = null;
    
    // Carrega os dados do localStorage (usando a chave 'sites_db')
    let sites = JSON.parse(localStorage.getItem('sites_db')) || [
        { nome: 'Site Institucional', cliente: 'Advocacia & Cia', url: 'https://advocacia.com' },
        { nome: 'Loja Virtual', cliente: 'Sapatos Modernos', url: 'https://sapatosmodernos.com' }
    ];

    // --- FUNÇÕES PRINCIPAIS ---

    function salvarDados() {
        localStorage.setItem('sites_db', JSON.stringify(sites));
    }

    function renderizarTabela() {
        tabelaCorpo.innerHTML = ''; 

        sites.forEach((site, index) => {
            const linha = document.createElement('tr');
            linha.setAttribute('data-index', index); 
            linha.innerHTML = `
                <td>${site.nome}</td>
                <td>${site.cliente}</td>
                <td><a href="${site.url}" target="_blank">${site.url}</a></td>
                <td>
                    <button class="btn-secondary">Editar</button>
                    <button class="btn-danger">Excluir</button>
                </td>
            `;
            tabelaCorpo.appendChild(linha);
        });
    }

    function abrirModal() { modal.classList.add('show'); }
    function fecharModal() {
        modal.classList.remove('show');
        formModal.reset();
        indiceSendoEditado = null;
        modalTitulo.textContent = 'Novo Site';
    }

    // --- EVENTOS ---

    // Abrir modal para CRIAR
    btnNovoSite.addEventListener('click', () => {
        indiceSendoEditado = null;
        modalTitulo.textContent = 'Novo Site';
        abrirModal();
    });

    // Eventos na tabela para EDITAR ou EXCLUIR
    tabelaCorpo.addEventListener('click', (event) => {
        const elementoClicado = event.target;
        const linha = elementoClicado.closest('tr');
        if (!linha) return;
        const index = linha.getAttribute('data-index');

        // EXCLUIR
        if (elementoClicado.classList.contains('btn-danger')) {
            if (confirm('Tem certeza que deseja excluir este site?')) {
                sites.splice(index, 1);
                salvarDados();
                renderizarTabela();
            }
        }

        // EDITAR
        if (elementoClicado.classList.contains('btn-secondary')) {
            indiceSendoEditado = index;
            const site = sites[index];
            
            inputNomeSite.value = site.nome;
            inputClienteSite.value = site.cliente;
            inputUrlSite.value = site.url;
            modalTitulo.textContent = 'Editar Site';
            abrirModal();
        }
    });
    
    // Fechar o modal
    btnFecharModal.addEventListener('click', fecharModal);
    btnCancelarModal.addEventListener('click', fecharModal);
    modal.addEventListener('click', (event) => { if (event.target === modal) fecharModal(); });

    // Salvar (CRIAR ou EDITAR)
    btnSalvarModal.addEventListener('click', () => {
        const nome = inputNomeSite.value.trim();
        const cliente = inputClienteSite.value.trim();
        const url = inputUrlSite.value.trim();

        if (!nome || !cliente || !url) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const siteAtualizado = { nome, cliente, url };

        if (indiceSendoEditado !== null) {
            sites[indiceSendoEditado] = siteAtualizado;
        } else {
            sites.push(siteAtualizado);
        }
        
        salvarDados();
        renderizarTabela();
        fecharModal();
    });

    // --- INICIALIZAÇÃO ---
    renderizarTabela();
});