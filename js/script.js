// Função para carregar o conteúdo de um arquivo HTML em um elemento específico e opcionalmente carregar um arquivo CSS
function loadComponent(componentId, filePath, cssFilePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;

            if (cssFilePath) {
                const linkElement = document.createElement('link');
                linkElement.rel = 'stylesheet';
                linkElement.type = 'text/css';
                linkElement.href = cssFilePath;
                document.head.appendChild(linkElement);
            }

            if (callback) callback();
        })
        .catch(error => console.error('Erro ao carregar componente:', error));
}

// Função para verificar o status de login e atualizar o menu
function checkLoginStatus() {
    fetch('/painite_joias/php/check_session.php')
        .then(response => response.json())
        .then(data => {
            const loginLink = document.getElementById('login-link');
            const logoutLink = document.getElementById('logout-link');
            if (data.logged_in) {
                loginLink.style.display = "none";
                logoutLink.style.display = "inline";
                logoutLink.innerText = `Olá, ${data.user_name} (Logout)`;
            } else {
                loginLink.style.display = "inline";
                logoutLink.style.display = "none";
            }
        })
        .catch(error => console.error('Erro ao verificar login:', error));
}

// Função para alternar o menu em dispositivos móveis
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
        const menu = document.querySelector('.menu');

        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
}

// Carrega o header e footer
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "header.html", "css/components/header.css", () => {
        setupMenuToggle();
        checkLoginStatus();
    });
    loadComponent("footer", "footer.html", "css/components/footer.css");
});

// Função para mostrar uma notificação visual
function mostrarNotificacao(mensagem) {
    const notification = document.getElementById("notification");
    notification.innerText = mensagem;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, imagem, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarNotificacao("Produto adicionado ao carrinho!");
}

// Função para exibir o carrinho
function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let tbody = document.querySelector("tbody");
    let total = 0;

    tbody.innerHTML = "";

    carrinho.forEach((item, index) => {
        let itemTotal = item.preco * item.quantidade;
        total += itemTotal;

        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img width="100px" src="${item.imagem}" alt="${item.nome}"></td>
            <td>${item.nome}</td>
            <td><input type="number" value="${item.quantidade}" min="1" max="10" onchange="atualizarQuantidade(${index}, this.value)"></td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${itemTotal.toFixed(2)}</td>
            <td><button class="button button-remove" onclick="removerDoCarrinho(${index})">Remover</button></td>
        `;
        tbody.appendChild(tr);
    });

    document.querySelector("tfoot td:nth-child(2)").innerText = `R$ ${total.toFixed(2)}`;
}

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
    mostrarNotificacao("Item removido do carrinho.");
}

// Função para atualizar a quantidade de um item no carrinho
function atualizarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho"));
    carrinho[index].quantidade = parseInt(quantidade);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

// Função para finalizar a compra
function finalizarCompra() {
    window.location.href = "finalizar.html";
}

// Função para carregar o resumo dos itens do carrinho na página de finalização
function carregarResumoPedido() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let tbody = document.getElementById("resumo-pedido");
    let total = 0;

    tbody.innerHTML = "";

    carrinho.forEach((item) => {
        let itemTotal = item.preco * item.quantidade;
        total += itemTotal;

        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${itemTotal.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("total-geral").innerText = `R$ ${total.toFixed(2)}`;
}

// Função para confirmar a compra na página de finalização
function confirmarCompra() {
    localStorage.removeItem("carrinho");
    mostrarNotificacao("Compra confirmada com sucesso! Você receberá as instruções de pagamento via Pix.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
}

// Função para continuar comprando
function continuarComprando() {
    window.location.href = "index.html";
}

