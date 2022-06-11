import api from 'config/api'
import usePersistState from 'hooks/usePersistState'
import React, { createContext, ReactNode, useEffect } from 'react'
import { IUser } from 'types/Users'

type ISession = { user: IUser, token: string }

type IUserContext = {
  session: ISession | null
  saveSession: ({ user, token }: ISession) => void
  clearSession: () => void
}

const initialState = {
  session: null,
  saveSession: ({ user, token }: ISession) => {},
  clearSession: () => {}
}

const UserContext = createContext<IUserContext>(initialState)

function UserContextProvider ({ children }: { children: ReactNode }) {
  const { state: session, setState: setSession } = usePersistState<ISession | null>('session', null)

  function saveSession (session: ISession) {
    setSession?.(session)
  }

  useEffect(() => {
    if (session?.token) api.defaults.headers.common['auth-token'] = session.token
    if (session?.user?.type) api.defaults.headers.common['user-type'] = session.user.type
  }, [session?.token, session?.user?.type])

  function clearSession () {
    setSession?.(null)
    api.defaults.headers.common['auth-token'] = ''
    api.defaults.headers.common['user-type'] = ''
  }

  const value = {
    session,
    saveSession,
    clearSession
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
