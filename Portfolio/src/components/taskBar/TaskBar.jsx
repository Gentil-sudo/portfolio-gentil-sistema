
import './taskBar.css'
import ThemeButton from '../themeButton/ThemeButton'
import LanguageButton from '../languageButton/LanguageButton'
import StartMenu from "../startMenu/StartMenu"
import { useLanguage } from '../../i18n/LanguageContext'

function TaskBar({ apps, activeAppId, onOpen, theme, onToggleTheme, onLaunch, onLock, onRestart, onShowDesktop }) {
    const { t } = useLanguage()

    return (
        <>
            <nav className="taskBar-box">
                <div className='taskBar-elements'>
                    <div className='taskBar-element-Home'>
                        <StartMenu apps={apps} onOpen={onLaunch} onLock={onLock} onRestart={onRestart} />
                    </div>
                    <div className='taskBar-apps'>
                        <div className='taskBar-btns-box'>
                            <div className='taskBar-btn-elements'>
                                {apps.map(({ id, icon: Icon }) => (
                                    <button
                                        key={id}
                                        className={`taskBar-btn ${activeAppId === id ? 'taskBar-btn-active' : ''}`}
                                        title={t.apps[id]}
                                        aria-label={t.apps[id]}
                                        onClick={() => onOpen(id)}
                                    >
                                        <Icon />
                                    </button>
                                ))}
                                <ThemeButton className='taskBar-btn' theme={theme} onToggle={onToggleTheme} />
                                <LanguageButton className='taskBar-btn' />
                            </div>
                        </div>
                    </div>

                    <div className='taskBar-btn-back-box'>
                        <button className='taskBar-btn-back' title={t.taskBar.showDesktop} aria-label={t.taskBar.showDesktop} onClick={onShowDesktop}>|</button>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default TaskBar
