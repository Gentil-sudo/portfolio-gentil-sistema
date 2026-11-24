import './highlights.css'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { MdArrowForward, MdOutlineArticle, MdOutlineFileDownload } from 'react-icons/md'
import perfil from '../../../content/perfil'
import { featuredProjects } from '../../../content/projetos'
import { localize, useLanguage } from '../../../i18n/LanguageContext'

// Janela que abre sozinha ao entrar no modo SO: quem é, o principal
// e os 4 projetos em destaque.
function Highlights({ onSwitchMode, onOpenApp }) {
    const { t, language } = useLanguage()
    const text = t.highlights

    return (
        <div className='highlights'>
            <header className='highlights-header'>
                <img
                    className='highlights-photo'
                    src={perfil.photo}
                    alt={text.photo(perfil.name)}
                    width='96'
                    height='96'
                />
                <div className='highlights-intro'>
                    <h2 className='highlights-name'>{perfil.name}</h2>
                    <p className='highlights-headline'>{localize(perfil.headline, language)}</p>
                    <p className='highlights-pitch'>{localize(perfil.pitch, language)}</p>
                    <div className='highlights-actions'>
                        {perfil.resume && (
                            <a className='highlights-btn highlights-btn-primary' href={localize(perfil.resume, language)} download>
                                <MdOutlineFileDownload aria-hidden='true' /> {text.resume}
                            </a>
                        )}
                        <button type='button' className='highlights-btn' onClick={onSwitchMode}>
                            <MdOutlineArticle aria-hidden='true' /> {t.modeSwitch.toRecruiter}
                        </button>
                    </div>
                </div>
            </header>

            <section aria-labelledby='highlights-featured-title'>
                <h3 id='highlights-featured-title' className='highlights-title'>{text.featured}</h3>
                <ul className='highlights-projects'>
                    {featuredProjects.map((project) => {
                        const name = localize(project.name, language)
                        return (
                            <li key={project.id} className='highlights-project'>
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={t.projects.preview(name)}
                                        width='800'
                                        height='500'
                                        decoding='async'
                                    />
                                )}
                                <div className='highlights-project-body'>
                                    <h4>{name}</h4>
                                    <ul className='highlights-project-tags' aria-label={t.recruiter.mainStack}>
                                        {project.mainStack.map((tech) => <li key={tech}>{tech}</li>)}
                                    </ul>
                                    <p>{localize(project.description, language)}</p>
                                    <div className='highlights-project-links'>
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
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <button type='button' className='highlights-more' onClick={() => onOpenApp('projetos')}>
                    {text.allProjects} <MdArrowForward aria-hidden='true' />
                </button>
            </section>
        </div>
    )
}

export default Highlights
