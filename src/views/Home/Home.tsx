import React from 'react'
import routes from 'router/routes'
import PageButton from 'views/Home/PageButton'

function Home () {
  // TODO 🎈 grid auto-fit
  return (
    <section>
      <h1 className='font-bold text-light-text'>INÍCIO</h1>
      <div className='grid grid-rows-3 gap-4 md:grid-cols-3'>
        {Object.entries(routes.auth)
          .filter(([routeName, routeConfig]) => routeConfig.inHome)
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
