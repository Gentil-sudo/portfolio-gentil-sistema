
import './taskBar.css'
import { MdOutlineBedtime } from "react-icons/md";
import Logo from "../../assets/imgs/logo.png"

function TaskBar({ apps, activeAppId, onOpen }) {

    return (
        <>
            <nav className="taskBar-box">
                <div className='taskBar-elements'>
                    <div className='taskBar-element-Home'>
                        <button className='taskBar-btn-Home'><img src={Logo} alt="Logo" className='home-img' /></button>
                    </div>
                    <div className='taskBar-apps'>
                        <div className='taskBar-btns-box'>
                            <div className='taskBar-btn-elements'>
                                {apps.map(({ id, title, icon: Icon }) => (
                                    <button
                                        key={id}
                                        className={`taskBar-btn ${activeAppId === id ? 'taskBar-btn-active' : ''}`}
                                        title={title}
                                        onClick={() => onOpen(id)}
                                    >
                                        <Icon />
                                    </button>
                                ))}
                                <button className='taskBar-btn' title='Descansar'><MdOutlineBedtime /></button>
                            </div>
                        </div>
                    </div>
                  
                    <div className='taskBar-btn-back-box'>
                        <button className='taskBar-btn-back'>|</button>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default TaskBar
