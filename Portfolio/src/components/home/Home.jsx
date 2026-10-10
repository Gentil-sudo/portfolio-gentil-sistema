import './home.css'
import { BiArchive } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineBedtime } from "react-icons/md";

function Home() {

  return (
    <>
      <div className='home-box'>
        <div className='home-elements-box'>
          <section className='home-elements'>
            <div className='home-apps'>
              <button className='home-btn'><BiArchive /></button>
              <button className='home-btn'><MdOutlineEmail /></button>
              <button className='home-btn'><FaUserCircle /></button>
              <button className='home-btn'><MdOutlineBedtime /></button>
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default Home
