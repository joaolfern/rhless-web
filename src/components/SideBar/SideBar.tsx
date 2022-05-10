import React from 'react'
import { Link } from 'react-router-dom'
import routes from 'router/routes'

function SideBar () {
  return (
    <aside
      className='h-full border-r-2 border-light-text w-80'
    >
      {Object.entries(routes.auth).map(([routeName, routeConfig]) => (
        <Link to={routeConfig.path}>{routeName}</Link>
      ))}
    </aside>
  )
}

export default SideBar
