import styled from 'styled-components'
import background from '../assets/background.jpeg'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
`

const ImageHalf = styled.div`
  background: #1a1d24;
  width: 50vw;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const FormHalf = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #111318;
`

const Card = styled.div`
  width: 100%;
  max-width: 360px;
`

const Title = styled.h1`
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #e4e6eb;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #9ca3af;
`

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.375rem;
  font-size: 1rem;
  background: #252830;
  color: #e4e6eb;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08);
  }
`

const Submit = styled.button`
  margin-top: 0.5rem;
  padding: 0.625rem 1rem;
  background: #374151;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #4b5563;
  }
`

export function Login() {
  return (  
    <Page>
      <ImageHalf>
        <img
          src={background}
          alt=""
          fetchPriority="high"
        />
      </ImageHalf>
      <FormHalf>
        <Card>
          <Title>Log in</Title>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
              />
            </div>
            <Submit type="submit">Log in</Submit>
          </Form>
        </Card>
      </FormHalf>
    </Page>
  )
}
