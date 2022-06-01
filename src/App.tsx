import React from 'react'
import Router from 'router'
import { BrowserRouter } from 'react-router-dom'
import { ModalContextProvider } from 'context/ModalContext'
import { MessageModalProvider } from 'context/MessageModalContext'
import MessageModal from 'components/MessageModal/MessageModal'
import { UserContextProvider } from 'context/UserContex'

function App () {
  return (
    <BrowserRouter>
      <ModalContextProvider>
        <MessageModalProvider>
          <UserContextProvider>
            <MessageModal />
            <Router />
          </UserContextProvider>
        </MessageModalProvider>
      </ModalContextProvider>
      <div id='modal-portal'></div>
    </BrowserRouter>
  )
}

export default App
