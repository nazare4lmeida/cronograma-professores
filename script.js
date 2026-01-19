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

// Ícones SVG Minimalistas
const iconMoon = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const iconSun = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`;
const iconDownload = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path></svg>`;

/**
 * SISTEMA DE AUTENTICAÇÃO
 */

// Lógica de Login
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

// Lógica de Logout
if (logoutBtn) {
    logoutBtn.onclick = async () => {
        const { error } = await _supabase.auth.signOut();
        if (error) alert("Erro ao sair.");
        else window.location.reload(); // Recarrega para limpar o estado da aplicação
    };
}

/**
 * GESTÃO DE DADOS (SUPABASE)
 */

async function carregarCronograma() {
    cronogramaDiv.innerHTML = "<p style='text-align:center; padding:40px; color:var(--text-muted);'>Sincronizando dados seguros...</p>";
    
    const curso = document.getElementById("cursoSelect").value;
    const turma = document.getElementById("turmaSelect").value;

    // Busca dados da tabela 'cronogramas' configurada com RLS
    const { data: aulas, error } = await _supabase
        .from('cronogramas')
        .select('*')
        .eq('curso', curso)
        .eq('turma', turma)
        .order('aula_numero', { ascending: true });

    if (error) {
        cronogramaDiv.innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar dados do banco de dados.</p>";
        console.error(error);
        return;
    }

    cronogramaDiv.innerHTML = "";
    renderizarAulas(aulas, curso, turma);
}

function renderizarAulas(aulas, curso, turma) {
    aulas.forEach((aula) => {
        const key = `${curso}-${turma}-aula-${aula.aula_numero}`;
        
        // As anotações pessoais continuam no LocalStorage (específicas de cada navegador de professor)
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
                <summary>🛠️ Editar Material da Aula (Roadmap/Atividades)</summary>
                <div class="field-group">
                    <span class="label-editor">Roadmap de Conteúdo:</span>
                    <textarea class="input-material" data-type="roadmap" data-key="${key}">${roadmapSalvo}</textarea>
                    
                    <span class="label-editor">Atividade Prática:</span>
                    <textarea class="input-material" data-type="atividade" data-key="${key}">${atividadeSalva}</textarea>
                </div>
            </details>

            <span class="section-title">📝 Minhas Anotações Privadas</span>
            <textarea class="input-notes" data-type="nota" data-key="${key}" placeholder="Notas sobre o andamento da turma...">${anotacaoPrivada}</textarea>
        `;

        // Salva automaticamente no LocalStorage ao digitar
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

/**
 * INICIALIZAÇÃO E TEMA
 */

themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("dark-mode", isDark);
    themeToggle.innerHTML = isDark ? iconSun : iconMoon;
};

// Verifica sessão ativa ao carregar a página
window.addEventListener("load", async () => {
    // Aplica tema salvo
    const isDark = localStorage.getItem("dark-mode") === "true";
    if (isDark) document.body.classList.add("dark");
    themeToggle.innerHTML = isDark ? iconSun : iconMoon;
    exportIconContainer.innerHTML = iconDownload;

    // Checa se o usuário já está logado no Supabase
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

// Atualiza o conteúdo ao mudar os filtros de curso/turma
document.getElementById("cursoSelect").onchange = carregarCronograma;
document.getElementById("turmaSelect").onchange = carregarCronograma;

async function migrarTudoAgora() {
    console.log("Iniciando migração forçada...");
    const todasAsAulas = [];
    
    // Certifique-se de que o arquivo cronograma.js ainda está carregado no index.html para este passo
    if (!window.cronogramas) {
        console.error("Erro: O objeto cronogramas não foi encontrado. Verifique se o cronograma.js está no HTML.");
        return;
    }

    for (let curso in window.cronogramas) {
        for (let turma in window.cronogramas[curso]) {
            window.cronogramas[curso][turma].forEach(aula => {
                todasAsAulas.push({
                    curso: curso,
                    turma: turma,
                    aula_numero: aula.aula,
                    aula_data: aula.data,
                    tema: aula.tema,
                    modulo: aula.modulo,
                    roadmap: aula.roadmap || "",
                    atividade: aula.atividade || ""
                    // Adicione outras colunas se criou mais no SQL Editor
                });
            });
        }
    }

    // O comando .select() ao final ajuda a confirmar se os dados foram escritos
    const { data, error } = await _supabase
        .from('cronogramas')
        .insert(todasAsAulas)
        .select();

    if (error) {
        console.error("ERRO DETALHADO DA MIGRAÇÃO:", error.message, error.details, error.hint);
        alert("Falha na migração. Verifique o console para detalhes.");
    } else {
        console.log("Dados inseridos com sucesso:", data);
        alert("Migração concluída! Verifique o painel do Supabase agora.");
    }
}