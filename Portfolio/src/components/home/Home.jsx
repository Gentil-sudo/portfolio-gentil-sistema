import './home.css'
import { MdOutlineBedtime } from "react-icons/md";

function Home({ apps, onOpen }) {

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
              <button className='home-btn' title='Descansar'><MdOutlineBedtime /></button>
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default Home
