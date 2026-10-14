import './about.css'
import about from '../../data/about'
import contacts from '../../data/contacts'
import WakaTimeStats from '../wakaTimeStats/WakaTimeStats'
import { useLanguage } from '../../i18n/LanguageContext'

function About () {
    const { language } = useLanguage()
    const text = about[language]

    return (
        <div className='about-box'>
            <header className='about-header'>
                <div className='about-avatar'>EG</div>
                <div>
                    <p className='about-greeting'>{text.greeting}</p>
                    <h2 className='about-name'>Enzo Gentil Xavier Barroso</h2>
                    <p className='about-role'>{text.role}</p>
                    <div className='about-links'>
                        {contacts.map(({ id, label, href, icon: Icon }) => (
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
                <h3 className='about-info-title'>{text.infoTitle}</h3>
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
                <h3 className='about-info-title'>{text.wakatime.title}</h3>
                <WakaTimeStats />
            </footer>
        </div>
    )
}

export default About
