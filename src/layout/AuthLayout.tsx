import React from 'react'
import AppHeader from 'components/AppHeader/AppHeader'
import SideBar from 'components/SideBar/SideBar'
import { AuthLayoutContextProvider } from 'context/AuthLayoutContext'
import { Route, Routes } from 'react-router-dom'
import routes from 'router/routes'
import { ModalContextProvider } from 'context/ModalContext'
import { MessageModalProvider } from 'context/MessageModalContext'
import MessageModal from 'components/MessageModal/MessageModal'

function AuthLayout () {
  return (
    <div className='flex flex-col h-full max-h-full font-nunito'>

      <AuthLayoutContextProvider>
        <ModalContextProvider>
          <MessageModalProvider>
            <MessageModal />
            <AppHeader />
            <div className='relative flex overflow-hidden grow'>
              <SideBar />
              <main className='flex flex-col w-full p-4 grow bg-dark-background'>

                {<Routes>
                  {Object.values(routes.auth).map(route => (
                    <Route
                      {...route}
                      key={route.path}
                      element={
                        <>
                          <h1 className='text-xl font-bold uppercase text-light-text'>{route.label}</h1>
                          <div className='flex flex-col overflow-x-hidden overflow-y-auto grow'>
                            {route.element}
                          </div>
                        </>
                      }
                      />
                  ))}
                </Routes>}
              </main>
            </div>
          </MessageModalProvider>
        </ModalContextProvider>
      </AuthLayoutContextProvider>
    </div>
  )
}

export default AuthLayout
