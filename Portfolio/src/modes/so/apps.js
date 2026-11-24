import { BiArchive } from "react-icons/bi";
import { FaRegFilePdf, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineStarOutline, MdWorkOutline } from "react-icons/md";
import perfil from '../../content/perfil'

// Ícones da área de trabalho, na ordem em que aparecem.
// Os nomes (em português e inglês) ficam em src/i18n/translations.js
//   download: em vez de abrir uma janela, baixa o arquivo ({ pt, en })
const apps = [
    { id: 'destaques', icon: MdOutlineStarOutline },
    { id: 'projetos', icon: BiArchive },
    { id: 'experiencias', icon: MdWorkOutline },
    { id: 'sobre', icon: FaRegUser },
    ...(perfil.resume ? [{ id: 'curriculo', icon: FaRegFilePdf, download: perfil.resume }] : []),
    { id: 'contato', icon: MdOutlineEmail },
]

// Só os que abrem janela (barra de tarefas)
export const windowApps = apps.filter((app) => !app.download)

// Janela aberta ao entrar no modo SO
export const FIRST_APP = 'destaques'

export default apps
