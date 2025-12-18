const cursoSelect = document.getElementById("cursoSelect");
const turmaSelect = document.getElementById("turmaSelect");
const cronogramaDiv = document.getElementById("cronograma");

function carregarCronograma() {
    // 1. Limpa o conteúdo atual
    cronogramaDiv.innerHTML = "";
    
    // 2. Verifica se o objeto cronogramas existe (vindo do cronogramas.js)
    if (typeof cronogramas === 'undefined') {
        cronogramaDiv.innerHTML = "<p>❌ Erro: Arquivo de dados (cronogramas.js) não carregado.</p>";
        return;
    }

    const curso = cursoSelect.value;
    const turma = turmaSelect.value;
    const aulas = cronogramas[curso]?.[turma] || [];

    if (aulas.length === 0) {
        cronogramaDiv.innerHTML = "<p>📌 Cronograma em construção para esta seleção.</p>";
        return;
    }

    // 3. Renderiza as aulas
    aulas.forEach(aula => {
        const key = `${curso}-${turma}-aula-${aula.aula}`;
        const comentario = localStorage.getItem(key) || "";

        const div = document.createElement("div");
        div.className = "aula";
        div.innerHTML = `
            <div class="aula-header">
                <small>${aula.modulo} • Aula ${aula.aula}</small>
                <h3>${aula.tema}</h3>
                <span class="data-badge">📅 ${aula.data}</span>
            </div>
            <div class="sugestoes">
                <strong>Tópicos Sugeridos:</strong>
                <ul>${aula.sugestoes.map(s => `<li>${s}</li>`).join("")}</ul>
            </div>
            <textarea placeholder="Anotações do professor..." data-key="${key}">${comentario}</textarea>
        `;

        // Salva no localStorage automaticamente ao digitar
        div.querySelector("textarea").addEventListener("input", e => {
            localStorage.setItem(key, e.target.value);
        });

        cronogramaDiv.appendChild(div);
    });
}

// Localize o themeToggle no seu script.js e garanta que está assim:
themeToggle.onclick = () => {
    // Adiciona ou remove a classe 'dark' do body
    document.body.classList.toggle("dark");

    // Salva a preferência do professor para a próxima vez que ele abrir o site
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("dark-mode", isDark);

    // Troca o ícone
    themeToggle.textContent = isDark ? "☀️" : "🌙";
};

// Adicione isso ao final do script para o site já abrir no modo que o professor deixou
if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

// Escuta as mudanças nos selects
cursoSelect.onchange = carregarCronograma;
turmaSelect.onchange = carregarCronograma;

// Garante que o código rode após o carregamento total da página
window.addEventListener("load", carregarCronograma);