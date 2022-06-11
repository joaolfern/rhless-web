import React from 'react'
import logo from 'assets/logo.jpg'
import useUser from 'hooks/useUser'
import Avatar from 'components/Avatar/Avatar'
import { CgClose } from 'react-icons/cg'
import { BiMenu } from 'react-icons/bi'
import { useAuthLayoutContext } from 'hooks'

function AppHeader () {
  const { session } = useUser()

  const { toggleSidebar, isSidebarOpen } = useAuthLayoutContext()

  return (
    <header className='flex justify-between p-3 border-b-2 bg-background border-light-text'>
      <img
        className='hidden object-scale-down w-28 md:block md:h-20 md:w-80'
        src={logo}
      />
      <div className='flex items-center gap-4 mr-auto md:ml-auto md:mr-0'>
        <p className='hidden md:inline'>{session?.user?.name}</p>
        <Avatar
          src={session?.user?.picture}
          className='w-10 h-10 md:w-16 md:h-16'
        />
      </div>
      <button
        className='p-2 ml-auto text-xl md:hidden'
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <CgClose/>
        ) : (
          <BiMenu />
        )}
      </button>
    </header>
  )
}

export default AppHeader
