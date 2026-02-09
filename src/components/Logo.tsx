import styled from 'styled-components'
import { IconAnalyzeFilled } from '@tabler/icons-react'

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  font-size: 1.375rem;

  color: #e4e6eb;
`

export function Logo() {
  return (
    <LogoWrapper>
      <IconAnalyzeFilled size={30} stroke={2} />
      Hack Global
    </LogoWrapper>
  )
}
