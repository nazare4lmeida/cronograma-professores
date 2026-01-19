const themeToggle = document.getElementById("themeToggle");
const exportIconContainer = document.getElementById("exportIconContainer");

const iconMoon = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const iconSun = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`;
const iconDownload = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>`;

function carregarCronograma() {
    const cronogramaDiv = document.getElementById("cronograma");
    cronogramaDiv.innerHTML = "";
    
    const curso = document.getElementById("cursoSelect").value;
    const turma = document.getElementById("turmaSelect").value;
    const aulas = window.cronogramas[curso]?.[turma] || [];

    aulas.forEach((aula) => {
        const key = `${curso}-${turma}-aula-${aula.aula}`;
        
        // Recuperar dados: ou o que foi editado pelo professor, ou o padrão do sistema
        const roadmapSalvo = localStorage.getItem(`${key}-roadmap`) || aula.roadmap || "";
        const atividadeSalva = localStorage.getItem(`${key}-atividade`) || aula.atividade || "";
        const anotacaoPrivada = localStorage.getItem(`${key}-nota`) || "";

        const div = document.createElement("div");
        div.className = "aula";
        div.innerHTML = `
            <div class="aula-header">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <small>MÓDULO ${aula.modulo.slice(-2)} • AULA ${aula.aula}</small>
                    <span class="data-tag">${aula.data}</span>
                </div>
                <h3>${aula.tema}</h3>
            </div>
            
            <details class="editor-box">
                <summary> Editar Material da Aula (Roadmap/Atividades)</summary>
                <div class="field-group">
                    <span class="label-editor">Roadmap de Conteúdo:</span>
                    <textarea class="input-material" data-type="roadmap" data-key="${key}" placeholder="Digite o conteúdo programático...">${roadmapSalvo}</textarea>
                    
                    <span class="label-editor">Atividade Prática:</span>
                    <textarea class="input-material" data-type="atividade" data-key="${key}" placeholder="Descreva a atividade proposta...">${atividadeSalva}</textarea>
                </div>
            </details>

            <span class="section-title">📝 Minhas Anotações Privadas</span>
            <textarea class="input-notes" data-type="nota" data-key="${key}" placeholder="Ex: Lembrar de avisar sobre o feriado...">${anotacaoPrivada}</textarea>
        `;

        // Delegar evento de input para salvar qualquer campo automaticamente
        div.querySelectorAll("textarea").forEach(textarea => {
            textarea.addEventListener("input", (e) => {
                const k = e.target.getAttribute("data-key");
                const type = e.target.getAttribute("data-type");
                localStorage.setItem(`${k}-${type}`, e.target.value);
            });
        });

        cronogramaDiv.appendChild(div);
    });
}

// Lógica de Tema
themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("dark-mode", isDark);
    themeToggle.innerHTML = isDark ? iconSun : iconMoon;
};

// Inicialização
window.addEventListener("load", () => {
    const isDark = localStorage.getItem("dark-mode") === "true";
    if (isDark) document.body.classList.add("dark");
    themeToggle.innerHTML = isDark ? iconSun : iconMoon;
    exportIconContainer.innerHTML = iconDownload;
    carregarCronograma();
});

document.getElementById("cursoSelect").onchange = carregarCronograma;
document.getElementById("turmaSelect").onchange = carregarCronograma;