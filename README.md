# DataWork - Dashboard de Produtividade

## 📋 Sobre o Projeto

**DataWork** é um aplicativo mobile desenvolvido em React Native que oferece uma solução completa para gerenciamento de tarefas e análise de produtividade pessoal. O projeto foi desenvolvido como parte do desafio Global Solution 2025.2, com foco no tema "DataWork: Inteligência Analítica no Mundo Corporativo".

### 🎯 Tema e Contexto

O desafio propõe o desenvolvimento de soluções baseadas em dados para entender, prever e aprimorar o trabalho humano, transformando dados em estratégias corporativas através de análises inteligentes.

### 💡 Solução Desenvolvida

O **Dashboard de Produtividade** permite que usuários:
- Registrem e gerenciem tarefas com diferentes status e prioridades
- Visualizem estatísticas detalhadas sobre sua produtividade
- Acompanhem o progresso através de gráficos e insights
- Mantenham todos os dados salvos localmente no dispositivo

## ✨ Funcionalidades

### 📊 Dashboard Principal
- Visão geral da produtividade com taxa de conclusão
- Estatísticas por status (Pendente, Em Andamento, Concluída)
- Métricas de atividade recente (tarefas hoje e esta semana)
- Acesso rápido às principais funcionalidades

### ✅ Gerenciamento de Tarefas
- Criação de tarefas com título, descrição, status e prioridade
- Listagem completa com filtros por status
- Atualização rápida de status (tap no badge)
- Exclusão de tarefas com confirmação
- Visualização detalhada ao tocar na tarefa

### 📈 Estatísticas e Análises
- Gráfico de barras mostrando distribuição por status
- Gráfico de distribuição por prioridade
- Insights personalizados baseados nos dados
- Resumo geral com totais e porcentagens

### 💾 Persistência de Dados
- Todos os dados são salvos localmente usando AsyncStorage
- Nenhuma conexão com internet necessária
- Dados persistem mesmo após fechar o aplicativo

## 🛠️ Tecnologias Utilizadas

- **React Native 0.76.1** - Framework para desenvolvimento mobile
- **Expo SDK 52** - Plataforma para desenvolvimento e build (versão estável)
- **TypeScript 5.3** - Tipagem estática para JavaScript
- **React Navigation 7** - Navegação entre telas (Tabs + Stack)
- **AsyncStorage 2.0** - Armazenamento local de dados
- **Expo Vector Icons** - Biblioteca de ícones

## 📱 Estrutura do Projeto

