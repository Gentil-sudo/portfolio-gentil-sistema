import { useCallback, useEffect, useState } from 'react'
import SoMode from './modes/so/SoMode'
import RecruiterMode from './modes/recrutador/RecruiterMode'
import Boot from './shared/boot/Boot'
import Choice from './shared/choice/Choice'
import perfil from './content/perfil'
import useTheme from './hooks/useTheme'
import {
    forgetMode,
    getInitialMode,
    getSavedMode,
    otherMode,
    readModeFromUrl,
    saveMode,
    urlForMode,
} from './shared/mode'

// A tela de escolha já abre com a foto carregada
const BOOT_PRELOAD = [perfil.photo]

function goTo(mode) {
    window.history.pushState(null, '', urlForMode(mode))
    window.scrollTo(0, 0)
}

// Entrada única: carregamento → tela de escolha → um dos dois modos.
// Quem chega com ?modo= (ou /so, /recrutador) ou já tem um modo salvo
// vai direto para ele, sem carregamento.
function App() {
    const { theme, toggleTheme } = useTheme()
    const [mode, setMode] = useState(getInitialMode)
    const [booting, setBooting] = useState(() => getInitialMode() === null)

    const handleBootDone = useCallback(() => setBooting(false), [])

    useEffect(() => {
        // Modo salvo e URL sem modo: deixa o endereço explícito, para o
        // "voltar" do navegador levar de um modo à tela de escolha
        const savedMode = getInitialMode()
        if (savedMode && !readModeFromUrl()) {
            window.history.replaceState(null, '', urlForMode(savedMode))
        }

        function handlePopState() {
            setMode(readModeFromUrl())
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    function handleChoose(nextMode, remember) {
        if (remember) saveMode(nextMode)
        else forgetMode()
        goTo(nextMode)
        setMode(nextMode)
    }

    function handleSwitchMode() {
        const nextMode = otherMode(mode)
        // Quem pediu para lembrar continua lembrando, agora do outro modo
        if (getSavedMode()) saveMode(nextMode)
        goTo(nextMode)
        setMode(nextMode)
    }

    function handleExit() {
        forgetMode()
        goTo(null)
        setMode(null)
    }

    return (
        <>
            {mode === 'so' && (
                <SoMode
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    onSwitchMode={handleSwitchMode}
                    onExit={handleExit}
                />
            )}
            {mode === 'recrutador' && <RecruiterMode onSwitchMode={handleSwitchMode} />}
            {mode === null && <Choice onChoose={handleChoose} />}
            {booting && <Boot onDone={handleBootDone} preload={BOOT_PRELOAD} />}
        </>
    )
}

export default App
