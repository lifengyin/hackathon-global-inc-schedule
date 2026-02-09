import styled from 'styled-components'
import { useEffect, useState } from 'react'

import type { TEvent } from '../types'
import { MobileHeader } from '../components/MobileHeader'
import { Sidebar } from '../components/Sidebar'
import { Logo } from '../components/Logo'
import { Badge } from '../atoms/Badge'
import { IconTools, IconPuzzle, IconSpeakerphone } from '@tabler/icons-react'

const dates: Record<string, string> = {
  '12/1/2021': 'Fri',
  '1/12/2021': 'Sat',
  '1/13/2021': 'Sun',
}

const formatDateAndTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const convertedWeekday = dates[date.toLocaleDateString()]
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return {
    formatted: `${convertedWeekday} ${time}`,
    day: convertedWeekday,
    time: time,
  }
}

const EVENT_TYPES = {
  'workshop': {
    'name': 'Workshop',
    'color': '#008c1280',
    'icon': <IconTools size={20} stroke={1.5} />,
  },
  'activity': {
    'name': 'Activity',
    'color': '#8044b980',
    'icon': <IconPuzzle size={20} stroke={1.5} />,
  },
  'tech_talk': {
    'name': 'Tech Talk',
    'color': '#0079ff80',
    'icon': <IconSpeakerphone size={20} stroke={1.5} />,
  },
}

const COVER_IMAGES = [
  'https://cover.sli.dev/?1',
  'https://cover.sli.dev/?2',
  'https://cover.sli.dev/?3',
  'https://cover.sli.dev/?4',
  'https://cover.sli.dev/?5',
  'https://cover.sli.dev/?6',
  'https://cover.sli.dev/?7',
  'https://cover.sli.dev/?8',
  'https://cover.sli.dev/?9',
  'https://cover.sli.dev/?10',
  'https://cover.sli.dev/?11',
  'https://cover.sli.dev/?12',
  'https://cover.sli.dev/?13',
  'https://cover.sli.dev/?14',
  'https://cover.sli.dev/?15',
]

function getCoverImageForEvent(eventId: number): string {
  return COVER_IMAGES[eventId % COVER_IMAGES.length]
}


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

const EventsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const EventCard = styled.div`
  position: relative;
  flex: 0 1 calc(50% - 0.5rem);
  min-width: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 1024px) {
    flex: 1 1 100%;
  }
  background: #252830;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.18);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0.02) 100%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #e4e6eb;
  }

  p {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    color: #9ca3af;
    line-height: 1.4;
  }
`

const EventCardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
`

const EventCardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #e4e6eb;
`

const EventInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
  }
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
          <EventsContainer>
            {events.map((event: TEvent) => (
              <EventCard key={event.id}>
                <EventCardImage src={getCoverImageForEvent(event.id)} alt="" />
                <EventCardTitle>{event.name}</EventCardTitle>
                <EventInfoContainer>
                  <Badge
                    icon={EVENT_TYPES[event.event_type].icon}
                    color={EVENT_TYPES[event.event_type].color}
                  >{EVENT_TYPES[event.event_type].name}</Badge>
                  <p>{formatDateAndTime(event.start_time).formatted}</p>
                </EventInfoContainer>
              </EventCard>
            ))}
          </EventsContainer>
        </Main>
      </Layout>
    )
  }