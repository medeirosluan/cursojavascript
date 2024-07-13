const TOKEN = "655bea04bd31646d2c7c8442d554dc446cf0963b2f637d621f263cde8d91055e"; // Substitua pelo seu token da API
const BASE_URL = "http://api.olhovivo.sptrans.com.br/v2.1";

// Função para autenticar
async function authenticate() {
    const response = await fetch(`${BASE_URL}/Login/Autenticar?token=${TOKEN}`, {
        method: 'POST',
    });
    return response.ok;
}

// Função para buscar linhas de ônibus
async function fetchBusLines(term) {
    const response = await fetch(`${BASE_URL}/Linha/Buscar?termosBusca=${term}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erro ao buscar linhas');
    }
}

// Função para mostrar os resultados
function displayResults(lines) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    lines.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line';
        lineDiv.innerHTML = `<strong>${line.lt} - ${line.tl}</strong><br>Sentido: ${line.tp}`;
        resultsDiv.appendChild(lineDiv);
    });
}

// Função principal para autenticar e buscar linhas
async function searchBusLines() {
    const searchTerm = document.getElementById('searchTerm').value;
    if (!searchTerm) {
        alert('Por favor, digite um número ou nome de linha');
        return;
    }

    const isAuthenticated = await authenticate();
    if (isAuthenticated) {
        try {
            const lines = await fetchBusLines(searchTerm);
            displayResults(lines);
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar linhas');
        }
    } else {
        alert('Falha na autenticação');
    }
}