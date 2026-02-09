import styled from 'styled-components'
import { IconSearch, IconX } from '@tabler/icons-react'

const SearchField = styled.label`
  position: relative;
  display: inline-block;
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

export type EventsSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function EventsSearch({ value, onChange }: EventsSearchProps) {
  return (
    <SearchField>
      <SearchIconWrap>
        <IconSearch size={18} stroke={1.5} />
      </SearchIconWrap>
      <SearchInput
        type="search"
        placeholder="Search events…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search events"
      />
      {value.length > 0 && (
        <SearchClearBtn
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <IconX size={16} stroke={1.5} />
        </SearchClearBtn>
      )}
    </SearchField>
  )
}
