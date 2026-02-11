import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import TodosPage from './pages/TodosPages'
import SobrePage from './pages/SobrePage'
// import Header from './components/Header'
// import Footer from './components/Footer'

export default function App(){
  return (
    <div className="app-container">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/todos" element={<TodosPage/>} />
        <Route path="/sobre" element={<SobrePage/>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}
