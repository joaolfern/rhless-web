import React from 'react'
import routes from 'router/routes'
import PageButton from 'views/Home/PageButton'

function Home () {
  return (
    <section>
      <h1 className='font-bold text-light-text'>INÍCIO</h1>
      <ul className='grid '>
        {Object.entries(routes.auth)
          .filter(([routeName, routeConfig]) => routeConfig.inHome)
          .map(([routeName, routeConfig]) => (
            <li key={routeConfig.path}>
              <PageButton
                routeConfig={routeConfig}
              />
            </li>
          ))}
      </ul>
    </section>
  )
}

export default Home
