import React, { createContext, ReactNode } from 'react'
import { IUser } from 'types/Users'

type IUserContext = {
  user: IUser | null
  updateUser: (user: IUser) => void
}

const initialState = {
  user: null,
  updateUser: (user: IUser) => {}
}

const UserContext = createContext<IUserContext>(initialState)

function UserContextProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = React.useState<IUser | null>(null)

  function updateUser (user: IUser) {
    setUser(user)
  }

  const value = {
    user,
    updateUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
