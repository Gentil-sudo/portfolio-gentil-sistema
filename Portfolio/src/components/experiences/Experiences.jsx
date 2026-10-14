import './experiences.css'
import experiences from '../../data/experiences'
import { localize, useLanguage } from '../../i18n/LanguageContext'

function Experiences() {
    const { t, language } = useLanguage()

    return (
        <div className='experiences-box'>
            <h2 className='experiences-title'>{t.experiences.title}</h2>
            <ul className='experiences-list'>
                {experiences.map((experience) => (
                    <li key={experience.organization} className='experiences-card'>
                        <div className='experiences-header'>
                            <div>
                                <h3>{experience.organization}</h3>
                                <p className='experiences-role'>{localize(experience.role, language)}</p>
                            </div>
                            <span className={`experiences-status experiences-status-${experience.status}`}>
                                {t.experiences.status[experience.status]}
                            </span>
                        </div>
                        <div className='experiences-meta'>
                            <span>{localize(experience.type, language)}</span>
                            <span>•</span>
                            <span>{localize(experience.period, language)}</span>
                        </div>
                        <p className='experiences-description'>{localize(experience.description, language)}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Experiences
