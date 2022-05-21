import React from 'react'
import Router from 'router'
import { BrowserRouter } from 'react-router-dom'

function App () {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <div id='modal-portal'></div>
    </>

  )
}

export default App
