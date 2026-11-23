import './languageSwitch.css'
import { LANGUAGES, useLanguage } from '../../i18n/LanguageContext'

// Seletor PT | EN. As cores vêm de variáveis CSS (--switch-*), para cada
// tela ajustar ao seu visual; sem elas, usa o tema do site.
function LanguageSwitch({ className = '' }) {
    const { t, language, setLanguage } = useLanguage()

    return (
        <div className={`languageSwitch ${className}`} role='group' aria-label={t.language.label}>
            {LANGUAGES.map((code) => (
                <button
                    key={code}
                    type='button'
                    lang={code === 'pt' ? 'pt-BR' : 'en'}
                    aria-pressed={code === language}
                    onClick={() => setLanguage(code)}
                >
                    {code.toUpperCase()}
                </button>
            ))}
        </div>
    )
}

export default LanguageSwitch
