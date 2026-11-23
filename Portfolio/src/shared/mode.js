// Qual modo mostrar: Visualização comum ('so') ou Modo recrutador ('recrutador').
//
// Ordem de prioridade:
//   1. A URL: ?modo=so | ?modo=recrutador, ou os caminhos /so e /recrutador
//      (links para mandar no currículo e no LinkedIn: pulam a tela de escolha)
//   2. A escolha salva no navegador ("Lembrar minha escolha")
//   3. Nada: carregamento → tela de escolha

export const MODES = ['so', 'recrutador']

const STORAGE_KEY = 'portfolio-mode'

function isMode(value) {
    return MODES.includes(value)
}

export function readModeFromUrl() {
    const params = new URLSearchParams(window.location.search)
    const fromQuery = params.get('modo')
    if (isMode(fromQuery)) return fromQuery

    const fromPath = window.location.pathname.replace(/^\/+|\/+$/g, '')
    if (isMode(fromPath)) return fromPath

    return null
}

export function getSavedMode() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (isMode(saved)) return saved
    } catch {}
    return null
}

export function saveMode(mode) {
    try {
        localStorage.setItem(STORAGE_KEY, mode)
    } catch {}
}

export function forgetMode() {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch {}
}

export function getInitialMode() {
    return readModeFromUrl() ?? getSavedMode()
}

// Endereço de cada modo; null = tela de escolha
export function urlForMode(mode) {
    return mode ? `/?modo=${mode}` : '/'
}

export function otherMode(mode) {
    return mode === 'so' ? 'recrutador' : 'so'
}
