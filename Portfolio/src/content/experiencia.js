// Experiências: lidas pelos dois modos (SO e recrutador).
// Textos: uma string só (igual nos dois idiomas) ou { pt, en }
// status: 'atual' | 'em-breve' | 'concluido' (rótulos em src/i18n/translations.js)
// link: { href, label: { pt, en } } opcional
// Campos ainda null estão PENDENTES: não inventar, perguntar ao Enzo.

const experiencia = [
    {
        id: 'nasa-space-apps',
        organization: 'NASA Space Apps Challenge',
        role: {
            pt: 'Participante — time AuroraPucMinas (4 pessoas)',
            en: 'Participant — team AuroraPucMinas (4 people)',
        },
        type: 'Hackathon',
        period: '2026',
        status: 'concluido',
        description: {
            pt: 'No desafio Junior Astronaut Mission Trainer, o time criou o Aurora Station: um jogo para crianças de 7 a 12 anos em que o jogador comanda uma estação espacial em órbita de Marte e aprende fatos reais da NASA. Desenvolvi as missões, pesquisei os temas críticos da vida em Marte (água, energia e o funcionamento da estação) e fiz cerca de 80% da acessibilidade.',
            en: 'For the Junior Astronaut Mission Trainer challenge, the team built Aurora Station: a game for kids aged 7 to 12 in which the player commands a space station orbiting Mars and learns real NASA facts. I built the missions, researched the critical topics of life on Mars (water, energy and how the station works) and did about 80% of the accessibility work.',
        },
        link: {
            href: 'https://hackathon-nasa-aurora.vercel.app',
            label: { pt: 'Jogar o Aurora Station', en: 'Play Aurora Station' },
        },
    },
    {
        id: 'mais-saude',
        organization: '+Saúde',
        role: {
            pt: 'Back-end e deploy — equipe de 6 pessoas',
            en: 'Back end and deployment — team of 6',
        },
        type: { pt: 'Projeto em equipe', en: 'Team project' },
        period: null, // PENDENTE
        status: null, // PENDENTE
        description: {
            pt: 'Desenvolvimento em equipe com Scrum: sprints e quadro Kanban, com React, Spring Boot e MongoDB Atlas. Fiquei com o back-end, o deploy e as funcionalidades de mapa da saúde e de eventos.',
            en: 'Team development with Scrum: sprints and a Kanban board, using React, Spring Boot and MongoDB Atlas. I handled the back end, the deployment and the health map and events features.',
        },
        link: {
            href: 'https://plf-es-2026-2-ti2-7600100-mais-saude.onrender.com/#/',
            label: { pt: 'Ver o +Saúde online', en: 'See +Saúde live' },
        },
    },
    {
        id: 'puc-minas',
        organization: 'PUC Minas',
        role: {
            pt: 'Graduação em Engenharia de Software',
            en: "Bachelor's in Software Engineering",
        },
        type: { pt: 'Acadêmico', en: 'Academic' },
        period: { pt: '2026 – 2029 (previsão)', en: '2026 – 2029 (expected)' },
        status: 'atual',
        description: {
            pt: 'Desenvolvimento de projetos práticos nas disciplinas de DIW, DIAW e Programação Modular, com HTML, CSS, JavaScript, JSON Server e Java. Ingresso com 1º lugar no ProUni para o curso.',
            en: 'Building hands-on projects in the DIW, DIAW and Modular Programming courses with HTML, CSS, JavaScript, JSON Server and Java. Admitted by ranking 1st in ProUni for the program.',
        },
    },
]

export default experiencia
