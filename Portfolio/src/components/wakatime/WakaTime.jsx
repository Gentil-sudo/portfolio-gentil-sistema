import './wakatime.css'
import { useEffect, useState } from 'react'


const LANGUAGES_URL = import.meta.env.VITE_WAKATIME_LANGUAGES_URL
const MAX_LANGUAGES = 6

function WakaTime({ title, loadingText, errorText }) {
    const [languages, setLanguages] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!LANGUAGES_URL) return
        fetch(LANGUAGES_URL)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json()
            })
            .then((result) => setLanguages(result.data.slice(0, MAX_LANGUAGES)))
            .catch(() => setError(true))
    }, [])

    if (!LANGUAGES_URL) return null

    return (
        <section>
            <h3 className='wakatime-title'>{title}</h3>
            {error && <p className='wakatime-message'>{errorText}</p>}
            {!error && !languages && <p className='wakatime-message'>{loadingText}</p>}
            {languages && (
                <ul className='wakatime-list'>
                    {languages.map(({ name, percent, color }) => (
                        <li key={name} className='wakatime-item'>
                            <div className='wakatime-label'>
                                <span>{name}</span>
                                <span>{percent.toFixed(1)}%</span>
                            </div>
                            <div className='wakatime-track'>
                                <div className='wakatime-bar' style={{ width: `${percent}%`, backgroundColor: color }} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default WakaTime
