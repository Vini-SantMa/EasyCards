# EasyCards https://easycards-frontend.vercel.app/

O EasyCards é uma aplicação de flashcards voltada para o estudo através de Repetição Espaçada. O projeto visa simplificar a criação de cards utilizando Inteligência Artificial para extrair conceitos de textos e oferecer suporte pedagógico durante as revisões.  
## Stack Tecnológica

    Frontend: React 18, Vite e CSS3.  

    Backend: Python 3 e FastAPI.  

    Banco de Dados: Supabase (PostgreSQL).  

    IA: Modelo Llama 3.1 via Groq API.  

    Autenticação: Supabase Auth.  

##Como Funciona

    Criação: O usuário pode criar cards manualmente (com suporte a anexos de referência) ou fornecer um texto para que a IA gere automaticamente sugestões de perguntas e respostas.  

    Algoritmo: O sistema utiliza duas lógicas de repetição: uma para cards manuais (fator 2.5x) e outra para cards de IA (fator 1.5x).  

    Revisão: A API filtra cards cuja data de revisão expirou. O usuário atribui uma nota (0, 3 ou 5) que define o próximo intervalo no banco de dados.  

    Tutor: Em caso de dificuldade, o usuário pode solicitar uma explicação breve (até 3 linhas) gerada por IA sobre o conteúdo do card.  

##Instalação e Execução
Backend

    Acesse o diretório /backend.  

    Crie e ative um ambiente virtual (venv).  

    Instale as dependências: pip install fastapi uvicorn supabase openai python-dotenv pydantic.  

    Configure as chaves GROQ_API_KEY, SUPABASE_URL e SUPABASE_KEY no arquivo .env.  

    Execute: uvicorn main:app --reload.  

Frontend

    Acesse o diretório /frontend.  

    Instale as dependências: npm install.  

    Configure o cliente do Supabase no arquivo supabaseClient.js.  

    Execute: npm start ou npm run dev.

Para explicações detalhadas e aprofundadas do projeto, acesse o arquivo DOCUMENTACAO.md, disponibilizado neste repositório.
