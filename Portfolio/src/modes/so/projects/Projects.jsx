import './projects.css'
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import projetos, { byNewest, featuredProjects } from '../../../content/projetos'
import { localize, useLanguage } from '../../../i18n/LanguageContext'

// Destaques no topo; depois o resto do mais novo para o mais antigo;
// estudos antigos num bloco "Arquivo" compacto no fim
const others = projetos.filter((project) => !project.featured && !project.archive).sort(byNewest)
const archive = projetos.filter((project) => project.archive).sort(byNewest)
const archiveYears = archive.map((project) => project.date.slice(0, 4))

function formatDate(date, locale) {
    const [year, month] = date.split('-')
    return new Date(year, month - 1).toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

function ProjectLinks({ project }) {
    const { t } = useLanguage()

    return (
        <div className='projects-links'>
            {project.demo && (
                <a href={project.demo} target='_blank' rel='noreferrer'>
                    <FiExternalLink aria-hidden='true' /> {t.projects.demo}
                </a>
            )}
            {project.github && (
                <a href={project.github} target='_blank' rel='noreferrer'>
                    <FaGithub aria-hidden='true' /> {t.projects.repository}
                </a>
            )}
        </div>
    )
}

function Techs({ stack }) {
    const { language } = useLanguage()

    return (
        <ul className='projects-techs'>
            {stack.map((tech) => {
                const label = localize(tech, language)
                return <li key={label}>{label}</li>
            })}
        </ul>
    )
}

function ProjectCard({ project, withImage }) {
    const { t, language } = useLanguage()
    const name = localize(project.name, language)

    return (
        <article className='projects-card'>
            {withImage && project.image && (
                <img
                    className='projects-img'
                    src={project.image}
                    alt={t.projects.preview(name)}
                    width='800'
                    height='500'
                    loading='lazy'
                    decoding='async'
                />
            )}
            <div className='projects-info'>
                <h3>{name}</h3>
                <p>{localize(project.description, language)}</p>
                <Techs stack={project.stack} />
                <ProjectLinks project={project} />
            </div>
        </article>
    )
}

function Projects() {
    const { t, language } = useLanguage()

    return (
        <div className='projects-box'>
            <section aria-labelledby='projects-featured-title'>
                <h2 id='projects-featured-title' className='projects-title'>{t.projects.featured}</h2>
                <div className='projects-featured'>
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} withImage />
                    ))}
                </div>
            </section>

            <section aria-labelledby='projects-timeline-title'>
                <h2 id='projects-timeline-title' className='projects-title'>{t.projects.title}</h2>
                <p className='projects-intro'>{t.projects.titleIntro}</p>
                <ol className='projects-timeline'>
                    {others.map((project) => (
                        <li key={project.id} className='projects-item'>
                            <span className='projects-dot' aria-hidden='true' />
                            {project.date && (
                                <time className='projects-date' dateTime={project.date}>{formatDate(project.date, t.locale)}</time>
                            )}
                            <ProjectCard project={project} />
                        </li>
                    ))}
                </ol>
            </section>

            {archive.length > 0 && (
                <details className='projects-archive'>
                    <summary>{t.projects.archive(archiveYears.at(-1), archiveYears[0], archive.length)}</summary>
                    <ul>
                        {archive.map((project) => (
                            <li key={project.id} className='projects-archive-row'>
                                <span className='projects-archive-year'>{project.date.slice(0, 4)}</span>
                                <div>
                                    <h3>{localize(project.name, language)}</h3>
                                    <p>{project.stack.map((tech) => localize(tech, language)).join(' · ')}</p>
                                </div>
                                <ProjectLinks project={project} />
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </div>
    )
}

export default Projects
