import * as React from 'react'
import styled from 'styled-components'

const StyledBadge = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => props.$color ? props.$color : 'rgba(255, 255, 255, 0.08)'};
  color: ${props => props.$color ? 'white' : '#9ca3af'};
  line-height: 1.2;
  border-radius: 9999px;
  font-family: inherit;
  white-space: nowrap;
`

const IconWrapper = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  line-height: 0;
`

export type BadgeProps = React.ComponentPropsWithoutRef<typeof StyledBadge> & {
  color?: string
  icon?: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ color, icon, children, ...props }, ref) {
    return (
      <StyledBadge ref={ref} $color={color} {...props}>
        {icon != null ? (
          <>
            <IconWrapper>{icon}</IconWrapper>
            {children}
          </>
        ) : (
          children
        )}
      </StyledBadge>
    )
  }
)
