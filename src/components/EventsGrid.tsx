import styled from 'styled-components'
import { useMemo, useState } from 'react'
import createFuzzySearch from '@nozbe/microfuzz'
import { IconSearch, IconX, IconChevronDown, IconFilter, IconArrowsSort } from '@tabler/icons-react'
import { Select } from '@base-ui/react/select'
import type { TEvent } from '../types'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { EventCard } from './EventCard'
import { EventCardDialog } from './EventCardDialog'

const SEARCH_DEBOUNCE_MS = 300

const EVENT_TYPE_OPTIONS = [
  { value: 'all', label: 'All types' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'activity', label: 'Activity' },
  { value: 'tech_talk', label: 'Tech Talk' },
] as const

const SORT_OPTIONS = [
  { value: 'start_time', label: 'Sort by time' },
  { value: 'name', label: 'Sort by name' },
] as const

const SearchWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`

const ToolbarSelects = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 28rem;
  padding: 0.5rem 2.25rem 0.5rem 2.25rem;
  font-size: 0.9375rem;
  color: #e4e6eb;
  background: #252830;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  font-family: inherit;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.25);
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &::-ms-clear {
    display: none;
  }
`

const SearchIconWrap = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
`

const SearchField = styled.label`
  position: relative;
  display: inline-block;
`

const FILTER_COLORS: Record<string, string> = {
  workshop: '#008c12',
  activity: '#8044b9',
  tech_talk: '#0079ff',
}

const SelectTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 8rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  color: #e4e6eb;
  background: #252830;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  &[data-popup-open] {
    border-color: rgba(255, 255, 255, 0.25);
  }
`

const FilterSelectTrigger = styled(SelectTrigger)<{ $activeColor?: string }>`
  ${(p) =>
    p.$activeColor
      ? `
    border-color: ${p.$activeColor};
    background: ${p.$activeColor}30;
    &:hover {
      border-color: ${p.$activeColor};
      background: ${p.$activeColor}40;
    }
    &[data-popup-open] {
      border-color: ${p.$activeColor};
      background: ${p.$activeColor}40;
    }
  `
      : ''}
`

const SelectValue = styled(Select.Value)`
  flex: 1;
  text-align: left;
`

const SelectTriggerIcon = styled.span`
  color: #6b7280;
  display: flex;
  flex-shrink: 0;
`

const SelectIcon = styled(Select.Icon)`
  color: #6b7280;
  display: flex;
`

const SelectPopup = styled(Select.Popup)`
  padding: 0.25rem;
  background: #252830;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`

const SelectList = styled(Select.List)`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`

const SelectItem = styled(Select.Item)`
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  color: #e4e6eb;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: rgba(255, 255, 255, 0.08);
  }
`

const SearchClearBtn = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  border-radius: 0.25rem;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #e4e6eb;
    background: rgba(255, 255, 255, 0.08);
  }
`

const EventsGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
`

const EmptyStateMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  color: #9ca3af;

  svg {
    width: 2rem;
    height: 2rem;
  }
`

const EmptyStateTitle = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #e4e6eb;
`

const EmptyStateDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #9ca3af;
  line-height: 1.5;
  max-width: 24rem;
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
        strategy: 'off', // strict: substring / start-with / query words only, no fuzzy letter matching
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
        <SearchField>
          <SearchIconWrap>
            <IconSearch size={18} stroke={1.5} />
          </SearchIconWrap>
          <SearchInput
            type="search"
            placeholder="Search events…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search events"
          />
          {searchInput.length > 0 && (
            <SearchClearBtn
              type="button"
              onClick={() => setSearchInput('')}
              aria-label="Clear search"
            >
              <IconX size={16} stroke={1.5} />
            </SearchClearBtn>
          )}
        </SearchField>
        <ToolbarSelects>
          <Select.Root
            items={EVENT_TYPE_OPTIONS}
            value={eventTypeFilter}
            onValueChange={(v) => v != null && setEventTypeFilter(v)}
          >
            <FilterSelectTrigger $activeColor={eventTypeFilter !== 'all' ? FILTER_COLORS[eventTypeFilter] : undefined}>
              <SelectTriggerIcon>
                <IconFilter size={16} stroke={1.5} />
              </SelectTriggerIcon>
              <SelectValue placeholder="Filter by type" />
              <SelectIcon>
                <IconChevronDown size={16} stroke={1.5} />
              </SelectIcon>
            </FilterSelectTrigger>
            <Select.Portal>
              <Select.Positioner sideOffset={4}>
                <SelectPopup>
                  <SelectList>
                    {EVENT_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <Select.ItemText>{opt.label}</Select.ItemText>
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          <Select.Root
            items={SORT_OPTIONS}
            value={sortBy}
            onValueChange={(v) => v != null && setSortBy(v as 'start_time' | 'name')}
          >
            <SelectTrigger>
              <SelectTriggerIcon>
                <IconArrowsSort size={16} stroke={1.5} />
              </SelectTriggerIcon>
              <SelectValue placeholder="Sort by" />
              <SelectIcon>
                <IconChevronDown size={16} stroke={1.5} />
              </SelectIcon>
            </SelectTrigger>
            <Select.Portal>
              <Select.Positioner sideOffset={4}>
                <SelectPopup>
                  <SelectList>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <Select.ItemText>{opt.label}</Select.ItemText>
                      </SelectItem>
                    ))}
                  </SelectList>
                </SelectPopup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
        </ToolbarSelects>
      </SearchWrap>
      {debouncedQuery.trim() !== '' && filteredEvents.length === 0 ? (
        <EmptyState>
          <EmptyStateMedia>
            <IconSearch size={32} stroke={1.5} aria-hidden />
          </EmptyStateMedia>
          <EmptyStateTitle>No results found</EmptyStateTitle>
          <EmptyStateDescription>
            No events match &quot;{debouncedQuery}&quot;. Try a different search term.
          </EmptyStateDescription>
        </EmptyState>
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
