import './recruiter.css'
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import { MdOutlineDesktopWindows, MdOutlineFileDownload } from 'react-icons/md'
import perfil from '../../content/perfil'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitch from '../../shared/languageSwitch/LanguageSwitch'
import ThemeButton from '../../shared/themeButton/ThemeButton'
import Hero from './sections/Hero'
import Featured from './sections/Featured'
import AllProjects from './sections/AllProjects'
import Experience from './sections/Experience'
import Stack from './sections/Stack'
import Contact from './sections/Contact'

// Modo recrutador: uma página só, que responde em 30 segundos quem é o
// Enzo, o que já construiu e como falar com ele. Sem animação de entrada
// e sem WakaTime. Visual editorial (artboard "C").
function RecruiterMode({ theme, onToggleTheme, onSwitchMode }) {
    const { t, language } = useLanguage()
    const text = t.recruiter

    return (
        <div className='recruiter'>
            <a className='r-skip' href='#conteudo'>{text.skip}</a>

            <header className='r-header'>
                <div className='r-header-inner'>
                    <a className='r-logo' href='#conteudo'>{perfil.name}</a>

                    <nav className='r-nav' aria-label={text.nav.label}>
                        <a href='#projetos'>{text.nav.projects}</a>
                        <a href='#experiencia'>{text.nav.experience}</a>
                        <a href='#contato'>{text.nav.contact}</a>
                    </nav>

                    <div className='r-header-actions'>
                        <LanguageSwitch />
                        <ThemeButton className='r-icon-btn' theme={theme} onToggle={onToggleTheme} />
                        {perfil.resume && (
                            <a className='r-btn r-btn-primary r-btn-small' href={localize(perfil.resume, language)} download>
                                <MdOutlineFileDownload aria-hidden='true' /> {text.resume}
                            </a>
                        )}
                        <button type='button' className='r-btn r-btn-ghost r-btn-small' onClick={onSwitchMode}>
                            <MdOutlineDesktopWindows aria-hidden='true' /> {t.modeSwitch.toOs}
                        </button>
                    </div>
                </div>
            </header>

            <main id='conteudo' tabIndex={-1}>
                <Hero />
                <Featured />
                <AllProjects />
                <Experience />
                <Stack />
                <Contact />
            </main>
        </div>
    )
}

export default RecruiterMode
