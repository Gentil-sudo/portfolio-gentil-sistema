import './projects.css'
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import projects from '../../data/projects'
import { localize, useLanguage } from '../../i18n/LanguageContext'

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
                        <li key={project.repo} className='projects-item'>
                            <span className='projects-dot' />
                            <time className='projects-date' dateTime={project.date}>{formatDate(project.date, t.locale)}</time>

                            <article className='projects-card'>
                                <img className='projects-img' src={project.image} alt={t.projects.preview(name)} loading='lazy' />
                                <div className='projects-info'>
                                    <h3>{name}</h3>
                                    <p>{localize(project.description, language)}</p>
                                    <ul className='projects-techs'>
                                        {project.technologies.map((tech) => {
                                            const label = localize(tech, language)
                                            return <li key={label}>{label}</li>
                                        })}
                                    </ul>
                                    <div className='projects-links'>
                                        <a href={project.github} target='_blank' rel='noreferrer'>
                                            <FaGithub /> {t.projects.repository}
                                        </a>
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
