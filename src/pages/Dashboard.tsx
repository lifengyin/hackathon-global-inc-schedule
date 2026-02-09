import styled from 'styled-components'
import { useState } from 'react'

import { MobileHeader } from '../components/MobileHeader'
import { Sidebar } from '../components/Sidebar'
import { Logo } from '../components/Logo'
import { EventsGrid } from '../components/EventsGrid'
import { useEvents } from '../hooks/useEvents'

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

const LoadingMessage = styled.p`
  margin: 0;
  color: #9ca3af;
  font-size: 0.9375rem;
`

const ErrorMessage = styled.p`
  margin: 0;
  color: #ef4444;
  font-size: 0.9375rem;
`

export function Dashboard() {
  const { events, loading, error } = useEvents()
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        {error && <ErrorMessage>Failed to load events. Please try again.</ErrorMessage>}
        {loading && !error && <LoadingMessage>Loading events…</LoadingMessage>}
        {!loading && !error && <EventsGrid events={events} />}
      </Main>
    </Layout>
  )
}
