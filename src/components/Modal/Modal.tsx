import { useModalContext } from 'hooks/useModalContext'
import React, { ReactNode } from 'react'
import { HiX, HiArrowLeft } from 'react-icons/hi'
import { createPortal } from 'react-dom'

type IProps = {
  title: string
  children: ReactNode
  onCancel: () => void
}

function Modal ({ title, children, onCancel }: IProps) {
  const { show, updateShowModal } = useModalContext()

  function handleClose () {
    onCancel()
    updateShowModal(false)
  }

  return (
    createPortal(
      show && (
        <div
          id='modal'
          className='absolute inset-0 z-10 flex items-center justify-center w-screen h-screen max-h-full shadow'
        >
          <div
            id='modal-overlay'
            className='absolute inset-0 w-full h-full bg-black opacity-50 grow'
          />
          <div
            id='modal-content'
            className='h-full md:h-auto max-h-full md:max-h-[min(600px, 100%)] w-full bg-background md:max-w-[474px] z-10 md:rounded-lg flex flex-col'
          >
            <header className='relative flex justify-center p-3 border-b-2 border-light-text'>
              <h1 className='text-base font-bold text-primary'>
                {title}
              </h1>
              <button
                className='absolute inset-y-0 flex items-center justify-center my-auto left-3 md:left-auto md:right-3 w-9 h-9'
                onClick={handleClose}
              >
                <HiX className='hidden md:block' />
                <HiArrowLeft className='md:hidden' />
              </button>
            </header>
            <main className='flex flex-col overflow-auto grow'>
              {children}
            </main>
          </div>
        </div>
      ),
      document.querySelector('#modal-portal') as HTMLElement
    )
  )
}

export default Modal
