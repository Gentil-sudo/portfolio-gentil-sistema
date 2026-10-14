import { createContext, useContext } from 'react'

export const LANGUAGES = ['pt', 'en']

// O provider fica em LanguageProvider.jsx
export const LanguageContext = createContext(null)

export function useLanguage() {
    return useContext(LanguageContext)
}

// Textos dos arquivos de data/: { pt: '...', en: '...' } ou uma string só
export function localize(value, language) {
    if (value && typeof value === 'object') return value[language] ?? value.pt
    return value
}
