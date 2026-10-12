import './contact.css'
import { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const MY_EMAIL = 'enzogentil.profissional@gmail.com'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const emptyForm = { name: '', email: '', subject: '', message: '' }

function Contact() {
    const [form, setForm] = useState(emptyForm)
    const [status, setStatus] = useState('idle')

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setStatus('sending')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: ACCESS_KEY,
                    from_name: 'Portfólio',
                    botcheck: event.target.botcheck.checked,
                    ...form,
                    subject: form.subject || `Nova mensagem de ${form.name}`,
                }),
            })
            const result = await response.json()
            if (!result.success) throw new Error(result.message)

            setForm(emptyForm)
            setStatus('sent')
        } catch {
            setStatus('error')
        }
    }

    if (!ACCESS_KEY) {
        return (
            <div className='contact-box contact-fallback'>
                <MdOutlineEmail />
                <p>Me mande um e-mail:</p>
                <a href={`mailto:${MY_EMAIL}`}>{MY_EMAIL}</a>
            </div>
        )
    }

    return (
        <form className='contact-box' onSubmit={handleSubmit}>
            <header className='contact-header'>
                <h2>Nova mensagem</h2>
            </header>

            <div className='contact-field'>
                <span className='contact-label'>Para</span>
                <span className='contact-to'>Enzo Gentil &lt;{MY_EMAIL}&gt;</span>
            </div>
            <label className='contact-field'>
                <span className='contact-label'>Nome</span>
                <input name='name' value={form.name} onChange={handleChange} required autoComplete='name' />
            </label>
            <label className='contact-field'>
                <span className='contact-label'>De</span>
                <input type='email' name='email' value={form.email} onChange={handleChange} required autoComplete='email' placeholder='seu@email.com' />
            </label>
            <label className='contact-field'>
                <span className='contact-label'>Assunto</span>
                <input name='subject' value={form.subject} onChange={handleChange} />
            </label>

            <textarea
                className='contact-message'
                name='message'
                value={form.message}
                onChange={handleChange}
                required
                placeholder='Escreva sua mensagem...'
                aria-label='Mensagem'
            />

            <input type='checkbox' name='botcheck' className='contact-botcheck' tabIndex={-1} autoComplete='off' />

            <footer className='contact-footer'>
                <button type='submit' className='contact-send' disabled={status === 'sending'}>
                    <IoSend /> {status === 'sending' ? 'Enviando...' : 'Enviar'}
                </button>
                <p className='contact-status' role='status'>
                    {status === 'sent' && 'Mensagem enviada! Respondo assim que puder.'}
                    {status === 'error' && (
                        <>Não foi possível enviar. Tente pelo <a href={`mailto:${MY_EMAIL}`}>e-mail</a>.</>
                    )}
                </p>
            </footer>
        </form>
    )
}

export default Contact
