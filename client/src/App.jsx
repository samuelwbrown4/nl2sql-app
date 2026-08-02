import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import {MantineProvider} from '@mantine/core'
import Home from './pages/home/Home'

import './App.css'


function App() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
