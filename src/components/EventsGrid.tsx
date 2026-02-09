import styled from 'styled-components'
import { useState } from 'react'
import type { TEvent } from '../types'
import { EventCard } from './EventCard'
import { EventCardDialog } from './EventCardDialog'

const EventsGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

type EventsGridProps = {
  events: TEvent[]
}

export function EventsGrid({ events }: EventsGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null)

  return (
    <>
      <EventsGridContainer>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </EventsGridContainer>
      <EventCardDialog event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
