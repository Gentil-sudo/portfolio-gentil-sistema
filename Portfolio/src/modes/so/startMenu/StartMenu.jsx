import './startMenu.css'
import { useEffect, useRef, useState } from 'react'
import { MdLogout, MdOutlineArticle, MdOutlinePowerSettingsNew } from "react-icons/md";
import Logo from '../../../assets/imgs/logo.webp'
import perfil from '../../../content/perfil'
import { localize, useLanguage } from '../../../i18n/LanguageContext'

function StartMenu({ apps, onOpen, onSwitchMode, onExit }) {
    const [open, setOpen] = useState(false)
    const [powerOpen, setPowerOpen] = useState(false)
    const menuRef = useRef(null)
    const { t, language } = useLanguage()

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
                <img src={Logo} alt='' className='home-img' width='440' height='240' />
            </button>

            {open && (
                <div className='startMenu-panel' role='menu' aria-label={t.startMenu.menu}>
                    <p className='startMenu-section'>{t.startMenu.apps}</p>
                    <div className='startMenu-apps'>
                        {apps.map(({ id, icon: Icon, download }) => download ? (
                            <a
                                key={id}
                                className='startMenu-app'
                                role='menuitem'
                                href={localize(download, language)}
                                download
                                onClick={closeMenu}
                            >
                                <Icon />
                                <span>{t.apps[id]}</span>
                            </a>
                        ) : (
                            <button key={id} className='startMenu-app' role='menuitem' onClick={() => run(() => onOpen(id))}>
                                <Icon />
                                <span>{t.apps[id]}</span>
                            </button>
                        ))}
                    </div>

                    <footer className='startMenu-footer'>
                        <div className='startMenu-user'>
                            <img src={perfil.photo} alt='' className='startMenu-avatar' width='320' height='320' />
                            <span>{perfil.name}</span>
                        </div>

                        <div className='startMenu-power'>
                            {powerOpen && (
                                <div className='startMenu-powerOptions' role='menu' aria-label={t.startMenu.powerOptions}>
                                    <button role='menuitem' onClick={() => run(onSwitchMode)}>
                                        <MdOutlineArticle /> {t.modeSwitch.toRecruiter}
                                    </button>
                                    <button role='menuitem' onClick={() => run(onExit)}>
                                        <MdLogout /> {t.startMenu.exit}
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
