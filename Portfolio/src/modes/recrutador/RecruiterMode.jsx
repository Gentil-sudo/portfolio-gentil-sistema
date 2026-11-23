import './recruiter.css'
import { MdOutlineDesktopWindows, MdOutlineFileDownload } from 'react-icons/md'
import perfil from '../../content/perfil'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitch from '../../shared/languageSwitch/LanguageSwitch'

// Modo recrutador. Por enquanto só o cabeçalho, para a troca de modo
// funcionar; as 7 seções entram na Fase 3.
function RecruiterMode({ onSwitchMode }) {
    const { t, language } = useLanguage()
    const text = t.recruiter

    return (
        <div className='recruiter'>
            <header className='recruiter-header'>
                <span className='recruiter-logo'>{perfil.name}</span>
                <div className='recruiter-actions'>
                    <LanguageSwitch />
                    {perfil.resume && (
                        <a className='recruiter-btn' href={localize(perfil.resume, language)} download>
                            <MdOutlineFileDownload aria-hidden='true' /> {text.resume}
                        </a>
                    )}
                    <button type='button' className='recruiter-btn recruiter-btn-ghost' onClick={onSwitchMode}>
                        <MdOutlineDesktopWindows aria-hidden='true' /> {t.modeSwitch.toOs}
                    </button>
                </div>
            </header>

            <main className='recruiter-main'>
                <h1>{perfil.name}</h1>
                <p>{localize(perfil.summary, language)}</p>
                <p className='recruiter-soon'>{text.soon}</p>
            </main>
        </div>
    )
}

export default RecruiterMode
