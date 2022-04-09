import './App.css'
import Navbar from './components/Navbar'
import { SignUp } from './components/SignUp'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
