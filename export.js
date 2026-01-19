function exportarAnotacoes() {
    let texto = "CRONOGRAMA GERAÇÃO TECH - EXPORTAÇÃO DE DADOS\n";
    texto += "==============================================\n\n";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Filtra anotações, roadmaps e atividades
        if (key.includes("aula")) {
            const valor = localStorage.getItem(key);
            if (valor && valor.trim() !== "") {
                const nomeLimpo = key.replace(/-/g, " ").toUpperCase();
                texto += `[${nomeLimpo}]\n${valor}\n`;
                texto += "----------------------------------------------\n";
            }
        }
    }

    if (texto.length < 100) {
        alert("Não há anotações ou alterações para exportar.");
        return;
    }

    const blob = new Blob([texto], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `meu_cronograma_${new Date().toLocaleDateString()}.txt`;
    link.click();
}