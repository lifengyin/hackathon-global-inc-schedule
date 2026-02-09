import * as React from 'react'
import { Button as BaseButton } from '@base-ui/react/button'
import styled from 'styled-components'

const StyledButton = styled(BaseButton)`
  padding: 0.625rem 1rem;
  background: #374151;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  font-family: inherit;

  &:hover:not([data-disabled]) {
    background: #4b5563;
  }

  &[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return <StyledButton ref={ref} {...props} />
  }
)
