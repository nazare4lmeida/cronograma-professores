function exportarAnotacoes() {
    const curso = document.getElementById("cursoSelect").value;
    const turma = document.getElementById("turmaSelect").value;
    
    // Nome amigável para o arquivo
    const nomeCurso = curso === "ia_gen" ? "IA Generativa" : "IA + Soft Skills";
    const nomeTurma = turma === "terqui" ? "Terça e Quinta" : "Segunda e Quarta";
    
    let conteudoExportacao = `RELATÓRIO DE CRONOGRAMA - ${nomeCurso}\n`;
    conteudoExportacao += `TURMA: ${nomeTurma}\n`;
    conteudoExportacao += `EXPORTADO EM: ${new Date().toLocaleString('pt-BR')}\n`;
    conteudoExportacao += `--------------------------------------------------\n\n`;

    // Seleciona todos os cards de aula visíveis na tela
    const aulasCards = document.querySelectorAll(".aula");

    if (aulasCards.length === 0) {
        alert("Não há dados carregados para exportar.");
        return;
    }

    aulasCards.forEach((card) => {
        const titulo = card.querySelector("h3").innerText;
        const info = card.querySelector("small").innerText;
        const data = card.querySelector(".data-tag").innerText;

        // Captura os valores atuais dos textareas (que contêm suas edições salvas ou não)
        const roadmap = card.querySelector(".input-material[id$='roadmap-input']").value;
        const atividade = card.querySelector(".input-material[id$='atividade-input']").value;
        const notas = card.querySelector(".input-notes").value;

        conteudoExportacao += `${info} | DATA: ${data}\n`;
        conteudoExportacao += `TEMA: ${titulo}\n`;
        conteudoExportacao += `--------------------------------------------------\n`;
        conteudoExportacao += `ROADMAP:\n${roadmap || "Nenhum conteúdo inserido."}\n\n`;
        conteudoExportacao += `ATIVIDADE PRÁTICA:\n${atividade || "Nenhuma atividade definida."}\n\n`;
        conteudoExportacao += `MINHAS ANOTAÇÕES:\n${notas || "Sem anotações para esta aula."}\n`;
        conteudoExportacao += `\n==================================================\n\n`;
    });

    // Criação do arquivo para download
    const blob = new Blob([conteudoExportacao], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Cronograma_${curso}_${turma}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
}