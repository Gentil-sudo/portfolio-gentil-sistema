import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdOutlineEmail, MdOutlineFileDownload } from 'react-icons/md'
import perfil, { EMAIL } from '../../../content/perfil'
import { localize, useLanguage } from '../../../i18n/LanguageContext'
import ExternalLink from '../ExternalLink'

const linkedin = perfil.contacts.find((contact) => contact.id === 'linkedin')
const github = perfil.contacts.find((contact) => contact.id === 'github')

function Contact() {
    const { t, language } = useLanguage()
    const text = t.recruiter

    return (
        <section id='contato' className='r-contact' aria-labelledby='r-contact-title'>
            <div className='r-container'>
                <h2 id='r-contact-title' className='r-contact-title'>{text.contactTitle}</h2>
                <p className='r-contact-text'>
                    {localize(perfil.objective, language)}. {localize(perfil.availability, language)}.
                </p>

                <ul className='r-contact-list'>
                    <li>
                        <MdOutlineEmail aria-hidden='true' />
                        <span className='r-contact-label'>{text.email}</span>
                        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </li>
                    <li>
                        <FaLinkedin aria-hidden='true' />
                        <span className='r-contact-label'>LinkedIn</span>
                        <ExternalLink href={linkedin.href}>{linkedin.href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}</ExternalLink>
                    </li>
                    <li>
                        <FaGithub aria-hidden='true' />
                        <span className='r-contact-label'>GitHub</span>
                        <ExternalLink href={github.href}>{github.href.replace(/^https:\/\//, '')}</ExternalLink>
                    </li>
                </ul>

                {perfil.resume && (
                    <a className='r-btn r-btn-on-dark' href={localize(perfil.resume, language)} download>
                        <MdOutlineFileDownload aria-hidden='true' /> {text.resumeLong}
                    </a>
                )}
            </div>
        </section>
    )
}

export default Contact
