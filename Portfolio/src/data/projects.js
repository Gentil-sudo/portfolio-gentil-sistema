const GITHUB_USER = 'Gentil-sudo'

// name e description: uma string só (igual nos dois idiomas) ou { pt, en }
const projects = [
    {
        repo: 'cursojs',
        name: { pt: 'Curso de JavaScript', en: 'JavaScript Course' },
        date: '2021-02',
        description: {
            pt: 'Primeiros passos na programação web: exercícios de HTML, CSS e JavaScript puro.',
            en: 'First steps in web programming: exercises in HTML, CSS and vanilla JavaScript.',
        },
        technologies: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        repo: 'paintjs',
        name: 'Paint JS',
        date: '2023-09',
        description: {
            pt: 'Aplicação de desenho no navegador, inspirada no Paint, feita com JavaScript puro.',
            en: 'A drawing app that runs in the browser, inspired by Paint and built with vanilla JavaScript.',
        },
        technologies: ['HTML', 'CSS', 'JavaScript'],
    },
    {
        repo: 'login-react',
        name: 'Login React',
        date: '2024-07',
        description: {
            pt: 'Primeira tela de login feita com React, focada no front-end.',
            en: 'My first login screen built with React, focused on the front end.',
        },
        technologies: ['React', 'JavaScript', 'CSS', 'React Icons'],
    },
    {
        repo: 'node-api',
        name: 'Node API',
        date: '2024-07',
        description: {
            pt: 'API REST feita com Node.js e Express, usando Prisma como ORM e MongoDB como banco de dados.',
            en: 'REST API built with Node.js and Express, using Prisma as the ORM and MongoDB as the database.',
        },
        technologies: ['Node.js', 'Express', 'Prisma', 'MongoDB'],
    },
    {
        repo: 'Cadastro-Api-React',
        name: { pt: 'Cadastro com API', en: 'Sign-up with API' },
        date: '2024-07',
        description: {
            pt: 'Front-end de cadastro de usuários em React consumindo uma API com Axios.',
            en: 'User sign-up front end in React that consumes an API with Axios.',
        },
        technologies: ['React', 'JavaScript', 'Axios', 'CSS'],
    },
    {
        repo: 'gerency-react',
        name: 'Gerency',
        date: '2024-07',
        description: {
            pt: 'Gerenciador de finanças pessoais feito em React (versão beta).',
            en: 'Personal finance manager built with React (beta version).',
        },
        technologies: ['React', 'React Router', 'JavaScript', 'CSS'],
    },
    {
        repo: 'img-generator',
        name: { pt: 'Gerador de Imagem', en: 'Image Generator' },
        date: '2024-07',
        description: {
            pt: 'Gerador de imagens em React que permite montar e exportar a imagem com html2canvas.',
            en: 'Image generator in React that lets you compose an image and export it with html2canvas.',
        },
        technologies: ['React', 'React Router', 'html2canvas', 'CSS'],
    },
    {
        repo: 'Movie-List-Api',
        name: 'Movie List',
        date: '2024-08',
        description: {
            pt: 'Lista de filmes em Next.js consumindo uma API externa de filmes.',
            en: 'Movie list in Next.js that consumes an external movie API.',
        },
        technologies: ['Next.js', 'TypeScript', 'Sass', 'Axios'],
    },
    {
        owner: 'rafaelgomes77oliveira-ux',
        repo: 'Pygame-Castle-Defenders',
        name: 'Castle Defenders',
        date: '2026-02',
        description: {
            pt: 'Jogo em Pygame feito em grupo de quatro pessoas: defenda a torre dos inimigos clicando para atacar, junte moedas e compre melhorias enquanto chefões aumentam a dificuldade.',
            en: 'Pygame game made by a team of four: defend the tower by clicking to attack enemies, collect coins and buy upgrades while bosses ramp up the difficulty.',
        },
        technologies: ['Python', 'Pygame', 'Pytest'],
    },
    {
        repo: 'receitas-de-minas',
        name: 'Receitas de Minas',
        date: '2026-03',
        description: {
            pt: 'Sistema web para gerenciar receitas típicas mineiras.',
            en: 'Web app to manage traditional recipes from Minas Gerais.',
        },
        technologies: ['HTML', 'CSS'],
    },
    {
        repo: 'trabalho-pratico-2',
        name: { pt: 'Trabalho Prático DIW', en: 'DIW Practical Assignment' },
        date: '2026-06',
        description: {
            pt: 'Trabalho prático da disciplina de DIW (PUC Minas) com CRUD usando JSON Server como back-end.',
            en: 'Practical assignment for the DIW course (PUC Minas): a CRUD app using JSON Server as the back end.',
        },
        technologies: ['HTML', 'CSS', 'JavaScript', 'JSON Server'],
    },
    {
        repo: 'pizzaria-next',
        name: 'Pizzaria Next',
        date: '2026-07',
        description: {
            pt: 'Sistema de pizzaria com cadastro, login, cardápio e carrinho de compras, com banco de dados via Drizzle ORM.',
            en: 'Pizzeria system with sign-up, login, menu and shopping cart, backed by a database through Drizzle ORM.',
        },
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM'],
        demo: 'https://pizzaria-next-sandy.vercel.app',
    },
    {
        repo: 'calculadora-next',
        name: { pt: 'Calculadora Next', en: 'Next Calculator' },
        date: '2026-07',
        description: {
            pt: 'Calculadora feita em Next.js para consolidar a lógica de programação.',
            en: 'Calculator built with Next.js to strengthen programming logic.',
        },
        technologies: ['Next.js', 'TypeScript', 'React'],
    },
    {
        repo: 'ApiClima-diaw-enzo-gentil-rafael-gomes',
        name: { pt: 'API Clima', en: 'Weather API' },
        date: '2026-08',
        description: {
            pt: 'API de clima desenvolvida em Java para a disciplina de DIAW, em dupla com Rafael Gomes.',
            en: 'Weather API built in Java for the DIAW course, together with Rafael Gomes.',
        },
        technologies: ['Java'],
    },
    {
        repo: 'Pizzaria-java',
        name: 'Pizzaria Java',
        date: '2026-08',
        description: {
            pt: 'Estudo particular de Java e orientação a objetos com um sistema de pizzaria.',
            en: 'Personal study of Java and object-oriented programming through a pizzeria system.',
        },
        technologies: ['Java', { pt: 'POO', en: 'OOP' }],
    },
    {
        repo: 'CallTabs-Cemig-Saude',
        name: 'CallTabs Cemig Saúde',
        date: '2026-09',
        description: {
            pt: 'Aplicação web para a Cemig Saúde, publicada na Vercel.',
            en: 'Web application for Cemig Saúde, deployed on Vercel.',
        },
        technologies: ['HTML', 'CSS', 'JavaScript'],
        demo: 'https://call-tabs-cemig-saude.vercel.app',
    },
].map(({ owner = GITHUB_USER, ...project }) => ({
    ...project,
    github: `https://github.com/${owner}/${project.repo}`,
    image: project.image ?? `https://opengraph.githubassets.com/1/${owner}/${project.repo}`,
}))

export default projects
