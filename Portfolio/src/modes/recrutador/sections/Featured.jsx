import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { featuredProjects } from '../../../content/projetos'
import { localize, useLanguage } from '../../../i18n/LanguageContext'
import ExternalLink from '../ExternalLink'

// "Projeto pessoal" · "Em equipe · 6 pessoas" · "PUC Minas"
function contextLabel(project, text) {
    const parts = []
    if (project.context) parts.push(text.context[project.context])
    if (project.team) parts.push(text.team(project.team))
    return parts.join(' · ')
}

function ProjectCard({ project, priority }) {
    const { t, language } = useLanguage()
    const text = t.recruiter
    const name = localize(project.name, language)
    const context = contextLabel(project, text)

    return (
        <article className='r-card' aria-labelledby={`r-card-${project.id}`}>
            {project.image && (
                <img
                    className='r-card-img'
                    src={project.image}
                    alt={text.screenshot(name)}
                    width='800'
                    height='500'
                    loading={priority ? 'eager' : 'lazy'}
                    decoding='async'
                />
            )}
            <div className='r-card-body'>
                <p className='r-card-meta'>
                    {context && <span>{context}</span>}
                    {project.date && <span>{project.date.slice(0, 4)}</span>}
                    {project.inProgress && <span className='r-tag'>{text.inProgress}</span>}
                </p>
                {/* Stack principal logo no topo: quem passa rápido já vê as tecnologias */}
                <ul className='r-card-tags' aria-label={text.mainStack}>
                    {project.mainStack.map((tech) => <li key={tech}>{tech}</li>)}
                </ul>
                <h3 id={`r-card-${project.id}`} className='r-card-title'>{name}</h3>
                <p className='r-card-description'>{localize(project.description, language)}</p>

                <dl className='r-card-details'>
                    {project.whatIDid && (
                        <div>
                            <dt>{text.whatIDid}</dt>
                            <dd>{localize(project.whatIDid, language)}</dd>
                        </div>
                    )}
                    {project.technicalHighlight && (
                        <div>
                            <dt>{text.highlight}</dt>
                            <dd>{localize(project.technicalHighlight, language)}</dd>
                        </div>
                    )}
                    <div>
                        <dt>{text.stack}</dt>
                        <dd>
                            <ul className='r-chips'>
                                {project.stack.map((tech) => {
                                    const label = localize(tech, language)
                                    return <li key={label}>{label}</li>
                                })}
                            </ul>
                        </dd>
                    </div>
                </dl>

                <div className='r-card-links'>
                    {project.demo && (
                        <ExternalLink href={project.demo} className='r-link'>
                            <FiExternalLink aria-hidden='true' /> {text.demo}
                        </ExternalLink>
                    )}
                    {project.github && (
                        <ExternalLink href={project.github} className='r-link'>
                            <FaGithub aria-hidden='true' /> {text.code}
                        </ExternalLink>
                    )}
                </div>
            </div>
        </article>
    )
}

function Featured() {
    const { t } = useLanguage()

    return (
        <section id='projetos' className='r-section r-container' aria-labelledby='r-featured-title'>
            <h2 id='r-featured-title' className='r-section-title'>{t.recruiter.featuredTitle}</h2>
            <div className='r-cards'>
                {featuredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} priority={index < 2} />
                ))}
            </div>
        </section>
    )
}

export default Featured
