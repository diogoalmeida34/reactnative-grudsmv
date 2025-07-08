# Planejamento Técnico - Sistema IF Task 📝

Este documento apresenta o planejamento técnico para o desenvolvimento do aplicativo **IF Task - Gestão de Tarefas e Projetos Acadêmicos**, com base nos protótipos de tela (Login, Lista de Tarefas, Nova Tarefa, Apagar Tarefa, Projetos, Novo Projeto, Apagar Projeto) e nos requisitos descritos nas histórias de usuário. O objetivo é mapear componentes reutilizáveis, propor uma estrutura de pastas modular e definir os modelos de dados.

---

## 👨🏻‍💻 Informações do Integrante

>**Nome**: Diogo Da Silva Almeida -  **Matrícula**: GU3059995

>**Projeto**: *Sistema IF Task - Gestão de Tarefas e Projetos Acadêmicos*

---

## 1. Mapeamento de Componentes Reutilizáveis

A análise dos protótipos e das histórias de usuário revelou elementos de interface que se repetem. Abaixo, listamos os componentes reutilizáveis identificados, com seus contratos (nome, interface de props e descrição), projetados para suportar as funcionalidades do aplicativo.

### Componente 1: BotaoPrimario.tsx
- **Interface de Props**:
```typescript
interface BotaoPrimarioProps {
  titulo: string;
  onPress: () => void;
  disabled?: boolean;
  variante?: 'solid' | 'outline'; // Para suportar variações visuais
}
```
- **Descrição**: Botão padrão para ações principais, como "Adicionar" (Nova Tarefa/Projeto), "Login" (tela de Login) e "Sim" (modais de confirmação). Suporta variação de estilo para flexibilidade.

### Componente 2: BotaoSecundario.tsx
- **Interface de Props**:
```typescript
interface BotaoSecundarioProps {
  titulo: string;
  onPress: () => void;
}
```
- **Descrição**: Botão secundário para ações menos prioritárias, como "Não" (modais de confirmação) e "Esqueceu a senha?" (tela de Login).

### Componente 3: CampoTexto.tsx
- **Interface de Props**:
```typescript
interface CampoTextoProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  tipo?: 'text' | 'email' | 'password' | 'date';
  secureTextEntry?: boolean;
}
```
- **Descrição**: Campo de entrada de texto para formulários, usado em telas como Login (email, senha), Nova Tarefa (título, descrição, data de vencimento) e Novo Projeto (título, descrição). Suporta diferentes tipos de entrada, incluindo data, para atender à formatação YYYY-MM-DD.

### Componente 4: SelecaoPrioridade.tsx
- **Interface de Props**:
```typescript
interface SelecaoPrioridadeProps {
  value: 'Baixa' | 'Média' | 'Alta';
  onChange: (prioridade: 'Baixa' | 'Média' | 'Alta') => void;
}
```
- **Descrição**: Componente de seleção (dropdown ou botões) para definir a prioridade de uma tarefa, usado na tela de Nova Tarefa e Editar Tarefa.

### Componente 5: CardTarefa.tsx
- **Interface de Props**:
```typescript
interface CardTarefaProps {
  tarefa: {
    id: string;
    titulo: string;
    descricao: string;
    dataVencimento: string;
    prioridade: 'Baixa' | 'Média' | 'Alta';
    status: 'Pendente' | 'Em Andamento' | 'Concluída';
    projetoId: string;
  };
  onPress: (id: string) => void; // Navegar para edição
  onDelete: (id: string) => void; // Abrir modal de exclusão
}
```
- **Descrição**: Exibe uma tarefa em formato de cartão com título, descrição, data de vencimento, prioridade e status. Permite clicar para editar ou excluir, usado na tela de Lista de Tarefas.

