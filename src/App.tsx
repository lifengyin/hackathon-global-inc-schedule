import { Redirect, Route, Switch } from 'wouter'
import { ThemeProvider } from 'styled-components'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import useLocalStorage from 'use-local-storage'

import '@fontsource-variable/geist';

export const lightTheme = {
  colorBlue: 'oklch(45% 0.5 264deg)',
  colorRed: 'oklch(50% 0.55 31deg)',
  gray50: 'oklch(98% 0.0025 264deg)',
  gray100: 'oklch(12% 0.095 264deg / 5%)',
  gray200: 'oklch(12% 0.09 264deg / 7%)',
  gray300: 'oklch(12% 0.085 264deg / 17%)',
  gray400: 'oklch(12% 0.08 264deg / 38%)',
  gray500: 'oklch(12% 0.075 264deg / 50%)',
  gray600: 'oklch(12% 0.07 264deg / 67%)',
  gray700: 'oklch(12% 0.06 264deg / 77%)',
  gray800: 'oklch(12% 0.05 264deg / 85%)',
  gray900: 'oklch(12% 0.05 264deg / 90%)',
  gray950: 'oklch(12% 0.05 264deg / 95%)',
}

export const darkTheme = {
  colorBlue: 'oklch(69% 0.5 264deg)',
  colorRed: 'oklch(80% 0.55 31deg)',
  gray50: 'oklch(17% 0.0025 264deg)',
  gray100: 'oklch(28% 0.0075 264deg / 65%)',
  gray200: 'oklch(29% 0.0075 264deg / 80%)',
  gray300: 'oklch(35% 0.0075 264deg / 80%)',
  gray400: 'oklch(47% 0.00875 264deg / 80%)',
  gray500: 'oklch(64% 0.01 264deg / 80%)',
  gray600: 'oklch(82% 0.01 264deg / 80%)',
  gray700: 'oklch(92% 0.01125 264deg / 80%)',
  gray800: 'oklch(93% 0.00875 264deg / 85%)',
  gray900: 'oklch(95% 0.005 264deg / 90%)',
  gray950: 'oklch(94% 0.00375 264deg / 95%)',
}

function App() {
  const [isLoggedIn] = useLocalStorage('isLoggedIn', false)
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Switch>
        {isLoggedIn ? <Route path="/login"><Redirect to="/" /></Route> : <Route path="/login" component={Login} />}
        <Route path="/" component={Dashboard} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
