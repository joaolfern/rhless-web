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

import jobsPageButton from 'assets/pageButton/jobs.png'
import resumesPageButton from 'assets/pageButton/resumes.png'
import usersPageButton from 'assets/pageButton/users.png'

export type IRouteConfig = {
  path: string
  label: string
  element: ReactNode
  icon: ReactNode
  pageButtonImage?: string
  inHome?: true
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
      icon: <HiUser />,
      pageButtonImage: usersPageButton,
      inHome: true
    },
    jobs: {
      label: 'Vagas',
      path: paths.auth.jobs,
      element: <Jobs />,
      icon: <MdWork />,
      pageButtonImage: jobsPageButton,
      inHome: true

    },
    resumes: {
      label: 'Currículos',
      path: paths.auth.resumes,
      element: <Resumes />,
      icon: <HiDocumentText />,
      pageButtonImage: resumesPageButton,
      inHome: true
    }
  }
}

export default routes
