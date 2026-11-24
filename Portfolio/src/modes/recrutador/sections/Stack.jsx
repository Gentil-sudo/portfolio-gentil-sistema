import stack from '../../../content/stack'
import { localize, useLanguage } from '../../../i18n/LanguageContext'

function Stack() {
    const { t, language } = useLanguage()
    const text = t.recruiter

    return (
        <section className='r-section r-container' aria-labelledby='r-stack-title'>
            <h2 id='r-stack-title' className='r-section-title'>{text.stackTitle}</h2>
            <p className='r-section-intro'>{text.stackIntro}</p>
            <div className='r-stack'>
                {stack.map((group) => (
                    <div key={group.id} className='r-stack-group'>
                        <h3>{localize(group.title, language)}</h3>
                        <ul className='r-chips'>
                            {group.items.map((item) => {
                                const label = localize(item, language)
                                return <li key={label}>{label}</li>
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stack
