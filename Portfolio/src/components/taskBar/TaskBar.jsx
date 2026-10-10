
import './taskBar.css'
import { BiArchive } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineBedtime } from "react-icons/md";

function TaskBar() {

    return (
        <>
            <nav className="taskBar-box">
                <div className='taskBar-elements'>
                    <div className='taskBar-element-Home'>
                        <button className='taskBar-btn-Home'>Home</button>
                    </div>
                    <div className='taskBar-apps'>
                        <div className='taskBar-btns-box'>
                            <div className='taskBar-btn-elements'>
                                <button className='taskBar-btn'><BiArchive /></button>
                                <button className='taskBar-btn'><MdOutlineEmail /></button>  
                                <button className='taskBar-btn'><FaUserCircle/></button>     
                                <button className='taskBar-btn'><MdOutlineBedtime /></button>      
                            </div>
                        </div>
                    </div>
                  
                    <div>
                        <button className='taskBar-btn-back'>||</button>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default TaskBar