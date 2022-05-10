import AppHeader from 'components/AppHeader/AppHeader'
import SideBar from 'components/SideBar/SideBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from 'router/routes'

function AuthLayout () {
  return (
    <div className='h-100'>
      <AppHeader />
      <div>
        <SideBar />
        <main>
          {<Routes>
            {Object.values(routes.auth).map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Routes>}
        </main>
      </div>
    </div>
  )
}

export default AuthLayout
