// wakatimeConfig.js
// Configurações do componente <WakaTimeStats />.
//
// O token do WakaTime NÃO fica aqui: ele é lido só no servidor (WAKATIME_ACCESS_TOKEN,
// token OAuth gerado pelo npm run wakatime:oauth), pelas Vercel Functions da
// pasta api/ e pelo vite.config.js no npm run dev.
// O navegador apenas chama API_PATH no próprio domínio.
const WAKATIME_CONFIG = {
  API_PATH: "/api/wakatime",

  // Período aberto ao carregar a página
  DEFAULT_RANGE: "last_7_days",

  // Botões de período (ranges aceitos pela API do WakaTime).
  // Os rótulos, em português e inglês, ficam em src/i18n/translations.js
  RANGES: ["last_7_days", "last_30_days", "last_6_months", "last_year", "all_time"],

  // Ferramentas de IA que não aparecem no painel: o servidor tira esses nomes
  // da lista de editores (e do "Codando agora") antes de mandar ao navegador.
  // A comparação ignora maiúsculas, espaços, "-" e "_".
  HIDDEN_EDITORS: [
    "Claude Code",
    "Claude",
    "Codex",
    "Copilot",
    "Gemini CLI",
    "Aider",
    "Cline",
    "Roo Code",
    "Kilo Code",
    "Amp",
  ],

  // Link do seu perfil público (opcional: deixe "" para esconder o botão)
  PROFILE_URL: "https://wakatime.com/@aramuni",

  // Quantas linguagens aparecem na lista (o resto vira "+ N outras")
  MAX_LANGUAGES: 10,

  // Linguagens que você não quer mostrar, ex.: ["Text", "Other"]
  HIDDEN_LANGUAGES: [],

  // "Codando agora": em que projeto você está mexendo no editor NESTE momento.
  // Sai dos heartbeats do WakaTime, que são privados: só funciona com o
  // WAKATIME_ACCESS_TOKEN, escopo read_heartbeats (no modo perfil público o
  // cartão não aparece).
  // Este bloco também é lido pelo servidor (api/_codando.js).
  CODING_NOW: {
    API_PATH: "/api/codando",

    // Fuso da sua conta no WakaTime (wakatime.com/settings/preferences):
    // é por ele que a API separa os dias
    TIMEZONE: "America/Sao_Paulo",

    // Último heartbeat há até tantos minutos = "codando agora".
    // A extensão manda um a cada ~2 min enquanto você digita.
    ACTIVE_MINUTES: 10,

    // Pausa maior que isso encerra a sessão (mesmo timeout padrão do WakaTime)
    BREAK_MINUTES: 15,

    // De quanto em quanto tempo a página pergunta de novo
    REFRESH_SECONDS: 60,

    // Projetos que aparecem pelo nome (com a branch). "*" = todos.
    // Para esconder projetos de cliente, troque por uma lista, ex.:
    //   PUBLIC_PROJECTS: ["meu-portfolio", "WakaTimeAPI"],
    // O nome é o que o WakaTime mostra no dashboard (em geral, o nome da pasta).
    // Também dá para somar nomes pela variável WAKATIME_PUBLIC_PROJECTS.
    PUBLIC_PROJECTS: ["*"],

    // Projeto fora da lista: true = aparece como "projeto privado" (sem nome
    // e sem branch); false = o cartão nem aparece
    SHOW_PRIVATE: true,
  },
};

export default WAKATIME_CONFIG;
