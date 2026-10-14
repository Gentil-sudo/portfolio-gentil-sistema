
import './TaskBar.css'
import ThemeButton from '../themeButton/ThemeButton'
import StartMenu from "../startMenu/StartMenu"

function TaskBar({ apps, activeAppId, onOpen, theme, onToggleTheme, onLaunch, onLock, onRestart, onShowDesktop }) {

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
                                {apps.map(({ id, title, icon: Icon }) => (
                                    <button
                                        key={id}
                                        className={`taskBar-btn ${activeAppId === id ? 'taskBar-btn-active' : ''}`}
                                        title={title}
                                        onClick={() => onOpen(id)}
                                    >
                                        <Icon />
                                    </button>
                                ))}
                                <ThemeButton className='taskBar-btn' theme={theme} onToggle={onToggleTheme} />
                            </div>
                        </div>
                    </div>
                  
                    <div className='taskBar-btn-back-box'>
                        <button className='taskBar-btn-back' title='Mostrar área de trabalho' aria-label='Mostrar área de trabalho' onClick={onShowDesktop}>|</button>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default TaskBar