### Componente 6: CardProjeto.tsx
- **Interface de Props**:
```typescript
interface CardProjetoProps {
  projeto: {
    id: string;
    titulo: string;
    descricao: string;
  };
  onPress: (id: string) => void; // Navegar para tarefas do projeto
  onDelete: (id: string) => void; // Abrir modal de exclusão
}
```
- **Descrição**: Exibe um projeto em formato de cartão com título e descrição. Permite clicar para visualizar tarefas associadas ou excluir, usado na tela de Projetos.

### Componente 7: ModalConfirmacao.tsx
- **Interface de Props**:
```typescript
interface ModalConfirmacaoProps {
  mensagem: string;
  onConfirm: () => void;
  onCancel: () => void;
  visivel: boolean;
}
```
- **Descrição**: Modal reutilizável para confirmação de ações, como exclusão de tarefas (tela Apagar Tarefa) ou projetos (tela Apagar Projeto).

### Componente 8: BarraNavegacao.tsx
- **Interface de Props**:
```typescript
interface BarraNavegacaoProps {
  telas: { nome: string; icone: string; rota: string }[];
  telaAtiva: string;
  onNavigate: (rota: string) => void;
}
```
- **Descrição**: Barra de navegação inferior para alternar entre as telas de Tarefas, Projetos e Configurações. Suporta ícones e rotas para integração com React Navigation.

---

## 2. Estrutura de Pastas e Arquivos

A estrutura de diretórios proposta é modular, com separação clara entre componentes, telas, modelos, serviços e estilos. Abaixo está a organização inicial do projeto:

```
if-task/
├── src/
│   ├── assets/                     # Imagens, ícones e outros recursos estáticos
│   │   ├── logo-ifsp.png          # Logotipo do IFSP
│   │   ├── icons/                 # Ícones para barra de navegação
│   ├── components/                # Componentes reutilizáveis
│   │   ├── BotaoPrimario.tsx
│   │   ├── BotaoSecundario.tsx
│   │   ├── CampoTexto.tsx
│   │   ├── SelecaoPrioridade.tsx
│   │   ├── CardTarefa.tsx
│   │   ├── CardProjeto.tsx
│   │   ├── ModalConfirmacao.tsx
│   │   ├── BarraNavegacao.tsx
│   ├── screens/                   # Telas principais do aplicativo
│   │   ├── LoginScreen.tsx        # Tela de login
│   │   ├── ListaTarefasScreen.tsx # Tela de listagem de tarefas
│   │   ├── NovaTarefaScreen.tsx   # Tela de criação de tarefas
│   │   ├── EditarTarefaScreen.tsx # Tela de edição de tarefas
│   │   ├── ProjetosScreen.tsx     # Tela de listagem de projetos
│   │   ├── NovoProjetoScreen.tsx  # Tela de criação de projetos
│   │   ├── EditarProjetoScreen.tsx # Tela de edição de projetos
│   │   ├── ConfiguracoesScreen.tsx # Tela de configurações
│   ├── models/                    # Interfaces TypeScript para modelos de dados
│   │   ├── Tarefa.ts
│   │   ├── Projeto.ts
│   │   ├── Usuario.ts
│   ├── services/                  # Lógica de negócio e integração com backend
│   │   ├── AuthService.ts         # Serviço de autenticação
│   │   ├── TarefaService.ts       # Serviço para CRUD de tarefas
│   │   ├── ProjetoService.ts      # Serviço para CRUD de projetos
│   ├── navigation/                # Configuração de navegação
│   │   ├── AppNavigator.tsx       # Configuração do React Navigation
│   ├── styles/                    # Estilos globais e temas
│   │   ├── theme.ts               # Definições de cores, fontes e tamanhos
│   │   ├── global.ts              # Estilos globais reutilizáveis
│   ├── App.tsx                    # Ponto de entrada do aplicativo
├── package.json                   # Dependências e scripts
├── tsconfig.json                  # Configuração do TypeScript
├── README.md                      # Documentação do projeto
```

