import styled from 'styled-components'
import {
  IconMessageFilled,
  IconTrophyFilled,
  IconHomeFilled,
  IconCalendarWeekFilled,
  IconHexagonLetterDFilled,
  IconClipboardListFilled,
  IconBookFilled,
  IconX,
} from '@tabler/icons-react'
import { Button } from '../atoms/Button'
import { Logo } from './Logo'
import { SidebarUserRow } from './SidebarUserRow'
import { Separator } from '@base-ui/react/separator'

const Overlap = styled.div<{ $visible: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: ${(p) => (p.$visible ? 1 : 0)};
    visibility: ${(p) => (p.$visible ? 'visible' : 'hidden')};
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }
`

const SidebarWrapper = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: #1a1d24;
  color: #e4e6eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 100;
  transition: transform 0.25s ease;

  @media (max-width: 768px) {
    transform: translateX(${(p) => (p.$open ? '0%' : '-100%')});
  }
`

const CloseButton = styled(Button)`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 1rem;
    right: 1rem;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    padding: 0;
    border: none;
    border-radius: 0.5rem;
    background: transparent;
    color: #9ca3af;

    &:hover:not([data-disabled]) {
      color: #e4e6eb;
      background: rgba(255, 255, 255, 0.06);
    }
  }
`

const LogoWrapper = styled.div`
  padding: 1.25rem 1.5rem;

  @media (max-width: 768px) {
    padding-right: 3rem;
  }
`

const Nav = styled.nav`
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const Divider = styled(Separator)`
  height: 1px;
  background-color: #374151;
`

// Hardcode: all links are actually divs
const NavLink = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.5rem;
  color: ${(p) => (p.$active ? '#fff' : '#9ca3af')};
  background: ${(p) => (p.$active ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
  transition: color 0.25s, background 0.25s;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }
`

const links = [
  { href: '/', label: 'Home', icon: IconHomeFilled },
  { href: '/schedule', label: 'Schedule', icon: IconCalendarWeekFilled },
  { href: '/mentors', label: 'Mentors', icon: IconMessageFilled },
  { href: '/hardware', label: 'Hardware Checkout', icon: IconClipboardListFilled },
  { href: '/goose-games', label: 'Goose Games', icon: IconTrophyFilled },
  { href: '/hacker-guide', label: 'Hacker Guide', icon: IconBookFilled },
  { href: '/devpost', label: 'Devpost', icon: IconHexagonLetterDFilled },
]

const loggedInUser = {
  name: 'Lifeng Yin',
  email: 'lifeng@hackglobal.com',
}

type SidebarProps = {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = true, onClose }: SidebarProps) {
  return (
    <>
      <Overlap $visible={open} onClick={onClose} aria-hidden />
      <SidebarWrapper $open={open}>
        <CloseButton type="button" onClick={onClose} aria-label="Close menu">
          <IconX size={24} />
        </CloseButton>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Divider />
        <Nav>
          {links.map(({ href, label, icon: Icon }) => (
            <NavLink key={href} $active={label === 'Schedule'}>
              <Icon size={20} stroke={1.5} />
              {label}
            </NavLink>
          ))}
        </Nav>
        <SidebarUserRow user={loggedInUser} />
      </SidebarWrapper>
    </>
  )
}
