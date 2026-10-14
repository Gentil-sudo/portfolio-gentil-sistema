import { MdOutlineBedtime, MdOutlineWbSunny } from "react-icons/md";
import { useLanguage } from '../../i18n/LanguageContext'

function ThemeButton({ theme, onToggle, className, showLabel }) {
    const { t } = useLanguage()
    const isDark = theme === 'dark'
    const label = isDark ? t.theme.light : t.theme.dark

    return (
        <button className={className} title={label} aria-label={label} onClick={onToggle}>
            {isDark ? <MdOutlineWbSunny /> : <MdOutlineBedtime />}
            {showLabel && <span className='home-btn-label'>{label}</span>}
        </button>
    )
}

export default ThemeButton
