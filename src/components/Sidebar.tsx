import styled from 'styled-components'
import {
  IconMessageFilled,
  IconTrophyFilled,
  IconHelpCircleFilled,
  IconSettings,
  IconHomeFilled,
  IconCalendarWeekFilled,
  IconHexagonLetterDFilled,
  IconAnalyze,
  IconClipboardListFilled,
  IconBookFilled,
} from '@tabler/icons-react'

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

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  padding: 1.25rem 1.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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

const NavDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 0.5rem 0.75rem;
`

const BottomNav = styled.div`
  padding: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
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

const bottomLinks = [{ href: '/settings', label: 'Settings', icon: IconSettings }]

export function Sidebar() {
  return (
    <SidebarWrapper>
      <Logo>
        <IconAnalyze size={24} stroke={2} />
        Hackathon Global
      </Logo>
      <Nav>
        {links.map(({ href, label, icon: Icon }) => (
          // Hardcode: schedule page as active
          <NavLink key={href} $active={label === 'Schedule'}>
            <Icon size={20} stroke={1.5} />
            {label}
          </NavLink>
        ))}
      </Nav>
      <BottomNav>
        {bottomLinks.map(({ href, label, icon: Icon }) => (
          <NavLink key={href}>
            <Icon size={20} stroke={1.5} />
            {label}
          </NavLink>
        ))}
      </BottomNav>
    </SidebarWrapper>
  )
}
