import './startMenu.css'
import { useEffect, useRef, useState } from 'react'
import { MdLockOutline, MdOutlinePowerSettingsNew, MdRestartAlt } from "react-icons/md";
import Logo from '../../assets/imgs/logo.png'
import Profile from '../../assets/imgs/profile.webp'
import { useLanguage } from '../../i18n/LanguageContext'

function StartMenu({ apps, onOpen, onLock, onRestart }) {
    const [open, setOpen] = useState(false)
    const [powerOpen, setPowerOpen] = useState(false)
    const menuRef = useRef(null)
    const { t } = useLanguage()

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
                title={t.startMenu.start}
                aria-label={t.startMenu.start}
                aria-expanded={open}
                aria-haspopup='menu'
                onClick={() => (open ? closeMenu() : setOpen(true))}
            >
                <img src={Logo} alt='' className='home-img' />
            </button>

            {open && (
                <div className='startMenu-panel' role='menu' aria-label={t.startMenu.menu}>
                    <p className='startMenu-section'>{t.startMenu.apps}</p>
                    <div className='startMenu-apps'>
                        {apps.map(({ id, icon: Icon }) => (
                            <button key={id} className='startMenu-app' role='menuitem' onClick={() => run(() => onOpen(id))}>
                                <Icon />
                                <span>{t.apps[id]}</span>
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
                                <div className='startMenu-powerOptions' role='menu' aria-label={t.startMenu.powerOptions}>
                                    <button role='menuitem' onClick={() => run(onLock)}>
                                        <MdLockOutline /> {t.startMenu.lock}
                                    </button>
                                    <button role='menuitem' onClick={() => run(onRestart)}>
                                        <MdRestartAlt /> {t.startMenu.restart}
                                    </button>
                                </div>
                            )}
                            <button
                                className='startMenu-powerBtn'
                                title={t.startMenu.power}
                                aria-label={t.startMenu.power}
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
