import { useLanguage } from '../../i18n/LanguageContext'

// Link para fora do site: abre em nova aba e avisa o leitor de tela
function ExternalLink({ href, className, children }) {
    const { t } = useLanguage()

    return (
        <a href={href} className={className} target='_blank' rel='noreferrer'>
            {children}
            <span className='r-sr-only'> {t.recruiter.newTab}</span>
        </a>
    )
}

export default ExternalLink
