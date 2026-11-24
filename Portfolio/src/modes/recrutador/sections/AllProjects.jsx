import projetos, { byNewest } from '../../../content/projetos'
import { localize, useLanguage } from '../../../i18n/LanguageContext'
import ExternalLink from '../ExternalLink'

const sorted = [...projetos].sort(byNewest)
const current = sorted.filter((project) => !project.archive)
const archive = sorted.filter((project) => project.archive)
const archiveYears = archive.map((project) => project.date.slice(0, 4))

function ProjectRow({ project }) {
    const { t, language } = useLanguage()
    const text = t.recruiter

    return (
        <li className='r-row'>
            <span className='r-row-year'>{project.date?.slice(0, 4) ?? '—'}</span>
            <div className='r-row-main'>
                <h3 className='r-row-name'>{localize(project.name, language)}</h3>
                <p className='r-row-stack'>{project.stack.map((tech) => localize(tech, language)).join(' · ')}</p>
            </div>
            <div className='r-row-links'>
                {project.demo && <ExternalLink href={project.demo} className='r-link'>{text.demo}</ExternalLink>}
                {project.github && <ExternalLink href={project.github} className='r-link'>{text.code}</ExternalLink>}
            </div>
        </li>
    )
}

function AllProjects() {
    const { t } = useLanguage()
    const text = t.recruiter

    return (
        <section className='r-section r-container' aria-labelledby='r-all-title'>
            <h2 id='r-all-title' className='r-section-title'>{text.allTitle}</h2>
            <p className='r-section-intro'>{text.allIntro}</p>
            <ul className='r-rows'>
                {current.map((project) => <ProjectRow key={project.id} project={project} />)}
            </ul>

            {archive.length > 0 && (
                <details className='r-archive'>
                    <summary>
                        {text.archive(archiveYears.at(-1), archiveYears[0], archive.length)}
                    </summary>
                    <ul className='r-rows'>
                        {archive.map((project) => <ProjectRow key={project.id} project={project} />)}
                    </ul>
                </details>
            )}
        </section>
    )
}

export default AllProjects
