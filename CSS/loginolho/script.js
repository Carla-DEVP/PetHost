function toggleSenha() {
  const campoSenha = document.getElementById("senha");
  const olho = document.querySelector(".olho");

  if (campoSenha.type === "password") {
    campoSenha.type = "text";
    olho.textContent = "🙈"; // muda o ícone
  } else {
    campoSenha.type = "password";
    olho.textContent = "👁️";
  }
}
