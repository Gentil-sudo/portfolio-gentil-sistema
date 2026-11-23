import { useState } from 'react'
import Home from './home/Home'
import TaskBar from './taskBar/TaskBar'
import Explorer from './explorer/Explorer'
import Projects from './projects/Projects'
import Experiences from './experiences/Experiences'
import About from './about/About'
import Contact from './contact/Contact'
import apps from './apps'
import { useLanguage } from '../../i18n/LanguageContext'

const appContents = {
    projetos: <Projects />,
    experiencias: <Experiences />,
    contato: <Contact />,
    sobre: <About />,
}

// Visualização comum: o portfólio em formato de sistema operacional.
// onSwitchMode: vai para o Modo recrutador · onExit: volta à tela de escolha
function SoMode({ theme, onToggleTheme, onSwitchMode, onExit }) {
    const [openAppId, setOpenAppId] = useState(null)
    const [minimized, setMinimized] = useState(false)
    const { t } = useLanguage()

    const openApp = apps.find((app) => app.id === openAppId)
    const content = openApp && appContents[openApp.id]

    function handleOpen(id) {
        if (id === openAppId && !minimized) {
            setMinimized(true)
            return
        }
        setOpenAppId(id)
        setMinimized(false)
    }

    function handleLaunch(id) {
        setOpenAppId(id)
        setMinimized(false)
    }

    function handleClose() {
        setOpenAppId(null)
        setMinimized(false)
    }

    return (
        <>
            <main className='main'>
                <Home apps={apps} onOpen={handleOpen} theme={theme} onToggleTheme={onToggleTheme} />
                {openApp && (
                    <Explorer
                        key={openApp.id}
                        app={openApp}
                        hidden={minimized}
                        onClose={handleClose}
                        onMinimize={() => setMinimized(true)}
                    >
                        {content ?? <p className='explorer-placeholder'>{t.explorer.placeholder}</p>}
                    </Explorer>
                )}
            </main>
            <TaskBar
                apps={apps}
                activeAppId={openAppId}
                onOpen={handleOpen}
                theme={theme}
                onToggleTheme={onToggleTheme}
                onLaunch={handleLaunch}
                onSwitchMode={onSwitchMode}
                onExit={onExit}
                onShowDesktop={() => setMinimized(true)}
            />
        </>
    )
}

export default SoMode
