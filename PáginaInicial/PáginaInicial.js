function copiarPalavra() {
  // Defina a palavra desejada aqui
  const palavra = "daxautomacaoindustrial";

  navigator.clipboard.writeText(palavra).then(() => {
    alert(`Palavra "${palavra}" copiada para a área de transferência!`);
  });
}