import styled from 'styled-components'
import {
  IconMessageFilled,
  IconTrophyFilled,
  IconHomeFilled,
  IconCalendarWeekFilled,
  IconHexagonLetterDFilled,
  IconClipboardListFilled,
  IconBookFilled,
} from '@tabler/icons-react'
import { Logo } from './Logo'
import { SidebarUserRow } from './SidebarUserRow'

const SidebarWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #1a1d24;
  color: #e4e6eb;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

const Nav = styled.nav`
  flex: 1;
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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
  email: 'lifeng@hglobal.com',
}

export function Sidebar() {
  return (
    <SidebarWrapper>
      <Logo />
      <Nav>
        {links.map(({ href, label, icon: Icon }) => (
          // Hardcode: schedule page as active
          <NavLink key={href} $active={label === 'Schedule'}>
            <Icon size={20} stroke={1.5} />
            {label}
          </NavLink>
        ))}
      </Nav>
      <SidebarUserRow user={loggedInUser} />
    </SidebarWrapper>
  )
}
