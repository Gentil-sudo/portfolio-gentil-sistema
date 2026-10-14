import './StartMenu.css'
import { useEffect, useRef, useState } from 'react'
import { MdLockOutline, MdOutlinePowerSettingsNew, MdRestartAlt } from "react-icons/md";
import Logo from '../../assets/imgs/logo.png'
import Profile from '../../assets/imgs/profile.webp'

function StartMenu({ apps, onOpen, onLock, onRestart }) {
    const [open, setOpen] = useState(false)
    const [powerOpen, setPowerOpen] = useState(false)
    const menuRef = useRef(null)

    function closeMenu() {
        setOpen(false)
        setPowerOpen(false)
    }

    useEffect(() => {
        if (!open) return
        function handlePointerDown(event) {
            if (!menuRef.current.contains(event.target)) closeMenu()
        }
        function handleKeyDown(event) {
            if (event.key === 'Escape') closeMenu()
        }
        window.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [open])

    function run(action) {
        closeMenu()
        action()
    }

    return (
        <div className='startMenu' ref={menuRef}>
            <button
                className='taskBar-btn-Home'
                title='Iniciar'
                aria-label='Iniciar'
                aria-expanded={open}
                aria-haspopup='menu'
                onClick={() => (open ? closeMenu() : setOpen(true))}
            >
                <img src={Logo} alt='' className='home-img' />
            </button>

            {open && (
                <div className='startMenu-panel' role='menu' aria-label='Menu Iniciar'>
                    <p className='startMenu-section'>Aplicativos</p>
                    <div className='startMenu-apps'>
                        {apps.map(({ id, title, icon: Icon }) => (
                            <button key={id} className='startMenu-app' role='menuitem' onClick={() => run(() => onOpen(id))}>
                                <Icon />
                                <span>{title}</span>
                            </button>
                        ))}
                    </div>

                    <footer className='startMenu-footer'>
                        <div className='startMenu-user'>
                            <img src={Profile} alt='' className='startMenu-avatar' />
                            <span>Enzo Gentil</span>
                        </div>

                        <div className='startMenu-power'>
                            {powerOpen && (
                                <div className='startMenu-powerOptions' role='menu' aria-label='Opções de energia'>
                                    <button role='menuitem' onClick={() => run(onLock)}>
                                        <MdLockOutline /> Bloquear
                                    </button>
                                    <button role='menuitem' onClick={() => run(onRestart)}>
                                        <MdRestartAlt /> Reiniciar
                                    </button>
                                </div>
                            )}
                            <button
                                className='startMenu-powerBtn'
                                title='Energia'
                                aria-label='Energia'
                                aria-expanded={powerOpen}
                                onClick={() => setPowerOpen(!powerOpen)}
                            >
                                <MdOutlinePowerSettingsNew />
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    )
}

export default StartMenu
