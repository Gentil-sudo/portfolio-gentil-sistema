import { useState } from 'react'
import Home from './components/home/Home'
import TaskBar from './components/taskBar/TaskBar'
import Explorer from './components/explorer/Explorer'
import Projects from './components/projects/Projects'
import Experiences from './components/experiences/Experiences'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import apps from './data/apps'
import useTheme from './hooks/useTheme'

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
                        {content ?? <p className='explorer-placeholder'>Em construção...</p>}
                    </Explorer>
                )}
            </main>
            <TaskBar
                apps={apps}
                activeAppId={openAppId}
                onOpen={handleOpen}
                theme={theme}
                onToggleTheme={toggleTheme}
            />
        </>
    )
}

export default App
