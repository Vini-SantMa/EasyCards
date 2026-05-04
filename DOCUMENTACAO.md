#  EasyCards - Documentação Técnica Completa

##  Sumário

1. [Visão Geral do Projeto](#-visão-geral-do-projeto)
2. [Funcionalidades Implementadas](#-funcionalidades-implementadas)
3. [Definições Herança e Polimorfismo](#-herança-polimorfismo)
4. [Arquitetura do Sistema](#-arquitetura-do-sistema)
5. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
6. [Configuração do Ambiente](#-configuração-do-ambiente)
7. [Estrutura do Backend](#-estrutura-do-backend)
8. [Estrutura do Frontend](#-estrutura-do-frontend)
9. [Banco de Dados](#-banco-de-dados)
10. [Fluxo de Funcionamento](#-fluxo-de-funcionamento)
11. [Guia de Instalação](#-guia-de-instalação)
12. [Algoritmos de Repetição Espaçada](#-algoritmos-de-repetição-espaçada)
13. [Possíveis Melhorias Futuras](#-possíveis-melhorias-futuras)

---

##  Visão Geral do Projeto

**EasyCards** é uma aplicação web de flashcards inteligente que utiliza **repetição espaçada** e **inteligência artificial** para otimizar o processo de memorização e aprendizado. O sistema foi desenvolvido como projeto acadêmico, com foco em facilitar a criação e revisão de flashcards de forma intuitiva e eficiente.

### Objetivo Principal

Criar uma plataforma de estudos que:
- Elimine a barreira de entrada para novos usuários através da geração automática de cards por IA
- Utilize algoritmos de repetição espaçada para maximizar a retenção de informação
- Ofereça feedback contextualizado através de um tutor IA
- Gamifique o processo de aprendizado com sistema de streaks e estatísticas

---

## Funcionalidades Implementadas

### Autenticação de Usuários (Cadastro e login)
-  Cadastro de novos usuários
-  Login/Logout com Supabase Auth
-  Sessão persistente

### Criação  Manual de Flashcards
-  **Criação manual** de cards (frente, verso e anexo/referência opcional)
-  Organização em decks temáticos

### Algoritmo de Repetição Espaçada
-  Dois algoritmos distintos:
  - `AlgoritmoRepEspacada`: Para cards manuais (multiplicador 2.5x)
  - `AlgoritmoIA`: Para cards gerados por IA (multiplicador 1.5x)
-  Cálculo automático da próxima revisão baseado no desempenho

### Quadro de Desempenho
-  Estatísticas de maturidade do conhecimento:
  -  **Aprendendo**: Intervalo < 3 dias,  **Familiar**: Intervalo entre 3-21 dias, **Dominado**: Intervalo > 21 dias
-  Taxa de domínio geral

### Identificador de pontos fracos
Acompanha erros frequentes
Evidencia os pontos fracos

### Criação Automática de Cards
 **Geração automática por IA** a partir de texto contextual do usuário
-  Edição de cards gerados pela IA antes de salvar

### Feedbacks Orgânicos
-Atribuição de percepção de dificuldade do usuário
- Associa notas para os cards individualmente

### Contextualização de Conteudo
Atribuir links e metadados aos cards
Referenciar a fonte do conhecimento, para auxilio no processo de aprendizado


### Tutor IA Contextualizado
-  Explicações personalizadas para cards difíceis
-  Dicas e analogias
-  Contextualização da resposta correta

---

##  Herança Polimorfismo

Para garantir que o EasyCards seja um sistema extensível, de fácil manutenção e com baixo acoplamento, o núcleo da aplicação foi fundamentado em três pilares da Engenharia de Software. Abaixo, detalhamos como a Herança, a Abstração e o Polimorfismo foram implementados na prática.
### Herança Normal

A herança clássica foi utilizada para promover o reuso de código. As classes filhas herdam todos os atributos e métodos da classe pai, focando apenas em adicionar suas próprias especializações.  
O Trecho no Código:
```python
# Classe Pai (Superclasse)
class BaseCard(ABC):
    def __init__(self, frente, verso, estrategia: EstrategiaRevisao):
        self.frente = frente
        self.verso = verso
        self.intervalo = 0
        self.estrategia = estrategia
    
    def revisao(self, nota: int): # Método comum a todos os cards
        data_proxima, self.intervalo = self.estrategia.calculo_proxima(self, nota)
        return data_proxima

# Classe Filha (Especialização)
class Cardmanual(BaseCard):
    def __init__(self, frente, verso, estrategia, anexo=None):
        super().__init__(frente, verso, estrategia) # Reutiliza a lógica da classe pai
        self.anexo = anexo # Atributo exclusivo deste tipo de card
``` 
Justificativa: A classe Cardmanual "ganha" automaticamente o método revisao e as propriedades básicas. Não precisamos reescrever a lógica principa

### Herança Abstrata 

Enquanto a herança normal foca em reaproveitar código pronto, a Herança Abstrata foca em definir regras (um contrato). A superclasse não sabe como fazer o trabalho, ela apenas dita o que deve ser feito.  

O Trecho no Código:
```Python

# Superclasse Abstrata (O Contrato)
class EstrategiaRevisao(ABC):
    @abstractmethod
    def calculo_proxima(self, card, nota: int):
        pass # Não possui corpo, é apenas uma exigência arquitetural

# Subclasse Concreta (A Implementação)
class AlgoritmoIA(EstrategiaRevisao):
    def calculo_proxima(self, card, nota: int):
        # A subclasse é OBRIGADA a implementar esta lógica
        if nota >= 3:
            intervalo_novo = max(1, round(card.intervalo * 1.5))
        else: 
            intervalo_novo = 0
        return datetime.now() + timedelta(days=intervalo_novo), intervalo_novo
```

Justificativa: Foi utilizado o módulo abc do Python para criar uma interface. Qualquer nova lógica de cálculo criada no futuro deverá herdar essa classe e implementar o método calculo_proxima

### Polimorfismo

O Polimorfismo está presente na lógica de revisão. Ele não é só a existência de métodos de mesmo nome, mas sim a possibilidadee de tratar diferentes objetos através de uma chamada comum, onde o comportamento real é decidido em tempo de execução.  
O polimorfismo acontece na relação entre a classe BaseCard e a abstração EstrategiaRevisao.  
```Python

class BaseCard(ABC):
    def __init__(self, frente, verso, estrategia: EstrategiaRevisao):
        self.estrategia = estrategia # Guardamos uma REFERÊNCIA DA SUPERCLASSE

    def revisao(self, nota: int):
        # AQUI É A INVOCAÇÃO POLIMÓRFICA:
        data_proxima, self.intervalo = self.estrategia.calculo_proxima(self, nota)
        return data_proxima
```

Obs: O método revisao é cego, alheio ao que será utilizado. Ele não sabe se está usando o algoritmo de IA ou o de Repetição Espaçada. Ele apenas envia um comando para a variável self.estrategia.  O Python só descobrirá o algoritmo a ser usado no momento exato da chamada. Sem o polimorfismo, teria de ter um if else para identificar o tipo de card e aí sim, implementar o algoritmo correspondente.

---

##  Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Dashboard   │  │ Criar Cards  │  │   Revisar    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  Meus Decks  │  │ Autenticação │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Rotas da API                        │   │
│  │  • /criar-deck           • /estatisticas/{user_id}   │   │
│  │  • /criar-card-manual    • /streak/{user_id}         │   │
│  │  • /gerar-cards-ia       • /tutor-ia                 │   │
│  │  • /salvar-cards-ia      • /processo-revisao         │   │
│  │  • /cards-para-revisar   • /revisar-card             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Camada de Negócios (POO)                   │   │
│  │  • EstrategiaRevisao (ABC)                           │   │
│  │  • AlgoritmoRepEspacada                              │   │
│  │  • AlgoritmoIA                                       │   │
│  │  • BaseCard (ABC)                                    │   │
│  │  • CardManual                                        │   │
│  │  • CardIA                                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      SERVIÇOS EXTERNOS                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Supabase    │  │  Groq API    │  │  OpenAI API  │       │
│  │  (PostgreSQL)│  │  (Llama 3.1) │  │  Compatible  │       │
│  │  + Auth      │  │              │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```


---

##  Tecnologias Utilizadas

### Backend
- **Python 3**
- **FastAPI** - Framework web moderno e rápido
- **Pydantic** - Validação de dados
- **Supabase Python Client** - Interação com banco de dados
- **OpenAI SDK** - Integração com IA (via Groq API)
- **python-dotenv** - Gerenciamento de variáveis de ambiente
- **CORS Middleware** - Comunicação entre frontend e backend

### Frontend
- **React 18** com Vite
- **JavaScript**
- **Supabase JS Client** - Autenticação e comunicação com o banco
- **CSS3** - Estilização customizada
- **Fetch API** - Requisições HTTP

### Infraestrutura
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL
  - Authentication
  - Real-time subscriptions
- **Groq API** - LLM inference (modelo Llama 3.1-8b-instant)
- **Render** - Deploy do backend (https://easycards-api.onrender.com)

### Inteligência Artificial
- **Llama 3.1 8B Instant** (via Groq)
  - Geração de flashcards a partir de texto
  - Tutor IA para explicações contextualizadas

---

##  Configuração do Ambiente

### Variáveis de Ambiente

O projeto utiliza arquivos `.env` para gerenciar credenciais e configurações sensíveis.

#### Backend (.env)
```env
# Groq API (IA)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Supabase
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Frontend (arquivo de configuração Supabase)
Criar arquivo `supabaseClient.js`:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xxxxxxxxxxxxx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 📁 Estrutura do Backend

### Arquitetura de Classes (POO)

```python

class EstrategiaRevisao(ABC):
    @abstractmethod
    def calculo_proxima(self, card, nota: int):
        pass

class AlgoritmoRepEspacada(EstrategiaRevisao):
    # Multiplicador: 2.5x (mais agressivo)
    # Usado para cards manuais
    
class AlgoritmoIA(EstrategiaRevisao):
    # Multiplicador: 1.5x (mais conservador)
    # Usado para cards gerados por IA

# CARDS (Base Classes)
class BaseCard(ABC):
    def __init__(self, frente, verso, estrategia: EstrategiaRevisao):
        self.frente = frente
        self.verso = verso
        self.intervalo = 0
        self.estrategia = estrategia
    
    def revisao(self, nota: int):
        data_proxima, self.intervalo = self.estrategia.calculo_proxima(self, nota)
        return data_proxima

class Cardmanual(BaseCard):
    # Card criado manualmente pelo usuário
    # Pode ter um anexo (link, referência)
    
class CardIA(BaseCard):
    # Card gerado por IA
    # Armazena o contexto original
```

### Fluxo de Cálculo de Revisão

```python
def calculo_proxima(self, card, nota: int):
    if nota >= 3:  # Acertou ou foi difícil
        intervalo_novo = max(1, round(card.intervalo * 2.5))
    else:  # Errou
        intervalo_novo = 0  # Volta para o início
    
    return datetime.now() + timedelta(days=intervalo_novo), intervalo_novo
```

### Sistema de Erros Consecutivos

```python
# Lógica implementada em /processo-revisao
erros_atuais = dados.get('erros_consecutivos', 0)
if req.nota < 3:
    novos_erros = erros_atuais + 1  # Incrementa
else:
    novos_erros = 0  # Reseta ao acertar
```

Cards com **3 ou mais erros consecutivos** são marcados como pontos fracos e aparecem no dashboard como pontos fracos.

---

## 🎨 Estrutura do Frontend

### Estados Principais

```javascript
// Autenticação
const [session, setSession] = useState(null)
const [emailAuth, setEmailAuth] = useState('')
const [senhaAuth, setSenhaAuth] = useState('')

// Navegação
const [aba, setAba] = useState('dashboard')

// Cards e Decks
const [texto, setTexto] = useState('')
const [cardsIA, setCardsIA] = useState([])
const [cardsRevisao, setCardsRevisao] = useState([])
const [cardAtualIdx, setCardAtualIdx] = useState(0)
const [listaDecks, setListaDecks] = useState([])
const [idDeckAtivo, setIdDeckAtivo] = useState(null)

// Estatísticas
const [estatisticas, setEstatisticas] = useState({...})
const [streak, setStreak] = useState(0)

// Tutor IA
const [explicacaoTutor, setExplicacaoTutor] = useState(null)
const [carregandoTutor, setCarregandoTutor] = useState(false)
```

### Componentes Principais (Abas)

1. **Dashboard** (`aba === 'dashboard'`)
   - Estatísticas gerais
   - Maturidade do conhecimento
   - Alertas de pontos fracos

2. **Criar Cards** (`aba === 'gerar'`)
   - Criação manual de cards
   - Geração automática por IA
   - Edição de cards gerados

3. **Estudar Hoje** (`aba === 'revisar'`)
   - Sessão de revisão
   - Sistema de notas (0, 3, 5)
   - Botão "Mostrar Resposta"
   - Tutor IA opcional

4. **Meus Decks** (`aba === 'meus_decks'`)
   - Lista de decks
   - Visualização de cards por deck

### Fluxo de Autenticação

```javascript
// Ao carregar a página
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })
  
  return () => subscription.unsubscribe()
}, [])

// Se não houver sessão, mostra tela de login
if (!session) {
  return <TelaDeLogin />
}
```

---

##  Banco de Dados

### Tabelas no Supabase (PostgreSQL)

#### 1. `decks`
```sql
CREATE TABLE decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Campos:**
- `id`: Identificador único do deck
- `nome`: Nome do deck (ex: "Estudos de Biologia")
- `user_id`: ID do usuário proprietário
- `created_at`: Data de criação

---

#### 2. `flashcards`
```sql
CREATE TABLE flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    frente TEXT NOT NULL,
    verso TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('manual', 'IA')),
    intervalo INTEGER DEFAULT 0,
    proxima_revisao TIMESTAMP DEFAULT NOW(),
    erros_consecutivos INTEGER DEFAULT 0,
    metadata TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Campos:**
- `id`: Identificador único do card
- `deck_id`: Deck ao qual pertence
- `user_id`: Dono do card
- `frente`: Pergunta do flashcard
- `verso`: Resposta do flashcard
- `tipo`: "manual" ou "IA"
- `intervalo`: Intervalo atual em dias
- `proxima_revisao`: Data/hora da próxima revisão
- `erros_consecutivos`: Contador de erros (para Leeches)
- `metadata`: Campo opcional para anexos/referências
- `created_at`: Data de criação

---

#### 3. `user_stats`
```sql
CREATE TABLE user_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    streak INTEGER DEFAULT 0,
    ultima_revisao DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Campos:**
- `id`: Identificador único
- `user_id`: Usuário associado (único)
- `streak`: Dias consecutivos de estudo
- `ultima_revisao`: Data da última revisão
- `created_at`: Data de criação do registro

---


## 🔄 Fluxo de Funcionamento

### 1. Fluxo de Criação de Deck e Cards

```
1. Usuário entra na aba "Criar Cards"
2. Digita o nome do deck → Clica em "Criar Deck"
3. Backend cria registro em `decks` e retorna o ID
4. Frontend armazena o `idDeckAtivo`

5. OPÇÃO A - Manual:
   - Preenche frente, verso, anexo
   - Clica "Salvar Card Manual"
   - Backend cria em `flashcards` com tipo="manual"

6. OPÇÃO B - IA:
   - Cola texto contextual
   - Clica "Extrair Cards"
   - Backend envia para Groq API (Llama 3.1)
   - IA retorna JSON com 3 cards
   - Frontend exibe para edição
   - Usuário clica "Salvar Tudo"
   - Backend cria múltiplos registros com tipo="IA"
```

---

### 2. Fluxo de Revisão de Cards

```
1. Usuário entra na aba "Estudar Hoje"
2. Frontend chama GET /cards-para-revisar/{user_id}
3. Backend busca cards onde proxima_revisao <= NOW()
4. Frontend exibe o primeiro card (só a frente)

5. Usuário clica "Mostrar Resposta"
6. Frontend revela o verso

7. Usuário avalia (0, 3 ou 5):
   - 0: Errei totalmente
   - 3: Difícil, mas acertei
   - 5: Fácil

8. Frontend envia POST /processo-revisao com card_id e nota
9. Backend:
   - Busca o card no banco
   - Identifica o tipo (manual/IA) e escolhe algoritmo
   - Atualiza erros_consecutivos
   - Calcula novo intervalo
   - Calcula proxima_revisao
   - Salva no banco
   - Atualiza/cria user_stats (streak)

10. Frontend avança para próximo card ou finaliza sessão
```

---

### 3. Fluxo do Tutor IA

```
1. Usuário está na revisão, vê a resposta
2. Clica "Pedir dica ao Tutor IA"
3. Frontend envia POST /tutor-ia com frente e verso
4. Backend:
   - Monta prompt explicativo
   - Envia para Groq API (Llama 3.1)
   - LLM retorna explicação curta (máx 3 linhas)
5. Frontend exibe a explicação na tela
```

---

## 📥 Guia de Instalação

### Pré-requisitos

- **Python 3.8+**
- **Node.js 16+** e npm
- **Git**
- Conta no **Supabase**
- Chave de API do **Groq**

---

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/easycards.git
cd easycards
```

---

### Passo 2: Configurar o Backend

```bash
# Criar ambiente virtual Python
python -m venv venv

# Ativar o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install fastapi uvicorn python-dotenv supabase openai pydantic

# Criar arquivo .env na raiz
GROQ_API_KEY=sua_chave_groq
SUPABASE_URL=https://seu_projeto.supabase.co
SUPABASE_KEY=sua_chave_supabase

# Rodar o servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend estará rodando em `http://localhost:8000`

---

### Passo 3: Configurar o Banco de Dados (Supabase)

1. Criar conta em [supabase.com](https://supabase.com)
2. Criar novo projeto
3. No SQL Editor, executar:

```sql
-- Criar tabela de decks
CREATE TABLE decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de flashcards
CREATE TABLE flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_id UUID REFERENCES decks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    frente TEXT NOT NULL,
    verso TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('manual', 'IA')),
    intervalo INTEGER DEFAULT 0,
    proxima_revisao TIMESTAMP DEFAULT NOW(),
    erros_consecutivos INTEGER DEFAULT 0,
    metadata TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Criar tabela de estatísticas do usuário
CREATE TABLE user_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    streak INTEGER DEFAULT 0,
    ultima_revisao DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (usuários só veem seus próprios dados)
CREATE POLICY "Users can view own decks" ON decks
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own decks" ON decks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own cards" ON flashcards
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own cards" ON flashcards
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own cards" ON flashcards
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON user_stats
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own stats" ON user_stats
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own stats" ON user_stats
    FOR UPDATE USING (auth.uid() = user_id);
```

4. Copiar a **URL** e a **anon key** do projeto

---

### Passo 4: Configurar o Frontend

```bash
# Criar projeto React com Vite
npm create vite@latest frontend -- --template react
cd frontend

# Instalar dependências
npm install @supabase/supabase-js

# Criar arquivo src/supabaseClient.js
# (ver seção de Configuração do Ambiente acima)

# Copiar App.jsx e App.css do repositório

# Rodar o frontend
npm run dev
```

Frontend estará rodando em `http://localhost:5173`

---

### Passo 5: Obter Chave da Groq API

1. Acessar [console.groq.com](https://console.groq.com)
2. Criar conta
3. Gerar API Key
4. Adicionar ao `.env` do backend

---


## 🧠 Algoritmos de Repetição Espaçada

### Conceito Fundamental

A **repetição espaçada** é uma técnica de aprendizado baseada no efeito de espaçamento: revisar informações em intervalos crescentes melhora a retenção de longo prazo.

### Implementação no EasyCards

#### Algoritmo 1: Cards Manuais (AlgoritmoRepEspacada)

```python
def calculo_proxima(self, card, nota: int):
    if nota >= 3:  # Acertou (difícil ou fácil)
        intervalo_novo = max(1, round(card.intervalo * 2.5))
    else:  # Errou (nota 0)
        intervalo_novo = 0  # Reinicia
    
    return datetime.now() + timedelta(days=intervalo_novo), intervalo_novo
```

**Progressão:**
- Intervalo 0 (novo) → acertou → 1 dia
- Intervalo 1 → acertou → 2 dias (1 * 2.5 = 2.5, arredonda para 2)
- Intervalo 2 → acertou → 5 dias ....

---

#### Algoritmo 2: Cards de IA (AlgoritmoIA)

```python
def calculo_proxima(self, card, nota: int):
    if nota >= 3:
        intervalo_novo = max(1, round(card.intervalo * 1.5))
    else:
        intervalo_novo = 0
    
    return datetime.now() + timedelta(days=intervalo_novo), intervalo_novo
```

**Motivação:** Cards gerados por IA podem ser menos precisos ou contextualizados, então usamos um multiplicador menor (1.5x) para revisões mais frequentes.

**Progressão:**
- Intervalo 0 → acertou → 1 dia
- Intervalo 1 → acertou → 1 dia (1 * 1.5 = 1.5, arredonda para 1)
- Intervalo 1 → acertou → 2 dias ....
---
---

### Identificação de Pontos fracos

Cards com **3 ou mais erros consecutivos** são marcados como "Leeches" (sanguessugas/ pontos fracos):

```python
erros_consecutivos >= 3  # Ponto fraco identificado
```

Esses cards aparecem em destaque no dashboard para revisão adicional.

---
## Possíveis Melhorias Futuras

### Funcionalidades

1. **Sistema de Tags/Categorias**
   - Adicionar tags aos cards (ex: "difícil", "importante", "revisar mais")
   - Filtros por tags no quadro de desempenho

2. **Estatísticas Avançadas**
   - Gráficos de progresso ao longo do tempo
   - Heatmap de dias estudados
   - Tempo médio de revisão por card

3. **Notificações Push**
   - Lembrete diário para estudar
   - Alerta quando há cards para revisar

4. **Revisão por Voz**
   - Speech-to-text para avaliar respostas faladas
   - Text-to-speech para ler cards

5. ** Melhorias no Design**
   - Deixar o app mais atraente visualmente
   - Adicionar animações dos cards virando
   - Melhor uso de cores e disposição dos elementos visuais
  
6. **Autenticação**
   - Adicionar autenticação de login usando o google, sem depender do auth do supabase

7. **Tratamento de Input do usuário**
   - Melhorar a lógica de limpeza dos textos escritos pelo user na criação dos cards
   - Deixar explicito ao usuario como devem ser os inputs
   - Lógica para tratamento de erros.

8. **Retorno dos contextos de referência**
   - Ao invés de mostrar o link para o metadado, deixar o acesso explicito dentro do webapp (ex: a miniatura da thumb do youtube)
   - Permitir o armazenamento de arquivos de imagem (jpg, png) e mostrar dentro do card, no momento de revisao.

9. **Mais Opções de Gerenciamento**
    - Permitir novas ações de gestão dos cards e decks
    - Excluir cards e decks do Banco de dados

---




### Contato e Suporte

Para dúvidas ou problemas:

1. Consultar documentação oficial:
   - [FastAPI Docs](https://fastapi.tiangolo.com)
   - [React Docs](https://react.dev)
   - [Supabase Docs](https://supabase.com/docs)
   - [Groq API Docs](https://console.groq.com/docs)
     
2. Entre em contato: viniciusantana76@gmail.com
---



## 📚 Referências

- [Spaced Repetition - Wikipedia](https://en.wikipedia.org/wiki/Spaced_repetition)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Groq Cloud Platform](https://console.groq.com)
- [Anki - Popular Flashcard App](https://apps.ankiweb.net)

---

