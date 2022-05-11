import { useAuthLayoutContext } from 'hooks'
import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { IRouteConfig } from 'router/routes'

type ISideBarItem = {
  routeConfig: IRouteConfig;
}

const beforeActiveMark = 'text-primary bg-dark-background before:content-[""] before:block before:h-full before:w-1 before:bg-primary before:absolute before:left-0 before:top-0'

function SideBarItem ({ routeConfig }: ISideBarItem) {
  const resolvedPath = useResolvedPath(`/auth${routeConfig.path}`)
  const isRouteActive = useMatch({ path: resolvedPath.pathname, end: true })
  const { toggleSidebar } = useAuthLayoutContext()

  return (
    <Link
      className={`
        font-bold p-4 cursor-pointer flex gap-2 items-center relative
        ${isRouteActive ? beforeActiveMark : ''}
      `}
      to={routeConfig.path.replace('/', '')}
      onClick={toggleSidebar}
    >
      <span className='flex justify-center w-5'>
        {routeConfig.icon}
      </span>
      {routeConfig.label}
    </Link>
  )
}

export default SideBarItem
