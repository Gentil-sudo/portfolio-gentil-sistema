import './about.css'
import perfil from '../../content/perfil'
import WakaTimeStats from '../wakaTimeStats/WakaTimeStats'
import { localize, useLanguage } from '../../i18n/LanguageContext'

function About () {
    const { t, language } = useLanguage()
    const labels = t.about
    const text = localize(perfil.about, language)

    return (
        <div className='about-box'>
            <header className='about-header'>
                <div className='about-avatar'>{perfil.initials}</div>
                <div>
                    <p className='about-greeting'>{labels.greeting}</p>
                    <h2 className='about-name'>{perfil.fullName}</h2>
                    <p className='about-role'>{localize(perfil.title, language)}</p>
                    <div className='about-links'>
                        {perfil.contacts.map(({ id, label, href, icon: Icon }) => (
                            <a
                                key={id}
                                href={href}
                                title={label}
                                aria-label={label}
                                target={href.startsWith('mailto:') ? undefined : '_blank'}
                                rel='noreferrer'
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            <section className='about-text'>
                {text.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </section>

            <section>
                <h3 className='about-info-title'>{labels.infoTitle}</h3>
                <dl className='about-info'>
                    {text.info.map(({ label, value }) => (
                        <div key={label} className='about-info-item'>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <footer className='about-footer'>
                <h3 className='about-info-title'>{labels.wakatimeTitle}</h3>
                <WakaTimeStats />
            </footer>
        </div>
    )
}

export default About
