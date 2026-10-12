import './home.css'
import ThemeButton from '../themeButton/ThemeButton'

function Home({ apps, onOpen, theme, onToggleTheme }) {

  return (
    <>
      <div className='home-box'>
        <div className='home-elements-box'>
          <section className='home-elements'>
            <div className='home-apps'>
              {apps.map(({ id, title, icon: Icon }) => (
                <button key={id} className='home-btn' title={title} onClick={() => onOpen(id)}>
                  <Icon />
                  <span className='home-btn-label'>{title}</span>
                </button>
              ))}
              <ThemeButton className='home-btn' theme={theme} onToggle={onToggleTheme} showLabel />
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default Home
