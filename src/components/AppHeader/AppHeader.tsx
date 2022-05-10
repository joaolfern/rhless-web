import React from 'react'
import logo from 'assets/logo.jpg'
import useUser from 'hooks/useUser'
import Avatar from 'components/Avatar/Avatar'

function AppHeader () {
  const user = useUser()

  return (
    <header className='flex justify-between p-3 border-b-2 bg-background border-light-text'>
      <img
        className='object-scale-down h-20 w-80'
        src={logo}
      />
      <div className='flex items-center gap-4'>
        <p>{user.name}</p>
        <Avatar
          src={user.picture}

        />
      </div>
    </header>
  )
}

export default AppHeader
