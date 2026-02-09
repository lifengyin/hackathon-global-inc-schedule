import styled from 'styled-components'
import { Form as BaseForm } from '@base-ui/react/form'
import { IconBrandGithub } from '@tabler/icons-react'
import background from '../assets/mr-goose.jpg'
import { Button } from '../atoms/Button'
import { Field } from '../atoms/Field'
import { Logo } from '../components/Logo'
import { useState } from 'react'
import useLocalStorage from 'use-local-storage'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  background: #111318;
`

const ImageHalf = styled.div`
  width: 50vw;
  padding: 15px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    filter: brightness(0.25);
    border-radius: 15px;
  }
`

const LogoWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 10;
  padding: 1.25rem 1.5rem;
`

const Quote = styled.blockquote`
  position: absolute;
  bottom: 40px;
  left: 40px;
  z-index: 10;

  width: 45%;

  font-size: 1.25rem;
  font-weight: 500;
  color: #e4e6eb;
  margin: 0;
  padding: 0;
`

const FormHalf = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Card = styled.div`
  width: 100%;
  max-width: 360px;
`

const Title = styled.h1`
  margin-bottom: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #e4e6eb;
`

const Subtitle = styled.h2`
  margin-top: 0.25rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 400;
  color: #d1d5db;
`

const Form = styled(BaseForm)`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`

const FormInput = styled(Field.Root)`
  width: 100%;
`

const SubmitButton = styled(Button)`
  width: 100%;
`

const DividerWithOr = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
  }
`

const OrText = styled.span`
  font-size: 0.875rem;
  color: #9ca3af;
`

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const SocialButton = styled(Button)`
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not([data-disabled]) {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.25);
  }
`

const ForgotPasswordRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  margin-bottom: 0;
`

const TextLink = styled.a`
  font-size: 0.875rem;
  color: #93c5fd;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const SignUpRow = styled.p`
  margin: 1.5rem 0 0;
  font-size: 0.875rem;
  color: #9ca3af;
  text-align: center;
`

const SignUpLink = styled.a`
  color: #93c5fd;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string, password?: string }>({})
  const [, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)

  const handleFormSubmit = (formValues: Record<string, unknown>) => {
    if (formValues.username === 'hacker' && formValues.password === 'htn2026') {
      setIsLoggedIn(true)
    } else {
      setErrors({ username: 'Invalid username or password' })
    }
  }

  return (
    <Page>
      <ImageHalf>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <Quote>&quot;I can't recommend Hack Global enough for its ability to teach you new skills, expand your network and build things you're passionate about!&quot; <span style={{ fontStyle: 'italic' }}>- Rajan Agarwal</span></Quote>

        <img
          src={background}
          alt="Image of Mr. Goose at Hack the North."
        />
      </ImageHalf>
      <FormHalf>
        <Card> 
          <Title>Log in</Title>
          <Subtitle>Welcome back! Please enter your details.</Subtitle>
          <Form
            errors={errors}
            onFormSubmit={handleFormSubmit}
          >
            <FormInput name="username" validate={() => null}>
              <Field.Label>Username</Field.Label>
              <Field.Input 
                type="text" 
                placeholder="hacker" 
                value={username} 
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <Field.Error />
            </FormInput>
            <FormInput name="password" validate={() => null}>
              <Field.Label>Password</Field.Label>
              <Field.Input 
                type="password" 
                placeholder="•••••••" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <ForgotPasswordRow>
                <TextLink href="#" onClick={(e) => e.preventDefault()}>Forgot password?</TextLink>
              </ForgotPasswordRow>
              <Field.Error />
            </FormInput>
            <SubmitButton type="submit">
              Log in
            </SubmitButton>
            <DividerWithOr>
              <OrText>or</OrText>
            </DividerWithOr>
            <SocialButtons>
              <SocialButton type="button">
                <GoogleIcon size={20} />
                Continue with Google
              </SocialButton>
              <SocialButton type="button">
                <IconBrandGithub size={20} />
                Continue with GitHub
              </SocialButton>
            </SocialButtons>
          </Form>
          <SignUpRow>
            Don&apos;t have an account? <SignUpLink href="#" onClick={(e) => e.preventDefault()}>Sign up</SignUpLink>
          </SignUpRow>
        </Card>
      </FormHalf>
    </Page>
  )
}
