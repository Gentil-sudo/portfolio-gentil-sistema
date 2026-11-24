import './explorer.css'
import { useEffect, useRef, useState } from 'react'
import { MdArrowBack } from "react-icons/md";
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
import { useLanguage } from '../../../i18n/LanguageContext'

// Abaixo disto as janelas viram "apps de celular": tela cheia, sem arrastar,
// com um botão de voltar (mesmo valor do explorer.css)
const MOBILE_QUERY = '(max-width: 768px)'

function Explorer({ app, hidden, onClose, onMinimize, children }) {
    const [maximized, setMaximized] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const dragStart = useRef(null)
    const windowRef = useRef(null)
    const { t } = useLanguage()
    const title = t.apps[app.id]
    const titleId = `explorer-title-${app.id}`

    const Icon = app.icon

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    // Quem navega pelo teclado (ou leitor de tela) cai dentro da janela que abriu
    useEffect(() => {
        if (!hidden) windowRef.current?.focus({ preventScroll: true })
    }, [hidden])

    function handlePointerDown(event) {
        if (maximized || event.target.closest('button')) return
        if (window.matchMedia(MOBILE_QUERY).matches) return
        event.currentTarget.setPointerCapture(event.pointerId)
        dragStart.current = {
            mouseX: event.clientX,
            mouseY: event.clientY,
            x: position.x,
            y: position.y,
        }
    }

    function handlePointerMove(event) {
        if (!dragStart.current) return
        setPosition({
            x: dragStart.current.x + event.clientX - dragStart.current.mouseX,
            y: dragStart.current.y + event.clientY - dragStart.current.mouseY,
        })
    }

    function handlePointerUp() {
        dragStart.current = null
    }

    const style = maximized ? undefined : {
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
    }

    return (
        <div
            ref={windowRef}
            className={`explorer-window ${maximized ? 'explorer-maximized' : ''} ${hidden ? 'explorer-hidden' : ''}`}
            style={style}
            role='dialog'
            aria-labelledby={titleId}
            tabIndex={-1}
        >
            <header
                className='explorer-titleBar'
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onDoubleClick={() => setMaximized(!maximized)}
            >
                {/* Só no celular: volta para a área de trabalho */}
                <button type='button' className='explorer-back' aria-label={t.explorer.back} onClick={onClose}>
                    <MdArrowBack aria-hidden='true' />
                </button>
                <div className='explorer-title'>
                    <Icon aria-hidden='true' />
                    <span id={titleId}>{title}</span>
                </div>
                <div className='explorer-controls'>
                    <button type='button' className='explorer-control-btn' title={t.explorer.minimize} aria-label={t.explorer.minimize} onClick={onMinimize}>
                        <VscChromeMinimize aria-hidden='true' />
                    </button>
                    <button
                        type='button'
                        className='explorer-control-btn explorer-maximize-btn'
                        title={maximized ? t.explorer.restore : t.explorer.maximize}
                        aria-label={maximized ? t.explorer.restore : t.explorer.maximize}
                        onClick={() => setMaximized(!maximized)}
                    >
                        {maximized ? <VscChromeRestore aria-hidden='true' /> : <VscChromeMaximize aria-hidden='true' />}
                    </button>
                    <button type='button' className='explorer-control-btn explorer-close-btn' title={t.explorer.close} aria-label={t.explorer.close} onClick={onClose}>
                        <VscChromeClose aria-hidden='true' />
                    </button>
                </div>
            </header>

            <div className='explorer-pathBar'>
                <span>{t.explorer.thisPc}</span>
                <span className='explorer-path-separator' aria-hidden='true'>›</span>
                <span>{title}</span>
            </div>

            <section className='explorer-content'>
                {children}
            </section>
        </div>
    )
}

export default Explorer
