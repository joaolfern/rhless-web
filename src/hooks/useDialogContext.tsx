import { MessageModal } from 'context/MessageModalContext'
import React, { useContext } from 'react'

const useDialogContext = () => useContext(MessageModal)

export default useDialogContext
