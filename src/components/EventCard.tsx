import styled from 'styled-components'
import type { TEvent } from '../types'
import { Badge } from '../atoms/Badge'
import { formatDateAndTime, EVENT_TYPES, getCoverImageForEvent } from '../utils/eventUtils'

const EventCardRoot = styled.div`
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
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin: 0 0 0.5rem 0;
  vertical-align: top;
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

const EventCardButton = styled(EventCardRoot).attrs({ as: 'button' })`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  cursor: pointer;
  border: none;
  font: inherit;
  -webkit-appearance: none;
  appearance: none;
`

export type EventCardProps = {
  event: TEvent
  onClick: () => void
}

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <EventCardButton type="button" onClick={onClick}>
      <EventCardImage src={getCoverImageForEvent(event.id)} alt="" />
      <EventCardTitle>{event.name}</EventCardTitle>
      <EventInfoContainer>
        <Badge
          icon={EVENT_TYPES[event.event_type].icon}
          color={EVENT_TYPES[event.event_type].color}
        >
          {EVENT_TYPES[event.event_type].name}
        </Badge>
        <p>{formatDateAndTime(event.start_time).formatted}</p>
      </EventInfoContainer>
    </EventCardButton>
  )
}
