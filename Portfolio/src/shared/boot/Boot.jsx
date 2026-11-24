import './boot.css'
import { useEffect, useState } from 'react'
import Logo from '../../assets/imgs/logo.webp'
import { useLanguage } from '../../i18n/LanguageContext'

// Some assim que o essencial carrega, sem tempo mínimo artificial.
// MAX_WAIT só garante que ninguém fica preso se uma imagem travar.
const FADE_DURATION = 300
const MAX_WAIT = 4000

function waitForPageLoad() {
    if (document.readyState === 'complete') return Promise.resolve()
    return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
}

function preloadImage(src) {
    const image = new Image()
    image.src = src
    return image.decode().catch(() => {})
}

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// preload: imagens da próxima tela, para ela já abrir completa
function Boot({ onDone, preload }) {
    const [leaving, setLeaving] = useState(false)
    const { t } = useLanguage()

    useEffect(() => {
        let cancelled = false
        let doneTimer = null

        const ready = Promise.all([waitForPageLoad(), ...(preload ?? []).map(preloadImage)])
        const limit = new Promise((resolve) => setTimeout(resolve, MAX_WAIT))

        Promise.race([ready, limit]).then(() => {
            if (cancelled) return
            if (prefersReducedMotion()) {
                onDone()
                return
            }
            setLeaving(true)
            doneTimer = setTimeout(onDone, FADE_DURATION)
        })

        return () => {
            cancelled = true
            clearTimeout(doneTimer)
        }
    }, [onDone, preload])

    return (
        <div className={`boot ${leaving ? 'boot-leaving' : ''}`} role='status' aria-label={t.boot.loading}>
            <img src={Logo} alt='' className='boot-logo' width='440' height='240' />
            <div className='boot-spinner' aria-hidden='true'>
                {[0, 1, 2, 3, 4].map((dot) => (
                    <span key={dot} style={{ animationDelay: `${dot * 0.14}s` }} />
                ))}
            </div>
        </div>
    )
}

export default Boot
