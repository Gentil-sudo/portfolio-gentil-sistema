import './choice.css'
import { useEffect, useRef, useState } from 'react'
import { MdArrowForward, MdOutlineArticle, MdOutlineDesktopWindows } from 'react-icons/md'
import perfil from '../../content/perfil'
import { localize, useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitch from '../languageSwitch/LanguageSwitch'

// Tela de escolha: Modo recrutador (em destaque) ou Visualização comum (SO).
// onChoose(mode, remember)
function Choice({ onChoose }) {
    const [remember, setRemember] = useState(true)
    const { t, language } = useLanguage()
    const text = t.choice
    const titleRef = useRef(null)

    // Leitores de tela começam pelo título, não pelo meio da página
    useEffect(() => {
        titleRef.current?.focus()
    }, [])

    const cards = [
        { mode: 'recrutador', icon: MdOutlineArticle, ...text.recruiter, primary: true },
        { mode: 'so', icon: MdOutlineDesktopWindows, ...text.os },
    ]

    return (
        <main className='choice'>
            <div className='choice-inner'>
                <div className='choice-language'>
                    <LanguageSwitch />
                </div>

                <header className='choice-header'>
                    <img
                        src={perfil.photo}
                        alt={text.photo(perfil.name)}
                        className='choice-photo'
                        width='112'
                        height='112'
                    />
                    <h1 className='choice-name' ref={titleRef} tabIndex={-1}>{perfil.name}</h1>
                    <p className='choice-headline'>{localize(perfil.headline, language)}</p>
                </header>

                <h2 className='choice-question'>{text.question}</h2>

                <div className='choice-cards'>
                    {cards.map(({ mode, icon: Icon, title, description, cta, badge, primary }) => (
                        <button
                            key={mode}
                            type='button'
                            className={`choice-card ${primary ? 'choice-card-primary' : ''}`}
                            onClick={() => onChoose(mode, remember)}
                        >
                            {badge && <span className='choice-badge'>{badge}</span>}
                            <Icon className='choice-card-icon' aria-hidden='true' />
                            <span className='choice-card-title'>{title}</span>
                            <span className='choice-card-description'>{description}</span>
                            <span className='choice-card-cta' aria-hidden='true'>
                                {cta} <MdArrowForward />
                            </span>
                        </button>
                    ))}
                </div>

                <label className='choice-remember'>
                    <input
                        type='checkbox'
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                    />
                    {text.remember}
                </label>
            </div>
        </main>
    )
}

export default Choice