### Justificativa
- **assets/**: Armazena recursos estáticos, como o logotipo do IFSP e ícones para a barra de navegação, garantindo organização.
- **components/**: Centraliza componentes reutilizáveis para facilitar manutenção e reutilização.
- **screens/**: Cada tela corresponde a uma página dos protótipos, com telas de edição explícitas para atender às histórias de usuário (edição de tarefas e projetos).
- **models/**: Contém interfaces TypeScript para garantir tipagem consistente em toda a aplicação.
- **services/**: Separa a lógica de negócio (ex.: chamadas à API ou armazenamento local) das telas, promovendo desacoplamento.
- **navigation/**: Gerencia a navegação entre telas usando React Navigation, atendendo ao requisito de navegação intuitiva (máximo de 2 cliques).
- **styles/**: Centraliza configurações de tema e estilos globais para manter consistência visual.
- **Arquivos de Configuração**: `package.json` e `tsconfig.json` são incluídos para refletir um projeto real, enquanto `README.md` documenta a configuração inicial.

---

## 3. Definição dos Tipos de Dados (Models)

Com base nos requisitos das histórias de usuário e nos protótipos, definimos as interfaces TypeScript para os principais modelos de dados manipulados pelo aplicativo.

### Modelo: Tarefa
```typescript
interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  dataVencimento: string; // Formato: YYYY-MM-DD
  prioridade: 'Baixa' | 'Média' | 'Alta';
  status: 'Pendente' | 'Em Andamento' | 'Concluída';
  projetoId: string; // ID do projeto associado
}
```

### Modelo: Projeto
```typescript
interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
}
```

### Modelo: Usuario
```typescript
interface Usuario {
  id: string;
  email: string;
  senha: string; // Armazenada de forma segura (hash)
}
```

### Justificativa
- **Tarefa**: Inclui todos os campos exigidos pelas histórias de usuário (título, descrição, data de vencimento, prioridade, status) e `projetoId` para associar a tarefa a um projeto, conforme o requisito de agrupamento por projeto.
- **Projeto**: Contém os campos necessários para criação e gerenciamento de projetos (título e descrição), conforme especificado na história de usuário 4.
- **Usuario**: Representa os dados essenciais para autenticação, com `email` e `senha` (hash) para suportar a tela de Login. Não inclui `nome`, pois não é exigido pelos protótipos ou requisitos.
- **Observação**: Não incluímos `usuarioId` em `Tarefa` ou `Projeto`, pois as histórias de usuário focam no "Usuário Padrão (Estudante)" sem menção a multiusuários. Isso simplifica o escopo atual, mas a estrutura permite adicionar `usuarioId` no futuro, se necessário.

---

## 4. Considerações Finais

Este planejamento técnico fornece uma base robusta para a implementação do **IF Task**. As principais vantagens incluem:

- **Componentes Reutilizáveis**: Interfaces de props detalhadas e flexíveis (ex.: suporte a `tipo` em `CampoTexto.tsx`, variações em `BotaoPrimario.tsx`) garantem reutilização eficiente e manutenção simplificada.
- **Estrutura Modular**: A organização de pastas separa claramente responsabilidades, facilitando colaboração em equipe e escalabilidade.
- **Modelos de Dados Alinhados**: As interfaces TypeScript refletem exatamente os requisitos, com tipagem forte para evitar erros em tempo de execução.
- **Consistência Visual**: A inclusão da pasta `styles/` assegura um design uniforme, alinhado com a necessidade de navegação intuitiva.
- **Escalabilidade**: A arquitetura permite futuras expansões, como suporte a multiusuários ou integração com backend, sem grandes refatorações.

A próxima etapa será a implementação dos componentes e telas em **React Native** com **TypeScript**, utilizando **React Navigation** para navegação e uma solução de persistência de dados para atender às funcionalidades de CRUD de tarefas e projetos. Esse planejamento serve como um guia claro para a equipe, reduzindo retrabalho e garantindo um desenvolvimento organizado.
