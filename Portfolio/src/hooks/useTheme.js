import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

function getInitialTheme() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'dark' || saved === 'light') return saved
    } catch {}
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        try {
            localStorage.setItem(STORAGE_KEY, theme)
        } catch {}
    }, [theme])

    function toggleTheme() {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
    }

    return { theme, toggleTheme }
}

export default useTheme
