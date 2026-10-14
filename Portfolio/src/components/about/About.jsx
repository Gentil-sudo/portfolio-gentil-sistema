import './About.css'
import { useState } from 'react'
import about from '../../data/about'
import contacts from '../../data/contacts'
import WakaTime from '../wakatime/WakaTime'

function About () {
    const [language, setLanguage] = useState('pt')
    const text = about[language]

    return (
        <div className='about-box' lang={language === 'pt' ? 'pt-BR' : 'en'}>
            <div className='about-language'>
                <span>{text.switchLabel}:</span>
                <button
                    className={`about-language-btn ${language === 'pt' ? 'about-language-active' : ''}`}
                    onClick={() => setLanguage('pt')}
                >
                    PT
                </button>
                <button
                    className={`about-language-btn ${language === 'en' ? 'about-language-active' : ''}`}
                    onClick={() => setLanguage('en')}
                >
                    EN
                </button>
            </div>

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

            <WakaTime {...text.wakatime} />
        </div>
    )
}

export default About
