/**
 * CONFIGURAÇÃO DO CLIENTE SUPABASE
 */
const SUPABASE_URL = 'https://iagdubedokzjzmkunlqp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_F3iNKTIndlWjm2ioRiaEmw_g0ODzupn'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * ELEMENTOS DA INTERFACE
 */
const themeToggle = document.getElementById("themeToggle");
const exportIconContainer = document.getElementById("exportIconContainer");
const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const protectedContent = document.getElementById('protectedContent');
const logoutBtn = document.getElementById('logoutBtn');
const cronogramaDiv = document.getElementById("cronograma");

// Ícones SVG
const iconMoon = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const iconSun = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`;
const iconDownload = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>`;

/**
 * SISTEMA DE AUTENTICAÇÃO
 */
if (loginForm) {
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await _supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert("Acesso negado: Verifique suas credenciais de professor.");
        } else {
            loginScreen.style.display = 'none';
            protectedContent.style.display = 'block';
            carregarCronograma();
        }
    };
}

if (logoutBtn) {
    logoutBtn.onclick = async () => {
        const { error } = await _supabase.auth.signOut();
        if (error) alert("Erro ao sair.");
        else window.location.reload();
    };
}

/**
 * GESTÃO DE DADOS
 */
async function carregarCronograma() {
    cronogramaDiv.innerHTML = "<p style='text-align:center; padding:40px; color:var(--text-muted);'>Sincronizando dados seguros...</p>";
    
    const curso = document.getElementById("cursoSelect").value;
    const turma = document.getElementById("turmaSelect").value;

    const { data: aulas, error } = await _supabase
        .from('cronogramas')
        .select('*')
        .eq('curso', curso)
        .eq('turma', turma)
        .order('aula_numero', { ascending: true });

    if (error) {
        cronogramaDiv.innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar dados do banco de dados.</p>";
        return;
    }

    cronogramaDiv.innerHTML = "";
    renderizarAulas(aulas, curso, turma);
}

function renderizarAulas(aulas, curso, turma) {
    aulas.forEach((aula) => {
        const key = `${curso}-${turma}-aula-${aula.aula_numero}`;
        
        const roadmapSalvo = localStorage.getItem(`${key}-roadmap`) || aula.roadmap || "";
        const atividadeSalva = localStorage.getItem(`${key}-atividade`) || aula.atividade || "";
        const anotacaoPrivada = localStorage.getItem(`${key}-nota`) || "";

        const div = document.createElement("div");
        div.className = "aula";
        div.innerHTML = `
            <div class="aula-header">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <small>MÓDULO ${aula.modulo ? aula.modulo.slice(-2) : '00'} • AULA ${aula.aula_numero}</small>
                    <span class="data-tag">${aula.aula_data}</span>
                </div>
                <h3>${aula.tema}</h3>
            </div>
            
            <details class="editor-box">
                <summary>🛠️ Editar Material da Aula</summary>
                <div class="field-group">
                    <span class="label-editor">Roadmap:</span>
                    <textarea class="input-material" id="${key}-roadmap-input">${roadmapSalvo}</textarea>
                    
                    <span class="label-editor">Atividade:</span>
                    <textarea class="input-material" id="${key}-atividade-input">${atividadeSalva}</textarea>
                    
                    <button class="btn-save" id="${key}-btn-material" onclick="salvarMaterial('${key}')">
                        Salvar Material
                    </button>
                </div>
            </details>

            <span class="section-title">📝 Anotações Privadas</span>
            <textarea class="input-notes" id="${key}-nota-input" placeholder="Notas...">${anotacaoPrivada}</textarea>
            <button class="btn-save" id="${key}-btn-nota" onclick="salvarNotas('${key}')">Salvar Nota</button>
        `;

        // Lógica para resetar o botão ao editar novamente
        div.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('input', () => {
                const isNota = textarea.id.includes('nota');
                const btnId = isNota ? `${key}-btn-nota` : `${key}-btn-material`;
                const btn = document.getElementById(btnId);
                
                btn.innerText = isNota ? "Salvar Nota" : "Salvar Material";
                btn.style.backgroundColor = ""; // Restaura a cor do CSS (Teal)
                btn.style.opacity = "1";
            });
        });

        cronogramaDiv.appendChild(div);
    });
}

/**
 * FUNÇÕES DE SALVAMENTO
 */
window.salvarMaterial = (key) => {
    const roadmap = document.getElementById(`${key}-roadmap-input`).value;
    const atividade = document.getElementById(`${key}-atividade-input`).value;
    const btn = document.getElementById(`${key}-btn-material`);

    localStorage.setItem(`${key}-roadmap`, roadmap);
    localStorage.setItem(`${key}-atividade`, atividade);
    
    btn.innerText = "✓ Salvo!";
    btn.style.backgroundColor = "var(--success)";
    btn.style.opacity = "0.8";
};

window.salvarNotas = (key) => {
    const nota = document.getElementById(`${key}-nota-input`).value;
    const btn = document.getElementById(`${key}-btn-nota`);

    localStorage.setItem(`${key}-nota`, nota);
    
    btn.innerText = "✓ Salvo!";
    btn.style.backgroundColor = "var(--success)";
    btn.style.opacity = "0.8";
};

/**
 * INICIALIZAÇÃO E TEMA
 */
themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("dark-mode", isDark);
    themeToggle.innerHTML = isDark ? iconSun : iconMoon;
};

window.addEventListener("load", async () => {
    const isDark = localStorage.getItem("dark-mode") === "true";
    if (isDark) document.body.classList.add("dark");
    themeToggle.innerHTML = isDark ? iconSun : iconMoon;
    exportIconContainer.innerHTML = iconDownload;

    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        loginScreen.style.display = 'none';
        protectedContent.style.display = 'block';
        carregarCronograma();
    } else {
        loginScreen.style.display = 'flex';
        protectedContent.style.display = 'none';
    }
});

document.getElementById("cursoSelect").onchange = carregarCronograma;
document.getElementById("turmaSelect").onchange = carregarCronograma;