import * as React from 'react'
import { Field as BaseField } from '@base-ui/react/field'
import { Input as BaseInput } from '@base-ui/react/input'
import styled from 'styled-components'

const StyledRoot = styled(BaseField.Root)``

const StyledLabel = styled(BaseField.Label)`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
  margin-bottom: 0.25rem;
`

const StyledInput = styled(BaseInput)`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.375rem;
  font-size: 1rem;
  background: #252830;
  color: #e4e6eb;
  font-family: inherit;
  
  // Note: used box shadow so focus/invalid don't cause layout shift
  box-shadow: 0 0 0 2px transparent;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08);
  }

  &[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &[data-invalid] {
    box-shadow: 0 0 0 2px #ef4444;
  }
`

const StyledDescription = styled(BaseField.Description)`
  font-size: 0.8125rem;
  color: #6b7280;
  margin-top: 0.25rem;
`

const ErrorSlot = styled.div`
  min-height: 1.25rem;
  margin-top: 0.25rem;
`

const StyledError = styled(BaseField.Error)`
  font-size: 0.8125rem;
  color: #ef4444;
`

function ErrorWithSlot(
  props: React.ComponentProps<typeof StyledError>
) {
  return (
    <ErrorSlot>
      <StyledError {...props} />
    </ErrorSlot>
  )
}

export const Field = {
  Root: StyledRoot,
  Label: StyledLabel,
  Description: StyledDescription,
  Error: ErrorWithSlot,
  Control: BaseField.Control,
  Input: StyledInput,
}

export type FieldRootProps = React.ComponentProps<typeof Field.Root>
export type FieldLabelProps = React.ComponentProps<typeof Field.Label>
export type FieldDescriptionProps = React.ComponentProps<typeof Field.Description>
export type FieldErrorProps = React.ComponentProps<typeof StyledError>
export type FieldControlProps = React.ComponentProps<typeof Field.Control>
export type FieldInputProps = React.ComponentProps<typeof Field.Input>
