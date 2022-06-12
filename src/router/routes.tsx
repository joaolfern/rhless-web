import React, { ReactNode } from 'react'
import paths from './paths'

import { TiHome } from 'react-icons/ti'
import { MdWork } from 'react-icons/md'
import { HiDocumentText, HiUser } from 'react-icons/hi'

import Home from 'views/Home/Home'
import Login from 'views/Login/Login'
import Users from 'views/Users/Users'
import Jobs from 'views/Jobs/Jobs'
import Candidates from 'views/Candidates/Candidates'

import jobsPageButton from 'assets/pageButton/jobs.png'
import candidatesPageButton from 'assets/pageButton/candidates.png'
import usersPageButton from 'assets/pageButton/users.png'
import { _userType } from 'types/Users'
import Feed from 'views/Feed/Feed'
import UserLogin from 'views/UserLogin/UserLogin'

export type IRouteConfig = {
  path: string
  label: string
  element: ReactNode
  icon: ReactNode
  pageButtonImage?: string
  inHome?: true
}

export type IRouteConfigAuth = IRouteConfig & {
  users: _userType[]
}

type IRoutes = {
  [key in 'auth' | 'unauth']: {
    [key: string]: IRouteConfig | IRouteConfigAuth
  }
}

const routes: IRoutes = {
  unauth: {
    feed: {
      path: paths.unauth.feed,
      element: <Feed />,
      label: 'Entrar',
      icon: <TiHome />
    },
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
    },
    userLogin: {
      path: paths.unauth.userLogin,
      element: <UserLogin />,
      label: 'Entrar',
      icon: <TiHome />
    }
  },
  auth: {
    home: {
      label: 'Início',
      path: paths.auth.home,
      element: <Home />,
      icon: <TiHome />,
      users: ['admin', 'headhunter', 'candidate']
    },
    users: {
      label: 'Usuários',
      path: paths.auth.users,
      element: <Users />,
      icon: <HiUser />,
      pageButtonImage: usersPageButton,
      inHome: true,
      users: ['admin']
    },
    jobs: {
      label: 'Vagas',
      path: paths.auth.jobs,
      element: <Jobs />,
      icon: <MdWork />,
      pageButtonImage: jobsPageButton,
      inHome: true,
      users: ['admin', 'headhunter']
    },
    candidates: {
      label: 'Candidaturas',
      path: paths.auth.candidates,
      element: <Candidates />,
      icon: <HiDocumentText />,
      pageButtonImage: candidatesPageButton,
      inHome: true,
      users: ['admin', 'headhunter']
    }
  }
}

export default routes
