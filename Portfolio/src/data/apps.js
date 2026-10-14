import { BiArchive } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdWorkOutline } from "react-icons/md";

// Os nomes de cada app (em português e inglês) ficam em src/i18n/translations.js
const apps = [
    { id: 'projetos', icon: BiArchive },
    { id: 'experiencias', icon: MdWorkOutline },
    { id: 'contato', icon: MdOutlineEmail },
    { id: 'sobre', icon: FaRegUser },
]

export default apps
