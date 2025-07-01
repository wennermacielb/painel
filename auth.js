// PARTE 1: O "SEGURANÇA" (GATEKEEPER)
// Esta parte do código roda imediatamente, antes mesmo da página carregar completamente.
// É uma função que se chama a si mesma, conhecida como IIFE (Immediately Invoked Function Expression).
(function() {
    // Verifica se a flag 'usuarioLogado' NÃO existe ou NÃO é 'true' no sessionStorage.
    // O sessionStorage é uma memória que só dura enquanto a aba do navegador está aberta.
    if (sessionStorage.getItem('usuarioLogado') !== 'true') {
        
        // Descobre se a página atual está dentro de uma subpasta (true) ou na raiz (false).
        const isSubfolder = window.location.pathname.includes('/cardapios/') ||
                              window.location.pathname.includes('/sites/') ||
                              window.location.pathname.includes('/configuracoes/');
        
        // Define o caminho correto para a página de login com base na localização atual.
        const loginPath = isSubfolder ? '../login/login.html' : 'login/login.html';

        // Redireciona o usuário para a página de login.
        window.location.href = loginPath;
    }
})();


// PARTE 2: A LÓGICA DO BOTÃO DE LOGOUT
// Esta parte espera o HTML da página ser carregado para poder encontrar o botão.
document.addEventListener('DOMContentLoaded', function() {
    
    // Procura pelo botão de logout na página.
    const logoutBtn = document.getElementById('logout-btn');

    // Se o botão de logout existir nesta página...
    if (logoutBtn) {
        // ...adiciona um evento de clique a ele.
        logoutBtn.addEventListener('click', function() {
            
            // 1. Pergunta ao usuário se ele realmente quer sair.
            if (confirm('Você tem certeza que deseja sair?')) {
                // 2. Remove a flag de login da memória da sessão.
                sessionStorage.removeItem('usuarioLogado');

                // 3. Descobre o caminho para a página de login (mesma lógica de antes).
                const isSubfolder = window.location.pathname.includes('/cardapios/') ||
                                      window.location.pathname.includes('/sites/') ||
                                      window.location.pathname.includes('/configuracoes/');
                const loginPath = isSubfolder ? '../login/login.html' : 'login/login.html';

                // 4. Redireciona o usuário para a página de login.
                window.location.href = loginPath;
            }
        });
    }
});