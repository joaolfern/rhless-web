import React from 'react'
import SideBarItem from 'components/SideBar/SideBarItem'
import { useAuthLayoutContext } from 'hooks'
import routes, { IRouteConfigAuth } from 'router/routes'
import { FiLogOut } from 'react-icons/fi'
import useUser from 'hooks/useUser'
import api from 'config/api'
import { useNavigate } from 'react-router-dom'

function SideBar () {
  const { isSidebarOpen } = useAuthLayoutContext()
  const { clearUser, user } = useUser()
  const navigate = useNavigate()

  function logout () {
    localStorage.removeItem('token')
    clearUser()
    api.defaults.headers.common['auth-token'] = ''
    navigate('/')
  }

  return (
    <aside
      className={`
        absolute md:static top-0 left-0 flex flex-col w-full h-full bg-background
        md:border-r-2 grow md:border-light-text md:w-80 transition
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}
    >
      {Object.entries(routes.auth)
        .filter(([routeName, routeConfig]) => user?.type && (routeConfig as IRouteConfigAuth).users.includes(user.type))
        .map(([routeName, routeConfig]) => (
          <SideBarItem
            key={routeConfig.path}
            routeConfig={routeConfig}
          />
        ))}
      <button
        className='flex items-center justify-center gap-2 p-3 mt-auto font-bold'
        onClick={logout}
        onKeyDown={e => e.key === 'Enter' && logout()}
      >
        <FiLogOut /> Sair
      </button>
    </aside>
  )
}

export default SideBar
