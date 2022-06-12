import React from 'react'
import useUser from 'hooks/useUser'
import { Link } from 'react-router-dom'
import paths from 'router/paths'
import { FiLogOut } from 'react-icons/fi'

function AccountFeedLabel () {
  const { session, clearSession } = useUser()

  if (!session?.user) {
    return (
    <Link
      className='flex items-center justify-center font-semibold leading-none text-secondary'
      to={paths.unauth.userLogin}
    >
      Entrar
    </Link>
    )
  }

  return (
    <button
      className='flex items-center justify-center gap-2 font-semibold leading-none text-primary'
      onClick={clearSession}
      onKeyDown={e => e.key === 'Enter' && clearSession()}
    >
      {session.user.name}
      <FiLogOut />
    </button>
  )
}

export default AccountFeedLabel
