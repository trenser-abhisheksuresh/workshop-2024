import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css'
import UserLogin from './components/UserLogin/UserLogin'
import UserCreation from './components/UserCreation/UserCreation'
import UserDetails from './components/UserDetails/UserDetails'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='/user-creation' element={<UserCreation />} />
        <Route path='/user-details/:id' element={<UserDetails />} />
      </Routes>
    </Router>
  )
}

export default App
