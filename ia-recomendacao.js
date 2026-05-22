const GEMINI_API_KEY = "SUA_CHAVE_OPENROUTER_AQUI"; // ← substitua pela sua chave
const GEMINI_URL = "https://openrouter.ai/api/v1/chat/completions";

async function buscarRecomendacaoIA() {
  const nomeTutor   = document.getElementById("ia-nome-tutor").value  || "Tutor";
  const bairro      = document.getElementById("ia-bairro").value      || "João Pessoa";
  const nomePet     = document.getElementById("ia-nome-pet").value    || "Pet";
  const tipoPet     = document.getElementById("ia-tipo-pet").value    || "Cachorro";
  const portePet    = document.getElementById("ia-porte-pet").value   || "Médio";
  const necessidade = document.getElementById("ia-necessidade").value || "Sem necessidades especiais";

  const resultado = document.getElementById("resultado-ia");
  resultado.innerHTML = '<div class="ia-loading">Analisando perfis e gerando recomendação...</div>';

  try {
    const resposta = await fetch("./mock.json");
    const dados    = await resposta.json();

    const prompt = `
Você é um sistema especializado em recomendação de hospedagem para pets da plataforma PetHost, em João Pessoa - PB.

DADOS DO TUTOR:
- Nome: ${nomeTutor}
- Bairro: ${bairro}
- Pet: ${nomePet}, ${tipoPet}, porte ${portePet}
- Necessidade: ${necessidade}

ANFITRIÕES DISPONÍVEIS:
${dados.anfitrioes.map((a, i) => `
Anfitrião ${i + 1}: ${a.nome}
- Bairro: ${a.bairro}
- Pet próprio: ${a.pet_proprio.tipo} de porte ${a.pet_proprio.porte}
- Média: ${a.media_estrelas} estrelas (${a.total_hospedagens} hospedagens)
- Avaliações: ${a.avaliacoes.join(" | ")}
`).join("")}

Responda EXATAMENTE neste formato JSON, sem nenhum texto fora do JSON:
{
  "recomendado": {
    "nome": "Nome do anfitrião",
    "justificativa": "Explicação clara e objetiva de por que este anfitrião é o mais compatível."
  },
  "pontuacoes": [
    { "nome": "Nome do anfitrião 1", "nota": 8.5, "motivo": "Breve justificativa." },
    { "nome": "Nome do anfitrião 2", "nota": 7.0, "motivo": "Breve justificativa." },
    { "nome": "Nome do anfitrião 3", "nota": 6.0, "motivo": "Breve justificativa." }
  ],
  "dica": "Uma sugestão de melhoria concreta para o perfil do anfitrião recomendado."
}`;

    const respostaIA = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const json = await respostaIA.json();
    console.log("RESPOSTA:", JSON.stringify(json, null, 2));

    if (json.error) {
      resultado.innerHTML = `<div class="ia-erro">Erro da API: ${json.error.message}</div>`;
      return;
    }

    let textoIA = json.choices[0].message.content.trim();
    textoIA = textoIA.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

    let dados_ia;
    try {
      dados_ia = JSON.parse(textoIA);
    } catch (e) {
      resultado.innerHTML = `
        <div class="ia-resultado">
          <div class="ia-resultado-header">
            <div class="ia-resultado-header-dot"></div>
            <h3>Análise para ${nomePet}</h3>
          </div>
          <div class="ia-resultado-body">
            <div class="ia-bloco ia-bloco-recomendado">
              <div class="ia-bloco-titulo">Resultado</div>
              <div class="ia-bloco-texto">${textoIA.replace(/\n/g, "<br>")}</div>
            </div>
          </div>
        </div>`;
      return;
    }

    // Busca as fotos do anfitrião recomendado no mock.json
    const anfRecomendado = dados.anfitrioes.find(
      a => a.nome.toLowerCase() === dados_ia.recomendado.nome.toLowerCase()
    );
    const fotos = anfRecomendado && anfRecomendado.fotos && anfRecomendado.fotos.length > 0
      ? anfRecomendado.fotos : [];

    // Monta galeria de fotos se houver
    const galeriaHTML = fotos.length > 0 ? `
      <div class="ia-bloco ia-bloco-fotos">
        <div class="ia-bloco-titulo">Fotos do local</div>
        <div class="ia-galeria">
          ${fotos.map(f => `
            <figure class="ia-galeria-item">
              <img src="${f.src}" alt="${f.legenda}" loading="lazy" />
              <figcaption>${f.legenda}</figcaption>
            </figure>`).join("")}
        </div>
      </div>` : "";

    // Monta barras de pontuação
    const barras = dados_ia.pontuacoes.map(p => {
      const pct = Math.round((p.nota / 10) * 100);
      return `
        <div class="ia-nota-item">
          <span class="ia-nota-nome">${p.nome}</span>
          <div class="ia-nota-barra-bg">
            <div class="ia-nota-barra" style="width:0%" data-largura="${pct}%"></div>
          </div>
          <span class="ia-nota-valor">${p.nota.toFixed(1)}</span>
        </div>
        <div class="ia-nota-motivo">${p.motivo}</div>`;
    }).join("");

    const agora = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    resultado.innerHTML = `
      <div class="ia-resultado">
        <div class="ia-resultado-header">
          <div class="ia-resultado-header-dot"></div>
          <h3>Análise para ${nomePet} &mdash; ${nomeTutor}</h3>
          <span>Gerado às ${agora}</span>
        </div>
        <div class="ia-resultado-body">
          <div class="ia-bloco ia-bloco-recomendado">
            <div class="ia-bloco-titulo">Anfitrião recomendado</div>
            <div class="ia-bloco-texto">
              <strong class="ia-nome-destaque">${dados_ia.recomendado.nome}</strong>
              <span class="ia-justificativa">${dados_ia.recomendado.justificativa}</span>
            </div>
          </div>
          ${galeriaHTML}
          <div class="ia-bloco ia-bloco-seguranca">
            <div class="ia-bloco-titulo">Pontuação de segurança</div>
            <div class="ia-notas">${barras}</div>
          </div>
          <div class="ia-bloco ia-bloco-dica">
            <div class="ia-bloco-titulo">Sugestão de melhoria</div>
            <div class="ia-bloco-texto">${dados_ia.dica}</div>
          </div>
        </div>
        <div class="ia-resultado-footer">
          <span>Análise baseada nos perfis cadastrados na plataforma</span>
          <button class="ia-nova-busca-btn" onclick="document.getElementById('resultado-ia').innerHTML=''">Nova busca</button>
        </div>
      </div>`;

    setTimeout(() => {
      document.querySelectorAll(".ia-nota-barra").forEach(b => {
        b.style.width = b.dataset.largura;
      });
    }, 80);

  } catch (erro) {
    console.error("ERRO:", erro);
    resultado.innerHTML = `
      <div class="ia-erro">
        Erro ao conectar com a IA.<br>
        <small>${erro.message}</small>
      </div>`;
  }
}