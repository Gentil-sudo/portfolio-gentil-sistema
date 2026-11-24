// Lista única de projetos: lida pelos dois modos (SO e recrutador).
// Mudar um projeto aqui atualiza os dois modos sem tocar em componente nenhum.
//
// Campos (textos: uma string só ou { pt, en }):
//   id                 identificador único
//   name, description  nome e uma linha de descrição
//   date               'AAAA-MM' (ordena do mais novo para o mais antigo); null = ainda sem data
//   stack              tecnologias usadas
//   repo               nome do repositório no GitHub (owner: dono, se não for o meu); null = sem repo público
//   demo               link do deploy, se houver
//   image              prévia (captura 800×500 em src/assets/projetos); sem ela, usa a imagem Open Graph do GitHub
//   featured           true = aparece nos destaques; featuredOrder = posição neles
//   context            'pessoal' | 'puc' | 'equipe' (rótulos em src/i18n/translations.js)
//   team               tamanho da equipe (null = sozinho ou ainda não informado)
//   whatIDid           o que eu fiz (importante em projeto de equipe)
//   technicalHighlight o destaque técnico do projeto
//   archive            true = estudo antigo, vai para o bloco "Arquivo"
//   inProgress         true = ainda em desenvolvimento
//
// Campos ainda null estão PENDENTES: não inventar, perguntar ao Enzo.

import imgGfinancas from '../assets/projetos/gfinancas.webp'
import imgAlugaAqui from '../assets/projetos/alugaaqui.webp'
import imgMaisSaude from '../assets/projetos/mais-saude.webp'
import imgAurora from '../assets/projetos/aurora-station.webp'

const GITHUB_USER = 'Gentil-sudo'

