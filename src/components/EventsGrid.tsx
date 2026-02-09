import styled from 'styled-components'
import { useMemo, useState } from 'react'
import createFuzzySearch from '@nozbe/microfuzz'
import type { TEvent } from '../types'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { EventsSearch } from './EventsSearch'
import { EventsToolbar } from './EventsToolbar'
import { EventsEmptyState } from './EventsEmptyState'
import { EventCard } from './EventCard'
import { EventCardDialog } from './EventCardDialog'

const SEARCH_DEBOUNCE_MS = 300

const SearchWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`

const EventsGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

type EventsGridProps = {
  events: TEvent[]
}

export function EventsGrid({ events }: EventsGridProps) {
  const [searchInput, setSearchInput] = useState('')
  const debouncedQuery = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS)
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'start_time' | 'name'>('start_time')
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null)

  const eventsByType =
    eventTypeFilter === 'all'
      ? events
      : events.filter((e) => e.event_type === eventTypeFilter)

  const fuzzySearch = useMemo(
    () =>
      createFuzzySearch(eventsByType, {
        getText: (e: TEvent) => [e.name, e.description ?? ''],
        strategy: 'off',
      }),
    [eventsByType],
  )

  const filteredEvents =
    debouncedQuery.trim() === ''
      ? eventsByType
      : fuzzySearch(debouncedQuery).map((r) => r.item)

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      if (sortBy === 'start_time') return a.start_time - b.start_time
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    })
  }, [filteredEvents, sortBy])

  return (
    <>
      <SearchWrap>
        <EventsSearch value={searchInput} onChange={setSearchInput} />
        <EventsToolbar
          eventTypeFilter={eventTypeFilter}
          onEventTypeChange={setEventTypeFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </SearchWrap>
      {debouncedQuery.trim() !== '' && filteredEvents.length === 0 ? (
        <EventsEmptyState query={debouncedQuery} />
      ) : (
        <EventsGridContainer>
          {sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </EventsGridContainer>
      )}
      <EventCardDialog event={selectedEvent} allEvents={events} onClose={() => setSelectedEvent(null)} />
    </>
  )
}
