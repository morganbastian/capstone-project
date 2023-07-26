import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
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
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </ThemeContextProvider>
  </div>
)
}

export default App;
