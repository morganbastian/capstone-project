import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Success from './views/Register/success'
import Booking from './views/Booking'
import NotFound from './views/NotFound'
import Layout from './layouts'
import ThemeContextProvider from './context/themeContext'



function App() {
  return (
    <div className="App">
    <ThemeContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/register/success" element={<Success/>}/>
          <Route path="/bookings/new" element={<Booking/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </ThemeContextProvider>
  </div>
)
}

export default App;
