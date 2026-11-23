import './experiences.css'
import { FiExternalLink } from "react-icons/fi";
import experiencia from '../../../content/experiencia'
import { localize, useLanguage } from '../../../i18n/LanguageContext'

function Experiences() {
    const { t, language } = useLanguage()

    return (
        <div className='experiences-box'>
            <h2 className='experiences-title'>{t.experiences.title}</h2>
            <ul className='experiences-list'>
                {experiencia.map((experience) => (
                    <li key={experience.id} className='experiences-card'>
                        <div className='experiences-header'>
                            <div>
                                <h3>{experience.organization}</h3>
                                <p className='experiences-role'>{localize(experience.role, language)}</p>
                            </div>
                            {experience.status && (
                                <span className={`experiences-status experiences-status-${experience.status}`}>
                                    {t.experiences.status[experience.status]}
                                </span>
                            )}
                        </div>
                        <div className='experiences-meta'>
                            <span>{localize(experience.type, language)}</span>
                            {experience.period && (
                                <>
                                    <span>•</span>
                                    <span>{localize(experience.period, language)}</span>
                                </>
                            )}
                        </div>
                        <p className='experiences-description'>{localize(experience.description, language)}</p>
                        {experience.link && (
                            <a className='experiences-link' href={experience.link.href} target='_blank' rel='noreferrer'>
                                <FiExternalLink /> {localize(experience.link.label, language)}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Experiences
