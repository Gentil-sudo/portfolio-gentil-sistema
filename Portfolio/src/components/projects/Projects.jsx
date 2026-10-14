import './Projects.css'
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import projects from '../../data/projects'

function formatDate(date) {
    const [year, month] = date.split('-')
    return new Date(year, month - 1).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
}

function Projects() {
    return (
        <div className='projects-box'>
            <h2 className='projects-title'>Linha do tempo</h2>
            <ol className='projects-timeline'>
                {projects.map((project) => (
                    <li key={project.repo} className='projects-item'>
                        <span className='projects-dot' />
                        <time className='projects-date' dateTime={project.date}>{formatDate(project.date)}</time>

                        <article className='projects-card'>
                            <img className='projects-img' src={project.image} alt={`Prévia do projeto ${project.name}`} loading='lazy' />
                            <div className='projects-info'>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <ul className='projects-techs'>
                                    {project.technologies.map((tech) => (
                                        <li key={tech}>{tech}</li>
                                    ))}
                                </ul>
                                <div className='projects-links'>
                                    <a href={project.github} target='_blank' rel='noreferrer'>
                                        <FaGithub /> Repositório
                                    </a>
                                    {project.demo && (
                                        <a href={project.demo} target='_blank' rel='noreferrer'>
                                            <FiExternalLink /> Ver online
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Projects
