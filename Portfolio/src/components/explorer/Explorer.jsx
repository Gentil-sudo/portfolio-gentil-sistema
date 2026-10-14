import './explorer.css'
import { useEffect, useRef, useState } from 'react'
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";
import { useLanguage } from '../../i18n/LanguageContext'

function Explorer({ app, hidden, onClose, onMinimize, children }) {
    const [maximized, setMaximized] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const dragStart = useRef(null)
    const { t } = useLanguage()
    const title = t.apps[app.id]

    const Icon = app.icon

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    function handlePointerDown(event) {
        if (maximized || event.target.closest('button')) return
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
            className={`explorer-window ${maximized ? 'explorer-maximized' : ''} ${hidden ? 'explorer-hidden' : ''}`}
            style={style}
            role='dialog'
            aria-label={title}
        >
            <header
                className='explorer-titleBar'
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onDoubleClick={() => setMaximized(!maximized)}
            >
                <div className='explorer-title'>
                    <Icon />
                    <span>{title}</span>
                </div>
                <div className='explorer-controls'>
                    <button className='explorer-control-btn' title={t.explorer.minimize} onClick={onMinimize}>
                        <VscChromeMinimize />
                    </button>
                    <button className='explorer-control-btn' title={maximized ? t.explorer.restore : t.explorer.maximize} onClick={() => setMaximized(!maximized)}>
                        {maximized ? <VscChromeRestore /> : <VscChromeMaximize />}
                    </button>
                    <button className='explorer-control-btn explorer-close-btn' title={t.explorer.close} onClick={onClose}>
                        <VscChromeClose />
                    </button>
                </div>
            </header>

            <div className='explorer-pathBar'>
                <span>{t.explorer.thisPc}</span>
                <span className='explorer-path-separator'>›</span>
                <span>{title}</span>
            </div>

            <section className='explorer-content'>
                {children}
            </section>
        </div>
    )
}

export default Explorer
