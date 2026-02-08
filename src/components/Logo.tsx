import styled from 'styled-components'
import { IconAnalyzeFilled } from '@tabler/icons-react'

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

export function Logo() {
  return (
    <LogoWrapper>
      <IconAnalyzeFilled size={28} stroke={2} />
      Hackathon Global
    </LogoWrapper>
  )
}
