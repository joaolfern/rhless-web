import { Dialog, Transition } from '@headlessui/react'
import ButtonPrimary from 'components/Button/Variants/ButtonPrimary'
import ButtonGhost from 'components/ButtonGhost/ButtonGhost'
import useDialogContext from 'hooks/useDialogContext'
import React, { Fragment } from 'react'

function MessageModal () {
  const { show, content, onClose, onConfirmRef } = useDialogContext()
  return (
    <Transition appear show={show} as={Fragment}>
    <Dialog as='div' className='relative z-10' onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </Transition.Child>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-full text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='w-full p-6 overflow-hidden transition-all transform shadow-xl text-center rounded-lg bg-background max-w-[300px] min-h-[150px] flex flex-col justify-between items-center gap-4'>
              <Dialog.Title
                as='h3'
              >
                {content}
              </Dialog.Title>
              {onConfirmRef ? (
                <div className='flex flex-wrap gap-4'>
                  <ButtonGhost
                    className='flex-1 pt-1 pb-1 pl-3 pr-3'
                    onClick={onClose}
                  >
                    Cancelar
                  </ButtonGhost>
                  <ButtonPrimary
                    className='flex-1 pt-1 pb-1 pl-3 pr-3'
                    onClick={() => {
                      onConfirmRef()
                      onClose()
                    }}
                  >
                    Confirmar
                  </ButtonPrimary>
                </div>
              ) : typeof content === 'string' && (
                <ButtonPrimary
                  className='pt-1 pb-1 pl-3 pr-3'
                  onClick={onClose}
                >
                  OK
                </ButtonPrimary>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}

export default MessageModal
