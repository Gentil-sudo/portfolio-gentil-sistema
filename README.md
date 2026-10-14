# Portfólio · Enzo Gentil

Meu portfólio pessoal em formato de **sistema operacional**: o site liga com uma tela de boot, passa pela tela de login e abre uma área de trabalho com ícones, janelas, barra de tarefas e menu Iniciar.

🔗 **Acesse:** [portfolio-gentil-sistema.vercel.app](https://portfolio-gentil-sistema.vercel.app)

Sou estudante de Engenharia de Software na PUC Minas e trabalho com desenvolvimento web. Aqui ficam meus projetos, minhas experiências, as linguagens que mais uso (direto do WakaTime) e um formulário de contato.

## Funcionalidades

- **Experiência de desktop**: boot, login, área de trabalho, janelas que abrem, minimizam e fecham, barra de tarefas e menu Iniciar com as opções bloquear e reiniciar.
- **Apps**: Projetos, Experiências, Sobre Mim e Contato.
- **Tema claro e escuro**: a escolha fica salva no navegador.
- **Português e inglês em todo o sistema**: dá para trocar o idioma na tela de login, na área de trabalho ou na barra de tarefas. A escolha fica salva, e na primeira visita vale o idioma do navegador.
- **Estatísticas do WakaTime**: tempo programando, linguagens, editores, sistemas e projetos, com períodos de 7 dias até "desde sempre". Ferramentas de IA ficam de fora da lista de editores.
- **Codando agora**: mostra em que projeto estou mexendo no editor naquele momento, a partir dos heartbeats do WakaTime.
- **Formulário de contato** enviado pelo [Web3Forms](https://web3forms.com), sem backend próprio.

## Tecnologias

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- CSS puro, um arquivo por componente
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vercel Functions](https://vercel.com/docs/functions) para a API do WakaTime
- [oxlint](https://oxc.rs) para o lint

## Como rodar

Precisa do **Node.js 22.15 ou mais novo** (os scripts usam `--use-system-ca`).

```bash
git clone https://github.com/Gentil-sudo/portfolio-gentil-sistema.git
cd portfolio-gentil-sistema/Portfolio
npm install
cp .env.example .env.local   # depois preencha as variáveis
npm run dev
```

O site abre em `http://localhost:5173`.

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento, já com as rotas `/api/*` |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve o build localmente, também com as rotas `/api/*` |
| `npm run lint` | Roda o oxlint |
| `npm run wakatime:oauth` | Gera o token OAuth do WakaTime |

## Variáveis de ambiente

Ficam no `Portfolio/.env.local`, que **não vai para o git**.

| Variável | Para quê |
| --- | --- |
| `VITE_WEB3FORMS_KEY` | Chave do formulário de contato ([web3forms.com](https://web3forms.com)) |
| `WAKATIME_APP_ID` | ID do app OAuth criado em [wakatime.com/apps](https://wakatime.com/apps) |
| `WAKATIME_APP_SECRET` | Secret desse app |
| `WAKATIME_ACCESS_TOKEN` | Token OAuth usado para ler as estatísticas |
| `WAKATIME_REFRESH_TOKEN` | Renova o token automaticamente quando ele expira |
| `WAKATIME_USERNAME` | Opcional: sem token, usa o perfil público do WakaTime (sem o "Hoje" e sem o "Codando agora") |
| `WAKATIME_PUBLIC_PROJECTS` | Opcional: projetos que aparecem pelo nome no "Codando agora", separados por vírgula |

As variáveis `WAKATIME_*` não têm o prefixo `VITE_` de propósito: só o servidor as lê e elas nunca vão para o navegador.

## WakaTime

Desde 01/11/2026 a API key do WakaTime só serve para os plugins dos editores mandarem dados. Para ler as estatísticas, a API pede um **token OAuth**. Para gerar o seu:

1. Crie um app em [wakatime.com/apps](https://wakatime.com/apps) com o Redirect URI `http://localhost:8787/callback`.
2. Coloque `WAKATIME_APP_ID` e `WAKATIME_APP_SECRET` no `.env.local`.
3. Rode `npm run wakatime:oauth`, autorize no navegador e copie os tokens que aparecem no terminal para o `.env.local`.

O navegador nunca fala direto com o WakaTime: ele chama `/api/wakatime` e `/api/codando` no próprio site. No `npm run dev`, quem responde essas rotas é um plugin do `vite.config.js`. Em produção, são as Vercel Functions da pasta `api/`.

## Deploy na Vercel

1. Importe o repositório na Vercel e defina **Root Directory** como `Portfolio`.
2. Cadastre as variáveis de ambiente da tabela acima.
3. Faça o deploy. A Vercel detecta o Vite e transforma `api/wakatime.js` e `api/codando.js` em rotas. Os arquivos que começam com `_` não viram rota.

## Estrutura

```
Portfolio/
├── api/                  # Vercel Functions (/api/wakatime, /api/codando)
├── public/
├── scripts/
│   └── wakatime-oauth.mjs
├── src/
│   ├── components/       # boot, login, home, taskBar, startMenu, explorer, apps...
│   ├── config/           # wakatimeConfig.js
│   ├── data/             # textos: projetos, experiências, sobre, contatos
│   ├── hooks/            # useTheme
│   ├── i18n/             # idioma global e textos da interface (pt/en)
│   ├── services/         # chamadas às rotas /api
│   ├── App.jsx
│   └── main.jsx
└── vite.config.js
```

Para mudar o conteúdo do portfólio, basta editar os arquivos em `src/data/`. Os textos têm uma versão em português e outra em inglês (`{ pt: '...', en: '...' }`). Os textos da interface ficam em `src/i18n/translations.js`.

## Contato

- E-mail: enzogentil.profissional@gmail.com
- LinkedIn: [enzo-gentil-xavier](https://www.linkedin.com/in/enzo-gentil-xavier/)
- GitHub: [Gentil-sudo](https://github.com/Gentil-sudo)
