import React, { ReactNode } from 'react'
import paths from './paths'

import { TiHome } from 'react-icons/ti'
import { MdWork } from 'react-icons/md'
import { HiDocumentText, HiUser } from 'react-icons/hi'

import Home from 'views/Home/Home'
import Login from 'views/Login/Login'
import Users from 'views/Users/Users'
import Jobs from 'views/Jobs/Jobs'
import Resumes from 'views/Resumes/Resumes'

export type IRouteConfig = {
  path: string
  label: string
  element: ReactNode
  icon: ReactNode
}

type IRoutes = {
  [key in 'auth' | 'unauth']: {
    [key: string]: IRouteConfig
  }
}

const routes: IRoutes = {
  unauth: {
    login: {
      path: paths.unauth.login,
      element: <Login />,
      label: 'Entrar',
      icon: <TiHome />
    },
    restorePassword: {
      path: paths.unauth.restorePassword,
      element: <Login />,
      label: 'Restaurar senha',
      icon: <TiHome />
    }
  },
  auth: {
    home: {
      label: 'Início',
      path: paths.auth.home,
      element: <Home />,
      icon: <TiHome />
    },
    users: {
      label: 'Usuários',
      path: paths.auth.users,
      element: <Users />,
      icon: <HiUser />
    },
    jobs: {
      label: 'Vagas',
      path: paths.auth.jobs,
      element: <Jobs />,
      icon: <MdWork />
    },
    resumes: {
      label: 'Currículos',
      path: paths.auth.resumes,
      element: <Resumes />,
      icon: <HiDocumentText />
    }
  }
}

export default routes
