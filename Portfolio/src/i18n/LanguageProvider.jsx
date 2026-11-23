import { useEffect, useState } from 'react'
import translations from './translations'
import { LANGUAGES, LanguageContext } from './LanguageContext'

const STORAGE_KEY = 'portfolio-language'

// Escolha salva → português (o inglês é opção, pelo seletor PT/EN)
function getInitialLanguage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (LANGUAGES.includes(saved)) return saved
    } catch {}
    return 'pt'
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(getInitialLanguage)
    const t = translations[language]

    useEffect(() => {
        document.documentElement.lang = t.htmlLang
        document.title = t.pageTitle
        try {
            localStorage.setItem(STORAGE_KEY, language)
        } catch {}
    }, [language, t])

    function toggleLanguage() {
        setLanguage((current) => (current === 'pt' ? 'en' : 'pt'))
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}
