import styled from 'styled-components'
import { Dialog } from '@base-ui/react/dialog'
import { IconX } from '@tabler/icons-react'
import type { TEvent } from '../types'
import { Badge } from '../atoms/Badge'
import { formatDateAndTime, EVENT_TYPES } from '../utils/eventUtils'

const DialogBackdrop = styled(Dialog.Backdrop)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`

const DialogPopup = styled(Dialog.Popup)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  width: 90%;
  max-width: 480px;
  max-height: 85vh;
  overflow: auto;
  background: #252830;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.75rem;
  padding: 2rem;
  color: #e4e6eb;
`

const DialogCloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #e4e6eb;
    background: rgba(255, 255, 255, 0.08);
  }
`

const DialogTitleEl = styled(Dialog.Title)`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #e4e6eb;
`

const DialogDescriptionEl = styled(Dialog.Description)`
  margin: 0 0 1rem;
  font-size: 1rem;
  color: #9ca3af;
  line-height: 1.5;
`

const DialogMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const DialogMetaTime = styled.span`
  font-size: 0.9375rem;
  color: #9ca3af;
`

const DialogSecondaryText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: #9ca3af;
`

const RelatedEventsSection = styled.div`
  margin-top: 1rem;
`

const RelatedEventsLabel = styled.p`
  margin: 0 0 0.25rem;
  font-size: 0.9375rem;
  color: #9ca3af;
`

const RelatedEventsList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.9375rem;
  color: #9ca3af;
`

const Bolded = styled.span`
  font-weight: 600;
  color: #e4e6eb;
`

export type EventCardDialogProps = {
  event: TEvent | null
  allEvents: TEvent[]
  onClose: () => void
}

export function EventCardDialog({ event, allEvents, onClose }: EventCardDialogProps) {
  const relatedByName = event
    ? event.related_events
        .map((id) => allEvents.find((e) => e.id === id)?.name)
        .filter((name): name is string => name != null)
    : []
  return (
    <Dialog.Root
      open={event !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Portal>
        <DialogBackdrop />
        <DialogPopup>
          {event && (
            <>
              <DialogTitleEl>{event.name}</DialogTitleEl>
              <DialogDescriptionEl>
                {event.description ?? 'No description available.'}
              </DialogDescriptionEl>
              <DialogMeta>
                <Badge
                  icon={EVENT_TYPES[event.event_type].icon}
                  color={EVENT_TYPES[event.event_type].color}
                >
                  {EVENT_TYPES[event.event_type].name}
                </Badge>
                <DialogMetaTime>
                  {formatDateAndTime(event.start_time).formatted}
                  {' – '}
                  {formatDateAndTime(event.end_time).time}
                </DialogMetaTime>
              </DialogMeta>
              {event.speakers?.length > 0 && (
                <DialogSecondaryText>
                  <Bolded>Speakers</Bolded>: {event.speakers.map((s) => s.name).join(', ')}
                </DialogSecondaryText>
              )}
              {relatedByName.length > 0 && (
                <RelatedEventsSection>
                  <RelatedEventsLabel><Bolded>Related events</Bolded>:</RelatedEventsLabel>
                  <RelatedEventsList>
                    {relatedByName.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </RelatedEventsList>
                </RelatedEventsSection>
              )}
              <DialogCloseButton render={<button type="button" aria-label="Close"><IconX size={20} stroke={1.5} /></button>} />
            </>
          )}
        </DialogPopup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
