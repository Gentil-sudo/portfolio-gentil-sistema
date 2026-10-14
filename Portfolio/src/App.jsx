import { useCallback, useState } from 'react'
import Home from './components/home/Home'
import TaskBar from './components/taskBar/TaskBar'
import Explorer from './components/explorer/Explorer'
import Projects from './components/projects/Projects'
import Experiences from './components/experiences/Experiences'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Boot from './components/boot/Boot'
import Login from './components/login/Login'
import apps from './data/apps'
import useTheme from './hooks/useTheme'
import { useLanguage } from './i18n/LanguageContext'

const SESSION_KEY = 'portfolio-signed-in'

function getInitialStage() {
    try {
        if (sessionStorage.getItem(SESSION_KEY)) return 'desktop'
    } catch {}
    return 'boot'
}

const appContents = {
    projetos: <Projects />,
    experiencias: <Experiences />,
    contato: <Contact />,
    sobre: <About />,
}

function App() {
    const [openAppId, setOpenAppId] = useState(null)
    const [minimized, setMinimized] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const { t } = useLanguage()
    const [stage, setStage] = useState(getInitialStage)

    const handleBootDone = useCallback(() => setStage('login'), [])
    const handleLoginDone = useCallback(() => {
        setStage('desktop')
        try {
            sessionStorage.setItem(SESSION_KEY, '1')
        } catch {}
    }, [])

    function handleLock() {
        setStage('login')
        try {
            sessionStorage.removeItem(SESSION_KEY)
        } catch {}
    }

    function handleRestart() {
        handleClose()
        handleLock()
        setStage('boot')
    }

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
                <Home apps={apps} onOpen={handleOpen} theme={theme} onToggleTheme={toggleTheme} />
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
                onToggleTheme={toggleTheme}
                onLaunch={handleLaunch}
                onLock={handleLock}
                onRestart={handleRestart}
                onShowDesktop={() => setMinimized(true)}
            />
            {stage !== 'desktop' && <Login onDone={handleLoginDone} />}
            {stage === 'boot' && <Boot onDone={handleBootDone} />}
        </>
    )
}

export default App
