import React from 'react'
import { Link } from 'react-router-dom'
import { IRouteConfig } from 'router/routes'

interface IPageButton {
  routeConfig: IRouteConfig
}

function PageButton ({ routeConfig }: IPageButton) {
  return (
    <Link
      className='flex flex-col shadow rounded-xl bg-background'
      to={`/auth${routeConfig.path}`}
    >
      <img
        className='block rounded-tl-xl rounded-tr-xl'
        src={routeConfig.pageButtonImage}
      />
      <div className='flex items-center justify-center gap-2 p-4 text-xl font-bold cursor-pointer'>
        <span className='flex justify-center w-5'>
          {routeConfig.icon}
        </span>
        {routeConfig.label}
      </div>
    </Link>
  )
}

export default PageButton
