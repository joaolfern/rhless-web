import AppHeader from 'components/AppHeader/AppHeader'
import SideBar from 'components/SideBar/SideBar'
import { AuthLayoutContextProvider } from 'context/AuthLayoutContext'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from 'router/routes'

function AuthLayout () {
  return (
    <div className='flex flex-col h-full font-nunito'>
      <AuthLayoutContextProvider>
        <AppHeader />
        <div className='relative flex grow'>
          <SideBar />
          <main className='w-full p-4 grow bg-dark-background'>
            {<Routes>
              {Object.values(routes.auth).map(route => (
                <Route key={route.path} {...route} />
              ))}
            </Routes>}
          </main>
        </div>
      </AuthLayoutContextProvider>
    </div>
  )
}

export default AuthLayout
