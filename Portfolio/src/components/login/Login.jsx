import './login.css'
import { useEffect, useRef, useState } from 'react'
import { IoArrowForward } from "react-icons/io5";
import Wallpaper from '../../assets/videos/fundo.webp'
import Profile from '../../assets/imgs/profile.webp'

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

    const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    const date = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    const showUser = step !== 'lock'

    return (
        <div
            className={`login ${showUser ? 'login-unlocked' : ''} ${step === 'leaving' ? 'login-leaving' : ''}`}
            style={{ backgroundImage: `url(${Wallpaper})` }}
            onClick={() => step === 'lock' && setStep('user')}
        >
            <div className='login-lock' aria-hidden={showUser}>
                <time className='login-time'>{time}</time>
                <p className='login-date'>{date}</p>
                <p className='login-hint'>Clique ou pressione qualquer tecla para entrar</p>
            </div>

            <div className='login-user' aria-hidden={!showUser}>
                <img src={Profile} alt={`Foto de ${USER_NAME}`} className='login-avatar' />
                <h1 className='login-name'>{USER_NAME}</h1>

                {step === 'user' ? (
                    <button
                        ref={enterButton}
                        className='login-enter'
                        onClick={() => setStep('signing-in')}
                        tabIndex={showUser ? 0 : -1}
                    >
                        Entrar <IoArrowForward />
                    </button>
                ) : (
                    <p className='login-welcome' role='status'>
                        <span className='login-spinner' aria-hidden='true' /> Bem-vindo
                    </p>
                )}
            </div>
        </div>
    )
}

export default Login
