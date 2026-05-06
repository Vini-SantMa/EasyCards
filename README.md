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

## Padrão Criacional: Abstract Factory 

## Para que serve?
O Abstract Factory serve para garantir a criação de "famílias" de objetos que precisam obrigatoriamente trabalhar juntos. Em vez de criar peças soltas e correr o risco de montá-las de forma incompatível, o padrão centraliza a lógica em uma fábrica que entrega um "combo" completo. É como um kit: ele garante que os componentes sempre combinem perfeitamente entre si.

## Onde será aplicado e por que a escolha?
O padrão será aplicado para refatorar a função processo_revisao (na rota /processo-revisao), substituindo a criação direta dos objetos por uma nova estrutura baseada na classe FabricaDeCards. A escolha se justifica por um bug de inconsistência identificado exatamente nessa rota do código original: o sistema recuperava o algoritmo da IA corretamente, mas acabava instanciando-o de forma engessada dentro de uma classe Cardmanual.

O Abstract Factory resolve esse problema delegando a criação para fábricas específicas que definem "combos" consistentes:

    Fábrica Manual: Responsável pelo conjunto Cardmanual + AlgoritmoRepEspacada.

    Fábrica IA: Responsável pelo conjunto CardIA + AlgoritmoIA.
    
Essa estratégia elimina a necessidade de condicionais (if/else) confusos no código principal e garante que os tipos de cards e as lógicas de revisão sejam sempre compatíveis, deixando o sistema pronto para expansões seguras.



Para explicações detalhadas e aprofundadas do projeto, acesse o arquivo DOCUMENTACAO.md, disponibilizado neste repositório.
