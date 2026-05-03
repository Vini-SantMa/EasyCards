# 🧠 EasyCards - Documentação Técnica Completa

## 📋 Sumário

1. [Visão Geral do Projeto](#-visão-geral-do-projeto)
2. [Funcionalidades Implementadas](#-funcionalidades-implementadas)
3. [Arquitetura do Sistema](#-arquitetura-do-sistema)
4. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
5. [Configuração do Ambiente](#-configuração-do-ambiente)
6. [Estrutura do Backend](#-estrutura-do-backend)
7. [Estrutura do Frontend](#-estrutura-do-frontend)
8. [Banco de Dados](#-banco-de-dados)
9. [Fluxo de Funcionamento](#-fluxo-de-funcionamento)
10. [Guia de Instalação](#-guia-de-instalação)
11. [Endpoints da API](#-endpoints-da-api)
12. [Algoritmos de Repetição Espaçada](#-algoritmos-de-repetição-espaçada)
13. [Sistema de Gamificação](#-sistema-de-gamificação)
14. [Integração com IA](#-integração-com-ia)
15. [Possíveis Melhorias Futuras](#-possíveis-melhorias-futuras)
16. [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral do Projeto

**EasyCards** é uma aplicação web de flashcards inteligente que utiliza **repetição espaçada** e **inteligência artificial** para otimizar o processo de memorização e aprendizado. O sistema foi desenvolvido como projeto acadêmico, com foco em facilitar a criação e revisão de flashcards de forma intuitiva e eficiente.

### Objetivo Principal

Criar uma plataforma de estudos que:
- Elimine a barreira de entrada para novos usuários através da geração automática de cards por IA
- Utilize algoritmos de repetição espaçada para maximizar a retenção de informação
- Ofereça feedback contextualizado através de um tutor IA
- Gamifique o processo de aprendizado com sistema de streaks e estatísticas

---

## ✨ Funcionalidades Implementadas

### Autenticação e Gerenciamento de Usuários
- ✅ Cadastro de novos usuários
- ✅ Login/Logout com Supabase Auth
- ✅ Sessão persistente
- ✅ Controle de acesso por usuário

### Criação de Flashcards
- ✅ **Criação manual** de cards (frente, verso e anexo/referência opcional)
- ✅ **Geração automática por IA** a partir de texto contextual
- ✅ Edição de cards gerados pela IA antes de salvar
- ✅ Organização em decks temáticos

### Algoritmo de Repetição Espaçada
- ✅ Dois algoritmos distintos:
  - `AlgoritmoRepEspacada`: Para cards manuais (multiplicador 2.5x)
  - `AlgoritmoIA`: Para cards gerados por IA (multiplicador 1.5x)
- ✅ Cálculo automático da próxima revisão baseado no desempenho
- ✅ Sistema de intervalos crescentes
- ✅ Identificação de "pontos fracos" (cards com erros consecutivos)

### Dashboard de Desempenho
- ✅ Estatísticas de maturidade do conhecimento:
  - 🌱 **Aprendendo**: Intervalo < 3 dias
  - 🌿 **Familiar**: Intervalo entre 3-21 dias
  - 🌳 **Dominado**: Intervalo > 21 dias
- ✅ Taxa de domínio geral
- ✅ Alerta de "Leeches" (cards com 3+ erros consecutivos)
- ✅ Total de cards no sistema

### Sistema de Gamificação
- ✅ **Streak de dias seguidos** estudando
- ✅ Persistência do streak no banco de dados
- ✅ Resetar streak após inatividade
- ✅ Exibição visual do progresso

### Tutor IA Contextualizado
- ✅ Explicações personalizadas para cards difíceis
- ✅ Dicas mnemônicas e analogias
- ✅ Contextualização da resposta correta
- ✅ Limite de respostas curtas (máximo 3 linhas) para economia de tokens

### Gerenciamento de Decks
- ✅ Criação de decks temáticos
- ✅ Listagem de todos os decks do usuário
- ✅ Visualização de cards dentro de cada deck
- ✅ Associação de cards a decks específicos

### Interface Visual
- ✅ Design intuitivo e responsivo
- ✅ Navegação por abas (Dashboard, Criar Cards, Estudar Hoje, Meus Decks)
- ✅ Feedback visual de status
- ✅ Sistema de cores para diferentes níveis de dificuldade

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │ Criar Cards  │  │   Revisar    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  Meus Decks  │  │ Autenticação │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Rotas da API                        │  │
│  │  • /criar-deck           • /estatisticas/{user_id}  │  │
│  │  • /criar-card-manual    • /streak/{user_id}        │  │
│  │  • /gerar-cards-ia       • /tutor-ia                │  │
│  │  • /salvar-cards-ia      • /processo-revisao        │  │
│  │  • /cards-para-revisar   • /revisar-card            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Camada de Negócios (POO)                   │  │
│  │  • EstrategiaRevisao (ABC)                           │  │
│  │  • AlgoritmoRepEspacada                              │  │
│  │  • AlgoritmoIA                                       │  │
│  │  • BaseCard (ABC)                                    │  │
│  │  • CardManual                                        │  │
│  │  • CardIA                                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      SERVIÇOS EXTERNOS                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Supabase    │  │  Groq API    │  │  OpenAI API  │     │
│  │  (PostgreSQL)│  │  (Llama 3.1) │  │  Compatible  │     │
│  │  + Auth      │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Padrões de Design Implementados

1. **Strategy Pattern**: Para os algoritmos de repetição espaçada
2. **Abstract Base Classes (ABC)**: Para garantir implementação de métodos nas subclasses
3. **Dependency Injection**: Estratégias são injetadas nos cards
4. **RESTful API**: Estrutura clara e semântica de rotas

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.x**
- **FastAPI** - Framework web moderno e rápido
- **Pydantic** - Validação de dados
- **Supabase Python Client** - Interação com banco de dados
- **OpenAI SDK** - Integração com IA (via Groq API)
- **python-dotenv** - Gerenciamento de variáveis de ambiente
- **CORS Middleware** - Comunicação entre frontend e backend

### Frontend
- **React 18** com Vite
- **JavaScript (ES6+)**
- **Supabase JS Client** - Autenticação e comunicação com o banco
- **CSS3** - Estilização customizada
- **Fetch API** - Requisições HTTP

### Infraestrutura
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL Database
  - Authentication
  - Real-time subscriptions
- **Groq API** - LLM inference (modelo Llama 3.1-8b-instant)
- **Render** - Deploy do backend (https://easycards-api.onrender.com)

### Inteligência Artificial
- **Llama 3.1 8B Instant** (via Groq)
  - Geração de flashcards a partir de texto
  - Tutor IA para explicações contextualizadas

---

## ⚙️ Configuração do Ambiente

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
# ESTRATÉGIAS DE REVISÃO (Strategy Pattern)
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

Cards com **3 ou mais erros consecutivos** são marcados como "Leeches" (sanguessugas) e aparecem no dashboard como pontos fracos.

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
   - Alertas de Leeches

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

## 🗄️ Banco de Dados

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

### Relacionamentos

```
users (Supabase Auth)
  ↓ 1:N
decks
  ↓ 1:N
flashcards

users
  ↓ 1:1
user_stats
```

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

## 🔌 Endpoints da API

### Autenticação (Gerenciada pelo Supabase)

Não há endpoints de autenticação no backend Python. Tudo é feito via Supabase Auth no frontend.

---

### Decks

#### `POST /criar-deck`
Cria um novo deck.

**Request Body:**
```json
{
  "nome": "Anatomia Humana",
  "user_id": "uuid-do-usuario"
}
```

**Response:**
```json
{
  "status": "sucesso",
  "id": "uuid-do-deck",
  "nome": "Anatomia Humana"
}
```

---

#### `GET /decks/{user_id}`
Lista todos os decks de um usuário.

**Response:**
```json
{
  "status": "sucesso",
  "decks": [
    {
      "id": "uuid-1",
      "nome": "Biologia",
      "user_id": "uuid-usuario",
      "created_at": "2024-01-01T00:00:00"
    }
  ]
}
```

---

#### `GET /decks/{deck_id}/cards`
Lista todos os cards de um deck específico.

**Response:**
```json
{
  "status": "sucesso",
  "cards": [
    {
      "id": "card-uuid",
      "frente": "Qual é a capital do Brasil?",
      "verso": "Brasília",
      "tipo": "manual",
      "intervalo": 7,
      "proxima_revisao": "2024-01-15T10:00:00"
    }
  ]
}
```

---

### Flashcards

#### `POST /criar-card-manual`
Cria um card manualmente.

**Request Body:**
```json
{
  "deck_id": "uuid-do-deck",
  "user_id": "uuid-do-usuario",
  "frente": "O que é mitocôndria?",
  "verso": "Organela responsável pela produção de energia celular",
  "anexo": "https://wikipedia.org/mitocondria"
}
```

**Response:**
```json
{
  "status": "sucesso"
}
```

---

#### `POST /gerar-cards-ia`
Gera cards automaticamente usando IA.

**Request Body:**
```json
{
  "texto_contexto": "A fotossíntese é o processo pelo qual plantas convertem luz solar em energia química..."
}
```

**Response:**
```json
{
  "status": "sucesso",
  "quantidade": 3,
  "cards": [
    {
      "frente": "O que é fotossíntese?",
      "verso": "Processo de conversão de luz solar em energia química"
    },
    {
      "frente": "Onde ocorre a fotossíntese?",
      "verso": "Nos cloroplastos das células vegetais"
    }
  ]
}
```

---

#### `POST /salvar-cards-ia`
Salva múltiplos cards gerados por IA no banco.

**Request Body:**
```json
{
  "deck_id": "uuid-do-deck",
  "cards": [
    {
      "frente": "Pergunta 1",
      "verso": "Resposta 1",
      "user_id": "uuid-usuario"
    }
  ]
}
```

**Response:**
```json
{
  "status": "sucesso",
  "mensagem": "3 cards salvos corretamente"
}
```

---

### Revisão

#### `GET /cards-para-revisar/{user_id}`
Retorna cards que precisam ser revisados hoje.

**Response:**
```json
{
  "status": "sucesso",
  "cards": [
    {
      "id": "card-uuid",
      "frente": "Qual é a fórmula da água?",
      "verso": "H2O",
      "tipo": "manual",
      "metadata": "https://link-referencia.com"
    }
  ]
}
```

---

#### `POST /processo-revisao`
Processa a revisão de um card e atualiza o intervalo.

**Request Body:**
```json
{
  "card_id": "uuid-do-card",
  "nota": 5
}
```

**Notas possíveis:**
- `0`: Errei completamente
- `3`: Difícil, mas acertei
- `5`: Fácil

**Response:**
```json
{
  "status": "sucesso",
  "erros": 0,
  "novo_intervalo": 18,
  "proxima_data": "2024-02-15"
}
```

---

#### `POST /revisar-card`
Simula uma revisão (endpoint de teste, não usado no frontend).

**Request Body:**
```json
{
  "nota": 5,
  "frente": "Pergunta teste",
  "verso": "Resposta teste"
}
```

---

### Estatísticas

#### `GET /estatisticas/{user_id}`
Retorna estatísticas gerais do usuário.

**Response:**
```json
{
  "status": "sucesso",
  "dados": {
    "total": 150,
    "maturidade": {
      "aprendendo": 45,
      "familiar": 60,
      "dominado": 45
    },
    "pontos_fracos": [
      {
        "frente": "Card difícil 1",
        "erros_consecutivos": 5
      }
    ],
    "taxa_dominio": 30.0
  }
}
```

---

#### `GET /streak/{user_id}`
Retorna o streak de dias seguidos estudando.

**Response:**
```json
{
  "status": "sucesso",
  "streak": 7
}
```

**Regras do Streak:**
- Incrementa quando o usuário revisa pelo menos 1 card no dia
- Reseta se ficar mais de 1 dia sem estudar
- Persiste no banco de dados (`user_stats`)

---

### Tutor IA

#### `POST /tutor-ia`
Solicita explicação contextualizada de um card.

**Request Body:**
```json
{
  "frente": "Qual é a função do ribossomo?",
  "verso": "Síntese de proteínas"
}
```

**Response:**
```json
{
  "status": "sucesso",
  "explicacao": "Pense nos ribossomos como fábricas de proteínas da célula. Eles leem o código do RNA e montam aminoácidos em sequência, como um trem de montagem."
}
```

---

### Teste

#### `GET /`
Endpoint de health check.

**Response:**
```json
{
  "mensagem": "API rodando em arquivo unico"
}
```

---

#### `POST /popular-banco-teste`
Popula o banco com dados de teste (apenas desenvolvimento).

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
- Intervalo 2 → acertou → 5 dias
- Intervalo 5 → acertou → 12 dias
- Intervalo 12 → acertou → 30 dias
- Intervalo 30 → acertou → 75 dias
- **Errou em qualquer ponto → volta para 0**

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
- Intervalo 1 → acertou → 2 dias
- Intervalo 2 → acertou → 3 dias
- Intervalo 3 → acertou → 4 dias
- **Crescimento mais lento que o algoritmo manual**

---

### Sistema de Notas

| Nota | Significado | Efeito |
|------|-------------|---------|
| **0** | Errei completamente | Intervalo volta para 0, erros_consecutivos++ |
| **3** | Difícil, mas acertei | Intervalo multiplica, erros_consecutivos = 0 |
| **5** | Fácil | Intervalo multiplica, erros_consecutivos = 0 |

**Observação:** Notas 3 e 5 têm o mesmo efeito no intervalo. A diferença é psicológica para o usuário.

---

### Identificação de Leeches

Cards com **3 ou mais erros consecutivos** são marcados como "Leeches" (sanguessugas):

```python
erros_consecutivos >= 3  # Ponto fraco identificado
```

Esses cards aparecem em destaque no dashboard para revisão adicional.

---

## 🎮 Sistema de Gamificação

### Streak de Dias Consecutivos

O sistema rastreia quantos dias seguidos o usuário estudou.

#### Lógica de Atualização

```python
# No endpoint /processo-revisao
user_id_do_card = dados['user_id']
hoje = date.today().isoformat()

stats = supabase.table("user_stats").select("*").eq("user_id", user_id_do_card).execute()

if not stats.data:
    # Primeiro dia de estudo!
    supabase.table("user_stats").insert({
        "user_id": user_id_do_card,
        "streak": 1,
        "ultima_revisao": hoje
    }).execute()
else:
    ultima = stats.data[0].get("ultima_revisao")
    streak_atual = stats.data[0].get("streak", 0)
    
    if ultima != hoje:
        # Primeira revisão do dia → +1 no streak
        supabase.table("user_stats").update({
            "streak": streak_atual + 1,
            "ultima_revisao": hoje
        }).eq("user_id", user_id_do_card).execute()
```

#### Proteção contra Quebra de Streak

```python
# No frontend, ao buscar o streak
if ultima_revisao:
    ultima_revisao = date.fromisoformat(ultima_revisao_str)
    hoje = date.today()
    if (hoje - ultima_revisao).days > 1:
        streak_atual = 0  # Perdeu a ofensiva!
```

Se o usuário ficar mais de 1 dia sem estudar, o streak é resetado visualmente.

---

### Elementos Visuais de Gamificação

- 🔥 **Ícone de fogo** ao lado do streak
- 🌱 🌿 🌳 **Ícones de maturidade** para representar níveis de conhecimento
- ⚠️ **Alerta de Leeches** em vermelho no dashboard
- 🎉 **Mensagem de conclusão** ao finalizar revisões

---

## 🤖 Integração com IA

### Modelo Utilizado

- **Llama 3.1 8B Instant** via Groq API
- Velocidade de inferência: ~100 tokens/segundo
- Custo: Gratuito (com limites de rate)

### Casos de Uso

#### 1. Geração de Flashcards

**Prompt:**
```
Atue como assistente de estudos, com foco na criação de flashcards. 
Leia o texto abaixo e extraia os três conceitos mais importantes 
e formate-os como perguntas e respostas sucintas.

Retorne somente um JSON válido no seguinte formato de lista, 
sem explicações extras e sem blocos de código markdown (```json):
[
    {"frente": "pergunta", "verso": "resposta"}
]

Texto: {req.texto_contexto}
```

**Configuração:**
- `model`: "llama-3.1-8b-instant"
- `temperature`: 0.3 (focado e menos criativo, ideal para JSON)
- `max_tokens`: padrão

---

#### 2. Tutor IA Contextualizado

**Prompt:**
```
Aja como um professor particular empático. O aluno está estudando um flashcard:
- Pergunta: {pedido.frente}
- Resposta correta: {pedido.verso}

Ele teve dificuldade em lembrar ou entender. Em no máximo 3 linhas 
(seja muito muito breve), dê uma dica mnemônica, uma analogia simples 
ou um contexto rápido para ajudar a fixar a informação.

Não repita a resposta inteira, dê a explicação, a dica, o que realmente 
vai ajudar e seja séria, você é um tutor de estudos, não precisa de 
gracinhas. Só entregue explicações corretas.
```

**Configuração:**
- `model`: "llama-3.1-8b-instant"
- `max_tokens`: 150 (~3 linhas)
- `temperature`: 0.7 (didático e criativo)

---

### Tratamento de Erros

```python
try:
    response = client.chat.completions.create(...)
    texto_resposta = response.choices[0].message.content
    texto_limpeza = texto_resposta.replace("```json", "").replace("```", "").strip()
    cards_gerados = json.loads(texto_limpeza)
    return {"status": "sucesso", "cards": cards_gerados}
except Exception as e:
    return {"erro": "erro no processamento de IA", "detalhes": str(e)}
```

A limpeza de texto remove possíveis blocos markdown que o LLM possa gerar.

---

## 🚀 Possíveis Melhorias Futuras

### Funcionalidades

1. **Sistema de Tags/Categorias**
   - Adicionar tags aos cards (ex: "difícil", "importante", "revisar mais")
   - Filtros por tags no dashboard

2. **Modo Offline**
   - Service Worker para cache
   - Sincronização quando voltar online

3. **Exportação de Decks**
   - Exportar para CSV, Anki, JSON
   - Importar decks de outras plataformas

4. **Estatísticas Avançadas**
   - Gráficos de progresso ao longo do tempo
   - Heatmap de dias estudados
   - Tempo médio de revisão por card

5. **Notificações Push**
   - Lembrete diário para estudar
   - Alerta quando há cards para revisar

6. **Modo Desafio**
   - Competir com amigos
   - Ranking de streaks
   - Conquistas e badges

7. **Compartilhamento de Decks**
   - Decks públicos da comunidade
   - Importar decks compartilhados

8. **Revisão por Voz**
   - Speech-to-text para avaliar respostas faladas
   - Text-to-speech para ler cards

---

### Melhorias Técnicas

1. **Backend**
   - Migrar para estrutura modular (routers, services, repositories)
   - Implementar cache com Redis
   - Rate limiting para proteção da API
   - Logging estruturado
   - Testes unitários e de integração
   - CI/CD pipeline

2. **Frontend**
   - Migrar para TypeScript
   - Componentização (separar em arquivos)
   - Estado global com Context API ou Zustand
   - Testes com Vitest/React Testing Library
   - PWA (Progressive Web App)
   - Skeleton loaders para melhor UX

3. **Banco de Dados**
   - Índices para otimização de queries
   - Backup automático
   - Migrations versionadas
   - Soft delete para cards

4. **IA**
   - Fine-tuning do modelo para flashcards acadêmicos
   - Suporte a múltiplos idiomas
   - Geração de imagens para cards visuais
   - OCR para criar cards a partir de fotos de texto

5. **Infraestrutura**
   - Docker/Docker Compose
   - Monitoramento (Sentry, Datadog)
   - Load balancing
   - CDN para assets estáticos

---

### Segurança

1. **Autenticação**
   - 2FA (autenticação de dois fatores)
   - OAuth com Google/GitHub

2. **API**
   - Rate limiting por usuário
   - Validação rigorosa de inputs
   - HTTPS obrigatório
   - CORS configurado corretamente

3. **Dados**
   - Criptografia de dados sensíveis
   - Políticas RLS mais granulares
   - Auditoria de acessos

---

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro "CORS policy" no navegador

**Causa:** Backend não está configurado para aceitar requisições do frontend.

**Solução:**
```python
# No main.py, verificar se o CORS está configurado
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especificar domínio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

#### 2. Cards não aparecem na revisão

**Causa:** Campo `proxima_revisao` está no futuro.

**Solução:** Verificar no Supabase SQL Editor:
```sql
SELECT frente, proxima_revisao 
FROM flashcards 
WHERE user_id = 'seu-user-id' 
ORDER BY proxima_revisao;
```

Se necessário, resetar manualmente:
```sql
UPDATE flashcards 
SET proxima_revisao = NOW() 
WHERE user_id = 'seu-user-id';
```

---

#### 3. IA retorna erro ou cards vazios

**Causa:** Rate limit da Groq API atingido ou prompt malformado.

**Solução 1 - Rate Limit:**
- Aguardar alguns minutos
- Implementar retry logic no código

**Solução 2 - Prompt:**
- Verificar se o texto está sendo enviado corretamente
- Testar prompt diretamente na plataforma Groq

---

#### 4. Streak não incrementa

**Causa:** Usuário já revisou hoje ou tabela `user_stats` não existe.

**Solução:**
```sql
-- Verificar se o registro existe
SELECT * FROM user_stats WHERE user_id = 'seu-user-id';

-- Se não existir, criar manualmente
INSERT INTO user_stats (user_id, streak, ultima_revisao)
VALUES ('seu-user-id', 0, CURRENT_DATE);
```

---

#### 5. Erro de autenticação do Supabase

**Causa:** Chaves inválidas ou expiradas.

**Solução:**
1. Verificar `.env` do backend e `supabaseClient.js` do frontend
2. Copiar novamente as chaves do painel do Supabase
3. Reiniciar o servidor

---

#### 6. Intervalo não cresce após acertar

**Causa:** Campo `intervalo` está como NULL no banco.

**Solução:**
```sql
UPDATE flashcards 
SET intervalo = 0 
WHERE intervalo IS NULL;
```

---

#### 7. Frontend não conecta com backend

**Causa:** URL do backend está incorreta.

**Solução:** Verificar se todos os `fetch()` apontam para o endereço correto:
```javascript
// Desenvolvimento
https://easycards-api.onrender.com

// Ou localhost se rodando localmente
http://localhost:8000
```

---

### Logs e Debugging

#### Backend (FastAPI)

```bash
# Rodar em modo de desenvolvimento com reload
uvicorn main:app --reload --log-level debug

# Ver logs detalhados
tail -f logs/app.log  # Se implementar logging em arquivo
```

#### Frontend (React)

```javascript
// Adicionar console.logs para debug
console.log("Cards recebidos:", cardsRevisao)
console.log("Nota enviada:", nota)

// Usar DevTools do navegador
// Network tab → ver requisições HTTP
// Console → ver erros JavaScript
```

---

### Contato e Suporte

Para dúvidas ou problemas:

1. Verificar este documento primeiro
2. Consultar documentação oficial:
   - [FastAPI Docs](https://fastapi.tiangolo.com)
   - [React Docs](https://react.dev)
   - [Supabase Docs](https://supabase.com/docs)
   - [Groq API Docs](https://console.groq.com/docs)
3. Abrir issue no repositório do GitHub

---

## 📝 Considerações Finais

Este projeto foi desenvolvido com foco em:

- **Arquitetura limpa** (uso de POO, padrões de design)
- **Escalabilidade** (estrutura permite crescimento)
- **User Experience** (interface intuitiva e feedback visual)
- **Tecnologias modernas** (FastAPI, React, Supabase, IA)

O código está comentado e bem estruturado para facilitar a manutenção e evolução por novos desenvolvedores.

**Importante:** Este é um projeto acadêmico. Para uso em produção real, seria necessário:
- Implementar testes automatizados
- Adicionar autenticação mais robusta
- Configurar CI/CD
- Monitoramento de erros
- Backup de dados
- Documentação de API (Swagger/OpenAPI)

---

## 📚 Referências

- [Spaced Repetition - Wikipedia](https://en.wikipedia.org/wiki/Spaced_repetition)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Groq Cloud Platform](https://console.groq.com)
- [Anki - Popular Flashcard App](https://apps.ankiweb.net)

---

**Desenvolvido com 🧠 e ❤️ para facilitar o aprendizado.**

**Data:** Janeiro 2025  
**Versão:** 1.0  
**Licença:** Acadêmico

---

## 🎓 Sobre o Projeto Acadêmico

Este projeto foi desenvolvido como trabalho de faculdade e está sendo documentado para transferência a outro aluno que dará continuidade ao desenvolvimento.

**Recomendações para o próximo desenvolvedor:**

1. Leia toda a documentação antes de começar a mexer no código
2. Configure o ambiente local seguindo o guia de instalação
3. Teste todas as funcionalidades existentes para entender o fluxo
4. Revise a seção de "Melhorias Futuras" para ideias de expansão
5. Mantenha a documentação atualizada conforme adicionar features
6. Comente o código novo para facilitar futuras manutenções
7. Faça commits frequentes com mensagens descritivas

**Boa sorte e bons estudos! 🚀**
