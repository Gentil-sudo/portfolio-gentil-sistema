import { useState } from 'react'
import Home from './home/Home'
import TaskBar from './taskBar/TaskBar'
import Explorer from './explorer/Explorer'
import Highlights from './highlights/Highlights'
import Projects from './projects/Projects'
import Experiences from './experiences/Experiences'
import About from './about/About'
import Contact from './contact/Contact'
import apps, { FIRST_APP, windowApps } from './apps'
import { useLanguage } from '../../i18n/LanguageContext'

// Visualização comum: o portfólio em formato de sistema operacional.
// Entra direto na área de trabalho, com a janela Destaques já aberta.
// onSwitchMode: vai para o Modo recrutador · onExit: volta à tela de escolha
function SoMode({ theme, onToggleTheme, onSwitchMode, onExit }) {
    const [openAppId, setOpenAppId] = useState(FIRST_APP)
    const [minimized, setMinimized] = useState(false)
    const { t } = useLanguage()

    const openApp = windowApps.find((app) => app.id === openAppId)

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

    function renderContent(id) {
        switch (id) {
            case 'destaques': return <Highlights onSwitchMode={onSwitchMode} onOpenApp={handleLaunch} />
            case 'projetos': return <Projects />
            case 'experiencias': return <Experiences />
            case 'sobre': return <About />
            case 'contato': return <Contact />
            default: return <p className='explorer-placeholder'>{t.explorer.placeholder}</p>
        }
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
                        {renderContent(openApp.id)}
                    </Explorer>
                )}
            </main>
            <TaskBar
                apps={windowApps}
                startMenuApps={apps}
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
