import './experiences.css'
import experiences from '../../data/experiences'

const statusLabels = {
    'atual': 'Em andamento',
    'em-breve': 'Em breve',
    'concluido': 'Concluído',
}

function Experiences() {
    return (
        <div className='experiences-box'>
            <h2 className='experiences-title'>Experiências</h2>
            <ul className='experiences-list'>
                {experiences.map((experience) => (
                    <li key={experience.organization} className='experiences-card'>
                        <div className='experiences-header'>
                            <div>
                                <h3>{experience.organization}</h3>
                                <p className='experiences-role'>{experience.role}</p>
                            </div>
                            <span className={`experiences-status experiences-status-${experience.status}`}>
                                {statusLabels[experience.status]}
                            </span>
                        </div>
                        <div className='experiences-meta'>
                            <span>{experience.type}</span>
                            <span>•</span>
                            <span>{experience.period}</span>
                        </div>
                        <p className='experiences-description'>{experience.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Experiences
