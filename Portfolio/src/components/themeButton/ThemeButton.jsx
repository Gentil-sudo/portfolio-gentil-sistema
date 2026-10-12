import { MdOutlineBedtime, MdOutlineWbSunny } from "react-icons/md";

// Botão da lua: ativa o dark mode (vira sol para voltar ao tema claro)
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
