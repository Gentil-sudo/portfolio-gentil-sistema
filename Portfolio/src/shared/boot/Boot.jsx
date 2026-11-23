import './boot.css'
import { useEffect, useState } from 'react'
import Logo from '../../assets/imgs/logo.png'
import { useLanguage } from '../../i18n/LanguageContext'

const BOOT_DURATION = 2800
const FADE_DURATION = 500

function Boot({ onDone }) {
    const [leaving, setLeaving] = useState(false)
    const { t } = useLanguage()

    useEffect(() => {
        const fadeTimer = setTimeout(() => setLeaving(true), BOOT_DURATION)
        const doneTimer = setTimeout(onDone, BOOT_DURATION + FADE_DURATION)
        return () => {
            clearTimeout(fadeTimer)
            clearTimeout(doneTimer)
        }
    }, [onDone])

    return (
        <div className={`boot ${leaving ? 'boot-leaving' : ''}`} role='status' aria-label={t.boot.loading}>
            <img src={Logo} alt='' className='boot-logo' />
            <div className='boot-spinner' aria-hidden='true'>
                {[0, 1, 2, 3, 4].map((dot) => (
                    <span key={dot} style={{ animationDelay: `${dot * 0.14}s` }} />
                ))}
            </div>
        </div>
    )
}

export default Boot
