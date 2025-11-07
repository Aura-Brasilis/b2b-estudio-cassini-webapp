# Enterprise WebApp - Gerenciamento de Usuários e Google Calendar

WebApp em React + TypeScript para gerenciar empresas com integração ao Google Calendar.

## Funcionalidades

- Listar e buscar usuários por número de telefone
- Ativar/desativar bot para usuários individuais
- Conectar/desconectar Google Calendar via OAuth
- Configurar horários e disponibilidade do calendário
- Visualizar slots disponíveis

## Stack Tecnológico

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Router** - Navegação
- **TanStack Query** - Gerenciamento de estado server
- **Zustand** - Gerenciamento de estado local
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas

## Pré-requisitos

- Node.js 20.19+ ou 22.12+ (recomendado)
- npm ou yarn
- Backend da API rodando em http://localhost:3335

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure:
```env
VITE_API_URL=http://localhost:3335
VITE_ENTERPRISE_SLUG=sua-empresa
```

## Como Executar

### Desenvolvimento

```bash
npm run dev
```

O webapp estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview do Build

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── common/          # Componentes reutilizáveis
│   ├── users/           # Componentes de usuários
│   ├── layout/          # Layout e navegação
│   └── calendar/        # Componentes de calendário
├── pages/               # Páginas da aplicação
├── services/            # Serviços de API
├── hooks/               # Hooks customizados
├── store/               # Gerenciamento de estado
├── types/               # Tipos TypeScript
└── utils/               # Funções utilitárias
```

## Páginas Disponíveis

- `/users` - Listagem e gerenciamento de usuários
- `/google-auth` - Autenticação Google Calendar
- `/calendar-config` - Configurações do calendário
- `/google-callback` - Callback OAuth (gerenciado automaticamente)

## Principais Recursos

### Gerenciamento de Usuários

- **Listagem com paginação**: Visualize usuários com navegação de páginas
- **Busca por telefone**: Filtre usuários em tempo real com debounce
- **Toggle de bot**: Ative/desative o bot para cada usuário
- **Estados visuais**: Indicadores de loading e erro

### Google Calendar

- **OAuth Flow**: Autenticação completa com Google
- **Configuração de horários**: Defina horário de trabalho e dias da semana
- **Duração de slots**: Configure a duração dos slots de agendamento
- **Desconexão segura**: Revogue acesso a qualquer momento

### UX/UI

- **Design responsivo**: Funciona em desktop e mobile
- **Feedback visual**: Toasts para sucesso/erro
- **Loading states**: Indicadores de carregamento
- **Validação de formulários**: Validação no frontend

## API Endpoints Utilizados

O webapp consome os seguintes endpoints da API:

- `GET /enterprises/:slug/services` - Listar usuários
- `GET /enterprises/:slug/services/search` - Buscar usuários
- `POST /enterprises/:slug/toggle-bot` - Toggle bot
- `GET /enterprises/:slug/google-calendar/auth-url` - URL OAuth
- `DELETE /enterprises/:slug/google-calendar/disconnect` - Desconectar
- `PATCH /enterprises/:slug/google-calendar/config` - Configurar calendário

Consulte o arquivo `WEBAPP_TODO_LIST.md` para documentação completa da API.

## Configurações

### Customizar o Enterprise Slug

Altere o valor em `.env`:
```env
VITE_ENTERPRISE_SLUG=minha-empresa
```

### Customizar a URL da API

Altere o valor em `.env`:
```env
VITE_API_URL=https://api.exemplo.com
```

## Troubleshooting

### Erro ao conectar com a API

- Verifique se o backend está rodando
- Confirme a URL da API no arquivo `.env`
- Verifique as configurações de CORS no backend

### Erro de build

- Certifique-se de que todas as dependências estão instaladas
- Limpe o cache: `rm -rf node_modules && npm install`
- Verifique a versão do Node.js

### Problemas com Tailwind CSS

Se as classes do Tailwind não funcionarem:
- Verifique se o arquivo `tailwind.config.js` existe
- Confirme que `@tailwind` directives estão no `index.css`
- Reinicie o servidor de desenvolvimento
