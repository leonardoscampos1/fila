const colunas = document.querySelectorAll('.coluna');
const reserva = document.querySelector('.reserva');
let arrastando = null;

let vendedores = {
    sp: [
        { nome: 'João', cod: 'SP001' },
        { nome: 'Maria', cod: 'SP002' }
    ],
    mg: [
        { nome: 'Carlos', cod: 'MG001' },
        { nome: 'Ana', cod: 'MG002' }
    ],
    rj: [
        { nome: 'Pedro', cod: 'RJ001' },
        { nome: 'Sofia', cod: 'RJ002' }
    ]
};

function criarCard(vendedor, colunaId, indice) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable = true;
    card.innerHTML = `
        <p>${vendedor.nome}</p>
        <p>Cod: ${vendedor.cod}</p>
        <button class="editar" data-coluna="${colunaId}" data-indice="${indice}">Editar</button>
        <button class="excluir" data-coluna="${colunaId}" data-indice="${indice}">Excluir</button>
    `;
    return card;
}

function renderizarVendedores() {
    colunas.forEach(coluna => {
        coluna.innerHTML = `<h2>${coluna.id.toUpperCase()}</h2>`;
        vendedores[coluna.id].forEach((vendedor, indice) => {
            coluna.appendChild(criarCard(vendedor, coluna.id, indice));
        });
    });
    adicionarEventosCards();
}

function configurarArrasto(elemento) {
    elemento.addEventListener('dragstart', e => {
        arrastando = e.target;
    });

    elemento.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(elemento, e.clientY);
        if (afterElement == null) {
            elemento.appendChild(arrastando);
        } else {
            elemento.insertBefore(arrastando, afterElement);
        }
    });

    elemento.addEventListener('drop', () => {
        arrastando = null;
    });
}

function getDragAfterElement(coluna, y) {
    const elementosArrastaveis = [...coluna.querySelectorAll('.card:not(.arrastando)')];

    return elementosArrastaveis.reduce((maisProximo, filho) => {
        const caixa = filho.getBoundingClientRect();
        const offset = y - caixa.top - caixa.height / 2;
        if (offset < 0 && offset > maisProximo.offset) {
            return { offset: offset, elemento: filho };
        } else {
            return maisProximo;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).elemento;
}

function adicionarEventosCards() {
    document.querySelectorAll('.editar').forEach(botao => {
        botao.addEventListener('click', e => {
            const colunaId = e.target.dataset.coluna;
            const indice = parseInt(e.target.dataset.indice);
            const vendedor = vendedores[colunaId][indice];
            document.getElementById('nome').value = vendedor.nome;
            document.getElementById('cod').value = vendedor.cod;
            document.getElementById('coluna').value = colunaId;
            document.getElementById('indiceVendedor').value = indice;
            modal.style.display = 'block';
        });
    });

    document.querySelectorAll('.excluir').forEach(botao => {
        botao.addEventListener('click', e => {
            const colunaId = e.target.dataset.coluna;
            const indice = parseInt(e.target.dataset.indice);
            vendedores[colunaId].splice(indice, 1);
            renderizarVendedores();
        });
    });
}

renderizarVendedores();
colunas.forEach(coluna => configurarArrasto(coluna));
configurarArrasto(reserva);

const modal = document.getElementById('modal');
const btnAdicionarVendedor = document.getElementById('adicionarVendedor');
const btnFecharModal = document.querySelector('.fechar');
const formularioVendedor = document.getElementById('formularioVendedor');

btnAdicionarVendedor.addEventListener('click', () => {
    formularioVendedor.reset();
    document.getElementById('indiceVendedor').value = '';
    modal.style.display = 'block';
});

btnFecharModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

formularioVendedor.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const cod = document.getElementById('cod').value;
    const coluna = document.getElementById('coluna').value;
    const indiceVendedor = document.getElementById('indiceVendedor').value;

    if (indiceVendedor === '') {
        vendedores[coluna].push({ nome, cod });
    } else {
        vendedores[coluna][indiceVendedor] = { nome, cod };
    }

    renderizarVendedores();
    modal.style.display = 'none';
    formularioVendedor.reset();
});