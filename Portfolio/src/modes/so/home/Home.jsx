import './home.css'
import ThemeButton from '../../../shared/themeButton/ThemeButton'
import LanguageButton from '../../../shared/languageButton/LanguageButton'
import { localize, useLanguage } from '../../../i18n/LanguageContext'

// Ícones da área de trabalho. Os de download (Currículo.pdf) são links;
// os outros abrem uma janela.
function Home({ apps, onOpen, theme, onToggleTheme }) {
  const { t, language } = useLanguage()

  return (
    <div className='home-box'>
      <div className='home-elements-box'>
        <nav className='home-elements' aria-label={t.startMenu.apps}>
          <div className='home-apps'>
            {apps.map(({ id, icon: Icon, download }) => download ? (
              <a key={id} className='home-btn' href={localize(download, language)} download>
                <Icon aria-hidden='true' />
                <span className='home-btn-label'>{t.apps[id]}</span>
              </a>
            ) : (
              <button key={id} type='button' className='home-btn' onClick={() => onOpen(id)}>
                <Icon aria-hidden='true' />
                <span className='home-btn-label'>{t.apps[id]}</span>
              </button>
            ))}
            <ThemeButton className='home-btn' theme={theme} onToggle={onToggleTheme} showLabel />
            <LanguageButton className='home-btn' showLabel />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Home
