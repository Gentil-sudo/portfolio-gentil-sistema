
// Textos: uma string só (igual nos dois idiomas) ou { pt, en }
// status: 'atual' | 'em-breve' | 'concluido' (rótulos em src/i18n/translations.js)
const experiences = [
    {
        organization: 'NASA Space Apps Challenge',
        role: {
            pt: 'Participante — time AuroraPucMinas',
            en: 'Participant — team AuroraPucMinas',
        },
        type: 'Hackathon',
        period: '2026',
        status: 'em-breve',
        description: {
            pt: 'Participação no maior hackathon global da NASA com o time AuroraPucMinas, desenvolvendo uma solução para um dos desafios propostos pela agência.',
            en: "Taking part in NASA's largest global hackathon with team AuroraPucMinas, building a solution for one of the challenges proposed by the agency.",
        },
    },
    {
        organization: 'PUC Minas',
        role: {
            pt: 'Graduação em Engenharia de Software',
            en: "Bachelor's in Software Engineering",
        },
        type: { pt: 'Acadêmico', en: 'Academic' },
        period: { pt: '2026 — atual', en: '2026 — present' },
        status: 'atual',
        description: {
            pt: 'Desenvolvimento de projetos práticos nas disciplinas de DIW, DIAW e Programação Modular, com HTML, CSS, JavaScript, JSON Server e Java. Ingresso com 1º lugar no ProUni para o curso.',
            en: 'Building hands-on projects in the DIW, DIAW and Modular Programming courses with HTML, CSS, JavaScript, JSON Server and Java. Admitted by ranking 1st in ProUni for the program.',
        },
    },
]

export default experiences
