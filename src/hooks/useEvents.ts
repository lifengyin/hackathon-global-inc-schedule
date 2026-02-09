import { useEffect, useState } from 'react'
import type { TEvent } from '../types'

const EVENTS_API_URL = 'https://api.hackthenorth.com/v3/events'

export function useEvents() {
  const [events, setEvents] = useState<TEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(EVENTS_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
        console.error('Error fetching events:', err)
      })
  }, [])

  return { events, loading, error }
}
