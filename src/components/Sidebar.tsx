import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Avatar from 'boring-avatars'
import {
  IconMessageFilled,
  IconTrophyFilled,
  IconSettings,
  IconHomeFilled,
  IconCalendarWeekFilled,
  IconHexagonLetterDFilled,
  IconAnalyzeFilled,
  IconClipboardListFilled,
  IconBookFilled,
  IconLogout,
  IconSelector,
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

const UserBlock = styled.div`
  position: relative;
  padding: 0.75rem;
`

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.625rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`

const AvatarWrap = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const UserName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #e4e6eb;
`

const UserEmail = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DotsWrap = styled.span`
  flex-shrink: 0;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
`

const MoreMenu = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 0.75rem;
  right: 0.75rem;
  margin-bottom: 0.25rem;
  background: #252830;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 0.25rem;
  opacity: ${(p) => (p.$open ? 1 : 0)};
  visibility: ${(p) => (p.$open ? 'visible' : 'hidden')};
  z-index: 10;
  transition: opacity 0.15s, visibility 0.15s;
`

const MoreMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #e4e6eb;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  svg {
    width: 1.125rem;
    height: 1.125rem;
    color: #9ca3af;
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
  const [menuOpen, setMenuOpen] = useState(false)
  const userBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (userBlockRef.current && !userBlockRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  return (
    <SidebarWrapper>
      <Logo>
        <IconAnalyzeFilled size={28} stroke={2} />
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
      <UserBlock ref={userBlockRef}>
        <MoreMenu $open={menuOpen}>
          <MoreMenuItem onClick={() => setMenuOpen(false)}>
            <IconSettings size={18} stroke={1.5} />
            Account settings
          </MoreMenuItem>
          <MoreMenuItem onClick={() => setMenuOpen(false)}>
            <IconLogout size={18} stroke={1.5} />
            Logout
          </MoreMenuItem>
        </MoreMenu>
        <UserRow onClick={() => setMenuOpen((o) => !o)}>
          <AvatarWrap>
            <Avatar name={loggedInUser.name} size={32} variant="beam" />
          </AvatarWrap>
          <UserInfo>
            <UserName>{loggedInUser.name}</UserName>
            <UserEmail>{loggedInUser.email}</UserEmail>
          </UserInfo>
          <DotsWrap>
            <IconSelector size={18} stroke={1.5} />
          </DotsWrap>
        </UserRow>
      </UserBlock>
    </SidebarWrapper>
  )
}
