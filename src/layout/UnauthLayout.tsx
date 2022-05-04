import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from 'router/routes'

function UnauthLayout() {
  return (
    <main className='h-full'>
      <Routes>
        {Object.values(routes.unauth).map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </main>
  )
}

export default UnauthLayout