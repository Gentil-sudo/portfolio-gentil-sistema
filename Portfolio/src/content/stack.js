// Stack agrupada: só o que aparece nos projetos (src/content/projetos.js).
// Textos: uma string só (igual nos dois idiomas) ou { pt, en }

const stack = [
    {
        id: 'front-end',
        title: { pt: 'Front-end', en: 'Front end' },
        items: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Phaser', 'HTML', 'CSS'],
    },
    {
        id: 'back-end',
        title: { pt: 'Back-end', en: 'Back end' },
        items: ['Java', 'Spring Boot', 'Spring Security (JWT)', 'Node.js', 'Express'],
    },
    {
        id: 'dados',
        title: { pt: 'Dados', en: 'Data' },
        items: ['PostgreSQL (Supabase)', 'Row Level Security', 'MongoDB (Atlas)', 'Prisma', 'Drizzle ORM'],
    },
    {
        id: 'qualidade',
        title: { pt: 'Qualidade e entrega', en: 'Quality and delivery' },
        items: [
            { pt: 'Testes de isolamento no banco', en: 'Database isolation tests' },
            'Pytest',
            { pt: 'Acessibilidade (WCAG 2.2 AA, axe-core)', en: 'Accessibility (WCAG 2.2 AA, axe-core)' },
            'Docker',
            'Git e GitHub',
            'Scrum e Kanban',
            'Vercel e Render',
        ],
    },
]

export default stack
