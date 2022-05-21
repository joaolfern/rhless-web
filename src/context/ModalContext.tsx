import React, { createContext, ReactNode, useState } from 'react'

const initialState = {
  show: false,
  updateShowModal: (value: boolean) => {}
}

const ModalContext = createContext(initialState)

function ModalContextProvider ({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false)

  function updateShowModal (show: boolean) {
    setShow(show)
  }

  const value = {
    show,
    updateShowModal
  }

  return (
  <ModalContext.Provider value={value}>
    {children}
  </ModalContext.Provider>
  )
}

export { ModalContext, ModalContextProvider }
