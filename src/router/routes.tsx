import React from 'react'
import Login from 'views/Login/Login'
import paths from './paths'

const routes = {
  unauth: {
    login: {
      path: paths.unauth.login,
      element: <Login />
    },
    restorePassword: {
      path:  paths.unauth.restorePassword,
      element: <Login />
    }
  }
}

export default routes
