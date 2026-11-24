import perfil from '../../../content/perfil'
import { localize, useLanguage } from '../../../i18n/LanguageContext'

function Hero() {
    const { t, language } = useLanguage()
    const text = t.recruiter

    return (
        <section className='r-hero r-container' aria-labelledby='r-hero-title'>
            <div className='r-hero-text'>
                <p className='r-badge'>
                    <span className='r-badge-dot' aria-hidden='true' />
                    {text.available(perfil.location)}
                </p>
                <p className='r-hero-name'>{perfil.fullName}</p>
                <h1 id='r-hero-title' className='r-hero-title'>{localize(perfil.pitch, language)}</h1>
                <p className='r-hero-summary'>{localize(perfil.summary, language)}</p>
                <p className='r-hero-objective'>
                    {localize(perfil.objective, language)}. {localize(perfil.availability, language)}.
                </p>
                <div className='r-hero-actions'>
                    <a className='r-btn r-btn-primary' href='#projetos'>{text.seeProjects}</a>
                    <a className='r-btn r-btn-ghost' href='#contato'>{text.talk}</a>
                </div>
            </div>
            <img
                className='r-hero-photo'
                src={perfil.photo}
                alt={text.photo(perfil.name)}
                width='320'
                height='320'
                fetchPriority='high'
            />
        </section>
    )
}

export default Hero
