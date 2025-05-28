# Guia Prático de Trabalho em Equipe - Projeto PetHost

**Lembre-se sempre de seguir esses passos para manter o projeto organizado e evitar problemas com o código:**

---

### 1. Sempre atualize o projeto antes de começar a trabalhar

Antes de abrir o projeto no seu computador, abra o terminal na pasta do projeto e rode o comando:

```bash
git pull origin master

Isso garante que você está trabalhando com a versão mais atualizada do código.

2. Faça pequenas alterações e commits frequentes
Evite trabalhar por muito tempo sem salvar suas mudanças no Git. Para isso:

Faça pequenas alterações de cada vez.

Salve o progresso com commits frequentes usando:

git add .
git commit -m "Descrição clara do que foi feito"

3. Envie suas mudanças para o repositório remoto
Quando terminar um conjunto de alterações, envie para o GitHub com:

git push origin master

4. Caso receba uma mensagem de conflito ao dar git pull
Abra os arquivos indicados no conflito.

Localize as partes conflitantes, que estarão marcadas assim:

<<<<<<< HEAD
(seu código local)
=======
(código do repositório remoto)
>>>>>>> master

Escolha o que deve ficar (você pode juntar os dois códigos).

Apague as marcas de conflito (<<<<<<<, =======, >>>>>>>).

Salve o arquivo.

Depois, finalize com:

git add nome-do-arquivo-com-conflito
git commit -m "Conflito resolvido no arquivo nome-do-arquivo"
git push origin master


5. Comunicação é tudo!
Se tiver dúvida, sempre converse com a outra pessoa antes de fazer grandes mudanças.

Combinar antes ajuda a evitar conflitos e retrabalho.
