function exportarAnotacoes() {
  let texto = "ANOTAÇÕES DO PROFESSOR\n";
  texto += "==========================\n\n";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes("aula")) {
      // Limpa o nome da chave (ex: ia_gen-terqui-aula-1 vira Aula 1)
      const nomeLimpo = key.replace(/-/g, " ").toUpperCase();
      texto += `${nomeLimpo}:\n${localStorage.getItem(key)}\n`;
      texto += "--------------------------\n";
    }
  }

  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "anotacoes_cronograma.txt";
  link.click();
}