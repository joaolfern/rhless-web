import React, { createContext, ReactNode } from 'react'
import { IUser } from 'types/Users'

type IUserContext = {
  user: IUser | null
  updateUser: (user: IUser) => void
  clearUser: () => void
}

const initialState = {
  user: null,
  updateUser: (user: IUser) => {},
  clearUser: () => {}
}

const UserContext = createContext<IUserContext>(initialState)

function UserContextProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = React.useState<IUser | null>(null)

  function updateUser (user: IUser) {
    setUser(user)
  }

  function clearUser () {
    setUser(null)
  }

  const value = {
    user,
    updateUser,
    clearUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
