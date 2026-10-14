import './login.css'
import { useEffect, useRef, useState } from 'react'
import { IoArrowForward } from "react-icons/io5";
import Wallpaper from '../../assets/videos/fundo.webp'
import Profile from '../../assets/imgs/profile.webp'
import { LANGUAGES, useLanguage } from '../../i18n/LanguageContext'

const USER_NAME = 'Enzo Gentil'
const SIGN_IN_DURATION = 1200
const FADE_DURATION = 500

function useClock() {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return now
}

function Login({ onDone }) {
    const [step, setStep] = useState('lock')
    const now = useClock()
    const enterButton = useRef(null)
    const { t, language, setLanguage } = useLanguage()

    useEffect(() => {
        if (step !== 'lock') return
        function handleKeyDown() {
            setStep('user')
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [step])

    useEffect(() => {
        if (step === 'user') enterButton.current?.focus()
        if (step !== 'signing-in') return
        const fadeTimer = setTimeout(() => setStep('leaving'), SIGN_IN_DURATION)
        return () => clearTimeout(fadeTimer)
    }, [step])

    useEffect(() => {
        if (step !== 'leaving') return
        const doneTimer = setTimeout(onDone, FADE_DURATION)
        return () => clearTimeout(doneTimer)
    }, [step, onDone])

    const time = now.toLocaleTimeString(t.locale, { hour: '2-digit', minute: '2-digit' })
    const date = now.toLocaleDateString(t.locale, { weekday: 'long', day: 'numeric', month: 'long' })
    const showUser = step !== 'lock'

    return (
        <div
            className={`login ${showUser ? 'login-unlocked' : ''} ${step === 'leaving' ? 'login-leaving' : ''}`}
            style={{ backgroundImage: `url(${Wallpaper})` }}
            onClick={() => step === 'lock' && setStep('user')}
        >
            {/* Trocar o idioma aqui não desbloqueia a tela */}
            <div
                className='login-language'
                role='group'
                aria-label={t.language.label}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
            >
                {LANGUAGES.map((code) => (
                    <button
                        key={code}
                        type='button'
                        className={code === language ? 'login-language-active' : ''}
                        aria-pressed={code === language}
                        onClick={() => setLanguage(code)}
                    >
                        {code.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className='login-lock' aria-hidden={showUser}>
                <time className='login-time'>{time}</time>
                <p className='login-date'>{date}</p>
                <p className='login-hint'>{t.login.hint}</p>
            </div>

            <div className='login-user' aria-hidden={!showUser}>
                <img src={Profile} alt={t.login.photo(USER_NAME)} className='login-avatar' />
                <h1 className='login-name'>{USER_NAME}</h1>

                {step === 'user' ? (
                    <button
                        ref={enterButton}
                        className='login-enter'
                        onClick={() => setStep('signing-in')}
                        tabIndex={showUser ? 0 : -1}
                    >
                        {t.login.enter} <IoArrowForward />
                    </button>
                ) : (
                    <p className='login-welcome' role='status'>
                        <span className='login-spinner' aria-hidden='true' /> {t.login.welcome}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login