const projetos = [
    /* ---------------- Destaques ---------------- */
    {
        id: 'gfinancas',
        image: imgGfinancas, // tela de login: trocar por um print de dentro do app
        name: 'GFinanças',
        repo: 'GFinancas',
        date: '2026-11',
        featured: true,
        featuredOrder: 1,
        context: 'pessoal',
        inProgress: true,
        description: {
            pt: 'Organizador financeiro pessoal com lançamentos, compras parceladas, metas e investimentos, salvos no Supabase com login, feito para substituir a planilha de gastos.',
            en: 'Personal finance organizer with entries, installment purchases, goals and investments, stored in Supabase behind a login, built to replace my spending spreadsheet.',
        },
        stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Zod', 'Recharts', 'PWA', 'Supabase (Auth + Postgres)', 'Cloudflare Turnstile'],
        demo: 'https://gfinc.vercel.app',
        technicalHighlight: {
            pt: 'Segurança em camadas: Row Level Security em todas as tabelas, com testes de isolamento entre dois usuários; histórico de auditoria que só as funções do banco conseguem gravar; e captcha Cloudflare Turnstile validado pelo Supabase Auth no login e no cadastro. Funciona como PWA e exporta backup em .xlsx.',
            en: 'Layered security: Row Level Security on every table, with isolation tests between two users; an audit log that only database functions can write to; and a Cloudflare Turnstile captcha verified by Supabase Auth on sign-in and sign-up. Works as a PWA and exports backups to .xlsx.',
        },
    },
    {
        id: 'alugaaqui',
        image: imgAlugaAqui,
        name: 'AlugaAqui',
        repo: 'lab2Diw',
        date: '2026-11',
        featured: true,
        featuredOrder: 2,
        context: 'puc',
        description: {
            pt: 'Aluguel de carros (Lab 02 · PUC Minas): pedido online, análise por empresas e bancos, contrato de crédito e contas demo de Cliente, Empresa e Banco.',
            en: 'Car rental platform (Lab 02 · PUC Minas): online requests, review by companies and banks, credit contracts and demo accounts for Customer, Company and Bank.',
        },
        stack: ['React', 'React Router', 'Vite', 'Java', 'Spring Boot', 'Spring Security (JWT)', 'PostgreSQL (Supabase)', 'Docker'],
        demo: 'https://lab2-diw.vercel.app/login',
        // Tirado do README do repositório: confirmar com o Enzo
        technicalHighlight: {
            pt: 'Autenticação stateless com JWT, que deixa o back-end rodar em containers que "dormem" no plano gratuito sem derrubar o login; contrato de crédito com parcelas pela tabela Price.',
            en: 'Stateless JWT authentication, so the back end can run in containers that "sleep" on the free tier without logging anyone out; credit contracts with installments calculated by the Price table.',
        },
    },
    {
        id: 'mais-saude',
        image: imgMaisSaude,
        name: '+Saúde',
        date: '2026-08', // início (ago. – dez. 2026)
        inProgress: true,
        featured: true,
        featuredOrder: 3,
        context: 'equipe',
        team: 6,
        description: {
            pt: 'Projeto em equipe de 6 pessoas, com sprints e Kanban: React no front-end, Spring Boot e MongoDB Atlas no back-end, com endpoints de publicações (texto e imagem).',
            en: 'Team project with 6 people, run in sprints with a Kanban board: React on the front end, Spring Boot and MongoDB Atlas on the back end, with endpoints for text and image posts.',
        },
        stack: ['React', 'Spring Boot', 'MongoDB Atlas'],
        repo: null, // Repositório da faculdade, ainda privado: o Enzo vai fazer um fork público
        demo: 'https://plf-es-2026-2-ti2-7600100-mais-saude.onrender.com/#/',
        whatIDid: {
            pt: 'Fiquei com o back-end, o deploy e as funcionalidades de mapa da saúde e de eventos.',
            en: 'I handled the back end, the deployment and the health map and events features.',
        },
    },
    {
        id: 'aurora-station',
        image: imgAurora,
        name: 'Aurora Station',
        owner: 'gabiscamp', // repositório oficial do time
        repo: 'hackathon_nasa_aurora',
        date: '2026-11', // criação do repositório oficial
        featured: true,
        featuredOrder: 4,
        context: 'equipe',
        team: 4,
        description: {
            pt: 'Jogo do NASA Space Apps Challenge 2026 para crianças de 7 a 12 anos: o jogador comanda uma estação espacial em órbita de Marte por 45 dias, resolve emergências e aprende fatos reais da NASA.',
            en: 'NASA Space Apps Challenge 2026 game for kids aged 7 to 12: the player commands a space station orbiting Mars for 45 days, handles emergencies and learns real NASA facts.',
        },
        stack: ['React', 'TypeScript', 'Phaser 3', 'Zustand', 'Vite', 'Tailwind CSS', 'Web Speech API'],
        demo: 'https://hackathon-nasa-aurora.vercel.app',
        whatIDid: {
            pt: 'Desenvolvi o sistema de missões e a página inicial, pesquisei os temas críticos da vida em Marte (água, energia e o funcionamento da estação) e cuidei do design e de cerca de 80% da acessibilidade do jogo.',
            en: "I built the mission system and the home screen, researched the critical topics of life on Mars (water, energy and how the station works) and handled the design and about 80% of the game's accessibility work.",
        },
        technicalHighlight: {
            pt: 'Acessibilidade desde o início: todas as telas verificadas com axe-core (WCAG 2.2 AA) sem nenhum problema encontrado, e leitura em voz alta pela Web Speech API do navegador.',
            en: 'Accessibility from day one: every screen checked with axe-core (WCAG 2.2 AA) with no issues found, plus read-aloud through the browser Web Speech API.',
        },
    },

    /* ---------------- Demais projetos ---------------- */
    {
        id: 'autogest',
        repo: 'AutoGest',
        name: 'AutoGest',
        date: '2026-11',
        context: 'pessoal',
        description: {
            pt: 'Sistema de gestão de concessionária em Java 25, aplicando orientação a objetos: encapsulamento, herança e polimorfismo.',
            en: 'Car dealership management system in Java 25, applying object-oriented programming: encapsulation, inheritance and polymorphism.',
        },
        stack: ['Java', { pt: 'POO', en: 'OOP' }],
    },
    {
        id: 'pizzaria-next',
        name: 'Pizzaria Next',
        repo: 'pizzaria-next',
        date: '2026-07',
        description: {
            pt: 'Sistema de pizzaria com cadastro, login, cardápio e carrinho de compras, com banco de dados via Drizzle ORM.',
            en: 'Pizzeria system with sign-up, login, menu and shopping cart, backed by a database through Drizzle ORM.',
        },
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM'],
        demo: 'https://pizzaria-next-sandy.vercel.app',
    },
    {
        id: 'calltabs-cemig-saude',
        repo: 'CallTabs-Cemig-Saude',
        name: 'CallTabs Cemig Saúde',
        date: '2026-09',
        description: {
            pt: 'Aplicação web para a Cemig Saúde, publicada na Vercel.',
            en: 'Web application for Cemig Saúde, deployed on Vercel.',
        },
        stack: ['HTML', 'CSS', 'JavaScript'],
        demo: 'https://call-tabs-cemig-saude.vercel.app',
    },
    {
        id: 'pizzaria-java',
        repo: 'Pizzaria-java',
        name: 'Pizzaria Java',
        date: '2026-08',
        description: {
            pt: 'Estudo particular de Java e orientação a objetos com um sistema de pizzaria.',
            en: 'Personal study of Java and object-oriented programming through a pizzeria system.',
        },
        stack: ['Java', { pt: 'POO', en: 'OOP' }],
    },
    {
        id: 'api-clima',
        repo: 'ApiClima-diaw-enzo-gentil-rafael-gomes',
        name: { pt: 'API Clima', en: 'Weather API' },
        date: '2026-08',
        context: 'puc',
        team: 2,
        description: {
            pt: 'API de clima desenvolvida em Java para a disciplina de DIAW, em dupla com Rafael Gomes.',
            en: 'Weather API built in Java for the DIAW course, together with Rafael Gomes.',
        },
        stack: ['Java'],
    },
    {
        id: 'calculadora-next',
        repo: 'calculadora-next',
        name: { pt: 'Calculadora Next', en: 'Next Calculator' },
        date: '2026-07',
        description: {
            pt: 'Calculadora feita em Next.js para consolidar a lógica de programação.',
            en: 'Calculator built with Next.js to strengthen programming logic.',
        },
        stack: ['Next.js', 'TypeScript', 'React'],
    },
    {
        id: 'trabalho-pratico-2',
        repo: 'trabalho-pratico-2',
        name: { pt: 'Trabalho Prático DIW', en: 'DIW Practical Assignment' },
        date: '2026-06',
        context: 'puc',
        description: {
            pt: 'Trabalho prático da disciplina de DIW (PUC Minas) com CRUD usando JSON Server como back-end.',
            en: 'Practical assignment for the DIW course (PUC Minas): a CRUD app using JSON Server as the back end.',
        },
        stack: ['HTML', 'CSS', 'JavaScript', 'JSON Server'],
    },
    {
        id: 'receitas-de-minas',
        repo: 'receitas-de-minas',
        name: 'Receitas de Minas',
        date: '2026-03',
        description: {
            pt: 'Sistema web para gerenciar receitas típicas mineiras.',
            en: 'Web app to manage traditional recipes from Minas Gerais.',
        },
        stack: ['HTML', 'CSS'],
    },
    {
        id: 'castle-defenders',
        owner: 'rafaelgomes77oliveira-ux',
        repo: 'Pygame-Castle-Defenders',
        name: 'Castle Defenders',
        date: '2026-02',
        context: 'equipe',
        team: 4,
        description: {
            pt: 'Jogo em Pygame feito em grupo de quatro pessoas: defenda a torre dos inimigos clicando para atacar, junte moedas e compre melhorias enquanto chefões aumentam a dificuldade.',
            en: 'Pygame game made by a team of four: defend the tower by clicking to attack enemies, collect coins and buy upgrades while bosses ramp up the difficulty.',
        },
        stack: ['Python', 'Pygame', 'Pytest'],
    },

    /* ---------------- Arquivo (estudos antigos) ---------------- */
    {
        id: 'movie-list',
        repo: 'Movie-List-Api',
        name: 'Movie List',
        date: '2024-08',
        archive: true,
        description: {
            pt: 'Lista de filmes em Next.js consumindo uma API externa de filmes.',
            en: 'Movie list in Next.js that consumes an external movie API.',
        },
        stack: ['Next.js', 'TypeScript', 'Sass', 'Axios'],
    },
    {
        id: 'img-generator',
        repo: 'img-generator',
        name: { pt: 'Gerador de Imagem', en: 'Image Generator' },
        date: '2024-07',
        archive: true,
        description: {
            pt: 'Gerador de imagens em React que permite montar e exportar a imagem com html2canvas.',
            en: 'Image generator in React that lets you compose an image and export it with html2canvas.',
        },
        stack: ['React', 'React Router', 'html2canvas', 'CSS'],
    },
    {
        id: 'gerency',
        repo: 'gerency-react',
        name: 'Gerency',
        date: '2024-07',
        archive: true,
        description: {
            pt: 'Gerenciador de finanças pessoais feito em React (versão beta).',
            en: 'Personal finance manager built with React (beta version).',
        },
        stack: ['React', 'React Router', 'JavaScript', 'CSS'],
    },
    {
        id: 'cadastro-api',
        repo: 'Cadastro-Api-React',
        name: { pt: 'Cadastro com API', en: 'Sign-up with API' },
        date: '2024-07',
        archive: true,
        description: {
            pt: 'Front-end de cadastro de usuários em React consumindo uma API com Axios.',
            en: 'User sign-up front end in React that consumes an API with Axios.',
        },
        stack: ['React', 'JavaScript', 'Axios', 'CSS'],
    },
    {
        id: 'node-api',
        repo: 'node-api',
        name: 'Node API',
        date: '2024-07',
        archive: true,
        description: {
            pt: 'API REST feita com Node.js e Express, usando Prisma como ORM e MongoDB como banco de dados.',
            en: 'REST API built with Node.js and Express, using Prisma as the ORM and MongoDB as the database.',
        },
        stack: ['Node.js', 'Express', 'Prisma', 'MongoDB'],
    },
    {
        id: 'login-react',
        repo: 'login-react',
        name: 'Login React',
        date: '2024-07',
        archive: true,
        description: {
            pt: 'Primeira tela de login feita com React, focada no front-end.',
            en: 'My first login screen built with React, focused on the front end.',
        },
        stack: ['React', 'JavaScript', 'CSS', 'React Icons'],
    },
    {
        id: 'paintjs',
        repo: 'paintjs',
        name: 'Paint JS',
        date: '2023-09',
        archive: true,
        description: {
            pt: 'Aplicação de desenho no navegador, inspirada no Paint, feita com JavaScript puro.',
            en: 'A drawing app that runs in the browser, inspired by Paint and built with vanilla JavaScript.',
        },
        stack: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        id: 'cursojs',
        repo: 'cursojs',
        name: { pt: 'Curso de JavaScript', en: 'JavaScript Course' },
        date: '2021-02',
        archive: true,
        description: {
            pt: 'Primeiros passos na programação web: exercícios de HTML, CSS e JavaScript puro.',
            en: 'First steps in web programming: exercises in HTML, CSS and vanilla JavaScript.',
        },
        stack: ['HTML', 'CSS', 'JavaScript'],
    },
].map(({ owner = GITHUB_USER, ...project }) => ({
    featured: false,
    archive: false,
    inProgress: false,
    context: null,
    team: null,
    whatIDid: null,
    technicalHighlight: null,
    demo: null,
    ...project,
    github: project.repo ? `https://github.com/${owner}/${project.repo}` : null,
    image: project.image ?? (project.repo ? `https://opengraph.githubassets.com/1/${owner}/${project.repo}` : null),
}))

// Mais novo primeiro; projetos ainda sem data vão para o fim
export function byNewest(a, b) {
    if (a.date === b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return a.date < b.date ? 1 : -1
}

export const featuredProjects = projetos
    .filter((project) => project.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)

export default projetos
