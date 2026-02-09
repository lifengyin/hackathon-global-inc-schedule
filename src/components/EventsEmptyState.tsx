import styled from 'styled-components'
import { IconSearch } from '@tabler/icons-react'

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

export type EventsEmptyStateProps = {
  query: string
}

export function EventsEmptyState({ query }: EventsEmptyStateProps) {
  return (
    <EmptyState>
      <EmptyStateMedia>
        <IconSearch size={32} stroke={1.5} aria-hidden />
      </EmptyStateMedia>
      <EmptyStateTitle>No results found</EmptyStateTitle>
      <EmptyStateDescription>
        No events match &quot;{query}&quot;. Try a different search term.
      </EmptyStateDescription>
    </EmptyState>
  )
}
