import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import {MantineProvider} from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import Home from './pages/home/Home'
import SaveDocDraft from './pages/saveDoc/SaveDocDraft'
import DocList from './pages/docList/DocList'
import './App.css'


function App() {

  return (
    <MantineProvider>
      <Notifications/>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/document-create'} element={<SaveDocDraft/>}/>
          <Route path={'/documents/list'} element={<DocList/>}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
