import { useState } from 'react'
import Home from './components/home/Home'
import TaskBar from './components/taskBar/TaskBar'
import Explorer from './components/explorer/Explorer'
import apps from './data/apps'

function App() {
    const [openAppId, setOpenAppId] = useState(null)
    const [minimized, setMinimized] = useState(false)

    const openApp = apps.find((app) => app.id === openAppId)

    function handleOpen(id) {
        // Clicar no app já aberto (e visível) minimiza, igual à barra do Windows
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
                <Home apps={apps} onOpen={handleOpen} />
                {openApp && (
                    <Explorer
                        key={openApp.id}
                        app={openApp}
                        hidden={minimized}
                        onClose={handleClose}
                        onMinimize={() => setMinimized(true)}
                    >
                        <p className='explorer-placeholder'>Em construção...</p>
                    </Explorer>
                )}
            </main>
            <TaskBar apps={apps} activeAppId={openAppId} onOpen={handleOpen} />
        </>
    )
}

export default App
