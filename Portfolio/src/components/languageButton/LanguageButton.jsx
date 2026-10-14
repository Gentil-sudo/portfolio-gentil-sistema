import { MdTranslate } from "react-icons/md";
import { useLanguage } from '../../i18n/LanguageContext'

function LanguageButton({ className, showLabel }) {
    const { t, toggleLanguage } = useLanguage()

    return (
        <button
            className={className}
            title={t.language.switchToLong}
            aria-label={t.language.switchToLong}
            onClick={toggleLanguage}
        >
            <MdTranslate />
            {showLabel && <span className='home-btn-label'>{t.language.switchTo}</span>}
        </button>
    )
}

export default LanguageButton
