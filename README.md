# 🐾 PetHost — Plataforma Colaborativa de Hospedagem para Pets

> Plataforma web que conecta tutores de pets a anfitriões de confiança em João Pessoa - PB, com sistema de recomendação inteligente baseado em Inteligência Artificial.

---

## 📌 Sobre o Projeto

O **PetHost** é uma plataforma colaborativa e gratuita onde tutores encontram anfitriões para hospedar seus pets com segurança e compatibilidade. O diferencial do projeto é a integração de IA para recomendar automaticamente o anfitrião mais adequado com base no perfil do pet e nas necessidades do tutor.

---

## 🤖 Sistema de Recomendação com IA

O usuário informa os dados do pet e a IA analisa os perfis dos anfitriões disponíveis, retornando:

- ✅ **Anfitrião recomendado** com justificativa detalhada
- 📊 **Pontuação de segurança** com barras animadas para cada anfitrião
- 💡 **Sugestão de melhoria** de perfil para o anfitrião recomendado
- 🖼️ **Fotos do local** quando disponíveis no perfil do anfitrião

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura e semântica das páginas |
| CSS3 | Estilização, animações e responsividade |
| JavaScript (Vanilla) | Lógica, manipulação do DOM e chamadas à API |
| JSON | Simulação do banco de dados (mock.json) |
| OpenRouter API | Acesso aos modelos de linguagem (LLM) |
| Prompt Engineering | Estruturação das instruções para a IA |
| Font Awesome | Ícones da interface |

---

## 📁 Estrutura do Projeto

PetHost/
├── CSS/
│ └── styles.css # Estilos globais e da seção de IA
├── img/
│ ├── logo1.png
│ ├── sala.png # Foto do local da anfitrião
│ ├── quarto.png # Foto do local da anfitrião
│ ├── teste1.png
│ └── teste1.1.png
├── index.html # Página principal
├── ia-recomendacao.js # Lógica do sistema de recomendação com IA
├── mock.json # Dados simulados dos anfitriões
└── README.md

---

## ⚙️ Como Executar Localmente

**Pré-requisito:** ter Python instalado.

```bash
# 1. Clone o repositório
git clone https://github.com/Carla-DEVP/PetHost.git

# 2. Acesse a pasta do projeto
cd PetHost

# 3. Inicie o servidor local
python -m http.server 8080

# 4. Acesse no navegador
http://localhost:8080
```

---

## 🔑 Configuração da Chave de API

1. Crie uma conta gratuita em [openrouter.ai](https://openrouter.ai)
2. Gere uma chave de API em **Keys → Create Key**
3. No arquivo `ia-recomendacao.js`, substitua na linha 1:

```javascript
const GEMINI_API_KEY = "sk-or-SUA_CHAVE_AQUI";
```

---

## 🔄 Fluxo do Sistema de IA

Usuário preenche o formulário
↓
JavaScript lê os anfitriões do mock.json
↓
Monta o prompt com os dados do tutor + anfitriões
↓
fetch envia requisição HTTP para a API da OpenRouter
↓
IA processa e retorna resposta em JSON
↓
JSON.parse() interpreta a resposta
↓
Sistema renderiza o resultado na tela


---

## 👩‍💻 Autora

**Carla Guimarães de Medeiros**
Estudante de Análise e Desenvolvimento de Sistemas

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/carlaguimaraesdemedeiros)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Carla-DEVP)

---

## 🏫 Informações Acadêmicas

| | |
|---|---|
| **Disciplina** | Prática Integradora |
| **Curso** | Análise e Desenvolvimento de Sistemas |
| **Instituição** | Sectras — Ensino Superior em Ciências e Tecnologia |
| **Ano** | 2026 |

---

<p align="center">Feito com dedicação por Carla Guimarães de Medeiros 🐾</p> 