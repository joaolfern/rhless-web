import React, { createContext, ReactNode, useRef, useState } from 'react'

type onConfirmType = () => void

type IContext = {
  show: boolean
  content: ReactNode
  onClose: () => void
  dialog: ({ content, onConfirm }: {content: ReactNode, onConfirm?: onConfirmType}) => void
  onConfirmRef: onConfirmType | undefined
}

const initialState: IContext = {
  show: false,
  content: null,
  onClose: () => {},
  dialog: ({ content, onConfirm }: {content: ReactNode, onConfirm?: onConfirmType}) => {},
  onConfirmRef: undefined
}

const MessageModal = createContext(initialState)

function MessageModalProvider ({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false)
  const [content, setContent] = useState<ReactNode>(null)
  const onConfirmRef = useRef<onConfirmType | undefined>(undefined)

  function onClose () {
    setShow(false)
  }

  function dialog ({ content, onConfirm }: {content: ReactNode, onConfirm?: onConfirmType}) {
    setContent(content)
    setShow(true)
    if (onConfirm) onConfirmRef.current = onConfirm
  }

  const value: IContext = {
    show,
    content,
    onClose,
    dialog,
    onConfirmRef: onConfirmRef.current
  }

  return (
  <MessageModal.Provider value={value}>
    {children}
  </MessageModal.Provider>
  )
}

export { MessageModal, MessageModalProvider }
