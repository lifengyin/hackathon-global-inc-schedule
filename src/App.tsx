import styled from 'styled-components'
import { useEffect, useState } from 'react'
import type { TEvent } from './types'

const Main = styled.main`
  padding: 4rem;
`

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  column-count: 3;
  column-gap: 1rem;
`

const EventCard = styled.div`
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  display: inline-block;
  break-inside: avoid-column;
  width: 100%;
`

function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('https://api.hackthenorth.com/v3/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error))
  }, [])

  return (
    <Main>
      <h1>Schedule - Hackathon Global Inc.</h1>
      <EventsContainer>
        {events.map((event: TEvent) => (
          <EventCard key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
          </EventCard>
        ))}
      </EventsContainer>
    </Main>
  )
}

export default App
