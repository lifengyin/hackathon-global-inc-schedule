import styled from 'styled-components'
import { useEffect, useState } from 'react'

import type { TEvent } from '../types'
import { MobileHeader } from '../components/MobileHeader'
import { Sidebar } from '../components/Sidebar'
import { Logo } from '../components/Logo'
import { EventsGrid } from '../components/EventsGrid'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #111318;
  color: #e4e6eb;
`

const Main = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 4rem;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
    padding-top: 6rem;
  }
`

const PageTitle = styled.h1`
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #e4e6eb;
`

export function Dashboard() {
    const [events, setEvents] = useState<TEvent[]>([])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
      fetch('https://api.hackthenorth.com/v3/events')
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch((error) => console.error('Error fetching events:', error))
    }, [])

    return (
      <Layout>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <MobileHeader onMenuClick={() => setSidebarOpen(true)}>
          <Logo />
        </MobileHeader>
        <Main>
          <PageTitle>Schedule</PageTitle>
          <EventsGrid events={events} />
        </Main>
      </Layout>
    )
  }
