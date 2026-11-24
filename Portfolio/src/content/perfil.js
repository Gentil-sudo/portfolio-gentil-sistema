import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import Photo from '../assets/imgs/profile.webp'

// Quem eu sou: lido pelos dois modos (SO e recrutador).
// Textos: uma string só (igual nos dois idiomas) ou { pt, en }.
// Os rótulos da interface ("Olá, eu sou", "Informações"...) ficam em src/i18n/translations.js

export const EMAIL = 'enzogentil.profissional@gmail.com'

const perfil = {
    name: 'Enzo Gentil',
    fullName: 'Enzo Gentil Xavier Barroso',
    initials: 'EG',
    photo: Photo,

    title: {
        pt: 'Estudante de Engenharia de Software',
        en: 'Software Engineering Student',
    },
    // Linha curta para a tela de escolha e os cabeçalhos
    headline: {
        pt: 'Estudante de Engenharia de Software · PUC Minas',
        en: 'Software Engineering Student · PUC Minas',
    },
    // Frase de abertura do modo recrutador
    pitch: {
        pt: 'Construo aplicações web completas, do banco de dados à interface.',
        en: 'I build complete web applications, from the database to the interface.',
    },
    // Resumo curto (janela Destaques e hero do modo recrutador)
    summary: {
        pt: 'Estudante de Engenharia de Software na PUC Minas, aprovado em 1º lugar no ProUni. Uso React e TypeScript no front-end e Java com Spring Boot no back-end, com PostgreSQL e MongoDB.',
        en: 'Software Engineering student at PUC Minas, ranked 1st in ProUni for the program. I use React and TypeScript on the front end and Java with Spring Boot on the back end, with PostgreSQL and MongoDB.',
    },
    location: 'Belo Horizonte',
    objective: {
        pt: 'Primeiro estágio em desenvolvimento, em Belo Horizonte: presencial, híbrido ou remoto',
        en: 'First internship as a developer, in Belo Horizonte: on-site, hybrid or remote',
    },
    // Estudo à noite
    availability: {
        pt: 'Disponível nos turnos da manhã e da tarde',
        en: 'Available mornings and afternoons',
    },
    languages: {
        pt: 'Português nativo · Inglês intermediário',
        en: 'Portuguese (native) · English (intermediate)',
    },

    // PDFs em public/, um por idioma
    resume: {
        pt: '/enzo-gentil-curriculo-pt.pdf',
        en: '/enzo-gentil-curriculo-en.pdf',
    },

    contacts: [
        { id: 'email', label: 'E-mail', href: `mailto:${EMAIL}`, icon: MdOutlineEmail },
        { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/5533998287887', icon: FaWhatsapp },
        { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/enzo-gentil-xavier/', icon: FaLinkedin },
        { id: 'github', label: 'GitHub', href: 'https://github.com/Gentil-sudo', icon: FaGithub },
    ],

    // Texto da janela "Sobre mim"
    about: {
        pt: {
            paragraphs: [
                'Tenho 21 anos e curso Engenharia de Software na PUC Minas (2026 – 2029, previsão). Conquistei minha vaga sendo aprovado em 1º lugar no ProUni para o curso.',
                'Minha área de atuação é o desenvolvimento web. Já criei projetos com HTML, CSS, JavaScript, React, Next.js e Node.js, e na faculdade venho aprofundando em Java e programação orientada a objetos.',
                'Meu objetivo é conquistar meu primeiro estágio na área de desenvolvimento, continuar evoluindo como engenheiro de software e participar de projetos e eventos que me desafiem, como o NASA Space Apps Challenge 2026, de que participei com o time AuroraPucMinas.',
            ],
            info: [
                { label: 'Formação', value: 'Engenharia de Software — PUC Minas (2026 – 2029, previsão)' },
                { label: 'Destaque', value: '1º lugar no ProUni para Engenharia de Software' },
                { label: 'Interesses', value: 'Desenvolvimento web, front-end, back-end e hackathons' },
            ],
        },
        en: {
            paragraphs: [
                "I'm 21 years old and I study Software Engineering at PUC Minas (2026 – 2029, expected). I earned my place by ranking 1st in ProUni (Brazil's university scholarship program) for the course.",
                "My field is web development. I've built projects with HTML, CSS, JavaScript, React, Next.js and Node.js, and at university I've been going deeper into Java and object-oriented programming.",
                'My goal is to land my first internship as a developer, keep growing as a software engineer and take part in projects and events that challenge me, such as the NASA Space Apps Challenge 2026, which I joined with team AuroraPucMinas.',
            ],
            info: [
                { label: 'Education', value: 'Software Engineering — PUC Minas (2026 – 2029, expected)' },
                { label: 'Highlight', value: 'Ranked 1st in ProUni for Software Engineering' },
                { label: 'Interests', value: 'Web development, front-end, back-end and hackathons' },
            ],
        },
    },
}

export default perfil
