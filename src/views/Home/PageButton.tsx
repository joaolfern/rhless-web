import React from 'react'
import { Link } from 'react-router-dom'
import { IRouteConfig } from 'router/routes'

interface IPageButton {
  routeConfig: IRouteConfig
}

function PageButton ({ routeConfig }: IPageButton) {
  return (
    <Link
      className='flex '
      to={routeConfig.path.replace('/', '')}
    >
      <img
        className='block'
        src={routeConfig.pageButtonImage}
      />
    </Link>
  )
}

export default PageButton