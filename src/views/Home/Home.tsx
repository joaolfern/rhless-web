import useUser from 'hooks/useUser'
import React from 'react'
import routes, { IRouteConfigAuth } from 'router/routes'
import PageButton from 'views/Home/PageButton'

function Home () {
  const { session } = useUser()

  // TODO 🎈 grid auto-fit
  return (
    <section>
      <div className='grid grid-rows-3 gap-4 md:grid-rows-1 md:grid-cols-3'>
        {Object.entries(routes.auth)
          .filter(([routeName, routeConfig]) => session?.user?.type && routeConfig.inHome && (routeConfig as IRouteConfigAuth).users.includes(session.user.type))
          .map(([routeName, routeConfig]) => (
            <PageButton
              key={routeName}
              routeConfig={routeConfig}
            />
          ))}
      </div>
    </section>
  )
}

export default Home
