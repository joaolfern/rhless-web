import React, { createContext, ReactNode, useState } from 'react'

const initialState = {
  isSidebarOpen: false,
  toggleSidebar: () => {}
}

const AuthLayoutContext = createContext(initialState)

function AuthLayoutContextProvider ({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar () {
    setIsSidebarOpen(prev => !prev)
  }

  const value = {
    isSidebarOpen,
    toggleSidebar
  }

  return (
    <AuthLayoutContext.Provider value={value}>
      {children}
    </AuthLayoutContext.Provider>
  )
}

export { AuthLayoutContext, AuthLayoutContextProvider }
