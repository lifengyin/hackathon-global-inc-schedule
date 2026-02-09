import styled from 'styled-components'
import { IconMenu2 } from '@tabler/icons-react'
import { Button } from '../atoms/Button'

const Header = styled.header`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3.5rem;
    padding: 2.25rem 1rem;
    background: #111318;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 98;
  }
`

const HamburgerButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  min-width: 2.5rem;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: #e4e6eb;

  &:hover:not([data-disabled]) {
    background: rgba(255, 255, 255, 0.06);
  }
`

type MobileHeaderProps = {
  onMenuClick: () => void
  children?: React.ReactNode
}

export function MobileHeader({ onMenuClick, children }: MobileHeaderProps) {
  return (
    <Header>
      <HamburgerButton
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <IconMenu2 size={24} />
      </HamburgerButton>
      {children}
    </Header>
  )
}
