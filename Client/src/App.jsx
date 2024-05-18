import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Pages/Home'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path = '/'>
            <Route index element = {<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
