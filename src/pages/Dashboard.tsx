import styled from 'styled-components'
import { useEffect, useState } from 'react'

import type { TEvent } from '../types'
import { Sidebar } from '../components/Sidebar'


const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
  margin-left: 250px;
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
  width: 100%;
`

export function Dashboard() {
    const [events, setEvents] = useState<TEvent[]>([])
  
    useEffect(() => {
      fetch('https://api.hackthenorth.com/v3/events')
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch((error) => console.error('Error fetching events:', error))
    }, [])
  
    return (
      <Layout>
        <Sidebar />
        <Main>
          <h1>Schedule</h1>
          <EventsContainer>
            {events.map((event: TEvent) => (
              <EventCard key={event.id}>
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <p>{new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}</p>
              </EventCard>
            ))}
          </EventsContainer>
        </Main>
      </Layout>
    )
  }