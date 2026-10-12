import { MdOutlineBedtime, MdOutlineWbSunny } from "react-icons/md";

function ThemeButton({ theme, onToggle, className, showLabel }) {
    const isDark = theme === 'dark'
    const label = isDark ? 'Modo claro' : 'Modo escuro'

    return (
        <button className={className} title={label} aria-label={label} onClick={onToggle}>
            {isDark ? <MdOutlineWbSunny /> : <MdOutlineBedtime />}
            {showLabel && <span className='home-btn-label'>{label}</span>}
        </button>
    )
}

export default ThemeButton