```
datawork-produtividade/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── TaskCard.tsx     # Card de exibição de tarefas
│   │   ├── StatCard.tsx     # Card de estatísticas
│   │   └── ProgressBar.tsx  # Barra de progresso
│   ├── screens/             # Telas do aplicativo
│   │   ├── DashboardScreen.tsx     # Dashboard principal
│   │   ├── AddTaskScreen.tsx       # Criação de tarefas
│   │   ├── TaskListScreen.tsx      # Lista de tarefas
│   │   └── StatisticsScreen.tsx    # Estatísticas detalhadas
│   ├── services/            # Serviços e lógica de negócio
│   │   └── storageService.ts       # Serviço de AsyncStorage
│   ├── types/               # Definições de tipos TypeScript
│   │   └── Task.ts          # Tipos relacionados a tarefas
│   └── navigation/          # Configuração de navegação
│       └── AppNavigator.tsx # Navegação principal
├── App.tsx                  # Componente raiz
├── package.json             # Dependências do projeto
├── tsconfig.json            # Configuração TypeScript
├── babel.config.js          # Configuração Babel
└── app.json                 # Configuração Expo
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior, recomendado: Node 20+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

Para instalar o Expo CLI globalmente:
```bash
npm install -g expo-cli
```

**Importante:** Este projeto usa **Expo SDK 52** (versão estável e testada). Certifique-se de ter o Expo Go atualizado no seu dispositivo!

### Instalação

1. **Clone o repositório:**
```bash
git clone <URL_DO_REPOSITORIO>
cd datawork-produtividade
```

2. **Instale as dependências:**
```bash
npm install
```

ou com yarn:
```bash
yarn install
```

### Executando o Aplicativo

1. **Inicie o servidor de desenvolvimento:**
```bash
npm start
```

ou:
```bash
npx expo start
```

2. **Execute no seu dispositivo:**

   - **No Android:**
     - Instale o app [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) no seu dispositivo
     - Escaneie o QR Code que aparece no terminal ou navegador
     
     Ou use:
     ```bash
     npm run android
     ```

   - **No iOS:**
     - Instale o app [Expo Go](https://apps.apple.com/app/expo-go/id982107779) no seu dispositivo
     - Escaneie o QR Code que aparece no terminal ou navegador
     
     Ou use:
     ```bash
     npm run ios
     ```

   - **No navegador (Web):**
     ```bash
     npm run web
     ```

## 📖 Como Usar

### Primeira Vez
1. Ao abrir o app, você verá o **Dashboard** vazio
2. Toque no botão **+** para criar sua primeira tarefa
3. Preencha os dados da tarefa e salve

### Criando Tarefas
1. Toque no botão **+** no Dashboard ou na tela de Tarefas
2. Preencha:
   - **Título** (obrigatório)
   - **Descrição** (opcional)
   - **Status** (Pendente, Em Andamento, Concluída)
   - **Prioridade** (Baixa, Média, Alta)
3. Toque em **Salvar Tarefa**

### Gerenciando Tarefas
- **Ver detalhes:** Toque na tarefa
- **Mudar status:** Toque no badge de status (cicla entre os status)
- **Excluir:** Toque no ícone de lixeira e confirme
- **Filtrar:** Use os botões de filtro no topo da lista

### Visualizando Estatísticas
1. Acesse a aba **Estatísticas**
2. Veja gráficos de distribuição por status e prioridade
3. Confira insights personalizados baseados nos seus dados

## 🎨 Design e UI

O aplicativo segue princípios modernos de UI/UX:
- **Paleta de cores** consistente e profissional
- **Feedback visual** em todas as interações
- **Ícones intuitivos** para facilitar a navegação
- **Animações suaves** para melhor experiência
- **Responsivo** e adaptável a diferentes tamanhos de tela

### Cores Principais
- **Azul Principal:** #4A90E2 (Cabeçalhos e elementos principais)
- **Verde:** #4CAF50 (Tarefas concluídas)
- **Laranja:** #FF9800 (Tarefas em andamento)
- **Cinza:** #9E9E9E (Tarefas pendentes)
- **Vermelho:** #F44336 (Alta prioridade / Exclusão)

## 💾 Estrutura de Dados

### Task (Tarefa)
```typescript
interface Task {
  id: string;                           // ID único da tarefa
  title: string;                        // Título da tarefa
  description: string;                  // Descrição detalhada
  status: 'pendente' | 'em_andamento' | 'concluida';
  priority: 'baixa' | 'media' | 'alta';
  createdAt: string;                    // Data de criação (ISO)
  updatedAt: string;                    // Data de atualização (ISO)
  completedAt?: string;                 // Data de conclusão (ISO)
}
```

### TaskStatistics (Estatísticas)
```typescript
interface TaskStatistics {
  total: number;                        // Total de tarefas
  pendentes: number;                    // Tarefas pendentes
  emAndamento: number;                  // Tarefas em andamento
  concluidas: number;                   // Tarefas concluídas
  porcentagemConcluidas: number;        // % de conclusão
  tarefasHoje: number;                  // Tarefas criadas hoje
  tarefasSemana: number;                // Tarefas criadas esta semana
}
```

## 🔧 Serviço de Storage

O `storageService` oferece os seguintes métodos:

- `loadTasks()` - Carrega todas as tarefas
- `saveTasks(tasks)` - Salva o array de tarefas
- `addTask(task)` - Adiciona uma nova tarefa
- `updateTask(taskId, updates)` - Atualiza uma tarefa
- `deleteTask(taskId)` - Remove uma tarefa
- `getStatistics()` - Calcula e retorna estatísticas
- `clearAll()` - Limpa todos os dados

## 🎓 Aprendizados e Conceitos Aplicados

Este projeto demonstra:
- ✅ **Gerenciamento de Estado** com React Hooks
- ✅ **Persistência Local** com AsyncStorage
- ✅ **Navegação** com React Navigation (Tabs + Stack)
- ✅ **TypeScript** para type safety
- ✅ **Componentização** e reutilização de código
- ✅ **Boas práticas** de organização de projeto
- ✅ **UI/UX Design** moderno e intuitivo
- ✅ **Análise de Dados** e visualização de estatísticas

## 📝 Requisitos Atendidos

- ✅ Desenvolvido em **React Native 0.76.1**
- ✅ Utiliza **AsyncStorage 2.0** para persistência
- ✅ **Expo SDK 52** - Versão estável e comprovadamente funcional
- ✅ Tema **DataWork** aplicado criativamente
- ✅ Solução funcional e completa
- ✅ Código bem organizado e comentado
- ✅ README com instruções claras

## 👥 Integrantes

- Pedro Henrique Pinheiro Carvalho - RM551918
- Fernando Magalhães Perezine de Souza - RM98010
- Kauan Dintof Lopes - RM551733


---
