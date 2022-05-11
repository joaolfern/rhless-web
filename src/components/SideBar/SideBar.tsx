import SideBarItem from 'components/SideBar/SideBarItem'
import { useAuthLayoutContext } from 'hooks'
import React from 'react'
import routes from 'router/routes'

function SideBar () {
  const { isSidebarOpen } = useAuthLayoutContext()

  return (
    <aside
      className={`
        absolute md:static top-0 left-0 flex flex-col w-full h-full bg-background
        md:border-r-2 grow md:border-light-text md:w-80 transition
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}
    >
      {Object.entries(routes.auth).map(([routeName, routeConfig]) => (
        <SideBarItem
          key={routeConfig.path}
          routeConfig={routeConfig}
        />
      ))}
    </aside>
  )
}

export default SideBar
