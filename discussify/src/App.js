import './App.css'
import Navbar from './components/Navbar'
import { SignUp } from './components/SignUp'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './components/Login'
import { Main } from './components/Main'
import { Options } from './components/Options'
import { Account } from './components/Account'
import { Search } from './components/Search'
import { About } from './components/About'
import { PrivateRoute } from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <div>
            <Navbar />
            <PrivateRoute exact path ='/' component={Main} />
            <PrivateRoute path = '/options' component={Options} />
            <PrivateRoute path ='/account' component={Account} />
            <PrivateRoute path ='/about' component={About} />
            <PrivateRoute path ='/search' component={Search} />
          </div>
        </Switch>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
