import React, { useEffect } from 'react'
import Router from 'router'
import { BrowserRouter } from 'react-router-dom'
import { ModalContextProvider } from 'context/ModalContext'
import { MessageModalProvider } from 'context/MessageModalContext'
import MessageModal from 'components/MessageModal/MessageModal'
import { UserContextProvider } from 'context/UserContex'
import { Toaster } from 'react-hot-toast'
import { cacheImages } from 'utils'
import logo from 'assets/logo.jpg'

function App () {
  useEffect(() => {
    cacheImages([logo])
  }, [])

  return (
    <BrowserRouter>
      <ModalContextProvider>
        <MessageModalProvider>
          <UserContextProvider>
            <MessageModal />
            <Router />
            <Toaster />
          </UserContextProvider>
        </MessageModalProvider>
      </ModalContextProvider>
      <div id='modal-portal'></div>
    </BrowserRouter>
  )
}

export default App
