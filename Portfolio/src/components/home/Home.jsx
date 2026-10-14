import './home.css'
import ThemeButton from '../themeButton/ThemeButton'
import LanguageButton from '../languageButton/LanguageButton'
import { useLanguage } from '../../i18n/LanguageContext'

function Home({ apps, onOpen, theme, onToggleTheme }) {
  const { t } = useLanguage()

  return (
    <>
      <div className='home-box'>
        <div className='home-elements-box'>
          <section className='home-elements'>
            <div className='home-apps'>
              {apps.map(({ id, icon: Icon }) => (
                <button key={id} className='home-btn' title={t.apps[id]} onClick={() => onOpen(id)}>
                  <Icon />
                  <span className='home-btn-label'>{t.apps[id]}</span>
                </button>
              ))}
              <ThemeButton className='home-btn' theme={theme} onToggle={onToggleTheme} showLabel />
              <LanguageButton className='home-btn' showLabel />
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default Home
