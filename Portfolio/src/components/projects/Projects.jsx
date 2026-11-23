import './projects.css'
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import projetos from '../../content/projetos'
import { localize, useLanguage } from '../../i18n/LanguageContext'

// Linha do tempo do mais antigo para o mais novo (a ordem atual do modo SO);
// projetos ainda sem data ficam no fim
const projects = [
    ...projetos.filter((project) => project.date).sort((a, b) => a.date.localeCompare(b.date)),
    ...projetos.filter((project) => !project.date),
]

function formatDate(date, locale) {
    const [year, month] = date.split('-')
    return new Date(year, month - 1).toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

function Projects() {
    const { t, language } = useLanguage()

    return (
        <div className='projects-box'>
            <h2 className='projects-title'>{t.projects.title}</h2>
            <ol className='projects-timeline'>
                {projects.map((project) => {
                    const name = localize(project.name, language)

                    return (
                        <li key={project.id} className='projects-item'>
                            <span className='projects-dot' />
                            {project.date && (
                                <time className='projects-date' dateTime={project.date}>{formatDate(project.date, t.locale)}</time>
                            )}

                            <article className='projects-card'>
                                {project.image && (
                                    <img className='projects-img' src={project.image} alt={t.projects.preview(name)} loading='lazy' />
                                )}
                                <div className='projects-info'>
                                    <h3>{name}</h3>
                                    <p>{localize(project.description, language)}</p>
                                    <ul className='projects-techs'>
                                        {project.stack.map((tech) => {
                                            const label = localize(tech, language)
                                            return <li key={label}>{label}</li>
                                        })}
                                    </ul>
                                    <div className='projects-links'>
                                        {project.github && (
                                            <a href={project.github} target='_blank' rel='noreferrer'>
                                                <FaGithub /> {t.projects.repository}
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a href={project.demo} target='_blank' rel='noreferrer'>
                                                <FiExternalLink /> {t.projects.demo}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default Projects
