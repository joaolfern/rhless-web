import { UserContext } from 'context/UserContex'
import { useContext } from 'react'

const useUser = () => useContext(UserContext)

export default useUser
