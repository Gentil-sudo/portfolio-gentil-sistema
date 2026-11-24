import './taskBar.css'
import { MdOutlineArticle } from "react-icons/md";
import ThemeButton from '../../../shared/themeButton/ThemeButton'
import LanguageButton from '../../../shared/languageButton/LanguageButton'
import StartMenu from "../startMenu/StartMenu"
import { useLanguage } from '../../../i18n/LanguageContext'

function TaskBar({ apps, startMenuApps, activeAppId, onOpen, theme, onToggleTheme, onLaunch, onSwitchMode, onExit, onShowDesktop }) {
    const { t } = useLanguage()

    return (
        <nav className="taskBar-box">
            <div className='taskBar-elements'>
                <div className='taskBar-element-Home'>
                    <StartMenu apps={startMenuApps} onOpen={onLaunch} onSwitchMode={onSwitchMode} onExit={onExit} />
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
                            {/* Em telas estreitas saem da barra: continuam na área de trabalho */}
                            <ThemeButton className='taskBar-btn taskBar-btn-extra' theme={theme} onToggle={onToggleTheme} />
                            <LanguageButton className='taskBar-btn taskBar-btn-extra' />
                        </div>
                    </div>
                </div>

                <div className='taskBar-right'>
                    {/* Botão fixo: sempre visível, leva ao Modo recrutador */}
                    <button
                        type='button'
                        className='taskBar-mode-btn'
                        title={t.modeSwitch.toRecruiterHint}
                        aria-label={t.modeSwitch.toRecruiter}
                        onClick={onSwitchMode}
                    >
                        <MdOutlineArticle aria-hidden='true' />
                        <span className='taskBar-mode-label'>{t.modeSwitch.toRecruiter}</span>
                    </button>
                    <div className='taskBar-btn-back-box'>
                        <button className='taskBar-btn-back' title={t.taskBar.showDesktop} aria-label={t.taskBar.showDesktop} onClick={onShowDesktop}>|</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TaskBar
