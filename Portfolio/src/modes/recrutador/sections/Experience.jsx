import experiencia from '../../../content/experiencia'
import { localize, useLanguage } from '../../../i18n/LanguageContext'
import ExternalLink from '../ExternalLink'

function Experience() {
    const { t, language } = useLanguage()
    const text = t.recruiter

    return (
        <section id='experiencia' className='r-section r-container' aria-labelledby='r-experience-title'>
            <h2 id='r-experience-title' className='r-section-title'>{text.experienceTitle}</h2>
            <ol className='r-timeline'>
                {experiencia.map((item) => (
                    <li key={item.id} className='r-timeline-item'>
                        <p className='r-timeline-meta'>
                            {item.period && <span>{localize(item.period, language)}</span>}
                            <span>{localize(item.type, language)}</span>
                            {item.status && <span className={`r-tag r-tag-${item.status}`}>{t.experiences.status[item.status]}</span>}
                        </p>
                        <h3 className='r-timeline-title'>{item.organization}</h3>
                        <p className='r-timeline-role'>{localize(item.role, language)}</p>
                        <p className='r-timeline-description'>{localize(item.description, language)}</p>
                        {item.link && (
                            <ExternalLink href={item.link.href} className='r-link'>
                                {localize(item.link.label, language)}
                            </ExternalLink>
                        )}
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default Experience
