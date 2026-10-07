
import './taskBar.css'
import { BiArchive } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";


function TaskBar() {

    return (
        <>
        <nav className="taskBar-box">
            <div className='taskBar-elements'>
            <button className='taskBar-btn-Home'>Logo</button>
            <div className='taskBar-apps'>
                <button> <BiArchive/> </button>
                <button><IoPersonSharp/></button>
                <button>ab</button>
            </div>
            <div>
                <button>||</button>
            </div>
            </div>
        </nav>
        </>
    )

}

export default TaskBar