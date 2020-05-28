import { useState } from 'react'

export function useLocalStorage<T = string>(
    key: string,
    initialValue?: T
): [T, (value: T) => void] {
    const [localValue, setLocalValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch {
            return initialValue
        }
    })

    const setValue = (value: T) => {
        try {
            setLocalValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.error(err)
        }
    }

    return [localValue, setValue]
}

export function useSessionStorage<T = string>(
    key: string,
    initialValue?: T
): [T, (value: T) => void] {
    const [sessionValue, setSessionValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch {
            return initialValue
        }
    })

    const setValue = (value: T) => {
        try {
            setSessionValue(value)
            window.sessionStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.error(err)
        }
    }

    return [sessionValue, setValue]
}
