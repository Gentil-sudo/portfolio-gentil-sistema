import './explorer.css'
import { useEffect, useRef, useState } from 'react'
import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from "react-icons/vsc";

function Explorer({ app, hidden, onClose, onMinimize, children }) {
    const [maximized, setMaximized] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const dragStart = useRef(null)

    const Icon = app.icon

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    // Arrastar a janela pela barra de título
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
            aria-label={app.title}
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
                    <span>{app.title}</span>
                </div>
                <div className='explorer-controls'>
                    <button className='explorer-control-btn' title='Minimizar' onClick={onMinimize}>
                        <VscChromeMinimize />
                    </button>
                    <button className='explorer-control-btn' title={maximized ? 'Restaurar' : 'Maximizar'} onClick={() => setMaximized(!maximized)}>
                        {maximized ? <VscChromeRestore /> : <VscChromeMaximize />}
                    </button>
                    <button className='explorer-control-btn explorer-close-btn' title='Fechar' onClick={onClose}>
                        <VscChromeClose />
                    </button>
                </div>
            </header>

            <div className='explorer-pathBar'>
                <span>Este Computador</span>
                <span className='explorer-path-separator'>›</span>
                <span>{app.title}</span>
            </div>

            <section className='explorer-content'>
                {children}
            </section>
        </div>
    )
}

export default Explorer
